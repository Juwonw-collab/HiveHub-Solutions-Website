import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, Hexagon, Settings, Phone, Mail, Clock, User } from 'lucide-react';
import { useBranding } from '../BrandingContext';
import { useAuth } from '../contexts/AuthContext';
import LogoUploader from './LogoUploader';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const { logoUrl } = useBranding();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Residential Hub', href: '/residential-hub' },
    { name: 'Commercial Hub', href: '/#commercial' },
    { name: 'Capital Hub', href: '/#the-hub' },
    { name: 'Pitch Deck', href: '/pitch-deck' },
    { name: 'About Us', href: '/about' },
    { name: 'Work With Us', href: '/work-with-us' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-md border-b border-white/10' : 'bg-black/50 backdrop-blur-sm'
      }`}
    >
      {/* Top Contact Bar */}
      <div className="border-b border-white/10 bg-zinc-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex justify-between items-center text-xs font-medium text-gray-300">
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="tel:+18005550199" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span className="hidden sm:inline">(800) 555-0199</span>
              <span className="sm:hidden">Call Us</span>
            </a>
            <a href="mailto:contact@hivehubsolutions.net" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Mail className="w-3.5 h-3.5 text-accent" />
              <span className="hidden sm:inline">contact@hivehubsolutions.net</span>
              <span className="sm:hidden">Email Us</span>
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-accent" />
            <span className="hidden sm:inline">Mon-Fri, 9:00 AM - 6:00 PM EST</span>
            <span className="sm:hidden">9AM - 6PM</span>
          </div>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {logoUrl ? (
              <img src={logoUrl} alt="Company Logo" className="h-8 w-auto object-contain" />
            ) : (
              <>
                <Hexagon className="w-6 h-6 text-accent fill-accent/20" />
                <span className="text-lg font-bold tracking-tight text-white uppercase">HiveHub Solutions</span>
              </>
            )}
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => (
              link.href.startsWith('/') && !link.href.includes('#') ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium text-muted hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-muted hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
              )
            ))}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsUploaderOpen(true)}
                className="p-2 text-muted hover:text-accent transition-colors"
                title="Branding Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              {user ? (
                <Link to="/crm" className="flex items-center gap-2 text-sm font-medium text-accent hover:text-white transition-colors">
                  <User className="w-4 h-4" />
                  Dashboard
                </Link>
              ) : (
                <Link to="/login" className="text-sm font-medium text-muted hover:text-white transition-colors">
                  Member Login
                </Link>
              )}
              <Link 
                to="/book" 
                className="btn-primary py-2 px-6 text-sm"
              >
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
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
            className="lg:hidden bg-black border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                link.href.startsWith('/') && !link.href.includes('#') ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-4 text-base font-medium text-muted hover:text-accent"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-4 text-base font-medium text-muted hover:text-accent"
                  >
                    {link.name}
                  </a>
                )
              ))}
              <div className="pt-6 space-y-4">
                {user ? (
                  <Link 
                    to="/crm"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3 text-accent font-medium border border-accent/20 rounded-xl bg-accent/5"
                  >
                    <User className="w-5 h-5" />
                    Go to Dashboard
                  </Link>
                ) : (
                  <Link 
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-3 text-muted font-medium"
                  >
                    Member Login
                  </Link>
                )}
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
