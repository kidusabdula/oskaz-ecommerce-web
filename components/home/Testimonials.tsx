// components/testimonials.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight, Building, GraduationCap, Heart, Building2 } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const Testimonials = () => {
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (!mounted) return null;

  const testimonials = [
    {
      id: 1,
      name: "Mr Biruk G/Tsadik",
      role: "Director at Mizan Tepi University",
      content: "Oskaz Import delivered our Smart Board on time and in perfect condition. Their professional service and excellent communication made the process seamless. The quality of the board has greatly enhanced our classroom experience. We highly recommend Oskaz Import for their reliability and commitment to customer satisfaction!",
      rating: 5,
      avatar: "BG"
    },
    {
      id: 2,
      name: "Mr. Dereje Derara",
      role: "Director at ECDSWC",
      content: "Oskaz Import provided exceptional service with the delivery, installation, and after-sales support for our 100KVA Upsen UPS. Their team was professional and responsive, ensuring everything ran smoothly. We highly recommend Oskaz Import for their reliability and commitment to customer satisfaction!",
      rating: 5,
      avatar: "DD"
    },
    {
      id: 3,
      name: "Dr. Feleke Z",
      role: "GM at African Centre of Excellence",
      content: "Oskaz Import delivered our Smart Digital Signage on time and in perfect condition. Their team's professionalism and support made installation a breeze. The signage has transformed our communication efforts. We highly recommend Oskaz Import for their outstanding service and dedication to customer satisfaction!",
      rating: 5,
      avatar: "FZ"
    },
    {
      id: 4,
      name: "Eng. Negeda Kebede",
      role: "CEO at ECW",
      content: "Oskaz Import delivered our Smart TV Wall on time and in perfect condition. Their team's professionalism and efficient installation exceeded our expectations. The display has greatly enhanced our visual presentations. We highly recommend Oskaz Import for their exceptional service and commitment to customer satisfaction!",
      rating: 5,
      avatar: "NK"
    },
    {
      id: 5,
      name: "Mrs Inas Oumer",
      role: "Manager at Dada Mall",
      content: "Oskaz Import delivered our Smart Kiosk promptly and in excellent condition. Their professional service and seamless installation made all the difference. The kiosk has enhanced our customer engagement significantly. We highly recommend Oskaz Import for their reliability and commitment to outstanding service!",
      rating: 5,
      avatar: "IO"
    },
    {
      id: 6,
      name: "Dr. Muluken Adamasu",
      role: "GM at Adama Textile",
      content: "Oskaz Import delivered our Smart Podium promptly and in excellent condition. Their professional service and clear communication made the entire process smooth. The podium has significantly improved our presentations. We highly recommend Oskaz Import for their reliability and dedication to customer satisfaction!",
      rating: 5,
      avatar: "MA"
    }
  ];

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < Math.floor(rating) 
            ? "fill-yellow-400 text-yellow-400" 
            : "text-gray-300 dark:text-gray-600"
        )}
      />
    ));
  };

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
        {/* Section Header */}
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-16",
          isInView && "animate-fade-in"
        )}>
          <Badge variant="outline" className="px-3 py-1 text-xs font-medium rounded-full mb-4">
            <Quote className="w-3 h-3 mr-1 text-primary" />
            Testimonials
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            What Our Clients Say
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Don&apos;t just take our word for it. Hear from our satisfied clients who have transformed their businesses with Oskaz solutions.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className={cn(
          "max-w-4xl mx-auto mb-20",
          isInView && "animate-fade-in-up"
        )}>
          <Card className={cn(
            "p-8 md:p-12 border shadow-xl",
            isDarkMode 
              ? "bg-card/50 border-border" 
              : "bg-white/70 border-gray-200/70"
          )}>
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Testimonial Content */}
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    {renderStars(testimonials[currentTestimonial].rating)}
                  </div>
                  <blockquote className="text-lg md:text-xl text-muted-foreground mb-6 italic">
                    &quot;{testimonials[currentTestimonial].content}&quot;
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <span className="text-primary font-semibold">
                        {testimonials[currentTestimonial].avatar}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonials[currentTestimonial].name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].role}</p>
                    </div>
                  </div>
                </div>
                
                {/* Navigation Controls */}
                <div className="flex items-center justify-center md:justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevTestimonial}
                    className="rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex space-x-1">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all",
                          index === currentTestimonial
                            ? "bg-primary w-8"
                            : "bg-muted-foreground/30"
                        )}
                      />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextTestimonial}
                    className="rounded-full"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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
                    &quot;At Oskaz Import, we&apos;re not just selling technology – we&apos;re empowering businesses to transform their operations and achieve unprecedented efficiency.&quot;
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