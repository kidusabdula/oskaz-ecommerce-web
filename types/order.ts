// types/order.ts
export interface SalesOrder {
  name: string;
  customer: string;
  title?: string;
  delivery_date?: string;
  s_warehouse?: string;
  items: SalesOrderItem[];
  // Standard Frappe fields
  owner?: string;
  creation?: string;
  modified?: string;
  modified_by?: string;
  docstatus?: 0 | 1 | 2;
}

export interface SalesOrderItem {
  item_code: string;
  qty: number;
  rate: number;
  warehouse?: string;
}

export interface SalesOrderCreateRequest {
  customer: string;
  title?: string;
  delivery_date?: string;
  s_warehouse?: string;
  items: SalesOrderItem[];
}