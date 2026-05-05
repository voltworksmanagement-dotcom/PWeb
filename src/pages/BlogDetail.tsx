import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Calendar, Eye, MessageCircle, Heart, Share2, Facebook, Linkedin, ChevronRight, CheckCircle2 } from 'lucide-react';
import blogData from '../../data/blog.json';

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const post = blogData.posts.find((p) => p.metadata.slug === slug);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post?.metadata?.title || '';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          url: shareUrl,
        });
      } catch (err) {
        console.error("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
  };

  const shareX = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank', 'noopener,noreferrer');
  };

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
  };

  const XLogo = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-industrial-bg flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-headline text-slate-800 mb-4">Post Not Found</h1>
        <p className="text-slate-600 mb-8">The blog post you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/blogs')}
          className="bg-primary text-white px-6 py-3 font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-primary-dark transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Blogs
        </button>
      </div>
    );
  }

  // Helper function to render different section content types dynamically
  const renderSectionContent = (section: any) => {
    return (
      <div className="mt-6 space-y-8">
        {section.body && (
          <p className="text-slate-700 leading-relaxed text-lg">{section.body}</p>
        )}

        {section.image && (
          <figure className="my-10 rounded-xl overflow-hidden border border-outline-v bg-slate-50">
            <img 
              src={section.image.url || post.metadata.og_image} 
              alt={section.image.alt} 
              className="w-full h-auto max-h-[500px] object-cover" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000';
              }}
            />
            {section.image.caption && (
              <figcaption className="text-center p-3 text-sm text-slate-500 bg-white border-t border-outline-v">
                {section.image.caption}
              </figcaption>
            )}
          </figure>
        )}

        {section.subsections && section.subsections.length > 0 && (
          <div className="space-y-6 mt-8">
            {section.subsections.map((sub: any, idx: number) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-lg border border-outline-v/50">
                <h3 className="text-xl font-headline text-slate-900 mb-3">{sub.title}</h3>
                <p className="text-slate-600 leading-relaxed">{sub.body}</p>
              </div>
            ))}
          </div>
        )}

        {section.benefits && section.benefits.length > 0 && (
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 mt-8">
            <h4 className="text-lg font-bold text-slate-800 mb-4 uppercase tracking-wider">Key Benefits</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.benefits.map((benefit: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {section.specifications && (
          <div className="overflow-x-auto mt-8">
            <table className="w-full text-left border-collapse rounded-lg overflow-hidden border border-outline-v">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-4 font-headline text-slate-800 border-b border-outline-v">Specification</th>
                  <th className="p-4 font-headline text-slate-800 border-b border-outline-v">Detail</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {Object.entries(section.specifications).map(([key, val], idx) => {
                  if (typeof val === 'object') return null; // Skip complex nested for simple view
                  return (
                    <tr key={idx} className="border-b border-outline-v last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="p-4 text-slate-600 font-medium capitalize">{key.replace(/_/g, ' ')}</td>
                      <td className="p-4 text-slate-800">{String(val)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {section.problems && section.problems.length > 0 && (
          <div className="space-y-6 mt-8">
            {section.problems.map((prob: any, idx: number) => (
              <div key={idx} className="grid md:grid-cols-2 gap-6 p-6 rounded-xl border border-outline-v bg-white shadow-sm">
                <div>
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-bold mb-3">
                    {prob.problem_number}
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2">{prob.problem}</h4>
                  <p className="text-slate-600 text-sm">{prob.problem_description}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex flex-col justify-center">
                  <h5 className="font-bold text-green-800 mb-2 uppercase text-xs tracking-wider">The Solution</h5>
                  <p className="text-green-900 text-sm">{prob.solution}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {section.cta && (
          <div className="mt-12 bg-slate-900 text-center p-10 rounded-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <h3 className="text-2xl font-headline text-white mb-4">Ready to upgrade?</h3>
              <p className="text-slate-300 mb-8 max-w-lg mx-auto">{section.cta.text}</p>
              <Link to="/contact" className="inline-block bg-primary text-white font-semibold uppercase tracking-wider px-8 py-4 rounded hover:bg-white hover:text-primary transition-all duration-300">
                Contact Us Now
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <article className="bg-industrial-bg min-h-screen font-body pb-24">
      {/* Hero Header */}
      <header className="relative bg-slate-900 pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={post.metadata.og_image} 
            alt="Cover" 
            className="w-full h-full object-cover opacity-20"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <button 
            onClick={() => navigate('/blogs')}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-8 text-sm uppercase tracking-wider font-semibold group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Articles
          </button>

          <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider text-primary mb-6">
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-sm border border-primary/30">
              {post.metadata.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-headline text-white leading-tight mb-8">
            {post.metadata.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-6">
            <div className="flex items-center gap-6 text-slate-300 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{new Date(post.metadata.published_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>{post.metadata.read_time_minutes} min read</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Eye className="w-4 h-4 text-primary" />
                <span>{post.metadata.views} views</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={handleShare} className="text-slate-400 hover:text-white transition-colors" title="Share"><Share2 className="w-5 h-5" /></button>
              <button onClick={shareFacebook} className="text-slate-400 hover:text-[#1877F2] transition-colors" title="Share on Facebook"><Facebook className="w-5 h-5" /></button>
              <button onClick={shareX} className="text-slate-400 hover:text-white transition-colors" title="Share on X (Twitter)"><XLogo className="w-4 h-4" /></button>
              <button onClick={shareLinkedIn} className="text-slate-400 hover:text-[#0A66C2] transition-colors" title="Share on LinkedIn"><Linkedin className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto max-w-4xl px-6 -mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-outline-v p-8 md:p-12 lg:p-16">
          
          {/* Intro Section */}
          {post.intro && (
            <div className="mb-12">
              {post.intro.hook && (
                <p className="text-xl md:text-2xl text-slate-800 font-medium leading-relaxed mb-6 border-l-4 border-primary pl-6">
                  {post.intro.hook}
                </p>
              )}
              {post.intro.body && (
                <p className="text-lg text-slate-600 leading-relaxed">
                  {post.intro.body}
                </p>
              )}
            </div>
          )}

          {/* Dynamic Sections */}
          {post.sections && post.sections.length > 0 ? (
            <div className="space-y-16">
              {post.sections.map((section: any) => (
                <motion.section 
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-headline text-slate-900 mb-6 flex items-center gap-4">
                    <span className="text-primary opacity-50 text-xl font-mono">{section.id < 10 ? `0${section.id}` : section.id}.</span>
                    {section.heading}
                  </h2>
                  {renderSectionContent(section)}
                </motion.section>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-slate-500 text-lg">Full article content is not available for this post yet.</p>
            </div>
          )}

          {/* Footer Metadata */}
          <div className="mt-16 pt-8 border-t border-outline-v flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {post.metadata.tags && post.metadata.tags.map((tag: string, idx: number) => (
                <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full hover:bg-slate-200 transition-colors cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors group">
                <Heart className="w-6 h-6 group-hover:fill-red-500" />
                <span className="font-medium">{post.metadata.likes} Likes</span>
              </button>
              <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors">
                <MessageCircle className="w-6 h-6" />
                <span className="font-medium">{post.metadata.comments} Comments</span>
              </button>
            </div>
          </div>

        </div>

        {/* Author Bio */}
        <div className="mt-12 bg-slate-50 border border-outline-v rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center shrink-0">
            <span className="text-white text-2xl font-bold">V</span>
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-1">Written By</h4>
            <h3 className="text-2xl font-headline text-slate-900 mb-2">{post.metadata.author || "VoltWorks Team"}</h3>
            <p className="text-slate-600 text-sm">
              Our engineering and product teams share insights, technology updates, and industry trends to keep you informed about the future of electric mobility.
            </p>
          </div>
        </div>

      </div>
    </article>
  );
}
