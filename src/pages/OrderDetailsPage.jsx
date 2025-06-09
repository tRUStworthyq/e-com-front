import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, Calendar, CreditCard } from 'lucide-react';
import {getOrder} from "../services/orderService";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
        const fetchOrder = async () => {
          try {
            const orderData = await getOrder(orderId);
            setOrder(orderData);
          } catch (error) {
            console.error('Error fetching order details:', error);
            setOrder(null);
          } finally {
            setLoading(false);
          }
        };
    fetchOrder();
  }, [orderId]);

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

  if (!order) {
    return (
      <div className="text-center py-16">
        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Заказ не найден</h2>
        <Link to="/ui/profile" className="text-blue-600 hover:text-blue-700">
          Вернуться к профилю
        </Link>
      </div>
    );
  }

  const totalOrderPrice = order.items.reduce(
      (total, item) => total + (Number(item.price) * item.quantity),
      0
  )

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/ui/profile"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад к профилю</span>
        </Link>
        
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Заказ #{order.id.toString().slice(-8)}
          </h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
            {getStatusText(order.status)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Товары в заказе</h2>
            
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={`${item.productId}-${index}`} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {Number(item.price).toLocaleString('ru-RU')} ₽ × {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      {(Number(item.price) * item.quantity).toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Информация о заказе</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Дата создания:</span>
                  <span className="font-medium">
                    {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Package className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Товаров:</span>
                  <span className="font-medium">
                    {order.items.reduce((total, item) => total + item.quantity, 0)} шт.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-xl font-bold text-gray-900">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Итого:</span>
                </div>
                <span>{totalOrderPrice.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;