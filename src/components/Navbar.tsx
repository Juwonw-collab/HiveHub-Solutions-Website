import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, Hexagon, Settings } from 'lucide-react';
import { useBranding } from '../BrandingContext';
import LogoUploader from './LogoUploader';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const { logoUrl } = useBranding();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { 
      name: 'Solutions', 
      href: '/#solutions',
      subLinks: [
        { name: 'Residential', href: '/#residential' },
        { name: 'Commercial', href: '/#commercial' },
        { name: 'Capital Hub', href: '/#the-hub' },
      ]
    },
    { name: 'The Hub', href: '/#the-hub' },
    { name: 'Pitch Deck', href: '/pitch-deck' },
    { name: 'About Us', href: '/about' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {logoUrl ? (
              <img src={logoUrl} alt="Company Logo" className="h-10 w-auto object-contain" />
            ) : (
              <>
                <Hexagon className="w-8 h-8 text-accent fill-accent/20" />
                <span className="text-xl font-bold tracking-tight text-white uppercase">HiveHub Solutions</span>
              </>
            )}
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.subLinks ? (
                  <button 
                    onClick={() => setSolutionsOpen(!solutionsOpen)}
                    className="flex items-center gap-1 text-sm font-medium text-muted hover:text-accent transition-colors"
                  >
                    {link.name} <ChevronDown className="w-4 h-4" />
                  </button>
                ) : (
                  <a
                    href={link.href}
                    className="text-sm font-medium text-muted hover:text-accent transition-colors"
                  >
                    {link.name}
                  </a>
                )}
                
                {link.subLinks && (
                  <div className="absolute top-full left-0 mt-2 w-48 glass rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {link.subLinks.map((sub) => (
                      <a
                        key={sub.name}
                        href={sub.href}
                        className="block px-4 py-3 text-sm text-muted hover:text-accent hover:bg-white/5 transition-colors"
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsUploaderOpen(true)}
                className="p-2 text-muted hover:text-accent transition-colors"
                title="Branding Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button className="text-sm font-medium text-muted hover:text-white transition-colors">
                Member Login
              </button>
              <Link 
                to="/book" 
                className="btn-primary py-2 px-6 text-sm"
              >
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-4 text-base font-medium text-muted hover:text-accent"
                  >
                    {link.name}
                  </a>
                  {link.subLinks && (
                    <div className="pl-6 space-y-2">
                      {link.subLinks.map((sub) => (
                        <a
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-2 text-sm text-muted hover:text-accent"
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-6 space-y-4">
                <button className="w-full text-center py-3 text-muted font-medium">
                  Member Login
                </button>
                <Link 
                  to="/book" 
                  onClick={() => setIsOpen(false)} 
                  className="block w-full btn-primary text-center"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LogoUploader isOpen={isUploaderOpen} onClose={() => setIsUploaderOpen(false)} />
    </nav>
  );
}
