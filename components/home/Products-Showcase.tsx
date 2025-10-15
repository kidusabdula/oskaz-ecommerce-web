// components/products-showcase.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Star, Package, Zap, Shield, Globe, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const ProductsShowcase = () => {
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
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

  const categories = [
    { id: "all", name: "All Products", icon: <Package className="h-4 w-4" /> },
    { id: "kiosk", name: "Kiosk Systems", icon: <Zap className="h-4 w-4" /> },
    { id: "power", name: "Power Solutions", icon: <Shield className="h-4 w-4" /> },
    { id: "display", name: "Digital Displays", icon: <Globe className="h-4 w-4" /> },
  ];

  const products = [
    {
      id: 1,
      name: "Smart Kiosk Pro",
      category: "kiosk",
      price: "ETB 2,499",
      originalPrice: "ETB 2,999",
      rating: 4.8,
      reviews: 124,
      badge: "Best Seller",
      description: "Advanced self-service kiosk with touchscreen and payment integration"
    },
    {
      id: 2,
      name: "Power Station Elite",
      category: "power",
      price: "ETB 1,899",
      originalPrice: "ETB 2,299",
      rating: 4.9,
      reviews: 89,
      badge: "New",
      description: "High-capacity power solution for businesses and events"
    },
    {
      id: 3,
      name: "Digital Display Max",
      category: "display",
      price: "ETB 3,299",
      originalPrice: "ETB 3,999",
      rating: 4.7,
      reviews: 156,
      badge: "Popular",
      description: "Ultra-bright 4K display for outdoor and indoor advertising"
    },
    {
      id: 4,
      name: "Interactive Terminal",
      category: "kiosk",
      price: "ETB 1,799",
      originalPrice: "ETB 2,199",
      rating: 4.6,
      reviews: 67,
      badge: "Sale",
      description: "User-friendly terminal for customer engagement and information"
    }
  ];

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

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
        "relative py-20 md:py-10 overflow-hidden transition-colors duration-500",
        isDarkMode ? "bg-background" : "bg-gradient-to-br from-slate-50 to-blue-50/30"
      )}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className={cn(
          "absolute top-1/3 left-1/4 h-80 w-80 rounded-full opacity-20 blur-3xl",
          isDarkMode ? "bg-green-500" : "bg-green-400"
        )}></div>
        <div className={cn(
          "absolute bottom-1/3 right-1/4 h-96 w-96 rounded-full opacity-20 blur-3xl",
          isDarkMode ? "bg-orange-500" : "bg-orange-400"
        )}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-5 dark:opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-12",
          isInView && "animate-fade-in"
        )}>
          <Badge variant="outline" className="px-3 py-1 text-xs font-medium rounded-full mb-4">
            <Package className="w-3 h-3 mr-1 text-primary" />
            Featured Products
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Discover Our Premium Solutions
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Explore our comprehensive range of cutting-edge products designed to transform your business operations and enhance customer experiences.
          </p>
        </div>

        {/* Category Filter */}
        <div className={cn(
          "flex flex-wrap justify-center gap-4 mb-12",
          isInView && "animate-fade-in-up"
        )}>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "rounded-full px-4 transition-all duration-300",
                activeCategory === category.id 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-primary/10"
              )}
            //   style={{ 
            //     animationDelay: isInView ? `${index * 100}ms` : '0ms',
            //     opacity: isInView ? 1 : 0,
            //     transform: isInView ? 'translateY(0)' : 'translateY(20px)'
            //   }}
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id}
              className={cn(
                "group overflow-hidden border transition-all duration-300 hover:shadow-lg hover:scale-105",
                isInView && "animate-fade-in-up",
                isDarkMode 
                  ? "bg-card/50 border-border hover:bg-card/80 hover:border-primary/30" 
                  : "bg-white/70 border-gray-200/70 hover:bg-white hover:border-primary/20"
              )}
            //   style={{ 
            //     animationDelay: isInView ? `${(index + 2) * 100}ms` : '0ms',
            //     opacity: isInView ? 1 : 0,
            //     transform: isInView ? 'translateY(0)' : 'translateY(20px)'
            //   }}
            >
              <CardContent className="p-0">
                {/* Product Image Placeholder */}
                <div className="relative h-48 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                        <Package className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-xs text-muted-foreground">Product Image</p>
                    </div>
                  </div>
                  
                  {/* Badge */}
                  {product.badge && (
                    <Badge 
                      variant="secondary" 
                      className="absolute top-2 left-2 px-2 py-1 text-xs font-medium"
                    >
                      {product.badge}
                    </Badge>
                  )}
                  
                  {/* Quick Actions */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">
                      ({product.reviews})
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-lg font-bold text-primary">{product.price}</span>
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        {product.originalPrice}
                      </span>
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                      Save {Math.round((1 - parseInt(product.price.replace('$', '')) / parseInt(product.originalPrice.replace('$', ''))) * 100)}%
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <Button 
                    size="sm" 
                    className="w-full group/btn rounded-full"
                    variant="outline"
                  >
                    View Details
                    <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className={cn(
          "text-center",
          isInView && "animate-fade-in"
        )}>
          <div className={cn(
            "inline-block p-8 rounded-2xl border",
            isDarkMode 
              ? "bg-card/50 border-border" 
              : "bg-white/70 border-gray-200/70"
          )}>
            <h3 className="text-2xl font-bold mb-4">
              Can&apos;t find what you&apos;re looking for?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We offer custom solutions tailored to your specific business needs. Get in touch with our team to discuss your requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group rounded-full px-6">
                Contact Sales
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="group rounded-full px-6">
                View All Products
                <Package className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsShowcase;