// components/top-picks.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  ShoppingCart,
  Star,
  Zap,
  Shield,
  Globe,
  CheckCircle,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const TopPicks = () => {
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

  const topPicks = [
    {
      id: 1,
      name: "Smart Kiosk Pro",
      category: "Kiosk Systems",
      price: "ETB 2,499",
      originalPrice: "ETB 2,999",
      rating: 4.8,
      reviews: 124,
      badge: "Editor's Choice",
      description:
        'Advanced self-service kiosk with 32" touchscreen, integrated payment system, and customizable software interface. Perfect for retail, hospitality, and service industries.',
      features: [
        '32" HD Touchscreen Display',
        "Integrated Payment Terminal",
        "Custom Software Solutions",
        "24/7 Remote Monitoring",
      ],
      icon: <Zap className="h-6 w-6" />,
    },
    {
      id: 2,
      name: "Power Station Elite",
      category: "Power Solutions",
      price: "ETB 1,899",
      originalPrice: "ETB 2,299",
      rating: 4.9,
      reviews: 89,
      badge: "Best Value",
      description:
        "High-capacity power solution with 5000W output, multiple charging ports, and intelligent power management. Ideal for businesses, events, and emergency backup.",
      features: [
        "5000W Power Output",
        "Multiple USB-C & AC Ports",
        "Smart Power Management",
        "Solar Panel Compatible",
      ],
      icon: <Shield className="h-6 w-6" />,
    },
    {
      id: 3,
      name: "Digital Display Max",
      category: "Digital Displays",
      price: "ETB 3,299",
      originalPrice: "ETB 3,999",
      rating: 4.7,
      reviews: 156,
      badge: "Premium Choice",
      description:
        "Ultra-bright 4K outdoor display with weatherproof design, remote content management, and real-time analytics. Perfect for advertising and information display.",
      features: [
        "4K Ultra-HD Resolution",
        "Weatherproof Design",
        "Remote Content Management",
        "Built-in Analytics",
      ],
      icon: <Globe className="h-6 w-6" />,
    },
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
        "relative py-20 md:py-28 overflow-hidden transition-colors duration-500",
        isDarkMode
          ? "bg-background"
          : "bg-gradient-to-br from-slate-50 to-blue-50/30"
      )}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div
          className={cn(
            "absolute top-1/4 -left-40 h-80 w-80 rounded-full opacity-20 blur-3xl",
            isDarkMode ? "bg-indigo-500" : "bg-indigo-400"
          )}
        ></div>
        <div
          className={cn(
            "absolute bottom-1/4 -right-40 h-96 w-96 rounded-full opacity-20 blur-3xl",
            isDarkMode ? "bg-pink-500" : "bg-pink-400"
          )}
        ></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-5 dark:opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-16",
            isInView && "animate-fade-in"
          )}
        >
          <Badge
            variant="outline"
            className="px-3 py-1 text-xs font-medium rounded-full mb-4"
          >
            <Star className="w-3 h-3 mr-1 text-primary" />
            Top Picks
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Our Top Picks For You
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Handpicked selection of our most popular and innovative products,
            chosen by our experts for exceptional performance and value.
          </p>
        </div>

        {/* Products Grid */}
        <div className="space-y-16">
          {topPicks.map((product, index) => (
            <div
              key={product.id}
              className={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              )}
            >
              {/* Left Content */}
              <div
                className={cn(
                  "space-y-6",
                  index % 2 === 1 ? "lg:col-start-2" : "",
                  isInView && "animate-fade-in"
                )}
                //   style={{
                //     animationDelay: isInView ? `${index * 200}ms` : '0ms',
                //     opacity: isInView ? 1 : 0,
                //     transform: isInView ? 'translateX(0)' : index % 2 === 1 ? 'translateX(20px)' : 'translateX(-20px)'
                //   }}
              >
                {/* Badge */}
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="secondary"
                    className="px-3 py-1 text-xs font-medium rounded-full"
                  >
                    {product.icon}
                    <span className="ml-2">{product.category}</span>
                  </Badge>
                  <Badge
                    variant="outline"
                    className="px-3 py-1 text-xs font-medium rounded-full"
                  >
                    {product.badge}
                  </Badge>
                </div>

                {/* Product Name */}
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Description */}
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                <div className="space-y-3">
                  {product.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-3"
                      //   style={{
                      //     animationDelay: isInView ? `${(index * 200) + (featureIndex * 100)}ms` : '0ms',
                      //     opacity: isInView ? 1 : 0,
                      //     transform: isInView ? 'translateY(0)' : 'translateY(10px)'
                      //   }}
                    >
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-base">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price and CTA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-primary">
                      {product.price}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      {product.originalPrice}
                    </span>
                    <Badge
                      variant="secondary"
                      className="text-green-600 dark:text-green-400"
                    >
                      {(() => {
                        const priceNum = parseFloat(
                          product.price.replace(/[^\d.]/g, "")
                        );
                        const originalPriceNum = parseFloat(
                          product.originalPrice.replace(/[^\d.]/g, "")
                        );
                        const discount =
                          !isNaN(priceNum) && !isNaN(originalPriceNum)
                            ? Math.round(
                                (1 - priceNum / originalPriceNum) * 100
                              )
                            : 0;
                        return discount > 0 ? `Save ${discount}%` : "Best Deal";
                      })()}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="group rounded-full px-6">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="group rounded-full px-6"
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>

              {/* Right Image */}
              <div
                className={cn(
                  "relative",
                  index % 2 === 1 ? "lg:col-start-1" : "",
                  isInView && "animate-scale-in"
                )}
                //   style={{
                //     animationDelay: isInView ? `${(index * 200) + 100}ms` : '0ms',
                //     opacity: isInView ? 1 : 0,
                //     transform: isInView ? 'scale(1)' : 'scale(0.95)'
                //   }}
              >
                <Card
                  className={cn(
                    "overflow-hidden border shadow-2xl",
                    isDarkMode
                      ? "bg-card/50 border-border"
                      : "bg-white/70 border-gray-200/70"
                  )}
                >
                  <CardContent className="p-0">
                    {/* Product Image Placeholder */}
                    <div className="relative h-96 lg:h-[500px]">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                        <div className="text-center space-y-4">
                          <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                            {product.icon}
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-xl font-semibold">
                              {product.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Product Image
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Floating Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge
                          variant="secondary"
                          className="px-3 py-1 text-sm font-medium"
                        >
                          {product.badge}
                        </Badge>
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute bottom-4 right-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <Button size="sm" className="rounded-full">
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={cn("text-center mt-16", isInView && "animate-fade-in")}
          style={{
            animationDelay: isInView ? "800ms" : "0ms",
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div
            className={cn(
              "inline-block p-8 rounded-2xl border",
              isDarkMode
                ? "bg-card/50 border-border"
                : "bg-white/70 border-gray-200/70"
            )}
          >
            <h3 className="text-2xl font-bold mb-4">Need Help Choosing?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Our product experts are here to help you find the perfect solution
              for your business needs.
            </p>
            <Button size="lg" className="group rounded-full px-6">
              Talk to an Expert
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopPicks;
