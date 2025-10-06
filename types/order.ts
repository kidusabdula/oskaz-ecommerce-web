export interface SalesOrder {
    name: string;
    customer: string;
    order_type?: string;
    title?: string;
    delivery_date?: string;
    company?: string;
    currency?: string;
    selling_price_list?: string;
    price_list_currency?: string;
    plc_conversion_rate?: number;
    ignore_pricing_rule?: 0 | 1;
    set_warehouse?: string;
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
    item_name: string;
    description?: string;
    qty: number;
    rate: number;
    amount: number;
    warehouse?: string;
  }
  
  export interface SalesOrderCreateRequest {
    customer: string;
    order_type?: string;
    title?: string;
    delivery_date?: string;
    company?: string;
    currency?: string;
    selling_price_list?: string;
    price_list_currency?: string;
    plc_conversion_rate?: number;
    ignore_pricing_rule?: 0 | 1;
    set_warehouse?: string;
    items: Omit<SalesOrderItem, 'amount'>[];
  }