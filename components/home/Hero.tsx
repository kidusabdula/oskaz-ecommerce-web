"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Play, Sparkles, Shield, Zap, Globe, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [particles, setParticles] = useState<{ width: number; height: number; top: number; left: number; delay: number; duration: number }[]>([]);
  const [orbs, setOrbs] = useState<{ top: string; left: string; height: string; width: string; colorClass: string }[]>([]);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const sectionRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    // Generate random floating particles
    const newParticles = [...Array(20)].map(() => ({
      width: Math.random() * 20 + 5,
      height: Math.random() * 20 + 5,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10
    }));
    setParticles(newParticles);

    // Generate gradient orbs positions
    const newOrbs = [
      {
        top: "-40px",
        left: "auto",
        height: "20rem",
        width: "20rem",
        colorClass: isDarkMode ? "bg-primary" : "bg-blue-400"
      },
      {
        top: "auto",
        left: "-40px",
        height: "24rem",
        width: "24rem",
        colorClass: isDarkMode ? "bg-purple-500" : "bg-purple-400"
      }
    ];
    setOrbs(newOrbs);

    const timer = setTimeout(() => setIsInView(true), 100);
    return () => clearTimeout(timer);
  }, [isDarkMode]);

  if (!mounted) return null; // Prevent SSR/client mismatch

  const handleClickViewProducts = () => router.push("/products");
  const handleClickAbout = () => router.push("/about");

  const features = [
    { icon: Shield, text: "Trusted Quality", color: "text-blue-500" },
    { icon: Zap, text: "Fast Delivery", color: "text-amber-500" },
    { icon: Globe, text: "Global Sourcing", color: "text-emerald-500" },
    { icon: TrendingUp, text: "Growth Focused", color: "text-purple-500" },
  ];

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32 transition-colors duration-500",
        isDarkMode ? "bg-background" : "bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30"
      )}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        <div className="absolute inset-0 opacity-30">
          {particles.map((p, i) => (
            <div
              key={i}
              className={cn("absolute rounded-full animate-float", isDarkMode ? "bg-primary/20" : "bg-primary/10")}
              style={{
                width: `${p.width}px`,
                height: `${p.height}px`,
                top: `${p.top}%`,
                left: `${p.left}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Gradient Orbs */}
        {orbs.map((orb, index) => (
          <div
            key={index}
            className={cn(
              "absolute rounded-full opacity-30 blur-3xl animate-pulse",
              orb.colorClass
            )}
            style={{
              top: orb.top,
              left: orb.left,
              height: orb.height,
              width: orb.width,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className={cn("flex justify-center mb-8 motion-fade-in", isInView && "animate-in")}>
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium rounded-full border backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2 text-primary animate-pulse" />
              Premium Import Solutions Since 2015
              <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            </Badge>
          </div>

          {/* Main Heading */}
          <div className={cn("space-y-6 mb-8 motion-fade-in", isInView && "animate-in")}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
              Oskaz
              <span
                className={cn(
                  "bg-gradient-to-r bg-clip-text text-transparent",
                  isDarkMode ? "from-primary to-purple-400" : "from-blue-600 to-purple-600"
                )}
              >
                Import
              </span>
              <sup className="text-2xl md:text-3xl text-primary ml-2">®</sup>
            </h1>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Transform Your Business with{" "}
                <span className={cn("decoration-2 underline-offset-4", isDarkMode ? "decoration-primary" : "decoration-blue-400")}>
                  Premium Imports
                </span>
              </h2>

              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Cutting-edge technology solutions and reliable imports designed to{" "}
                <span className="font-semibold text-foreground"> elevate your operations</span> and drive sustainable growth in today&apos;s dynamic market.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto stagger-children", isInView && "animate-in")}>
            {features.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col items-center p-4 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer",
                  isDarkMode ? "bg-card/50 border-border hover:bg-card/80 hover:border-primary/30" : "bg-white/70 border-gray-200/70 hover:bg-white hover:border-primary/20 backdrop-blur-sm"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-transform hover:scale-110", isDarkMode ? "bg-primary/10" : "bg-blue-50")}>
                  <feature.icon className={cn("w-6 h-6", feature.color)} />
                </div>
                <span className="text-sm font-medium text-center">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className={cn("flex flex-col sm:flex-row gap-4 justify-center mb-16 motion-fade-in", isInView && "animate-in")}>
            <Button
              size="lg"
              className="group rounded-2xl px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={handleClickViewProducts}
            >
              Explore Our Products
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group rounded-2xl px-8 py-6 text-lg font-semibold border-2 backdrop-blur-sm hover:scale-105 transition-all duration-300"
              onClick={handleClickAbout}
            >
              <Play className="mr-3 h-5 w-5 transition-transform group-hover:scale-110" />
              About Us
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 flex justify-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Scroll to Explore</div>
              <div className={cn("w-6 h-10 border-2 rounded-full flex justify-center", isDarkMode ? "border-border" : "border-gray-300")}>
                <div className={cn("w-1 h-3 rounded-full mt-2 animate-bounce", isDarkMode ? "bg-primary" : "bg-blue-500")}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float { animation: float 20s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Hero;
