// components/blog/blog-sidebar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, TrendingUp, Tag, Archive } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const BlogSidebar = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const recentPosts = [
    {
      id: 3,
      title: "Oskaz Import has officially signed an agreement with HD Focus Company",
      date: "10 October 2024"
    },
    {
      id: 1,
      title: "Oskaz Import Signs Agreement with Mizan Tepi University for Smart Board Delivery",
      date: "01 July 2024"
    },
    {
      id: 2,
      title: "Smart Meeting and Conference Room Solutions",
      date: "01 July 2024"
    }
  ];

  const categories = [
    { name: "Education", count: 1 },
    { name: "Technology", count: 1 },
    { name: "Partnership", count: 1 }
  ];

  const archiveMonths = [
    { month: "October 2024", count: 1 },
    { month: "July 2024", count: 2 }
  ];

  return (
    <div className="space-y-6">
      {/* Recent Posts */}
      <Card className={cn(
        "border",
        isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
      )}>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="w-5 h-5 mr-2" />
            Recent Posts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="pb-4 border-b last:border-0 last:pb-0">
              <Link href={`/blog/${post.id}`} className="block group">
                <h3 className="font-medium group-hover:text-primary transition-colors line-clamp-2 mb-1">
                  {post.title}
                </h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-3 h-3 mr-1" />
                  {post.date}
                </div>
              </Link>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className={cn(
        "border",
        isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
      )}>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Tag className="w-5 h-5 mr-2" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/blog/category/${category.name.toLowerCase()}`}
              className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
            >
              <span className="text-sm font-medium">{category.name}</span>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Archive */}
      <Card className={cn(
        "border",
        isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
      )}>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Archive className="w-5 h-5 mr-2" />
            Archive
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {archiveMonths.map((month, index) => (
            <Link
              key={index}
              href={`/blog/archive/${month.month.toLowerCase().replace(' ', '-')}`}
              className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
            >
              <span className="text-sm font-medium">{month.month}</span>
              <Badge variant="secondary" className="text-xs">
                {month.count}
              </Badge>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Newsletter */}
      <Card className={cn(
        "border",
        isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
      )}>
        <CardHeader>
          <CardTitle className="text-lg">Subscribe to Newsletter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Get the latest updates and news delivered to your inbox.
          </p>
          <Button className="w-full">
            Subscribe
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogSidebar;