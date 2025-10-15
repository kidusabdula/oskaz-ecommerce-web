"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Grid, List, ShoppingBag, SlidersHorizontal } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductsHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  filteredProductsCount: number;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  onToggleFilters?: () => void;
  filtersOpen?: boolean;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  filteredProductsCount,
  sortBy,
  setSortBy,
  onToggleFilters,
  filtersOpen,
}) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <header
      className={cn(
        "w-full bg-background/95 backdrop-blur-md top-0 z-40 border-none min-h-[16vh] sm:h-[16vh] mb-4 sm:mb-0",
        "transition-all duration-300"
      )}
    >
      <div className="container mx-auto px-4 py-4 lg:py-6">
        {/* Main Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
          
          {/* Left: Title and Product Count */}
          <div className="flex items-center justify-between lg:justify-start gap-4 flex-1">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={cn(
                  "p-2 rounded-xl flex items-center justify-center flex-shrink-0",
                  isDarkMode ? "bg-slate-800 text-blue-400" : "bg-blue-50 text-blue-600"
                )}
              >
                <ShoppingBag className="h-8 w-8" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl lg:text-4xl font-semibold tracking-tight truncate">
                  Products
                </h1>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  Explore our{" "}
                  {/* <span className="font-medium text-foreground">
                    {filteredProductsCount}
                  </span>{" "} */}
                  available products
                </p>
              </div>
            </div>

            {/* Mobile Product Count Badge */}
            <Badge 
              variant="secondary" 
              className="px-3 py-1 font-medium lg:hidden flex-shrink-0"
            >
              {filteredProductsCount}
            </Badge>
          </div>

          {/* Right: Search, Sort, Filters (mobile), View Toggle (desktop) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-4 flex-1 lg:justify-end">
            
            {/* Search Bar */}
            <div className="relative flex-1 min-w-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(
                    "pl-10 pr-8 h-10 text-sm rounded-lg",
                    "focus:ring-2 focus:ring-primary focus:border-transparent transition-all",
                    isDarkMode
                      ? "bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
                      : "bg-white border-gray-200 text-gray-800 placeholder:text-gray-500"
                  )}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 rounded-full hover:bg-transparent"
                  >
                    ✕
                  </Button>
                )}
              </div>
              
              {/* Search Hint */}
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground px-1">
                {/* <Sparkles className="h-3 w-3 flex-shrink-0" /> */}
                {/* <span className="truncate">Try &quot;smart boards&quot;, &quot;kiosk&quot;, or &quot;video wall&quot;</span> */}
              </div>
            </div>

            {/* Mobile row: Sort (Featured) + Filters side-by-side */}
            <div className="flex w-full items-center gap-3 sm:hidden">
              <div className="flex-1 sm:flex-none sm:w-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px] h-10 rounded-lg">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="rating">Average Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {onToggleFilters && (
                <Button
                  variant="outline"
                  className={cn(
                    "sm:hidden h-10 rounded-xl px-4 flex-1",
                    isDarkMode ? "border-slate-700 bg-slate-800/60" : "border-gray-200 bg-white/70"
                  )}
                  onClick={onToggleFilters}
                >
                  <span className="flex items-center gap-2 font-medium justify-center">
                    <SlidersHorizontal className="h-5 w-5" />
                    Filters
                  </span>
                </Button>
              )}
            </div>

            {/* Tablet: Sort + Filters (desktop hides Filters) */}
            <div className="hidden sm:flex items-center gap-3 flex-shrink-0 sm:w-auto">
              <div className="w-[180px]">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full h-10 rounded-lg">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="rating">Average Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {onToggleFilters && (
                <Button
                  variant="outline"
                  className={cn(
                    "lg:hidden h-10 rounded-xl px-4",
                    isDarkMode ? "border-slate-700 bg-slate-800/60" : "border-gray-200 bg-white/70"
                  )}
                  onClick={onToggleFilters}
                >
                  <span className={cn("flex items-center gap-2 font-medium", filtersOpen ? "text-primary" : "")}>
                    <SlidersHorizontal className="h-5 w-5" />
                    Filters
                  </span>
                </Button>
              )}
            </div>

            {/* View Mode Toggle and Desktop Product Count */}
            <div className="hidden sm:flex items-center gap-3 flex-shrink-0 sm:w-auto mt-2 sm:mt-0">
              {/* Desktop Product Count */}
              {/* <Badge 
                variant="secondary" 
                className="px-3 py-1 font-medium hidden lg:flex"
              >
                {filteredProductsCount} products
              </Badge> */}

              {/* View Mode Toggle */}
              <div
                className={cn(
                  "flex items-center p-1 rounded-lg border shadow-sm w-full sm:w-auto",
                  isDarkMode ? "border-slate-700 bg-slate-800/50" : "border-gray-200 bg-white"
                )}
              >
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "h-8 rounded-md gap-1.5 px-2.5 flex-1 sm:flex-none",
                    viewMode === "grid"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-transparent"
                  )}
                >
                  <Grid className="h-3.5 w-3.5" />
                  <span className="text-xs font-medium hidden xs:inline">Grid</span>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "h-8 rounded-md gap-1.5 px-2.5 flex-1 sm:flex-none",
                    viewMode === "list"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-transparent"
                  )}
                >
                  <List className="h-3.5 w-3.5" />
                  <span className="text-xs font-medium hidden xs:inline">List</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProductsHeader;