"use client";

import React, { Suspense } from "react";
import { ProductsPageContent } from "@/components/products/ProductsPageContent";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsPageSkeleton />}>
      <ProductsPageContent />
    </Suspense>
  );
}

function ProductsPageSkeleton() {
  return (
    <div className="min-h-screen bg-background pt-24 px-4">
      <Skeleton className="h-12 w-full mb-6" />
      <Skeleton className="h-96 w-full" />
    </div>
  );
}
