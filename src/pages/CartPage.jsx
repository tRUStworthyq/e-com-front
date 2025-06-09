import React, { useState } from 'react';
import { ShoppingCart, Trash2, CreditCard } from 'lucide-react';
import { createOrder } from '../services/orderService';
import CartItem from "../components/CartItem";
import {useCart} from "../context/CartContext";

const CartPage = () => {
  const { cart, loading, clearCartItems } = useCart();
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleClearCart = async () => {
    if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
      await clearCartItems();
    }
  };

  const handleCreateOrder = async () => {
    if (!cart?.items?.length) return;

    setIsOrdering(true);
    try {
      const orderItems = cart.items.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));

      await createOrder(orderItems);
      await clearCartItems();
      setOrderSuccess(true);
      
      setTimeout(() => setOrderSuccess(false), 3000);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Ошибка при оформлении заказа');
    } finally {
      setIsOrdering(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="text-center py-16">
        <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Заказ оформлен!</h2>
        <p className="text-gray-600">Ваш заказ успешно создан и отправлен в обработку.</p>
      </div>
    );
  }

  if (!cart?.items?.length) {
    return (
      <div className="text-center py-16">
        <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Корзина пуста</h2>
        <p className="text-gray-600">Добавьте товары из каталога</p>
      </div>
    );
  }

  const totalAmount = cart.items.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <ShoppingCart className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Корзина</h1>
        </div>
        
        <button
          onClick={handleClearCart}
          className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Очистить корзину</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item, index) => (
            <CartItem key={`${item.productId}-${index}`} item={item} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Итого</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Товаров:</span>
                <span>{cart.items.reduce((total, item) => total + item.quantity, 0)} шт.</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                <span>К оплате:</span>
                <span>{totalAmount.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            <button
              onClick={handleCreateOrder}
              disabled={isOrdering}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CreditCard className="w-4 h-4" />
              <span>{isOrdering ? 'Оформляем...' : 'Оформить заказ'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;