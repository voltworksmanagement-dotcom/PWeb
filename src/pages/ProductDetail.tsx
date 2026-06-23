import { motion } from 'motion/react';
import { ChevronRight, ZoomIn, Box } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import productsData from '../../data/voltworks_products.json';

const products = productsData as any[];

export default function ProductDetail() {
  const { id } = useParams();

  const productData = products.find(p => p.id === id);

  if (!productData) {
    return (
      <main className="max-w-7xl mx-auto px-6 md:px-16 py-32 text-center min-h-screen">
        <h1 className="font-headline text-3xl mb-4 text-charcoal uppercase tracking-widest">Product Not Found</h1>
        <p className="font-body text-slate-500 mb-8">The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="text-primary font-bold hover:underline uppercase tracking-widest">Return to Catalog</Link>
      </main>
    );
  }

  const product = {
    name: productData.name,
    series: productData.tag || productData.category || 'VoltWorks Product',
    description: productData.description,
    tags: [productData.category, ...(productData.applications || [])].filter(Boolean),
    mainImage: productData.image || 'https://placehold.co/800x800/eeeeee/999999?text=VoltWorks',
    gallery: [
      productData.image || 'https://placehold.co/400x400/eeeeee/999999?text=VoltWorks',
      'https://placehold.co/400x400/dddddd/999999?text=Detail+1',
      'https://placehold.co/400x400/cccccc/999999?text=Detail+2',
      'https://placehold.co/400x400/bbbbbb/999999?text=Detail+3',
    ],
    specs: productData.specs || [],
    features: [
      'Advanced thermal management with integrated sensors.',
      'High-grade insulation for extended operational life.',
      'Precision engineering for optimal efficiency and performance.',
      'Robust construction suited for demanding industrial environments.'
    ]
  };

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-16 py-12">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center space-x-2 text-slate-400 font-headline text-[10px] md:text-xs tracking-widest uppercase">
        <Link to="/products" className="hover:text-primary transition-colors">Catalog</Link>
        <ChevronRight size={14} className="mt-[-2px]" />
        <Link to="/products" className="hover:text-primary transition-colors">{product.series}</Link>
        <ChevronRight size={14} className="mt-[-2px]" />
        <span className="text-charcoal font-bold truncate max-w-[200px] md:max-w-xs block">{product.name}</span>
      </nav>

      <div className="grid grid-cols-12 gap-8 md:gap-16">
        {/* Product Visual Section */}
        <div className="col-span-12 lg:col-span-7">
          <div className="bg-white border border-slate-100 p-8 flex items-center justify-center relative group">
            <img
              alt={product.name}
              className="w-full h-auto object-contain mix-blend-multiply"
              src={product.mainImage}
            />
            <div className="absolute bottom-6 right-6 flex flex-col space-y-2">
              <button className="w-12 h-12 bg-white border border-slate-200 flex items-center justify-center hover:border-primary transition-colors shadow-sm">
                <ZoomIn size={18} />
              </button>
              <button className="w-12 h-12 bg-white border border-slate-200 flex items-center justify-center hover:border-primary transition-colors shadow-sm">
                <Box size={18} />
              </button>
            </div>
          </div>
          {/* Technical Gallery */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            {product.gallery.map((img, idx) => (
              <div
                key={idx}
                className={`aspect-square bg-white border ${
                  idx === 0 ? 'border-primary' : 'border-slate-100 opacity-60'
                } p-2 hover:opacity-100 transition-all cursor-pointer`}
              >
                <img className="w-full h-full object-cover" src={img} alt={`Detail ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info & Specs */}
        <div className="col-span-12 lg:col-span-5 flex flex-col">
          <div className="mb-6">
            <span className="font-headline text-primary text-xs font-bold mb-2 block tracking-widest uppercase">
              {product.series}
            </span>
            <h1 className="font-headline text-3xl md:text-5xl text-charcoal mb-4 uppercase leading-none">
              {product.name}
            </h1>
            <p className="font-body text-base text-slate-500 mb-6 leading-relaxed">
              {product.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-slate-100 text-slate-500 font-headline text-[10px] font-bold uppercase tracking-widest"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Specification Table */}
          <div className="border-y border-slate-200 py-6 mb-8">
            <h3 className="font-headline text-sm md:text-base font-bold mb-4 uppercase tracking-tighter">
              Technical Specifications
            </h3>
            <div className="space-y-4">
              {product.specs.map(spec => (
                <div key={spec.label} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                  <span className="font-headline text-[10px] text-slate-400 uppercase tracking-widest leading-none mt-1">
                    {spec.label}
                  </span>
                  <span className="font-headline text-xs md:text-sm font-bold text-charcoal text-right">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Primary CTA */}
          <div className="bg-navy p-8 text-white">
            <h4 className="font-headline text-xl mb-2 uppercase tracking-tighter">Inquire for Pricing</h4>
            <p className="text-slate-400 text-sm mb-6 font-body">
              Connect with our technical sales team for bulk quotes and integration support.
            </p>
            <Link to="/contact" className="w-full flex items-center justify-center bg-primary py-4 font-headline text-xs font-bold tracking-[0.2em] hover:bg-primary-light transition-all uppercase">
              REQUEST CONFIGURATION
            </Link>
          </div>
        </div>
      </div>


    </main>
  );
}
