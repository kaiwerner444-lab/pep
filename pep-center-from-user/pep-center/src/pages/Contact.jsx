import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  MessageSquare,
  ChevronLeft,
  Sparkles
} from 'lucide-react';
import { AnimatedSection } from '../hooks/useAnimations.jsx';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSent(true);
    setIsSubmitting(false);
  };

  if (isSent) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedSection animation="scaleIn">
            <div className="w-24 h-24 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Message Sent!</h1>
            <p className="text-white/60 mb-8">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#f97316] text-white rounded-xl hover:bg-[#ea580c] transition-colors"
            >
              Back to Home
            </Link>
          </AnimatedSection>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-white/50 hover:text-white transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Contact Us</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-4">
            <AnimatedSection animation="fadeUp">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-[#f97316]/20 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-[#f97316]" />
                </div>
                <h3 className="text-white font-semibold mb-2">Email</h3>
                <p className="text-white/60 text-sm mb-1">General Inquiries</p>
                <a href="mailto:info@pep.center" className="text-[#f97316] hover:underline">
                  info@pep.center
                </a>
                <p className="text-white/60 text-sm mb-1 mt-3">Support</p>
                <a href="mailto:support@pep.center" className="text-[#f97316] hover:underline">
                  support@pep.center
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeUp" delay={100}>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-[#06b6d4]/20 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-[#06b6d4]" />
                </div>
                <h3 className="text-white font-semibold mb-2">Phone</h3>
                <p className="text-white/60 text-sm mb-1">Mon-Fri 9am-6pm EST</p>
                <a href="tel:+1-800-PEP-LABS" className="text-[#06b6d4] hover:underline">
                  1-800-PEP-LABS
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeUp" delay={200}>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/20 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-[#8b5cf6]" />
                </div>
                <h3 className="text-white font-semibold mb-2">Response Time</h3>
                <p className="text-white/60 text-sm">
                  We typically respond within 24 hours during business days.
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <AnimatedSection animation="fadeUp" delay={100}>
              <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#f97316]/20 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-[#f97316]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Send us a message</h2>
                    <p className="text-white/50 text-sm">We'd love to hear from you</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#f97316] transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#f97316] transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Subject *</label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#f97316] transition-colors"
                    >
                      <option value="" className="bg-[#0a0e17]">Select a subject...</option>
                      <option value="general" className="bg-[#0a0e17]">General Inquiry</option>
                      <option value="order" className="bg-[#0a0e17]">Order Status</option>
                      <option value="product" className="bg-[#0a0e17]">Product Question</option>
                      <option value="wholesale" className="bg-[#0a0e17]">Wholesale / Bulk</option>
                      <option value="other" className="bg-[#0a0e17]">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#f97316] transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#f97316] text-white rounded-xl font-semibold hover:bg-[#ea580c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* FAQ Section */}
        <AnimatedSection animation="fadeUp" delay={200}>
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  q: "How long does shipping take?",
                  a: "Standard shipping takes 5-7 business days. Express options available at checkout."
                },
                {
                  q: "Do you ship internationally?",
                  a: "Yes, we ship to most countries worldwide. Customs fees may apply."
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept cryptocurrency, Zelle, wire transfer, and credit cards."
                },
                {
                  q: "Are your products for human use?",
                  a: "No, all products are sold strictly for laboratory research purposes only."
                },
              ].map((faq, i) => (
                <div key={i} className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#f97316] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium mb-2">{faq.q}</h4>
                      <p className="text-white/50 text-sm">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
