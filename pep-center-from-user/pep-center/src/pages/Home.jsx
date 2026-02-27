import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import { blogPosts } from '../data/blogPosts';
import ProductCard from '../components/ProductCard';
import { Shield, FileText, Beaker, Truck, ChevronRight, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'HPLC Verified',
    desc: 'Every batch undergoes High-Performance Liquid Chromatography analysis to confirm purity and identity.',
  },
  {
    icon: FileText,
    title: 'Certificate of Analysis',
    desc: 'Certificate of Analysis included with every order, documenting batch-specific test results.',
  },
  {
    icon: Beaker,
    title: 'Third-Party Tested',
    desc: 'Every batch undergoes rigorous third-party testing by independent laboratories.',
  },
  {
    icon: Truck,
    title: 'Cold-Chain Shipping',
    desc: 'Products shipped with temperature monitoring to ensure compound integrity during transit.',
  },
];

const stats = [
  { value: '60+', label: 'Research Compounds' },
  { value: '≥99%', label: 'Purity Standards' },
  { value: '100+', label: 'Countries Shipped' },
  { value: 'COA', label: 'With Every Order' },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative">
      {/* Background Glow */}
      <div 
        className="fixed w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)',
          left: mousePos.x - 400,
          top: mousePos.y - 400,
          transition: 'left 0.3s ease-out, top 0.3s ease-out',
          zIndex: 0,
        }}
      />

      {/* Hero Section - FUTURISTIC */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Animated gradient orbs */}
          <div 
            className="absolute w-[600px] h-[600px] rounded-full opacity-40 blur-[120px]"
            style={{
              background: 'radial-gradient(circle, rgba(249,115,22,0.4) 0%, rgba(236,72,153,0.2) 50%, transparent 70%)',
              left: `${mousePos.x * 0.1}px`,
              top: `${mousePos.y * 0.1}px`,
              transition: 'all 0.8s ease-out',
            }}
          />
          <div 
            className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-[100px]"
            style={{
              background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(139,92,246,0.2) 50%, transparent 70%)',
              right: `${-mousePos.x * 0.05}px`,
              bottom: `${-mousePos.y * 0.05}px`,
              transition: 'all 0.8s ease-out',
            }}
          />
          {/* Grid lines */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(249,115,22,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(249,115,22,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] animate-fade-up">
                <span className="w-2 h-2 rounded-full bg-[#f97316] animate-ping" />
                <span className="text-sm text-white/60">Premium Research Compounds</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight animate-fade-up delay-100">
                <span className="text-white">Research</span>
                <span className="block bg-gradient-to-r from-[#f97316] via-[#ec4899] to-[#8b5cf6] bg-clip-text text-transparent animate-gradient">
                  Grade Peptides
                </span>
              </h1>

              <p className="text-lg text-white/50 max-w-lg leading-relaxed animate-fade-up delay-200">
                Laboratory-verified compounds with HPLC certification. 
                Trusted by researchers worldwide for purity and consistency.
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
                <Link to="/products" className="btn-premium px-8 py-4 text-white inline-flex items-center gap-2">
                  Browse Catalog
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="#quality" className="btn-secondary px-8 py-4 text-white/80 inline-flex items-center gap-2">
                  Learn More
                </a>
              </div>

              <div className="flex items-center gap-8 pt-4 animate-fade-up delay-400">
                {stats.slice(0, 3).map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#f97316] to-[#ec4899] bg-clip-text text-transparent">{stat.value}</div>
                    <div className="text-sm text-white/40">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - FUTURISTIC Vial Display */}
            <div className="relative flex items-center justify-center h-[700px] lg:h-[800px]">
              {/* Rotating rings with multiple colors */}
              <div 
                className="absolute w-[500px] h-[500px] border border-[#f97316]/20 rounded-full animate-spin"
                style={{ animationDuration: '20s' }}
              />
              <div 
                className="absolute w-[450px] h-[450px] border border-[#ec4899]/15 rounded-full animate-spin"
                style={{ animationDuration: '15s', animationDirection: 'reverse' }}
              />
              <div 
                className="absolute w-[400px] h-[400px] border border-[#06b6d4]/15 rounded-full animate-spin"
                style={{ animationDuration: '10s' }}
              />
              <div 
                className="absolute w-[550px] h-[550px] border border-[#8b5cf6]/10 rounded-full animate-pulse"
              />

              {/* Multi-color glow effects */}
              <div 
                className="absolute w-[350px] h-[450px] rounded-full opacity-60 blur-[80px]"
                style={{
                  background: 'conic-gradient(from 0deg, #f97316, #ec4899, #8b5cf6, #06b6d4, #f97316)',
                  filter: 'blur(60px)',
                  animation: 'spin 10s linear infinite',
                }}
              />

              {/* Vial - BIGGER */}
              <div className="relative z-10 animate-float">
                <img 
                  src="/vial-hero.jpg" 
                  alt="Premium Vial"
                  className="w-[350px] lg:w-[420px] h-auto rounded-2xl"
                  style={{
                    filter: 'drop-shadow(0 30px 60px rgba(249,115,22,0.3)) drop-shadow(0 0 80px rgba(236,72,153,0.2))',
                  }}
                />
              </div>

              {/* Floating particles with colors */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: ['#f97316', '#ec4899', '#06b6d4', '#8b5cf6'][i % 4],
                    left: `${10 + i * 12}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    animation: `float-particle ${3 + i * 0.4}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                    boxShadow: `0 0 10px ${['#f97316', '#ec4899', '#06b6d4', '#8b5cf6'][i % 4]}`,
                  }}
                />
              ))}

              {/* Floating Badges - with more color */}
              <div className="absolute -left-4 lg:-left-12 top-1/4 glass px-6 py-4 rounded-2xl border border-[#f97316]/30 animate-float" style={{ animationDelay: '0.5s' }}>
                <p className="text-xs text-[#f97316] uppercase tracking-wider mb-1">Purity</p>
                <p className="text-4xl font-bold text-[#f97316]">99.9%</p>
              </div>

              <div className="absolute -right-4 lg:-right-12 top-1/5 glass px-6 py-4 rounded-2xl border border-[#06b6d4]/30 animate-float" style={{ animationDelay: '0.3s' }}>
                <p className="text-xs text-[#06b6d4] uppercase tracking-wider mb-1">Verified</p>
                <p className="text-2xl font-bold text-white">HPLC</p>
              </div>

              <div className="absolute -right-4 lg:-right-8 bottom-1/4 glass px-5 py-3 rounded-2xl border border-[#22c55e]/30 flex items-center gap-2 animate-float" style={{ animationDelay: '0.7s' }}>
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" style={{ boxShadow: '0 0 10px #22c55e' }} />
                <span className="text-sm font-medium text-green-400">In Stock</span>
              </div>

              {/* Extra futuristic badge */}
              <div className="absolute left-1/4 -bottom-4 glass px-4 py-2 rounded-full border border-[#ec4899]/30 animate-float" style={{ animationDelay: '0.9s' }}>
                <span className="text-xs font-medium text-[#ec4899]">Premium Quality</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-gradient-to-b from-[#f97316] to-[#ec4899] rounded-full animate-scroll-down" />
          </div>
        </div>
      </section>

      {/* Quality Section - PREMIUM REDESIGN */}
      <section id="quality" className="py-32 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-[#f97316]/5 via-[#ec4899]/5 to-[#8b5cf6]/5 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
              <Shield className="w-4 h-4 text-[#f97316]" />
              <span className="text-sm text-white/60">Laboratory Certified</span>
            </div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#f97316] via-[#ec4899] to-[#8b5cf6] bg-clip-text text-transparent">
                Uncompromising
              </span>
              <br />
              <span className="text-white">Quality Standards</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Every batch undergoes rigorous multi-stage testing to ensure absolute purity and potency for your critical research.
            </p>
          </div>

          {/* Feature Cards - Asymmetric Layout */}
          <div className="grid lg:grid-cols-12 gap-6 mb-16">
            {/* HPLC Verified - Large Card */}
            <div className="lg:col-span-7 group">
              <div className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08] p-8 lg:p-10 hover:border-[#f97316]/30 transition-all duration-500">
                {/* Glow Effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#f97316]/10 rounded-full blur-[80px] group-hover:bg-[#f97316]/20 transition-all duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f97316]/20 to-[#f97316]/5 border border-[#f97316]/30 flex items-center justify-center">
                      <Beaker className="w-8 h-8 text-[#f97316]" />
                    </div>
                    <span className="px-4 py-2 rounded-full bg-[#f97316]/10 border border-[#f97316]/20 text-[#f97316] text-sm font-medium">
                      Step 01
                    </span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">HPLC Verified</h3>
                  <p className="text-white/50 text-lg leading-relaxed max-w-md">
                    High-Performance Liquid Chromatography analysis confirms purity levels and molecular identity with absolute precision.
                  </p>
                  
                  {/* Visual Element */}
                  <div className="mt-8 flex items-center gap-4">
                    <div className="h-1 flex-1 bg-white/[0.05] rounded-full overflow-hidden">
                      <div className="h-full w-[99.9%] bg-gradient-to-r from-[#f97316] to-[#ec4899] rounded-full" />
                    </div>
                    <span className="text-[#f97316] font-bold">99.9%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* COA - Tall Card */}
            <div className="lg:col-span-5 group">
              <div className="relative h-full min-h-[300px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#06b6d4]/5 to-transparent border border-white/[0.08] p-8 hover:border-[#06b6d4]/30 transition-all duration-500">
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#06b6d4]/10 rounded-full blur-[60px] group-hover:bg-[#06b6d4]/20 transition-all duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#06b6d4]/20 to-[#06b6d4]/5 border border-[#06b6d4]/30 flex items-center justify-center">
                      <FileText className="w-7 h-7 text-[#06b6d4]" />
                    </div>
                    <span className="px-4 py-2 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/20 text-[#06b6d4] text-sm font-medium">
                      Step 02
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Certificate of Analysis</h3>
                  <p className="text-white/50 leading-relaxed">
                    Every order includes comprehensive documentation with batch-specific test results and verification data.
                  </p>
                </div>
              </div>
            </div>

            {/* Third-Party Tested */}
            <div className="lg:col-span-5 group">
              <div className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#ec4899]/5 to-transparent border border-white/[0.08] p-8 hover:border-[#ec4899]/30 transition-all duration-500">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#ec4899]/10 rounded-full blur-[50px] group-hover:bg-[#ec4899]/20 transition-all duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#ec4899]/20 to-[#ec4899]/5 border border-[#ec4899]/30 flex items-center justify-center">
                      <Shield className="w-7 h-7 text-[#ec4899]" />
                    </div>
                    <span className="px-4 py-2 rounded-full bg-[#ec4899]/10 border border-[#ec4899]/20 text-[#ec4899] text-sm font-medium">
                      Step 03
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Third-Party Tested</h3>
                  <p className="text-white/50 leading-relaxed">
                    Independent laboratory verification ensures unbiased quality assessment and compliance with research standards.
                  </p>
                </div>
              </div>
            </div>

            {/* Cold-Chain Shipping - Large Card */}
            <div className="lg:col-span-7 group">
              <div className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#8b5cf6]/5 to-transparent border border-white/[0.08] p-8 lg:p-10 hover:border-[#8b5cf6]/30 transition-all duration-500">
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#8b5cf6]/10 rounded-full blur-[80px] group-hover:bg-[#8b5cf6]/20 transition-all duration-500" />
                
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/5 border border-[#8b5cf6]/30 flex items-center justify-center">
                        <Truck className="w-8 h-8 text-[#8b5cf6]" />
                      </div>
                      <span className="px-4 py-2 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6] text-sm font-medium">
                        Step 04
                      </span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">Cold-Chain Shipping</h3>
                    <p className="text-white/50 text-lg leading-relaxed">
                      Temperature-controlled packaging with real-time monitoring ensures compound stability from our lab to your research facility.
                    </p>
                  </div>
                  
                  {/* Visual Temperature Indicator */}
                  <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                    <div className="w-3 h-3 rounded-full bg-[#06b6d4] animate-pulse" style={{ boxShadow: '0 0 10px #06b6d4' }} />
                    <span className="text-white/60 text-sm">-20°C</span>
                    <span className="text-white/30">→</span>
                    <span className="text-white/60 text-sm">Monitored</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row - Floating Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#f97316]/20 via-[#ec4899]/20 to-[#8b5cf6]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative text-center p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300">
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#f97316] to-[#ec4899] bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/40">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gradient">Research</span>
              <span className="text-white"> Catalog</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Explore our comprehensive collection of research peptides.
            </p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {['All', ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-[#f97316] text-white'
                    : 'bg-white/[0.03] border border-white/[0.08] text-white/60 hover:bg-white/[0.06] hover:border-white/[0.12]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.slice(0, 8).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          {filteredProducts.length > 8 && (
            <div className="text-center mt-16">
              <Link 
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/60 hover:bg-white/[0.06] hover:border-white/[0.15] hover:text-white transition-all"
              >
                View All {filteredProducts.length} Products
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gradient">Research</span>
              <span className="text-white"> Journal</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Educational resources covering peptide science and laboratory applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogPosts.slice(0, 6).map((post, i) => (
              <Link 
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="card-premium p-6 group block"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="badge-premium">{post.category}</span>
                  <span className="text-xs text-white/30">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#f97316] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm text-[#f97316] opacity-0 group-hover:opacity-100 transition-opacity">
                  Read Article <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="gradient-border p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Ready to advance</span>
              <span className="text-gradient block">your research?</span>
            </h2>
            <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of researchers who trust us for their peptide supply.
            </p>
            <Link to="/products" className="btn-premium px-10 py-5 text-white inline-flex items-center gap-2 text-lg">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
