import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import { CartProvider } from './context/CartContext';
import './index.css';

function App() {
  return (
      <CartProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/ui" element={<HomePage />} />
              <Route path="/ui/cart" element={<CartPage />} />
              <Route path="/ui/profile" element={<ProfilePage />} />
              <Route path="/ui/order/:orderId" element={<OrderDetailsPage />} />
            </Routes>
          </MainLayout>
        </Router>
      </CartProvider>
  );
}

export default App;
