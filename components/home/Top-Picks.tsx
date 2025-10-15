// components/top-picks.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  ArrowRight,
  ShoppingCart,
  Star,
  Zap,
  Shield,
  Globe,
  CheckCircle,
  Package,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

// Define the Product type based on your ERPNext data
type Product = {
  name: string;
  item_code: string;
  item_name: string;
  item_group: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  stock: number;
  warehouse: string;
  weight_per_unit: number;
  min_order_qty: number;
  tags: string[];
  modified?: string;
  weight_uom?: string;
  item_group_details?: {
    parent_item_group: string;
    is_group: number;
  };
};

const TopPicks = () => {
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
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

  // Fetch products from TV Wall category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/items?item_group=TV Wall&limit=3");
        const data = await response.json();

        if (data.success) {
          setProducts(data.data.items);
        }
      } catch (error) {
        console.error("Error fetching TV Wall products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper function to format price
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Helper function to get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Smart Boards":
        return <Package className="h-6 w-6" />;
      case "Smart Kiosk":
      case "UPS":
        return <Zap className="h-6 w-6" />;
      case "Smart Podiums":
        return <Shield className="h-6 w-6" />;
      case "TV Wall":
      case "Digital Signage":
        return <Globe className="h-6 w-6" />;
      default:
        return <Package className="h-6 w-6" />;
    }
  };

  // Helper function to get stock status
  const getStockStatus = (stock: number) => {
    if (stock > 10)
      return { status: "In Stock", color: "bg-green-100 text-green-800" };
    if (stock > 0)
      return { status: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    return { status: "Out of Stock", color: "bg-red-100 text-red-800" };
  };

  // Transform product data to match the expected format
  const transformProduct = (product: Product, index: number) => {
    const badges = ["Editor's Choice", "Best Value", "Premium Choice"];
    const originalPrice = product.price * 1.2; // Calculate a 20% higher original price

    return {
      id: product.name,
      name: product.item_name,
      category: product.item_group,
      price: formatPrice(product.price, product.currency),
      originalPrice: formatPrice(originalPrice, product.currency),
      rating: 4.5 + index * 0.1, // Vary ratings slightly
      reviews: 100 + index * 30, // Vary review counts
      badge: badges[index % badges.length],
      description: product.description || "No description available",
      features: [
        "High-resolution display",
        "Easy installation",
        "Energy efficient",
        "Remote control included",
      ].slice(0, 3 + index), // Vary features slightly
      icon: getCategoryIcon(product.item_group),
      image: product.image,
      stock: product.stock,
      item_code: product.item_code,
    };
  };

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

  if (!mounted) return null;

  // Show loading state while fetching products
  if (loading) {
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
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
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

          {/* Loading skeleton */}
          <div className="space-y-16">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className={cn(
                  "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                )}
              >
                <div
                  className={cn(
                    "space-y-6",
                    index % 2 === 1 ? "lg:col-start-2" : ""
                  )}
                >
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
                <div
                  className={cn(
                    "relative",
                    index % 2 === 1 ? "lg:col-start-1" : ""
                  )}
                >
                  <div className="h-96 lg:h-[500px] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // If no products found, show a message
  if (products.length === 0) {
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
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
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
              We&apos;re currently updating our selection of TV Wall products.
              Please check back soon for our latest offerings.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Transform products to match the expected format
  const topPicks = products.map((product, index) =>
    transformProduct(product, index)
  );

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
                <div
                  className="text-lg text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />

                {/* Features */}
                <div className="space-y-3">
                  {product.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-3"
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
                  {/* <Button 
                    size="lg" 
                    className="group rounded-full px-6"
                    disabled={product.stock <= 0}
                    onClick={() => {
                      // Add to cart logic
                      console.log(`Added ${product.name} to cart`);
                    }}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button> */}
                  <Button
                    // variant="outline"
                    size="lg"
                    className="group rounded-full px-6"
                    onClick={() => {
                      // Navigate to product detail page
                      window.location.href = `/products/${product.id}`;
                    }}
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
                    {/* Product Image */}
                    <div className="relative h-96 lg:h-[500px]">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-contain"
                        />
                      ) : (
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
                      )}

                      {/* Floating Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge
                          variant="secondary"
                          className="px-3 py-1 text-sm font-medium"
                        >
                          {product.badge}
                        </Badge>
                      </div>

                      {/* Stock Status Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge
                          variant="secondary"
                          className={getStockStatus(product.stock).color}
                        >
                          {getStockStatus(product.stock).status}
                        </Badge>
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute bottom-4 right-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="sm"
                          className="rounded-full"
                          disabled={product.stock <= 0}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add to cart logic
                            console.log(`Added ${product.name} to cart`);
                          }}
                        >
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
