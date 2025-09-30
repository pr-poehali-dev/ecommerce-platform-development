import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ShopModuleProps {
  onNavigate: (section: string) => void;
}

const ShopModule = ({ onNavigate }: ShopModuleProps) => {
  const modules = [
    {
      id: 'categories',
      title: 'Разделы каталога',
      description: 'Управление разделами каталога товаров для интернет-магазина.',
      icon: 'FolderTree',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'products',
      title: 'Товары',
      description: 'Управление товарами. Их можно добавлять либо здесь, либо в разделе Импорт/экспорт путем загрузки файлов или экспорта из других систем',
      icon: 'Package',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'orders',
      title: 'Заказы',
      description: 'В этом разделе происходит управление поступающими заказами.',
      icon: 'ShoppingBag',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'import',
      title: 'Импорт/Экспорт',
      description: 'Раздел с различными методами импорта/экспорта и синхронизации с внешними сервисами.',
      icon: 'Download',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'shop-settings',
      title: 'Настройки магазина',
      description: 'Здесь можно настроить поля товаров, заказов, валюту сайта, шаблоны уведомлений и многое другое.',
      icon: 'Settings',
      color: 'from-slate-500 to-slate-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="p-3 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
          <Icon name="ShoppingCart" size={32} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Интернет-магазин</h1>
          <p className="text-sm text-slate-600">Управление каталогом, товарами и заказами</p>
        </div>
      </div>

      {/* Module cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Card 
            key={module.id}
            className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
            onClick={() => onNavigate(module.id)}
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Icon */}
                <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                  <Icon 
                    name={module.icon as any} 
                    size={64} 
                    className="text-white"
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-primary transition-colors">
                  {module.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed min-h-[60px]">
                  {module.description}
                </p>

                {/* Arrow indicator */}
                <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="ArrowRight" size={20} className="text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon name="FolderTree" size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">22</p>
                <p className="text-xs text-slate-600">Разделов</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Icon name="Package" size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">156</p>
                <p className="text-xs text-slate-600">Товаров</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Icon name="ShoppingBag" size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">48</p>
                <p className="text-xs text-slate-600">Заказов</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Icon name="TrendingUp" size={24} className="text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">324K ₽</p>
                <p className="text-xs text-slate-600">Оборот</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Icon name="Clock" size={20} />
            Последние действия
          </h3>
          <div className="space-y-3">
            {[
              { icon: 'ShoppingBag', text: 'Новый заказ #1247 на сумму 8 450 ₽', time: '5 минут назад', color: 'text-green-600' },
              { icon: 'Package', text: 'Добавлен товар "Воздушный шар Сердце"', time: '2 часа назад', color: 'text-blue-600' },
              { icon: 'Edit', text: 'Обновлены цены в категории "Цифры"', time: '3 часа назад', color: 'text-orange-600' },
              { icon: 'CheckCircle', text: 'Заказ #1245 выполнен', time: 'вчера', color: 'text-purple-600' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <Icon name={activity.icon as any} size={20} className={activity.color} />
                <div className="flex-1">
                  <p className="text-sm text-slate-700">{activity.text}</p>
                  <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShopModule;