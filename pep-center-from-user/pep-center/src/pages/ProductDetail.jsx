import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductBySlug, products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { ChevronRight, ShoppingCart, Beaker, Shield, FileCheck, Snowflake, Zap, ArrowLeft, Check } from 'lucide-react';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <Link to="/products" className="text-[#f97316] hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Return to catalog
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const specs = [
    { icon: Beaker, label: 'Purity', value: product.purity, color: 'text-[#f97316]' },
    { icon: Shield, label: 'Testing', value: 'HPLC', color: 'text-green-400' },
    { icon: Snowflake, label: 'Form', value: 'Lyophilized', color: 'text-blue-400' },
    { icon: FileCheck, label: 'COA', value: 'Included', color: 'text-green-400' },
  ];

  return (
    <div className="relative min-h-screen pt-20 pb-24 overflow-hidden">
      {/* Animated Background Glow */}
      <div 
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.3) 0%, transparent 70%)',
          left: mousePos.x - 300,
          top: mousePos.y - 300,
          transition: 'left 0.5s ease-out, top 0.5s ease-out',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/40 mb-8 animate-fade-in">
          <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/products" className="hover:text-white/70 transition-colors">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white/70">{product.category}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Product Image with Effects */}
          <div className="relative">
            {/* Floating Badge - Purity */}
            <div className="absolute -left-4 top-1/4 z-20 animate-float" style={{ animationDelay: '0.3s' }}>
              <div className="glass px-4 py-3 rounded-2xl border border-[#f97316]/20">
                <p className="text-xs text-[#f97316] uppercase tracking-wider mb-1">Purity</p>
                <p className="text-2xl font-bold text-[#f97316]">{product.purity}</p>
              </div>
            </div>

            {/* Main Image Container */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] group">
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                   style={{
                     background: 'linear-gradient(135deg, rgba(249,115,22,0.3), transparent, rgba(249,115,22,0.1))',
                     padding: '1px',
                     mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                     maskComposite: 'xor',
                     WebkitMaskComposite: 'xor',
                   }} />
              
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-x-full group-hover:translate-x-full" />

              {/* Top Badges */}
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="px-4 py-2 rounded-full bg-[#f97316]/20 border border-[#f97316]/30 text-xs font-semibold text-[#f97316] backdrop-blur-sm">
                  {product.purity} PURITY
                </span>
              </div>
              
              <div className="absolute top-6 right-6">
                <span className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-xs font-semibold text-green-400 backdrop-blur-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  IN STOCK
                </span>
              </div>

              {/* Bottom Gradient */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Floating Badge - Quality */}
            <div className="absolute -right-4 bottom-1/4 z-20 animate-float" style={{ animationDelay: '0.6s' }}>
              <div className="glass px-4 py-3 rounded-2xl border border-green-500/20">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-semibold text-green-400">HPLC Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6">
            {/* Category & Title */}
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs text-white/60">
                  {product.category}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-white/[0.1] to-transparent" />
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {product.name}
              </h1>
              <p className="text-lg text-[#f97316]">{product.subtitle}</p>
            </div>

            {/* Price */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-[#f97316]">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-white/30 line-through">${product.originalPrice}</span>
                )}
              </div>
            </div>

            {/* Description Card */}
            <div className="card-premium p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#f97316]" />
                Product Details
              </h3>
              <p className="text-white/60 leading-relaxed mb-4">
                {product.longDescription || product.description}
              </p>
              <p className="text-white/40 text-sm leading-relaxed">
                Synthesized under strict laboratory conditions and verified through HPLC analysis to ensure maximum purity and potency for your research needs.
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {specs.map((spec, i) => (
                <div key={i} className="card-premium p-4 group hover:border-[#f97316]/30 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center group-hover:bg-[#f97316]/10 transition-colors">
                      <spec.icon className={`w-5 h-5 ${spec.color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider">{spec.label}</p>
                      <p className={`font-semibold ${spec.color}`}>{spec.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Research Applications */}
            {product.researchApplications && (
              <div className="card-premium p-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <h3 className="text-lg font-semibold mb-4">Research Applications</h3>
                <ul className="space-y-3">
                  {product.researchApplications.map((app, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/60 group">
                      <div className="w-5 h-5 rounded-full bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#f97316]/20 transition-colors">
                        <Check className="w-3 h-3 text-[#f97316]" />
                      </div>
                      <span className="leading-relaxed">{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Add to Cart Button */}
            <div className="pt-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <button
                onClick={handleAddToCart}
                className={`w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  isAdded 
                    ? 'bg-green-500/20 border border-green-500/40 text-green-400' 
                    : 'bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white hover:shadow-lg hover:shadow-[#f97316]/25 hover:scale-[1.02]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-6 h-6" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-6 h-6" />
                    Add to Cart — ${product.price}
                  </>
                )}
              </button>
              
              <p className="text-xs text-white/30 text-center mt-4 leading-relaxed">
                This product is sold for laboratory research use only. Not for human or animal consumption.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">
                <span className="text-gradient">Related</span> Products
              </h2>
              <Link to="/products" className="text-white/50 hover:text-white flex items-center gap-1 transition-colors">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
