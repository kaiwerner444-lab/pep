import Link from "next/link";
import Image from "next/image";
import { 
  ShoppingCart, 
  ArrowLeft, 
  Shield, 
  Check, 
  FileText,
  Truck,
  Clock,
  FlaskConical,
  Home,
  Package,
  User,
  ChevronRight
} from "lucide-react";
import { allProducts } from "@/lib/products";

export function generateStaticParams() {
  return allProducts.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = allProducts.find((p) => p.id === parseInt(params.id));
  
  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center px-4">
        <div className="card p-8 text-center max-w-md">
          <h1 className="text-xl font-bold text-white mb-4">Product Not Found</h1>
          <Link href="/products" className="btn-primary inline-block px-6 py-3">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const isInStock = !product.outOfStock;

  return (
    <div className="min-h-screen bg-[#0a0c10] pb-24">
      {/* Header */}
      <header className="nav-blur fixed top-0 left-0 right-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f97316] rounded-xl flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">pep.center</span>
          </Link>

          <Link href="/products" className="icon-btn">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/products" className="hover:text-white">Products</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{product.name}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left - Product Image */}
            <div className="card p-6 flex items-center justify-center">
              <div className="relative">
                <Image 
                  src={product.image || "/vial-3d.svg"} 
                  alt={product.name}
                  width={200}
                  height={300}
                  className="object-contain"
                />
                {product.onSale && (
                  <span className="absolute -top-2 -right-2 px-3 py-1 bg-[#f97316] text-white text-sm font-bold rounded-full">
                    SALE
                  </span>
                )}
              </div>
            </div>

            {/* Right - Product Info */}
            <div className="space-y-4">
              {/* Title Section */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-[#f97316] font-semibold uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">{product.name}</h1>
                <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl font-bold text-white">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-600 line-through">${product.originalPrice}</span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-2 h-2 rounded-full ${isInStock ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className={`text-sm ${isInStock ? 'text-green-400' : 'text-red-400'}`}>
                    {isInStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {/* Add to Cart */}
                <button 
                  disabled={!isInStock}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all ${
                    isInStock 
                      ? 'btn-primary' 
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {isInStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>

              {/* Trust Badge */}
              <div className="card p-4 bg-[#f97316]/5 border-[#f97316]/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#f97316]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-[#f97316]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Third-Party Tested</h3>
                    <p className="text-gray-400 text-xs">HPLC verified with Certificate of Analysis</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3">
                <div className="card p-4 flex items-center gap-3">
                  <Truck className="w-5 h-5 text-[#f97316]" />
                  <div>
                    <p className="text-xs text-gray-500">Shipping</p>
                    <p className="text-sm font-medium text-white">24h</p>
                  </div>
                </div>
                <div className="card p-4 flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#f97316]" />
                  <div>
                    <p className="text-xs text-gray-500">Purity</p>
                    <p className="text-sm font-medium text-white">99.9%</p>
                  </div>
                </div>
              </div>

              {/* COA Link */}
              <Link 
                href="#" 
                className="card p-4 flex items-center justify-between hover:border-[#f97316] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#f97316]" />
                  <span className="text-white text-sm">Certificate of Analysis</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </Link>

              {/* Specifications */}
              <div className="card p-4">
                <h3 className="font-semibold text-white mb-3">Specifications</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Batch</span>
                    <span className="text-white">NV-P-{String(product.id).padStart(3, '0')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Form</span>
                    <span className="text-white">Lyophilized Powder</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Storage</span>
                    <span className="text-white">≤-20°C</span>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="card p-4 text-center">
                <p className="text-gray-400 text-sm mb-2">Questions?</p>
                <a href="mailto:support@pep.center" className="text-[#f97316] text-sm hover:underline">
                  support@pep.center
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="flex items-center justify-around py-3">
          <Link href="/" className="nav-item flex flex-col items-center gap-1">
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/products" className="nav-item active flex flex-col items-center gap-1">
            <Package className="w-6 h-6" />
            <span className="text-xs">Shop</span>
          </Link>
          <Link href="#" className="nav-item flex flex-col items-center gap-1">
            <User className="w-6 h-6" />
            <span className="text-xs">Account</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
