const imageFiles = import.meta.glob('../public/*.{png,jpg,jpeg,svg}', { eager: true, as: 'url' }) as Record<string, string>;

const normalizePath = (value: string) => {
  let path = value.trim();

  if (/^https?:\/\//i.test(path) || /^\/\//.test(path)) {
    return path;
  }

  // Remove drive letter and normalize separators
  path = path.replace(/^[A-Za-z]:\\/, '');
  path = path.replace(/^[A-Za-z]:\//, '');
  path = path.replace(/\\/g, '/');
  path = path.replace(/^.*\//, '');
  return path.toLowerCase();
};

const imageMap = Object.entries(imageFiles).reduce<Record<string, string>>((map, [resolvedPath, url]) => {
  const fileName = resolvedPath.replace('../public/', '').toLowerCase();
  map[fileName] = url;
  map[fileName.replace(/^\//, '')] = url;
  return map;
}, {});

export function resolveProductImage(image?: string) {
  if (!image) return '';
  const normalized = normalizePath(image);
  if (/^https?:\/\//i.test(image) || /^\/\//.test(image)) {
    return image;
  }
  return imageMap[normalized] ?? image;
}
