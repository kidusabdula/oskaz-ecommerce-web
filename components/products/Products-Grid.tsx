"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Package, 
  Zap, 
  Shield, 
  Globe, 
  Eye, 
  ArrowRight,
  Grid,
  List
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  badge: string;
  description: string;
  features: string[];
  inStock: boolean;
  onSale: boolean;
  newArrival: boolean;
  brand: string;
};

const SimpleSelect = ({ 
  value, 
  onValueChange, 
  options, 
  className 
}: { 
  value: string; 
  onValueChange: (value: string) => void; 
  options: { value: string; label: string }[];
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border rounded-md text-sm bg-background hover:bg-accent"
      >
        {options.find(opt => opt.value === value)?.label || value}
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onValueChange(option.value);
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-sm text-left hover:bg-accent first:rounded-t-md last:rounded-b-md"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductsGrid = () => {
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  
  const filteredProducts = React.useMemo(() => {
    const sorted = [...allProducts];
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "newest":
        return sorted.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
      default:
        return sorted;
    }
  }, [allProducts, sortBy]);

  useEffect(() => {
    setMounted(true);
    
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Smart Kiosk Pro",
        category: "kiosk",
        price: 2499,
        originalPrice: 2999,
        rating: 4.8,
        reviews: 124,
        badge: "Best Seller",
        description: "Advanced self-service kiosk with 32\" touchscreen and payment integration",
        features: ["32\" HD Touchscreen", "Payment Terminal", "Custom Software"],
        inStock: true,
        onSale: true,
        newArrival: false,
        brand: "oskaz"
      },
      {
        id: 2,
        name: "Power Station Elite",
        category: "power",
        price: 1899,
        originalPrice: 2299,
        rating: 4.9,
        reviews: 89,
        badge: "New",
        description: "High-capacity power solution with 5000W output and multiple ports",
        features: ["5000W Output", "Multiple Ports", "Smart Management"],
        inStock: true,
        onSale: true,
        newArrival: true,
        brand: "oskaz"
      },
      {
        id: 3,
        name: "Digital Display Max",
        category: "display",
        price: 3299,
        originalPrice: 3999,
        rating: 4.7,
        reviews: 156,
        badge: "Premium",
        description: "Ultra-bright 4K outdoor display with weatherproof design",
        features: ["4K Resolution", "Weatherproof", "Remote Management"],
        inStock: true,
        onSale: true,
        newArrival: false,
        brand: "techpro"
      },
      {
        id: 4,
        name: "Interactive Terminal",
        category: "kiosk",
        price: 1799,
        originalPrice: 2199,
        rating: 4.6,
        reviews: 67,
        badge: "Popular",
        description: "User-friendly terminal for customer engagement and information",
        features: ["Touch Interface", "Customizable UI", "Analytics"],
        inStock: true,
        onSale: true,
        newArrival: false,
        brand: "oskaz"
      },
      {
        id: 5,
        name: "Portable Power Bank",
        category: "power",
        price: 299,
        originalPrice: 399,
        rating: 4.5,
        reviews: 234,
        badge: "Sale",
        description: "Compact power bank with fast charging and multiple ports",
        features: ["Fast Charging", "Multiple Ports", "Compact Design"],
        inStock: true,
        onSale: true,
        newArrival: false,
        brand: "innovex"
      },
      {
        id: 6,
        name: "Smart Display Hub",
        category: "display",
        price: 899,
        originalPrice: 1099,
        rating: 4.4,
        reviews: 45,
        badge: "Value",
        description: "Centralized display management system for multiple screens",
        features: ["Multi-Screen Control", "Cloud Management", "Analytics"],
        inStock: true,
        onSale: true,
        newArrival: false,
        brand: "digimax"
      },
      {
        id: 7,
        name: "Custom Kiosk Solution",
        category: "custom",
        price: 4999,
        originalPrice: 5999,
        rating: 5.0,
        reviews: 12,
        badge: "Custom",
        description: "Fully customized kiosk solution tailored to your specific needs",
        features: ["Custom Design", "Tailored Software", "Dedicated Support"],
        inStock: false,
        onSale: false,
        newArrival: false,
        brand: "oskaz"
      },
      {
        id: 8,
        name: "Power Management System",
        category: "power",
        price: 3499,
        originalPrice: 3999,
        rating: 4.7,
        reviews: 78,
        badge: "Enterprise",
        description: "Comprehensive power management system for large facilities",
        features: ["Remote Monitoring", "Load Balancing", "Backup Integration"],
        inStock: true,
        onSale: true,
        newArrival: false,
        brand: "techpro"
      },
      {
        id: 9,
        name: "Outdoor Display Tower",
        category: "display",
        price: 5999,
        originalPrice: 6999,
        rating: 4.8,
        reviews: 34,
        badge: "Premium",
        description: "Large outdoor display tower with high brightness and durability",
        features: ["High Brightness", "Weatherproof", "Remote Control"],
        inStock: true,
        onSale: true,
        newArrival: true,
        brand: "oskaz"
      },
      {
        id: 10,
        name: "Mini Kiosk Basic",
        category: "kiosk",
        price: 1299,
        originalPrice: 1599,
        rating: 4.3,
        reviews: 89,
        badge: "Budget",
        description: "Compact kiosk solution for small businesses and entry-level use",
        features: ["17\" Touchscreen", "Basic Payment", "Easy Setup"],
        inStock: true,
        onSale: true,
        newArrival: false,
        brand: "innovex"
      },
      {
        id: 11,
        name: "Solar Power Station",
        category: "power",
        price: 4299,
        originalPrice: 4999,
        rating: 4.6,
        reviews: 42,
        badge: "Eco",
        description: "Solar-powered energy solution with battery backup system",
        features: ["Solar Compatible", "Battery Backup", "Green Energy"],
        inStock: true,
        onSale: false,
        newArrival: true,
        brand: "techpro"
      },
      {
        id: 12,
        name: "Interactive Display Panel",
        category: "display",
        price: 2199,
        originalPrice: 2799,
        rating: 4.5,
        reviews: 67,
        badge: "Smart",
        description: "Interactive display panel with gesture control and AI features",
        features: ["Gesture Control", "AI Integration", "Multi-Touch"],
        inStock: true,
        onSale: true,
        newArrival: false,
        brand: "digimax"
      }
    ];
    
    setAllProducts(mockProducts);
  }, []);

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "kiosk":
        return <Package className="h-5 w-5" />;
      case "power":
        return <Zap className="h-5 w-5" />;
      case "display":
        return <Globe className="h-5 w-5" />;
      default:
        return <Shield className="h-5 w-5" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case "kiosk":
        return "Kiosk Systems";
      case "power":
        return "Power Solutions";
      case "display":
        return "Digital Displays";
      default:
        return "Custom Solutions";
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      {/* View Controls - Synced with Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span>View:</span>
            <div className="flex items-center border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span>Show:</span>
            <SimpleSelect
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(parseInt(value));
                setCurrentPage(1);
              }}
              options={[
                { value: "6", label: "6" },
                { value: "9", label: "9" },
                { value: "12", label: "12" },
                { value: "24", label: "24" }
              ]}
              className="w-16"
            />
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span>Sort by:</span>
            <SimpleSelect
              value={sortBy}
              onValueChange={setSortBy}
              options={[
                { value: "featured", label: "Featured" },
                { value: "price-low", label: "Price: Low to High" },
                { value: "price-high", label: "Price: High to Low" },
                { value: "name", label: "Name: A to Z" },
                { value: "rating", label: "Highest Rated" },
                { value: "newest", label: "Newest First" }
              ]}
              className="w-40"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <Card 
              key={product.id}
              className={cn(
                "group overflow-hidden border transition-all duration-300 hover:shadow-lg hover:scale-105",
                isDarkMode 
                  ? "bg-card/50 border-border hover:bg-card/80 hover:border-primary/30" 
                  : "bg-white/70 border-gray-200/70 hover:bg-white hover:border-primary/20"
              )}
            >
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white">
                        {getCategoryIcon(product.category)}
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
                  <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Out of Stock Overlay */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Badge variant="destructive" className="px-3 py-1 text-sm">
                        Out of Stock
                      </Badge>
                    </div>
                  )}
                </div>
                
                {/* Product Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {getCategoryName(product.category)}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating)}
                      <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {product.features.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{product.features.length - 2} more
                      </Badge>
                    )}
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-lg font-bold text-primary">ETB {product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          ETB {product.originalPrice}
                        </span>
                      )}
                    </div>
                    {product.originalPrice > product.price && (
                      <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                        Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </div>
                    )}
                  </div>
                  
                  {/* CTA Button */}
                  <Button 
                    size="sm" 
                    className="w-full group/btn"
                    variant={product.inStock ? "default" : "outline"}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                    <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {currentProducts.map((product) => (
            <Card 
              key={product.id}
              className={cn(
                "overflow-hidden border transition-all duration-300 hover:shadow-md",
                isDarkMode 
                  ? "bg-card/50 border-border hover:bg-card/80 hover:border-primary/30" 
                  : "bg-white/70 border-gray-200/70 hover:bg-white hover:border-primary/20"
              )}
            >
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  {/* Product Image */}
                  <div className="w-full sm:w-48 h-48 relative overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white">
                          {getCategoryIcon(product.category)}
                        </div>
                        <p className="text-xs text-muted-foreground">Product Image</p>
                      </div>
                    </div>
                    
                    {product.badge && (
                      <Badge className="absolute top-2 left-2">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <div className="flex items-center gap-2 mb-2 sm:mb-0">
                        <Badge variant="outline" className="text-xs">
                          {getCategoryName(product.category)}
                        </Badge>
                        {product.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center">
                        {renderStars(product.rating)}
                        <span className="text-xs text-muted-foreground ml-2">
                          ({product.reviews})
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-primary">ETB {product.price}</span>
                        {product.originalPrice > product.price && (
                          <>
                            <span className="text-sm text-muted-foreground line-through ml-2">
                              ETB {product.originalPrice}
                            </span>
                            <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                              Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm"
                          variant={product.inStock ? "default" : "outline"}
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(i + 1)}
                className="w-8 h-8 p-0"
              >
                {i + 1}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;