import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const OrdersSection = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'orders', label: 'Заказы', icon: 'ShoppingCart' },
    { id: 'statuses', label: 'Статусы заказов', icon: 'Tags' },
    { id: 'delivery', label: 'Способы доставки', icon: 'Truck' },
    { id: 'payment', label: 'Способы оплаты', icon: 'CreditCard' },
    { id: 'export', label: 'Экспорт заказов', icon: 'Download' }
  ];

  const orders = [
    { id: '12345', customer: 'Иван Петров', phone: '+7 900 123 45 67', total: '5 200 ₽', status: 'new', date: '30 сент 2024', items: 3, payment: 'Наличными', delivery: 'Самовывоз' },
    { id: '12344', customer: 'Мария Сидорова', phone: '+7 901 234 56 78', total: '3 800 ₽', status: 'processing', date: '29 сент 2024', items: 2, payment: 'Картой онлайн', delivery: 'Курьер' },
    { id: '12343', customer: 'Алексей Иванов', phone: '+7 902 345 67 89', total: '7 500 ₽', status: 'completed', date: '28 сент 2024', items: 5, payment: 'Картой онлайн', delivery: 'Почта России' },
    { id: '12342', customer: 'Елена Смирнова', phone: '+7 903 456 78 90', total: '2 100 ₽', status: 'cancelled', date: '27 сент 2024', items: 1, payment: 'Наличными', delivery: 'Самовывоз' },
    { id: '12341', customer: 'Дмитрий Козлов', phone: '+7 904 567 89 01', total: '9 800 ₽', status: 'shipped', date: '26 сент 2024', items: 4, payment: 'Картой онлайн', delivery: 'СДЭК' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-100 text-green-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Новый';
      case 'processing': return 'В обработке';
      case 'shipped': return 'Отправлен';
      case 'completed': return 'Выполнен';
      case 'cancelled': return 'Отменен';
      default: return status;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         order.id.includes(searchQuery) ||
                         order.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Заказы</h2>
          <p className="text-slate-600">Управление заказами интернет-магазина</p>
        </div>
        <Button>
          <Icon name="Plus" size={18} className="mr-2" />
          Создать заказ
        </Button>
      </div>

      {/* Horizontal tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-white text-primary border-b-2 border-primary'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-gray-50'
              }`}
            >
              <Icon name={tab.icon as any} size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders list tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {/* Filters and search */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[250px]">
                  <Input 
                    placeholder="Поиск по номеру, имени или телефону..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">Все статусы</option>
                  <option value="new">Новые</option>
                  <option value="processing">В обработке</option>
                  <option value="shipped">Отправленные</option>
                  <option value="completed">Выполненные</option>
                  <option value="cancelled">Отмененные</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Statistics cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-green-700 font-medium">Новые</p>
                    <p className="text-2xl font-bold text-green-800">1</p>
                  </div>
                  <Icon name="ShoppingCart" size={32} className="text-green-600 opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-blue-700 font-medium">В обработке</p>
                    <p className="text-2xl font-bold text-blue-800">1</p>
                  </div>
                  <Icon name="Clock" size={32} className="text-blue-600 opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-purple-700 font-medium">Отправлено</p>
                    <p className="text-2xl font-bold text-purple-800">1</p>
                  </div>
                  <Icon name="Truck" size={32} className="text-purple-600 opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-700 font-medium">Выполнено</p>
                    <p className="text-2xl font-bold text-gray-800">1</p>
                  </div>
                  <Icon name="CheckCircle" size={32} className="text-gray-600 opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-red-700 font-medium">Отменено</p>
                    <p className="text-2xl font-bold text-red-800">1</p>
                  </div>
                  <Icon name="XCircle" size={32} className="text-red-600 opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">№</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Покупатель</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Товары</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Сумма</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Оплата</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Доставка</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дата</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredOrders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">#{order.id}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                          <div className="text-xs text-gray-500">{order.phone}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{order.items} шт.</td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.total}</td>
                        <td className="px-6 py-4 text-xs text-gray-600">{order.payment}</td>
                        <td className="px-6 py-4 text-xs text-gray-600">{order.delivery}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Icon name="Eye" size={16} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="Edit" size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Order statuses tab */}
      {activeTab === 'statuses' && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 text-sm text-slate-600 mb-6">
              <Icon name="Info" size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <p>
                Настройте статусы заказов для удобного отслеживания их выполнения. Вы можете добавить свои статусы и изменить порядок.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Новый', color: 'green', default: true },
                { name: 'В обработке', color: 'blue', default: true },
                { name: 'Отправлен', color: 'purple', default: true },
                { name: 'Выполнен', color: 'gray', default: true },
                { name: 'Отменен', color: 'red', default: true }
              ].map((status, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon name="GripVertical" size={20} className="text-slate-400 cursor-move" />
                    <div className={`w-4 h-4 rounded-full bg-${status.color}-500`}></div>
                    <span className="font-medium text-slate-800">{status.name}</span>
                    {status.default && (
                      <span className="text-xs text-slate-500">(системный)</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Icon name="Edit" size={16} />
                    </Button>
                    {!status.default && (
                      <Button variant="ghost" size="sm">
                        <Icon name="Trash2" size={16} className="text-red-600" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Button className="mt-6 w-full">
              <Icon name="Plus" size={18} className="mr-2" />
              Добавить статус
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Delivery methods tab */}
      {activeTab === 'delivery' && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 text-sm text-slate-600 mb-6">
              <Icon name="Info" size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <p>
                Настройте доступные способы доставки для покупателей. Можно указать стоимость и условия бесплатной доставки.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Самовывоз', price: 'Бесплатно', enabled: true, description: 'Забрать из магазина' },
                { name: 'Курьерская доставка', price: '300 ₽', enabled: true, description: 'По Москве в пределах МКАД' },
                { name: 'Почта России', price: 'от 200 ₽', enabled: true, description: 'По всей России' },
                { name: 'СДЭК', price: 'от 250 ₽', enabled: true, description: 'Доставка до пункта выдачи' }
              ].map((method, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-slate-800">{method.name}</h3>
                        <span className="text-sm font-semibold text-primary">{method.price}</span>
                      </div>
                      <p className="text-sm text-slate-600">{method.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={method.enabled} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                      <Button variant="ghost" size="sm">
                        <Icon name="Edit" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button className="mt-6 w-full">
              <Icon name="Plus" size={18} className="mr-2" />
              Добавить способ доставки
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Payment methods tab */}
      {activeTab === 'payment' && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 text-sm text-slate-600 mb-6">
              <Icon name="Info" size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <p>
                Настройте способы оплаты для покупателей. Можно подключить онлайн-платежи или принимать оплату при получении.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Наличными при получении', enabled: true, online: false },
                { name: 'Картой при получении', enabled: true, online: false },
                { name: 'Банковской картой онлайн', enabled: true, online: true, provider: 'ЮKassa' },
                { name: 'СБП (Система быстрых платежей)', enabled: false, online: true, provider: 'ЮKassa' },
                { name: 'Электронные кошельки', enabled: false, online: true, provider: 'ЮMoney' }
              ].map((method, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-slate-800">{method.name}</h3>
                        {method.online && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                            Онлайн
                          </span>
                        )}
                      </div>
                      {method.provider && (
                        <p className="text-xs text-slate-500">Через {method.provider}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={method.enabled} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                      <Button variant="ghost" size="sm">
                        <Icon name="Settings" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 font-medium mb-2">Подключить онлайн-платежи</p>
              <p className="text-sm text-blue-700 mb-3">Принимайте оплату картами и электронными кошельками через платежные системы.</p>
              <Button variant="outline" className="w-full">
                <Icon name="Link" size={18} className="mr-2" />
                Подключить платежную систему
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Export tab */}
      {activeTab === 'export' && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 text-sm text-slate-600 mb-6">
              <Icon name="Info" size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <p>
                Экспортируйте заказы в различных форматах для анализа, отчетности или интеграции с другими системами.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Период экспорта</label>
                <div className="flex gap-2">
                  <Input type="date" defaultValue="2024-09-01" />
                  <Input type="date" defaultValue="2024-09-30" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Статус заказов</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>Все статусы</option>
                  <option>Только новые</option>
                  <option>В обработке</option>
                  <option>Выполненные</option>
                  <option>Отмененные</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Формат файла</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <Icon name="FileSpreadsheet" size={32} className="text-green-600" />
                    <span className="font-medium">Excel (XLSX)</span>
                    <span className="text-xs text-slate-500">Для Excel и Google Sheets</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <Icon name="FileText" size={32} className="text-blue-600" />
                    <span className="font-medium">CSV</span>
                    <span className="text-xs text-slate-500">Универсальный формат</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <Icon name="FileJson" size={32} className="text-purple-600" />
                    <span className="font-medium">JSON</span>
                    <span className="text-xs text-slate-500">Для разработчиков</span>
                  </Button>
                </div>
              </div>

              <Button className="w-full" size="lg">
                <Icon name="Download" size={18} className="mr-2" />
                Экспортировать заказы
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrdersSection;