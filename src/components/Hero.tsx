import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { useBranding } from '../BrandingContext';

export default function Hero() {
  const { mascotUrl } = useBranding();
  // We'll look for 'hero-bg.jpg' in the public folder. 
  // If it's not there yet, it will fall back to the dark background color.
  const customBgUrl = "/hero-bg.jpg"; 

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  // Parallax effect: move background down by 30% as we scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="hero-section relative overflow-hidden">
      <motion.div 
        className="absolute left-0 right-0 w-full h-[130%] -top-[15%] z-0"
        style={{ 
          backgroundImage: `url(${customBgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y 
        }}
      />
      <div className="hero-overlay"></div>
      <div className="hero-content pt-24 md:pt-32">
        <h1>
          <span className="block text-xl md:text-2xl font-medium text-white/80 mb-2 tracking-widest">HIVEHUB SOLUTIONS</span>
          THE CENTRALIZED HUB FOR <span className="gold-text">SOLAR CAPITAL</span>
        </h1>
        <p>Connecting companies, developers, and homeowners with licensed brokers and tailored financial strategies.</p>
        <div className="cta-group">
          <Link to="/book" className="btn-gold">Book Appointment</Link>
          <Link to="/book" className="btn-outline">Request Strategy</Link>
        </div>
        {mascotUrl && (
          <img
            src={mascotUrl}
            alt="Mascot"
            className="w-24 h-24 object-contain mt-8"
            referrerPolicy="no-referrer"
          />
        )}
      </div>
    </section>
  );
}
