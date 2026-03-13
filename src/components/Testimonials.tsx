import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, Nexus Tech',
    content: 'HiveHub has completely transformed how our remote team collaborates. The community support is unparalleled.',
    image: 'https://picsum.photos/seed/sarah/100/100',
  },
  {
    name: 'Marcus Thorne',
    role: 'Founder, GreenScale',
    content: 'The strategic insights we gained from the HiveHub network helped us double our revenue in just six months.',
    image: 'https://picsum.photos/seed/marcus/100/100',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Design Director, Aura',
    content: 'A beautiful environment that fosters creativity. It is more than just a workspace; it is a growth engine.',
    image: 'https://picsum.photos/seed/elena/100/100',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Join thousands of satisfied members who have found their professional home with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 relative group hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <Quote className="w-10 h-10 text-amber-500/20 absolute top-8 right-8 group-hover:text-amber-500/40 transition-colors" />
              
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover ring-4 ring-white"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
              
              <p className="text-slate-700 leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
