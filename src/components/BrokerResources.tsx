import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { FileText, Download, ArrowRight, ShieldCheck, Layout, Users2 } from 'lucide-react';

const deckPoints = [
  { title: 'The Problem', desc: 'Fragmented capital raising and disorganized data rooms.' },
  { title: 'The Solution', desc: 'A centralized workspace bridging the gap between owners and brokers.' },
  { title: 'Ecosystem Pillars', desc: 'Companies, Developers, and Homeowners unified.' },
  { title: 'Broker Edge', desc: 'Vetted deal flow and pre-structured financial modeling.' },
];

export default function BrokerResources() {
  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-[3rem] overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 p-8 md:p-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">For Licensed Brokers</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                  The Future of Distributed <br />
                  <span className="text-accent">Capital Raising</span>
                </h2>
                <p className="text-muted text-lg mb-10 leading-relaxed">
                  We provide the "Deal Room" infrastructure that keeps brokers and investors organized. 
                  Access our vetted deal flow and streamlined compliance workflows.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                  {deckPoints.map((point) => (
                    <div key={point.title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{point.title}</h4>
                        <p className="text-xs text-muted mt-1">{point.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link 
                  to="/book" 
                  className="btn-primary flex items-center gap-2 group inline-flex"
                >
                  Request Broker Demo 
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            <div className="flex-1 bg-white/5 p-8 md:p-16 flex flex-col justify-center border-l border-white/10">
              <div className="relative">
                {/* Mockup of a Pitch Deck */}
                <div className="bg-black rounded-2xl border border-white/10 p-8 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                      <FileText className="w-4 h-4 text-black" />
                    </div>
                    <span className="text-xs font-bold text-muted uppercase tracking-widest">Pitch Deck Outline</span>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="h-2 w-3/4 bg-white/10 rounded" />
                    <div className="h-2 w-full bg-white/10 rounded" />
                    <div className="h-2 w-1/2 bg-white/10 rounded" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="aspect-video bg-white/5 rounded-lg border border-white/5 flex items-center justify-center">
                      <Layout className="w-6 h-6 text-muted/20" />
                    </div>
                    <div className="aspect-video bg-white/5 rounded-lg border border-white/5 flex items-center justify-center">
                      <Users2 className="w-6 h-6 text-muted/20" />
                    </div>
                  </div>

                  <button className="w-full py-3 rounded-xl border border-accent/30 text-accent text-sm font-bold flex items-center justify-center gap-2 hover:bg-accent hover:text-black transition-all">
                    <Download className="w-4 h-4" />
                    Download Outline
                  </button>
                </div>
                
                {/* Decorative glow */}
                <div className="absolute -inset-4 bg-accent/20 blur-3xl -z-10 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
