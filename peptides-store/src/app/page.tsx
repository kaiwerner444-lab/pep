import Link from "next/link";
import { ArrowRight, Beaker, Shield, Truck, Award } from "lucide-react";
import { ProductCard } from "@/components/product-card";

const featuredProducts = [
  { id: 1, name: "BPC-157 5MG", description: "Research peptide for tissue studies", price: 35.00, category: "Tissue Research", image: "/vial.jpg" },
  { id: 2, name: "TB-500 5MG", description: "Thymosin Beta-4 research peptide", price: 35.00, category: "Thymosin Research", image: "/vial.jpg" },
  { id: 3, name: "GHK-CU 50MG", description: "Copper peptide complex", price: 48.00, category: "Copper Peptides", image: "/vial.jpg" },
  { id: 4, name: "GLP-1 SM 10MG", description: "Semaglutide analog", price: 128.00, category: "Glucagon Analogs", image: "/vial.jpg" },
];

const features = [
  { icon: Beaker, title: "Lab Certified", description: "HPLC & MS tested for 99%+ purity" },
  { icon: Shield, title: "Secure Delivery", description: "Discrete packaging with tracking" },
  { icon: Truck, title: "Fast Shipping", description: "2-3 day domestic delivery" },
  { icon: Award, title: "Premium Quality", description: "Research-grade compounds" },
];

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b] via-[#0f0f10] to-[#0a0a0b]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#b87333]/5 rounded-full blur-[150px]" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <p className="text-zinc-500 text-sm tracking-[0.2em] uppercase mb-6">
            Premium Research Compounds
          </p>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8 tracking-tight">
            Elevate Your
            <span className="block font-semibold gradient-text mt-2">Research</span>
          </h1>
          
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Laboratory-grade peptides for scientific advancement. 
            Rigorous third-party testing ensures uncompromising quality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#b87333] hover:bg-[#cd7f32] text-white rounded-lg font-medium transition-all"
            >
              Browse Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-zinc-700 hover:border-zinc-500 text-white rounded-lg font-medium transition-all"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-8 mt-20 pt-12 border-t border-zinc-800">
            {[
              { value: "31+", label: "Products" },
              { value: "99%", label: "Purity" },
              { value: "10K+", label: "Researchers" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-light text-white mb-1">{stat.value}</div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="group p-6 rounded-2xl bg-[#141415] border border-zinc-800 hover:border-[#b87333]/30 transition-all card-hover">
                <feature.icon className="w-6 h-6 text-[#b87333] mb-4" />
                <h3 className="text-white font-medium mb-2">{feature.title}</h3>
                <p className="text-zinc-500 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-zinc-500 text-sm tracking-wider uppercase mb-2">Featured</p>
              <h2 className="text-3xl md:text-4xl font-light text-white">
                Popular <span className="font-semibold gradient-text">Compounds</span>
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-light text-white mb-6">
            Ready to Advance Your <span className="gradient-text font-semibold">Research?</span>
          </h2>
          <p className="text-zinc-400 mb-10 max-w-xl mx-auto">
            Join thousands of researchers who trust our quality and service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-all"
            >
              Shop Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-zinc-700 text-white rounded-lg font-medium hover:border-zinc-500 transition-all"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
