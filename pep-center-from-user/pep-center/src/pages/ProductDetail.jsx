import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductBySlug, products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { ChevronRight, ShoppingCart, Check, Shield, Beaker, Package, ArrowRight } from 'lucide-react';

// Bundle definitions
const bundles = [
  {
    id: 'healing-bundle',
    name: 'Healing Research Bundle',
    description: 'Complete tissue repair research set',
    price: 120,
    originalPrice: 140,
    discount: 15,
    productIds: ['bpc-157-5mg', 'bpc-157-10mg', 'tb-500-5mg', 'tb-500-10mg'],
  },
  {
    id: 'metabolic-bundle',
    name: 'Metabolic Research Bundle',
    description: 'GLP-1 sequences for metabolic studies',
    price: 360,
    originalPrice: 452,
    discount: 20,
    productIds: ['semaglutide-5mg', 'semaglutide-10mg', 'tirzepatide-5mg', 'tirzepatide-10mg'],
  },
  {
    id: 'starter-bundle',
    name: 'Laboratory Starter Bundle',
    description: 'Essential peptides for new labs',
    price: 170,
    originalPrice: 194,
    discount: 12,
    productIds: ['bpc-157-5mg', 'bpc-157-10mg', 'tb-500-5mg', 'tb-500-10mg', 'ghk-cu-50mg', 'pt-141-10mg'],
  },
];

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
          <Link to="/products" className="text-[#f97316]">Back to Products</Link>
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
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const relatedBundles = bundles.filter(bundle => 
    bundle.productIds.includes(product?.id)
  );

  const specs = [
    { icon: Beaker, label: 'Purity', value: product.purity || '≥99%', color: 'text-[#f97316]' },
    { icon: Shield, label: 'Testing', value: 'HPLC', color: 'text-green-400' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link to="/" className="hover:text-white/70">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/products" className="hover:text-white/70">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Image */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08]">
              <img 
                src={product.image || '/product_vial.jpg'} 
                alt={product.name}
                className="w-full h-full object-contain p-12"
              />
            </div>
          </div>

          {/* Right - Details */}
          <div className="space-y-6">
            <div>
              <p className="text-[#f97316] mb-2">{product.category}</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">{product.name}</h1>
              <p className="text-lg text-white/60">{product.subtitle}</p>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-[#f97316]">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-white/30 line-through">${product.originalPrice}</span>
              )}
            </div>

            <p className="text-white/70 leading-relaxed">{product.description}</p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3">
              {specs.map((spec, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <spec.icon className={`w-5 h-5 ${spec.color}`} />
                    <span className="text-xs text-white/40 uppercase">{spec.label}</span>
                  </div>
                  <span className={`font-semibold ${spec.color}`}>{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Add to Cart */}
            <div className="pt-4">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                  isAdded 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/40' 
                    : 'bg-[#f97316] text-white hover:bg-[#ea580c]'
                }`}
              >
                {isAdded ? (
                  <><Check className="w-6 h-6" /> Added!</>
                ) : (
                  <><ShoppingCart className="w-6 h-6" /> Add to Cart</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bundles Section */}
        {relatedBundles.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Package className="w-6 h-6 text-[#f97316]" />
              Available in Bundles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedBundles.map((bundle) => (
                <div key={bundle.id} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{bundle.name}</h3>
                      <p className="text-white/50 text-sm">{bundle.description}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">
                      Save {bundle.discount}%
                    </span>
                  </div>
                  <div className="flex items-end justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-white/40 line-through text-sm">${bundle.originalPrice}</span>
                      <div className="text-2xl font-bold text-[#f97316]">${bundle.price}</div>
                    </div>
                    <Link to="/bundles" className="px-6 py-2 bg-[#f97316] text-white rounded-xl hover:bg-[#ea580c] transition-colors flex items-center gap-2">
                      View Bundle <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
