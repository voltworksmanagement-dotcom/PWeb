import { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { Filter, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import productsData from '../../data/voltworks_products.json';

const products = productsData as any[];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedApplications]);

  // Calculate dynamic categories with counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All Products': products.length };
    products.forEach(p => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    });
    return [
      { name: 'All Products', count: counts['All Products'] },
      ...Object.entries(counts)
        .filter(([name]) => name !== 'All Products')
        .map(([name, count]) => ({ name, count }))
    ];
  }, []);

  // Calculate dynamic applications
  const applicationList = useMemo(() => {
    const apps = new Set<string>();
    products.forEach(p => {
      p.applications?.forEach((app: string) => apps.add(app));
    });
    return Array.from(apps).map(name => ({ name }));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
      const matchesApplication = selectedApplications.length === 0 || 
        selectedApplications.some(app => product.applications?.includes(app));
      return matchesCategory && matchesApplication;
    });
  }, [selectedCategory, selectedApplications]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleApplication = (appName: string) => {
    setSelectedApplications(prev => 
      prev.includes(appName) 
        ? prev.filter(a => a !== appName)
        : [...prev, appName]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('All Products');
    setSelectedApplications([]);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-16 py-12 min-h-screen">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="font-headline text-3xl md:text-5xl text-charcoal mb-2 uppercase">Industrial Solutions</h1>
        <p className="font-body text-base md:text-lg text-slate-500 max-w-2xl">
          Precision-engineered electrical components designed for maximum durability in high-demand industrial environments.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filter */}
        <aside className="w-full md:w-72 flex-shrink-0">
          <div className="sticky top-24 space-y-8">
            {/* Category */}
            <div>
              <h3 className="font-headline text-xs font-bold text-charcoal uppercase mb-4 pb-2 border-b border-outline-v tracking-widest">
                Category
              </h3>
              <ul className="space-y-3">
                {categoryCounts.map((cat) => {
                  const isActive = selectedCategory === cat.name;
                  return (
                    <li 
                      key={cat.name} 
                      className="flex items-center justify-between group cursor-pointer"
                      onClick={() => setSelectedCategory(cat.name)}
                    >
                      <span className={`font-body text-sm transition-colors ${isActive ? 'text-primary font-bold' : 'text-slate-500 group-hover:text-primary'}`}>
                        {cat.name}
                      </span>
                      <span className={`text-[10px] font-headline font-bold px-2 py-0.5 ${isActive ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                        {cat.count}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Application */}
            <div>
              <h3 className="font-headline text-xs font-bold text-charcoal uppercase mb-4 pb-2 border-b border-outline-v tracking-widest">
                Application
              </h3>
              <div className="flex flex-wrap gap-2">
                {applicationList.map((app) => {
                  const isActive = selectedApplications.includes(app.name);
                  return (
                    <span
                      key={app.name}
                      onClick={() => toggleApplication(app.name)}
                      className={`px-3 py-1 text-[10px] font-headline font-bold uppercase cursor-pointer transition-colors ${
                        isActive ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500 hover:bg-primary-light hover:text-white'
                      }`}
                    >
                      {app.name}
                    </span>
                  );
                })}
              </div>
            </div>

            <button 
              onClick={clearFilters}
              className="w-full border border-primary text-primary font-headline text-[10px] font-bold py-3 hover:bg-primary hover:text-white transition-all uppercase tracking-widest"
            >
              Clear All Filters
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="flex-grow">
          <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
            <span className="font-body text-xs italic text-slate-400">Showing {filteredProducts.length} Products</span>
            <div className="flex items-center gap-4">
              <span className="font-headline text-[10px] font-bold uppercase tracking-tighter text-slate-500">Sort By:</span>
              <select className="bg-transparent border-none font-headline text-xs font-bold text-primary focus:ring-0 cursor-pointer p-0 uppercase">
                <option>Newest Arrivals</option>
                <option>Power (High to Low)</option>
                <option>Efficiency Rating</option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-slate-500 font-body">No products found matching your selected filters.</p>
              <button 
                onClick={clearFilters}
                className="mt-4 text-primary font-bold font-headline text-xs uppercase underline"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {paginatedProducts.map((product, idx) => (
                <motion.div
                  key={`${product.id}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white border border-slate-100 p-6 group flex flex-col h-full hover:border-primary transition-all duration-300 relative"
                >
                  <Link to={`/products/${product.id}`} className="absolute inset-0 z-10" />
                  <div className="relative mb-6 overflow-hidden aspect-square border border-slate-50">
                    <img
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                      alt={product.name}
                      src={product.image || 'https://placehold.co/400x400/eeeeee/999999?text=VoltWorks'}
                    />
                    {product.tag && (
                      <div className={`absolute top-2 left-2 ${product.tagColor || 'bg-navy'} text-white px-2 py-1 text-[8px] font-headline font-bold tracking-widest uppercase`}>
                        {product.tag}
                      </div>
                    )}
                  </div>
                  <h4 className="font-headline text-lg text-charcoal mb-2 group-hover:text-primary transition-colors uppercase tracking-tight">
                    {product.name}
                  </h4>
                  <p className="text-slate-500 font-body text-sm mb-6 flex-grow line-clamp-2">
                    {product.description}
                  </p>
                  <button className="w-full bg-navy text-white font-headline text-[10px] font-bold py-3 uppercase tracking-[0.2em] group-hover:bg-primary transition-all relative z-20">
                    View Details
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center gap-4">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-slate-200 hover:border-primary text-slate-400 hover:text-primary transition-colors disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:text-slate-400 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button 
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-headline font-bold text-xs transition-colors ${
                    currentPage === page 
                      ? 'bg-primary text-white' 
                      : 'border border-slate-200 hover:border-primary text-slate-400 hover:text-primary'
                  }`}
                >
                  {page.toString().padStart(2, '0')}
                </button>
              ))}

              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-slate-200 hover:border-primary text-slate-400 hover:text-primary transition-colors disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:text-slate-400 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
