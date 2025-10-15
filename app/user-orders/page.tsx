"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, Calendar, User, ArrowLeft, RefreshCw, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";
import { useTheme } from 'next-themes';

interface SalesOrder {
  name: string;
  customer: string;
  customer_name: string;
  transaction_date: string;
  delivery_date: string;
  grand_total: number;
  status: string;
  currency: string;
  per_billed: number;
  per_delivered: number;
  items: SalesOrderItemDetails[];
}

interface SalesOrderItemDetails {
  item_code: string;
  item_name?: string;
  qty: number;
  amount: number;
}

export default function OrdersPage() {
  const { isSignedIn, userId } = useAuth();
  const router = useRouter();
  const { addToast } = useToast();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [orders, setOrders] = useState<SalesOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const userResponse = await fetch("/api/clerk-user");
      const userData = await userResponse.json();
      const userEmail = userData.email;

      if (!userEmail) throw new Error("User email not found");

      const response = await fetch(`/api/sales-orders?email=${encodeURIComponent(userEmail)}`);
      const data = await response.json();

      if (data.success) setOrders(data.data.salesOrders || []);
      else throw new Error(data.error || "Failed to fetch orders");
    } catch (error) {
      console.error(error);
      addToast({
        title: "Failed to load orders",
        description: error instanceof Error ? error.message : "Please try again",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [addToast]);

  useEffect(() => {
    if (isSignedIn && userId) {
      fetchOrders();
    }
  }, [isSignedIn, userId, fetchOrders]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const formatPrice = (price: number, currency: string) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: currency || "ETB", minimumFractionDigits: 0 }).format(price);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "processing":
      case "in progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    }
  };

  if (!isSignedIn) {
    return (
      <div className={cn(
        "min-h-screen pt-24",
        isDarkMode ? "bg-background" : "bg-gray-50"
      )}>
        <div className="container mx-auto px-4 py-8">
          <Card className={cn(
            "max-w-md mx-auto text-center py-16 border shadow-xl rounded-xl",
            isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
          )}>
            <CardContent className="space-y-6">
              <div className="mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <User className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold">Sign In Required</h2>
              <p className="text-muted-foreground text-lg">
                Please sign in to view your order history
              </p>
              <Button
                onClick={() => router.push("/sign-in")}
                className="px-8 py-4 text-lg rounded-xl"
              >
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "min-h-screen pt-24",
      isDarkMode ? "bg-background" : "bg-gray-50"
    )}>
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="p-2 hover:bg-accent rounded-lg"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">My Orders</h1>
              <p className="text-muted-foreground mt-1">
                View your order history and track current orders
              </p>
            </div>
          </div>
          <Button
            onClick={handleRefresh}
            disabled={refreshing}
            variant="outline"
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {loading ? (
          <Card className={cn(
            "shadow-xl border rounded-xl",
            isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
          )}>
            <CardContent className="p-12 text-center flex justify-center items-center gap-3">
              <RefreshCw className="h-6 w-6 animate-spin text-primary" />
              <span className="text-lg">Loading your orders...</span>
            </CardContent>
          </Card>
        ) : orders.length === 0 ? (
          <Card className={cn(
            "max-w-2xl mx-auto border shadow-xl rounded-xl",
            isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
          )}>
            <CardContent className="p-12 text-center space-y-6">
              <div className="mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <Package className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold">No Orders Yet</h3>
              <p className="text-muted-foreground text-lg">
                You haven&apos;t placed any orders yet. Start shopping to see your order history here.
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => router.push("/products")}
                  className="px-8 py-4 text-lg rounded-xl"
                >
                  Start Shopping
                </Button>
                <Button
                  onClick={() => router.push("/")}
                  variant="outline"
                  className="px-8 py-4 text-lg rounded-xl"
                >
                  Go Home
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 max-w-4xl mx-auto">
            {orders.map((order) => (
              <Card
                key={order.name}
                className={cn(
                  "shadow-xl border rounded-xl hover:shadow-2xl transition-all duration-300",
                  isDarkMode ? "bg-card border-border" : "bg-white border-gray-200"
                )}
              >
              <CardHeader className={cn(
                  "border-b",
                  isDarkMode ? "border-border" : "border-gray-200"
                )}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <FileText className="h-5 w-5" />
                        Order #{order.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(order.transaction_date)}
                        </span>
                        {order.delivery_date && (
                          <span className="flex items-center gap-1">
                            <Package className="h-4 w-4" />
                            Delivery: {formatDate(order.delivery_date)}
                          </span>
                        )}
                      </CardDescription>
                    </div>
                    <div className="text-left md:text-right">
                      <Badge className={cn("text-sm font-semibold", getStatusColor(order.status))}>
                        {order.status || "Processing"}
                      </Badge>
                      <p className="text-2xl font-bold mt-2">
                        {formatPrice(order.grand_total, order.currency)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Items Ordered</h4>
                      <div className="space-y-2">
                        {order.items?.slice(0, 3).map((item, index) => (
                          <div key={index} className="flex justify-between text-sm text-muted-foreground">
                            <span>{item.item_name || item.item_code} × {item.qty}</span>
                            <span className="font-medium">{formatPrice(item.amount, order.currency)}</span>
                          </div>
                        ))}
                        {order.items?.length > 3 && (
                          <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                            +{order.items.length - 3} more items
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Order Progress</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Billing Progress</span>
                          <span className="font-medium">{order.per_billed || 0}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${order.per_billed || 0}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Delivery Progress</span>
                          <span className="font-medium">{order.per_delivered || 0}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${order.per_delivered || 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center items-start gap-3">
                    <span className="text-sm text-muted-foreground">
                      Customer: {order.customer_name}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/order/order-success?orderId=${order.name}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}