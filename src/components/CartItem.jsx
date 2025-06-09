import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.productId, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.productId, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.productId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-500 text-sm">Фото</span>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {item.name}
          </h3>
          <p className="text-xl font-bold text-blue-600">
            {Number(item.price).toLocaleString('ru-RU')} ₽
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleDecrement}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            disabled={item.quantity <= 1}
          >
            <Minus className="w-4 h-4 text-gray-600" />
          </button>
          
          <span className="text-lg font-medium text-gray-900 min-w-[2rem] text-center">
            {item.quantity}
          </span>
          
          <button
            onClick={handleIncrement}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">
            {(Number(item.price) * item.quantity).toLocaleString('ru-RU')} ₽
          </p>
        </div>
        
        <button
          onClick={handleRemove}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;