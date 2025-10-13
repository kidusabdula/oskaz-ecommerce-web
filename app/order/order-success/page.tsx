// app/order/order-success/page.tsx
import { Suspense } from "react";
import OrderSuccessPageClient from "./OrderSuccessPageClient";

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading order details...</div>}>
      <OrderSuccessPageClient />
    </Suspense>
  );
}
