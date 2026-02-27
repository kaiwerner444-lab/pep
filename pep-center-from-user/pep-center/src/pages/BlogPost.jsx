import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getBlogPostBySlug, blogPosts } from '../data/blogPosts';
import { ArrowLeft, Clock, Tag, ChevronRight } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <Link to="/" className="text-[#f97316] hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Return to blog
          </Link>
        </div>
      </div>
    );
  }

  // Get related posts
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  // Convert markdown-like content to HTML
  const formatContent = (content) => {
    return content
      .split('\n')
      .map((line) => {
        // Headers
        if (line.startsWith('# ')) {
          return `<h1 class="text-4xl font-bold text-white mt-12 mb-6">${line.replace('# ', '')}</h1>`;
        }
        if (line.startsWith('## ')) {
          return `<h2 class="text-2xl font-semibold text-white mt-10 mb-4">${line.replace('## ', '')}</h2>`;
        }
        if (line.startsWith('### ')) {
          return `<h3 class="text-xl font-semibold text-white mt-8 mb-3">${line.replace('### ', '')}</h3>`;
        }
        // Lists
        if (line.startsWith('- ')) {
          return `<li class="text-white/70 ml-6 mb-2">${line.replace('- ', '')}</li>`;
        }
        if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) {
          return `<li class="text-white/70 ml-6 mb-2">${line.replace(/^\d+\. /, '')}</li>`;
        }
        // Bold
        line = line.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>');
        // Code
        line = line.replace(/`(.+?)`/g, '<code class="bg-white/10 px-2 py-1 rounded text-[#f97316] text-sm">$1</code>');
        // Paragraphs
        if (line.trim() && !line.startsWith('<')) {
          return `<p class="text-white/70 leading-relaxed mb-4">${line}</p>`;
        }
        // Empty lines
        if (line.trim() === '') {
          return '<br />';
        }
        return line;
      })
      .join('');
  };

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/#blog" className="hover:text-white/70 transition-colors">Research Journal</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white/70">{post.title}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="badge-premium">{post.category}</span>
            <span className="flex items-center gap-1.5 text-white/50 text-sm">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-white/50 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* Article Content */}
        <article 
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
        />

        {/* Back to Blog */}
        <div className="mt-16 pt-8 border-t border-white/[0.08]">
          <Link 
            to="/#blog"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#f97316] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Research Journal
          </Link>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-6">
              Related <span className="text-gradient">Articles</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.slug}
                  to={`/blog/${relatedPost.slug}`}
                  className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all"
                >
                  <span className="text-xs text-[#f97316] font-medium">{relatedPost.category}</span>
                  <h4 className="font-semibold text-white mt-2 group-hover:text-[#f97316] transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h4>
                  <span className="text-xs text-white/40 mt-2 block">{relatedPost.readTime}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
