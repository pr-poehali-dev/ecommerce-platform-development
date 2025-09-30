import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('general');
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    main: true,
    design: true,
    shop: true,
    modules: true,
    marketing: true,
    help: true
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const menuSections = [
    {
      id: 'main',
      title: 'Главная',
      icon: 'Home',
      items: [
        { id: 'general', label: 'Общие настройки', icon: 'Settings' },
        { id: 'pages', label: 'Страницы сайта', icon: 'FileText' },
        { id: 'menu', label: 'Меню сайта', icon: 'Menu' },
        { id: 'files', label: 'Файлы', icon: 'Folder' }
      ]
    },
    {
      id: 'design',
      title: 'Дизайн сайта',
      icon: 'Palette',
      items: [
        { id: 'templates', label: 'Варианты оформления', icon: 'Layout' },
        { id: 'images', label: 'Изображения', icon: 'Image' },
        { id: 'editor', label: 'Визуальный редактор', icon: 'Edit' }
      ]
    },
    {
      id: 'shop',
      title: 'Мой магазин',
      icon: 'ShoppingCart',
      items: [
        { id: 'categories', label: 'Разделы каталога', icon: 'List' },
        { id: 'products', label: 'Товары', icon: 'Package' },
        { id: 'orders', label: 'Заказы', icon: 'ShoppingBag' },
        { id: 'import', label: 'Импорт/Экспорт', icon: 'Download' },
        { id: 'shop-settings', label: 'Настройки магазина', icon: 'Settings' }
      ]
    },
    {
      id: 'modules',
      title: 'Доп. модули',
      icon: 'Grid',
      items: [
        { id: 'news', label: 'Лента новостей', icon: 'Newspaper' },
        { id: 'articles', label: 'Каталог статей', icon: 'BookOpen' },
        { id: 'search', label: 'Поиск', icon: 'Search' },
        { id: 'forms', label: 'Формы обратной связи', icon: 'MessageSquare' },
        { id: 'users', label: 'Пользователи', icon: 'Users' },
        { id: 'gallery', label: 'Фотогалерея', icon: 'Camera' },
        { id: 'telegram', label: 'Магазин в Telegram', icon: 'Send' },
        { id: 'mobile', label: 'Мобильное приложение', icon: 'Smartphone' }
      ]
    },
    {
      id: 'marketing',
      title: 'Реклама',
      icon: 'TrendingUp',
      items: [
        { id: 'social', label: 'Соцсети', icon: 'Share2' },
        { id: 'marketplaces', label: 'Маркетплейсы', icon: 'Store' },
        { id: 'email', label: 'E-mail рассылки', icon: 'Mail' }
      ]
    },
    {
      id: 'help',
      title: 'Помощь',
      icon: 'HelpCircle',
      items: [
        { id: 'support', label: 'Техподдержка', icon: 'MessageCircle' },
        { id: 'docs', label: 'Справка', icon: 'Book' }
      ]
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return <GeneralSettings />;
      case 'orders':
        return <OrdersSection />;
      case 'products':
        return <ProductsSection />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-800 to-slate-900 text-white transition-all duration-300 z-40 ${
          sidebarOpen ? 'w-64' : 'w-0 -translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-orange-500 rounded-xl flex items-center justify-center">
              <Icon name="Layers" className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold">SiteBuilder</span>
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-180px)] p-4">
          {menuSections.map(section => (
            <div key={section.id} className="mb-2">
              <div
                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 cursor-pointer transition-colors"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center gap-3">
                  <Icon name={section.icon as any} size={18} />
                  <span className="font-medium text-sm">{section.title}</span>
                </div>
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className={`transition-transform ${openSections[section.id] ? 'rotate-90' : ''}`}
                />
              </div>
              {openSections[section.id] && (
                <div className="ml-4 mt-1 space-y-1">
                  {section.items.map(item => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-2 p-2 pl-4 rounded-lg cursor-pointer transition-colors text-sm ${
                        activeSection === item.id
                          ? 'bg-primary/20 text-white'
                          : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                      }`}
                      onClick={() => setActiveSection(item.id)}
                    >
                      <Icon name={item.icon as any} size={14} />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700 bg-slate-900">
          <div className="text-xs space-y-2">
            <div className="flex justify-between text-slate-400">
              <span>На счету:</span>
              <span className="text-red-400 font-semibold">42 руб</span>
            </div>
            <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
              Пополнить
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Icon name="Menu" size={24} />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Магазин</h1>
                <a 
                  href="https://myshop.ru" 
                  target="_blank" 
                  className="text-sm text-blue-600 hover:underline"
                >
                  myshop.ru
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <span className="text-slate-600">Новых заказов:</span>
                <span className="ml-2 font-semibold text-green-600">3</span>
              </div>
              <Button variant="ghost" size="icon">
                <Icon name="Bell" size={20} />
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="text-red-600 hover:text-red-700"
              >
                Выход
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const GeneralSettings = () => {
  const [expandedBlocks, setExpandedBlocks] = useState<{ [key: string]: boolean }>({
    account: true,
    password: true,
    auth: true,
    domain: true,
    watermark: true
  });

  const toggleBlock = (block: string) => {
    setExpandedBlocks(prev => ({ ...prev, [block]: !prev[block] }));
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Общие настройки</h2>
        <p className="text-slate-600">Управление основными параметрами магазина</p>
      </div>

      <div className="space-y-4">
        {/* Настройки аккаунта */}
        <Card>
          <CardHeader 
            className="cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleBlock('account')}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Icon 
                  name={expandedBlocks.account ? 'Minus' : 'Plus'} 
                  size={20} 
                  className="text-slate-600"
                />
                Настройки аккаунта
              </CardTitle>
            </div>
          </CardHeader>
          {expandedBlocks.account && (
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Логин</Label>
                <div className="text-slate-600 font-medium">myshop123</div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" defaultValue="shop@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон моб.</Label>
                <Input id="phone" type="tel" defaultValue="+7 900 123 45 67" />
                <p className="text-xs text-green-600">номер подтвержден</p>
              </div>
              <Button>Сохранить</Button>
            </CardContent>
          )}
        </Card>

        {/* Смена пароля */}
        <Card>
          <CardHeader 
            className="cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleBlock('password')}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Icon 
                  name={expandedBlocks.password ? 'Minus' : 'Plus'} 
                  size={20} 
                  className="text-slate-600"
                />
                Смена пароля
              </CardTitle>
            </div>
          </CardHeader>
          {expandedBlocks.password && (
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">Новый пароль</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Пароль еще раз</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="old-password">Старый пароль</Label>
                <Input id="old-password" type="password" />
              </div>
              <Button>Сохранить</Button>
            </CardContent>
          )}
        </Card>

        {/* Отдельный домен */}
        <Card>
          <CardHeader 
            className="cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleBlock('domain')}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Icon 
                  name={expandedBlocks.domain ? 'Minus' : 'Plus'} 
                  size={20} 
                  className="text-slate-600"
                />
                Отдельный домен
              </CardTitle>
            </div>
          </CardHeader>
          {expandedBlocks.domain && (
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="domain">Отдельный домен</Label>
                <Input id="domain" defaultValue="myshop.ru" />
                <p className="text-xs text-green-600">подключен</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                <p className="font-medium mb-2">Для прикрепления домена укажите DNS:</p>
                <div className="font-mono text-xs space-y-1">
                  <div>ns1.alltrades.site</div>
                  <div>ns2.alltrades.site</div>
                </div>
              </div>
              <Button>Сохранить</Button>
            </CardContent>
          )}
        </Card>

        {/* Водяной знак */}
        <Card>
          <CardHeader 
            className="cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleBlock('watermark')}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Icon 
                  name={expandedBlocks.watermark ? 'Minus' : 'Plus'} 
                  size={20} 
                  className="text-slate-600"
                />
                Качество изображений и водяной знак
              </CardTitle>
            </div>
          </CardHeader>
          {expandedBlocks.watermark && (
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Водяной знак</Label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>Нет</option>
                  <option>В левом верхнем углу</option>
                  <option>В правом верхнем углу</option>
                  <option>В центре</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Качество (1-100)</Label>
                <Input type="number" defaultValue="90" min="1" max="100" />
              </div>
              <Button>Сохранить</Button>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

const OrdersSection = () => {
  const orders = [
    { id: '12345', customer: 'Иван Петров', total: '5 200 ₽', status: 'new', date: '30 сент 2024' },
    { id: '12344', customer: 'Мария Сидорова', total: '3 800 ₽', status: 'processing', date: '29 сент 2024' },
    { id: '12343', customer: 'Алексей Иванов', total: '7 500 ₽', status: 'completed', date: '28 сент 2024' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-100 text-green-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Новый';
      case 'processing': return 'В обработке';
      case 'completed': return 'Выполнен';
      default: return status;
    }
  };

  return (
    <div className="max-w-6xl">
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

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">№ Заказа</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Покупатель</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Сумма</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дата</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">#{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{order.customer}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm">
                        <Icon name="Eye" size={16} className="mr-2" />
                        Открыть
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ProductsSection = () => {
  return (
    <div className="max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Товары</h2>
          <p className="text-slate-600">Управление каталогом товаров</p>
        </div>
        <Button>
          <Icon name="Plus" size={18} className="mr-2" />
          Добавить товар
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <Card key={i} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="font-semibold mb-2">Товар {i}</h3>
              <p className="text-2xl font-bold text-primary mb-4">2 500 ₽</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Icon name="Edit" size={14} className="mr-1" />
                  Редактировать
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;