import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import GeneralSettings from '@/components/dashboard/GeneralSettings';
import OrdersSection from '@/components/dashboard/OrdersSection';
import ProductsSection from '@/components/dashboard/ProductsSection';
import DesignSection from '@/components/dashboard/DesignSection';

const Dashboard = () => {
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
      case 'templates':
        return <DesignSection />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        activeSection={activeSection}
        openSections={openSections}
        menuSections={menuSections}
        onToggleSection={toggleSection}
        onSetActiveSection={setActiveSection}
      />

      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Header
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};



export default Dashboard;