import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, ArrowLeft, Shield, FileText } from "lucide-react";

const products = [
  { id: 1, name: "BPC-157 5MG", price: 35, category: "Tissue Research", contents: "5mg Lyophilized Powder in 3ml vial", concentration: "≥99%", batch: "NV-001", description: "Research peptide for tissue healing studies.", specs: { formula: "C62H98N16O22", cas: "137525-51-0", mw: "1419.56" }},
  { id: 2, name: "TB-500 5MG", price: 35, category: "Thymosin Research", contents: "5mg Lyophilized Powder in 3ml vial", concentration: "≥99%", batch: "NV-002", description: "Thymosin Beta-4 research peptide.", specs: { formula: "C212H350N56O78S2", cas: "885340-08-9", mw: "4963.44" }},
  { id: 3, name: "GHK-CU 50MG", price: 48, category: "Copper Peptides", contents: "50mg Lyophilized Powder in 3ml vial", concentration: "≥99%", batch: "NV-003", description: "Copper peptide for research.", specs: { formula: "C14H24CuN6O4", cas: "49557-75-7", mw: "403.92" }},
  { id: 4, name: "GLP-1 SM 10MG", price: 128, category: "Glucagon Analogs", contents: "10mg Lyophilized Powder in 3ml vial", concentration: "≥98%", batch: "NV-004", description: "Semaglutide analog for research.", specs: { formula: "C187H291N45O59", cas: "N/A", mw: "4113.58" }},
  { id: 5, name: "NAD+ 500MG", price: 85, category: "Antioxidants", contents: "500mg Lyophilized Powder in 3ml vial", concentration: "≥99%", batch: "NV-005", description: "NAD+ coenzyme for research.", specs: { formula: "C21H27N7O14P2", cas: "53-84-9", mw: "663.4" }},
];

export default function Page() {
  const id = 2;
  const product = products.find(p => p.id === id)!;
  
  return (
    <div className="pt-24 min-h-screen bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-400 mb-8">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square rounded-3xl bg-[#0d0d0d] border border-[#1a1a1a] flex items-center justify-center p-12">
            <Image src="/vial.jpg" alt={product.name} width={280} height={400} className="object-contain" />
          </div>

          <div>
            <h1 className="text-5xl font-bold text-white mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-orange-400 mb-6">${product.price}</p>
            
            <div className="bg-[#0d0d0d] rounded-2xl p-6 border border-[#1a1a1a] mb-6">
              <h3 className="text-white font-semibold mb-2">Contents</h3>
              <p className="text-gray-400">{product.contents}</p>
              <p className="text-orange-400 text-sm mt-2">*Requires reconstitution with BAC water</p>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="bg-[#0d0d0d] rounded-xl px-6 py-3 border border-[#1a1a1a]">
                <span className="text-gray-500 text-sm block">Concentration</span>
                <p className="text-white font-semibold">{product.concentration}</p>
              </div>
              <div className="bg-[#0d0d0d] rounded-xl px-6 py-3 border border-[#1a1a1a]">
                <span className="text-gray-500 text-sm block">Batch</span>
                <p className="text-white font-semibold">{product.batch}</p>
              </div>
            </div>

            <div className="bg-orange-500/10 rounded-2xl p-6 border border-orange-500/20 mb-6">
              <Shield className="w-6 h-6 text-orange-400 mb-2" />
              <h3 className="text-white font-semibold">Third-Party Testing</h3>
              <p className="text-gray-400 text-sm">HPLC tested ≥99% purity</p>
            </div>

            <Link href="#" className="inline-flex items-center gap-2 text-orange-400 mb-6">
              <FileText className="w-5 h-5" /> Certificate of Analysis
            </Link>

            <button className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl font-semibold">
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
          </div>
        </div>

        <div className="mt-16 bg-[#0d0d0d] rounded-3xl p-8 border border-[#1a1a1a]">
          <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
          <p className="text-gray-400 mb-6">{product.description}</p>
          <h3 className="text-xl font-bold text-white mb-4">Specifications</h3>
          <div className="grid grid-cols-3 gap-4">
            <div><span className="text-gray-500 text-sm">Formula</span><p className="text-white font-mono">{product.specs.formula}</p></div>
            <div><span className="text-gray-500 text-sm">CAS</span><p className="text-white">{product.specs.cas}</p></div>
            <div><span className="text-gray-500 text-sm">MW</span><p className="text-white">{product.specs.mw} g/mol</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
