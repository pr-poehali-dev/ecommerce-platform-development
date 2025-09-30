import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const DesignSection = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [showArchive, setShowArchive] = useState(false);

  const tabs = [
    { id: 'templates', label: 'Варианты оформления' },
    { id: 'preloader', label: 'Прелоадер' }
  ];

  const templates = [
    { id: 'ex119', name: 'Шаблон EX119', preview: 'https://www.alltrades.ru/cp/images/pattern_preview/ex119.jpg' },
    { id: 'ex118', name: 'Шаблон EX118', preview: 'https://www.alltrades.ru/cp/images/pattern_preview/ex118.jpg' },
    { id: 'ex117', name: 'Шаблон EX117', preview: 'https://www.alltrades.ru/cp/images/pattern_preview/ex117.jpg' },
    { id: 'ex115', name: 'Шаблон EX115', preview: 'https://www.alltrades.ru/cp/images/pattern_preview/ex115.jpg' },
    { id: 'ex114', name: 'Шаблон EX114', preview: 'https://www.alltrades.ru/cp/images/pattern_preview/ex114.jpg' },
    { id: 'ex112', name: 'Шаблон EX112', preview: 'https://www.alltrades.ru/cp/images/pattern_preview/ex112.jpg' },
    { id: 'ex110', name: 'Шаблон EX110', preview: 'https://www.alltrades.ru/cp/images/pattern_preview/ex110.jpg' },
    { id: 'ex108', name: 'Шаблон EX108', preview: 'https://www.alltrades.ru/cp/images/pattern_preview/ex108.jpg' },
    { id: 'ex106', name: 'Шаблон EX106', preview: 'https://www.alltrades.ru/cp/images/pattern_preview/ex106.jpg' },
    { id: 'ex105', name: 'Шаблон EX105', preview: 'https://www.alltrades.ru/cp/images/pattern_preview/ex105.jpg' },
    { id: 'ex104', name: 'Шаблон EX104', preview: 'https://www.alltrades.ru/cp/images/pattern_preview/ex104.jpg' },
    { id: 'ex103', name: 'Шаблон EX103', preview: 'https://www.alltrades.ru/cp/images/pattern_preview/ex103.jpg' }
  ];

  const archiveTemplates = [
    { id: 'ex111', name: 'Шаблон EX111', preview: 'https://www.alltrades.ru/cp/images/pattern_preview/ex111.jpg' },
    { id: 'ex109', name: 'Шаблон EX109', preview: 'https://www.alltrades.ru/cp/images/pattern_preview/ex109.jpg' },
    { id: 'ex74', name: 'Шаблон EX74', preview: 'https://www.alltrades.ru/cp/images/pattern_preview/ex74.jpg' },
    { id: 'ex73', name: 'Шаблон EX73', preview: 'https://www.alltrades.ru/cp/images/pattern_preview/ex73.jpg' },
    { id: 'ex50', name: 'Шаблон EX50', preview: 'https://www.alltrades.ru/cp/images/pattern_preview/ex50.jpg' },
    { id: 'ex36', name: 'Шаблон EX36', preview: 'https://www.alltrades.ru/cp/images/pattern_preview/ex36.jpg' }
  ];

  const handleInstallTemplate = (templateName: string) => {
    if (confirm(`Действительно установить ${templateName}? Текущее оформление будет утеряно!`)) {
      console.log(`Installing ${templateName}`);
    }
  };

  return (
    <div className="max-w-7xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Оформление</h2>
          <p className="text-slate-600">Выбор и настройка дизайна магазина</p>
        </div>
        <Button 
          onClick={() => window.open('#visual-editor', '_blank')}
          className="flex items-center gap-2"
        >
          <Icon name="Edit" size={18} />
          Визуальный редактор
        </Button>
      </div>

      {/* Horizontal tabs menu */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-primary border-b-2 border-primary'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Templates tab content */}
      {activeTab === 'templates' && (
        <div>
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 text-sm text-slate-600">
                <Icon name="Info" size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <p>
                  Здесь вы можете выбрать для магазина начальный вариант оформления, который потом сможете настроить при помощи редактора. 
                  Все варианты оформления бесплатные, и менять их можно без ограничений. При смене варианта оформления товары, разделы, 
                  заказы и т.п. не теряются, меняется только внешний вид.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Templates grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {templates.map(template => (
              <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <a href={`#${template.id}`} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img 
                      src={template.preview} 
                      alt={template.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </a>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <a 
                      href={`#${template.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-slate-800 hover:text-primary transition-colors"
                    >
                      {template.name}
                    </a>
                    <Button 
                      size="sm"
                      onClick={() => handleInstallTemplate(template.name)}
                    >
                      Установить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Archive section */}
          <div className="mb-4">
            <Button 
              variant="link" 
              onClick={() => setShowArchive(!showArchive)}
              className="p-0 h-auto"
            >
              {showArchive ? 'Скрыть' : 'Показать'} архив вариантов оформления
            </Button>
            
            {showArchive && (
              <Card className="mt-4 mb-6">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 text-sm text-amber-700 bg-amber-50 p-3 rounded-lg">
                    <Icon name="AlertTriangle" size={20} className="flex-shrink-0 mt-0.5" />
                    <p>
                      У архивных вариантов оформления не поддерживается функция адаптации внешнего вида под различные устройства, 
                      а также часть функций по настройке внешнего вида. Мы рекомендуем использовать новые варианты оформления.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Archive templates grid */}
          {showArchive && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {archiveTemplates.map(template => (
                <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow opacity-75">
                  <a href={`#${template.id}`} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                      <img 
                        src={template.preview} 
                        alt={template.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </a>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <a 
                        href={`#${template.id}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-slate-800 hover:text-primary transition-colors"
                      >
                        {template.name}
                      </a>
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => handleInstallTemplate(template.name)}
                      >
                        Установить
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Preloader tab content */}
      {activeTab === 'preloader' && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3 text-sm text-slate-600 mb-6">
                <Icon name="Info" size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <p>
                  Прелоадер — это анимация загрузки, которая отображается посетителям во время загрузки страниц магазина. 
                  Вы можете включить или отключить прелоадер, а также настроить его внешний вид.
                </p>
              </div>

              <div className="space-y-6">
                {/* Enable/Disable preloader */}
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-slate-800">Показывать прелоадер</h3>
                    <p className="text-sm text-slate-600 mt-1">Включить анимацию загрузки страниц</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                {/* Preloader style selection */}
                <div>
                  <h3 className="font-medium text-slate-800 mb-4">Стиль прелоадера</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'spinner', name: 'Спиннер', icon: 'Loader2' },
                      { id: 'dots', name: 'Точки', icon: 'MoreHorizontal' },
                      { id: 'pulse', name: 'Пульсация', icon: 'Circle' }
                    ].map(style => (
                      <Card 
                        key={style.id} 
                        className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-primary"
                      >
                        <CardContent className="p-6 text-center">
                          <Icon name={style.icon as any} size={32} className="mx-auto mb-3 text-primary" />
                          <p className="font-medium text-slate-800">{style.name}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Color settings */}
                <div>
                  <h3 className="font-medium text-slate-800 mb-4">Цвет прелоадера</h3>
                  <div className="flex items-center gap-4">
                    <input 
                      type="color" 
                      defaultValue="#3b82f6"
                      className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200"
                    />
                    <div>
                      <p className="text-sm text-slate-600">Выберите цвет анимации загрузки</p>
                      <p className="text-xs text-slate-400 mt-1">По умолчанию используется основной цвет темы</p>
                    </div>
                  </div>
                </div>

                {/* Save button */}
                <div className="flex justify-end pt-4">
                  <Button className="px-8">
                    <Icon name="Save" size={18} className="mr-2" />
                    Сохранить настройки
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium text-slate-800 mb-4">Предпросмотр</h3>
              <div className="bg-slate-100 rounded-lg h-64 flex items-center justify-center">
                <Icon name="Loader2" size={48} className="text-primary animate-spin" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DesignSection;