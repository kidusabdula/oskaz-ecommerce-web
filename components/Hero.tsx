"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const sectionRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    const timer = setTimeout(() => {
      setIsInView(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const categories = [
    { name: "Kiosk Systems", icon: "🖥️" },
    { name: "Power Solutions", icon: "⚡" },
    { name: "Digital Displays", icon: "📺" },
    { name: "Interactive Tools", icon: "🛠️" },
  ];

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 transition-colors duration-500",
        isDarkMode ? "bg-background" : "bg-gradient-to-br from-slate-50 to-blue-50/30"
      )}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={cn(
          "absolute -top-40 -right-40 h-80 w-80 rounded-full opacity-20 blur-3xl",
          isDarkMode ? "bg-primary" : "bg-blue-400"
        )}></div>
        <div className={cn(
          "absolute top-1/2 -left-40 h-96 w-96 rounded-full opacity-20 blur-3xl",
          isDarkMode ? "bg-purple-500" : "bg-purple-400"
        )}></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-5 dark:opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className={cn(
            "space-y-6 motion-fade-in",
            isInView && "animate-in"
          )}>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="px-3 py-1 text-xs font-medium rounded-full">
                <Sparkles className="w-3 h-3 mr-1 text-primary" />
                Premium Import Solutions
              </Badge>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-hero font-bold tracking-tight">
                Oskaz Import <span className="text-primary">®</span>
              </h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-muted-foreground">
                Empower Your Organization with Cutting Edge Imports and Reliable Solutions
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-lg">
              Discover our comprehensive range of import solutions designed to elevate your business operations and drive growth in today's competitive market.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button size="lg" className="group rounded-full px-6">
                Explore Products
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="group rounded-full px-6">
                Learn More
                <Play className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
              </Button>
            </div>
            
            <div className="pt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Product Categories</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center space-x-2 p-3 rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer stagger-item",
                      isInView && "animate-in",
                      isDarkMode 
                        ? "bg-card/50 border-border hover:bg-card/80 hover:border-primary/30" 
                        : "bg-white/70 border-gray-200/70 hover:bg-white hover:border-primary/20"
                    )}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Graphic - Updated with SVG */}
          <div className={cn(
            "relative flex justify-center lg:justify-end motion-scale-in",
            isInView && "animate-in"
          )}>
            <div className="relative w-full max-w-md">
              {/* Main graphic container */}
              <div className={cn(
                "relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-105",
                isDarkMode 
                  ? "bg-card/60 border border-border/50 backdrop-blur-sm" 
                  : "bg-white/80 border border-gray-200/50 backdrop-blur-sm"
              )}>
                {/* SVG Graphic */}
                <div className="aspect-square w-full flex items-center justify-center p-4">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src="/hero.svg"
                      alt="Import Solutions Illustration"
                      width={500}
                      height={400}
                      className="w-full h-auto object-contain"
                      priority
                    />
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-3 -right-3 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg animate-pulse">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                
                <div className="absolute -bottom-3 -left-3 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center shadow-lg animate-pulse">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              
              {/* Decorative background elements */}
              <div className="absolute top-8 -left-8 w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-xl -z-10"></div>
              <div className="absolute bottom-8 -right-8 w-40 h-40 rounded-full bg-gradient-to-br from-purple-500/10 to-transparent blur-xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;