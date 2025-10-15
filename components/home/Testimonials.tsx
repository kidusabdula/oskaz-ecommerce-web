// components/testimonials.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Building, GraduationCap, Heart, Building2 } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const Testimonials = () => {
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const current = sectionRef.current;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  if (!mounted) return null;

  // Testimonials content removed in UI; keeping industries showcase only

  const industries = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      name: "Education Sector",
      description: "Powering digital transformation in educational institutions"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      name: "Healthcare",
      description: "Enhancing patient care with innovative technology solutions"
    },
    {
      icon: <Building className="h-6 w-6" />,
      name: "Corporate",
      description: "Streamlining business operations for maximum efficiency"
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      name: "Government",
      description: "Supporting public sector digital initiatives"
    }
  ];

  // rating visuals removed from this section per design; helper not used

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "relative py-20 md:py-5 overflow-hidden transition-colors duration-500",
        isDarkMode ? "bg-background" : "bg-gradient-to-br from-slate-50 to-blue-50/30"
      )}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className={cn(
          "absolute top-1/4 left-1/4 h-80 w-80 rounded-full opacity-20 blur-3xl",
          isDarkMode ? "bg-teal-500" : "bg-teal-400"
        )}></div>
        <div className={cn(
          "absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full opacity-20 blur-3xl",
          isDarkMode ? "bg-cyan-500" : "bg-cyan-400"
        )}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-5 dark:opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Testimonials section removed per request */}

        {/* CEO Message */}
        <div className={cn(
          "max-w-4xl mx-auto mb-20",
          isInView && "animate-fade-in"
        )}>
          <Card className={cn(
            "p-8 md:p-12 border shadow-xl",
            isDarkMode 
              ? "bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20" 
              : "bg-gradient-to-r from-primary/5 to-purple-500/5 border-primary/10"
          )}>
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-bold text-white">ኦ</span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <blockquote className="text-lg md:text-xl mb-6 italic">
                    &quot;At Oskaz Import, we&apos;re not just selling technology we&apos;re empowering businesses to transform their operations and achieve unprecedented efficiency.&quot;
                  </blockquote>
                  <div>
                    <h4 className="font-semibold text-lg">Mr. Hussen Yesuf</h4>
                    <p className="text-sm text-muted-foreground">CEO & Founder, Oskaz Import</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trusted By Section */}
        <div className={cn(
          "text-center",
          isInView && "animate-fade-in-up"
        )}>
          <h2 className="text-2xl md:text-3xl font-bold mb-12">
            Trusted by Leading Organizations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <Card 
                key={index}
                className={cn(
                  "p-6 border transition-all duration-300 hover:shadow-lg hover:scale-105",
                  isDarkMode 
                    ? "bg-card/50 border-border hover:bg-card/80 hover:border-primary/30" 
                    : "bg-white/70 border-gray-200/70 hover:bg-white hover:border-primary/20"
                )}
              >
                <CardContent className="p-0 text-center">
                  <div className="flex justify-center mb-4 text-primary">
                    {industry.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{industry.name}</h3>
                  <p className="text-sm text-muted-foreground">{industry.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;