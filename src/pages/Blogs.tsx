import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Clock, Eye, MessageCircle, Heart, ChevronRight } from 'lucide-react';
import blogData from '../../data/blog.json';

const categories = ["All Posts", ...new Set(blogData.posts.map(post => post.metadata.category))];

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState("All Posts");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All Posts") return blogData.posts;
    return blogData.posts.filter(post => post.metadata.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="bg-industrial-bg min-h-screen font-body">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24 md:py-32 overflow-hidden border-b border-primary">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-6 md:px-16 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-headline text-5xl md:text-7xl uppercase tracking-tighter mb-6"
          >
            Insights & <span className="text-primary">News</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 max-w-2xl mx-auto uppercase tracking-widest text-sm"
          >
            Deep dives into electric motors, technology, and industry trends
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 px-6 md:px-16 container mx-auto">
        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-primary border border-outline-v'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.metadata.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-outline-v shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <Link to={`/blogs/${post.metadata.slug}`} className="block relative h-64 overflow-hidden bg-slate-100">
                  <img 
                    src={post.metadata.og_image} 
                    alt={post.metadata.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4 uppercase tracking-wider font-semibold">
                    <div className="flex items-center gap-4">
                      <span>{new Date(post.metadata.published_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.metadata.read_time_minutes} min</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-800 text-xs font-bold uppercase rounded-sm mb-3">
                      {post.metadata.category}
                    </span>
                    <Link to={`/blogs/${post.metadata.slug}`}>
                      <h2 className="font-headline text-2xl leading-tight text-slate-900 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {post.metadata.title}
                      </h2>
                    </Link>
                  </div>

                  <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-grow">
                    {post.metadata.meta_description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-slate-400 text-sm">
                      <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {post.metadata.views}</span>
                      <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> {post.metadata.comments}</span>
                    </div>
                    <button className="text-slate-400 hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl text-slate-500 font-headline">No posts found in this category.</h3>
          </div>
        )}
      </section>
    </div>
  );
}
