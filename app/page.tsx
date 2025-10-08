"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { useTranslations } from "@/lib/translations";

export default function Home() {
  const { language } = useLanguage();
  const t = useTranslations(language);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

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
      <div className="absolute top-0 left-0 right-0 h-[20rem] bg-gradient-to-b from-[#17171a]/90 via-zinc-800/60 to-transparent z-10 pointer-events-none hidden dark:block"></div>
      
      {/* Calming Learn Page Style Gradient - From Top - Light Mode */}
      <div className="absolute top-0 left-0 right-0 h-[20rem] bg-gradient-to-b from-[#444a57]/90 via-[#444a57]/60 to-transparent z-10 pointer-events-none block dark:hidden"></div>

      
      {/* Hero Section - Video Background with Text Overlay */}
      <section className="relative w-full pt-8 pb-12 px-4 md:px-8 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <div className="max-w-8xl mx-auto">
          <div className="relative h-[75vh] overflow-hidden bg-gray-100 dark:bg-black rounded-2xl shadow-2xl">
            {/* Background Video */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0 rounded-2xl"
              style={{
                clipPath: isHeaderHovered 
                  ? 'circle(70% at 50% 50%)' 
                  : 'circle(0% at 50% 50%)',
                transition: 'clip-path 1200ms ease-in-out'
              }}
            >
              <source src="/oskaz-hero-background.mp4" type="video/mp4" />
            </video>
            
            {/* Dark Overlay for better text readability */}
            <div 
              className="absolute inset-0 bg-black/20 z-10 rounded-2xl"
              style={{
                clipPath: isHeaderHovered 
                  ? 'circle(70% at 50% 50%)' 
                  : 'circle(0% at 50% 50%)',
                transition: 'clip-path 1200ms ease-in-out'
              }}
            ></div>
            
            {/* Cinematic Overlay with Vignette Effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 z-10 rounded-2xl"
              style={{
                clipPath: isHeaderHovered 
                  ? 'circle(70% at 50% 50%)' 
                  : 'circle(0% at 50% 50%)',
                transition: 'clip-path 1200ms ease-in-out'
              }}
            ></div>
            <div 
              className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/5 z-10 rounded-2xl"
              style={{
                clipPath: isHeaderHovered 
                  ? 'circle(70% at 50% 50%)' 
                  : 'circle(0% at 50% 50%)',
                transition: 'clip-path 1200ms ease-in-out'
              }}
            ></div>
            
            {/* Tunnel Vision Effect - Left Side Curved Overlay */}
            <div 
              className="absolute inset-0 z-15 rounded-2xl"
              style={{
                clipPath: isHeaderHovered 
                  ? 'circle(70% at 50% 50%)' 
                  : 'circle(0% at 50% 50%)',
                transition: 'clip-path 1200ms ease-in-out'
              }}
            >
              <div 
                className="absolute left-0 top-0 w-1/2 h-full"
                style={{
                  background: `radial-gradient(ellipse 200% 150% at -30% 50%, 
                    rgba(0,0,0,0.3) 0%, 
                    rgba(0,0,0,0.2) 20%, 
                    rgba(0,0,0,0.1) 35%, 
                    rgba(0,0,0,0.05) 50%, 
                    rgba(0,0,0,0.02) 65%, 
                    rgba(0,0,0,0.01) 80%, 
                    transparent 90%)`
                }}
              ></div>
            </div>
            
            {/* Tunnel Vision Effect - Right Side Curved Overlay */}
            <div 
              className="absolute inset-0 z-15 rounded-2xl"
              style={{
                clipPath: isHeaderHovered 
                  ? 'circle(70% at 50% 50%)' 
                  : 'circle(0% at 50% 50%)',
                transition: 'clip-path 1200ms ease-in-out'
              }}
            >
              <div 
                className="absolute right-0 top-0 w-1/2 h-full"
                style={{
                  background: `radial-gradient(ellipse 200% 150% at 130% 50%, 
                    rgba(0,0,0,0.3) 0%, 
                    rgba(0,0,0,0.2) 20%, 
                    rgba(0,0,0,0.1) 35%, 
                    rgba(0,0,0,0.05) 50%, 
                    rgba(0,0,0,0.02) 65%, 
                    rgba(0,0,0,0.01) 80%, 
                    transparent 90%)`
                }}
              ></div>
            </div>
            
            {/* Content Overlay - Positioned Lower */}
            <div className="absolute inset-0 flex items-center justify-center z-20" style={{ paddingTop: '8vh' }}>
        <motion.div 
          className="relative z-20 max-w-6xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          onMouseEnter={() => {
            setIsHeaderHovered(true);
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              videoRef.current.play();
            }
          }}
          onMouseLeave={() => setIsHeaderHovered(false)}
        >
          <motion.h1 
            className={`text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight transition-colors duration-500 ease-in-out ${
              isHeaderHovered ? 'text-white drop-shadow-2xl' : 'text-black dark:text-white drop-shadow-2xl'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 20 } }}
          >
            {t.mainPage.hero.title}
          </motion.h1>
          <motion.p 
            className={`text-xl md:text-2xl lg:text-3xl mb-8 max-w-4xl mx-auto leading-relaxed font-light transition-colors duration-500 ease-in-out ${
              isHeaderHovered ? 'text-white/90 drop-shadow-lg' : 'text-black/90 dark:text-white/90 drop-shadow-lg'
            }`}
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
                href="/home" 
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
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
            >
              <motion.div 
                className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
              >
                <motion.div 
                  className="w-1 h-3 bg-white/60 rounded-full mt-2"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>
            </div>
          </div>
        </div>
      </section>



      {/* Background Section - Oskaz Quality */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out bg-black dark:bg-black"
        style={{
          background: `linear-gradient(180deg, 
            #ffffff 0%, 
            #f8f9fa 15%, 
            #e9ecef 25%, 
            #dee2e6 35%, 
            #ced4da 45%, 
            #adb5bd 55%, 
            #7d818a 65%, 
            #6c757d 75%, 
            #5a5f66 85%, 
            #4f4f4f 92%, 
            #4e4e4e 100%)`
        }}
      >
        {/* Dark mode overlay */}
        <div className="absolute inset-0 bg-black opacity-0 dark:opacity-100 transition-opacity duration-300"></div>
        
        {/* Content Overlay */}
        <div className="relative z-10 max-w-6xl mx-auto text-center px-4 py-16">
          <div className="space-y-12">
            {/* Main Header */}
            <div className="space-y-6 motion-slide-up animate-out opacity-0 translate-y-16 scale-95 transition-all duration-[2000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-800 dark:text-white mb-6 leading-tight tracking-tight transition-all duration-[1500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-105 transform hover:text-shadow-lg">
                Why Choose Oskaz®?
              </h2>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-700 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:text-gray-800 dark:hover:text-gray-100 transform hover:scale-103 hover:tracking-wide">
                Custom Software Solutions Built for Your Business
              </h3>
            </div>
            
            {/* Description */}
            <div className="max-w-5xl mx-auto motion-fade-in animate-out opacity-0 translate-y-12 scale-98 transition-all duration-[2200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" style={{ animationDelay: '600ms' }}>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 font-light transition-all duration-[1300ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:text-gray-700 dark:hover:text-gray-200 transform hover:scale-102 hover:tracking-wide">
                Beyond hardware, Oskaz delivers <span className="text-gray-800 dark:text-white font-semibold">tailored software solutions</span> that transform how your business operates. Our development team creates custom applications, integrations, and digital platforms specifically designed for your industry, workflow, and growth objectives.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center space-y-4 p-6 rounded-2xl bg-white/20 dark:bg-gray-800/40 backdrop-blur-sm border border-gray-300/30 dark:border-gray-600/30 transition-all duration-700 hover:scale-110 hover:-translate-y-3 hover:bg-white/30 dark:hover:bg-gray-700/50 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400/50 group">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg transition-all duration-700 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-xl">
                    <span className="text-2xl filter group-hover:drop-shadow-lg">⚡</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white transition-all duration-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-105 group-hover:tracking-wide">Custom Development</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm transition-all duration-500 group-hover:text-gray-800 dark:group-hover:text-gray-200 group-hover:scale-105">Bespoke software solutions tailored to your exact business requirements</p>
                </div>
                <div className="text-center space-y-4 p-6 rounded-2xl bg-white/20 dark:bg-gray-800/40 backdrop-blur-sm border border-gray-300/30 dark:border-gray-600/30 transition-all duration-700 hover:scale-110 hover:-translate-y-3 hover:bg-white/30 dark:hover:bg-gray-700/50 hover:shadow-2xl hover:shadow-green-500/20 hover:border-green-400/50 group">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg transition-all duration-700 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-xl">
                    <span className="text-2xl filter group-hover:drop-shadow-lg">🔗</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white transition-all duration-500 group-hover:text-green-600 dark:group-hover:text-green-400 group-hover:scale-105 group-hover:tracking-wide">Seamless Integration</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm transition-all duration-500 group-hover:text-gray-800 dark:group-hover:text-gray-200 group-hover:scale-105">Connect your existing systems with our smart technology ecosystem</p>
                </div>
                <div className="text-center space-y-4 p-6 rounded-2xl bg-white/20 dark:bg-gray-800/40 backdrop-blur-sm border border-gray-300/30 dark:border-gray-600/30 transition-all duration-700 hover:scale-110 hover:-translate-y-3 hover:bg-white/30 dark:hover:bg-gray-700/50 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-400/50 group">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg transition-all duration-700 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-xl">
                    <span className="text-2xl filter group-hover:drop-shadow-lg">📈</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white transition-all duration-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:scale-105 group-hover:tracking-wide">Scalable Growth</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm transition-all duration-500 group-hover:text-gray-800 dark:group-hover:text-gray-200 group-hover:scale-105">Software that evolves with your business, from startup to enterprise</p>
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
                  className="group text-center p-6 rounded-2xl bg-[#858b91] dark:bg-black shadow-lg border border-gray-300 dark:border-gray-700 hover:border-cyan-400 dark:hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 ease-out block transform hover:scale-105 hover:-translate-y-2"
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






    </div>
  );
}
