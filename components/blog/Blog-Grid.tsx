// components/blog/blog-grid.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Eye, Clock, ArrowRight, User } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const BlogGrid = () => {
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  if (!mounted) return null;

  const blogPosts = [
    {
      id: 1,
      title: "Oskaz Import Signs Agreement with Mizan Tepi University for Smart Board Delivery",
      excerpt: "In a significant move to bolster educational technology, Oskaz Import has officially signed an agreement with Mizan Tepi University to provide a range of ICT devices. The partnership aims to enhance the university's technological capabilities, ensuring that both students and faculty have access to modern educational tools.",
      date: "01 July 2024",
      author: "Oskaz Team",
      category: "Education",
      hits: 283,
      readTime: "5 min read",
      image: "/blog-1.jpg",
      featured: true
    },
    {
      id: 2,
      title: "Smart Meeting and Conference Room Solutions",
      excerpt: "Using smart classrooms and smart video conferencing solutions, such as those provided by Dahua via Oskaz Import, offers several advantages for modern educational and business environments. These technologies transform traditional spaces into interactive, collaborative hubs that enhance productivity and engagement.",
      date: "01 July 2024",
      author: "Tech Team",
      category: "Technology",
      hits: 143,
      readTime: "8 min read",
      image: "/blog-2.jpg",
      featured: false
    },
    {
      id: 3,
      title: "Oskaz Import has officially signed an agreement with HD Focus Company",
      excerpt: "Oskaz Import has officially signed an agreement with HD Focus Company, establishing them as the official partner in the Horn of Africa. This strategic partnership is set to enhance collaboration and drive growth in the region, leveraging the strengths of both companies to create new opportunities for development and investment.",
      date: "10 October 2024",
      author: "Business Team",
      category: "Partnership",
      hits: 233,
      readTime: "4 min read",
      image: "/blog-3.jpg",
      featured: false
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Education":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Technology":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Partnership":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <div ref={sectionRef} className="space-y-8">
      {blogPosts.map((post, index) => (
        <Card
          key={post.id}
          className={cn(
            "overflow-hidden border transition-all duration-300 hover:shadow-lg",
            isInView && "animate-fade-in-up",
            isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
          )}
          style={{ 
            animationDelay: isInView ? `${index * 100}ms` : '0ms'
          }}
        >
          <CardContent className="p-0">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Blog Image */}
              <div className="md:col-span-1">
                <div className="relative h-48 md:h-full">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                        <Calendar className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-xs text-muted-foreground">Blog Image</p>
                    </div>
                  </div>
                  
                  {/* Featured Badge */}
                  {post.featured && (
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Blog Content */}
              <div className="md:col-span-2 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={getCategoryColor(post.category)}>
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3 mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Eye className="w-3 h-3 mr-1" />
                    {post.hits} views
                  </div>
                </div>
                
                <h2 className="text-xl md:text-2xl font-bold mb-3 hover:text-primary transition-colors">
                  <Link href={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="w-3 h-3 mr-1" />
                    {post.author}
                    <span className="mx-2">•</span>
                    <Clock className="w-3 h-3 mr-1" />
                    {post.readTime}
                  </div>
                  
                  <Button variant="ghost" size="sm" asChild className="group">
                    <Link href={`/blog/${post.id}`}>
                      Read More
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BlogGrid;