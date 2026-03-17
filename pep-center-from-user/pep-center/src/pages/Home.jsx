import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import { Shield, FileText, Beaker, Zap, ChevronRight, ArrowRight, Check } from 'lucide-react';
import {
  useMouseParallax,
  AnimatedSection
} from '../hooks/useAnimations.jsx';

// Premium research goals — quality over quantity
const researchGoals = [
  {
    title: 'Metabolic Research',
    subtitle: 'Weight management & metabolic pathways',
    icon: Zap,
    baseProducts: ['semaglutide', 'tirzepatide', 'aod-9604', 'mots-c'],
  },
  {
    title: 'Tissue Repair',
    subtitle: 'Wound healing & regeneration',
    icon: Shield,
    baseProducts: ['bpc-157', 'tb-500', 'ghk-cu'],
  },
  {
    title: 'Collagen Support',
    subtitle: 'Structural & aesthetic research',
    icon: Beaker,
    baseProducts: ['ghk-cu', 'nasal-tb-500'],
  },
  {
    title: 'Recovery Optimization',
    subtitle: 'Performance & cellular adaptation',
    icon: ArrowRight,
    baseProducts: ['bpc-157', 'tb-500', 'peg-mgf'],
  },
];

// Trust bar items
const trustItems = [
  { text: 'HPLC Verified', icon: Shield },
  { text: 'Third-Party Tested', icon: Beaker },
  { text: 'COA Included', icon: FileText },
  { text: 'Same-Day Shipping', icon: Zap },
];

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState(0);
  const heroRef = useRef(null);
  const parallaxRef = useRef(null);

  // Add Google Fonts import at component level
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const featuredProducts = products.slice(0, 6);

  const faqItems = [
    {
      question: 'What purity standards do you maintain?',
      answer: 'All our products undergo rigorous HPLC analysis with ≥99% purity verification. Each order includes a Certificate of Analysis from independent third-party testing.'
    },
    {
      question: 'How should I store these peptides?',
      answer: 'Store lyophilized peptides at ≤25°C in a sealed container, away from heat, light, and moisture. After reconstitution, maintain proper storage per the Certificate of Analysis included with your order.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'We currently ship within the United States. All orders qualify for same-day shipping from our U.S. facility.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We stand behind our products. If you have any concerns about quality or purity, contact our support team at info@pep.center.'
    },
    {
      question: 'Are these products for human consumption?',
      answer: 'All products are sold for research purposes only. They are not intended for human consumption and must be used in accordance with applicable laws and regulations.'
    },
  ];

  return (
    <>
      <SEO
        title="Research-Grade Peptides | Pep.Center"
        description="Premium HPLC-verified peptides for research. ≥99% purity, third-party tested, same-day shipping."
      />

      <style>{`
        :root {
          --font-serif: 'Instrument Serif', serif;
          --font-sans: 'DM Sans', sans-serif;
        }
        body {
          font-family: var(--font-sans);
        }
      `}</style>

      {/* ===== HERO SECTION ===== */}
      <section
        ref={heroRef}
        className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(15,17,29,1) 0%, rgba(20,23,38,1) 50%, rgba(15,17,29,1) 100%)',
        }}
      >
        {/* Subtle mesh background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 blur-3xl rounded-full mix-blend-multiply" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 blur-3xl rounded-full mix-blend-multiply" />
        </div>

        <div className="relative z-10 max-w-4xl w-full text-center">
          {/* Main headline */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-light leading-tight mb-2"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Research-Grade Peptides
          </h1>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-light italic mb-6"
            style={{ fontFamily: 'var(--font-serif)', color: '#f97316' }}
          >
            For Modern Science
          </h2>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-orange-500" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-orange-500" />
          </div>

          {/* Subtext */}
          <p className="text-lg text-gray-300 mb-10 tracking-wide">
            ≥99% HPLC-verified purity · Certificate of Analysis included · Same-day shipping
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/products"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors"
            >
              Browse Catalog
            </Link>
            <button className="px-8 py-4 border border-gray-400 text-gray-100 hover:border-orange-500 hover:text-orange-400 font-medium transition-colors">
              View Bundles
            </button>
          </div>

          {/* Hero Stats Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 text-sm">
            <div className="text-center">
              <p className="text-2xl font-light" style={{ fontFamily: 'var(--font-serif)' }}>35+</p>
              <p className="text-gray-400 uppercase tracking-widest text-xs">Compounds</p>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-700" />
            <div className="text-center">
              <p className="text-2xl font-light" style={{ fontFamily: 'var(--font-serif)' }}>≥99%</p>
              <p className="text-gray-400 uppercase tracking-widest text-xs">Purity</p>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-700" />
            <div className="text-center">
              <p className="text-2xl font-light" style={{ fontFamily: 'var(--font-serif)' }}>U.S.</p>
              <p className="text-gray-400 uppercase tracking-widest text-xs">Based</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="w-full bg-gray-950/50 border-y border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {trustItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <IconComponent className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SHOP BY RESEARCH GOAL ===== */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-4xl sm:text-5xl font-light mb-4"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Shop by Research Goal
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our curated selection organized by research focus
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {researchGoals.map((goal, idx) => {
              const Icon = goal.icon;
              return (
                <AnimatedSection key={idx} delay={idx * 100}>
                  <div className="group relative">
                    <div className="bg-gray-900/60 backdrop-blur border border-gray-800 hover:border-orange-500/50 p-6 transition-all duration-300 cursor-pointer h-full flex flex-col">
                      {/* Left border accent on hover */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                      <Icon className="w-8 h-8 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-1">{goal.title}</h3>
                      <p className="text-sm text-gray-400">{goal.subtitle}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gray-950/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2
              className="text-4xl sm:text-5xl font-light"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Most Popular
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product, idx) => (
              <AnimatedSection key={product.id} delay={idx * 150}>
                <ProductCard product={product} />
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-medium transition-colors"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== QUALITY SECTION ===== */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Headline */}
            <div>
              <h2
                className="text-5xl sm:text-6xl font-light leading-tight"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Uncompromising Quality
              </h2>
              <p className="text-gray-400 mt-6 text-lg">
                Every compound in our catalog represents our commitment to scientific rigor and premium standards.
              </p>
            </div>

            {/* Right: Quality Points Stack */}
            <div className="space-y-8">
              {[
                {
                  title: 'HPLC Verification',
                  desc: 'High-Performance Liquid Chromatography analysis confirms ≥99% purity on every batch.'
                },
                {
                  title: 'Independent Testing',
                  desc: 'Third-party laboratory verification ensures unbiased quality assurance and traceability.'
                },
                {
                  title: 'Complete Documentation',
                  desc: 'Certificate of Analysis provided with every order — transparent, verifiable, detailed.'
                },
                {
                  title: 'Research-Grade Standards',
                  desc: 'Specifications designed for rigorous scientific investigation, not novelty applications.'
                },
              ].map((point, idx) => (
                <div key={idx} className="flex gap-4">
                  <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">{point.title}</h3>
                    <p className="text-gray-400 text-sm">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section id="faq" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gray-950/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-4xl sm:text-5xl font-light mb-4"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Frequently Asked
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div key={idx} className="border border-gray-800 bg-gray-900/40">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? -1 : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors text-left"
                >
                  <span className="font-medium">{item.question}</span>
                  <ChevronRight
                    className={`w-5 h-5 text-orange-500 transition-transform ${
                      expandedFaq === idx ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 py-4 bg-gray-900/80 border-t border-gray-800 text-gray-300 text-sm">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER CTA ===== */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-4xl sm:text-5xl font-light mb-6"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Ready to advance your research?
          </h2>
          <p className="text-gray-400 mb-8">
            Browse our complete catalog of research-grade peptides or contact our team for custom inquiries.
          </p>
          <Link
            to="/products"
            className="inline-block px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors"
          >
            Explore Our Catalog
          </Link>
        </div>
      </section>
    </>
  );
}
