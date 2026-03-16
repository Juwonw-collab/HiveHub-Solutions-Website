import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function WorkWithUs() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-accent text-sm font-medium mb-6">
            <Briefcase className="w-4 h-4" />
            <span>Careers at HiveHub</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Join the <span className="text-accent">HiveHub</span> Team
          </h1>
          <p className="text-lg text-muted">
            We are always looking for driven, innovative, and passionate individuals to join our growing team. Discover your next career opportunity with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Why Work With Us?</h2>
              <ul className="space-y-4">
                {[
                  'Innovative and fast-paced environment',
                  'Opportunities for rapid career growth',
                  'Competitive compensation and benefits',
                  'Collaborative and inclusive culture',
                  'Work on cutting-edge real estate and capital solutions'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Current Openings</h2>
              <p className="text-muted mb-6">
                We are currently accepting open applications for roles in sales, property management, capital acquisition, and technology.
              </p>
              <a href="mailto:careers@hivehubsolutions.net" className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors font-medium">
                <Mail className="w-5 h-5" />
                Email your resume to careers@hivehubsolutions.net
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass p-8 rounded-2xl border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Apply Now</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-gray-300">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-gray-300">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium text-gray-300">Desired Role / Department</label>
                <select
                  id="role"
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all appearance-none"
                >
                  <option value="">Select a department</option>
                  <option value="sales">Sales & Acquisitions</option>
                  <option value="management">Property Management</option>
                  <option value="capital">Capital & Finance</option>
                  <option value="tech">Technology & Engineering</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="linkedin" className="text-sm font-medium text-gray-300">LinkedIn Profile URL</label>
                <input
                  type="url"
                  id="linkedin"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-300">Cover Letter / Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none"
                  placeholder="Tell us why you'd be a great fit for HiveHub..."
                ></textarea>
              </div>

              <button type="submit" className="w-full btn-primary py-4 flex items-center justify-center gap-2 group">
                Submit Application
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
