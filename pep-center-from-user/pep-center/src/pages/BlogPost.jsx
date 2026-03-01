import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { getBlogPostBySlug, blogPosts } from '../data/blogPosts';
import { ArrowLeft, Clock, Tag, ChevronRight, Share2, Bookmark, Sparkles, BookOpen, Microscope, Beaker, Zap } from 'lucide-react';
import { AnimatedSection } from '../hooks/useAnimations.jsx';

// Particle animation for hero
function FloatingParticle({ delay, color }) {
  const [position, setPosition] = useState({
    x: Math.random() * 100,
    y: Math.random() * 100,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: Math.random() * 100,
        y: Math.random() * 100,
      });
    }, 5000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute w-2 h-2 rounded-full opacity-40 animate-pulse"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        backgroundColor: color,
        boxShadow: `0 0 20px ${color}`,
        transition: 'all 5s ease-in-out',
        animationDelay: `${delay}s`,
      }}
    />
  );
}

// Animated reading progress bar
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-[100]">
      <div
        className="h-full bg-gradient-to-r from-[#f97316] to-[#fb923c] transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// Share button with animation
function ShareButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  return (
    <button
      onClick={handleShare}
      className="relative group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#f97316]/50 hover:bg-[#f97316]/10 transition-all"
    >
      <Share2 className="w-4 h-4 text-white/60 group-hover:text-[#f97316]" />
      <span className="text-sm text-white/60 group-hover:text-white">Share</span>
      {showTooltip && (
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#f97316] text-white text-xs rounded-lg whitespace-nowrap animate-fade-in">
          Copied!
        </span>
      )}
    </button>
  );
}

// Section divider with animation
function SectionDivider({ icon: Icon, text, color }) {
  return (
    <div className="flex items-center gap-4 my-12">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div 
        className="flex items-center gap-2 px-4 py-2 rounded-full border"
        style={{ borderColor: `${color}30`, backgroundColor: `${color}10` }}
      >
        <Icon className="w-4 h-4" style={{ color }} />
        <span className="text-sm font-medium" style={{ color }}>{text}</span>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

// Pull quote component
function PullQuote({ children, author }) {
  return (
    <blockquote className="relative my-8 p-8 rounded-2xl bg-gradient-to-br from-[#f97316]/10 to-[#fb923c]/5 border-l-4 border-[#f97316]">
      <Sparkles className="absolute top-4 right-4 w-6 h-6 text-[#f97316]/50" />
      <p className="text-xl sm:text-2xl font-medium text-white leading-relaxed italic">
        "{children}"
      </p>
      {author && (
        <cite className="block mt-4 text-sm text-white/50 not-italic">
          — {author}
        </cite>
      )}
    </blockquote>
  );
}

// Key takeaway box
function KeyTakeaway({ children }) {
  return (
    <div className="my-8 p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-blue-400" />
        <h4 className="font-semibold text-blue-400">Key Takeaway</h4>
      </div>
      <div className="text-white/80">{children}</div>
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <div className="w-20 h-20 rounded-2xl bg-[#f97316]/10 flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-[#f97316]/50" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-white">Article Not Found</h1>
          <p className="text-white/50 mb-6">The research article you're looking for doesn't exist.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#f97316] text-white rounded-xl hover:bg-[#ea580c] transition-colors">
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

  // Generate particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    color: ['#f97316', '#fb923c', '#f97316', '#fdba74'][Math.floor(Math.random() * 4)],
  }));

  // Parse content with enhanced formatting
  const formatContent = (content) => {
    const lines = content.split('\n');
    const elements = [];
    let keyTakeawayBuffer = [];
    let inKeyTakeaway = false;
    let listBuffer = [];
    let listType = null;

    const flushList = () => {
      if (listBuffer.length > 0) {
        const ListTag = listType === 'ol' ? 'ol' : 'ul';
        elements.push(
          <ListTag key={`list-${elements.length}`} className={`my-6 ${listType === 'ol' ? 'list-decimal' : 'list-disc'} list-inside space-y-3`}>
            {listBuffer.map((item, i) => (
              <li key={i} className="text-white/70 leading-relaxed pl-2">
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ListTag>
        );
        listBuffer = [];
        listType = null;
      }
    };

    const flushKeyTakeaway = () => {
      if (keyTakeawayBuffer.length > 0) {
        elements.push(
          <KeyTakeaway key={`kt-${elements.length}`}>
            <div dangerouslySetInnerHTML={{ 
              __html: keyTakeawayBuffer.join('<br/>')
                .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
                .replace(/`(.+?)`/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded text-[#f97316] text-sm">$1</code>')
            }} />
          </KeyTakeaway>
        );
        keyTakeawayBuffer = [];
      }
    };

    lines.forEach((line, index) => {
      // Key Takeaway section
      if (line.trim() === '### Key Takeaway') {
        flushList();
        inKeyTakeaway = true;
        return;
      }
      
      if (inKeyTakeaway) {
        if (line.trim() === '' || line.startsWith('#')) {
          flushKeyTakeaway();
          inKeyTakeaway = false;
        } else {
          keyTakeawayBuffer.push(line);
          return;
        }
      }

      // Headers
      if (line.startsWith('# ')) {
        flushList();
        elements.push(
          <h1 key={index} className="text-3xl sm:text-4xl font-bold text-white mt-12 mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text">
            {line.replace('# ', '')}
          </h1>
        );
        return;
      }
      
      if (line.startsWith('## ')) {
        flushList();
        const title = line.replace('## ', '');
        let icon = Sparkles;
        let color = '#f97316';
        
        if (title.toLowerCase().includes('science') || title.toLowerCase().includes('research')) {
          icon = Microscope;
          color = '#f97316';
        } else if (title.toLowerCase().includes('mechanism') || title.toLowerCase().includes('action')) {
          icon = Beaker;
          color = '#fb923c';
        }
        
        elements.push(
          <div key={index}>
            <SectionDivider icon={icon} text={title} color={color} />
          </div>
        );
        return;
      }
      
      if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={index} className="text-xl font-semibold text-white mt-8 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f97316]" />
            {line.replace('### ', '')}
          </h3>
        );
        return;
      }

      // Lists
      if (line.startsWith('- ')) {
        if (listType && listType !== 'ul') flushList();
        listType = 'ul';
        let item = line.replace('- ', '');
        item = item.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>');
        item = item.replace(/`(.+?)`/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded text-[#f97316] text-sm">$1</code>');
        listBuffer.push(item);
        return;
      }
      
      if (line.match(/^\d+\. /)) {
        if (listType && listType !== 'ol') flushList();
        listType = 'ol';
        let item = line.replace(/^\d+\. /, '');
        item = item.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>');
        item = item.replace(/`(.+?)`/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded text-[#f97316] text-sm">$1</code>');
        listBuffer.push(item);
        return;
      }

      // Empty lines
      if (line.trim() === '') {
        flushList();
        return;
      }

      // Pull quotes
      if (line.startsWith('> ')) {
        flushList();
        elements.push(
          <PullQuote key={index} author="Research Summary">
            {line.replace('> ', '').replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')}
          </PullQuote>
        );
        return;
      }

      // Paragraphs
      flushList();
      let text = line;
      text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>');
      text = text.replace(/`(.+?)`/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded text-[#f97316] text-sm">$1</code>');
      elements.push(
        <p key={index} className="text-white/70 leading-relaxed mb-4 text-base sm:text-lg" dangerouslySetInnerHTML={{ __html: text }} />
      );
    });

    flushList();
    flushKeyTakeaway();

    return elements;
  };

  return (
    <div className="min-h-screen bg-[#0a0e17]">
      <ReadingProgress />
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((p) => (
            <FloatingParticle key={p.id} delay={p.delay} color={p.color} />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-[#f97316]/5 via-transparent to-transparent" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f97316]/10 rounded-full blur-[120px]" />
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-[#fb923c]/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <AnimatedSection animation="fadeUp">
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-white/40 mb-8">
              <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              <Link to="/#blog" className="hover:text-white/70 transition-colors">Research Journal</Link>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-white/70 truncate max-w-[150px] sm:max-w-none">{post.title}</span>
            </nav>
          </AnimatedSection>

          {/* Article Header */}
          <AnimatedSection animation="fadeUp" delay={100}>
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-[#f97316]/20 border border-[#f97316]/30 text-xs font-semibold text-[#f97316]">
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-white/50 text-xs sm:text-sm">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {post.readTime}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                  {post.title}
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-white/50 leading-relaxed max-w-3xl">
                {post.excerpt}
              </p>
            </header>
          </AnimatedSection>

          {/* Action Buttons */}
          <AnimatedSection animation="fadeUp" delay={200}>
            <div className="flex flex-wrap items-center gap-3">
              <ShareButton />
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                  isBookmarked 
                    ? 'bg-[#f97316]/20 border-[#f97316]/50 text-[#f97316]' 
                    : 'bg-white/5 border-white/10 text-white/60 hover:border-[#f97316]/50'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                <span className="text-sm">{isBookmarked ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Article Content */}
      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 pb-24">
        <AnimatedSection animation="fadeUp" delay={300}>
          <article ref={contentRef} className="prose prose-invert max-w-none">
            {formatContent(post.content)}
          </article>
        </AnimatedSection>

        {/* Back to Blog */}
        <AnimatedSection animation="fadeUp" delay={400}>
          <div className="mt-16 pt-8 border-t border-white/[0.08]">
            <Link 
              to="/#blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:bg-white/10 hover:text-white hover:border-[#f97316]/30 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Research Journal
            </Link>
          </div>
        </AnimatedSection>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <AnimatedSection animation="fadeUp" delay={500}>
            <div className="mt-16">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="w-6 h-6 text-[#f97316]" />
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Related <span className="text-gradient">Articles</span>
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedPosts.map((relatedPost, i) => (
                  <Link 
                    key={relatedPost.slug}
                    to={`/blog/${relatedPost.slug}`}
                    className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#f97316]/30 hover:bg-white/[0.04] transition-all hover:-translate-y-1"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <span className="text-xs text-[#f97316] font-medium">{relatedPost.category}</span>
                    <h4 className="font-semibold text-white mt-2 group-hover:text-[#f97316] transition-colors line-clamp-2 text-sm sm:text-base">
                      {relatedPost.title}
                    </h4>
                    <span className="text-xs text-white/40 mt-3 block flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {relatedPost.readTime}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
