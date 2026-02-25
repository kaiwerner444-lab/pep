import { Beaker, Shield, Award, Users } from "lucide-react";

const values = [
  {
    icon: Beaker,
    title: "Scientific Excellence",
    description: "We partner with certified laboratories to ensure every batch meets the highest purity standards.",
  },
  {
    icon: Shield,
    title: "Transparency First",
    description: "Every product comes with a Certificate of Analysis (COA) from third-party testing.",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "99%+ purity or your money back. We stand behind every product we sell.",
  },
  {
    icon: Users,
    title: "Researcher Support",
    description: "Our team includes scientists who understand your research needs.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <div className="relative py-24 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">About PeptideLabs</h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            We are a team of scientists and researchers dedicated to providing 
            the highest quality research peptides for scientific advancement.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="py-24 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Founded by researchers who were frustrated with inconsistent peptide quality, 
                PeptideLabs was created to set a new standard in the research supply industry.
              </p>
              <p className="text-gray-400 mb-6 leading-relaxed">
                We believe that scientific progress depends on reliable, pure compounds. 
                That is why we have built relationships with the world is leading peptide 
                manufacturers and implemented rigorous quality control processes.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Every batch is HPLC and MS tested, and we provide full transparency 
                through publicly accessible Certificates of Analysis.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2">10k+</div>
                <div className="text-gray-400">Researchers</div>
              </div>
              <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
                <div className="text-gray-400">Products</div>
              </div>
              <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 text-center">
                <div className="text-4xl font-bold text-amber-400 mb-2">99%+</div>
                <div className="text-gray-400">Purity</div>
              </div>
              <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">5+</div>
                <div className="text-gray-400">Years</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-24 bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="w-7 h-7 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance Notice */}
      <div className="py-24 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
            <h3 className="text-xl font-bold text-yellow-500 mb-4">Research Use Only</h3>
            <p className="text-gray-400 leading-relaxed">
              All products sold by PeptideLabs are intended for laboratory research purposes only. 
              They are not intended for human consumption, diagnostic, therapeutic, or any 
              in vivo use. By purchasing from PeptideLabs, you acknowledge that you are a 
              qualified researcher and will use these products strictly for research purposes 
              in compliance with all applicable laws and regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
