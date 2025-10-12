// types/cart.ts
export interface CartItem {
    id: string;
    name: string;
    item_code: string;
    price: number;
    currency: string;
    image: string | null;
    quantity: number;
    stock: number;
    min_order_qty: number;
    item_group: string;
    weight_per_unit?: number;
    weight_uom?: string;
  }
  
  export interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    isOpen: boolean;
  }
  
  export interface CartContextType {
    state: CartState;
    addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    setIsOpen: (open: boolean) => void;
  }