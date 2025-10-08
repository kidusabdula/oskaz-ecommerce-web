import Hero from '@/components/Hero'
import InnovationSection from '@/components/Innovation-Section';
import ProductsShowcase from '@/components/Products-Showcase';
import Testimonials from '@/components/Testimonials';
import TopPicks from '@/components/Top-Picks';
import WhyChooseOskaz from '@/components/Why-Choose-Oskaz';
import React from 'react'

const HomePage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <InnovationSection/>
      <WhyChooseOskaz/>
      <ProductsShowcase/>
      <TopPicks/>
      <Testimonials/>
    </main>
  );
}

export default HomePage