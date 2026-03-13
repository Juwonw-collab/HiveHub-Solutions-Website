import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Booking from './pages/Booking';
import PitchDeck from './pages/PitchDeck';
import AboutUs from './pages/AboutUs';
import Chatbot from './components/Chatbot';

import { BrandingProvider } from './BrandingContext';

export default function App() {
  return (
    <BrandingProvider>
      <Router>
        <div className="min-h-screen bg-black font-sans selection:bg-accent selection:text-black">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book" element={<Booking />} />
            <Route path="/pitch-deck" element={<PitchDeck />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
          <Footer />
          <Chatbot />
        </div>
      </Router>
    </BrandingProvider>
  );
}
