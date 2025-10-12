export interface Item {
    name: string;
    item_code: string;
    item_name: string;
    stock_uom?: string;
    description?: string;
    item_group?: string;
    brand?: string;
    has_serial_no?: 0 | 1;
    has_batch_no?: 0 | 1;
    is_stock_item?: 0 | 1;
    disabled?: 0 | 1;
    // Standard Frappe fields
    owner?: string;
    creation?: string;
    modified?: string;
    modified_by?: string;
    docstatus?: 0 | 1 | 2;
  }

  export interface ItemGroup {
    name: string;
    parent_item_group: string;
    is_group: 0 | 1;
  }
  
  export interface ItemCreateRequest {
    item_code: string;
    item_name: string;
    stock_uom: string;
    description?: string;
    item_group?: string;
    brand?: string;
    has_serial_no?: 0 | 1;
    has_batch_no?: 0 | 1;
    is_stock_item?: 0 | 1;
  }
  
  export interface ItemUpdateRequest extends Partial<ItemCreateRequest> {
    name: string;
  }