import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Home } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const location = useLocation();
  const { cart } = useCart();
  
  const cartItemsCount = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/ui/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">TechStore</span>
          </Link>
          
          <nav className="flex items-center space-x-8">
            <Link
              to="/ui/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Товары</span>
            </Link>
            
            <Link
              to="/ui/cart"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors relative ${
                isActive('/cart') 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Корзина</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            <Link
              to="/ui/profile"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/profile') 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Профиль</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;