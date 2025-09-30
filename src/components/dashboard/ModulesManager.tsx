import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Module {
  id: number;
  name: string;
  icon: string;
  description: string;
  isActive: boolean;
  category: 'shop' | 'content' | 'communication' | 'marketing' | 'integration';
}

const ModulesManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const modules: Module[] = [
    {
      id: 8,
      name: 'Интернет-магазин',
      icon: 'ShoppingCart',
      description: 'Полнофункциональный интернет-магазин с каталогом, корзиной и оформлением заказов',
      isActive: true,
      category: 'shop'
    },
    {
      id: 1,
      name: 'Лента новостей',
      icon: 'Newspaper',
      description: 'Публикация новостей и анонсов на сайте',
      isActive: true,
      category: 'content'
    },
    {
      id: 2,
      name: 'Каталог статей',
      icon: 'FileText',
      description: 'Система управления статьями и информационными материалами',
      isActive: true,
      category: 'content'
    },
    {
      id: 5,
      name: 'Поиск',
      icon: 'Search',
      description: 'Поиск по содержимому сайта',
      isActive: true,
      category: 'content'
    },
    {
      id: 9,
      name: 'Формы обратной связи',
      icon: 'Mail',
      description: 'Формы для связи с клиентами и сбора обращений',
      isActive: true,
      category: 'communication'
    },
    {
      id: 10,
      name: 'Пользователи',
      icon: 'Users',
      description: 'Система регистрации и управления пользователями',
      isActive: true,
      category: 'content'
    },
    {
      id: 12,
      name: 'Опросы',
      icon: 'BarChart3',
      description: 'Создание опросов и голосований',
      isActive: false,
      category: 'marketing'
    },
    {
      id: 13,
      name: 'Фотогалерея',
      icon: 'Image',
      description: 'Размещение фотографий в галереях и альбомах',
      isActive: true,
      category: 'content'
    },
    {
      id: 15,
      name: 'Рассылки по email',
      icon: 'Send',
      description: 'Email-маркетинг и массовые рассылки',
      isActive: false,
      category: 'marketing'
    },
    {
      id: 17,
      name: 'Онлайн-консультант',
      icon: 'MessageCircle',
      description: 'Онлайн-чат для консультации клиентов',
      isActive: true,
      category: 'communication'
    },
    {
      id: 35,
      name: 'Магазин в Telegram',
      icon: 'MessageSquare',
      description: 'Telegram-бот для приема заказов',
      isActive: false,
      category: 'integration'
    },
    {
      id: 36,
      name: 'Мобильное приложение',
      icon: 'Smartphone',
      description: 'Мобильное приложение для iOS и Android',
      isActive: false,
      category: 'integration'
    },
    {
      id: 37,
      name: 'Магазины на поддоменах',
      icon: 'Globe',
      description: 'Создание филиалов магазина на отдельных доменах',
      isActive: false,
      category: 'shop'
    },
    {
      id: 34,
      name: 'Мультиязычность',
      icon: 'Languages',
      description: 'Поддержка нескольких языков интерфейса',
      isActive: false,
      category: 'content'
    }
  ];

  const categories = [
    { id: 'all', name: 'Все модули', icon: 'Grid3x3' },
    { id: 'shop', name: 'Магазин', icon: 'ShoppingCart' },
    { id: 'content', name: 'Контент', icon: 'FileText' },
    { id: 'communication', name: 'Коммуникации', icon: 'MessageCircle' },
    { id: 'marketing', name: 'Маркетинг', icon: 'TrendingUp' },
    { id: 'integration', name: 'Интеграции', icon: 'Plug' }
  ];

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || module.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const activeModulesCount = modules.filter(m => m.isActive).length;

  const handleModuleClick = (moduleId: number) => {
    console.log('Opening module:', moduleId);
    alert(`Открытие модуля #${moduleId}`);
  };

  const handleToggleModule = (moduleId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const module = modules.find(m => m.id === moduleId);
    if (module) {
      if (module.isActive) {
        if (confirm(`Отключить модуль "${module.name}"?`)) {
          alert(`Модуль "${module.name}" отключен`);
        }
      } else {
        alert(`Модуль "${module.name}" включен`);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Модули сайта</h2>
          <p className="text-sm text-slate-600 mt-1">
            Активно: {activeModulesCount} из {modules.length}
          </p>
        </div>
      </div>

      {/* Search and filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Поиск модулей..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              selectedCategory === category.id
                ? 'bg-primary text-white'
                : 'bg-white text-slate-700 hover:bg-slate-50 border'
            }`}
          >
            <Icon name={category.icon as any} size={16} />
            {category.name}
          </button>
        ))}
      </div>

      {/* Modules grid */}
      {filteredModules.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredModules.map((module) => (
            <Card
              key={module.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                !module.isActive ? 'opacity-60' : ''
              }`}
              onClick={() => handleModuleClick(module.id)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${
                    module.isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    <Icon name={module.icon as any} size={40} />
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">
                      {module.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {module.description}
                    </p>
                  </div>

                  {/* Status badge */}
                  <div className="flex items-center gap-2 pt-2">
                    {module.isActive ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                        Активен
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5"></span>
                        Отключен
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="w-full pt-2 border-t">
                    <Button
                      size="sm"
                      variant={module.isActive ? 'outline' : 'default'}
                      className="w-full"
                      onClick={(e) => handleToggleModule(module.id, e)}
                    >
                      {module.isActive ? (
                        <>
                          <Icon name="Settings" size={14} className="mr-2" />
                          Настроить
                        </>
                      ) : (
                        <>
                          <Icon name="Power" size={14} className="mr-2" />
                          Включить
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Icon name="SearchX" size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">Модули не найдены</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Сбросить фильтры
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Info block */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Icon name="Info" size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-slate-700">
              <p className="font-medium mb-1">Управление модулями</p>
              <p className="text-slate-600">
                Модули позволяют расширить функциональность сайта. Включайте только необходимые модули 
                для оптимальной производительности.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModulesManager;