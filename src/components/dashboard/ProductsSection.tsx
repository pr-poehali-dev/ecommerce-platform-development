import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import CategoriesManager from './CategoriesManager';
import ImportExportManager from './ImportExportManager';

const ProductsSection = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const tabs = [
    { id: 'products', label: 'Товары', icon: 'Package' },
    { id: 'categories', label: 'Категории', icon: 'FolderTree' },
    { id: 'attributes', label: 'Характеристики', icon: 'ListTree' },
    { id: 'import', label: 'Импорт товаров', icon: 'Upload' },
    { id: 'export', label: 'Экспорт товаров', icon: 'Download' }
  ];

  const products = [
    { 
      id: 1, 
      name: 'Воздушный шар "Сердце"', 
      price: '150 ₽', 
      oldPrice: '200 ₽',
      category: 'Шары',
      stock: 45,
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop',
      available: true
    },
    { 
      id: 2, 
      name: 'Набор шаров "С днем рождения"', 
      price: '890 ₽',
      category: 'Наборы',
      stock: 12,
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=400&fit=crop',
      available: true
    },
    { 
      id: 3, 
      name: 'Цифра из шаров "5"', 
      price: '650 ₽',
      category: 'Цифры',
      stock: 8,
      image: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=400&h=400&fit=crop',
      available: true
    },
    { 
      id: 4, 
      name: 'Фигура из шаров "Единорог"', 
      price: '1 200 ₽',
      category: 'Фигуры',
      stock: 3,
      image: 'https://images.unsplash.com/photo-1515036551567-bf1198cccc35?w=400&h=400&fit=crop',
      available: true
    },
    { 
      id: 5, 
      name: 'Букет из шаров "Яркий"', 
      price: '450 ₽',
      category: 'Букеты',
      stock: 0,
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=400&fit=crop',
      available: false
    },
    { 
      id: 6, 
      name: 'Гелиевые шары "Металлик"', 
      price: '80 ₽',
      category: 'Шары',
      stock: 120,
      image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=400&h=400&fit=crop',
      available: true
    }
  ];

  const categories = [
    { id: 1, name: 'Шары', count: 45, icon: 'Circle' },
    { id: 2, name: 'Наборы', count: 12, icon: 'Package' },
    { id: 3, name: 'Цифры', count: 10, icon: 'Hash' },
    { id: 4, name: 'Фигуры', count: 8, icon: 'Star' },
    { id: 5, name: 'Букеты', count: 15, icon: 'Flower2' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Товары</h2>
          <p className="text-slate-600">Управление каталогом товаров магазина</p>
        </div>
        <Button>
          <Icon name="Plus" size={18} className="mr-2" />
          Добавить товар
        </Button>
      </div>

      {/* Tabs */}
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

      {/* Products tab */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[250px]">
                  <Input 
                    placeholder="Поиск товаров по названию..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <select 
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">Все категории</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
                <Button variant="outline">
                  <Icon name="Filter" size={16} className="mr-2" />
                  Фильтры
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-blue-700 font-medium">Всего товаров</p>
                    <p className="text-2xl font-bold text-blue-800">90</p>
                  </div>
                  <Icon name="Package" size={32} className="text-blue-600 opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-green-700 font-medium">В наличии</p>
                    <p className="text-2xl font-bold text-green-800">85</p>
                  </div>
                  <Icon name="CheckCircle" size={32} className="text-green-600 opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-red-700 font-medium">Нет в наличии</p>
                    <p className="text-2xl font-bold text-red-800">5</p>
                  </div>
                  <Icon name="AlertCircle" size={32} className="text-red-600 opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-purple-700 font-medium">Категорий</p>
                    <p className="text-2xl font-bold text-purple-800">5</p>
                  </div>
                  <Icon name="FolderTree" size={32} className="text-purple-600 opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    {!product.available && (
                      <div className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
                        Нет в наличии
                      </div>
                    )}
                    {product.oldPrice && (
                      <div className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded">
                        Скидка
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-xs text-slate-500">{product.category}</span>
                    <h3 className="font-semibold text-slate-800 line-clamp-2">{product.name}</h3>
                  </div>
                  
                  <div className="flex items-baseline gap-2 mb-2">
                    <p className="text-xl font-bold text-primary">{product.price}</p>
                    {product.oldPrice && (
                      <p className="text-sm text-slate-400 line-through">{product.oldPrice}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4 text-sm text-slate-600">
                    <Icon name="Package" size={14} />
                    <span>На складе: {product.stock} шт.</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Icon name="Edit" size={14} className="mr-1" />
                      Редактировать
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Copy" size={14} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Trash2" size={14} className="text-red-600" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Categories tab */}
      {activeTab === 'categories' && <CategoriesManager />}

      {/* Attributes tab */}
      {activeTab === 'attributes' && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 text-sm text-slate-600 mb-6">
              <Icon name="Info" size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <p>
                Характеристики помогают покупателям выбрать товар. Например: размер, цвет, материал, вес и т.д.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Размер', values: ['Маленький', 'Средний', 'Большой'], type: 'select' },
                { name: 'Цвет', values: ['Красный', 'Синий', 'Зеленый', 'Желтый', 'Розовый'], type: 'color' },
                { name: 'Материал', values: ['Латекс', 'Фольга', 'Пластик'], type: 'select' },
                { name: 'С гелием', values: ['Да', 'Нет'], type: 'boolean' }
              ].map((attr, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-slate-800">{attr.name}</h3>
                      <p className="text-sm text-slate-500">{attr.type === 'select' ? 'Выбор из списка' : attr.type === 'color' ? 'Цвет' : 'Да/Нет'}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="Trash2" size={16} className="text-red-600" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {attr.values.map((value, i) => (
                      <span key={i} className="px-2 py-1 bg-white rounded text-xs font-medium text-slate-700 border">
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Button className="mt-6 w-full">
              <Icon name="Plus" size={18} className="mr-2" />
              Добавить характеристику
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Import tab */}
      {activeTab === 'import' && <ImportExportManager />}

      {/* Export tab */}
      {activeTab === 'export' && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 text-sm text-slate-600 mb-6">
              <Icon name="Info" size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <p>
                Экспортируйте все товары или выбранные категории в различных форматах для анализа или переноса в другие системы.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Выберите категории для экспорта</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Все товары</span>
                  </label>
                  {categories.map(cat => (
                    <label key={cat.id} className="flex items-center gap-2 ml-6">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{cat.name} ({cat.count})</span>
                    </label>
                  ))}
                </div>
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

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Дополнительные опции</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Включить изображения (URL)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Включить характеристики</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Только товары в наличии</span>
                  </label>
                </div>
              </div>

              <Button className="w-full" size="lg">
                <Icon name="Download" size={18} className="mr-2" />
                Экспортировать товары
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductsSection;