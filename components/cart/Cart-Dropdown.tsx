"use client";

import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, X, ArrowRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import CartItem from './Cart-Item';

const CartDropdown: React.FC = () => {
  const { state, setIsOpen, clearCart } = useCart();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  const currency = state.items.length > 0 ? state.items[0].currency : 'ETB';
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);
  
  const handleCheckout = () => {
    setIsOpen(false);
    window.location.href = '/cart';
  };
  
  if (!state.isOpen) return null;
  
  const overlay = (
    <div className="fixed inset-0 z-[1200]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20" onClick={() => setIsOpen(false)} />
      
      {/* Dropdown */}
      <div
        ref={dropdownRef}
        className={cn(
          "absolute right-4 top-16 w-96 max-w-[90vw] rounded-lg shadow-lg border",
          isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
        )}
      >
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Shopping Cart ({state.totalItems})
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="p-0">
            {state.items.length === 0 ? (
              <div className="p-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-1">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add items to your cart to see them here
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsOpen(false);
                    window.location.href = '/products';
                  }}
                >
                  Browse Products
                </Button>
              </div>
            ) : (
              <>
                <ScrollArea className="h-80 px-6">
                  <div className="space-y-4 py-4">
                    {state.items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                </ScrollArea>
                
                <Separator />
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-lg">
                      {formatPrice(state.totalPrice, currency)}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setIsOpen(false);
                        window.location.href = '/products';
                      }}
                    >
                      Continue Shopping
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={handleCheckout}
                    >
                      Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  
                  {state.items.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-destructive hover:text-destructive"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
  
  return typeof document !== 'undefined' ? createPortal(overlay, document.body) : null;
};

export default CartDropdown;