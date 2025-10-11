// components/products/products-header.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const ProductsHeader = () => {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={cn(
      "border-b py-6 transition-colors duration-500",
      isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Page Title and Results Count */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Products</h1>
            <p className="text-muted-foreground">
              Showing <span className="font-medium text-foreground">24</span> products
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name: A to Z</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
            
            {/* View Mode Toggle */}
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
            
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
        
        {/* Active Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="secondary" className="px-3 py-1">
            Kiosk Systems
            <button className="ml-1 text-xs">✕</button>
          </Badge>
          <Badge variant="secondary" className="px-3 py-1">
            Price: $1000 - $2000
            <button className="ml-1 text-xs">✕</button>
          </Badge>
          <Badge variant="secondary" className="px-3 py-1">
            In Stock
            <button className="ml-1 text-xs">✕</button>
          </Badge>
          <Button variant="ghost" size="sm" className="h-6 text-xs">
            Clear all
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductsHeader;