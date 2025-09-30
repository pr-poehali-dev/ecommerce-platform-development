import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface CSVImportTabProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  orderBy: string;
  setOrderBy: (value: string) => void;
  detectByName: boolean;
  setDetectByName: (value: boolean) => void;
  detectByArticle: boolean;
  setDetectByArticle: (value: boolean) => void;
  fields: Record<string, boolean>;
  setFields: (fields: Record<string, boolean>) => void;
  fieldLabels: Record<string, string>;
  categories: Array<{ id: string; name: string }>;
  onGeneratePricelist: (e: React.FormEvent) => void;
  onUploadPricelist: (e: React.FormEvent) => void;
  onSaveFormat: (e: React.FormEvent) => void;
}

const CSVImportTab = ({
  selectedCategory,
  setSelectedCategory,
  orderBy,
  setOrderBy,
  detectByName,
  setDetectByName,
  detectByArticle,
  setDetectByArticle,
  fields,
  setFields,
  fieldLabels,
  categories,
  onGeneratePricelist,
  onUploadPricelist,
  onSaveFormat
}: CSVImportTabProps) => {
  return (
    <div className="space-y-4">
      {/* Generate current pricelist */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={onGeneratePricelist}>
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
          <form onSubmit={onUploadPricelist}>
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
          <form onSubmit={onSaveFormat}>
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
  );
};

export default CSVImportTab;