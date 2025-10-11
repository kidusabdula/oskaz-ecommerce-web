import GetStarted from '@/components/home/Get-Started';
import Hero from '@/components/home/Hero'
import InnovationSection from '@/components/home/Innovation-Section';
import ProductsShowcase from '@/components/home/Products-Showcase';
import Testimonials from '@/components/home/Testimonials';
import TopPicks from '@/components/home/Top-Picks';
import WhyChooseOskaz from '@/components/home/Why-Choose-Oskaz';
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
      <GetStarted/>
    </main>
  );
}

export default HomePage