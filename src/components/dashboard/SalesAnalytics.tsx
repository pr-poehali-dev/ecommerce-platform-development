import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const SalesAnalytics = () => {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://functions.poehali.dev/a3d1c7d9-d576-4e93-b98b-3a5891d94cca?period=${period}`
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Icon name="Loader2" size={48} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-600">Загрузка аналитики...</p>
        </div>
      </div>
    );
  }

  const currentData = data.charts;
  const stats = data.stats;
  const maxRevenue = Math.max(...currentData.revenue);
  const topProducts = data.topProducts;
  const recentOrders = data.recentOrders;

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
                <p className="text-2xl font-bold text-slate-800">{stats.totalRevenue.toLocaleString()} ₽</p>
                <p className="text-xs text-green-600 mt-2 flex items-center">
                  <Icon name="TrendingUp" size={12} className="mr-1" />
                  +{stats.revenueGrowth}% к предыдущему периоду
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
                <p className="text-2xl font-bold text-slate-800">{stats.totalOrders}</p>
                <p className="text-xs text-green-600 mt-2 flex items-center">
                  <Icon name="TrendingUp" size={12} className="mr-1" />
                  +{stats.ordersGrowth}% к предыдущему периоду
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
                <p className="text-2xl font-bold text-slate-800">{stats.avgOrderValue.toLocaleString()} ₽</p>
                <p className="text-xs text-green-600 mt-2 flex items-center">
                  <Icon name="TrendingUp" size={12} className="mr-1" />
                  +{stats.avgOrderGrowth}% к предыдущему периоду
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
                <p className="text-2xl font-bold text-slate-800">{stats.conversion}%</p>
                <p className={`text-xs mt-2 flex items-center ${stats.conversionGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <Icon name={stats.conversionGrowth >= 0 ? 'TrendingUp' : 'TrendingDown'} size={12} className="mr-1" />
                  {stats.conversionGrowth >= 0 ? '+' : ''}{stats.conversionGrowth}% к предыдущему периоду
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