import Link from "next/link";
import { ArrowRight, Beaker, Shield, Truck, Award } from "lucide-react";
import { ProductCard } from "@/components/product-card";

const featuredProducts = [
  {
    id: 1,
    name: "BPC-157",
    description: "Body Protection Compound - 5mg vial",
    price: 49.99,
    category: "Healing",
    image: "/product-1.jpg",
  },
  {
    id: 2,
    name: "TB-500",
    description: "Thymosin Beta-4 - 5mg vial",
    price: 54.99,
    category: "Recovery",
    image: "/product-2.jpg",
  },
  {
    id: 3,
    name: "CJC-1295",
    description: "Growth Hormone Releasing Hormone - 2mg",
    price: 39.99,
    category: "Performance",
    image: "/product-3.jpg",
  },
  {
    id: 4,
    name: "Ipamorelin",
    description: "Growth Hormone Secretagogue - 2mg",
    price: 34.99,
    category: "Performance",
    image: "/product-4.jpg",
  },
];

const features = [
  {
    icon: Beaker,
    title: "Lab Tested",
    description: "Every batch HPLC tested for purity and potency",
  },
  {
    icon: Shield,
    title: "Secure Shipping",
    description: "Discrete packaging with tracking included",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "2-3 day shipping on all domestic orders",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "99%+ purity guaranteed or money back",
  },
];

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Premium Research Compounds
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-white">Advance Your</span>
            <span className="gradient-text">Research</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Lab-tested peptides for scientific research. 99%+ purity, 
            fast shipping, and exceptional quality guaranteed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all hover:scale-105 glow-blue"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold transition-all"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-sm text-gray-500">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">99%+</div>
              <div className="text-sm text-gray-500">Purity</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10k+</div>
              <div className="text-sm text-gray-500">Researchers</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-gray-400 rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Why Researchers Choose Us</h2>
            <p className="text-gray-400">Committed to quality, purity, and your research success</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Featured Products</h2>
              <p className="text-gray-400">Our most popular research peptides</p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mt-4 md:mt-0 transition-colors"
            >
              View All Products
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
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Advance Your Research?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of researchers who trust PeptideLabs for their research needs. 
            New customers get 15% off their first order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-all"
            >
              Shop Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
