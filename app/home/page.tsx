import Hero from '@/components/Hero'
import InnovationSection from '@/components/Innovation-Section';
import ProductsShowcase from '@/components/Products-Showcase';
import WhyChooseOskaz from '@/components/Why-Choose-Oskaz';
import React from 'react'

const HomePage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <InnovationSection/>
      <WhyChooseOskaz/>
      <ProductsShowcase/>
    </main>
  );
}

export default HomePage