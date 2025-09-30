import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const ImportExportManager = () => {
  const [activeTab, setActiveTab] = useState('csv');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [orderBy, setOrderBy] = useState('pos');
  const [detectByName, setDetectByName] = useState(true);
  const [detectByArticle, setDetectByArticle] = useState(true);

  const tabs = [
    { id: 'csv', label: 'Импорт из CSV' },
    { id: 'yml', label: 'Импорт из YML' },
    { id: 'export', label: 'Экспорт на торговые площадки' },
    { id: '1c', label: 'Синхронизация с 1С' },
    { id: 'moysklad', label: 'Синхронизация с МойСклад' },
    { id: 'vk', label: 'Экспорт на ВКонтакте' },
    { id: 'ok', label: 'Экспорт на Одноклассники' },
    { id: 'ozon', label: 'Экспорт на Ozon' }
  ];

  const categories = [
    { id: '', name: 'Все разделы' },
    { id: '938185508842', name: '/ Выписка 2025' },
    { id: '938185508841', name: '/ Гендер 2025' },
    { id: '938185508840', name: '/ Детский 2025' },
    { id: '938185508846', name: '/ Подростковый 2025' },
    { id: '938185508845', name: '/ Фотобанк 5.0' },
    { id: '938185508844', name: '/ Фотобанк 6.0' },
    { id: '105', name: '/ Девичник' },
    { id: '938185508843', name: '/ Девичник / Девичник 2025' },
    { id: '124', name: '/ Гендер пати' },
    { id: '130', name: '/ Выписка' },
    { id: '93', name: '/ Шары на годик' },
    { id: '120', name: '/ Для девочек' },
    { id: '58', name: '/ Сувениры' },
    { id: '74', name: '/ Сувениры / Кружки' },
    { id: '126', name: '/ Для мальчиков' },
    { id: '132', name: '/ Для девушек' },
    { id: '127', name: '/ Для мужчин' },
    { id: '131', name: '/ Большие шары' },
    { id: '121', name: '/ Коробка-сюрприз' },
    { id: '137', name: '/ Сезонные праздники' },
    { id: '43', name: '/ Фигуры' }
  ];

  const [fields, setFields] = useState({
    f13: true,  // Разделы
    f14: false, // Производитель
    f11: false, // Вес
    f17: true,  // Цифровые коды
    f16: false, // Цена закупки
    f0: true,   // Краткое описание
    f1: true,   // Полное описание
    f6: true,   // Позиция
    f2: true,   // TITLE
    f3: false,  // META DESCRIPTION
    f4: false,  // META KEYWORDS
    f8: false,  // Скрыт
    f9: false,  // С этим часто покупают
    f10: false, // URL
    f12: true,  // URL изображений
    f15: false, // Отменить скидки
    f_3: true,  // Артикул
    f_997: false, // Размеры
    f_998: true,  // Штрих-код
    f_1: false,   // Старая цена
    f_2: false,   // Страна-производитель
    f_999: false, // Видео
    f_1001: false // Хештеги
  });

  const fieldLabels: Record<string, string> = {
    f13: 'Разделы (ID через запятую)',
    f14: 'Производитель',
    f11: 'Вес, кг',
    f17: 'Цифровые коды (через запятую или перенос)',
    f16: 'Цена закупки',
    f0: 'Краткое описание',
    f1: 'Полное описание',
    f6: 'Позиция',
    f2: 'TITLE',
    f3: 'META DESCRIPTION',
    f4: 'META KEYWORDS',
    f8: 'Скрыт (да/нет)',
    f9: 'С этим часто покупают',
    f10: 'URL',
    f12: 'URL изображений (через запятую)',
    f15: 'Отменить скидки (да/нет)',
    f_3: 'Артикул',
    f_997: 'Размеры, см',
    f_998: 'Штрих-код',
    f_1: 'Старая цена',
    f_2: 'Страна-производитель',
    f_999: 'Видео',
    f_1001: 'Хештеги'
  };

  const handleGeneratePricelist = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Generating pricelist for category:', selectedCategory);
    // Simulate file download
    alert(`Генерация прайс-листа для ${selectedCategory || 'всех разделов'}`);
  };

  const handleUploadPricelist = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      console.log('Uploading file:', fileInput.files[0].name);
      alert(`Загрузка файла: ${fileInput.files[0].name}`);
    }
  };

  const handleSaveFormat = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving format settings:', { orderBy, detectByName, detectByArticle, fields });
    alert('Настройки формата сохранены');
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <Card>
        <CardContent className="p-0">
          <div className="flex flex-wrap border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white border-b-2 border-primary text-primary'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CSV Import Tab */}
      {activeTab === 'csv' && (
        <div className="space-y-4">
          {/* Generate current pricelist */}
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleGeneratePricelist}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-semibold">Текущий прайс-лист:</Label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full md:w-64 border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button type="submit">
                    <Icon name="Download" size={16} className="mr-2" />
                    Сгенерировать
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Upload new pricelist */}
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleUploadPricelist}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-semibold">Новый прайс-лист:</Label>
                    <input
                      type="file"
                      name="pricelist"
                      accept=".csv,.txt"
                      className="block w-full text-sm text-slate-600
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-medium
                        file:bg-primary file:text-white
                        hover:file:bg-primary/90
                        file:cursor-pointer cursor-pointer"
                    />
                  </div>
                  <Button type="submit">
                    <Icon name="Upload" size={16} className="mr-2" />
                    Загрузить
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardContent className="p-6 space-y-3 text-sm text-slate-700 leading-relaxed">
              <p>
                Для обновления цен необходимо скачать текущий прайс-лист, внести изменения и загрузить измененный файл. 
                Формат прайс-листа при этом должен быть сохранен.
              </p>
              <p>
                Редактировать прайс-лист лучше при помощи{' '}
                <a 
                  href="https://ru.libreoffice.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  LibreOffice
                </a>
                . Это бесплатный аналог пакета MS Office.
              </p>
              <p>
                Для добавления новых позиций в каталог необходимо в прайс-листе добавить позиции аналогично уже имеющимся, 
                указав в первой колонке (ID) значение 0.
              </p>
              <p className="font-medium">При открытии прайс-листа должны быть указаны такие параметры:</p>
              <ul className="list-none space-y-1 ml-4">
                <li>• кодировка: <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">windows-1251</span></li>
                <li>• разделитель: <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">точка с запятой</span></li>
                <li>• разделитель текста: <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">двойная кавычка</span></li>
              </ul>
            </CardContent>
          </Card>

          {/* Format settings */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Формат прайс-листа</h3>
              <form onSubmit={handleSaveFormat}>
                <div className="space-y-6">
                  {/* Order settings */}
                  <div className="space-y-2">
                    <Label className="font-semibold">Упорядочить товары</Label>
                    <select
                      value={orderBy}
                      onChange={(e) => setOrderBy(e.target.value)}
                      className="w-full md:w-64 border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="price">по цене</option>
                      <option value="name">по наименованию</option>
                      <option value="id">по дате добавления</option>
                      <option value="pos">по позиции</option>
                    </select>
                  </div>

                  {/* Detect item settings */}
                  <div className="space-y-2">
                    <Label className="font-semibold">Определять товар</Label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-not-allowed">
                        <input type="checkbox" checked disabled className="rounded" />
                        <span className="text-sm text-slate-500">по ID</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={detectByName}
                          onChange={(e) => setDetectByName(e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm text-slate-700">по Названию</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={detectByArticle}
                          onChange={(e) => setDetectByArticle(e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm text-slate-700">по Артикулу</span>
                      </label>
                    </div>
                  </div>

                  {/* Fields settings */}
                  <div className="space-y-2">
                    <Label className="font-semibold">Поля прайс-листа</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {/* Always included fields */}
                      <label className="flex items-center gap-2 cursor-not-allowed">
                        <input type="checkbox" checked disabled className="rounded" />
                        <span className="text-sm text-slate-500">ID</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-not-allowed">
                        <input type="checkbox" checked disabled className="rounded" />
                        <span className="text-sm text-slate-500">Название</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-not-allowed">
                        <input type="checkbox" checked disabled className="rounded" />
                        <span className="text-sm text-slate-500">Цена</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-not-allowed">
                        <input type="checkbox" checked disabled className="rounded" />
                        <span className="text-sm text-slate-500">Кол-во</span>
                      </label>

                      {/* Optional fields */}
                      {Object.entries(fieldLabels).map(([key, label]) => (
                        <label key={key} className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={fields[key as keyof typeof fields]}
                            onChange={(e) => setFields({ ...fields, [key]: e.target.checked })}
                            className="rounded"
                          />
                          <span className="text-sm text-slate-700">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button type="submit">
                    <Icon name="Save" size={16} className="mr-2" />
                    Сохранить настройки
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Other tabs - placeholder content */}
      {activeTab !== 'csv' && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <Icon name="Construction" size={48} className="text-slate-300" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-700">
                  {tabs.find(t => t.id === activeTab)?.label}
                </h3>
                <p className="text-sm text-slate-500">
                  Функционал находится в разработке
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImportExportManager;