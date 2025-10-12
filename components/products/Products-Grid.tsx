"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  ShoppingCart,
  Star,
  Package,
  Zap,
  Shield,
  Globe,
  Eye,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export type Product = {
  name: string;
  item_code: string;
  item_name: string;
  item_group: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  stock: number;
  warehouse: string;
  weight_per_unit: number;
  min_order_qty: number;
  tags: string[];
  modified?: string;
  weight_uom?: string;
  stock_uom?: string; 
  item_group_details?: {
    parent_item_group: string;
    is_group: number;
  };
  related_items?: Product[]; 
};

interface ProductsGridProps {
  viewMode: "grid" | "list";
  sortBy: string;
  searchQuery: string;
  selectedCategories: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
  onProductClick?: (product: Product) => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
  viewMode,
  sortBy,
  searchQuery,
  selectedCategories,
  priceRange,
  inStockOnly,
  onProductClick,
}) => {
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/items");
        const data = await response.json();

        if (data.success) {
          setProducts(data.data.items);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product: Product) => {
    if (onProductClick) {
      onProductClick(product);
    } else {
      window.location.href = `/products/${product.name}`;
    }
  };

  const { addItem } = useCart();
const handleAddToCart = (product: Product) => {
  addItem({
    id: product.name,
    name: product.item_name,
    item_code: product.item_code,
    price: product.price,
    currency: product.currency,
    image: product.image,
    stock: product.stock,
    min_order_qty: product.min_order_qty,
    item_group: product.item_group,
    weight_per_unit: product.weight_per_unit,
    weight_uom: product.weight_uom,
  });
};

const handleBuyNow = (product: Product) => {
  addItem({
    id: product.name,
    name: product.item_name,
    item_code: product.item_code,
    price: product.price,
    currency: product.currency,
    image: product.image,
    stock: product.stock,
    min_order_qty: product.min_order_qty,
    item_group: product.item_group,
    weight_per_unit: product.weight_per_unit,
    weight_uom: product.weight_uom,
  });
  window.location.href = '/cart';
};

  const filteredProducts = React.useMemo(() => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.item_group)
      );
    }

    filtered = filtered.filter((product) => {
      const price = product.price || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (inStockOnly) {
      filtered = filtered.filter((product) => product.stock > 0);
    }

    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
      case "price-high":
        return filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
      case "name":
        return filtered.sort((a, b) => a.item_name.localeCompare(b.item_name));
      case "newest":
        return filtered.sort((a, b) => {
          const dateA = a.modified ? new Date(a.modified).getTime() : 0;
          const dateB = b.modified ? new Date(b.modified).getTime() : 0;
          return dateB - dateA;
        });
      default:
        return filtered;
    }
  }, [products, sortBy, searchQuery, selectedCategories, priceRange, inStockOnly]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Smart Boards":
        return <Package className="h-5 w-5" />;
      case "Smart Kiosk":
      case "UPS":
        return <Zap className="h-5 w-5" />;
      case "Smart Podiums":
        return <Shield className="h-5 w-5" />;
      case "TV Wall":
      case "Digital Signage":
        return <Globe className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  const formatPrice = (price: number, currency: string) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

  const getStockStatus = (stock: number) => {
    if (stock > 10)
      return { status: "In Stock", color: "bg-green-100 text-green-800" };
    if (stock > 0)
      return { status: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    return { status: "Out of Stock", color: "bg-red-100 text-red-800" };
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      {/* Loading state */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-0">
                <div className="h-64 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {/* GRID VIEW */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProducts.map((product) => (
                <Card
                  key={product.name}
                  className={cn(
                    "group overflow-hidden border transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer h-[620px] flex flex-col",
                    isDarkMode
                      ? "bg-card/50 border-border hover:bg-card/80 hover:border-primary/30"
                      : "bg-white/70 border-gray-200/70 hover:bg-white hover:border-primary/20"
                  )}
                  onClick={() => handleProductClick(product)}
                >
                  <CardContent className="p-0 flex flex-col flex-1">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.item_name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: "contain" }}
                          className="transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                          <div className="text-center space-y-2">
                            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white">
                              {getCategoryIcon(product.item_group)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Product Image
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <Badge
                          variant="secondary"
                          className={getStockStatus(product.stock).color}
                        >
                          {getStockStatus(product.stock).status}
                        </Badge>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col justify-between flex-1 p-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            {product.item_group}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                            <span className="text-xs text-muted-foreground">
                              (0)
                            </span>
                          </div>
                        </div>

                        <h3 className="font-semibold text-base mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                          {product.item_name}
                        </h3>

                        <div
                          className="text-sm text-muted-foreground mb-3 line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html:
                              product.description ||
                              "No description available",
                          }}
                        />

                        {product.tags?.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {product.tags.slice(0, 3).map((tag, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {product.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{product.tags.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Bottom */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-bold text-primary">
                            {formatPrice(product.price, product.currency)}
                          </span>
                          {product.min_order_qty > 1 && (
                            <span className="text-xs text-muted-foreground">
                              Min. {product.min_order_qty}
                            </span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          className="w-full rounded-full cursor-pointer"
                          variant={product.stock > 0 ? "default" : "outline"}
                          disabled={product.stock <= 0}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                          <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button
                          size="sm"
                          className="w-full rounded-full mt-2 cursor-pointer"
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBuyNow(product);
                          }}
                        >
                          Buy Now
                          <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* LIST VIEW */
            <div className="space-y-4">
              {currentProducts.map((product) => (
                <Card
                  key={product.name}
                  className={cn(
                    "overflow-hidden border transition-all duration-300 hover:shadow-md cursor-pointer",
                    isDarkMode
                      ? "bg-card/50 border-border hover:bg-card/80 hover:border-primary/30"
                      : "bg-white/70 border-gray-200/70 hover:bg-white hover:border-primary/20"
                  )}
                  onClick={() => handleProductClick(product)}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div className="w-full sm:w-48 h-48 relative overflow-hidden">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.item_name}
                            fill
                            sizes="(max-width: 640px) 100vw, 33vw"
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                            <div className="text-center space-y-2">
                              <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white">
                                {getCategoryIcon(product.item_group)}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Product Image
                              </p>
                            </div>
                          </div>
                        )}
                        <div className="absolute top-2 left-2">
                          <Badge
                            variant="secondary"
                            className={getStockStatus(product.stock).color}
                          >
                            {getStockStatus(product.stock).status}
                          </Badge>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                          <div className="flex items-center gap-2 mb-2 sm:mb-0">
                            <Badge variant="outline" className="text-xs">
                              {product.item_group}
                            </Badge>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                              <span className="text-xs text-muted-foreground ml-1">
                                (0)
                              </span>
                            </div>
                          </div>
                        </div>

                        <h3 className="font-semibold text-lg mb-2">
                          {product.item_name}
                        </h3>

                        {/* ✅ Safe div for HTML description */}
                        <div
                          className="text-sm text-muted-foreground mb-4"
                          dangerouslySetInnerHTML={{
                            __html:
                              product.description ||
                              "No description available",
                          }}
                        />

                        {/* Tags */}
                        {product.tags?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {product.tags.map((tag, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold text-primary">
                              {formatPrice(product.price, product.currency)}
                            </span>
                            {product.min_order_qty > 1 && (
                              <span className="text-xs text-muted-foreground ml-2">
                                Min. Qty: {product.min_order_qty}
                              </span>
                            )}
                            {product.weight_per_unit && (
                              <div className="text-xs text-muted-foreground">
                                {product.weight_per_unit}{" "}
                                {product.weight_uom || "kg"} per unit
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              className="cursor-pointer"
                              variant={
                                product.stock > 0 ? "default" : "outline"
                              }
                              disabled={product.stock <= 0}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product);
                              }}
                            >
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              {product.stock > 0
                                ? "Add to Cart"
                                : "Out of Stock"}
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBuyNow(product);
                              }}
                            >
                              Buy Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className="w-8 h-8 p-0"
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsGrid;
