import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import CSVImportTab from './import-export/CSVImportTab';

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
        <CSVImportTab
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          detectByName={detectByName}
          setDetectByName={setDetectByName}
          detectByArticle={detectByArticle}
          setDetectByArticle={setDetectByArticle}
          fields={fields}
          setFields={setFields}
          fieldLabels={fieldLabels}
          categories={categories}
          onGeneratePricelist={handleGeneratePricelist}
          onUploadPricelist={handleUploadPricelist}
          onSaveFormat={handleSaveFormat}
        />
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