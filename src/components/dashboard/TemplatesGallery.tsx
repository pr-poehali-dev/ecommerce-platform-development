import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface Template {
  id: string;
  name: string;
  preview: string;
  isPopular?: boolean;
  isFree?: boolean;
  demoLink?: string;
  description?: string;
}

const TEMPLATES: Template[] = [
  {
    id: 'ecommerce-pro',
    name: 'E-commerce Pro',
    preview: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
    isPopular: true,
    isFree: true,
    description: 'Готовый интернет-магазин: каталог, корзина, отзывы, подписка'
  },
  {
    id: 'clean',
    name: 'Clean',
    preview: '/templates/clean.jpg',
    isFree: true,
    description: 'Минималистичный дизайн для современного бизнеса'
  },
  {
    id: 'whitedove',
    name: 'White Dove',
    preview: '/templates/whitedove.jpg',
    isPopular: true,
    isFree: true,
    demoLink: 'https://whitedove.demo',
    description: 'Элегантный светлый шаблон для онлайн-магазинов'
  },
  {
    id: 'love',
    name: 'Love',
    preview: '/templates/love.jpg',
    isPopular: true,
    isFree: true,
    demoLink: 'https://love.demo',
    description: 'Стильный дизайн с акцентом на визуальный контент'
  },
  {
    id: 'simple',
    name: 'Simple',
    preview: '/templates/simple.jpg',
    isFree: true,
    demoLink: 'https://simple.demo',
    description: 'Простота и функциональность в одном дизайне'
  },
  {
    id: 'razor',
    name: 'Razor',
    preview: '/templates/razor.jpg',
    isFree: true,
    demoLink: 'https://razor.demo',
    description: 'Острый и современный дизайн для смелых брендов'
  },
  {
    id: 'dresscollection',
    name: 'Dress Collection',
    preview: '/templates/dress.jpg',
    isPopular: true,
    isFree: true,
    demoLink: 'https://dresscollection.demo',
    description: 'Идеально для магазинов одежды и модных бутиков'
  },
  {
    id: 'blackoz',
    name: 'Black Oz',
    preview: '/templates/blackoz.jpg',
    isFree: true,
    demoLink: 'https://blackoz.demo',
    description: 'Темный премиум дизайн для элитных товаров'
  },
  {
    id: 'zen',
    name: 'Zen',
    preview: '/templates/zen.jpg',
    isFree: true,
    demoLink: 'https://zen.demo',
    description: 'Спокойный минималистичный дизайн'
  },
  {
    id: 'muza',
    name: 'Muza',
    preview: '/templates/muza.jpg',
    isFree: true,
    demoLink: 'https://muza.demo',
    description: 'Творческий дизайн для креативных проектов'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    preview: '/templates/diamond.jpg',
    isFree: true,
    demoLink: 'https://diamond.demo',
    description: 'Роскошный дизайн для премиум брендов'
  },
  {
    id: 'metro',
    name: 'Metro',
    preview: '/templates/metro.jpg',
    isFree: true,
    demoLink: 'https://metro.demo',
    description: 'Современный городской стиль'
  }
];

const TemplatesGallery = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState<'all' | 'paid' | 'free'>('all');
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  const filteredTemplates = TEMPLATES.filter(template => {
    if (filterType === 'free') return template.isFree;
    if (filterType === 'paid') return !template.isFree;
    return true;
  });

  const handleInstallTemplate = (template: Template) => {
    navigate('/visual-editor', { 
      state: { 
        templateId: template.id,
        templateName: template.name 
      } 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Шаблоны дизайна</h2>
            <p className="text-sm text-gray-600 mt-1">Выберите шаблон и настройте его в визуальном редакторе</p>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Все
          </button>
          <button
            onClick={() => setFilterType('paid')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'paid'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Платные
          </button>
          <button
            onClick={() => setFilterType('free')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'free'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Бесплатные
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">
            Все шаблоны доступны бесплатно. После установки вы сможете настроить цвета, шрифты и контент в визуальном редакторе.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              {template.isPopular && (
                <div className="absolute top-3 right-3 z-10 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Популярный
                </div>
              )}

              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative">
                <div 
                  className="w-full h-full flex items-center justify-center text-gray-400 transition-transform duration-300"
                  style={{
                    transform: hoveredTemplate === template.id ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  <Icon name="Layout" size={64} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>
                  </div>
                  {template.isFree && (
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                      Бесплатно
                    </span>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleInstallTemplate(template)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Icon name="Download" size={16} />
                    Установить
                  </button>
                  
                  {template.demoLink && (
                    <a
                      href={template.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icon name="ExternalLink" size={16} />
                      Демо
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Шаблоны не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatesGallery;