import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductBySlug, products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import { ChevronRight, ShoppingCart, Check, Shield, Beaker, Package, ArrowRight } from 'lucide-react';

// Bundle definitions - must match Bundles.jsx
const bundles = [
  {
    id: 'bundle-a',
    name: 'Bundle A — BPC/TB Reference Set',
    description: '2x BPC-157 5mg, 2x TB-500 5mg - Essential healing research compounds',
    price: 120,
    originalPrice: 140,
    discount: 14,
    productIds: ['bpc-157-5mg', 'tb-500-5mg'],
  },
  {
    id: 'bundle-b',
    name: 'Bundle B — GLP-1 Receptor Agonist Set',
    description: 'Semaglutide, Tirzepatide, Retatrutide - Metabolic research peptides',
    price: 360,
    originalPrice: 452,
    discount: 20,
    productIds: ['semaglutide-10mg', 'tirzepatide-10mg', 'retatrutide-10mg'],
  },
  {
    id: 'bundle-c',
    name: 'Bundle C — Starter Reference Set',
    description: 'BPC-157, TB-500, Glutathione, PT-141 - Complete starter collection',
    price: 170,
    originalPrice: 194,
    discount: 12,
    productIds: ['bpc-157-5mg', 'tb-500-5mg', 'glutathione-600mg', 'pt-141-10mg'],
  },
  {
    id: 'bundle-d',
    name: 'Bundle D — Copper Peptide & Matrix Set',
    description: 'GHK-Cu, GLOW Blend, NAD+ - Advanced research compounds',
    price: 250,
    originalPrice: 315,
    discount: 21,
    productIds: ['ghk-cu-100mg', 'glow-blend', 'nad-plus-500mg'],
  },
  {
    id: 'bundle-e',
    name: 'Bundle E — Telomere & Mitochondrial Peptide Set',
    description: 'Epitalon, MOTS-c, NAD+ - Longevity research bundle',
    price: 189,
    originalPrice: 235,
    discount: 20,
    productIds: ['epitalon-10mg', 'mots-c-10mg', 'nad-plus-500mg'],
  },
  {
    id: 'bundle-f',
    name: 'Bundle F — Neuropeptide Set',
    description: 'Semax, Selank, Noopept - Cognitive research peptides',
    price: 110,
    originalPrice: 135,
    discount: 19,
    productIds: ['semax-10mg', 'selank-10mg', 'noopept-10mg'],
  },
  {
    id: 'bundle-g',
    name: 'Bundle G — GH Fragment & Metabolic Peptide Set',
    description: 'AOD-9604, HGH Fragment 176-191, MOTS-c - Growth research bundle',
    price: 149,
    originalPrice: 180,
    discount: 17,
    productIds: ['aod-9604-5mg', 'hgh-fragment-176-191-5mg', 'mots-c-10mg'],
  },
  {
    id: 'bundle-h',
    name: 'Bundle H — Antimicrobial Peptide Set',
    description: 'LL-37, KPV, Thymosin Beta-4 - Immune research compounds',
    price: 169,
    originalPrice: 205,
    discount: 18,
    productIds: ['ll-37-5mg', 'kpv-10mg', 'thymosin-beta-4-5mg'],
  },
  {
    id: 'bundle-i',
    name: 'Bundle I — BPC/TB Extended Set',
    description: 'BPC-157 10mg, TB-500 10mg, BPC-157/TB-500 Blend - Advanced healing',
    price: 175,
    originalPrice: 215,
    discount: 19,
    productIds: ['bpc-157-10mg', 'tb-500-10mg', 'bpc-tb-blend'],
  },
  {
    id: 'bundle-j',
    name: 'Bundle J — Melanocortin Peptide Set',
    description: 'Melanotan II, PT-141 - Pigmentation research bundle',
    price: 79,
    originalPrice: 95,
    discount: 17,
    productIds: ['melanotan-ii-10mg', 'pt-141-10mg'],
  },
  {
    id: 'bundle-k',
    name: 'Bundle K — DSIP/BPC/Selank Set',
    description: 'DSIP, BPC-157, Selank - Sleep & recovery research',
    price: 119,
    originalPrice: 145,
    discount: 18,
    productIds: ['dsip-5mg', 'bpc-157-5mg', 'selank-10mg'],
  },
  {
    id: 'bundle-l',
    name: 'Bundle L — Growth Factor Peptide Set',
    description: 'IGF-1 LR3, Follistatin 344, PEG-MGF - Growth research bundle',
    price: 259,
    originalPrice: 315,
    discount: 18,
    productIds: ['igf-1-lr3-1mg', 'follistatin-344-1mg', 'peg-mgf-2mg'],
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
        <SEO title="Product Not Found" description="The product you're looking for doesn't exist." noindex={true} path={`/products/${slug}`} />
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
      <SEO
        title={product.name}
        description={product.description || product.longDescription}
        image={product.image ? `https://pep.center${product.image}` : 'https://pep.center/product_vial.jpg'}
        type="product"
        productData={product}
        path={`/products/${slug}`}
      />
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

            <p className="text-white/70 leading-relaxed">{product.longDescription || product.description}</p>

            {/* Benefit Tags */}
            {product.benefitTags && product.benefitTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.benefitTags.map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/20">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Research Applications */}
            {product.researchApplications && product.researchApplications.length > 0 && (
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Research Applications</h3>
                <div className="grid grid-cols-1 gap-2">
                  {product.researchApplications.map((app, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-white/60 text-sm">{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
