import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Booking() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS environment variables are missing. Please configure them in your .env file.");
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      setSubmitStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Book an <span className="text-accent">Appointment</span>
        </h1>
        <p className="text-muted text-center mb-12 max-w-2xl mx-auto">
          Schedule a consultation with our experts to discuss your solar capital needs and discover tailored financial strategies.
        </p>

        <div className="glass p-8 rounded-2xl">
          {submitStatus === 'success' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Request Sent Successfully!</h2>
              <p className="text-muted mb-8">
                Thank you for reaching out. Our team will review your details and get back to you shortly to confirm your appointment.
              </p>
              <button 
                onClick={() => setSubmitStatus('idle')}
                className="btn-outline"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {submitStatus === 'error' && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-red-500">Failed to send request</h4>
                    <p className="text-xs text-red-400 mt-1">
                      There was an error sending your request. Please ensure your EmailJS credentials are configured correctly in the settings.
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-muted mb-2">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input 
                      type="text" 
                      name="first_name"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-accent transition-colors"
                      placeholder="John"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted mb-2">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input 
                      type="text" 
                      name="last_name"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-accent transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-muted mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input 
                      type="email" 
                      name="user_email"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-accent transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input 
                      type="tel" 
                      name="user_phone"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-accent transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-muted mb-2">Preferred Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input 
                      type="date" 
                      name="preferred_date"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted mb-2">Preferred Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input 
                      type="time" 
                      name="preferred_time"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted mb-2">How can we help you?</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-muted" />
                  <textarea 
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Tell us about your project or capital needs..."
                  ></textarea>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full btn-primary py-4 text-lg mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending Request...
                  </>
                ) : (
                  'Confirm Appointment'
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </main>
  );
}
