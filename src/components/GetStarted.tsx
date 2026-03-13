import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';

export default function GetStarted() {
  return (
    <section id="get-started" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                Request a <br />
                <span className="text-accent">Strategy Session</span>
              </h2>
              <p className="text-xl text-muted mb-10 leading-relaxed">
                Take the first step towards securing the capital your project needs. 
                Our experts will review your details and route you to the right licensed professionals.
              </p>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">1</div>
                  <p className="text-lg text-white">Submit your project details</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">2</div>
                  <p className="text-lg text-white">Initial strategy review</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">3</div>
                  <p className="text-lg text-white">Connect with licensed partners</p>
                </div>
              </div>

              <Link to="/book" className="btn-primary py-4 px-8 text-lg inline-flex items-center gap-2">
                Book Appointment <Send className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          <div className="flex-1 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass rounded-[2.5rem] min-h-[400px] flex items-center justify-center relative p-12 text-center"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Ready to get started?</h3>
                <p className="text-muted mb-8">Schedule a time with our experts to discuss your specific needs and find the right capital solutions.</p>
                <Link to="/book" className="btn-outline py-3 px-8">
                  Request Strategy
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
