import React, { useState, useEffect } from 'react';
import { User, Package, Calendar, X } from 'lucide-react';
import { getUsername } from '../services/userService';
import { getOrders, cancelOrder } from '../services/orderService';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usernameData, ordersData] = await Promise.all([
          getUsername(),
          getOrders()
        ]);
        
        setUsername(usernameData);
        setOrders(ordersData.content || ordersData || []);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setUsername('Пользователь');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Вы уверены, что хотите отменить заказ?')) {
      try {
        await cancelOrder(orderId);
        setOrders(orders.filter(order => order.id !== orderId));
      } catch (error) {
        console.error('Error canceling order:', error);
        alert('Ошибка при отмене заказа');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'created':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'В обработке';
      case 'created':
        return 'Создан';
      default:
        return status || 'В обработке';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }


  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Профиль</h1>
            <p className="text-gray-600">Добро пожаловать, {username}!</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Package className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Мои заказы</h2>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">У вас пока нет заказов</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const totalOrderPrice = order.items?.reduce(
              (total, item) => total + (Number(item.price) * item.quantity),
              0
              ) || 0;
              return (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-900">
                      Заказ #{order.id.toString().slice(-8)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(order.createdAt).toLocaleDateString('ru-RU')}</span>
                    </div>
                    
                    {order.status?.toLowerCase() !== 'cancelled' && order.status?.toLowerCase() !== 'отменен' && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                        title="Отменить заказ"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  {order.items?.map((item, index) => (
                    <div key={`${item.productId}-${index}`} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        {(Number(item.price) * item.quantity).toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <Link
                    to={`/ui/order/${order.id}`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Подробнее
                  </Link>
                  <span className="font-bold text-gray-900">
                    Итого: {totalOrderPrice.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>
            )})}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;