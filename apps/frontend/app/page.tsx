"use client";
import Header from '@/components/ui/Header';
import Hero from '@/components/ui/Hero';
import Features from '@/components/ui/Features';
import HowItWorks from  '@/components/ui/HowItWorks';
import Pricing from '@/components/ui/Pricing';
import Testimonials from '@/components/ui/Testimonials';
import Footer from '@/components/ui/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <Footer />
    </div>
  );
}