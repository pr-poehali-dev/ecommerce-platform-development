import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface Category {
  id: string;
  name: string;
  url?: string;
  position: number;
  visible: boolean;
  parentId: string | null;
  subcategoriesCount?: number;
  productsCount?: number;
}

const CategoriesManager = () => {
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [currentParentId, setCurrentParentId] = useState<string | null>(null);
  const [editingPosition, setEditingPosition] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const categories: Category[] = [
    { id: '938185508846', name: 'Подростковый 2025', url: 'https://example.com/938185508846c.Podrostkovyy_2025.htm', position: 0, visible: true, parentId: null, subcategoriesCount: 3, productsCount: 12 },
    { id: '938185508845', name: 'Фотобанк 5.0', position: 0, visible: false, parentId: null, subcategoriesCount: 0, productsCount: 5 },
    { id: '938185508844', name: 'Фотобанк 6.0', url: 'https://example.com/938185508844c.Fotobank_6.0.htm', position: 0, visible: true, parentId: null, subcategoriesCount: 2, productsCount: 8 },
    { id: '938185508842', name: 'Выписка 2025', position: 0, visible: false, parentId: null, subcategoriesCount: 0, productsCount: 3 },
    { id: '938185508841', name: 'Гендер 2025', position: 0, visible: false, parentId: null, subcategoriesCount: 1, productsCount: 4 },
    { id: '938185508840', name: 'Детский 2025', url: 'https://example.com/938185508840c.Detskiy_2025.htm', position: 0, visible: true, parentId: null, subcategoriesCount: 5, productsCount: 25 },
    { id: '105', name: 'Девичник', url: 'https://example.com/105c.Devichnik.htm', position: 1, visible: true, parentId: null, subcategoriesCount: 2, productsCount: 15 },
    { id: '124', name: 'Гендер пати', url: 'https://example.com/124c.Shary_na_opredelenie_pola_rebenka.htm', position: 2, visible: true, parentId: null, subcategoriesCount: 0, productsCount: 10 },
    { id: '130', name: 'Выписка', url: 'https://example.com/130c.Vozdushnye_shary_na_vypisku_iz_roddoma.htm', position: 3, visible: true, parentId: null, subcategoriesCount: 3, productsCount: 18 },
    { id: '93', name: 'Шары на годик', url: 'https://example.com/93c.Vozdushnye_shary_na_godik_rebenku.htm', position: 4, visible: true, parentId: null, subcategoriesCount: 4, productsCount: 22 },
    { id: '120', name: 'Для девочек', url: 'https://example.com/120c.Dlya_devochek.htm', position: 5, visible: true, parentId: null, subcategoriesCount: 6, productsCount: 30 },
    { id: '58', name: 'Сувениры', position: 5, visible: false, parentId: null, subcategoriesCount: 8, productsCount: 45 },
    { id: '126', name: 'Для мальчиков', url: 'https://example.com/126c.Vozdushnye_shary_dlya_malchikov.htm', position: 6, visible: true, parentId: null, subcategoriesCount: 5, productsCount: 28 },
    { id: '132', name: 'Для девушек', url: 'https://example.com/132c.Vozdushnye_shary_dlya_devushek.htm', position: 7, visible: true, parentId: null, subcategoriesCount: 4, productsCount: 20 },
    { id: '127', name: 'Для мужчин', url: 'https://example.com/127c.Vozdushnye_shary_dlya_muzhchin.htm', position: 8, visible: true, parentId: null, subcategoriesCount: 3, productsCount: 16 },
    { id: '131', name: 'Большие шары', url: 'https://example.com/131c.Bolshie_shary.htm', position: 9, visible: true, parentId: null, subcategoriesCount: 2, productsCount: 12 },
    { id: '121', name: 'Коробка-сюрприз', url: 'https://example.com/121c.Korobka-syurpriz_s_vozdushnymi_sharami.htm', position: 10, visible: true, parentId: null, subcategoriesCount: 1, productsCount: 8 },
    { id: '137', name: 'Сезонные праздники', url: 'https://example.com/137c.Sezonnye_prazdniki.htm', position: 11, visible: true, parentId: null, subcategoriesCount: 7, productsCount: 35 },
    { id: '43', name: 'Фигуры', url: 'https://example.com/43c.Figury.htm', position: 12, visible: true, parentId: null, subcategoriesCount: 10, productsCount: 50 }
  ];

  const filteredCategories = categories.filter(cat => {
    const matchesId = searchId === '' || cat.id.includes(searchId);
    const matchesName = searchName === '' || cat.name.toLowerCase().includes(searchName.toLowerCase());
    return matchesId && matchesName;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleDeleteCategory = (id: string, name: string) => {
    if (confirm(`Действительно удалить раздел "${name}"?`)) {
      console.log('Deleting category:', id);
    }
  };

  const handleEditPosition = (id: string, currentPosition: number) => {
    const newPosition = prompt(`Изменить позицию для категории (текущая: ${currentPosition}):`, currentPosition.toString());
    if (newPosition !== null) {
      console.log('Updating position:', id, newPosition);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search form */}
      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleSearch}>
            <div className="flex flex-wrap gap-4 items-end">
              <div className="space-y-1">
                <Label className="text-xs text-slate-600">ID</Label>
                <Input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="ID раздела"
                  className="w-32"
                />
              </div>
              <div className="space-y-1 flex-1 min-w-[200px]">
                <Label className="text-xs text-slate-600">Название</Label>
                <Input
                  type="text"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="Поиск по названию"
                />
              </div>
              <Button type="submit" variant="outline">
                <Icon name="Search" size={16} className="mr-2" />
                Найти
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Actions and stats */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">
          Всего разделов: <span className="font-semibold">{categories.length}</span>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Icon name="Plus" size={18} className="mr-2" />
          Добавить раздел
        </Button>
      </div>

      {/* Categories table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Название</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-slate-600 uppercase tracking-wider w-24">Позиция</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCategories.map((category) => (
                  <tr 
                    key={category.id} 
                    className={`hover:bg-slate-50 transition-colors ${!category.visible ? 'opacity-60' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <span className={`text-sm font-mono ${!category.visible ? 'text-slate-400' : 'text-slate-700'}`}>
                        {category.id}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {category.url ? (
                          <a 
                            href={category.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 ${
                              !category.visible ? 'text-slate-400' : 'text-slate-800'
                            }`}
                          >
                            {category.name}
                            <Icon name="ExternalLink" size={12} className="opacity-50" />
                          </a>
                        ) : (
                          <span 
                            className={`text-sm font-medium ${!category.visible ? 'text-slate-400' : 'text-slate-800'}`}
                            title={!category.visible ? 'Раздел скрыт' : ''}
                          >
                            {category.name}
                          </span>
                        )}
                        {!category.visible && (
                          <Icon name="EyeOff" size={14} className="text-slate-400" title="Раздел скрыт" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleEditPosition(category.id, category.position)}
                        className="w-full text-center text-sm font-medium text-slate-700 hover:text-primary transition-colors py-1 px-2 rounded hover:bg-slate-100"
                      >
                        {category.position}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2 text-xs">
                        <button className="text-primary hover:underline font-medium flex items-center gap-1">
                          <Icon name="FolderTree" size={12} />
                          подразделы ({category.subcategoriesCount})
                        </button>
                        <button className="text-primary hover:underline font-medium flex items-center gap-1">
                          <Icon name="Package" size={12} />
                          товары ({category.productsCount})
                        </button>
                        <button className="text-primary hover:underline font-medium flex items-center gap-1">
                          <Icon name="Edit" size={12} />
                          редактировать
                        </button>
                        <button 
                          onClick={() => handleDeleteCategory(category.id, category.name)}
                          className="text-red-600 hover:underline font-medium flex items-center gap-1"
                        >
                          <Icon name="Trash2" size={12} />
                          удалить
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add category dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Добавить раздел каталога</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowAddDialog(false)}
                >
                  <Icon name="X" size={18} />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Название раздела *</Label>
                  <Input placeholder="Введите название раздела" />
                </div>

                <div className="space-y-2">
                  <Label>URL-адрес (транслитерация)</Label>
                  <Input placeholder="Автоматически из названия" />
                  <p className="text-xs text-slate-500">
                    Используется для ЧПУ. Если не заполнено, формируется автоматически
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Позиция</Label>
                    <Input type="number" defaultValue="0" />
                  </div>

                  <div className="space-y-2">
                    <Label>Родительский раздел</Label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                      <option value="">Корневой раздел</option>
                      {categories.filter(c => c.visible).map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Описание</Label>
                  <textarea 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm min-h-[100px]"
                    placeholder="Краткое описание раздела"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Отображать раздел на сайте</span>
                  </Label>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">SEO настройки</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Meta Title</Label>
                      <Input placeholder="Заголовок для поисковых систем" />
                    </div>
                    <div className="space-y-2">
                      <Label>Meta Description</Label>
                      <textarea 
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        rows={2}
                        placeholder="Описание для поисковых систем"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Meta Keywords</Label>
                      <Input placeholder="ключевые, слова, через, запятую" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowAddDialog(false)}
                  >
                    Отмена
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      console.log('Saving category');
                      setShowAddDialog(false);
                    }}
                  >
                    <Icon name="Save" size={16} className="mr-2" />
                    Сохранить раздел
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CategoriesManager;