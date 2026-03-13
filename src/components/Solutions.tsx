import React from 'react';
import { motion } from 'motion/react';
import { Sun, Building, Share2 as Hub, CheckCircle2 } from 'lucide-react';

const solutions = [
  {
    id: 'residential',
    title: 'Residential: Custom Solar Financial Strategies',
    subtitle: 'For Homeowners seeking more than just a loan.',
    description: 'We don’t just find a "low rate"; we design a custom financial strategy that treats solar as a long-term asset. By partnering with specialized lenders, we ensure homeowners get the right payment structure and tax-advantage alignment to maximize their home’s value.',
    icon: Sun,
    features: [
      'Tailored Debt Structuring: Options that fit your specific cash flow goals.',
      'Incentive Optimization: Navigating federal and local credits to lower your net cost.',
      'Long-Term Value Planning: Ensuring your system adds maximum equity to your property.',
    ],
  },
  {
    id: 'commercial',
    title: 'Commercial: Developer Capital Stacks & Project Financing',
    subtitle: 'For Developers scaling complex renewable energy projects.',
    description: 'Viability is decided by the capital stack. HiveHub Solutions helps developers structure and secure the right mix of equity, debt, and tax-equity to get projects fully funded and built to scale.',
    icon: Building,
    features: [
      'Structured Project Financing: Bridge loans, construction-to-perm, and mezzanine debt.',
      'Incentive Navigation: Strategic use of REAP grants, ITC/PTC, and local rebates.',
      'Scalable Frameworks: Structuring your first project so the second and third are easier to fund.',
    ],
  },
  {
    id: 'the-hub',
    title: 'The Hub: Capital Raising & Broker Ecosystem',
    subtitle: 'For Companies, Licensed Brokers, and Professional Investors.',
    description: 'We provide the centralized infrastructure for growth-stage and middle-market companies to raise capital. Through secure deal rooms and organized workflows, we facilitate the connection between credible companies and the licensed professionals who manage the raise.',
    icon: Hub,
    features: [
      'Secure Deal Rooms: Centralized document management and investor communication.',
      'Compliance-First Workflows: Streamlined processes for licensed capital brokers.',
      'Investor Relations Tools: Organized deal flow for professional investors looking for renewable energy opportunities.',
    ],
  },
];

export default function Solutions() {
  return (
    <section id="solutions" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Financing & Capital Solutions</h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </div>

        <div className="space-y-24">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              id={solution.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col lg:flex-row gap-16 items-center p-8 rounded-3xl border border-transparent hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="flex-1">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8">
                  <solution.icon className={`w-8 h-8 ${index < 2 ? 'text-energy' : 'text-accent'}`} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{solution.title}</h3>
                <p className="text-accent font-medium mb-6 italic">{solution.subtitle}</p>
                <p className="text-muted text-lg leading-relaxed mb-8">
                  {solution.description}
                </p>
                <div className="space-y-4">
                  {solution.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-6 h-6 shrink-0 mt-1 ${index < 2 ? 'text-energy' : 'text-accent'}`} />
                      <span className="text-muted leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="aspect-video glass rounded-[2.5rem] overflow-hidden relative group">
                  <img 
                    src={`https://picsum.photos/seed/${solution.id}/800/600`} 
                    alt={solution.title} 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
