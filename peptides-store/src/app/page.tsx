import Link from "next/link";
import { ArrowRight, Beaker, Shield, Truck, Award, Zap, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/product-card";

const featuredProducts = [
  { id: 6, name: "BPC-157", description: "Body Protection Compound - 5mg/10mg", price: 35.00, category: "Healing", image: "/vial.jpg" },
  { id: 30, name: "TB-500 (Thymosin Beta-4)", description: "Recovery peptide - 5mg", price: 35.00, category: "Recovery", image: "/vial.jpg" },
  { id: 12, name: "GLP-1 SM 10MG", description: "Semaglutide analog - 10mg", price: 128.00, category: "GLP-1", image: "/vial.jpg" },
  { id: 16, name: "Glow (GHK-CU, TB-500, BPC-157)", description: "Skin & healing blend", price: 115.00, category: "Bundles", image: "/vial.jpg" },
];

const features = [
  {
    icon: Beaker,
    title: "Lab Certified",
    description: "Every batch HPLC & MS tested for 99%+ purity",
  },
  {
    icon: Shield,
    title: "Secure Delivery",
    description: "Discrete packaging with real-time tracking",
  },
  {
    icon: Truck,
    title: "Express Shipping",
    description: "2-3 day delivery on all domestic orders",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Research-grade compounds guaranteed",
  },
];

const stats = [
  { value: "31+", label: "Premium Products" },
  { value: "99%+", label: "Purity Guaranteed" },
  { value: "10K+", label: "Researchers" },
  { value: "24h", label: "Support" },
];

export default function Home() {
  return (
    <div className="pt-16">
      {/* Premium Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-premium">
        {/* Animated particles */}
        <div className="particles">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-500/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-yellow-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[200px]" />

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,107,0,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,107,0,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="fade-in-up inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-premium text-orange-400 text-sm font-medium mb-10 border border-orange-500/30">
            <Sparkles className="w-4 h-4" />
            <span>Premium Research Compounds</span>
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          </div>
          
          {/* Main headline with animation */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-[0.9] tracking-tight">
            <span className="block text-white mb-2 fade-in-up" style={{ animationDelay: '0.1s' }}>
              Unlock Your
            </span>
            <span className="gradient-text glow-text fade-in-up" style={{ animationDelay: '0.2s' }}>
              Potential
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed fade-in-up" style={{ animationDelay: '0.3s' }}>
            Elite-grade peptides for cutting-edge scientific research. 
            <span className="text-orange-400"> 99%+ purity</span>, verified potency, 
            unmatched quality.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link
              href="/products"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-2xl font-semibold text-lg transition-all hover:scale-105 glow-orange btn-shine pulse-glow"
            >
              Explore Collection
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 glass text-white rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all hover:scale-105"
            >
              Our Story
            </Link>
          </div>

          {/* Premium Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto fade-in-up" style={{ animationDelay: '0.5s' }}>
            {stats.map((stat, i) => (
              <div key={stat.label} className="p-6 rounded-2xl glass-premium hover-lift">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center p-2">
            <div className="w-1.5 h-3 bg-orange-500 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium text-orange-400 text-sm mb-6">
              <Zap className="w-4 h-4" />
              Why Choose Us
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              The <span className="gradient-text">Gold Standard</span>
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Uncompromising quality for uncompromising researchers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group p-8 rounded-3xl glass card-glow hover-lift relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium text-orange-400 text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                Best Sellers
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Featured <span className="gradient-text">Products</span>
              </h2>
              <p className="text-gray-400 text-xl">Our most popular research peptides</p>
            </div>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 mt-8 md:mt-0 text-lg font-medium transition-colors"
            >
              View All Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, i) => (
              <div key={product.id} className="fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-yellow-600/20 to-orange-600/20 animate-pulse" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-orange-500/20 rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
            Ready to <span className="gradient-text">Elevate</span> Your Research?
          </h2>
          <p className="text-gray-300 text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of elite researchers who trust PeptideLabs for their most critical studies. 
            Experience the difference that true quality makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/products"
              className="group inline-flex items-center justify-center gap-3 px-12 py-6 bg-white text-black rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105"
            >
              Shop Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-12 py-6 glass-premium text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all border border-orange-500/30"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
