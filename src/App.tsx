import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Booking from './pages/Booking';
import PitchDeck from './pages/PitchDeck';
import AboutUs from './pages/AboutUs';
import WorkWithUs from './pages/WorkWithUs';
import ResidentialHub from './pages/ResidentialHub';
import Login from './pages/Login';
import CRM from './pages/CRM';
import Chatbot from './components/Chatbot';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

import { BrandingProvider } from './BrandingContext';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrandingProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-black font-sans selection:bg-accent selection:text-black">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/book" element={<Booking />} />
              <Route path="/pitch-deck" element={<PitchDeck />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/work-with-us" element={<WorkWithUs />} />
              <Route path="/residential-hub" element={<ResidentialHub />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/crm" 
                element={
                  <ProtectedRoute>
                    <CRM />
                  </ProtectedRoute>
                } 
              />
            </Routes>
            <Footer />
            <Chatbot />
          </div>
        </Router>
      </BrandingProvider>
    </AuthProvider>
  );
}
