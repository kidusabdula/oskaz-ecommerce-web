"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Package, Zap, Shield, Globe, Clock, Users, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const Hero2 = () => {
  
  return (
    <section
      className="relative h-[95vh] flex items-center justify-center overflow-hidden rounded-3xl mx-10 my-16"
    >
      {/* Video Background with Opening Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-[3rem]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className={cn(
            "w-full h-full object-cover rounded-[3rem] transition-all duration-1000 ease-out",
             "scale-100 opacity-100" 
          )}
          src="/oskaz-hero-background.mp4"
        />
        {/* Animated Gradient Overlay */}
        <div className={cn(
          "absolute inset-0 rounded-[3rem] bg-gradient-to-r from-black/70 via-black/50 to-black/70 transition-all duration-1000",
          "opacity-100"
        )}></div>
        
        {/* Animated Grid Pattern */}
        <div className={cn(
          "absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 transition-all duration-1000",
          "translate-y-0 opacity-20"
        )}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col items-center text-center text-white">
        {/* Badge with Animation */}
        <Badge
          variant="secondary"
          className={cn(
            "px-4 py-2 mb-6 text-sm font-medium rounded-full bg-white/20 text-white border-white/30 transition-all duration-500 transform",
             "translate-y-0 opacity-100"
          )}
        >
          <Zap className="w-4 h-4 mr-2" />
          Innovation Spotlight
        </Badge>

        {/* Main Heading with Staggered Animation */}
        <div className="space-y-4">
          <h1
            className={cn(
              "text-4xl md:text-5xl font-bold tracking-tight leading-tight max-w-3xl transition-all duration-700",
              "translate-y-0 opacity-100"
            )}
          >
            Transform Your Business with{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Intelligent Technology
            </span>
          </h1>

          <p className={cn(
            "text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed transition-all duration-700 delay-200",
            "translate-y-0 opacity-100"
          )}>
            Experience the future of business operations with our cutting-edge
            solutions that combine AI, IoT, and seamless integration to drive
            unprecedented efficiency and growth.
          </p>
        </div>

        {/* Stats Section with Icons */}
        <div className={cn(
          "grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8 transition-all duration-700 delay-300",
          "translate-y-0 opacity-100"
        )}>
          {[
            { 
              icon: <CheckCircle className="h-6 w-6" />, 
              value: "99.9%", 
              label: "Uptime Guarantee" 
            },
            { 
              icon: <Users className="h-6 w-6" />, 
              value: "100+", 
              label: "Companies Served" 
            },
            { 
              icon: <Clock className="h-6 w-6" />, 
              value: "24/7", 
              label: "Support Available" 
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-500 hover:scale-105 hover:bg-white/15 hover:border-white/30 group"
              style={{
                transitionDelay:  `${400 + index * 100}ms`,
              }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key Features with Enhanced Animation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
          {[
            { icon: <Package className="h-6 w-6" />, text: "Smart Kiosks" },
            { icon: <Shield className="h-6 w-6" />, text: "Secure Systems" },
            { icon: <Globe className="h-6 w-6" />, text: "Global Integration" },
            { icon: <Zap className="h-6 w-6" />, text: "Lightning Fast" },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-3 transition-all duration-500 group"
              style={{
                animationDelay: `${600 + index * 100}ms`,
                opacity: 1,
                transform: "translateY(0) scale(1)",
              }}
            >
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 border border-white/30 group-hover:border-white/50">
                {feature.icon}
              </div>
              <span className="text-white/90 text-sm font-medium group-hover:text-white transition-colors">
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Buttons with Enhanced Animation */}
        <div className={cn(
          "flex flex-col sm:flex-row gap-4 mt-12 transition-all duration-700 delay-500",
          "translate-y-0 opacity-100"
        )}>
          <Button
            size="lg"
            className="group bg-white text-black hover:bg-gray-100 rounded-full px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Explore Solutions
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="group border-white text-black hover:bg-white hover:text-black rounded-full px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
            Watch Demo
          </Button>
        </div>

        {/* Floating Elements Animation */}
        <div className="absolute -bottom-8 left-10 opacity-20">
          <div className={cn(
            "w-20 h-20 rounded-full bg-blue-500 blur-xl transition-all duration-1000 delay-700",
            "opacity-30 scale-100"
          )}></div>
        </div>
        <div className="absolute -top-8 right-10 opacity-20">
          <div className={cn(
            "w-24 h-24 rounded-full bg-purple-500 blur-xl transition-all duration-1000 delay-900",
            "opacity-30 scale-100"
          )}></div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={cn(
        "absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000",
        "opacity-100 translate-y-0"
      )}>
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero2;