// context/CartContext.tsx
"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, CartState, CartContextType } from '@/types/cart';
import { useToast } from '@/components/ui/toast';

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: { item: Omit<CartItem, 'quantity'>; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_IS_OPEN'; payload: boolean }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  return { totalItems, totalPrice };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(i => i.id === item.id);
      
      let newItems: CartItem[];
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        newItems = [...state.items];
        const existingItem = newItems[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;
        
        // Check if we have enough stock
        if (newQuantity > existingItem.stock) {
          return state; // Don't update if not enough stock
        }
        
        newItems[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity
        };
      } else {
        // Add new item
        newItems = [...state.items, { ...item, quantity }];
      }
      
      const { totalItems, totalPrice } = calculateTotals(newItems);
      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice
      };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const { totalItems, totalPrice } = calculateTotals(newItems);
      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        const newItems = state.items.filter(item => item.id !== id);
        const { totalItems, totalPrice } = calculateTotals(newItems);
        return {
          ...state,
          items: newItems,
          totalItems,
          totalPrice
        };
      }
      
      const newItems = state.items.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
      
      const { totalItems, totalPrice } = calculateTotals(newItems);
      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0
      };
      
    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen
      };
      
    case 'SET_IS_OPEN':
      return {
        ...state,
        isOpen: action.payload
      };
      
    case 'LOAD_CART': {
      const { totalItems, totalPrice } = calculateTotals(action.payload);
      return {
        ...state,
        items: action.payload,
        totalItems,
        totalPrice
      };
    }
    
    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { addToast } = useToast();
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('oskaz-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('oskaz-cart', JSON.stringify(state.items));
  }, [state.items]);
  
// Update the addItem function:
const addItem = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
  dispatch({ type: 'ADD_ITEM', payload: { item, quantity } });
  
  // Show toast notification
  addToast({
    title: 'Added to cart',
    description: `${item.name} has been added to your cart`,
    action: {
      label: 'View Cart',
      onClick: () => {
        setIsOpen(true);
      }
    }
  });
};
  
  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };
  
  const setIsOpen = (open: boolean) => {
    dispatch({ type: 'SET_IS_OPEN', payload: open });
  };
  
  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      toggleCart,
      setIsOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};