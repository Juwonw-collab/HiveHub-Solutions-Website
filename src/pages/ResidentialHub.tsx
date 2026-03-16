import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Sun, ShieldCheck, Wallet, Zap, ArrowRight, CheckCircle2, Users, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ResidentialHub() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-16 bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/residential-solar/1920/1080')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent/20 text-accent mb-8"
          >
            <Sun className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide uppercase">Residential Hub</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Powering Your Home <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-energy">
              With Confidence
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            We connect homeowners with the top-rated solar installers in their area and design custom financial strategies to maximize your home's value.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/book" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
              Get Your Free Quote <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How We Help Homeowners</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">Our streamlined process ensures you get the best equipment, the right installer, and the most favorable financing.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: FileText, title: "1. Consultation", desc: "We analyze your energy usage, roof layout, and financial goals." },
              { icon: Users, title: "2. Installer Match", desc: "We connect you with fully-vetted, top-tier local installers." },
              { icon: Wallet, title: "3. Custom Financing", desc: "We secure the best loan, lease, or PPA to fit your cash flow." },
              { icon: Zap, title: "4. Installation", desc: "Your matched installer completes the project with premium equipment." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-3xl border border-white/5 relative"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                  <step.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-muted leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing Options */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Flexible Financing Options</h2>
              <p className="text-muted text-lg mb-8 leading-relaxed">
                We don't just find a "low rate." We design a custom financial strategy that treats solar as a long-term asset. By partnering with specialized lenders, we ensure you get the right payment structure.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Zero-Down Solar Loans", desc: "Own your system from day one with no upfront cost. Benefit from federal tax credits and increase your home's equity." },
                  { title: "Solar Leases", desc: "Lock in a low, predictable monthly payment for your electricity without the responsibilities of ownership." },
                  { title: "Power Purchase Agreements (PPAs)", desc: "Pay only for the power the panels produce at a set rate that is lower than your current utility bill." }
                ].map((option, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1">
                      <CheckCircle2 className="w-6 h-6 text-energy" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{option.title}</h4>
                      <p className="text-muted leading-relaxed">{option.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-square glass rounded-[2.5rem] overflow-hidden relative p-8 flex flex-col justify-center">
                <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/solar-finance/800/800')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                <div className="relative z-10 space-y-6">
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Average Monthly Savings</span>
                      <span className="text-accent font-bold text-xl">$150 - $300</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full w-[75%]" />
                    </div>
                  </div>
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Federal Tax Credit</span>
                      <span className="text-energy font-bold text-xl">30%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-energy h-2 rounded-full w-[30%]" />
                    </div>
                  </div>
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Home Value Increase</span>
                      <span className="text-emerald-400 font-bold text-xl">~4.1%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-emerald-400 h-2 rounded-full w-[41%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Installer Network */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-8">
            <ShieldCheck className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Top-Tier Installer Network</h2>
          <p className="text-xl text-muted max-w-3xl mx-auto mb-12 leading-relaxed">
            We don't just hand you off to anyone. We have rigorously vetted a network of the best local solar installers to ensure your project is handled by certified, experienced professionals.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              "Fully Licensed & Insured",
              "Proven Track Record",
              "Premium Equipment Guarantees",
              "25-Year Warranties",
              "Local Permitting Experts",
              "Exceptional Customer Service"
            ].map((perk, i) => (
              <div key={i} className="flex items-center gap-3 justify-center glass py-4 px-6 rounded-full border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <span className="text-gray-300 font-medium">{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Go Solar?</h2>
          <p className="text-xl text-muted mb-10">
            Let us build your custom financial strategy and match you with the perfect installer.
          </p>
          <Link to="/book" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
            Book Your Free Consultation <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
