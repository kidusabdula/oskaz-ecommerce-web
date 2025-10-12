// app/blog/page.tsx
import { Suspense } from "react";
import BlogHeader from "@/components/blog/Blog-Header";
import BlogGrid from "@/components/blog/Blog-Grid";
import BlogSidebar from "@/components/blog/Blog-Sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background pt-18">
      <BlogHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <Suspense fallback={<BlogGridSkeleton />}>
              <BlogGrid />
            </Suspense>
          </div>
          
          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <Suspense fallback={<SidebarSkeleton />}>
              <BlogSidebar />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton for blog grid loading state
function BlogGridSkeleton() {
  return (
    <div className="space-y-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
          <div className="md:col-span-2 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex space-x-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      ))}
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
    </div>
  );
}