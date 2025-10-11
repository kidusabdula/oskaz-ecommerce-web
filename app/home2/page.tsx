"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/utilities/language-provider";
import { useTranslations } from "@/lib/translations";

export default function Home() {
  const { language } = useLanguage();
  const t = useTranslations(language);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const topPicks = [
    {
      id: 1,
      name: "Smart Interactive Board",
      price: "$2,499",
      description: "75-inch 4K interactive display with touch capabilities"
    },
    {
      id: 2,
      name: "Digital Signage Display",
      price: "$1,299",
      description: "55-inch commercial-grade digital signage solution"
    },
    {
      id: 3,
      name: "UPS Power System",
      price: "$899",
      description: "Reliable backup power for critical equipment"
    }
  ];

  useEffect(() => {
    // Create intersection observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            entry.target.classList.remove('animate-out');
            
            // Add staggered animations for child elements
            const children = entry.target.querySelectorAll('.stagger-item');
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('animate-in');
                child.classList.remove('animate-out');
              }, index * 100);
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Observe all elements with scroll-animate class
    const elements = document.querySelectorAll('.scroll-animate, .motion-fade-in, .motion-slide-up, .motion-scale-in');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="min-h-fit bg-white dark:bg-black overflow-hidden">
      {/* Calming Learn Page Style Gradient - From Top - Dark Mode */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#17171a]/90 via-zinc-800/60 to-transparent z-10 pointer-events-none hidden dark:block"></div>
      
      {/* Calming Learn Page Style Gradient - From Top - Light Mode */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#444a57]/90 via-[#444a57]/60 to-transparent z-10 pointer-events-none block dark:hidden"></div>

      
      {/* Hero Section - Text Only */}
      <section className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:bg-gradient-to-b dark:from-black dark:via-black dark:to-black overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <motion.div 
          className="relative z-10 max-w-6xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 20 } }}
          >
            {t.mainPage.hero.title}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6, ease: "easeOut" }}
          >
            {t.mainPage.hero.subtitle}
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.9, ease: "easeOut" }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/products" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg group overflow-hidden relative block"
              >
                <span className="relative z-10">{t.mainPage.hero.primaryCta}</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ originX: 0 }}
                />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/about" 
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-2xl font-semibold text-lg block hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                {t.mainPage.hero.secondaryCta}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
        >
          <motion.div 
            className="w-6 h-10 border-2 border-gray-400 dark:border-white/60 rounded-full flex justify-center"
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
          >
            <motion.div 
              className="w-1 h-3 bg-gray-400 dark:bg-white/60 rounded-full mt-2"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Cinematic Video Section */}
      <section className="relative w-full py-12 px-4 md:px-8 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-8xl mx-auto">
          <div className="relative h-[70vh] overflow-hidden bg-black rounded-2xl shadow-2xl">
            {/* Background Video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0 scale-105 transition-transform duration-[20s] ease-linear hover:scale-110 rounded-2xl"
            >
              <source src="/oskaz-hero-background.mp4" type="video/mp4" />
            </video>
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50 z-10 rounded-2xl"></div>
            
            {/* Cinematic Overlay with Vignette Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 z-10 rounded-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-10 rounded-2xl"></div>
            
            {/* Content Overlay - Centered */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <motion.div 
                className="text-center px-4 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <motion.h2 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.0, delay: 0.3, ease: "easeOut" }}
                  whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                >
                  Innovation That Moves You
                </motion.h2>
                <motion.p 
                  className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed font-light max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.0, delay: 0.6, ease: "easeOut" }}
                >
                  Experience the future of technology with our cutting-edge solutions that adapt and evolve with your needs.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.0, delay: 0.9, ease: "easeOut" }}
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.05, 
                      y: -8,
                      transition: { type: "spring", stiffness: 400, damping: 25 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      href="/products" 
                      className="inline-block bg-white/90 backdrop-blur-sm text-gray-900 px-8 py-4 rounded-2xl font-semibold text-lg group overflow-hidden relative border border-white/20"
                    >
                      <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-500">Explore Our Technology</span>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        style={{ originX: 0 }}
                      />
                      <motion.span 
                        className="absolute inset-0 flex items-center justify-center text-white z-20"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        Explore Our Technology
                      </motion.span>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
            

          </div>
        </div>
      </section>

      {/* Video Background Section - Oskaz Quality */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 scale-105 transition-transform duration-[20s] ease-linear hover:scale-110"
        >
          <source src="/oskaz-background-video.mp4" type="video/mp4" />
        </video>
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 z-10"></div>
        
        {/* Content Overlay */}
        <div className="relative z-20 max-w-6xl mx-auto text-center px-4 py-16">
          <div className="space-y-12">
            {/* Main Header */}
            <div className="space-y-6 motion-slide-up animate-out opacity-0 translate-y-16 scale-95 transition-all duration-[2000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight transition-all duration-[1500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-105 transform hover:text-shadow-lg">
                Why Choose Oskaz®?
              </h2>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:text-white transform hover:scale-103 hover:tracking-wide">
                Custom Software Solutions Built for Your Business
              </h3>
            </div>
            
            {/* Description */}
            <div className="max-w-5xl mx-auto motion-fade-in animate-out opacity-0 translate-y-12 scale-98 transition-all duration-[2200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" style={{ animationDelay: '600ms' }}>
              <p className="text-lg md:text-xl lg:text-2xl text-white/85 leading-relaxed mb-8 font-light transition-all duration-[1300ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:text-white/98 transform hover:scale-102 hover:tracking-wide">
                Beyond hardware, Oskaz delivers <span className="text-white font-semibold">tailored software solutions</span> that transform how your business operates. Our development team creates custom applications, integrations, and digital platforms specifically designed for your industry, workflow, and growth objectives.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center space-y-4 p-6 rounded-2xl bg-[#4f4f4f]/80 backdrop-blur-sm border border-white/20 transition-all duration-700 hover:scale-110 hover:-translate-y-3 hover:bg-[#4f4f4f] hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400/50 group">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg transition-all duration-700 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-xl">
                    <span className="text-2xl filter group-hover:drop-shadow-lg">⚡</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white transition-all duration-500 group-hover:text-blue-300 group-hover:scale-105 group-hover:tracking-wide">Custom Development</h4>
                  <p className="text-white/80 text-sm transition-all duration-500 group-hover:text-white group-hover:scale-105">Bespoke software solutions tailored to your exact business requirements</p>
                </div>
                <div className="text-center space-y-4 p-6 rounded-2xl bg-[#4f4f4f]/80 backdrop-blur-sm border border-white/20 transition-all duration-700 hover:scale-110 hover:-translate-y-3 hover:bg-[#4f4f4f] hover:shadow-2xl hover:shadow-green-500/20 hover:border-green-400/50 group">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg transition-all duration-700 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-xl">
                    <span className="text-2xl filter group-hover:drop-shadow-lg">🔗</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white transition-all duration-500 group-hover:text-green-300 group-hover:scale-105 group-hover:tracking-wide">Seamless Integration</h4>
                  <p className="text-white/80 text-sm transition-all duration-500 group-hover:text-white group-hover:scale-105">Connect your existing systems with our smart technology ecosystem</p>
                </div>
                <div className="text-center space-y-4 p-6 rounded-2xl bg-[#4f4f4f]/80 backdrop-blur-sm border border-white/20 transition-all duration-700 hover:scale-110 hover:-translate-y-3 hover:bg-[#4f4f4f] hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-400/50 group">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg transition-all duration-700 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-xl">
                    <span className="text-2xl filter group-hover:drop-shadow-lg">📈</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white transition-all duration-500 group-hover:text-purple-300 group-hover:scale-105 group-hover:tracking-wide">Scalable Growth</h4>
                  <p className="text-white/80 text-sm transition-all duration-500 group-hover:text-white group-hover:scale-105">Software that evolves with your business, from startup to enterprise</p>
                </div>
              </div>
            </div>
            

          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-gradient-to-br dark:from-black dark:to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.3, ease: "easeOut" }}
              whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            >
              {t.mainPage.categories.title}
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.6, ease: "easeOut" }}
            >
              {t.mainPage.categories.subtitle}
            </motion.p>
          </motion.div>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {Object.entries(t.mainPage.categories.items).map(([key, category], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15, 
                  ease: "easeOut" 
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={`/${key}`}
                  className="group text-center p-6 rounded-2xl bg-[#4f4f4f] dark:bg-black shadow-lg border border-gray-300 dark:border-gray-700 hover:border-cyan-400 dark:hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 ease-out block transform hover:scale-105 hover:-translate-y-2"
                >
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-cyan-400/30"
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: 6,
                      transition: { type: "spring", stiffness: 400, damping: 25 }
                    }}
                  >
                    <div className="w-6 h-6 bg-white dark:bg-black rounded-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                  <h3 className="text-xl font-bold text-white dark:text-white mb-3 group-hover:text-cyan-300 dark:group-hover:text-cyan-400 transition-all duration-300 group-hover:scale-105">
                    {category.shortName}
                  </h3>
                  <p className="text-sm text-gray-200 dark:text-gray-300 leading-relaxed group-hover:text-white dark:group-hover:text-gray-100 transition-all duration-300 group-hover:scale-102">
                    {category.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Top Picks Section */}
      <section className="py-16 px-4 bg-white dark:bg-black scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 motion-slide-up animate-out opacity-0 translate-y-8 transition-all duration-800 ease-out">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.mainPage.topPicks.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t.mainPage.topPicks.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mt-12 motion-fade-in animate-out opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <div className="relative transform transition-all duration-700 hover:scale-105 hover:-rotate-2">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-3xl aspect-square flex items-center justify-center shadow-2xl group hover:shadow-3xl transition-all duration-500">
                <div className="text-blue-700 dark:text-blue-300 text-center transition-all duration-500 group-hover:scale-110">
                  <div className="w-40 h-40 bg-blue-200 dark:bg-blue-700 rounded-2xl mx-auto mb-4 shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 flex items-center justify-center">
                    <div className="w-20 h-12 bg-[#4f4f4f] dark:bg-black rounded opacity-90 flex items-center justify-center">
                      <div className="w-12 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-sm"></div>
                    </div>
                  </div>
                  <p className="text-lg font-medium transition-all duration-300 group-hover:text-blue-800 dark:group-hover:text-blue-200">{t.mainPage.topPicks.productName}</p>
                </div>
              </div>
            </div>
            <div className="space-y-6 transform transition-all duration-700 hover:translate-x-2">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white transition-all duration-500 hover:scale-105 hover:text-blue-600 dark:hover:text-blue-400">
                {t.mainPage.topPicks.description}
              </h3>
              <h4 className="text-2xl font-light text-gray-700 dark:text-gray-300 transition-all duration-300 hover:text-gray-900 dark:hover:text-white">
                {t.mainPage.topPicks.price}
              </h4>
              <Link 
                href="/products/smart-boards"
                className="inline-block bg-[#4f4f4f] text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-500 ease-out hover:bg-[#5a5a5a] hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-1 group overflow-hidden relative border border-gray-500 hover:border-purple-400"
              >
                <span className="relative z-10 group-hover:text-purple-200 transition-colors duration-300">{t.mainPage.topPicks.cta}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Power Solutions Section */}
      <section className="py-16 px-4 bg-white dark:bg-black scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 transform transition-all duration-700 hover:translate-x-2">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white transition-all duration-500 hover:scale-105 hover:text-amber-600 dark:hover:text-amber-400">
                {t.mainPage.powerSolutions.title}
              </h2>
              <h3 className="text-2xl font-light text-gray-700 dark:text-gray-300 transition-all duration-300 hover:text-gray-900 dark:hover:text-white">
                {t.mainPage.powerSolutions.subtitle}
              </h3>
              <Link 
                href="/products/power-solutions"
                className="inline-block bg-[#4f4f4f] text-white px-6 py-3 rounded-lg font-medium text-base transition-all duration-500 ease-out hover:bg-[#5a5a5a] hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-1 group overflow-hidden relative border border-gray-500 hover:border-orange-400"
              >
                <span className="relative z-10 group-hover:text-orange-200 transition-colors duration-300">{t.mainPage.powerSolutions.cta}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left"></div>
              </Link>
            </div>
            <div className="relative transform transition-all duration-700 hover:scale-105 hover:rotate-2">
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 rounded-3xl aspect-square flex items-center justify-center shadow-2xl group hover:shadow-3xl transition-all duration-500">
                <div className="text-amber-700 dark:text-amber-300 text-center transition-all duration-500 group-hover:scale-110">
                  <div className="w-40 h-40 bg-amber-200 dark:bg-amber-700 rounded-2xl mx-auto mb-4 shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 flex items-center justify-center">
                    <div className="w-20 h-16 bg-[#4f4f4f] dark:bg-black rounded opacity-90 flex items-center justify-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-sm"></div>
                    </div>
                  </div>
                  <p className="text-lg font-medium transition-all duration-300 group-hover:text-amber-800 dark:group-hover:text-amber-200">{t.mainPage.powerSolutions.productName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracking Card Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-black scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative transform transition-all duration-700 hover:scale-105 hover:-rotate-2">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-3xl aspect-square flex items-center justify-center shadow-2xl group hover:shadow-3xl transition-all duration-500">
                <div className="text-purple-700 dark:text-purple-300 text-center transition-all duration-500 group-hover:scale-110">
                  <div className="w-40 h-40 bg-purple-200 dark:bg-purple-700 rounded-2xl mx-auto mb-4 shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"></div>
                  <p className="text-base font-medium transition-all duration-300 group-hover:text-purple-800 dark:group-hover:text-purple-200">Tracking Card</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 transform transition-all duration-700 hover:translate-x-2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-all duration-500 hover:scale-105 hover:text-purple-600 dark:hover:text-purple-400">
                {t.mainPage.tracking.title}
              </h2>
              <h3 className="text-xl font-light text-gray-700 dark:text-gray-300 transition-all duration-300 hover:text-gray-900 dark:hover:text-white">
                {t.mainPage.tracking.subtitle}
              </h3>
              <Link 
                href="/products/tracking-card"
                className="inline-block bg-[#4f4f4f] dark:bg-[#4f4f4f] text-white dark:text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-500 ease-out hover:bg-[#5a5a5a] dark:hover:bg-[#5a5a5a] hover:scale-110 hover:shadow-2xl hover:shadow-pink-500/30 hover:-translate-y-1 group overflow-hidden relative border border-gray-500 hover:border-pink-400"
              >
                <span className="relative z-10 group-hover:text-pink-200 transition-colors duration-300">{t.mainPage.tracking.cta}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.3, ease: "easeOut" }}
              whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            >
              {t.mainPage.whyChooseUs.title}
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.6, ease: "easeOut" }}
            >
              {t.mainPage.whyChooseUs.subtitle}
            </motion.p>
          </motion.div>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {t.mainPage.whyChooseUs.features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2, 
                  ease: "easeOut" 
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 6,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                >
                  <div className="w-4 h-4 bg-[#4f4f4f] dark:bg-black rounded-lg opacity-80"></div>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-white dark:bg-black scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 motion-slide-up animate-out opacity-0 translate-y-8 transition-all duration-800 ease-out">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 stagger-item animate-out opacity-0 translate-y-4 transition-all duration-800 ease-out">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto stagger-item animate-out opacity-0 translate-y-4 transition-all duration-800 ease-out">
              Trusted by organizations worldwide for reliable technology solutions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 motion-scale-in animate-out opacity-0 scale-95 transition-all duration-1000 ease-out">
            {[
              {
                name: "Sarah Johnson",
                role: "IT Director, Education District",
                content: "The smart boards have transformed our classrooms. Students are more engaged than ever."
              },
              {
                name: "Michael Chen",
                role: "Facilities Manager, Hospital",
                content: "Reliable power solutions that keep our critical systems running 24/7."
              },
              {
                name: "David Rodriguez",
                role: "Operations Manager, Corporate",
                content: "Outstanding digital signage that delivers our message with crystal clarity."
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#4f4f4f] dark:bg-zinc-900 p-6 rounded-xl shadow-lg border border-gray-300/20 dark:border-gray-700/20 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400/50 transform hover:scale-110 hover:-translate-y-3 hover:rotate-1 hover:bg-[#5a5a5a] group stagger-item animate-out opacity-0 translate-y-4 transition-all duration-800 ease-out"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4 shadow-lg group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-xl transition-all duration-500">
                    <span className="text-white font-bold filter group-hover:drop-shadow-lg">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white transition-all duration-300 group-hover:text-blue-300 group-hover:scale-105">{testimonial.name}</h4>
                    <p className="text-sm text-gray-300 transition-all duration-300 group-hover:text-blue-200">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-200 italic transition-all duration-300 group-hover:text-white group-hover:scale-105">"{testimonial.content}"</p>
                <div className="flex mt-4 transition-all duration-300 group-hover:scale-110">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm transition-all duration-300 group-hover:text-yellow-300 group-hover:drop-shadow-lg">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Quote Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-black scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-4xl mx-auto text-center">
          <div className="transform hover:scale-105 motion-fade-in animate-out opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <blockquote className="text-lg md:text-xl font-light text-gray-800 dark:text-gray-200 mb-4 leading-relaxed hover:text-gray-900 dark:hover:text-white stagger-item animate-out opacity-0 translate-y-4 transition-all duration-800 ease-out">
              "{t.mainPage.ceoQuote.quote}"
            </blockquote>
            <div className="flex items-center justify-center space-x-3 hover:scale-110 stagger-item animate-out opacity-0 translate-y-4 transition-all duration-800 ease-out">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-base">O</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-white text-sm transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400">{t.mainPage.ceoQuote.author}</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs transition-all duration-300 hover:text-gray-800 dark:hover:text-gray-200">{t.mainPage.ceoQuote.title}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Commitment Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-black dark:to-black scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 transform transition-all duration-700 hover:translate-x-2">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white transition-all duration-500 hover:scale-105 hover:text-blue-600 dark:hover:text-blue-400">
                {t.mainPage.qualityCommitment.title}
              </h2>
              <h3 className="text-lg font-light text-gray-700 dark:text-gray-300 transition-all duration-300 hover:text-gray-900 dark:hover:text-white">
                {t.mainPage.qualityCommitment.subtitle}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed transition-all duration-300 hover:text-gray-800 dark:hover:text-gray-200">
                {t.mainPage.qualityCommitment.description}
              </p>
            </div>
            <div className="relative transform transition-all duration-700 hover:scale-105 hover:rotate-2">
              <div className="bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-blue-800 dark:to-indigo-700 rounded-3xl aspect-square flex items-center justify-center shadow-2xl group hover:shadow-3xl transition-all duration-500">
                <div className="text-blue-800 dark:text-blue-200 text-center transition-all duration-500 group-hover:scale-110">
                  <div className="w-32 h-32 bg-blue-300 dark:bg-blue-700 rounded-2xl mx-auto mb-3 shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-[#4f4f4f] rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-base font-medium transition-all duration-300 group-hover:text-blue-900 dark:group-hover:text-blue-100">Certified Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Client Success Stories */}
      <section className="py-10 px-4 bg-gray-50 dark:bg-black scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900 dark:text-white mb-6 transform transition-all duration-500 hover:scale-105">
            {t.mainPage.clientStories.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: t.mainPage.clientStories.education, icon: '🎓' },
              { name: t.mainPage.clientStories.healthcare, icon: '🏥' },
              { name: t.mainPage.clientStories.corporate, icon: '🏢' },
              { name: t.mainPage.clientStories.government, icon: '🏛️' }
            ].map((client, index) => (
              <div 
                key={client.name} 
                className="bg-[#4f4f4f] dark:bg-black rounded-2xl p-3 text-center shadow-lg transition-all duration-500 ease-out hover:shadow-2xl hover:scale-110 hover:-translate-y-2 group transform"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-2xl mb-2 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                  {client.icon}
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white transition-all duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-105">{client.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-10 px-4 bg-white dark:bg-black scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-4xl mx-auto text-center transform transition-all duration-700 hover:scale-105">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-all duration-500 hover:text-blue-600 dark:hover:text-blue-400">
            {t.mainPage.footerCta.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 transition-all duration-300 hover:text-gray-800 dark:hover:text-gray-200">
            {t.mainPage.footerCta.description}
          </p>
          <Link 
            href="/contact"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-500 ease-out hover:from-blue-700 hover:to-indigo-700 hover:scale-110 hover:shadow-2xl hover:-translate-y-1"
          >
            {t.mainPage.footerCta.cta}
          </Link>
        </div>
      </section>
    </div>
  );
}
