// components/products/ProductsPageContent.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductsHeader from "@/components/products/Products-Header";
import ProductsSidebar from "@/components/products/Products-Sidebar";
import ProductsGrid, { type Product } from "@/components/products/Products-Grid";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";

export function ProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [categories, setCategories] = useState<Record<string, boolean>>({});
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [features, setFeatures] = useState({
    inStock: true,
    onSale: false,
    newArrivals: false,
    bestSellers: false,
  });
  const [brands, setBrands] = useState<Record<string, boolean>>({});
  const [ratings, setRatings] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (categoryParam) {
      setCategories((prev) => ({
        ...prev,
        [categoryParam]: true,
      }));
    }
  }, [categoryParam]);

  const selectedCategories = Object.entries(categories)
    .filter(([, isSelected]) => isSelected)
    .map(([category]) => category);

  const handleClearAllFilters = () => {
    setPriceRange([0, 1000000]);
    setCategories({});
    setFeatures({
      inStock: true,
      onSale: false,
      newArrivals: false,
      bestSellers: false,
    });
    setBrands({});
    setRatings({});

    const url = new URL(window.location.href);
    url.searchParams.delete("category");
    router.replace(url.pathname + url.search);
  };

  const handleApplyFilters = () => {
    console.log("Applying filters:", {
      priceRange,
      categories,
      features,
      brands,
      ratings,
    });
  };

  const handleCategoryChange = (category: string) => {
    const newCategories = {
      ...categories,
      [category]: !categories[category],
    };
    setCategories(newCategories);

    const url = new URL(window.location.href);
    const selectedCats = Object.entries(newCategories)
      .filter(([, isSelected]) => isSelected)
      .map(([cat]) => cat);

    if (selectedCats.length > 0) {
      url.searchParams.set("category", selectedCats[0]);
    } else {
      url.searchParams.delete("category");
    }

    router.replace(url.pathname + url.search);
  };

  const handleProductClick = (product: Product) => {
    router.push(`/products/${product.name}`);
  };

  // Mobile-only collapsible filters
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-28 sm:pt-24">
      <ProductsHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        filteredProductsCount={0}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filtersOpen={mobileFiltersOpen}
        onToggleFilters={() => setMobileFiltersOpen((v) => !v)}
      />
      <div className="container mx-auto px-4 py-8">
        {/* Mobile: Collapsible Filters (triggered from header) */}
        {!isDesktop && (
          <div className="lg:hidden mt-2 mb-6">
            <Collapsible open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <CollapsibleContent className="mt-4">
                <ProductsSidebar
                  categories={categories}
                  setCategories={setCategories}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  features={features}
                  setFeatures={setFeatures}
                  brands={brands}
                  setBrands={setBrands}
                  ratings={ratings}
                  setRatings={setRatings}
                  onApplyFilters={handleApplyFilters}
                  onClearAllFilters={handleClearAllFilters}
                  onCategoryChange={handleCategoryChange}
                />
              </CollapsibleContent>
            </Collapsible>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop: Static Sidebar */}
          {isDesktop && (
            <div className="w-full lg:w-64 flex-shrink-0">
              <ProductsSidebar
                categories={categories}
                setCategories={setCategories}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                features={features}
                setFeatures={setFeatures}
                brands={brands}
                setBrands={setBrands}
                ratings={ratings}
                setRatings={setRatings}
                onApplyFilters={handleApplyFilters}
                onClearAllFilters={handleClearAllFilters}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          )}

          <div className="flex-1 mt-4 sm:mt-0">
            <ProductsGrid
              viewMode={viewMode}
              sortBy={sortBy}
              searchQuery={searchQuery}
              selectedCategories={selectedCategories}
              priceRange={priceRange}
              inStockOnly={features.inStock}
              onProductClick={handleProductClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
