// app/products/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import {
  ShoppingCart,
  Star,
  Package,
  Zap,
  Shield,
  Globe,
  Heart,
  Share2,
  Truck,
  ShieldCheck,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import type { Product } from "@/components/products/Products-Grid";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/items/${params.id}`);
        const data = await response.json();

        if (data.success) {
          setProduct(data.data.item);
        } else {
          console.error("Failed to fetch product:", data.error);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

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


  if (loading) {
    return (
      <div className="container mx-auto px-4 py-48">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-48">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <button onClick={() => router.push("/products")} className="hover:text-foreground">
          Products
        </button>
        <span>/</span>
        <span>{product.item_group}</span>
        <span>/</span>
        <span className="text-foreground">{product.item_name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 aspect-square">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.item_name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white">
                    {getCategoryIcon(product.item_group)}
                  </div>
                  <p className="text-muted-foreground">Product Image</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Thumbnail Images */}
          <div className="flex gap-2 overflow-x-auto">
            {[product.image].filter(Boolean).map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={cn(
                  "relative overflow-hidden rounded-md border-2 flex-shrink-0 w-20 h-20",
                  selectedImageIndex === index
                    ? "border-primary"
                    : "border-muted"
                )}
              >
                <Image
                  src={image}
                  alt={`${product.item_name} ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-2">
              {product.item_group}
            </Badge>
            <h1 className="text-3xl font-bold mb-2">{product.item_name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(0 reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.min_order_qty > 1 && (
              <span className="text-sm text-muted-foreground">
                Min. Qty: {product.min_order_qty}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className={getStockStatus(product.stock).color}
            >
              {getStockStatus(product.stock).status}
            </Badge>
            {product.stock > 0 && (
              <span className="text-sm text-muted-foreground">
                ({product.stock} available)
              </span>
            )}
          </div>

          <p
            className="text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html: product.description || "No description available",
            }}
          />

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <div className="w-12 text-center">{quantity}</div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="flex-1"
              disabled={product.stock <= 0}
              onClick={() => handleAddToCart(product!)}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              disabled={product.stock <= 0}
              onClick={() => handleBuyNow(product!)}
            >
              Buy Now
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Product Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4 text-primary" />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>1 Year Warranty</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <RefreshCw className="h-4 w-4 text-primary" />
              <span>30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div
                dangerouslySetInnerHTML={{
                  __html: product.description || "No description available",
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Item Code:</span>
                    <span>{product.item_code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Item Group:</span>
                    <span>{product.item_group}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Stock UOM:</span>
                    <span>{product.stock_uom}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Weight:</span>
                    <span>
                      {product.weight_per_unit} {product.weight_uom || "kg"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Min Order Qty:</span>
                    <span>{product.min_order_qty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Warehouse:</span>
                    <span>{product.warehouse}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">No Reviews Yet</h3>
                <p className="text-muted-foreground">
                  Be the first to review this product.
                </p>
                <Button className="mt-4">Write a Review</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {product.related_items && product.related_items.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.related_items.map((relatedProduct) => (
              <Card
                key={relatedProduct.name}
                className={cn(
                  "overflow-hidden border transition-all duration-300 hover:shadow-md cursor-pointer",
                  isDarkMode
                    ? "bg-card/50 border-border hover:bg-card/80 hover:border-primary/30"
                    : "bg-white/70 border-gray-200/70 hover:bg-white hover:border-primary/20"
                )}
                onClick={() => router.push(`/products/${relatedProduct.name}`)}
              >
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    {relatedProduct.image ? (
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.item_name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                        <div className="text-center space-y-2">
                          <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white">
                            {getCategoryIcon(relatedProduct.item_group)}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Product Image
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium line-clamp-1 mb-2">
                      {relatedProduct.item_name}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {relatedProduct.item_group}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}