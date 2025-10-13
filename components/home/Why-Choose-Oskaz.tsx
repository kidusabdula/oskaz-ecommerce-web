"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code, Link, TrendingUp, CheckCircle, Star, Users } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const WhyChooseOskaz = () => {
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setIsInView(true);


    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  if (!mounted) return null;

  const features = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Custom Development",
      description: "Bespoke software solutions tailored to your exact business requirements",
      emoji: "⚡"
    },
    {
      icon: <Link className="h-6 w-6" />,
      title: "Seamless Integration",
      description: "Connect your existing systems with our smart technology ecosystem",
      emoji: "🔗"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Scalable Growth",
      description: "Software that evolves with your business, from startup to enterprise",
      emoji: "📈"
    }
  ];

  const benefits = [
    {
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
      text: "Industry-specific solutions"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
      text: "Dedicated support team"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
      text: "Continuous updates and improvements"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
      text: "Data security and compliance"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      content: "Oskaz transformed our business operations with their custom software solutions. The integration was seamless and the results exceeded our expectations.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "CTO, Global Logistics",
      content: "The scalability of Oskaz's solutions has been instrumental in our growth. From a small startup to an enterprise, their software evolved with us.",
      rating: 5
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "relative py-20 md:py-32 overflow-hidden transition-colors duration-500",
        isDarkMode ? "bg-background" : "bg-gradient-to-br from-slate-50 to-blue-50/30"
      )}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className={cn(
          "absolute top-1/4 -right-40 h-80 w-80 rounded-full opacity-20 blur-3xl",
          isDarkMode ? "bg-blue-500" : "bg-blue-400"
        )}></div>
        <div className={cn(
          "absolute bottom-1/4 -left-40 h-96 w-96 rounded-full opacity-20 blur-3xl",
          isDarkMode ? "bg-purple-500" : "bg-purple-400"
        )}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-5 dark:opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-16",
          isInView && "animate-fade-in"
        )}>
          <Badge variant="outline" className="px-3 py-1 text-xs font-medium rounded-full mb-4">
            <Star className="w-3 h-3 mr-1 text-primary" />
            Why Choose Oskaz
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Why Choose Oskaz<span className="text-primary">®</span>?
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-6">
            Custom Software Solutions Built for Your Business
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Beyond hardware, Oskaz delivers tailored software solutions that transform how your business operates. Our development team creates custom applications, integrations, and digital platforms specifically designed for your industry, workflow, and growth objectives.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
<Card 
  key={index}
  className={cn(
    "p-6 border transition-all duration-500 hover:shadow-lg hover:scale-105",
    isInView && "animate-fade-in-up",
    isDarkMode 
      ? "bg-card/50 border-border hover:bg-card/80 hover:border-primary/30" 
      : "bg-white/70 border-gray-200/70 hover:bg-white hover:border-primary/20"
  )}
  style={{ 
    animationDelay: isInView ? `${index * 150}ms` : '0ms'
  }}>              <CardContent className="p-0">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="text-4xl mb-2">{feature.emoji}</div>
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16",
          isInView && "animate-fade-in"
        )}>
          <div>
            <h3 className="text-2xl font-bold mb-6">Why Our Clients Choose Us</h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 transition-all duration-500"
                //   style={{ 
                //     transitionDelay: isInView ? `${index * 100}ms` : '0ms',
                //     opacity: isInView ? 1 : 0,
                //     transform: isInView ? 'translateX(0)' : 'translateX(-20px)'
                //   }}
                >
                  {benefit.icon}
                  <span className="text-lg">{benefit.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button size="lg" className="group rounded-full px-6">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className={cn(
                  "p-6 border transition-all duration-500",
                  isDarkMode 
                    ? "bg-card/50 border-border" 
                    : "bg-white/70 border-gray-200/70"
                )}
                // style={{ 
                //   transitionDelay: isInView ? `${(index + 3) * 150}ms` : '0ms',
                //   opacity: isInView ? 1 : 0,
                //   transform: isInView ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'
                // }}
              >
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-3 italic">&quot;{testimonial.content}&quot;</p>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseOskaz;