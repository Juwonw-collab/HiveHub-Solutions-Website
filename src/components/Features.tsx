import React from 'react';
import { motion } from 'motion/react';
import { Home, Building2, Briefcase } from 'lucide-react';

const pillars = [
  {
    title: 'For Homeowners',
    subtitle: 'Solar Hub',
    description: 'Tailored financing that goes beyond "low rates" to provide long-term asset value and optimal payment structures.',
    icon: Home,
    color: 'text-energy',
  },
  {
    title: 'For Developers',
    subtitle: 'Project Capital Hub',
    description: 'Complex capital stacks combining equity, debt, and incentives to make large-scale projects viable and scalable.',
    icon: Building2,
    color: 'text-energy',
  },
  {
    title: 'For Companies & Brokers',
    subtitle: 'The Capital Raising Hub',
    description: 'Secure deal rooms and streamlined compliance workflows for licensed brokers, investors, and growth-stage firms.',
    icon: Briefcase,
    color: 'text-white',
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-10 rounded-[2.5rem] hover:border-accent/50 transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${pillar.color}`}>
                <pillar.icon className="w-8 h-8" />
              </div>
              <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">{pillar.title}</p>
              <h3 className="text-2xl font-bold text-white mb-4">{pillar.subtitle}</h3>
              <p className="text-muted leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
