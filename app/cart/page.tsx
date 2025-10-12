// app/cart/page.tsx
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, ArrowLeft, Trash2, Sparkles, Package, Shield, Clock } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/cart/Cart-Item';
import CartSummary from '@/components/cart/Cart-Summary';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { state, clearCart } = useCart();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const router = useRouter();
  
  const currency = state.items.length > 0 ? state.items[0].currency : 'ETB';
  
  const handleCheckout = () => {
    console.log('Proceeding to checkout');
    router.push('/order');
  };

  const benefits = [
    { icon: Shield, text: "Secure Checkout", color: "text-green-500" },
    { icon: Package, text: "Free Shipping", color: "text-blue-500" },
    { icon: Clock, text: "Fast Delivery", color: "text-amber-500" },
  ];
  
  return (
    <div className="container mx-auto px-4 py-8 pt-32">
      {/* Enhanced Header Section */}
      <div className="mb-8">
        <Link
          href="/products"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 transition-all duration-200 hover:translate-x-1"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </Link>
        
        <div className="flex items-center gap-3 mb-2">
          <div className={cn(
            "p-3 rounded-2xl",
            isDarkMode ? "bg-primary/10" : "bg-blue-50"
          )}>
            <ShoppingBag className={cn(
              "h-6 w-6",
              isDarkMode ? "text-primary" : "text-blue-600"
            )} />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Shopping Cart
            </h1>
            <p className="text-muted-foreground text-lg mt-1">
              {state.totalItems > 0 
                ? `You have ${state.totalItems} premium item${state.totalItems > 1 ? 's' : ''} in your cart`
                : 'Your cart is empty'
              }
            </p>
          </div>
        </div>

        {/* Benefits Bar */}
        {state.items.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                <benefit.icon className={cn("h-4 w-4", benefit.color)} />
                <span className="text-sm font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {state.items.length === 0 ? (
        <Card className={cn(
          "text-center py-20 border-2 shadow-xl hover:shadow-2xl transition-all duration-500",
          isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
        )}>
          <CardContent className="space-y-6">
            <div className={cn(
              "mx-auto w-24 h-24 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 hover:scale-110",
              isDarkMode ? "bg-primary/10" : "bg-blue-50"
            )}>
              <ShoppingBag className={cn(
                "h-12 w-12 transition-all duration-500",
                isDarkMode ? "text-primary" : "text-blue-600"
              )} />
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold">Your cart is empty</h2>
              <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
                Discover our premium collection and find something amazing for your business
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/products">
                <Button size="lg" className="rounded-xl px-8 py-6 text-base font-semibold group">
                  <Sparkles className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  Explore Premium Products
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-xl px-8 py-6 text-base font-semibold"
                onClick={() => router.push('/')}
              >
                Return Home
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Cart Items Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Header Card */}
            <Card className={cn(
              "border-2 shadow-lg hover:shadow-xl transition-all duration-500 backdrop-blur-sm",
              isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
            )}>
              <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-2xl font-bold">Your Selection</CardTitle>
                  <div className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium",
                    isDarkMode ? "bg-primary/20 text-primary" : "bg-blue-100 text-blue-700"
                  )}>
                    {state.totalItems} {state.totalItems === 1 ? 'item' : 'items'}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200 group"
                  onClick={clearCart}
                >
                  <Trash2 className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  Clear Cart
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {state.items.map((item, index) => (
                    <div 
                      key={item.id} 
                      className={cn(
                        "p-6 transition-all duration-300 hover:bg-accent/5",
                        index === 0 && "rounded-t-lg",
                        index === state.items.length - 1 && "rounded-b-lg"
                      )}
                    >
                      <CartItem item={item} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Info Card */}
            <Card className={cn(
              "border-2 shadow-lg backdrop-blur-sm",
              isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
            )}>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-2">
                    <Shield className="h-8 w-8 text-green-500 mx-auto" />
                    <h4 className="font-semibold">Secure Payment</h4>
                    <p className="text-sm text-muted-foreground">Your data is protected</p>
                  </div>
                  <div className="space-y-2">
                    <Package className="h-8 w-8 text-blue-500 mx-auto" />
                    <h4 className="font-semibold">Easy Returns</h4>
                    <p className="text-sm text-muted-foreground">30-day return policy</p>
                  </div>
                  <div className="space-y-2">
                    <Clock className="h-8 w-8 text-amber-500 mx-auto" />
                    <h4 className="font-semibold">Quick Support</h4>
                    <p className="text-sm text-muted-foreground">24/7 customer service</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Order Summary - Enhanced */}
          <div className="space-y-6">
            <CartSummary onCheckout={handleCheckout} currency={currency} />
            
            {/* Trust Badges */}
            {/* <Card className={cn(
              "border-2 text-center backdrop-blur-sm",
              isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
            )}>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-center space-x-4 opacity-60">
                    <div className="w-12 h-8 bg-muted rounded"></div>
                    <div className="w-12 h-8 bg-muted rounded"></div>
                    <div className="w-12 h-8 bg-muted rounded"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Trusted by 500+ businesses worldwide
                  </p>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      )}
    </div>
  );
}