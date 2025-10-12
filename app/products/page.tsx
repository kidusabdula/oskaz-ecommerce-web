// app/products/page.tsx
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductsHeader from "@/components/products/Products-Header";
import ProductsSidebar from "@/components/products/Products-Sidebar";
import ProductsGrid, { type Product } from "@/components/products/Products-Grid";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  // Header state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Sidebar state
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

  // Apply category filter from URL parameter
  useEffect(() => {
    if (categoryParam) {
      setCategories(prev => ({
        ...prev,
        [categoryParam]: true
      }));
    }
  }, [categoryParam]);

  // Derived state
  const selectedCategories = Object.entries(categories)
    .filter(([, isSelected]) => isSelected)
    .map(([category]) => category);

  const handleClearAllFilters = () => {
    setPriceRange([0, 1000000]);
    setCategories(
      Object.keys(categories).reduce(
        (acc: Record<string, boolean>, category) => ({
          ...acc,
          [category]: false,
        }),
        {}
      )
    );
    setFeatures({
      inStock: true,
      onSale: false,
      newArrivals: false,
      bestSellers: false,
    });
    setBrands(
      Object.keys(brands).reduce(
        (acc: Record<string, boolean>, brand) => ({
          ...acc,
          [brand]: false,
        }),
        {}
      )
    );
    setRatings(
      Object.keys(ratings).reduce(
        (acc: Record<string, boolean>, rating) => ({
          ...acc,
          [rating]: false,
        }),
        {}
      )
    );
    
    // Clear category from URL
    const url = new URL(window.location.href);
    url.searchParams.delete('category');
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
      [category]: !categories[category]
    };
    setCategories(newCategories);
    
    // Update URL with selected categories
    const url = new URL(window.location.href);
    const selectedCats = Object.entries(newCategories)
      .filter(([, isSelected]) => isSelected)
      .map(([cat]) => cat);
    
    if (selectedCats.length > 0) {
      url.searchParams.set('category', selectedCats[0]);
    } else {
      url.searchParams.delete('category');
    }
    
    router.replace(url.pathname + url.search);
  };

  const handleProductClick = (product: Product) => {
    router.push(`/products/${product.name}`);
  };

  return (
    <div className="min-h-screen bg-background pt-24">
      <ProductsHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        filteredProductsCount={0}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <Suspense fallback={<SidebarSkeleton />}>
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
            </Suspense>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <Suspense fallback={<ProductsGridSkeleton />}>
              <ProductsGrid
                viewMode={viewMode}
                sortBy={sortBy}
                searchQuery={searchQuery}
                selectedCategories={selectedCategories}
                priceRange={priceRange}
                inStockOnly={features.inStock}
                onProductClick={handleProductClick}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton for sidebar loading state
function SidebarSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-full" />
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
      <Skeleton className="h-10 w-full" />
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-6 w-full" />
        ))}
      </div>
      <Skeleton className="h-10 w-full" />
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-6 w-full" />
        ))}
      </div>
    </div>
  );
}

// Skeleton for products grid loading state
function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-8 w-full" />
        </div>
      ))}
    </div>
  );
}