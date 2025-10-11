// app/products/page.tsx
import { Suspense } from "react";
import ProductsHeader from "@/components/products/Products-Header";
import ProductsSidebar from "@/components/products/Products-Sidebar";
import ProductsGrid from "@/components/products/Products-Grid";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <ProductsHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <Suspense fallback={<SidebarSkeleton />}>
              <ProductsSidebar />
            </Suspense>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            <Suspense fallback={<ProductsGridSkeleton />}>
              <ProductsGrid />
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