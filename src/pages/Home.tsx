import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Solutions from '../components/Solutions';
import BrokerResources from '../components/BrokerResources';
import GetStarted from '../components/GetStarted';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Solutions />
      <BrokerResources />
      <GetStarted />
    </main>
  );
}
