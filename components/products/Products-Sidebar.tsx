// components/products/products-sidebar.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const ProductsSidebar = () => {
  const [mounted, setMounted] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [categories, setCategories] = useState({
    kiosk: false,
    power: false,
    display: false,
    custom: false
  });
  const [features, setFeatures] = useState({
    inStock: true,
    onSale: false,
    newArrivals: false,
    bestSellers: false
  });
  const [brands, setBrands] = useState({
    oskaz: false,
    techpro: false,
    innovex: false,
    digimax: false
  });
  const [ratings, setRatings] = useState({
    five: false,
    four: false,
    three: false,
    two: false,
    one: false
  });
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    features: true,
    brands: false,
    ratings: false
  });
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category: keyof typeof categories) => {
    setCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleFeatureChange = (feature: keyof typeof features) => {
    setFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  const handleBrandChange = (brand: keyof typeof brands) => {
    setBrands(prev => ({
      ...prev,
      [brand]: !prev[brand]
    }));
  };

  const handleRatingChange = (rating: keyof typeof ratings) => {
    setRatings(prev => ({
      ...prev,
      [rating]: !prev[rating]
    }));
  };

  const clearAllFilters = () => {
    setPriceRange([0, 5000]);
    setCategories({
      kiosk: false,
      power: false,
      display: false,
      custom: false
    });
    setFeatures({
      inStock: true,
      onSale: false,
      newArrivals: false,
      bestSellers: false
    });
    setBrands({
      oskaz: false,
      techpro: false,
      innovex: false,
      digimax: false
    });
    setRatings({
      five: false,
      four: false,
      three: false,
      two: false,
      one: false
    });
  };

  if (!mounted) return null;

  return (
    <div className={cn(
      "space-y-6 p-4 rounded-lg border",
      isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center">
          <SlidersHorizontal className="h-5 w-5 mr-2" />
          Filters
        </h2>
        <Button variant="ghost" size="sm" onClick={clearAllFilters}>
          Clear all
        </Button>
      </div>
      
      <Separator />
      
      {/* Categories */}
      <Collapsible open={expandedSections.categories} onOpenChange={() => toggleSection("categories")}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto font-semibold">
            Categories
            {expandedSections.categories ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="kiosk"
                checked={categories.kiosk}
                onCheckedChange={() => handleCategoryChange("kiosk")}
              />
              <Label htmlFor="kiosk" className="text-sm font-normal cursor-pointer">
                Kiosk Systems
              </Label>
              <Badge variant="secondary" className="ml-auto text-xs">12</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="power"
                checked={categories.power}
                onCheckedChange={() => handleCategoryChange("power")}
              />
              <Label htmlFor="power" className="text-sm font-normal cursor-pointer">
                Power Solutions
              </Label>
              <Badge variant="secondary" className="ml-auto text-xs">8</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="display"
                checked={categories.display}
                onCheckedChange={() => handleCategoryChange("display")}
              />
              <Label htmlFor="display" className="text-sm font-normal cursor-pointer">
                Digital Displays
              </Label>
              <Badge variant="secondary" className="ml-auto text-xs">6</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="custom"
                checked={categories.custom}
                onCheckedChange={() => handleCategoryChange("custom")}
              />
              <Label htmlFor="custom" className="text-sm font-normal cursor-pointer">
                Custom Solutions
              </Label>
              <Badge variant="secondary" className="ml-auto text-xs">4</Badge>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Separator />
      
      {/* Price Range */}
      <Collapsible open={expandedSections.price} onOpenChange={() => toggleSection("price")}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto font-semibold">
            Price Range
            {expandedSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={5000}
              step={100}
              className="mt-6"
            />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Separator />
      
      {/* Features */}
      <Collapsible open={expandedSections.features} onOpenChange={() => toggleSection("features")}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto font-semibold">
            Features
            {expandedSections.features ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inStock"
                checked={features.inStock}
                onCheckedChange={() => handleFeatureChange("inStock")}
              />
              <Label htmlFor="inStock" className="text-sm font-normal cursor-pointer">
                In Stock
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="onSale"
                checked={features.onSale}
                onCheckedChange={() => handleFeatureChange("onSale")}
              />
              <Label htmlFor="onSale" className="text-sm font-normal cursor-pointer">
                On Sale
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="newArrivals"
                checked={features.newArrivals}
                onCheckedChange={() => handleFeatureChange("newArrivals")}
              />
              <Label htmlFor="newArrivals" className="text-sm font-normal cursor-pointer">
                New Arrivals
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="bestSellers"
                checked={features.bestSellers}
                onCheckedChange={() => handleFeatureChange("bestSellers")}
              />
              <Label htmlFor="bestSellers" className="text-sm font-normal cursor-pointer">
                Best Sellers
              </Label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Separator />
      
      {/* Brands */}
      <Collapsible open={expandedSections.brands} onOpenChange={() => toggleSection("brands")}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto font-semibold">
            Brands
            {expandedSections.brands ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="oskaz"
                checked={brands.oskaz}
                onCheckedChange={() => handleBrandChange("oskaz")}
              />
              <Label htmlFor="oskaz" className="text-sm font-normal cursor-pointer">
                Oskaz
              </Label>
              <Badge variant="secondary" className="ml-auto text-xs">15</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="techpro"
                checked={brands.techpro}
                onCheckedChange={() => handleBrandChange("techpro")}
              />
              <Label htmlFor="techpro" className="text-sm font-normal cursor-pointer">
                TechPro
              </Label>
              <Badge variant="secondary" className="ml-auto text-xs">8</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="innovex"
                checked={brands.innovex}
                onCheckedChange={() => handleBrandChange("innovex")}
              />
              <Label htmlFor="innovex" className="text-sm font-normal cursor-pointer">
                Innovex
              </Label>
              <Badge variant="secondary" className="ml-auto text-xs">5</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="digimax"
                checked={brands.digimax}
                onCheckedChange={() => handleBrandChange("digimax")}
              />
              <Label htmlFor="digimax" className="text-sm font-normal cursor-pointer">
                DigiMax
              </Label>
              <Badge variant="secondary" className="ml-auto text-xs">2</Badge>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Separator />
      
      {/* Ratings */}
      <Collapsible open={expandedSections.ratings} onOpenChange={() => toggleSection("ratings")}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto font-semibold">
            Customer Ratings
            {expandedSections.ratings ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="five"
                checked={ratings.five}
                onCheckedChange={() => handleRatingChange("five")}
              />
              <Label htmlFor="five" className="text-sm font-normal cursor-pointer flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2">5 Stars</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="four"
                checked={ratings.four}
                onCheckedChange={() => handleRatingChange("four")}
              />
              <Label htmlFor="four" className="text-sm font-normal cursor-pointer flex items-center">
                <div className="flex items-center">
                  {[...Array(4)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="ml-2">4 Stars & Up</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="three"
                checked={ratings.three}
                onCheckedChange={() => handleRatingChange("three")}
              />
              <Label htmlFor="three" className="text-sm font-normal cursor-pointer flex items-center">
                <div className="flex items-center">
                  {[...Array(3)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  {[...Array(2)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2">3 Stars & Up</span>
              </Label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Apply Filters Button */}
      <Button className="w-full mt-4">
        Apply Filters
      </Button>
    </div>
  );
};

export default ProductsSidebar;