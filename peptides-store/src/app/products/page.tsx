import Link from "next/link";
import { ProductCard } from "@/components/product-card";

const featuredProducts = [
  { id: 1, name: "GHRP-6", description: "5mg Vial - Synthetic hexapeptide for laboratory analytical applications", price: 35, category: "Research Peptides", image: "/vial-3d.svg" },
  { id: 2, name: "BPC-157", description: "5mg Vial - Body protection compound for tissue research", price: 35, category: "Healing Peptides", image: "/vial-3d.svg" },
  { id: 3, name: "TB-500", description: "5mg Vial - Thymosin beta-4 synthetic peptide", price: 35, category: "Recovery Peptides", image: "/vial-3d.svg" },
  { id: 4, name: "GHK-CU", description: "50mg Vial - Copper peptide complex", price: 48, category: "Copper Peptides", image: "/vial-3d.svg" },
  { id: 5, name: "GLP-1 SM", description: "10mg Vial - Semaglutide analog for metabolic research", price: 128, category: "Glucagon Analogs", image: "/vial-3d.svg" },
  { id: 6, name: "NAD+", description: "500mg Vial - Nicotinamide adenine dinucleotide", price: 85, category: "Antioxidants", image: "/vial-3d.svg" },
];

export default function ProductsPage() {
  return (
    <div className="pt-24 min-h-screen bg-[#0a0a0b]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#b87333] text-sm tracking-wider uppercase mb-4">Premium Collection</p>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Research <span className="gradient-text font-semibold">Compounds</span>
          </h1>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Laboratory-grade peptides with verified purity for scientific research.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <Link
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 border border-zinc-700 text-white rounded-xl font-medium hover:border-[#b87333] transition-all"
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
