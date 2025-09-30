import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Category {
  id: string;
  name: string;
  url?: string;
  position: number;
  isHidden: boolean;
  hasSubcategories?: boolean;
  hasProducts?: boolean;
}

const CatalogCategories = () => {
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');

  const categories: Category[] = [
    { id: '938185508846', name: 'Подростковый 2025', url: 'https://balooirk.ru/938185508846c.Podrostkovyy_2025.htm', position: 0, isHidden: false },
    { id: '938185508845', name: 'Фотобанк 5.0', position: 0, isHidden: true },
    { id: '938185508844', name: 'Фотобанк 6.0', url: 'https://balooirk.ru/938185508844c.Fotobank_6.0.htm', position: 0, isHidden: false },
    { id: '938185508842', name: 'Выписка 2025', position: 0, isHidden: true },
    { id: '938185508841', name: 'Гендер 2025', position: 0, isHidden: true },
    { id: '938185508840', name: 'Детский 2025', url: 'https://balooirk.ru/938185508840c.Detskiy_2025.htm', position: 0, isHidden: false },
    { id: '105', name: 'Девичник', url: 'https://balooirk.ru/105c.Devichnik.htm', position: 1, isHidden: false },
    { id: '124', name: 'Гендер пати', url: 'https://balooirk.ru/124c.Shary_na_opredelenie_pola_rebenka.htm', position: 2, isHidden: false },
    { id: '130', name: 'Выписка', url: 'https://balooirk.ru/130c.Vozdushnye_shary_na_vypisku_iz_roddoma.htm', position: 3, isHidden: false },
    { id: '93', name: 'Шары на годик', url: 'https://balooirk.ru/93c.Vozdushnye_shary_na_godik_rebenku.htm', position: 4, isHidden: false },
    { id: '120', name: 'Для девочек', url: 'https://balooirk.ru/120c.Dlya_devochek.htm', position: 5, isHidden: false },
    { id: '58', name: 'Сувениры', position: 5, isHidden: true },
    { id: '126', name: 'Для мальчиков', url: 'https://balooirk.ru/126c.Vozdushnye_shary_dlya_malchikov.htm', position: 6, isHidden: false },
    { id: '132', name: 'Для девушек', url: 'https://balooirk.ru/132c.Vozdushnye_shary_dlya_devushek.htm', position: 7, isHidden: false },
    { id: '127', name: 'Для мужчин', url: 'https://balooirk.ru/127c.Vozdushnye_shary_dlya_muzhchin.htm', position: 8, isHidden: false },
    { id: '131', name: 'Большие шары', url: 'https://balooirk.ru/131c.Bolshie_shary.htm', position: 9, isHidden: false },
    { id: '121', name: 'Коробка-сюрприз', url: 'https://balooirk.ru/121c.Korobka-syurpriz_s_vozdushnymi_sharami.htm', position: 10, isHidden: false },
    { id: '137', name: 'Сезонные праздники', url: 'https://balooirk.ru/137c.Sezonnye_prazdniki.htm', position: 11, isHidden: false },
    { id: '43', name: 'Фигуры', url: 'https://balooirk.ru/43c.Figury.htm', position: 12, isHidden: false }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching:', { searchId, searchName });
  };

  const handleAddCategory = () => {
    console.log('Adding new category');
    alert('Добавление раздела');
  };

  const handleEditPosition = (categoryId: string) => {
    const newPosition = prompt('Введите новую позицию:');
    if (newPosition !== null) {
      console.log('Updating position:', categoryId, newPosition);
    }
  };

  const handleViewSubcategories = (categoryId: string) => {
    console.log('Viewing subcategories:', categoryId);
  };

  const handleViewProducts = (categoryId: string) => {
    console.log('Viewing products:', categoryId);
  };

  const handleEdit = (categoryId: string) => {
    console.log('Editing category:', categoryId);
    alert(`Редактирование раздела ${categoryId}`);
  };

  const handleDelete = (categoryId: string, categoryName: string) => {
    if (confirm(`Действительно удалить раздел "${categoryName}"?`)) {
      console.log('Deleting category:', categoryId);
      alert(`Раздел "${categoryName}" удален`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search form */}
      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="flex flex-wrap items-end gap-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">ID</label>
              <Input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="ID"
                className="w-32"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Название</label>
              <Input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Название"
                className="w-48"
              />
            </div>
            <Button type="submit" size="sm">
              <Icon name="Search" size={16} className="mr-2" />
              Найти
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Header with stats and add button */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">
          Всего разделов: {categories.length}
        </div>
        <Button onClick={handleAddCategory} size="sm">
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить раздел
        </Button>
      </div>

      {/* Categories table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Название</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">Позиция</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Ред.</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b hover:bg-slate-50 transition-colors">
                    <td className={`px-4 py-3 text-sm ${category.isHidden ? 'text-slate-400' : 'text-slate-700'}`}>
                      {category.id}
                    </td>
                    <td className={`px-4 py-3 text-sm ${category.isHidden ? 'text-slate-400' : ''}`}>
                      {category.url ? (
                        <a 
                          href={category.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {category.name}
                        </a>
                      ) : (
                        <span title="Раздел скрыт">{category.name}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleEditPosition(category.id)}
                        className="text-sm text-slate-700 hover:text-primary transition-colors"
                      >
                        {category.position}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2 text-xs">
                        <button
                          onClick={() => handleViewSubcategories(category.id)}
                          className="text-primary hover:underline"
                        >
                          подразделы
                        </button>
                        <button
                          onClick={() => handleViewProducts(category.id)}
                          className="text-primary hover:underline"
                        >
                          товары
                        </button>
                        <button
                          onClick={() => handleEdit(category.id)}
                          className="text-primary hover:underline"
                        >
                          редактировать
                        </button>
                        <button
                          onClick={() => handleDelete(category.id, category.name)}
                          className="text-red-600 hover:underline"
                        >
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
    </div>
  );
};

export default CatalogCategories;