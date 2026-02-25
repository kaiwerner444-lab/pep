"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, ArrowLeft, Shield, FileText, ExternalLink } from "lucide-react";

const allProducts = [
  { id: 1, name: "5% RU-58841", price: 45.00, category: "General Research", contents: "5% RU-58841 solution in 30ml dropper bottle", requiresReconstitution: false, concentration: "5%", batchNumber: "NV-P-RU58-001", coaLink: "#", fullDescription: "RU-58841 is a non-steroidal anti-androgen compound being researched for its effects on androgen receptors.", specs: { formula: "C17H18F3N3O3", cas: "154992-24-2", mw: "369.34 g/mol", storage: "Room temperature, away from light", appearance: "Clear liquid in amber bottle" }},
  { id: 2, name: "Acetic Acid 0.6%", price: 10.00, category: "Lab Supplies", contents: "0.6% acetic acid in 10ml sterile vial", requiresReconstitution: false, concentration: "0.6%", batchNumber: "NV-S-AA06-001", coaLink: "#", fullDescription: "Sterile acetic acid solution for reconstituting peptides.", specs: { formula: "CH3COOH", cas: "64-19-7", mw: "60.05 g/mol", storage: "Room temperature", appearance: "Clear liquid" }},
  { id: 3, name: "AOD-9604 5MG", price: 50.00, category: "Metabolic Research", contents: "5mg AOD-9604 Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥99%", batchNumber: "NV-P-AOD5-001", coaLink: "#", fullDescription: "AOD-9604 is a modified form of amino acids 176-191 of the GH polypeptide.", specs: { formula: "C78H123N23O23S2", cas: "221231-10-3", mw: "1817.12 g/mol", storage: "≤-20°C", appearance: "White lyophilized powder" }},
  { id: 4, name: "AOD-9604 5MG", price: 50.00, category: "Metabolic Research", contents: "5mg AOD-9604 Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥99%", batchNumber: "NV-P-AOD5-001", coaLink: "#", fullDescription: "AOD-9604 is a modified form of amino acids 176-191 of the GH polypeptide.", specs: { formula: "C78H123N23O23S2", cas: "221231-10-3", mw: "1817.12 g/mol", storage: "≤-20°C", appearance: "White lyophilized powder" }},
  { id: 5, name: "BAC Water", price: 12.00, category: "Lab Supplies", contents: "Bacteriostatic water - 10ml/30ml", requiresReconstitution: false, concentration: "Sterile", batchNumber: "NV-S-BAC-001", coaLink: "#", fullDescription: "Sterile bacteriostatic water for injection with 0.9% benzyl alcohol.", specs: { formula: "H2O", cas: "7732-18-5", mw: "18.02 g/mol", storage: "Room temperature", appearance: "Clear sterile liquid" }},
  { id: 6, name: "BPC-157 5MG", price: 35.00, category: "Tissue Research", contents: "5mg BPC-157 Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥99%", batchNumber: "NV-P-BPC5-001", coaLink: "#", fullDescription: "BPC-157 is a synthetic peptide studied for tissue healing and regeneration.", specs: { formula: "C62H98N16O22", cas: "137525-51-0", mw: "1419.56 g/mol", storage: "≤-20°C", appearance: "White powder" }},
  { id: 7, name: "BPC-157/TB-500 Blend", price: 75.00, category: "Research Bundles", contents: "5mg BPC-157 + 5mg TB-500 in 3ml vial", requiresReconstitution: true, concentration: "≥99%", batchNumber: "NV-P-BTBL-001", coaLink: "#", fullDescription: "Synergistic blend of BPC-157 and TB-500 for tissue repair research.", specs: { formula: "Mixed", cas: "N/A", mw: "Mixed", storage: "≤-20°C", appearance: "White lyophilized powder" }},
  { id: 8, name: "CJC-1295 & Ipamorelin", price: 75.00, category: "Secretagogue Research", contents: "5mg CJC-1295 + 5mg Ipamorelin in 3ml vial", requiresReconstitution: true, concentration: "≥99%", batchNumber: "NV-P-CJCI-001", coaLink: "#", fullDescription: "Research combo of CJC-1295 and Ipamorelin for GH studies.", specs: { formula: "Mixed", cas: "N/A", mw: "Mixed", storage: "≤-20°C", appearance: "White lyophilized powder" }},
  { id: 9, name: "DSIP 5MG", price: 35.00, category: "Neuropeptide Research", contents: "5mg DSIP Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥99%", batchNumber: "NV-P-DSIP-001", coaLink: "#", fullDescription: "DSIP is a neuropeptide studied for sleep patterns and stress response.", specs: { formula: "C35H48N10O15", cas: "62568-57-4", mw: "848.82 g/mol", storage: "≤-20°C", appearance: "White powder" }},
  { id: 10, name: "Enclomiphene", price: 75.00, category: "General Research", contents: "Enclomiphene 12.5mg/ml in 30ml bottle", requiresReconstitution: false, concentration: "12.5mg/ml", batchNumber: "NV-P-ENCL-001", coaLink: "#", fullDescription: "Enclomiphene is the trans-isomer of clomiphene citrate for hormonal research.", specs: { formula: "C26H28ClNO", cas: "15690-57-0", mw: "405.96 g/mol", storage: "Room temperature", appearance: "Liquid solution" }},
  { id: 11, name: "GHK-CU 50MG", price: 48.00, category: "Copper Peptides", contents: "50mg GHK-CU Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥99%", batchNumber: "NV-P-GHKC-001", coaLink: "#", fullDescription: "GHK-Cu is a copper peptide complex for skin and tissue regeneration research.", specs: { formula: "C14H24CuN6O4", cas: "49557-75-7", mw: "403.92 g/mol", storage: "≤25°C sealed", appearance: "Blue powder" }},
  { id: 12, name: "GLP-1 SM 10MG", price: 128.00, category: "Glucagon Analogs", contents: "10mg GLP-1 SM Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥98%", batchNumber: "NV-P-GLP1-001", coaLink: "#", fullDescription: "GLP-1 SM is a research analog of semaglutide for metabolic research.", specs: { formula: "C187H291N45O59", cas: "N/A", mw: "4113.58 g/mol", storage: "≤-20°C", appearance: "White lyophilized powder" }},
  { id: 13, name: "GLP-2 TZ 10MG", price: 100.00, category: "Glucagon Analogs", contents: "10mg GLP-2 TZ Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥98%", batchNumber: "NV-P-GLP2-001", coaLink: "#", fullDescription: "GLP-2 TZ is a dual GIP/GLP-1 receptor agonist analog for metabolic research.", specs: { formula: "C225H348N48O68", cas: "N/A", mw: "4813.53 g/mol", storage: "≤-20°C", appearance: "White lyophilized powder" }},
  { id: 14, name: "GLP-3 RT 10MG", price: 75.00, category: "Glucagon Analogs", contents: "10mg GLP-3 RT Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥98%", batchNumber: "NV-P-GLP3-001", coaLink: "#", fullDescription: "GLP-3 RT is a triple GIP, GLP-1, and glucagon receptor agonist analog.", specs: { formula: "N/A", cas: "N/A", mw: "~5000 g/mol", storage: "≤-20°C", appearance: "White lyophilized powder" }},
  { id: 15, name: "Glutathione 600MG", price: 54.00, category: "Antioxidants", contents: "600mg Glutathione Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥99%", batchNumber: "NV-P-GLUT-001", coaLink: "#", fullDescription: "Glutathione is a tripeptide antioxidant for cellular protection research.", specs: { formula: "C10H17N3O6S", cas: "70-18-8", mw: "307.32 g/mol", storage: "≤-20°C", appearance: "White crystalline powder" }},
  { id: 16, name: "Glow Blend", price: 115.00, category: "Research Bundles", contents: "5mg GHK-CU + 2.5mg TB-500 + 2.5mg BPC-157", requiresReconstitution: true, concentration: "≥99%", batchNumber: "NV-P-GLOW-001", coaLink: "#", fullDescription: "Synergistic blend of GHK-CU, TB-500, and BPC-157 for tissue research.", specs: { formula: "Mixed", cas: "N/A", mw: "Mixed", storage: "≤-20°C", appearance: "Blue-tinged powder" }},
  { id: 17, name: "HCG 5000iu", price: 40.00, category: "General Research", contents: "5000iu HCG Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥99%", batchNumber: "NV-P-HCG5-001", coaLink: "#", fullDescription: "HCG is a hormone for hormonal and fertility research.", specs: { formula: "C1105H1770N318O336S26", cas: "9002-61-3", mw: "25719 g/mol", storage: "2-8°C", appearance: "White lyophilized powder" }},
  { id: 18, name: "IGF-1 LR3 1MG", price: 75.00, category: "Secretagogue Research", contents: "1mg IGF-1 LR3 Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥98%", batchNumber: "NV-P-IGF1-001", coaLink: "#", fullDescription: "IGF-1 LR3 is a longer-acting analog of IGF-1 for growth research.", specs: { formula: "C400H+N-O-S", cas: "N/A", mw: "9117.53 g/mol", storage: "≤-20°C", appearance: "White lyophilized powder" }},
  { id: 19, name: "KISSPEPTIN 10MG", price: 60.00, category: "General Research", contents: "10mg KISSPEPTIN Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥99%", batchNumber: "NV-P-KISS-001", coaLink: "#", fullDescription: "Kisspeptin for reproductive hormone regulation research.", specs: { formula: "C63H83N17O14", cas: "374675-21-5", mw: "1302.43 g/mol", storage: "≤-20°C", appearance: "White lyophilized powder" }},
  { id: 20, name: "KLOW Blend", price: 140.00, category: "Research Bundles", contents: "5mg GHK-CU + 2.5mg TB-500 + 2.5mg BPC-157 + 2.5mg KPV", requiresReconstitution: true, concentration: "≥99%", batchNumber: "NV-P-KLOW-001", coaLink: "#", fullDescription: "Advanced healing stack with GHK-CU, TB-500, BPC-157, and KPV.", specs: { formula: "Mixed", cas: "N/A", mw: "Mixed", storage: "≤-20°C", appearance: "Blue-tinged powder" }},
  { id: 21, name: "KPV 10MG", price: 55.00, category: "Tissue Research", contents: "10mg KPV Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥99%", batchNumber: "NV-P-KPV10-001", coaLink: "#", fullDescription: "KPV is a tripeptide for anti-inflammatory research.", specs: { formula: "C16H30N4O4", cas: "N/A", mw: "342.44 g/mol", storage: "≤-20°C", appearance: "White lyophilized powder" }},
  { id: 22, name: "Melanotan 2 10MG", price: 35.00, category: "General Research", contents: "10mg Melanotan 2 Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥98%", batchNumber: "NV-P-MT2-001", coaLink: "#", fullDescription: "Melanotan II is a synthetic melanocortin analog for melanogenesis research.", specs: { formula: "C50H69N15O9", cas: "121062-08-6", mw: "1024.18 g/mol", storage: "≤-20°C", appearance: "White lyophilized powder" }},
  { id: 23, name: "MOTS-C 10MG", price: 55.00, category: "Metabolic Research", contents: "10mg MOTS-C Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥99%", batchNumber: "NV-P-MOTS-001", coaLink: "#", fullDescription: "MOTS-c is a mitochondrial-derived peptide for metabolic research.", specs: { formula: "C101H168N26O32S2", cas: "N/A", mw: "2174.6 g/mol", storage: "≤-20°C", appearance: "White lyophilized powder" }},
  { id: 24, name: "NAD+ 500MG", price: 85.00, category: "Antioxidants", contents: "500mg NAD+ Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥99%", batchNumber: "NV-P-NAD5-001", coaLink: "#", fullDescription: "NAD+ is a coenzyme for cellular energy metabolism research.", specs: { formula: "C21H27N7O14P2", cas: "53-84-9", mw: "663.4 g/mol", storage: "≤-20°C", appearance: "White lyophilized powder" }},
  { id: 25, name: "PT-141 10MG", price: 40.00, category: "General Research", contents: "10mg PT-141 Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥98.5%", batchNumber: "NV-P-PT14-001", coaLink: "#", fullDescription: "PT-141 is a melanocortin receptor agonist for research.", specs: { formula: "C50H68N14O10", cas: "189691-06-3", mw: "1025.2 g/mol", storage: "≤-20°C", appearance: "White lyophilized powder" }},
  { id: 26, name: "Selank 10MG", price: 45.00, category: "Neuropeptide Research", contents: "10mg Selank Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥99%", batchNumber: "NV-P-SELA-001", coaLink: "#", fullDescription: "Selank is a synthetic peptide for cognitive function research.", specs: { formula: "C33H57N11O9", cas: "129954-34-3", mw: "751.9 g/mol", storage: "≤-20°C", appearance: "White lyophilized powder" }},
  { id: 27, name: "Semax 10MG", price: 35.00, category: "Neuropeptide Research", contents: "10mg Semax Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥99%", batchNumber: "NV-P-SEMA-001", coaLink: "#", fullDescription: "Semax is a synthetic peptide for cognitive enhancement research.", specs: { formula: "C37H51N9O10S", cas: "80714-61-0", mw: "813.9 g/mol", storage: "≤-20°C", appearance: "White lyophilized powder" }},
  { id: 28, name: "Sermorelin 5MG", price: 48.00, category: "Secretagogue Research", contents: "5mg Sermorelin Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥99%", batchNumber: "NV-P-SERM-001", coaLink: "#", fullDescription: "Sermorelin is a GHRH analog for growth hormone research.", specs: { formula: "C149H246N44O42S", cas: "86168-78-7", mw: "3357.9 g/mol", storage: "≤-20°C", appearance: "White lyophilized powder" }},
  { id: 29, name: "SLU-PP-332 10MG", price: 175.00, category: "Metabolic Research", contents: "10mg SLU-PP-332 Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥98%", batchNumber: "NV-P-SLU3-001", coaLink: "#", fullDescription: "SLU-PP-332 is an ERR agonist for exercise-mimetic research.", specs: { formula: "C19H20F3N3O3", cas: "N/A", mw: "395.38 g/mol", storage: "≤-20°C", appearance: "White lyophilized powder" }},
  { id: 30, name: "TB-500 5MG", price: 35.00, category: "Thymosin Research", contents: "5mg TB-500 Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥99%", batchNumber: "NV-P-TB50-001", coaLink: "#", fullDescription: "TB-500 is synthetic Thymosin Beta-4 for tissue repair research.", specs: { formula: "C212H350N56O78S2", cas: "885340-08-9", mw: "4963.44 g/mol", storage: "≤-20°C", appearance: "White lyophilized powder" }},
  { id: 31, name: "Tesamorelin 5MG", price: 45.00, category: "Secretagogue Research", contents: "5mg Tesamorelin Lyophilized Powder in 3ml vial", requiresReconstitution: true, concentration: "≥99%", batchNumber: "NV-P-TESA-001", coaLink: "#", fullDescription: "Tesamorelin is a GHRH analog for growth hormone secretion research.", specs: { formula: "C221H366N72O67S", cas: "218949-48-5", mw: "5135.9 g/mol", storage: "≤-20°C", appearance: "White lyophilized powder" }},
];

export function ProductContent({ id }: { id: string }) {
  const product = allProducts.find((p) => p.id === parseInt(id));
  const related = allProducts.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 3);

  if (!product) return <div className="pt-32 text-center text-white">Product not found</div>;

  return (
    <div className="pt-24 min-h-screen bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-400 mb-8 transition-colors">
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
                  Requires reconstitution with BAC water <Link href="/products/5" className="underline">(Sold Here)</Link>
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

            <Link href={product.coaLink} className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 mb-6 transition-colors">
              <FileText className="w-5 h-5" /> Certificate of Analysis <ExternalLink className="w-4 h-4" />
            </Link>

            <button className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-xl font-semibold transition-all hover:scale-[1.02]">
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#0d0d0d] rounded-3xl p-8 border border-[#1a1a1a]">
              <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
              <p className="text-gray-400 leading-relaxed">{product.fullDescription}</p>
            </div>

            <div className="bg-[#0d0d0d] rounded-3xl p-8 border border-[#1a1a1a]">
              <h2 className="text-2xl font-bold text-white mb-6">Product Specifications</h2>
              <div className="grid grid-cols-2 gap-6">
                <div><span className="text-gray-500 text-sm">Chemical Formula</span><p className="text-white font-mono">{product.specs.formula}</p></div>
                <div><span className="text-gray-500 text-sm">CAS Number</span><p className="text-white">{product.specs.cas}</p></div>
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
            <a href="mailto:support@peptidelabs.com" className="text-orange-400 hover:text-orange-300 transition-colors">support@peptidelabs.com</a>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {related.map((r) => (
                <Link key={r.id} href={`/products/${r.id}`} className="group bg-[#0d0d0d] rounded-3xl p-6 border border-[#1a1a1a] hover:border-orange-500/30 transition-all">
                  <div className="aspect-square rounded-2xl bg-[#141414] flex items-center justify-center mb-4 p-6">
                    <Image src="/vial.jpg" alt={r.name} width={120} height={180} className="object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <h3 className="text-white font-semibold group-hover:text-orange-400 transition-colors">{r.name}</h3>
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
