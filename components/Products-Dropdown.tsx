// components/Products-Dropdown.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Monitor, Cpu, Tv, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDropdownOverlay } from "@/context/DropdownOverlayContext";

interface Category {
  name: string;
  count?: number;
}

const ProductsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { setVisible } = useDropdownOverlay();

  useEffect(() => {
    setMounted(true);
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/items/categories');
        const data = await response.json();
        
        if (data.success && data.data.categories) {
          setCategories(data.data.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Sync overlay visibility with dropdown open state
  useEffect(() => {
    setVisible(isOpen);
    return () => setVisible(false);
  }, [isOpen, setVisible]);

  // Group categories into sections for the dropdown
  const groupedCategories = React.useMemo(() => {
    if (categories.length === 0) return [];
    
    // Define category groups based on your product types
    const displaySystems = categories.filter(cat => 
      ['Smart Boards', 'Digital Signage', 'TV Wall', 'Smart Kiosk'].includes(cat.name)
    );
    
    const powerSolutions = categories.filter(cat => 
      ['UPS', 'Smart Podium'].includes(cat.name)
    );
    
    const computing = categories.filter(cat => 
      ['Computers', 'Others', 'Best Sellers'].includes(cat.name)
    );
    
    return [
      {
        title: "Display Systems",
        icon: <Tv className="h-5 w-5 text-primary" />,
        items: displaySystems.map(cat => ({ name: cat.name, badge: null })),
        color: "from-blue-500/10 to-transparent",
      },
      {
        title: "Power Solutions",
        icon: <Cpu className="h-5 w-5 text-primary" />,
        items: powerSolutions.map(cat => ({ name: cat.name, badge: null })),
        color: "from-green-500/10 to-transparent",
      },
      {
        title: "Computing",
        icon: <Monitor className="h-5 w-5 text-primary" />,
        items: computing.map(cat => ({ name: cat.name, badge: null })),
        color: "from-purple-500/10 to-transparent",
      },
    ];
  }, [categories]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger */}
      <Button
        variant="ghost"
        className="px-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 flex items-center"
        onClick={() => (window.location.href = "/products")}
      >
        Products
        <ChevronDown
          className={`ml-1 h-3 w-3 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </Button>

      {/* Overlay handled globally in layout via DropdownOverlay */}

      {/* Mega Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="fixed left-1/2 -translate-x-1/2 top-[6rem] w-[800px] max-w-[90vw] rounded-2xl shadow-xl border border-border bg-card z-[1001] overflow-hidden"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Our Products</h3>
                <Link href="/products">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View All Products
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-3 gap-6 p-6">
              {loading ? (
                // Loading skeleton
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                      <div className="h-6 w-6 bg-muted rounded animate-pulse"></div>
                      <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
                    </div>
                    <ul className="space-y-2">
                      {Array.from({ length: 3 }).map((_, j) => (
                        <li key={j}>
                          <div className="h-8 bg-muted rounded animate-pulse"></div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                groupedCategories.map((category, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                      <div className={`p-1.5 rounded-md bg-gradient-to-br ${category.color}`}>
                        {category.icon}
                      </div>
                      <h4 className="text-sm font-semibold text-foreground">
                        {category.title}
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {category.items.map((item, j) => (
                        <li key={j}>
                          <Link
                            href={`/products?category=${encodeURIComponent(item.name)}`}
                            className="group flex items-center justify-between rounded-md p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                          >
                            <span>{item.name}</span>
                            <div className="flex items-center gap-1">
                              {item.badge && (
                                <Badge variant="secondary" className="text-xs">
                                  {item.badge}
                                </Badge>
                              )}
                              <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="bg-muted/30 p-4 border-t border-border">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Looking for something specific?
                </p>
                <Link href="/contact">
                  <Button variant="ghost" size="sm" className="text-xs">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsDropdown;