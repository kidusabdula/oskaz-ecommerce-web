// components/products/Products-Sidebar.tsx
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

interface ProductsSidebarProps {
  categories: Record<string, boolean>;
  setCategories: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  priceRange: [number, number];
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  features: {
    inStock: boolean;
    onSale: boolean;
    newArrivals: boolean;
    bestSellers: boolean;
  };
  setFeatures: React.Dispatch<React.SetStateAction<{
    inStock: boolean;
    onSale: boolean;
    newArrivals: boolean;
    bestSellers: boolean;
  }>>;
  brands: Record<string, boolean>;
  setBrands: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  ratings: Record<string, boolean>;
  setRatings: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  onApplyFilters: () => void;
  onClearAllFilters: () => void;
  onCategoryChange: (category: string) => void;
}

const ProductsSidebar: React.FC<ProductsSidebarProps> = ({
  categories,
  setCategories,
  priceRange,
  setPriceRange,
  features,
  setFeatures,
  brands,
  setBrands,
  ratings,
  setRatings,
  onApplyFilters,
  onClearAllFilters,
  onCategoryChange,
}) => {
  const [mounted, setMounted] = useState(false);
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/items/categories');
        const data = await response.json();
        
        if (data && data.data && data.data.categories && Array.isArray(data.data.categories)) {
          const initialCategories: Record<string, boolean> = {};
          data.data.categories.forEach((cat: { name: string }) => {
            initialCategories[cat.name] = false;
          });
          setCategories(initialCategories);
        } else {
          console.error('Invalid response format:', data);
          setCategories({});
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories({});
      }
    };

    fetchCategories();
  }, [setCategories]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFeatureChange = (feature: keyof typeof features) => {
    setFeatures((prev: { inStock: boolean; onSale: boolean; newArrivals: boolean; bestSellers: boolean; }) => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  const handleBrandChange = (brand: string) => {
    setBrands((prev: Record<string, boolean>) => ({
      ...prev,
      [brand]: !prev[brand]
    }));
  };

  const handleRatingChange = (rating: string) => {
    setRatings((prev: Record<string, boolean>) => ({
      ...prev,
      [rating]: !prev[rating]
    }));
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
        <Button variant="ghost" size="sm" onClick={onClearAllFilters}>
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
            {Object.entries(categories).map(([category, isChecked]) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={isChecked}
                  onCheckedChange={() => onCategoryChange(category)}
                />
                <Label htmlFor={category} className="text-sm font-normal cursor-pointer">
                  {category}
                </Label>
                <Badge variant="secondary" className="ml-auto text-xs">
                  {category === "Smart Boards" && "12"}
                  {category === "Smart Kiosk" && "8"}
                  {category === "Smart Podiums" && "1"}
                  {category === "TV Wall" && "2"}
                  {category === "Digital Signage" && "1"}
                  {category === "UPS" && "1"}
                  {category === "Computers" && "0"}
                  {category === "Others" && "0"}
                </Badge>
              </div>
            ))}
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
              onValueChange={(value) => setPriceRange(value as [number, number])}
              max={1000000}
              step={10000}
              className="mt-6"
            />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>ETB {priceRange[0].toLocaleString()}</span>
              <span>ETB {priceRange[1].toLocaleString()}</span>
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
            {Object.entries(features).map(([feature, isChecked]) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={feature}
                  checked={isChecked}
                  onCheckedChange={() => handleFeatureChange(feature as keyof typeof features)}
                />
                <Label htmlFor={feature} className="text-sm font-normal cursor-pointer">
                  {feature === "inStock" && "In Stock"}
                  {feature === "onSale" && "On Sale"}
                  {feature === "newArrivals" && "New Arrivals"}
                  {feature === "bestSellers" && "Best Sellers"}
                </Label>
              </div>
            ))}
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
            {Object.entries(brands).map(([brand, isChecked]) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={isChecked}
                  onCheckedChange={() => handleBrandChange(brand)}
                />
                <Label htmlFor={brand} className="text-sm font-normal cursor-pointer">
                  {brand}
                </Label>
                <Badge variant="secondary" className="ml-auto text-xs">
                  {brand === "Oskaz" && "15"}
                  {brand === "TechPro" && "8"}
                  {brand === "Innovex" && "5"}
                  {brand === "DigiMax" && "2"}
                </Badge>
              </div>
            ))}
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
            {Object.entries(ratings).map(([rating, isChecked]) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={rating}
                  checked={isChecked}
                  onCheckedChange={() => handleRatingChange(rating)}
                />
                <Label htmlFor={rating} className="text-sm font-normal cursor-pointer flex items-center">
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
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Apply Filters Button */}
      <Button className="w-full mt-4" onClick={onApplyFilters}>
        Apply Filters
      </Button>
    </div>
  );
};

export default ProductsSidebar;