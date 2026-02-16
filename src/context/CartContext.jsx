"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('avanta_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('avanta_cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // Add item to cart
  const addToCart = (product, selectedSizes) => {
    const newItems = selectedSizes.map(size => ({
      id: `${product._id}-${size}`,
      productId: product._id,
      name: product.name,
      slug: product.slug,
      styleCode: product.styleCode,
      sku: product.sku,
      size: size,
      price: product.priceRange.min,
      image: product.images.main,
      color: product.color,
      quantity: 1
    }));

    setCart(prevCart => {
      const updatedCart = [...prevCart];
      
      newItems.forEach(newItem => {
        const existingIndex = updatedCart.findIndex(item => item.id === newItem.id);
        
        if (existingIndex > -1) {
          // Item exists, increase quantity
          updatedCart[existingIndex].quantity += 1;
        } else {
          // New item, add to cart
          updatedCart.push(newItem);
        }
      });
      
      return updatedCart;
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  // Update item quantity
  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Get cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get cart count
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        isLoaded
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}


// Enquiry Context (for enquiry functionality)
const EnquiryContext = createContext();

export function EnquiryProvider({ children }) {
  const [enquiries, setEnquiries] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load enquiries from localStorage on mount
  useEffect(() => {
    const savedEnquiries = localStorage.getItem('avanta_enquiries');
    if (savedEnquiries) {
      try {
        setEnquiries(JSON.parse(savedEnquiries));
      } catch (error) {
        console.error('Error loading enquiries:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save enquiries to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('avanta_enquiries', JSON.stringify(enquiries));
    }
  }, [enquiries, isLoaded]);

  // Add enquiry
  const addEnquiry = (product) => {
    setEnquiries(prevEnquiries => {
      const exists = prevEnquiries.find(item => item._id === product._id);
      if (exists) {
        return prevEnquiries;
      }
      return [...prevEnquiries, product];
    });
  };

  // Remove enquiry
  const removeEnquiry = (productId) => {
    setEnquiries(prevEnquiries => prevEnquiries.filter(item => item._id !== productId));
  };

  // Clear enquiries
  const clearEnquiries = () => {
    setEnquiries([]);
  };

  return (
    <EnquiryContext.Provider
      value={{
        Enquiries: enquiries,
        addEnquiry,
        removeEnquiry,
        clearEnquiries,
        isLoaded
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error('useEnquiry must be used within EnquiryProvider');
  }
  return context;
}

// For backward compatibility
export const InquiryProvider = EnquiryProvider;
