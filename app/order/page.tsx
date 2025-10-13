"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User, FileText, CheckCircle, Shield, Truck, CreditCard, Package, ShoppingCartIcon } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/toast";
import Image from "next/image";
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export default function OrderPage() {
  const { isSignedIn, userId } = useAuth();
  const router = useRouter();
  const { state, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const { addToast } = useToast();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const currency = state.items.length > 0 ? state.items[0].currency : "ETB";

  const formatPrice = (price: number, currency: string) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency, minimumFractionDigits: 0 }).format(price);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn || !userId) return router.push("/sign-in");
    if (state.items.length === 0) return;

    setIsSubmitting(true);
    try {
      const userRes = await fetch("/api/clerk-user");
      const userData = await userRes.json();
      const userEmail = userData.email;
      if (!userEmail) throw new Error("User email not found");

      const orderItems = state.items.map(item => ({
        item_code: item.item_code,
        item_name: item.name,
        description: "",
        quantity: item.quantity,
        price: item.price,
      }));

      const response = await fetch("/api/sales-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, items: orderItems, deliveryDate, notes }),
      });

      const data = await response.json();
      if (data.success) {
        addToast({
          title: "Order Placed Successfully!",
          description: `Your order #${data.data.salesOrder.name} has been confirmed.`,
          action: { label: "View Details", onClick: () => router.push(`/order/order-success?orderId=${data.data.salesOrder.name}`) },
        });
        clearCart();
        router.push(`/order/order-success?orderId=${data.data.salesOrder.name}`);
      } else {
        addToast({ title: "Order Failed", description: data.error || "Unknown error occurred" });
      }
    } catch (error) {
      addToast({ title: "Order Failed", description: error instanceof Error ? error.message : "Unknown error occurred" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isSignedIn)
    return (
      <div className="min-h-screen pt-48 container mx-auto px-4">
        <Card className={cn(
          "max-w-md mx-auto text-center p-16 border shadow hover:shadow-lg transition",
          isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
        )}>
          <div className="mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <User className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Sign In Required</h2>
          <p className="text-muted-foreground text-lg mb-6">Please sign in to place your order and track your purchases</p>
          <SignInButton mode="modal">
            <Button className="px-8 py-4 rounded-xl transition transform hover:scale-105">
              Sign In to Continue
            </Button>
          </SignInButton>
        </Card>
      </div>
    );

  if (state.items.length === 0)
    return (
      <div className="min-h-screen pt-48 container mx-auto px-4">
        <Card className={cn(
          "max-w-md mx-auto text-center p-16 border shadow hover:shadow-lg transition",
          isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
        )}>
          <div className="mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <Package className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
          <p className="text-muted-foreground text-lg mb-6">Add some amazing products to your cart to get started</p>
          <Button onClick={() => router.push("/products")} className="px-8 py-4 rounded-xl transition transform hover:scale-105">
            Explore Products
          </Button>
        </Card>
      </div>
    );

  return (
    <div className="min-h-screen pt-48 container mx-auto px-4 space-y-12">
      <div className="flex flex-col items-center justify-center mb-8">
        <ShoppingCartIcon className="h-12 w-12 mb-4" />
        <h1 className="text-4xl font-bold text-center">Checkout</h1>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">Review your order and complete your purchase</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div className="xl:col-span-2 space-y-6">
          {/* Customer Info Card */}
          <Card className={cn(
            "border shadow hover:shadow-lg transition",
            isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
          )}>
            <CardHeader className={cn(
              "rounded-t-lg py-4",
              isDarkMode ? "bg-white/10" : "bg-gray-50"
            )}>
              <CardTitle className="flex items-center gap-2 text-xl">
                <User className="h-5 w-5" /> Customer Information
              </CardTitle>
              <CardDescription>Your order will be linked to your account</CardDescription>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Account Status</Label>
                <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" /> <span className="text-green-700 dark:text-green-300">Signed In</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Order Type</Label>
                <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Truck className="h-5 w-5 text-blue-600" /> <span className="text-blue-700 dark:text-blue-300">Delivery</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Info Card */}
          <Card className={cn(
            "border shadow hover:shadow-lg transition",
            isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
          )}>
            <CardHeader className={cn(
              "rounded-t-lg py-4",
              isDarkMode ? "bg-white/10" : "bg-gray-50"
            )}>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Calendar className="h-5 w-5" /> Delivery Information
              </CardTitle>
              <CardDescription>When would you like to receive your order?</CardDescription>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="deliveryDate">Preferred Delivery Date</Label>
                <Input id="deliveryDate" type="date" value={deliveryDate} min={new Date().toISOString().split("T")[0]} onChange={(e) => setDeliveryDate(e.target.value)} />
              </div>
              <div className="space-y-3">
                <Label>Delivery Note</Label>
                <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <MapPin className="h-5 w-5 text-yellow-600" /> Free delivery within city limits
                </div>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="notes" className="py-4">Special Instructions</Label>
                <Textarea id="notes" placeholder="Any special instructions..." value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} />
              </div>
            </CardContent>
          </Card>

          {/* Security & Payment */}
          <Card className={cn(
            "border shadow hover:shadow-lg transition",
            isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
          )}>
            <CardHeader className={cn(
              "rounded-t-lg py-4",
              isDarkMode ? "bg-white/10" : "bg-gray-50"
            )}>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Shield className="h-5 w-5" /> Secure Checkout
              </CardTitle>
              <CardDescription>Your payment information is secure and encrypted</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">Payment Method</p>
                    <p className="text-sm text-muted-foreground">Cash on Delivery (COD)</p>
                  </div>
                </div>
                <Badge variant="secondary">Secure</Badge>
              </div>
              <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full py-4 font-bold rounded-xl transition">
                {isSubmitting ? "Processing..." : `Place Order - ${formatPrice(state.totalPrice, currency)}`}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="hidden xl:block">
          <Card className={cn(
            "border shadow hover:shadow-lg transition sticky top-24",
            isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
          )}>
            <CardHeader className={cn(
              "rounded-t-lg py-4",
              isDarkMode ? "bg-white/10" : "bg-gray-50"
            )}>
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="h-5 w-5" /> Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-muted">
                    {item.image ? <Image src={item.image} alt={item.name} fill className="object-cover" /> : <Package className="h-6 w-6 text-muted-foreground m-auto" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="truncate">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{formatPrice(item.price, currency)} × {item.quantity}</p>
                  </div>
                  <p className="font-bold">{formatPrice(item.price * item.quantity, currency)}</p>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(state.totalPrice, currency)}</span></div>
              <div className="flex justify-between"><span>Delivery Fee</span><span className="text-green-600">Free</span></div>
              <div className="flex justify-between"><span>Tax</span><span>Included</span></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}