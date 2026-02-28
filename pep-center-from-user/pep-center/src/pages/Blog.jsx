import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { Clock, ChevronLeft, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '../hooks/useAnimations.jsx';

export default function Blog() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f97316]/10 to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f97316]/10 rounded-full blur-[120px]" />
        
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-16">
          <AnimatedSection animation="fadeUp">
            <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors">
              <ChevronLeft className="w-5 h-5" />
              Back to Home
            </Link>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#f97316]/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[#f97316]" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white">
                Research <span className="text-gradient">Journal</span>
              </h1>
            </div>
            <p className="text-xl text-white/50 max-w-2xl">
              Insights, guides, and scientific perspectives on peptide research
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <AnimatedSection key={post.slug} animation="fadeUp" delay={index * 100}>
              <Link 
                to={`/blog/${post.slug}`}
                className="group block h-full p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#f97316]/30 hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-2"
              >
                {/* Category & Read Time */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#f97316]/10 border border-[#f97316]/20 text-xs font-medium text-[#f97316]">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-white/40">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#f97316] transition-colors line-clamp-2">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <div className="flex items-center gap-2 text-sm text-[#f97316] font-medium">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* Newsletter Section */}
        <AnimatedSection animation="fadeUp" delay={400}>
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#f97316]/20 to-[#ec4899]/10 border border-[#f97316]/30">
            <div className="max-w-2xl mx-auto text-center">
              <Sparkles className="w-10 h-10 text-[#f97316] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-3">
                Stay Updated
              </h2>
              <p className="text-white/60 mb-6">
                Get the latest research articles and product updates delivered to your inbox
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#f97316]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#f97316] text-white rounded-xl font-semibold hover:bg-[#ea580c] transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
