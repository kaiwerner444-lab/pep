import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import { blogPosts } from '../data/blogPosts';
import ProductCard from '../components/ProductCard';
import { Shield, FileText, Beaker, Zap, ChevronRight, ArrowRight, Sparkles, Check, Truck, Clock, Star, Users, Award, Lock } from 'lucide-react';
import { 
  useMouseParallax, 
  useCountUp,
  AnimatedSection
} from '../hooks/useAnimations.jsx';

const features = [
  { icon: Shield, title: 'HPLC Verified', desc: 'High-Performance Liquid Chromatography analysis confirms purity.', color: '#f97316' },
  { icon: FileText, title: 'Certificate of Analysis', desc: 'Comprehensive documentation with every order.', color: '#fb923c' },
  { icon: Beaker, title: 'Third-Party Tested', desc: 'Independent laboratory verification.', color: '#fdba74' },
  { icon: Zap, title: '24/7 Support', desc: 'Always available help for your research needs.', color: '#fed7aa' },
];

const stats = [
  { value: 60, suffix: '+', label: 'Research Compounds' },
  { value: 99, suffix: '%', label: 'Purity Standards' },
  { value: 100, suffix: '+', label: 'Countries Shipped' },
];

// Static particle - no animation
function StaticParticle({ index }) {
  const position = useState({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.3 + 0.1,
  })[0];

  const colors = ['#f97316', '#fb923c', '#fdba74', '#fed7aa'];
  const color = colors[index % colors.length];

  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: position.size,
        height: position.size,
        backgroundColor: color,
        opacity: position.opacity,
      }}
    />
  );
}

// Text scramble effect
function ScrambleText({ text, className = '' }) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const chars = '!<>-_\\/[]{}—=+*^?#________';

  useEffect(() => {
    if (!isHovering) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / 2) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration += 1;
      if (iteration >= text.length * 2) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isHovering, text]);

  return (
    <span 
      className={className}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {displayText}
    </span>
  );
}

// Animated counter
function AnimatedCounter({ value, suffix, label }) {
  const { ref, count } = useCountUp(value, 2000);
  return (
    <div ref={ref} className="text-center group cursor-pointer">
      <div className="text-xl sm:text-4xl font-bold bg-gradient-to-r from-[#f97316] to-[#fb923c] bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform">
        {count}{suffix}
      </div>
      <div className="text-[10px] sm:text-sm text-white/40 group-hover:text-white/60 transition-colors">{label}</div>
    </div>
  );
}

// 3D Tilt Card
function TiltCard({ children, className = '' }) {
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setTransform({
      rotateX: ((y - centerY) / centerY) * -10,
      rotateY: ((x - centerX) / centerX) * 10,
    });
  };

  return (
    <div
      className={`${className} transition-all duration-200 ease-out`}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTransform({ rotateX: 0, rotateY: 0 });
      }}
    >
      {children}
    </div>
  );
}

// Morphing blob background - static, no animation
function MorphingBlob({ color, className = '' }) {
  return (
    <div 
      className={`absolute rounded-full blur-[100px] opacity-20 ${className}`}
      style={{ background: color }}
    />
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [particles, setParticles] = useState([]);
  const mousePos = useMouseParallax(30);

  // Initialize particles - fewer for subtle effect
  useEffect(() => {
    setParticles(Array.from({ length: 15 }, (_, i) => i));
  }, []);

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className="relative overflow-hidden">
      {/* Static Particles - subtle background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.slice(0, 15).map((_, i) => (
          <StaticParticle key={i} index={i} />
        ))}
      </div>

      {/* Animated Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <MorphingBlob color="#f97316" className="w-[600px] h-[600px] top-1/4 -left-40" />
        <MorphingBlob color="#fb923c" className="w-[500px] h-[500px] bottom-1/4 -right-40" />
        <MorphingBlob color="#fdba74" className="w-[400px] h-[400px] top-1/2 left-1/2" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <AnimatedSection animation="fadeUp" delay={0}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-[#f97316]/50 transition-all cursor-pointer group animate-pulse-glow">
                  <Sparkles className="w-4 h-4 text-[#f97316]" />
                  <span className="text-sm text-white/60 group-hover:text-white transition-colors">Premium Research Compounds</span>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fadeUp" delay={100}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                  <span className="text-white">Research</span>
                  <span className="block bg-gradient-to-r from-[#f97316] via-[#fb923c] to-[#fed7aa] bg-clip-text text-transparent animate-gradient">
                    <ScrambleText text="Grade Peptides" />
                  </span>
                </h1>
              </AnimatedSection>

              <AnimatedSection animation="fadeUp" delay={200}>
                <p className="text-lg text-white/50 max-w-lg leading-relaxed hover:text-white/70 transition-colors">
                  Laboratory-verified compounds with HPLC certification. 
                  Trusted by researchers worldwide for purity and consistency.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fadeUp" delay={300}>
                <div className="flex flex-wrap gap-4">
                  <TiltCard>
                    <Link to="/products" className="btn-premium px-8 py-4 text-white inline-flex items-center gap-2">
                      Browse Catalog
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </TiltCard>
                  <a href="#quality" className="btn-secondary px-8 py-4 text-white/80 inline-flex items-center gap-2 hover:text-white transition-colors hover:scale-105">
                    Learn More
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fadeUp" delay={400}>
                <div className="flex items-center gap-8 pt-4">
                  {stats.map((stat, i) => (
                    <AnimatedCounter key={i} {...stat} />
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Right - Static Vial */}
            <div className="relative flex items-center justify-center h-[500px] sm:h-[600px] lg:h-[800px]">
              {/* Static decorative rings */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border hidden sm:block"
                  style={{
                    width: `${300 + i * 60}px`,
                    height: `${300 + i * 60}px`,
                    borderColor: `rgba(${249 - i * 30}, ${115 + i * 30}, ${22 + i * 40}, ${0.1 - i * 0.02})`,
                  }}
                />
              ))}

              {/* Vial - static, no floating */}
              <div className="relative">
                <img 
                  src="/vial-hero.jpg" 
                  alt="Premium Vial"
                  className="w-[280px] sm:w-[340px] lg:w-[450px] h-auto rounded-2xl transition-all duration-500 hover:scale-105"
                  style={{
                    filter: 'drop-shadow(0 30px 60px rgba(249,115,22,0.4))',
                  }}
                />
                {/* Static badges around vial */}
                <div className="absolute left-2 sm:-left-16 top-1/4 glass px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-[#f97316]/30 hover:scale-110 transition-transform cursor-pointer">
                  <p className="text-[10px] sm:text-xs text-[#f97316] uppercase tracking-wider">Purity</p>
                  <p className="text-xl sm:text-3xl font-bold text-[#f97316]">99.9%</p>
                </div>

                <div className="absolute right-2 sm:-right-16 top-[15%] glass px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-[#06b6d4]/30 hover:scale-110 transition-transform cursor-pointer">
                  <p className="text-[10px] sm:text-xs text-[#06b6d4] uppercase tracking-wider">Verified</p>
                  <p className="text-lg sm:text-2xl font-bold text-white">HPLC</p>
                </div>

                <div className="absolute right-4 sm:-right-12 bottom-1/4 glass px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl border border-[#22c55e]/30 flex items-center gap-2 hover:scale-110 transition-transform cursor-pointer">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-400" style={{ boxShadow: '0 0 10px #22c55e' }} />
                  <span className="text-xs sm:text-sm font-medium text-green-400">In Stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator - subtle, no bounce */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-gradient-to-b from-[#f97316] to-[#fb923c] rounded-full" />
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <section className="py-8 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {[
              { icon: Shield, label: 'Secure SSL Checkout', sublabel: '256-bit Encryption' },
              { icon: Check, label: 'HPLC Verified', sublabel: 'Every Batch Tested' },
              { icon: Truck, label: 'Discrete Shipping', sublabel: 'Plain Packaging' },
              { icon: Clock, label: '24-48h Processing', sublabel: 'Fast Turnaround' },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-3 justify-center">
                <div className="w-10 h-10 rounded-lg bg-[#f97316]/10 flex items-center justify-center flex-shrink-0">
                  <badge.icon className="w-5 h-5 text-[#f97316]" />
                </div>
                <div className="text-left">
                  <p className="text-white text-sm font-medium">{badge.label}</p>
                  <p className="text-white/40 text-xs">{badge.sublabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Laboratory Quality Standards Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Image */}
            <AnimatedSection animation="fadeRight">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#f97316]/20 to-[#06b6d4]/20 rounded-3xl blur-2xl" />
                <img 
                  src="/lab-quality.jpg" 
                  alt="Laboratory Quality Control"
                  className="relative w-full rounded-2xl shadow-2xl"
                />
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 bg-[#0a0e17] border border-[#f97316]/30 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#f97316]/20 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-[#f97316]" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">99.8%</p>
                      <p className="text-white/50 text-sm">Average Purity</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right - Content */}
            <AnimatedSection animation="fadeLeft" delay={200}>
              <div className="space-y-6">
                <div>
                  <p className="text-[#f97316] font-medium mb-2">Quality Standards</p>
                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                    Uncompromising <span className="text-gradient">Quality</span>
                  </h2>
                  <p className="text-white/60 text-lg leading-relaxed">
                    Every peptide we produce undergoes rigorous testing and quality control to ensure the highest standards for your research.
                  </p>
                </div>

                {/* Quality Features Grid */}
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {[
                    { icon: Shield, title: 'HPLC Verified', desc: 'Every batch undergoes High-Performance Liquid Chromatography analysis to confirm purity and identity.', color: '#f97316' },
                    { icon: Sparkles, title: '99%+ Purity', desc: 'Peptides meet or exceed 99% purity standards for consistent and reliable research results.', color: '#fb923c' },
                    { icon: FileText, title: 'COA Provided', desc: 'Certificate of Analysis included with every order, documenting batch-specific test results.', color: '#fdba74' },
                    { icon: Beaker, title: 'Lab Synthesized', desc: 'Manufactured in specialized facilities under strict quality control protocols.', color: '#f97316' },
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#f97316]/30 transition-colors group">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${item.color}20` }}>
                        <item.icon className="w-5 h-5" style={{ color: item.color }} />
                      </div>
                      <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Additional Features */}
                <div className="pt-4 space-y-3">
                  {[
                    { title: 'Batch Consistency', desc: 'Rigorous quality control ensures consistent peptide composition across all batches.' },
                    { title: 'Research Grade', desc: 'Specifically formulated and tested for laboratory research applications.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{item.title}</h4>
                        <p className="text-white/50 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Stats Bar */}
          <AnimatedSection animation="fadeUp" delay={400} className="mt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: '99.8%', label: 'Average Purity' },
                { value: '50K+', label: 'Orders Shipped' },
                { value: '100%', label: 'HPLC Tested' },
                { value: '24h', label: 'Avg. Processing' },
              ].map((stat, i) => (
                <div key={i} className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                  <p className="text-3xl font-bold text-[#f97316] mb-1">{stat.value}</p>
                  <p className="text-white/50 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Quality Section */}
      <section id="quality" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection animation="fadeUp" className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 px-4">
              <span className="bg-gradient-to-r from-[#f97316] via-[#fb923c] to-[#fed7aa] bg-clip-text text-transparent">
                Uncompromising
              </span>
              <br className="hidden sm:block" />
              <span className="text-white"> Quality Standards</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mb-16">
            {features.map((feature, i) => (
              <AnimatedSection 
                key={i}
                animation="scaleIn" 
                delay={i * 150}
                className={`${i === 0 || i === 3 ? 'lg:col-span-7' : 'lg:col-span-5'}`}
              >
                <TiltCard>
                  <div 
                    className="relative h-full rounded-2xl sm:rounded-3xl overflow-hidden p-5 sm:p-8 lg:p-10 cursor-pointer group"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color}10 0%, transparent 50%)`,
                      border: `1px solid ${feature.color}30`,
                    }}
                  >
                    <div 
                      className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 rounded-full blur-[40px] sm:blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"
                      style={{ background: feature.color }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4 sm:mb-8">
                        <div 
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                          style={{ 
                            background: `${feature.color}20`,
                            border: `1px solid ${feature.color}40`,
                          }}
                        >
                          <feature.icon className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: feature.color }} />
                        </div>
                        <span 
                          className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
                          style={{ 
                            background: `${feature.color}15`,
                            border: `1px solid ${feature.color}30`,
                            color: feature.color,
                          }}
                        >
                          Step 0{i + 1}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-4 group-hover:text-[#f97316] transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-white/50 text-sm sm:text-lg leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>

          {/* Stats */}
          <AnimatedSection animation="fadeUp" delay={600}>
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {stats.map((stat, i) => (
                <TiltCard key={i}>
                  <div className="text-center p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all">
                    <AnimatedCounter {...stat} />
                  </div>
                </TiltCard>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Products - Alternating Layout */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-24">
          
          {/* BPC-157 - Image on Right */}
          <AnimatedSection animation="fadeUp">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Content */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-white/40">
                  <span className="text-[#f97316]">Purity: ≥99%</span>
                  <span>•</span>
                  <span>HPLC Verified</span>
                </div>
                
                <h2 className="text-5xl font-bold text-white">BPC-157</h2>
                <p className="text-xl text-[#f97316]">5 mg / 10 mg vials</p>
                
                <p className="text-white/60 leading-relaxed">
                  Our BPC-157 is synthesized under strict laboratory conditions and verified through HPLC analysis to ensure maximum purity and potency for your research needs.
                </p>
                
                {/* Specs */}
                <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs text-white/40 uppercase">Purity</p>
                    <p className="text-white font-semibold">≥99%</p>
                  </div>
                  <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs text-white/40 uppercase">Form</p>
                    <p className="text-white font-semibold">Lyophilized</p>
                  </div>
                  <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs text-white/40 uppercase">Storage</p>
                    <p className="text-white font-semibold">-20°C</p>
                  </div>
                </div>
                
                {/* Price & Actions */}
                <div className="flex items-center gap-4 pt-4">
                  <span className="text-4xl font-bold text-[#f97316]">$35.00</span>
                  <span className="text-white/40">per vial</span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Link 
                    to="/products/bpc-157-5mg"
                    className="px-8 py-3 bg-[#f97316] text-white rounded-xl font-semibold hover:bg-[#ea580c] transition-colors"
                  >
                    Add to Cart
                  </Link>
                  <Link 
                    to="/products/bpc-157-5mg"
                    className="px-8 py-3 border border-white/20 text-white rounded-xl font-medium hover:bg-white/5 transition-colors flex items-center gap-2"
                  >
                    View Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              
              {/* Right - Image */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#f97316]/20 to-transparent rounded-3xl blur-2xl" />
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 flex items-center justify-center p-12">
                  <img 
                    src="/product_vial.jpg" 
                    alt="BPC-157 Vial"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
                {/* Badge */}
                <div className="absolute bottom-6 right-6 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <p className="text-[10px] text-white/60 uppercase tracking-wider">Research Grade</p>
                  <p className="text-white font-bold">BPC-157</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          {/* TB-500 - Image on Left */}
          <AnimatedSection animation="fadeUp">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Image */}
              <div className="relative order-2 lg:order-1">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#fb923c]/20 to-transparent rounded-3xl blur-2xl" />
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 flex items-center justify-center p-12">
                  <img 
                    src="/product_vial.jpg" 
                    alt="TB-500 Vial"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
                {/* Badge */}
                <div className="absolute bottom-6 left-6 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <p className="text-[10px] text-white/60 uppercase tracking-wider">Research Grade</p>
                  <p className="text-white font-bold">TB-500</p>
                </div>
              </div>
              
              {/* Right - Content */}
              <div className="space-y-6 order-1 lg:order-2">
                <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-white/40">
                  <span className="text-[#f97316]">Purity: ≥99%</span>
                  <span>•</span>
                  <span>Mass Spec Confirmed</span>
                </div>
                
                <h2 className="text-5xl font-bold text-white">TB-500</h2>
                <p className="text-xl text-[#f97316]">5 mg / 10 mg vials</p>
                
                <p className="text-white/60 leading-relaxed">
                  Our TB-500 is synthesized under strict laboratory conditions and verified through HPLC analysis to ensure maximum purity and potency for your research needs.
                </p>
                
                {/* Specs */}
                <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs text-white/40 uppercase">Purity</p>
                    <p className="text-white font-semibold">≥99%</p>
                  </div>
                  <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs text-white/40 uppercase">Form</p>
                    <p className="text-white font-semibold">Lyophilized</p>
                  </div>
                  <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs text-white/40 uppercase">Storage</p>
                    <p className="text-white font-semibold">-20°C</p>
                  </div>
                </div>
                
                {/* Price & Actions */}
                <div className="flex items-center gap-4 pt-4">
                  <span className="text-4xl font-bold text-[#f97316]">$35.00</span>
                  <span className="text-white/40">per vial</span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Link 
                    to="/products/tb-500-5mg"
                    className="px-8 py-3 bg-[#f97316] text-white rounded-xl font-semibold hover:bg-[#ea580c] transition-colors"
                  >
                    Add to Cart
                  </Link>
                  <Link 
                    to="/products/tb-500-5mg"
                    className="px-8 py-3 border border-white/20 text-white rounded-xl font-medium hover:bg-white/5 transition-colors flex items-center gap-2"
                  >
                    View Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <p className="text-[#f97316] font-medium mb-2">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Trusted by Researchers
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Join thousands of satisfied researchers who trust PEP.CENTER for their laboratory needs.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Dr. Michael Chen',
                role: 'Biochemistry Researcher',
                content: 'The purity and consistency of their peptides is exceptional. HPLC results always match their certificates of analysis. Highly recommended for any serious research.',
                rating: 5,
                verified: true,
              },
              {
                name: 'Sarah Johnson, PhD',
                role: 'Cellular Biology Lab',
                content: 'Fast shipping, discrete packaging, and excellent customer support. Been ordering for 2 years without a single issue. Quality you can depend on.',
                rating: 5,
                verified: true,
              },
              {
                name: 'Dr. James Rodriguez',
                role: 'Regenerative Medicine Research',
                content: 'Their BPC-157 and TB-500 have been instrumental in our tissue repair studies. The batch consistency is remarkable. A reliable partner for our lab.',
                rating: 5,
                verified: true,
              },
            ].map((testimonial, i) => (
              <AnimatedSection key={i} animation="fadeUp" delay={i * 100}>
                <div className="h-full p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#f97316]/30 transition-all">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-[#f97316] fill-[#f97316]" />
                    ))}
                  </div>
                  
                  {/* Content */}
                  <p className="text-white/70 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className="w-10 h-10 rounded-full bg-[#f97316]/20 flex items-center justify-center">
                      <span className="text-[#f97316] font-bold">{testimonial.name[0]}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{testimonial.name}</p>
                      <p className="text-white/40 text-xs">{testimonial.role}</p>
                    </div>
                    {testimonial.verified && (
                      <div className="flex items-center gap-1 text-[10px] text-green-400">
                        <Check className="w-3 h-3" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Stats */}
          <AnimatedSection animation="fadeUp" delay={300} className="mt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '15,000+', label: 'Orders Delivered' },
                { value: '4.9/5', label: 'Average Rating' },
                { value: '98%', label: 'Repeat Customers' },
                { value: '50+', label: 'Countries Served' },
              ].map((stat, i) => (
                <div key={i} className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <p className="text-3xl font-bold text-[#f97316] mb-1">{stat.value}</p>
                  <p className="text-white/50 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us / Guarantees Section */}
      <section className="py-24 relative bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <p className="text-[#f97316] font-medium mb-2">Our Promise</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Researchers Trust Us
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: Award, 
                title: 'Quality Guarantee', 
                desc: 'Every product undergoes rigorous HPLC testing. If it doesnt meet our 99% purity standard, we dont ship it.',
                highlight: '99%+ Purity'
              },
              { 
                icon: Lock, 
                title: 'Discrete & Secure', 
                desc: 'Plain, unmarked packaging with no indication of contents. Your privacy is our priority.',
                highlight: 'Private Shipping'
              },
              { 
                icon: Users, 
                title: 'Expert Support', 
                desc: 'Our team includes PhD-level scientists available to answer your technical questions.',
                highlight: '24/7 Support'
              },
              { 
                icon: Shield, 
                title: 'Satisfaction Guaranteed', 
                desc: 'Not satisfied? Contact us within 30 days. Well make it right with a replacement or refund.',
                highlight: '30-Day Guarantee'
              },
            ].map((item, i) => (
              <AnimatedSection key={i} animation="fadeUp" delay={i * 100}>
                <div className="h-full p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#f97316]/30 hover:bg-white/[0.05] transition-all group">
                  <div className="w-14 h-14 rounded-xl bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-7 h-7 text-[#f97316]" />
                  </div>
                  <p className="text-[#f97316] text-xs font-medium mb-2 uppercase tracking-wider">{item.highlight}</p>
                  <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#f97316] to-[#fb923c] bg-clip-text text-transparent">
                Research
              </span>
              <span className="text-white"> Catalog</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="fadeUp" delay={100}>
            <div className="flex flex-wrap justify-center gap-2 mb-10 px-2">
              {['All', ...categories].map((cat, i) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    activeCategory === cat
                      ? 'bg-[#f97316] text-white shadow-lg shadow-[#f97316]/30 animate-pulse-glow'
                      : 'bg-white/[0.03] border border-white/[0.08] text-white/60 hover:bg-white/[0.06]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.slice(0, 8).map((product, index) => (
              <AnimatedSection key={product.id} animation="scaleIn" delay={index * 75}>
                <ProductCard product={product} index={index} />
              </AnimatedSection>
            ))}
          </div>

          {/* See All Products Button */}
          <AnimatedSection animation="fadeUp" delay={600} className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/[0.05] border border-white/10 rounded-full text-white font-medium hover:bg-white/10 hover:border-[#f97316]/50 transition-all duration-300 group"
            >
              <span>See All Products</span>
              <span className="text-white/40 group-hover:text-[#f97316]">({products.length})</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <p className="text-[#f97316] font-medium mb-2">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-white/50">
              Everything you need to know about our products and services.
            </p>
          </AnimatedSection>

          <div className="space-y-4">
            {[
              {
                q: 'How do I know your peptides are pure?',
                a: 'Every batch undergoes High-Performance Liquid Chromatography (HPLC) analysis. We provide a Certificate of Analysis (COA) with every order showing purity levels, typically 99% or higher.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept credit/debit cards via Stripe, cryptocurrency (BTC, ETH, USDT), and Zelle. All payments are processed securely.',
              },
              {
                q: 'How is shipping handled?',
                a: 'We ship in plain, unmarked packaging with no indication of contents. Standard shipping takes 5-7 business days, with express options available. All orders include tracking.',
              },
              {
                q: 'What is your return policy?',
                a: 'Due to the nature of research peptides, we cannot accept returns on opened products. However, if you receive a damaged or incorrect item, contact us within 30 days for a replacement or refund.',
              },
              {
                q: 'How should I store the peptides?',
                a: 'Lyophilized peptides should be stored at -20°C (-4°F) for long-term stability. Once reconstituted, store at 2-8°C (36-46°F) and use within the timeframe specified in your research protocol.',
              },
              {
                q: 'Are these products for human use?',
                a: 'No. All products are sold strictly for laboratory research purposes only. They are not intended for human or animal consumption, diagnosis, treatment, or prevention of any disease.',
              },
            ].map((faq, i) => (
              <AnimatedSection key={i} animation="fadeUp" delay={i * 50}>
                <details className="group rounded-xl bg-white/[0.03] border border-white/10 open:border-[#f97316]/30 transition-all">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="text-white font-medium pr-4">{faq.q}</h3>
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-open:bg-[#f97316]/20 transition-colors flex-shrink-0">
                      <span className="text-white/60 group-open:text-[#f97316] text-xl transition-transform group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-white/60 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#f97316] to-[#fb923c] bg-clip-text text-transparent">
                Research
              </span>
              <span className="text-white"> Journal</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogPosts.slice(0, 6).map((post, i) => (
              <AnimatedSection key={post.slug} animation="fadeUp" delay={i * 100}>
                <Link 
                  to={`/blog/${post.slug}`}
                  className="group block h-full p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="badge-premium group-hover:scale-110 transition-transform">{post.category}</span>
                    <span className="text-xs text-white/30">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#f97316] transition-colors">
                    <ScrambleText text={post.title} />
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
