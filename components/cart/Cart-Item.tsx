// components/Cart-Item.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Minus, Plus, Trash2, Package, Zap, Shield, Globe } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { CartItem } from '@/types/cart';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItem;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
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
  
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    // Ensure quantity is at least the minimum order quantity
    const validQuantity = Math.max(newQuantity, item.min_order_qty);
    updateQuantity(item.id, validQuantity);
  };
  
  const handleRemove = () => {
    removeItem(item.id);
  };
  
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-200",
      isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
    )}>
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Product Image */}
          <div className="w-full sm:w-24 h-24 relative overflow-hidden">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="96px"
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white">
                    {getCategoryIcon(item.item_group)}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="flex-1 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
              <div>
                <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
                <Badge variant="outline" className="text-xs mt-1">
                  {item.item_group}
                </Badge>
              </div>
              <div className="text-right mt-2 sm:mt-0">
                <div className="font-semibold text-sm">
                  {formatPrice(item.price, item.currency)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatPrice(item.price * item.quantity, item.currency)} total
                </div>
              </div>
            </div>
            
            {/* Quantity Controls */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 rounded-full"
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={item.quantity <= item.min_order_qty}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="mx-3 text-sm font-medium w-8 text-center">
                  {item.quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 rounded-full"
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                onClick={handleRemove}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
            
            {/* Stock Warning */}
            {item.quantity >= item.stock && (
              <div className="text-xs text-destructive mt-2">
                Maximum available quantity reached
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItemComponent;