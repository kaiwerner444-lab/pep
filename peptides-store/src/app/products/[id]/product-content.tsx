"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, ArrowLeft, Shield, Truck, Check } from "lucide-react";

const allProducts = [
  { id: 1, name: "5% RU-58841", description: "Research compound - 5% solution", price: 45.00, category: "General Research", fullDescription: "RU-58841 is a non-steroidal anti-androgen compound being researched for its effects on androgen receptors.", specifications: { concentration: "5%", volume: "30ml", storage: "Room temperature" }, researchAreas: ["Hair research", "Androgen studies"] },
  { id: 2, name: "Acetic Acid 0.6% Solution 10ML", description: "Reconstitution solution", price: 10.00, category: "Lab Supplies", fullDescription: "Sterile acetic acid solution for reconstituting peptides.", specifications: { concentration: "0.6%", volume: "10ml", storage: "Room temperature" }, researchAreas: ["Peptide preparation"] },
  { id: 3, name: "Amino Tadalafil", description: "Research compound", price: 54.00, category: "General Research", fullDescription: "Research compound for studying PDE5 inhibition.", specifications: { form: "Liquid", storage: "Room temperature" }, researchAreas: ["Vascular research"] },
  { id: 4, name: "AOD-9604 5MG", description: "Research peptide - 5mg vial", price: 50.00, category: "Metabolic Research", fullDescription: "AOD-9604 is a modified form of amino acids 176-191 of the GH polypeptide, studied for metabolic effects.", specifications: { sequence: "Modified GH fragment", molecularWeight: "1815.1 g/mol", purity: "≥99%", form: "Lyophilized", storage: "-20°C" }, researchAreas: ["Fat metabolism", "Lipolysis research"] },
  { id: 5, name: "BAC Water", description: "Bacteriostatic water - 10ml/30ml", price: 12.00, category: "Lab Supplies", fullDescription: "Sterile bacteriostatic water for injection.", specifications: { volume: "10ml or 30ml", preservative: "0.9% benzyl alcohol", storage: "Room temperature" }, researchAreas: ["Peptide reconstitution"] },
  { id: 6, name: "BPC-157", description: "Body Protection Compound - 5mg/10mg", price: 35.00, category: "Tissue Research", fullDescription: "BPC-157 is a synthetic peptide studied for its effects on healing and tissue regeneration.", specifications: { sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val", molecularWeight: "1419.5 g/mol", purity: "≥99%", form: "Lyophilized", storage: "-20°C" }, researchAreas: ["Tissue healing", "Gut health", "Muscle recovery"] },
  { id: 7, name: "BPC-157/TB-500 Blend", description: "Research blend", price: 75.00, category: "Research Bundles", fullDescription: "Combination of BPC-157 and TB-500 for synergistic healing research.", specifications: { bpc157: "5mg", tb500: "5mg", purity: "≥99%", form: "Lyophilized", storage: "-20°C" }, researchAreas: ["Tissue repair", "Recovery", "Healing acceleration"] },
  { id: 8, name: "CJC-1295 NO DAC 5MG & Ipamorelin 5MG", description: "Research combo", price: 75.00, category: "Secretagogue Research", fullDescription: "Combination of CJC-1295 without DAC and Ipamorelin for growth hormone research.", specifications: { cjc1295: "5mg", ipamorelin: "5mg", purity: "≥99%", form: "Lyophilized", storage: "-20°C" }, researchAreas: ["Growth hormone", "IGF-1", "Muscle growth"] },
  { id: 9, name: "DSIP 5MG", description: "Delta Sleep Inducing Peptide", price: 35.00, category: "Neuropeptide Research", fullDescription: "DSIP is a neuropeptide studied for its effects on sleep patterns and stress response.", specifications: { sequence: "Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu", molecularWeight: "848.8 g/mol", purity: "≥99%", form: "Lyophilized", storage: "-20°C" }, researchAreas: ["Sleep research", "Stress response"] },
  { id: 10, name: "Enclomiphene", description: "Selective estrogen receptor modulator", price: 75.00, category: "General Research", fullDescription: "Enclomiphene is the trans-isomer of clomiphene citrate, studied for hormonal effects.", specifications: { form: "Liquid", concentration: "12.5mg/ml", storage: "Room temperature" }, researchAreas: ["Hormonal research", "Testosterone studies"] },
  { id: 11, name: "GHK-CU", description: "Copper peptide - 50mg/100mg", price: 48.00, category: "Copper Peptides", fullDescription: "GHK-Cu is a copper peptide complex studied for skin and tissue regeneration.", specifications: { sequence: "Gly-His-Lys-Cu", molecularWeight: "340.4 g/mol", purity: "≥99%", form: "Lyophilized", storage: "-20°C" }, researchAreas: ["Skin regeneration", "Collagen synthesis", "Wound healing"] },
  { id: 12, name: "GLP-1 SM 10MG", description: "Semaglutide analog - 10mg", price: 128.00, category: "Glucagon Analogs", fullDescription: "GLP-1 receptor agonist analog for metabolic research.", specifications: { sequence: "GLP-1 analog", molecularWeight: "4113.6 g/mol", purity: "≥98%", form: "Lyophilized", storage: "-20°C" }, researchAreas: ["Glucose regulation", "Weight management", "Metabolic research"] },
  { id: 13, name: "GLP-2 TZ", description: "Tirzepatide analog - 5mg/10mg", price: 100.00, category: "Glucagon Analogs", fullDescription: "Dual GIP/GLP-1 receptor agonist analog for advanced metabolic research.", specifications: { sequence: "Dual agonist analog", purity: "≥98%", form: "Lyophilized", storage: "-20°C" }, researchAreas: ["Glucose control", "Metabolic syndrome", "Weight research"] },
  { id: 14, name: "GLP-3 RT", description: "Retatrutide analog - 5mg/10mg/20mg", price: 75.00, category: "Glucagon Analogs", fullDescription: "Triple GIP, GLP-1, and glucagon receptor agonist analog.", specifications: { sequence: "Triple agonist analog", purity: "≥98%", form: "Lyophilized", storage: "-20°C" }, researchAreas: ["Advanced metabolic research", "Weight management", "Energy expenditure"] },
  { id: 15, name: "Glutathione 600MG", description: "Antioxidant peptide", price: 54.00, category: "Antioxidants", fullDescription: "Glutathione is a tripeptide antioxidant studied for cellular protection.", specifications: { sequence: "Glu-Cys-Gly", molecularWeight: "307.3 g/mol", purity: "≥99%", form: "Lyophilized", storage: "-20°C" }, researchAreas: ["Antioxidant research", "Cellular health", "Detoxification"] },
  { id: 16, name: "Glow (GHK-CU, TB-500, BPC-157)", description: "Research blend", price: 115.00, category: "Research Bundles", fullDescription: "Synergistic blend of GHK-Cu, TB-500, and BPC-157 for skin and tissue research.", specifications: { ghkcu: "5mg", tb500: "2.5mg", bpc157: "2.5mg", form: "Lyophilized", storage: "-20°C" }, researchAreas: ["Skin rejuvenation", "Tissue repair", "Anti-aging"] },
  { id: 17, name: "HCG 5000iu", description: "Human Chorionic Gonadotropin", price: 40.00, category: "General Research", fullDescription: "HCG is a hormone studied for various research applications.", specifications: { iu: "5000", form: "Lyophilized", storage: "2-8°C" }, researchAreas: ["Hormonal research", "Fertility studies"] },
  { id: 18, name: "IGF-1 LR3 1MG", description: "Insulin-like Growth Factor", price: 75.00, category: "Secretagogue Research", fullDescription: "IGF-1 LR3 is a longer-acting analog of IGF-1 for growth research.", specifications: { sequence: "83 amino acids", molecularWeight: "9117.5 g/mol", purity: "≥98%", form: "Lyophilized", storage: "-20°C" }, researchAreas: ["Muscle growth", "Cell proliferation", "Tissue repair"] },
  { id: 19, name: "KISSPEPTIN 10MG", description: "Reproductive hormone peptide", price: 60.00, category: "General Research", fullDescription: "Kisspeptin is a peptide studied for its role in reproductive hormone regulation.", specifications: { sequence: "Kisspeptin-10", molecularWeight: "1302.4 g/mol", purity: "≥99%", form: "Lyophilized", storage: "-20°C" }, researchAreas: ["Reproductive health", "Hormone regulation"] },
  { id: 20, name: "KLOW (GHK-CU, TB-500, BPC-157, KPV)", description: "Research blend", price: 140.00, category: "Research Bundles", fullDescription: "Premium healing stack with GHK-Cu, TB-500, BPC-157, and KPV.", specifications: { ghkcu: "5mg", tb500: "2.5mg", bpc157: "2.5mg", kpv: "2.5mg", form: "Lyophilized", storage: "-20°C" }, researchAreas: ["Advanced healing", "Tissue regeneration", "Recovery"] },
  { id: 21, name: "KPV 10MG", description: "Anti-inflammatory peptide", price: 55.00, category: "Tissue Research", fullDescription: "KPV is a tripeptide studied for anti-inflammatory effects.", specifications: { sequence: "Lys-Pro-Val", molecularWeight: "342.4 g/mol", purity: "≥99%", form: "Lyophilized", storage: "-20°C" }, researchAreas: ["Inflammation research", "Immune modulation", "Gut health"] },
  { id: 22, name: "Melanotan 2 10MG", description: "Melanocortin peptide - 10mg", price: 35.00, category: "General Research", fullDescription: "Melanotan II is a synthetic melanocortin analog studied for melanogenesis.", specifications: { sequence: "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH2", molecularWeight: "1024.2 g/mol", purity: "≥98%", form: "Lyophilized", storage: "-20°C" }, researchAreas: ["Melanogenesis", "Photoprotection research"] },
  { id: 23, name: "MOTS-C", description: "Mitochondrial peptide - 5mg/10mg/20mg", price: 55.00, category: "Metabolic Research", fullDescription: "MOTS-c is a mitochondrial-derived peptide studied for metabolic effects.", specifications: { sequence: "MRWQEMGYIFYPRKLR", molecularWeight: "2174.6 g/mol", purity: "≥99%", form: "Lyophilized", storage: "-20°C" }, researchAreas: ["Metabolic research", "Mitochondrial function", "Aging"] },
  { id: 24, name: "NAD+", description: "Nicotinamide adenine dinucleotide - 500mg", price: 85.00, category: "Antioxidants", salePrice: 100.00, fullDescription: "NAD+ is a coenzyme essential for cellular energy metabolism.", specifications: { molecularWeight: "663.4 g/mol", purity: "≥99%", form: "Lyophilized", storage: "-20°C" }, researchAreas: ["Cellular energy", "Anti-aging", "Mitochondrial health"] },
  { id: 25, name: "PT-141 10MG", description: "Bremelanotide - 10mg vial", price: 40.00, category: "General Research", fullDescription: "PT-141 is a melanocortin receptor agonist being researched for various applications.", specifications: { sequence: "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-OH", molecularWeight: "1025.2 g/mol", purity: "≥98.5%", form: "Lyophilized", storage: "-20°C" }, researchAreas: ["Sexual health research", "Melanocortin studies"] },
  { id: 26, name: "Selank 10MG", description: "Synthetic peptide", price: 45.00, category: "Neuropeptide Research", fullDescription: "Selank is a synthetic peptide studied for anxiolytic and nootropic effects.", specifications: { sequence: "Thr-Lys-Pro-Arg-Pro-Gly-Pro", molecularWeight: "751.9 g/mol", purity: "≥99%", form: "Lyophilized", storage: "-20°C" }, researchAreas: ["Anxiety research", "Cognitive function", "Neuroprotection"] },
  { id: 27, name: "Semax 10MG", description: "Synthetic peptide", price: 35.00, category: "Neuropeptide Research", fullDescription: "Semax is a synthetic peptide derived from ACTH, studied for cognitive effects.", specifications: { sequence: "Met-Glu-His-Phe-Pro-Gly-Pro", molecularWeight: "813.9 g/mol", purity: "≥99%", form: "Lyophilized", storage: "-20°C" }, researchAreas: ["Cognitive enhancement", "Neuroprotection", "Memory research"] },
  { id: 28, name: "Sermorelin 5MG", description: "Growth hormone releasing hormone", price: 48.00, category: "Secretagogue Research", fullDescription: "Sermorelin is a GHRH analog that stimulates GH release from the pituitary.", specifications: { sequence: "Tyr-Ala-Asp-Ala-Ile-Phe-Thr-Asn-Ser-Tyr-Arg-Lys-Val-Leu-Gly-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Met-Ser-Arg-NH2", molecularWeight: "3357.9 g/mol", purity: "≥99%", form: "Lyophilized", storage: "-20°C" }, researchAreas: ["Growth hormone", "Anti-aging", "Muscle growth"] },
  { id: 29, name: "SLU-PP-332", description: "Exercise mimetic - 10mg", price: 175.00, category: "Metabolic Research", salePrice: 200.00, fullDescription: "SLU-PP-332 is an ERR agonist studied for exercise-mimetic effects.", specifications: { molecularWeight: "500+ g/mol", purity: "≥98%", form: "Lyophilized", storage: "-20°C" }, researchAreas: ["Exercise mimetics", "Metabolic research", "Endurance studies"] },
  { id: 30, name: "TB-500 (Thymosin Beta-4)", description: "Thymosin peptide - 5mg", price: 35.00, category: "Thymosin Research", fullDescription: "TB-500 is a synthetic version of Thymosin Beta-4 for tissue repair research.", specifications: { sequence: "Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys-Phe-Asp-Lys-Ser-Lys-Leu-Lys-Lys-Thr-Glu-Thr-Gln-Glu-L

interface ProductContentProps {
  id: string;
}

export function ProductContent({ id }: ProductContentProps) {
  const productId = parseInt(id);
  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="pt-32 text-center min-h-screen">
        <h1 className="text-2xl text-white">Product not found</h1>
        <Link href="/products" className="text-orange-400 hover:text-orange-300 mt-4 inline-block">
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
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative p-12">
            <Image 
              src="/vial.jpg" 
              alt={product.name}
              width={200}
              height={300}
              className="object-contain"
            />
            <div className="absolute top-4 left-4">
              <span className="px-4 py-2 rounded-full bg-orange-500/20 text-orange-400 text-sm font-medium border border-orange-500/20">
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
              {'salePrice' in product && product.salePrice && (
                <span className="text-gray-500 line-through">${product.salePrice}</span>
              )}
              {'salePrice' in product && product.salePrice && (
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                  Save {Math.round(((product.salePrice - product.price) / product.salePrice) * 100)}%
                </span>
              )}
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
              <button className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold transition-all hover:scale-[1.02] glow-orange">
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
                <Truck className="w-5 h-5 text-orange-500" />
                Fast Shipping
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Check className="w-5 h-5 text-yellow-500" />
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
