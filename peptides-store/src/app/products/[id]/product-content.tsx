"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, ArrowLeft, Shield, FileText, Package, ExternalLink } from "lucide-react";

const allProducts = [
  { id: 1, name: "5% RU-58841", price: 45.00, category: "General Research", inStock: true, contents: "5% RU-58841 solution in 30ml dropper bottle", requiresReconstitution: false, concentration: "5%", batchNumber: "NV-P-RU58-001", coaLink: "#", fullDescription: "RU-58841 is a non-steroidal anti-androgen compound being researched for its effects on androgen receptors.", specs: { formula: "C17H18F3N3O3", cas: "154992-24-2", mw: "369.34 g/mol", storage: "Room temperature, away from light", appearance: "Clear liquid in amber bottle" } },
  { id: 2, name: "Acetic Acid 0.6%", price: 10.00, category: "Lab Supplies", inStock: true, contents: "0.6% acetic acid in 10ml sterile vial", requiresReconstitution: false, concentration: "0.6%", batchNumber: "NV-S-AA06-001", coaLink: "#", fullDescription: "Sterile acetic acid solution for reconstituting peptides.", specs: { formula: "CH3COOH", cas: "64-19-7", mw: "60.05 g/mol", storage: "Room temperature", appearance: "Clear liquid" } },
  { id: 3, name: "AOD-9604 5MG", price: 50.00, category: "Metabolic Research", inStock: true, contents: "5mg AOD-9604 Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥99%", batchNumber: "NV-P-AOD5-001", coaLink: "#", fullDescription: "AOD-9604 is a modified form of amino acids 176-191 of the GH polypeptide.", specs: { formula: "C78H123N23O23S2", cas: "221231-10-3", mw: "1817.12 g/mol", storage: "≤-20°C", appearance: "White lyophilized powder" } },
  { id: 4, name: "BPC-157 5MG", price: 35.00, category: "Tissue Research", inStock: true, contents: "5mg BPC-157 Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥99%", batchNumber: "NV-P-BPC5-001", coaLink: "#", fullDescription: "BPC-157 is a synthetic peptide studied for tissue healing and regeneration.", specs: { formula: "C62H98N16O22", cas: "137525-51-0", mw: "1419.56 g/mol", storage: "≤-20°C", appearance: "White powder" } },
  { id: 5, name: "GHK-CU 50MG", price: 48.00, category: "Copper Peptides", inStock: true, contents: "50mg GHK-CU Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥99%", batchNumber: "NV-P-GHKC-001", coaLink: "https://novapeptidesupply.com/wp-content/uploads/2026/02/GHKCU-b1.pdf", fullDescription: "GHK-Cu is a copper peptide complex studied for skin regeneration and wound healing. Blue powder.", specs: { formula: "C14H24CuN6O4", cas: "49557-75-7", mw: "403.92 g/mol", storage: "≤25°C sealed", appearance: "Blue powder in glass ampule" } },
  { id: 6, name: "GLP-1 SM 10MG", price: 128.00, category: "Glucagon Analogs", inStock: true, contents: "10mg GLP-1 SM Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥98%", batchNumber: "NV-P-GLP1-001", coaLink: "#", fullDescription: "GLP-1 SM is a research analog of semaglutide for metabolic research.", specs: { formula: "C187H291N45O59", cas: "N/A", mw: "4113.58 g/mol", storage: "≤-20°C", appearance: "White lyophilized powder" } },
  { id: 7, name: "TB-500 5MG", price: 35.00, category: "Thymosin Research", inStock: true, contents: "5mg TB-500 Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥99%", batchNumber: "NV-P-TB50-001", coaLink: "#", fullDescription: "TB-500 is synthetic Thymosin Beta-4 for tissue repair research.", specs: { formula: "C212H350N56O78S2", cas: "885340-08-9", mw: "4963.44 g/mol", storage: "≤-20°C", appearance: "White powder" } },
];

export function ProductContent({ id }: { id: string }) {
  const product = allProducts.find((p) => p.id === parseInt(id));
  const related = allProducts.filter(p => p.category === product?.category && p.id !== product.id).slice(0, 3);

  if (!product) return <div className="pt-32 text-center text-white">Product not found</div>;

  return (
    <div className="pt-24 min-h-screen bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-400 mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square rounded-3xl bg-[#0d0d0d] border border-[#1a1a1a] flex items-center justify-center p-12">
            <Image src="/vial.jpg" alt={product.name} width={280} height={400} className="object-contain rounded-2xl" />
          </div>

          <div>
            <h1 className="text-5xl font-bold text-white mb-4">{product.name}</h1>
            <p className="text-gray-400 text-lg mb-6">${product.price} USD</p>
            
            <div className="bg-[#0d0d0d] rounded-2xl p-6 border border-[#1a1a1a] mb-6">
              <h3 className="text-white font-semibold mb-2">Contents</h3>
              <p className="text-gray-400">{product.contents}</p>
              {product.requiresReconstitution && (
                <p className="text-orange-400 text-sm mt-2">
                  Requires reconstitution with BAC water <Link href="/products/2" className="underline">(Sold Here)</Link>
                </p>
              )}
            </div>

            <div className="flex gap-4 mb-6">
              <div className="bg-[#0d0d0d] rounded-xl px-6 py-3 border border-[#1a1a1a]">
                <span className="text-gray-500 text-sm">Concentration</span>
                <p className="text-white font-semibold">{product.concentration}</p>
              </div>
              <div className="bg-[#0d0d0d] rounded-xl px-6 py-3 border border-[#1a1a1a]">
                <span className="text-gray-500 text-sm">Batch</span>
                <p className="text-white font-semibold">{product.batchNumber}</p>
              </div>
            </div>

            <div className="bg-orange-500/10 rounded-2xl p-6 border border-orange-500/20 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-6 h-6 text-orange-400" />
                <h3 className="text-white font-semibold">Rigorous Third-Party Testing</h3>
              </div>
              <p className="text-gray-400 text-sm">Every batch undergoes third-party HPLC testing.</p>
            </div>

            <Link href={product.coaLink} className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 mb-6">
              <FileText className="w-5 h-5" /> Certificate of Analysis <ExternalLink className="w-4 h-4" />
            </Link>

            <button className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl font-semibold">
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#0d0d0d] rounded-3xl p-8 border border-[#1a1a1a]">
              <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
              <p className="text-gray-400">{product.fullDescription}</p>
            </div>

            <div className="bg-[#0d0d0d] rounded-3xl p-8 border border-[#1a1a1a]">
              <h2 className="text-2xl font-bold text-white mb-6">Product Specifications</h2>
              <div className="grid grid-cols-2 gap-6">
                <div><span className="text-gray-500 text-sm">Formula</span><p className="text-white font-mono">{product.specs.formula}</p></div>
                <div><span className="text-gray-500 text-sm">CAS</span><p className="text-white">{product.specs.cas}</p></div>
                <div><span className="text-gray-500 text-sm">Molecular Weight</span><p className="text-white">{product.specs.mw}</p></div>
                <div><span className="text-gray-500 text-sm">Storage</span><p className="text-white">{product.specs.storage}</p></div>
                <div className="col-span-2"><span className="text-gray-500 text-sm">Appearance</span><p className="text-white">{product.specs.appearance}</p></div>
              </div>
            </div>

            <div className="bg-yellow-500/5 rounded-2xl p-6 border border-yellow-500/20">
              <p className="text-yellow-400 text-sm"><strong>Disclaimer:</strong> For research purposes only. Not for human consumption.</p>
            </div>
          </div>

          <div className="bg-[#0d0d0d] rounded-3xl p-6 border border-[#1a1a1a] h-fit">
            <h3 className="text-white font-semibold mb-3">Have a question?</h3>
            <p className="text-gray-400 text-sm mb-4">Reach out to our support team:</p>
            <a href="mailto:support@peptidelabs.com" className="text-orange-400 hover:text-orange-300">support@peptidelabs.com</a>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {related.map((r) => (
                <Link key={r.id} href={`/products/${r.id}`} className="bg-[#0d0d0d] rounded-3xl p-6 border border-[#1a1a1a] hover:border-orange-500/30">
                  <div className="aspect-square rounded-2xl bg-[#141414] flex items-center justify-center mb-4 p-6">
                    <Image src="/vial.jpg" alt={r.name} width={120} height={180} className="object-contain" />
                  </div>
                  <h3 className="text-white font-semibold">{r.name}</h3>
                  <p className="text-orange-400 font-bold mt-2">${r.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
