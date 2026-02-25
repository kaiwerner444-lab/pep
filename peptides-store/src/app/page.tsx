import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="pt-16">
      {/* INSANE Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0b] via-[#141415] to-[#0a0a0b]" />
        
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#b87333]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#cd7f32]/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b87333]/10 border border-[#b87333]/20">
                <span className="w-2 h-2 bg-[#b87333] rounded-full animate-pulse" />
                <span className="text-sm text-[#b87333] uppercase tracking-wider">Premium Research Compounds</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[0.9] tracking-tight">
                Pure
                <span className="block font-semibold gradient-text mt-2">Science</span>
              </h1>
              
              <p className="text-lg text-zinc-400 max-w-md leading-relaxed">
                Laboratory-grade peptides with uncompromising purity. 
                Trusted by researchers worldwide.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#b87333] hover:bg-[#cd7f32] text-white rounded-lg font-medium transition-all hover:scale-105"
                >
                  Explore Products
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-zinc-700 hover:border-zinc-500 text-white rounded-lg font-medium transition-all"
                >
                  Our Process
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-12 pt-8 border-t border-zinc-800">
                {[
                  { value: "99.9%", label: "Purity" },
                  { value: "31+", label: "Products" },
                  { value: "24/7", label: "Support" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-light text-white">{stat.value}</div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right content - 3D Vial */}
            <div className="relative flex items-center justify-center">
              {/* Glow behind vial */}
              <div className="absolute w-[400px] h-[400px] bg-[#b87333]/20 rounded-full blur-[80px] animate-pulse" />
              
              {/* Floating vial container */}
              <div className="relative animate-float">
                <Image 
                  src="/vial-3d.svg" 
                  alt="Premium Research Vial"
                  width={400}
                  height={600}
                  className="relative z-10 drop-shadow-2xl"
                  priority
                />
                
                {/* Reflection */}
                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[200px] h-[40px] bg-gradient-to-b from-[#b87333]/20 to-transparent rounded-full blur-xl" />
              </div>

              {/* Floating badges */}
              <div className="absolute top-10 right-10 px-4 py-2 bg-[#141415]/80 backdrop-blur-sm border border-zinc-800 rounded-lg">
                <span className="text-xs text-zinc-400">HPLC Tested</span>
              </div>
              <div className="absolute bottom-20 left-0 px-4 py-2 bg-[#141415]/80 backdrop-blur-sm border border-[#b87333]/30 rounded-lg">
                <span className="text-xs text-[#b87333]">≥99% Pure</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0b] to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-24 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-zinc-500 text-sm tracking-wider uppercase mb-4">Why Researchers Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-light text-white">
              Uncompromising <span className="gradient-text font-semibold">Quality</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Lab Certified", desc: "Every batch HPLC & MS tested for purity verification" },
              { title: "Fast Shipping", desc: "2-3 day domestic delivery with discrete packaging" },
              { title: "Expert Support", desc: "24/7 customer service from our research team" },
            ].map((feature) => (
              <div key={feature.title} className="p-8 rounded-2xl bg-[#141415] border border-zinc-800 hover:border-[#b87333]/30 transition-all card-hover">
                <h3 className="text-white font-medium mb-2">{feature.title}</h3>
                <p className="text-zinc-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Ready to Elevate Your <span className="gradient-text font-semibold">Research?</span>
          </h2>
          <p className="text-zinc-400 mb-10 max-w-xl mx-auto">
            Join thousands of researchers who trust our quality and expertise.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black rounded-lg font-semibold hover:bg-zinc-200 transition-all"
          >
            Shop Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
