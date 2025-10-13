// app/order/order-success/OrderSuccessPageClient.tsx
"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, Package, ShoppingBag, ArrowRight, Home } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export default function OrderSuccessPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div
      className={cn("min-h-screen pt-24", isDarkMode ? "bg-background" : "bg-gray-50")}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-12">
          {/* Success Icon */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-24 h-24 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Order Confirmed!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          {/* Order Details Card */}
          <Card
            className={cn(
              "border shadow hover:shadow-lg transition rounded-xl",
              isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
            )}
          >
            <CardHeader
              className={cn(
                "text-center border-b",
                isDarkMode ? "border-border" : "border-gray-200"
              )}
            >
              <CardTitle className="flex items-center justify-center gap-3 text-2xl">
                <Package className="h-6 w-6" />
                Order Details
              </CardTitle>
              <CardDescription className="mt-1">
                Your order information is summarized below
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {orderId && (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Order Number</p>
                  <p className="text-2xl font-mono font-bold">#{orderId}</p>
                </div>
              )}
              {/* Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow-sm">
                  <Package className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <p className="font-semibold text-blue-700 dark:text-blue-300">
                    Processing
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Order Received
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg shadow-sm">
                  <ShoppingBag className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
                  <p className="font-semibold text-yellow-700 dark:text-yellow-300">
                    Preparing
                  </p>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    Next Step
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg shadow-sm">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <p className="font-semibold text-green-700 dark:text-green-300">
                    Delivered
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Final Step
                  </p>
                </div>
              </div>

              {/* Next Steps */}
              <div
                className={cn(
                  "border rounded-lg p-4 shadow-sm",
                  isDarkMode ? "bg-muted border-border" : "bg-white border-gray-200"
                )}
              >
                <h3 className="font-semibold mb-2">What&apos;s Next?</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• You will receive an order confirmation email shortly</li>
                  <li>• We&apos;ll notify you when your order ships</li>
                  <li>• Estimated delivery: 3-5 business days</li>
                  <li>• Track your order from your account page</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => router.push("/products")}
              className="py-6 text-lg rounded-xl transition transform hover:scale-105"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Continue Shopping
            </Button>

            <Button
              onClick={() => router.push("/user-orders")}
              variant="outline"
              className="border-2 py-6 text-lg rounded-xl transition transform hover:scale-105"
            >
              View My Orders
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>

            <Button
              onClick={() => router.push("/")}
              variant="ghost"
              className="py-6 text-lg rounded-xl transition transform hover:scale-105"
            >
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </Button>
          </div>

          {/* Support Info */}
          <div
            className={cn(
              "text-center p-4 border rounded-lg shadow-sm",
              isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
            )}
          >
            <p className="text-sm text-muted-foreground">
              Need help with your order?{" "}
              <button
                onClick={() => router.push("/contact")}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Contact Support
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
