import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check, Package, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Simple hardcoded bundles
const bundles = [
  {
    id: 1,
    name: 'Bundle A — BPC/TB Reference Set',
    description: 'For laboratory research use only. Not for human consumption.',
    price: 120,
    originalPrice: 140,
    discount: 14,
    items: [
      { name: 'BPC-157 5mg', qty: 2, price: 35 },
      { name: 'TB-500 5mg', qty: 2, price: 35 },
    ],
    popular: true,
  },
  {
    id: 2,
    name: 'Bundle B — GLP-1 Receptor Agonist Set',
    description: 'For laboratory research use only. Not for human consumption.',
    price: 360,
    originalPrice: 452,
    discount: 20,
    items: [
      { name: 'Semaglutide 10mg', qty: 1, price: 150 },
      { name: 'Tirzepatide 10mg', qty: 1, price: 162 },
      { name: 'Retatrutide 10mg', qty: 1, price: 140 },
    ],
    popular: false,
  },
  {
    id: 3,
    name: 'Bundle C — Starter Reference Set',
    description: 'For laboratory research use only. Not for human consumption.',
    price: 170,
    originalPrice: 194,
    discount: 12,
    items: [
      { name: 'BPC-157 5mg', qty: 2, price: 35 },
      { name: 'TB-500 5mg', qty: 2, price: 35 },
      { name: 'Glutathione 600mg', qty: 1, price: 54 },
      { name: 'PT-141 10mg', qty: 1, price: 40 },
    ],
    popular: false,
  },
  {
    id: 4,
    name: 'Bundle D — Copper Peptide & Matrix Set',
    description: 'For laboratory research use only. Not for human consumption.',
    price: 250,
    originalPrice: 315,
    discount: 21,
    items: [
      { name: 'GHK-Cu 100mg', qty: 1, price: 95 },
      { name: 'GLOW Blend', qty: 1, price: 125 },
      { name: 'NAD+ 500mg', qty: 1, price: 95 },
    ],
    popular: false,
  },
  {
    id: 5,
    name: 'Bundle E — Telomere & Mitochondrial Peptide Set',
    description: 'For laboratory research use only. Not for human consumption.',
    price: 189,
    originalPrice: 235,
    discount: 20,
    items: [
      { name: 'Epitalon 10mg', qty: 1, price: 75 },
      { name: 'MOTS-c 10mg', qty: 1, price: 65 },
      { name: 'NAD+ 500mg', qty: 1, price: 95 },
    ],
    popular: false,
  },
  {
    id: 6,
    name: 'Bundle F — Neuropeptide Set',
    description: 'For laboratory research use only. Not for human consumption.',
    price: 110,
    originalPrice: 135,
    discount: 19,
    items: [
      { name: 'Semax 10mg', qty: 1, price: 45 },
      { name: 'Selank 10mg', qty: 1, price: 55 },
      { name: 'Noopept 10mg', qty: 1, price: 35 },
    ],
    popular: false,
  },
  {
    id: 7,
    name: 'Bundle G — GH Fragment & Metabolic Peptide Set',
    description: 'For laboratory research use only. Not for human consumption.',
    price: 149,
    originalPrice: 180,
    discount: 17,
    items: [
      { name: 'AOD-9604 5mg', qty: 1, price: 60 },
      { name: 'HGH Fragment 176-191 5mg', qty: 1, price: 55 },
      { name: 'MOTS-c 10mg', qty: 1, price: 65 },
    ],
    popular: false,
  },
  {
    id: 8,
    name: 'Bundle H — Antimicrobial Peptide Set',
    description: 'For laboratory research use only. Not for human consumption.',
    price: 169,
    originalPrice: 205,
    discount: 18,
    items: [
      { name: 'LL-37 5mg', qty: 1, price: 85 },
      { name: 'KPV 10mg', qty: 1, price: 65 },
      { name: 'Thymosin Beta-4 5mg', qty: 1, price: 55 },
    ],
    popular: false,
  },
  {
    id: 9,
    name: 'Bundle I — BPC/TB Extended Set',
    description: 'For laboratory research use only. Not for human consumption.',
    price: 175,
    originalPrice: 215,
    discount: 19,
    items: [
      { name: 'BPC-157 10mg', qty: 1, price: 65 },
      { name: 'TB-500 10mg', qty: 1, price: 65 },
      { name: 'BPC-157/TB-500 Blend 5mg/5mg', qty: 1, price: 85 },
    ],
    popular: false,
  },
  {
    id: 10,
    name: 'Bundle J — Melanocortin Peptide Set',
    description: 'For laboratory research use only. Not for human consumption.',
    price: 79,
    originalPrice: 95,
    discount: 17,
    items: [
      { name: 'Melanotan II 10mg', qty: 1, price: 45 },
      { name: 'PT-141 10mg', qty: 1, price: 50 },
    ],
    popular: false,
  },
  {
    id: 11,
    name: 'Bundle K — DSIP/BPC/Selank Set',
    description: 'For laboratory research use only. Not for human consumption.',
    price: 119,
    originalPrice: 145,
    discount: 18,
    items: [
      { name: 'DSIP 5mg', qty: 1, price: 45 },
      { name: 'BPC-157 5mg', qty: 1, price: 35 },
      { name: 'Selank 10mg', qty: 1, price: 65 },
    ],
    popular: false,
  },
  {
    id: 12,
    name: 'Bundle L — Growth Factor Peptide Set',
    description: 'For laboratory research use only. Not for human consumption.',
    price: 259,
    originalPrice: 315,
    discount: 18,
    items: [
      { name: 'IGF-1 LR3 1mg', qty: 1, price: 85 },
      { name: 'Follistatin 344 1mg', qty: 1, price: 165 },
      { name: 'PEG-MGF 2mg', qty: 1, price: 65 },
    ],
    popular: false,
  },
];

export default function Bundles() {
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState(null);

  const handleAddBundle = (bundle) => {
    // Add each item in the bundle
    bundle.items.forEach((item) => {
      for (let i = 0; i < item.qty; i++) {
        addItem({
          id: bundle.id * 100 + i,
          name: item.name,
          price: item.price,
          subtitle: 'Research Peptide',
          image: '/product_vial.jpg',
        });
      }
    });
    setAddedId(bundle.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Research <span className="text-[#f97316]">Bundles</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Save on curated peptide combinations for your laboratory research
          </p>
        </div>

        {/* Bundles Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              className={`rounded-3xl p-6 border ${
                bundle.popular
                  ? 'border-[#f97316] bg-gradient-to-b from-[#f97316]/10 to-transparent'
                  : 'border-white/10 bg-white/[0.03]'
              }`}
            >
              {/* Popular Badge */}
              {bundle.popular && (
                <div className="inline-block px-3 py-1 bg-[#f97316] rounded-full text-xs font-bold text-white mb-4">
                  Most Popular
                </div>
              )}

              {/* Icon & Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#f97316]/20 flex items-center justify-center">
                  <Package className="w-6 h-6 text-[#f97316]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{bundle.name}</h3>
                  <p className="text-sm text-white/50">{bundle.description}</p>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2 mb-6">
                {bundle.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-2 border-b border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs text-[#f97316] font-bold">
                        {item.qty}x
                      </span>
                      <span className="text-white/70 text-sm">{item.name}</span>
                    </div>
                    <span className="text-white/40 text-sm">${item.price}</span>
                  </div>
                ))}
              </div>

              {/* Price Box */}
              <div className="bg-white/[0.05] rounded-2xl p-4 mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/50">Original Price</span>
                  <span className="text-white/50 line-through">
                    ${bundle.originalPrice}
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#f97316]">Bundle Discount</span>
                  <span className="text-[#f97316]">-{bundle.discount}%</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/10">
                  <span className="text-white font-medium">Your Price</span>
                  <span className="text-3xl font-bold text-[#f97316]">
                    ${bundle.price}
                  </span>
                </div>
              </div>

              {/* Savings */}
              <div className="flex items-center justify-center gap-2 text-green-400 text-sm mb-4">
                <Zap className="w-4 h-4" />
                <span>Save ${bundle.originalPrice - bundle.price}</span>
              </div>

              {/* Add Button */}
              <button
                onClick={() => handleAddBundle(bundle)}
                className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  addedId === bundle.id
                    ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                    : 'bg-[#f97316] text-white hover:bg-[#ea580c]'
                }`}
              >
                {addedId === bundle.id ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add Bundle - ${bundle.price}
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            ← Browse All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
