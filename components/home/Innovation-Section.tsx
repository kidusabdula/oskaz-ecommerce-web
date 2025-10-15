"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Mail,
  Play,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Lightbulb,
  Rocket,
  Target,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const InnovationSection = () => {
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [preloadMode, setPreloadMode] = useState<"none" | "metadata" | "auto">("none");
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [hasVideoError, setHasVideoError] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  type NavigatorConnection = { effectiveType?: string; saveData?: boolean };
  type NavigatorWithConnection = Navigator & { connection?: NavigatorConnection };

  useEffect(() => {
    setMounted(true);

    const currentSectionRef = sectionRef.current;
    const currentVideoRef = videoRef.current;

    const conn = (navigator as NavigatorWithConnection).connection;
    const isFast = conn?.effectiveType === "4g" && !conn?.saveData;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setPreloadMode(isFast ? "auto" : "metadata");
          if (!videoSrc) {
            setVideoSrc("/oskaz-hero-background.mp4");
          }
          if (currentVideoRef) {
            try {
              currentVideoRef.load();
            } catch {}
            if (!isPlaying) {
              currentVideoRef.play().catch(() => {});
              setIsPlaying(true);
            }
          }
        }
      },
      { threshold: 0.1 }
    );

    if (currentSectionRef) observer.observe(currentSectionRef);
    return () => {
      if (currentSectionRef) observer.unobserve(currentSectionRef);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, videoSrc]);

  // const handlePlayVideo = () => {
  //   if (videoRef.current) {
  //     if (isPlaying) videoRef.current.pause();
  //     else videoRef.current.play().catch(() => {});
  //     setIsPlaying(!isPlaying);
  //   }
  // };

  if (!mounted) return null;

  const innovationFeatures = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Lightning Fast",
      description:
        "Our solutions deliver exceptional performance with optimized processing speeds.",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security ensures your data is protected at all times.",
      gradient: "from-green-400 to-blue-500",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Global Reach",
      description:
        "Connect with customers worldwide through our international distribution network.",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Innovative Design",
      description:
        "Cutting-edge technology meets intuitive user experience in all our products.",
      gradient: "from-blue-400 to-cyan-500",
    },
  ];

  const stats = [
    { number: "99.9%", label: "Uptime Guarantee", icon: <Shield className="h-4 w-4" /> },
    { number: "50+", label: "Countries Served", icon: <Globe className="h-4 w-4" /> },
    { number: "24/7", label: "Support", icon: <Target className="h-4 w-4" /> },
  ];

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative py-20 md:py-32 overflow-hidden transition-colors duration-500",
        isDarkMode
          ? "bg-background"
          : "bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/10"
      )}
    >
      {/* Background Orbs and Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "absolute top-1/4 -right-20 h-72 w-72 rounded-full opacity-25 blur-3xl animate-pulse",
            isDarkMode ? "bg-purple-500" : "bg-purple-300"
          )}
        />
        <div
          className={cn(
            "absolute bottom-1/4 -left-20 h-96 w-96 rounded-full opacity-20 blur-3xl animate-pulse",
            "bg-gradient-to-r from-blue-400 to-cyan-400",
            isDarkMode && "from-blue-600 to-cyan-600"
          )}
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Video Section */}
          <div
            className={cn(
              "relative order-2 lg:order-1",
              isInView && "animate-scale-in"
            )}
          >
            <div className="relative w-full h-[720px] rounded-3xl overflow-hidden border border-border/50 shadow-2xl group">
              {/* Video Background - Updated with oskaz-hero-background.mp4 */}
              <div className="absolute inset-0">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload={preloadMode}
                  className="absolute inset-0 w-full h-full object-fill"
                  poster="/hero-mp4-fallover.png"
                  aria-label="Background animation video"
                  controlsList="nodownload noplaybackrate nofullscreen"
                  disablePictureInPicture
                  crossOrigin="anonymous"
                  src={videoSrc ?? undefined}
                  onError={() => setHasVideoError(true)}
                  onAbort={() => setHasVideoError(true)}
                  onStalled={() => setHasVideoError(true)}
                  onLoadedData={() => setHasVideoError(false)}
                  onCanPlay={() => {
                    setHasVideoError(false);
                    try {
                      videoRef.current?.play();
                    } catch {}
                  }}
                />
                
                {/* Fallback background in case video doesn't load */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-purple-500/15 to-blue-500/15 flex items-center justify-center">
                  <div className="text-center space-y-6 relative z-10">
                    {/* <div className="mx-auto w-28 h-28 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                      {/* <Play className="w-12 h-12 text-white ml-1" /> 
                    </div> */}
                    {/* <div className="space-y-2">
                      <p className="text-sm text-white font-medium uppercase tracking-wider backdrop-blur-sm">
                        Innovation Showcase
                      </p>
                      <div className="flex items-center justify-center space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Video Overlay for Better Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

              {/* Video Controls */}
              {/* <button
                onClick={handlePlayVideo}
                className="absolute top-6 right-6 z-20 p-3 rounded-2xl bg-black/60 text-white hover:bg-black/80 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110"
              >
                {isPlaying ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>
 */}
              {/* Enhanced Visit Our Office Card */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 opacity-80">
                <Card
                  className={cn(
                    "backdrop-blur-xl border shadow-2xl transform transition-all duration-500 hover:scale-105",
                    isDarkMode
                      ? "bg-card/80 border-border/60 shadow-2xl"
                      : "bg-white/95 border-gray-200/60 shadow-2xl"
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold flex items-center">
                        <MapPin className="h-5 w-5 mr-3 text-primary" />
                        Visit Our Innovation Center
                      </h3>
                      <Rocket className="h-5 w-5 text-primary/60" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      Experience cutting-edge technology firsthand at our state-of-the-art facility in Addis Ababa. See how we&apos;re shaping the future of digital solutions.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-3 p-2 rounded-lg bg-primary/5">
                        <Phone className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">+251 911 123 456</span>
                      </div>
                      <div className="flex items-center space-x-3 p-2 rounded-lg bg-primary/5">
                        <Mail className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">innovation@oskaz.com</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground font-medium">
                        📍 Bole, Addis Ababa
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full border-primary/30 text-primary hover:bg-primary/10 hover:scale-105 transition-transform"
                      >
                        Get Directions
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Right: Text + Features + CTA */}
          <div
            className={cn(
              "space-y-8 order-1 lg:order-2",
              isInView && "animate-fade-in"
            )}
          >
            {/* Badge */}
            <div className="flex items-center space-x-3">
              <Badge className="px-4 py-2 text-sm font-semibold rounded-full bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 transition-colors">
                <Lightbulb className="w-4 h-4 mr-2" />
                Innovation Center
              </Badge>
              <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent"></div>
            </div>

            {/* Heading + Paragraph + CTA (now inside here) */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                Innovation That{" "}
                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  Moves You
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg font-medium">
                Experience the future of technology with our cutting-edge solutions that adapt and evolve with your needs. Our commitment to innovation drives us to create products that transform businesses.
              </p>

              {/* CTA Buttons moved here */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  size="lg"
                  className="group rounded-full px-8 py-6 text-base font-semibold bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Explore Our Technology
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="group rounded-full px-8 py-6 text-base font-semibold border-2 hover:scale-105 transition-all duration-300"
                >
                  <Play className="mr-3 h-5 w-5 transition-transform group-hover:scale-110" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 py-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center space-x-1 text-2xl font-bold text-foreground">
                    {stat.icon}
                    <span>{stat.number}</span>
                  </div>
                  <div className="text-xs text-muted-foreground font-medium mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {innovationFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className={cn(
                    "p-5 border-2 transition-all duration-500 hover:shadow-xl hover:scale-105 group cursor-pointer",
                    isInView && "animate-fade-in-up",
                    isDarkMode
                      ? "bg-card/60 border-border hover:border-primary/40 hover:bg-card/80"
                      : "bg-white/80 border-gray-200/70 hover:border-primary/30 hover:bg-white"
                  )}
                  style={{
                    animationDelay: isInView ? `${index * 100}ms` : "0ms",
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? "translateY(0)" : "translateY(20px)",
                  }}
                >
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div
                        className={cn(
                          "p-3 rounded-2xl bg-gradient-to-br text-white group-hover:scale-110 transition-transform duration-300",
                          feature.gradient
                        )}
                      >
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-base mb-2 group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;