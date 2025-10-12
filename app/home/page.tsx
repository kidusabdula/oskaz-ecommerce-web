import GetStarted from '@/components/home/Get-Started';
import Hero from '@/components/home/Hero'
import Hero2 from '@/components/home/Hero-2';
import Testimonials from '@/components/home/Testimonials';
import TopPicks from '@/components/home/Top-Picks';
import WhyChooseOskaz from '@/components/home/Why-Choose-Oskaz';
import React from 'react'

const HomePage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Hero2/>
      <WhyChooseOskaz/>
      <TopPicks/>
      <Testimonials/>
      <GetStarted/>
    </main>
  );
}

export default HomePage