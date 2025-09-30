import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const SalesAnalytics = () => {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

  const salesData = {
    week: {
      labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      revenue: [12000, 19000, 15000, 22000, 18000, 25000, 28000],
      orders: [8, 12, 10, 15, 11, 18, 20]
    },
    month: {
      labels: ['Нед 1', 'Нед 2', 'Нед 3', 'Нед 4'],
      revenue: [85000, 92000, 78000, 105000],
      orders: [54, 62, 48, 70]
    },
    year: {
      labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      revenue: [320000, 350000, 380000, 420000, 450000, 480000, 520000, 490000, 510000, 540000, 580000, 620000],
      orders: [210, 230, 250, 280, 290, 310, 340, 320, 330, 350, 380, 410]
    }
  };

  const currentData = salesData[period];
  const maxRevenue = Math.max(...currentData.revenue);
  const totalRevenue = currentData.revenue.reduce((a, b) => a + b, 0);
  const totalOrders = currentData.orders.reduce((a, b) => a + b, 0);
  const avgOrderValue = Math.round(totalRevenue / totalOrders);

  const topProducts = [
    { name: 'Шар фольгированный "Сердце"', sales: 234, revenue: 35100 },
    { name: 'Набор "День рождения"', sales: 189, revenue: 168210 },
    { name: 'Цифра 5 большая', sales: 156, revenue: 101400 },
    { name: 'Букет из шаров "Радуга"', sales: 134, revenue: 120600 },
    { name: 'Шар с гелием обычный', sales: 112, revenue: 16800 }
  ];

  const recentOrders = [
    { id: '#2847', customer: 'Анна Петрова', amount: 1250, status: 'completed', date: '30.09.2024' },
    { id: '#2846', customer: 'Иван Сидоров', amount: 890, status: 'processing', date: '30.09.2024' },
    { id: '#2845', customer: 'Мария Иванова', amount: 2340, status: 'completed', date: '29.09.2024' },
    { id: '#2844', customer: 'Петр Козлов', amount: 650, status: 'completed', date: '29.09.2024' },
    { id: '#2843', customer: 'Ольга Смирнова', amount: 1780, status: 'cancelled', date: '28.09.2024' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Выполнен';
      case 'processing': return 'В работе';
      case 'cancelled': return 'Отменен';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Аналитика продаж</h2>
          <p className="text-sm text-slate-600 mt-1">Статистика и отчеты по продажам</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} className="mr-2" />
            Экспорт
          </Button>
          <Button size="sm">
            <Icon name="FileText" size={16} className="mr-2" />
            Отчет
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Выручка</p>
                <p className="text-2xl font-bold text-slate-800">{totalRevenue.toLocaleString()} ₽</p>
                <p className="text-xs text-green-600 mt-2 flex items-center">
                  <Icon name="TrendingUp" size={12} className="mr-1" />
                  +12.5% к предыдущему периоду
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Icon name="DollarSign" size={24} className="text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Заказы</p>
                <p className="text-2xl font-bold text-slate-800">{totalOrders}</p>
                <p className="text-xs text-green-600 mt-2 flex items-center">
                  <Icon name="TrendingUp" size={12} className="mr-1" />
                  +8.3% к предыдущему периоду
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Icon name="ShoppingBag" size={24} className="text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Средний чек</p>
                <p className="text-2xl font-bold text-slate-800">{avgOrderValue.toLocaleString()} ₽</p>
                <p className="text-xs text-green-600 mt-2 flex items-center">
                  <Icon name="TrendingUp" size={12} className="mr-1" />
                  +4.1% к предыдущему периоду
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Icon name="CreditCard" size={24} className="text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Конверсия</p>
                <p className="text-2xl font-bold text-slate-800">3.2%</p>
                <p className="text-xs text-red-600 mt-2 flex items-center">
                  <Icon name="TrendingDown" size={12} className="mr-1" />
                  -1.2% к предыдущему периоду
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Icon name="Percent" size={24} className="text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>График выручки</CardTitle>
              <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setPeriod('week')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    period === 'week' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                  }`}
                >
                  Неделя
                </button>
                <button
                  onClick={() => setPeriod('month')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    period === 'month' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                  }`}
                >
                  Месяц
                </button>
                <button
                  onClick={() => setPeriod('year')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    period === 'year' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                  }`}
                >
                  Год
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentData.labels.map((label, index) => (
                <div key={label} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{label}</span>
                    <span className="font-semibold text-slate-800">
                      {currentData.revenue[index].toLocaleString()} ₽
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${(currentData.revenue[index] / maxRevenue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Orders Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Количество заказов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentData.labels.map((label, index) => (
                <div key={label} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{label}</span>
                    <span className="font-semibold text-slate-800">
                      {currentData.orders[index]} заказов
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${(currentData.orders[index] / Math.max(...currentData.orders)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Топ товаров</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{product.name}</p>
                    <p className="text-xs text-slate-500">{product.sales} продаж</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-800">
                      {product.revenue.toLocaleString()} ₽
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Последние заказы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-slate-800">{order.id}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{order.customer} • {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-800">
                      {order.amount.toLocaleString()} ₽
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesAnalytics;