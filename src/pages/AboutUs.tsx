import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Shield, TrendingUp, Users } from 'lucide-react';

export default function AboutUs() {
  return (
    <main className="pt-24 pb-16 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="text-accent">HiveHub Solutions</span>
          </h1>
          <p className="text-xl text-muted/80 max-w-2xl mx-auto leading-relaxed">
            Redefining Financial Freedom through Strategic Capital
          </p>
        </motion.div>

        <div className="space-y-16">
          {/* Introduction */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-none text-center"
          >
            <p className="text-xl md:text-2xl text-muted leading-relaxed">
              At <strong className="text-white">HiveHub Solutions</strong>, we believe that true financial independence shouldn’t be built on a foundation of debt. As a premier <strong className="text-white">capital brokerage and investment marketplace</strong>, we serve as the strategic bridge between equity-rich homeowners and entrepreneurs and the global capital markets.
            </p>
          </motion.section>

          {/* Our Mission */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-accent" />
              Our Mission
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              Our purpose is to revolutionize the way you access liquidity. We empower you to unlock the dormant value in your assets—transforming equity into a catalyst for debt consolidation, business scaling, or renewable energy upgrades. By prioritizing <strong className="text-white">housing stability</strong> and <strong className="text-white">cash-flow-positive outcomes</strong>, we ensure that your growth today doesn’t compromise your security tomorrow.
            </p>
          </motion.section>

          {/* The Hive Hub Advantage */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">The HiveHub Advantage</h2>
            <p className="text-lg text-muted leading-relaxed text-center mb-12 max-w-3xl mx-auto">
              We don’t just find funds; we architect solutions. In a landscape often clouded by complexity, we bring transparency and sophistication to the forefront.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Non-Debt Capital Focus',
                  desc: 'We specialize in non-debt solutions that protect your balance sheet.'
                },
                {
                  icon: Users,
                  title: 'Strategic Brokerage',
                  desc: 'Our platform acts as a high-level hub, connecting you to sophisticated capital sources tailored to your specific goals.'
                },
                {
                  icon: CheckCircle2,
                  title: 'Long-Term Independence',
                  desc: 'Every deal we facilitate is measured against its ability to provide long-term financial freedom.'
                }
              ].map((feature, idx) => (
                <div key={idx} className="glass p-8 rounded-2xl border border-white/5 hover:border-accent/30 transition-colors">
                  <feature.icon className="w-10 h-10 text-accent mb-6" />
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-muted leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Bridging the Gap */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Bridging the Gap</h2>
            <p className="text-lg text-muted leading-relaxed mb-8">
              Located at the intersection of innovation and integrity, HiveHub Solutions is more than a platform—it is a partner in your financial evolution. Whether you are an entrepreneur looking to fuel your next venture or a homeowner seeking to optimize your financial footprint, we provide the expertise and the network to turn equity into opportunity.
            </p>
            <a href="/book" className="btn-primary inline-block">
              Partner With Us Today
            </a>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
