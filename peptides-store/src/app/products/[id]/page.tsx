"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, ArrowLeft, Beaker, Shield, Truck, Check } from "lucide-react";

const allProducts = [
  {
    id: 1,
    name: "BPC-157",
    description: "Body Protection Compound - 5mg vial",
    price: 49.99,
    category: "Healing",
    fullDescription: "BPC-157 is a synthetic peptide consisting of 15 amino acids. It is derived from a protective protein found in the stomach. Research suggests it may accelerate healing of various tissues including muscle, tendon, and ligament.",
    specifications: {
      sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val",
      molecularWeight: "1419.5 g/mol",
      purity: "≥99.0%",
      form: "Lyophilized Powder",
      storage: "-20°C",
    },
    researchAreas: ["Tissue healing", "Gut health", "Anti-inflammatory", "Muscle recovery"],
  },
  {
    id: 2,
    name: "TB-500",
    description: "Thymosin Beta-4 - 5mg vial",
    price: 54.99,
    category: "Recovery",
    fullDescription: "TB-500 is a synthetic version of Thymosin Beta-4, a protein present in almost all human and animal cells. Research indicates it plays a vital role in healing, cell migration, and tissue regeneration.",
    specifications: {
      sequence: "Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys-Phe-Asp-Lys-Ser-Lys-Leu-Lys-Lys-Thr-Glu-Thr-Gln-Glu-Lys-Asn-Pro-Leu-Pro-Ser-Lys-Glu-Thr-Ile-Glu-Gln-Glu-Lys-Gln-Ala-Gly-Glu-Ser-OH",
      molecularWeight: "4963.4 g/mol",
      purity: "≥99.0%",
      form: "Lyophilized Powder",
      storage: "-20°C",
    },
    researchAreas: ["Wound healing", "Tissue repair", "Flexibility", "Recovery"],
  },
  {
    id: 3,
    name: "CJC-1295",
    description: "Growth Hormone Releasing Hormone - 2mg",
    price: 39.99,
    category: "Performance",
    fullDescription: "CJC-1295 is a synthetic GHRH analog that selectively increases GH and IGF-1 levels. The DAC (Drug Affinity Complex) version extends its half-life significantly.",
    specifications: {
      sequence: "Tyr-D-Ala-Asp-Ala-Ile-Phe-Thr-Gln-Ser-Tyr-Arg-Lys-Val-Leu-Ala-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Met-Ser-Arg-Gln-Gln-Gly-Glu-Ser-Asn-Gln-Glu-Arg-Gly-Ala-Arg-Ala-Arg-Leu-NH2",
      molecularWeight: "3367.9 g/mol",
      purity: "≥98.5%",
      form: "Lyophilized Powder",
      storage: "-20°C",
    },
    researchAreas: ["Growth hormone", "Muscle growth", "Fat loss", "Anti-aging"],
  },
  {
    id: 4,
    name: "Ipamorelin",
    description: "Growth Hormone Secretagogue - 2mg",
    price: 34.99,
    category: "Performance",
    fullDescription: "Ipamorelin is a selective growth hormone secretagogue that stimulates the pituitary gland to release GH without significantly raising cortisol, acetylcholine, or prolactin levels.",
    specifications: {
      sequence: "Aib-His-D-2-Nal-D-Phe-Lys-NH2",
      molecularWeight: "711.9 g/mol",
      purity: "≥99.0%",
      form: "Lyophilized Powder",
      storage: "-20°C",
    },
    researchAreas: ["Growth hormone", "Muscle growth", "Recovery", "Sleep quality"],
  },
];

export default function ProductPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl text-white">Product not found</h1>
        <Link href="/products" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
            <Beaker className="w-32 h-32 text-gray-700" />
            <div className="absolute top-4 left-4">
              <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium border border-blue-500/20">
                {product.category}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
            <p className="text-gray-400 text-lg mb-6">{product.description}</p>
            
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-bold text-white">${product.price}</span>
              <span className="text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                Save 20%
              </span>
            </div>

            {/* Research Areas */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Research Areas
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.researchAreas.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1.5 rounded-lg bg-gray-800 text-gray-300 text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border border-gray-700 rounded-xl">
                <button className="px-4 py-3 text-gray-400 hover:text-white">-</button>
                <span className="px-4 py-3 text-white">1</span>
                <button className="px-4 py-3 text-gray-400 hover:text-white">+</button>
              </div>
              <button className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all hover:scale-[1.02] glow-blue">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-800">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="w-5 h-5 text-green-500" />
                Lab Tested
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Truck className="w-5 h-5 text-blue-500" />
                Fast Shipping
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Check className="w-5 h-5 text-purple-500" />
                99%+ Pure
              </div>
            </div>
          </div>
        </div>

        {/* Description & Specs */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
            <p className="text-gray-400 leading-relaxed mb-8">{product.fullDescription}</p>
            
            <div className="p-6 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-yellow-400 text-sm">
                <strong>Disclaimer:</strong> This product is sold for research purposes only. 
                Not for human consumption. By purchasing, you agree to our terms of service 
                and confirm you are using this product for legitimate research purposes.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Specifications</h2>
            <div className="space-y-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b border-gray-800">
                  <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="text-white font-mono text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
