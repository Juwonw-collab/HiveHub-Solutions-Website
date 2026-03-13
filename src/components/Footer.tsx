import React from 'react';
import { Hexagon, Github, Twitter, Linkedin } from 'lucide-react';
import { useBranding } from '../BrandingContext';

export default function Footer() {
  const { logoUrl, mascotUrl } = useBranding();
  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                {logoUrl ? (
                  <img src={logoUrl} alt="Company Logo" className="h-10 w-auto object-contain" />
                ) : (
                  <>
                    <Hexagon className="w-8 h-8 text-accent fill-accent/20" />
                    <span className="text-xl font-bold tracking-tight uppercase">HiveHub Solutions</span>
                  </>
                )}
              </div>
              {mascotUrl && (
                <img src={mascotUrl} alt="Mascot" className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
              )}
            </div>
            <p className="text-muted text-lg max-w-sm mb-8">
              The centralized hub for solar capital and custom financing strategies. 
              Bridging the gap between vision and capital.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-muted hover:text-accent transition-colors"><Twitter className="w-6 h-6" /></a>
              <a href="#" className="text-muted hover:text-accent transition-colors"><Linkedin className="w-6 h-6" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Solutions</h4>
            <ul className="space-y-4 text-muted">
              <li><a href="/#residential" className="hover:text-accent transition-colors">Residential</a></li>
              <li><a href="/#commercial" className="hover:text-accent transition-colors">Commercial</a></li>
              <li><a href="/#capital-hub" className="hover:text-accent transition-colors">Capital Hub</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Company</h4>
            <ul className="space-y-4 text-muted">
              <li><a href="/#about" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="/#the-hub" className="hover:text-accent transition-colors">The Hub</a></li>
              <li><a href="/#get-started" className="hover:text-accent transition-colors">Get Started</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12">
          <div className="max-w-4xl mb-8">
            <p className="text-[10px] md:text-xs text-muted/50 leading-relaxed uppercase tracking-tighter">
              <span className="font-bold text-muted/80">Disclaimer:</span> HiveHub Solutions acts as a trusted intermediary, technology platform, and strategy partner. We are not a licensed broker-dealer, investment advisor, or lender. All regulated capital raising, lending, and investment activities are conducted through our network of independent, licensed third-party professionals and financial institutions.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-muted/40 text-xs">
              © 2026 HiveHub Solutions. All rights reserved.
            </p>
            <div className="flex gap-8 text-xs text-muted/40">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
