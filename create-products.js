const fs = require('fs');

const products = [
  { id: 1, name: "BPC-157", price: "$35.00 – $55.00", contents: "Lyophilized Powder in 3ml vial", batch: "NV-P-BPC5", formula: "C62H98N16O22", cas: "137525-51-0", mw: "1419.56 g/mol", storage: "Store at ≤-20°C", app: "wound healing and tissue regeneration", appearance: "Solid, white powder" },
  { id: 2, name: "TB-500", price: "$35.00 – $60.00", contents: "Lyophilized Powder in 3ml vial", batch: "NV-P-TB50", formula: "C212H350N56O78S2", cas: "885340-08-9", mw: "4963.44 g/mol", storage: "Store at ≤-20°C", app: "wound healing and tissue repair", appearance: "Solid, white powder" },
  { id: 3, name: "GHK-CU", price: "$48.00 – $85.00", contents: "Lyophilized Powder in 3ml vial", batch: "NV-P-GHK50", formula: "C14H24CuN6O4", cas: "49557-75-7", mw: "403.92 g/mol", storage: "Store at ≤25°C", app: "skin regeneration and wound healing", appearance: "Solid, blue powder" },
  { id: 4, name: "GLP-1 SM", price: "$128.00", contents: "Lyophilized Powder in 3ml vial", batch: "NV-P-GLP1", formula: "C187H291N45O59", cas: "N/A", mw: "4113.58 g/mol", storage: "Store at ≤-20°C", app: "glucose regulation and metabolic studies", appearance: "Solid, white powder" },
  { id: 5, name: "GLP-2 TZ", price: "$100.00 – $184.00", contents: "Lyophilized Powder in 3ml vial", batch: "NV-P-GLP2", formula: "C225H348N48O68", cas: "N/A", mw: "4813.53 g/mol", storage: "Store at ≤-20°C", app: "glucose control and metabolic syndrome", appearance: "Solid, white powder" },
  { id: 6, name: "GLP-3 RT", price: "$75.00 – $340.00", contents: "Lyophilized Powder in 3ml vial", batch: "NV-P-GLP3", formula: "C200H320N60O70", cas: "N/A", mw: "5000+ g/mol", storage: "Store at ≤-20°C", app: "advanced metabolic and energy expenditure", appearance: "Solid, white powder" },
];

const template = (p) => `import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Shield, FileText, ExternalLink, Check } from "lucide-react";

const product = {
  name: "${p.name}",
  price: "${p.price}",
  contents: "${p.contents}",
  batch: "${p.batch}",
  formula: "${p.formula}",
  cas: "${p.cas}",
  mw: "${p.mw}",
  storage: "${p.storage}",
  app: "${p.app}",
  appearance: "${p.appearance}"
};

export default function ProductPage() {
  return (
    <div className="pt-24 min-h-screen bg-[#0a0a0b]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-white">Products</Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square rounded-3xl bg-gradient-to-b from-[#1a1a1c] to-[#141415] border border-zinc-800/50 flex items-center justify-center p-12">
            <Image src="/vial-3d.svg" alt={product.name} width={300} height={450} className="object-contain" />
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-[#b87333] mb-6">{product.price}</p>
            
            <div className="bg-[#141415] rounded-2xl p-6 border border-zinc-800 mb-6">
              <h3 className="text-white font-semibold mb-2">Contents:</h3>
              <p className="text-zinc-400">{product.contents}</p>
              <p className="text-[#b87333] text-sm mt-2">Requires reconstitution with BAC water <Link href="/products/33" className="underline">(Sold Here)</Link></p>
            </div>

            <div className="bg-orange-500/10 rounded-2xl p-6 border border-orange-500/20 mb-6">
              <Shield className="w-6 h-6 text-[#b87333] mb-2" />
              <h3 className="text-white font-semibold">Rigorous Third-Party Testing</h3>
              <p className="text-zinc-400 text-sm">Every batch undergoes third-party HPLC testing.</p>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-green-400 font-medium">In stock</span>
            </div>

            <button className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#b87333] hover:bg-[#cd7f32] text-white rounded-xl font-semibold text-lg mb-6">
              <ShoppingCart className="w-5 h-5" /> Add to cart
            </button>

            <Link href="#" className="inline-flex items-center gap-2 text-[#b87333] mb-2">
              <FileText className="w-5 h-5" /> Certificate of Analysis <ExternalLink className="w-4 h-4" />
            </Link>
            <p className="text-zinc-500 text-sm mb-6">Batch: {product.batch}</p>
          </div>
        </div>

        <div className="mt-16 bg-[#141415] rounded-3xl p-8 border border-zinc-800">
          <h2 className="text-2xl font-bold text-white mb-6">Product Specifications:</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-zinc-800">
              <span className="text-zinc-500">Application:</span>
              <span className="text-white">Research peptide evaluated in {product.app} studies.</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-zinc-800">
              <span className="text-zinc-500">Appearance:</span>
              <span className="text-white">{product.appearance} in 3mL glass ampule</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-zinc-800">
              <span className="text-zinc-500">Chemical Formula:</span>
              <span className="text-white font-mono">{product.formula}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-zinc-800">
              <span className="text-zinc-500">CAS Number:</span>
              <span className="text-white">{product.cas}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-zinc-800">
              <span className="text-zinc-500">Molecular Weight:</span>
              <span className="text-white">{product.mw}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-zinc-800">
              <span className="text-zinc-500">Storage:</span>
              <span className="text-white">{product.storage}, sealed, away from heat, light, and moisture.</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <span className="text-zinc-500">Concentration:</span>
              <span className="text-white">≥99%</span>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-[#141415] rounded-3xl p-8 border border-zinc-800">
          <h3 className="text-white font-semibold mb-2">Have a question?</h3>
          <p className="text-zinc-400 text-sm mb-4">Reach out to our U.S. support team at:</p>
          <a href="mailto:support@peptidelabs.com" className="text-[#b87333] hover:text-[#cd7f32]">support@peptidelabs.com</a>
        </div>
      </div>
    </div>
  );
}
`;

products.forEach(p => {
  fs.writeFileSync(`src/app/products/${p.id}/page.tsx`, template(p));
});

console.log("Created 6 product pages");
