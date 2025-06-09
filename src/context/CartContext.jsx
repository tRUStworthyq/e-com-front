import React, { createContext, useContext, useState, useEffect } from 'react';
import { getOrCreateCart, addItemToCart, updateItemQuantity, removeItemFromCart, clearCart } from '../services/cartService';

const CartContext = createContext(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshCart = async () => {
    try {
      const cartData = await getOrCreateCart();
      setCart(cartData);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity) => {
    try {
      const item = {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity
      };
      await addItemToCart(item);
      await refreshCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await updateItemQuantity(productId, quantity);
      await refreshCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await removeItemFromCart(productId);
      await refreshCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCartItems = async () => {
    try {
      await clearCart();
      await refreshCart();
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCartItems,
      refreshCart
    }}>
      {children}
    </CartContext.Provider>
  );
};