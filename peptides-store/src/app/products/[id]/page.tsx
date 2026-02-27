import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Shield, FileText, ExternalLink, Check } from "lucide-react";
import { allProducts } from "../page";

export function generateStaticParams() {
  return allProducts.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = allProducts.find((p) => p.id === parseInt(params.id));
  
  if (!product) {
    return <div className="pt-32 text-center text-white">Product not found</div>;
  }

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
            <p className="text-3xl font-bold text-[#b87333] mb-6">${product.price}</p>
            
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
            <p className="text-zinc-500 text-sm mb-6">Batch: NV-P-{product.id}001</p>
          </div>
        </div>

        <div className="mt-16 bg-[#141415] rounded-3xl p-8 border border-zinc-800">
          <h2 className="text-2xl font-bold text-white mb-6">Product Specifications:</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-zinc-800">
              <span className="text-zinc-500">Application:</span>
              <span className="text-white">{product.application}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-zinc-800">
              <span className="text-zinc-500">Appearance:</span>
              <span className="text-white">{product.appearance}</span>
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
              <span className="text-zinc-500">Storage:</span>
              <span className="text-white">{product.storage}</span>
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
