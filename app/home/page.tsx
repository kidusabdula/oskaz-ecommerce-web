import Hero from '@/components/Hero'
import InnovationSection from '@/components/Innovation-Section';
import React from 'react'

const HomePage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <InnovationSection/>
    </main>
  );
}

export default HomePage