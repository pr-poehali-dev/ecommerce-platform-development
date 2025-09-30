import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const VisualEditor = () => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activePanel, setActivePanel] = useState<'blocks' | 'styles' | 'templates'>('blocks');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showTemplatesDialog, setShowTemplatesDialog] = useState(false);

  const blocks = [
    { id: 'header', name: 'Шапка сайта', icon: 'Layout', category: 'structure' },
    { id: 'hero', name: 'Главный баннер', icon: 'Monitor', category: 'content' },
    { id: 'features', name: 'Преимущества', icon: 'Star', category: 'content' },
    { id: 'about', name: 'О компании', icon: 'Info', category: 'content' },
    { id: 'products', name: 'Товары сеткой', icon: 'Package', category: 'shop' },
    { id: 'categories', name: 'Категории', icon: 'FolderTree', category: 'shop' },
    { id: 'testimonials', name: 'Отзывы', icon: 'MessageSquare', category: 'content' },
    { id: 'gallery', name: 'Галерея', icon: 'Image', category: 'content' },
    { id: 'pricing', name: 'Тарифы', icon: 'DollarSign', category: 'content' },
    { id: 'faq', name: 'FAQ', icon: 'HelpCircle', category: 'content' },
    { id: 'team', name: 'Команда', icon: 'Users', category: 'content' },
    { id: 'stats', name: 'Статистика', icon: 'BarChart', category: 'content' },
    { id: 'cta', name: 'Призыв к действию', icon: 'Megaphone', category: 'content' },
    { id: 'contact', name: 'Контакты', icon: 'Mail', category: 'content' },
    { id: 'map', name: 'Карта', icon: 'MapPin', category: 'content' },
    { id: 'newsletter', name: 'Подписка', icon: 'Bell', category: 'content' },
    { id: 'footer', name: 'Подвал сайта', icon: 'Layout', category: 'structure' }
  ];

  const savedTemplates = [
    { id: 1, name: 'Главная страница', thumbnail: '🏠', sections: 7, date: '28.09.2024' },
    { id: 2, name: 'Страница каталога', thumbnail: '🛍️', sections: 5, date: '25.09.2024' },
    { id: 3, name: 'О компании', thumbnail: '📋', sections: 4, date: '20.09.2024' }
  ];

  const initialSections = [
    {
      id: 'header-1',
      type: 'header',
      name: 'Шапка',
      content: {
        logo: 'Воздушные шары',
        menu: ['Главная', 'Каталог', 'О нас', 'Контакты'],
        phone: '+7 900 123 45 67'
      },
      styles: {
        background: '#ffffff',
        textColor: '#1e293b',
        height: '80px'
      }
    },
    {
      id: 'hero-1',
      type: 'hero',
      name: 'Главный баннер',
      content: {
        title: 'Воздушные шары для любого праздника',
        subtitle: 'Доставка по Москве за 2 часа',
        button: 'Смотреть каталог',
        image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&h=600&fit=crop'
      },
      styles: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        textColor: '#ffffff',
        minHeight: '500px'
      }
    },
    {
      id: 'features-1',
      type: 'features',
      name: 'Преимущества',
      content: {
        title: 'Почему выбирают нас',
        items: [
          { icon: 'Truck', title: 'Быстрая доставка', text: 'Доставим за 2 часа по Москве' },
          { icon: 'Award', title: 'Качество', text: 'Только проверенные производители' },
          { icon: 'Smile', title: 'Радость', text: 'Создаем праздничное настроение' }
        ]
      },
      styles: {
        background: '#ffffff',
        textColor: '#1e293b'
      }
    },
    {
      id: 'products-1',
      type: 'products',
      name: 'Товары',
      content: {
        title: 'Популярные товары',
        products: [
          { name: 'Шар сердце', price: '150 ₽', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop' },
          { name: 'Набор шаров', price: '890 ₽', image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=400&fit=crop' },
          { name: 'Цифра 5', price: '650 ₽', image: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=400&h=400&fit=crop' }
        ]
      },
      styles: {
        background: '#f8fafc',
        textColor: '#1e293b'
      }
    },
    {
      id: 'testimonials-1',
      type: 'testimonials',
      name: 'Отзывы',
      content: {
        title: 'Отзывы наших клиентов',
        reviews: [
          { author: 'Анна М.', text: 'Отличные шары! Праздник удался на славу!', rating: 5 },
          { author: 'Иван П.', text: 'Быстрая доставка, качественный товар', rating: 5 },
          { author: 'Мария С.', text: 'Заказываю уже не первый раз, всё супер!', rating: 5 }
        ]
      },
      styles: {
        background: '#ffffff',
        textColor: '#1e293b'
      }
    },
    {
      id: 'footer-1',
      type: 'footer',
      name: 'Подвал',
      content: {
        company: 'Воздушные шары © 2024',
        links: ['О нас', 'Доставка', 'Контакты'],
        social: ['Instagram', 'VK', 'Telegram']
      },
      styles: {
        background: '#1e293b',
        textColor: '#ffffff'
      }
    }
  ];

  const [sections, setSections] = useState(initialSections);

  const addNewSection = (blockType: string) => {
    const newSection = {
      id: `${blockType}-${Date.now()}`,
      type: blockType,
      name: blocks.find(b => b.id === blockType)?.name || 'Новая секция',
      content: getDefaultContent(blockType),
      styles: getDefaultStyles(blockType)
    };
    setSections([...sections, newSection]);
  };

  const duplicateSection = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      const newSection = {
        ...section,
        id: `${section.type}-${Date.now()}`,
        name: `${section.name} (копия)`
      };
      const index = sections.findIndex(s => s.id === sectionId);
      const newSections = [...sections];
      newSections.splice(index + 1, 0, newSection);
      setSections(newSections);
    }
  };

  const deleteSection = (sectionId: string) => {
    if (confirm('Удалить эту секцию?')) {
      setSections(sections.filter(s => s.id !== sectionId));
      if (selectedElement === sectionId) {
        setSelectedElement(null);
      }
    }
  };

  const moveSection = (sectionId: string, direction: 'up' | 'down') => {
    const index = sections.findIndex(s => s.id === sectionId);
    if (index === -1) return;
    
    if (direction === 'up' && index > 0) {
      const newSections = [...sections];
      [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
      setSections(newSections);
    } else if (direction === 'down' && index < sections.length - 1) {
      const newSections = [...sections];
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
      setSections(newSections);
    }
  };

  const saveTemplate = (templateName: string) => {
    console.log('Сохранение шаблона:', templateName, sections);
    alert(`Шаблон "${templateName}" сохранен!`);
    setShowSaveDialog(false);
  };

  const loadTemplate = (templateId: number) => {
    console.log('Загрузка шаблона:', templateId);
    alert('Шаблон загружен!');
    setShowTemplatesDialog(false);
  };

  const getDefaultContent = (blockType: string) => {
    switch (blockType) {
      case 'header':
        return { logo: 'Логотип', menu: ['Ссылка 1', 'Ссылка 2'], phone: '+7 999 999 99 99' };
      case 'hero':
        return { title: 'Заголовок', subtitle: 'Подзаголовок', button: 'Кнопка', image: '' };
      case 'features':
        return { title: 'Преимущества', items: [{ icon: 'Star', title: 'Преимущество', text: 'Описание' }] };
      case 'about':
        return { title: 'О нас', text: 'Текст о компании', image: '' };
      case 'testimonials':
        return { title: 'Отзывы', reviews: [{ author: 'Имя', text: 'Отзыв', rating: 5 }] };
      case 'contact':
        return { title: 'Контакты', phone: '+7 999 999 99 99', email: 'info@example.com', address: 'Адрес' };
      case 'footer':
        return { company: 'Компания © 2024', links: [], social: [] };
      default:
        return { title: 'Новая секция' };
    }
  };

  const getDefaultStyles = (blockType: string) => {
    return {
      background: '#ffffff',
      textColor: '#1e293b',
      padding: '4rem 2rem'
    };
  };

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  const renderSection = (section: any) => {
    const isSelected = selectedElement === section.id;
    
    switch (section.type) {
      case 'header':
        return (
          <div 
            onClick={() => setSelectedElement(section.id)}
            className={`cursor-pointer transition-all ${isSelected ? 'ring-4 ring-primary' : 'hover:ring-2 hover:ring-blue-300'}`}
            style={{ 
              background: section.styles.background, 
              color: section.styles.textColor,
              height: section.styles.height || '80px',
              padding: '0 2rem'
            }}
          >
            <div className="h-full flex items-center justify-between max-w-7xl mx-auto">
              <div className="font-bold text-xl">{section.content.logo}</div>
              <nav className="hidden md:flex gap-6 text-sm">
                {section.content.menu?.map((item: string, i: number) => (
                  <a key={i} href="#" className="hover:text-primary transition-colors">{item}</a>
                ))}
              </nav>
              <div className="flex items-center gap-2">
                <Icon name="Phone" size={16} />
                <span className="text-sm">{section.content.phone}</span>
              </div>
            </div>
          </div>
        );
        
      case 'hero':
        return (
          <div 
            onClick={() => setSelectedElement(section.id)}
            className={`cursor-pointer transition-all relative overflow-hidden ${isSelected ? 'ring-4 ring-primary' : 'hover:ring-2 hover:ring-blue-300'}`}
            style={{ 
              background: section.styles.background,
              color: section.styles.textColor,
              minHeight: section.styles.minHeight || '500px'
            }}
          >
            {section.content.image && (
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${section.content.image})` }}
              />
            )}
            <div className="relative max-w-7xl mx-auto px-8 py-24 flex flex-col items-center justify-center text-center">
              <h1 className="text-5xl font-bold mb-4">{section.content.title}</h1>
              <p className="text-xl mb-8 opacity-90">{section.content.subtitle}</p>
              <button className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:shadow-lg transition-shadow">
                {section.content.button}
              </button>
            </div>
          </div>
        );

      case 'features':
        return (
          <div 
            onClick={() => setSelectedElement(section.id)}
            className={`cursor-pointer transition-all ${isSelected ? 'ring-4 ring-primary' : 'hover:ring-2 hover:ring-blue-300'}`}
            style={{ 
              background: section.styles.background,
              color: section.styles.textColor,
              padding: '4rem 2rem'
            }}
          >
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">{section.content.title}</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {section.content.items?.map((item: any, i: number) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name={item.icon as any} size={32} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'products':
        return (
          <div 
            onClick={() => setSelectedElement(section.id)}
            className={`cursor-pointer transition-all ${isSelected ? 'ring-4 ring-primary' : 'hover:ring-2 hover:ring-blue-300'}`}
            style={{ 
              background: section.styles.background,
              color: section.styles.textColor,
              padding: '4rem 2rem'
            }}
          >
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">{section.content.title}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {section.content.products?.map((product: any, i: number) => (
                  <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{product.name}</h3>
                      <p className="text-primary font-bold">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div 
            onClick={() => setSelectedElement(section.id)}
            className={`cursor-pointer transition-all ${isSelected ? 'ring-4 ring-primary' : 'hover:ring-2 hover:ring-blue-300'}`}
            style={{ 
              background: section.styles.background,
              color: section.styles.textColor,
              padding: '4rem 2rem'
            }}
          >
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">{section.content.title}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {section.content.reviews?.map((review: any, i: number) => (
                  <div key={i} className="bg-slate-50 rounded-lg p-6">
                    <div className="flex gap-1 mb-3">
                      {[...Array(review.rating)].map((_, j) => (
                        <Icon key={j} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <p className="text-slate-700 mb-4">"{review.text}"</p>
                    <p className="font-semibold">{review.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'footer':
        return (
          <div 
            onClick={() => setSelectedElement(section.id)}
            className={`cursor-pointer transition-all ${isSelected ? 'ring-4 ring-primary' : 'hover:ring-2 hover:ring-blue-300'}`}
            style={{ 
              background: section.styles.background,
              color: section.styles.textColor,
              padding: '3rem 2rem'
            }}
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap justify-between items-center gap-6">
                <div className="text-sm opacity-80">{section.content.company}</div>
                <div className="flex gap-6 text-sm">
                  {section.content.links?.map((link: string, i: number) => (
                    <a key={i} href="#" className="hover:text-primary transition-colors">{link}</a>
                  ))}
                </div>
                <div className="flex gap-4">
                  {section.content.social?.map((social: string, i: number) => (
                    <a key={i} href="#" className="hover:text-primary transition-colors">
                      <Icon name="Circle" size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div 
            onClick={() => setSelectedElement(section.id)}
            className={`cursor-pointer transition-all p-12 text-center ${isSelected ? 'ring-4 ring-primary' : 'hover:ring-2 hover:ring-blue-300'}`}
            style={{ background: section.styles.background, color: section.styles.textColor }}
          >
            <Icon name="Layout" size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">{section.name}</p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-100">
      {/* Top toolbar */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
            <Icon name="ArrowLeft" size={18} className="mr-2" />
            Назад
          </Button>
          <div className="h-6 w-px bg-gray-300" />
          <h1 className="font-semibold text-slate-800">Визуальный редактор</h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Device preview selector */}
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`p-2 rounded transition-colors ${previewMode === 'desktop' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
              title="Десктоп"
            >
              <Icon name="Monitor" size={18} />
            </button>
            <button
              onClick={() => setPreviewMode('tablet')}
              className={`p-2 rounded transition-colors ${previewMode === 'tablet' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
              title="Планшет"
            >
              <Icon name="Tablet" size={18} />
            </button>
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`p-2 rounded transition-colors ${previewMode === 'mobile' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
              title="Мобильный"
            >
              <Icon name="Smartphone" size={18} />
            </button>
          </div>

          <div className="h-6 w-px bg-gray-300 mx-2" />

          <Button variant="outline" size="sm" onClick={() => setShowTemplatesDialog(true)}>
            <Icon name="FolderOpen" size={16} className="mr-2" />
            Шаблоны
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Eye" size={16} className="mr-2" />
            Предпросмотр
          </Button>
          <Button size="sm" onClick={() => setShowSaveDialog(true)}>
            <Icon name="Save" size={16} className="mr-2" />
            Сохранить
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar */}
        <div className="w-80 bg-white border-r flex flex-col">
          <div className="border-b p-4">
            <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setActivePanel('blocks')}
                className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                  activePanel === 'blocks' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                }`}
              >
                <Icon name="Layout" size={16} className="inline mr-2" />
                Блоки
              </button>
              <button
                onClick={() => setActivePanel('styles')}
                className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                  activePanel === 'styles' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                }`}
              >
                <Icon name="Palette" size={16} className="inline mr-2" />
                Стили
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {activePanel === 'blocks' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3">Структура</h3>
                  <div className="space-y-2">
                    {blocks.filter(b => b.category === 'structure').map(block => (
                      <div
                        key={block.id}
                        onClick={() => addNewSection(block.id)}
                        className="p-3 bg-slate-50 rounded-lg hover:bg-primary/10 cursor-pointer transition-colors flex items-center gap-3"
                      >
                        <Icon name={block.icon as any} size={20} className="text-slate-600" />
                        <span className="text-sm font-medium text-slate-800">{block.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3">Контент</h3>
                  <div className="space-y-2">
                    {blocks.filter(b => b.category === 'content').map(block => (
                      <div
                        key={block.id}
                        onClick={() => addNewSection(block.id)}
                        className="p-3 bg-slate-50 rounded-lg hover:bg-primary/10 cursor-pointer transition-colors flex items-center gap-3"
                      >
                        <Icon name={block.icon as any} size={20} className="text-slate-600" />
                        <span className="text-sm font-medium text-slate-800">{block.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3">Магазин</h3>
                  <div className="space-y-2">
                    {blocks.filter(b => b.category === 'shop').map(block => (
                      <div
                        key={block.id}
                        onClick={() => addNewSection(block.id)}
                        className="p-3 bg-slate-50 rounded-lg hover:bg-primary/10 cursor-pointer transition-colors flex items-center gap-3"
                      >
                        <Icon name={block.icon as any} size={20} className="text-slate-600" />
                        <span className="text-sm font-medium text-slate-800">{block.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activePanel === 'styles' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 mb-4">Общие стили сайта</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Основной цвет</Label>
                      <div className="flex gap-2">
                        <input type="color" defaultValue="#667eea" className="w-12 h-10 rounded border cursor-pointer" />
                        <Input type="text" defaultValue="#667eea" className="flex-1 text-sm" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Цвет текста</Label>
                      <div className="flex gap-2">
                        <input type="color" defaultValue="#1e293b" className="w-12 h-10 rounded border cursor-pointer" />
                        <Input type="text" defaultValue="#1e293b" className="flex-1 text-sm" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Фон сайта</Label>
                      <div className="flex gap-2">
                        <input type="color" defaultValue="#ffffff" className="w-12 h-10 rounded border cursor-pointer" />
                        <Input type="text" defaultValue="#ffffff" className="flex-1 text-sm" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Шрифт заголовков</Label>
                      <select className="w-full border rounded-md px-3 py-2 text-sm">
                        <option>Inter</option>
                        <option>Roboto</option>
                        <option>Montserrat</option>
                        <option>Open Sans</option>
                        <option>Lato</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Шрифт текста</Label>
                      <select className="w-full border rounded-md px-3 py-2 text-sm">
                        <option>Inter</option>
                        <option>Roboto</option>
                        <option>Open Sans</option>
                        <option>Lato</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Скругление углов</Label>
                      <Input type="range" min="0" max="20" defaultValue="8" className="w-full" />
                      <div className="text-xs text-slate-500 text-right">8px</div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Button variant="outline" className="w-full" size="sm">
                    <Icon name="RefreshCw" size={14} className="mr-2" />
                    Сбросить к умолчаниям
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center - Preview */}
        <div className="flex-1 overflow-auto bg-slate-200 p-8">
          <div 
            className="mx-auto bg-white shadow-2xl overflow-hidden transition-all duration-300"
            style={{ width: getPreviewWidth(), minHeight: '100%' }}
          >
            {sections.map((section, index) => (
              <div key={section.id} className="relative group">
                {renderSection(section)}
                {selectedElement === section.id && (
                  <div className="absolute top-2 right-2 flex gap-1 bg-white rounded-lg shadow-lg p-1">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0"
                      onClick={() => moveSection(section.id, 'up')}
                      disabled={index === 0}
                    >
                      <Icon name="ChevronUp" size={14} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0"
                      onClick={() => moveSection(section.id, 'down')}
                      disabled={index === sections.length - 1}
                    >
                      <Icon name="ChevronDown" size={14} />
                    </Button>
                    <div className="w-px bg-slate-200" />
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0"
                      onClick={() => duplicateSection(section.id)}
                    >
                      <Icon name="Copy" size={14} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 text-red-600"
                      onClick={() => deleteSection(section.id)}
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right sidebar - Properties */}
        <div className="w-80 bg-white border-l flex flex-col">
          <div className="border-b p-4">
            <h2 className="font-semibold text-slate-800">
              {selectedElement ? sections.find(s => s.id === selectedElement)?.name : 'Выберите элемент'}
            </h2>
          </div>

          {selectedElement ? (
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-6">
                {/* Element specific settings */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Содержимое</h3>
                  <div className="space-y-3">
                    {sections.find(s => s.id === selectedElement)?.type === 'header' && (
                      <>
                        <div className="space-y-1">
                          <Label className="text-xs">Логотип</Label>
                          <Input 
                            type="text" 
                            defaultValue={sections.find(s => s.id === selectedElement)?.content.logo}
                            className="text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Телефон</Label>
                          <Input 
                            type="text" 
                            defaultValue={sections.find(s => s.id === selectedElement)?.content.phone}
                            className="text-sm"
                          />
                        </div>
                      </>
                    )}

                    {sections.find(s => s.id === selectedElement)?.type === 'hero' && (
                      <>
                        <div className="space-y-1">
                          <Label className="text-xs">Заголовок</Label>
                          <Input 
                            type="text" 
                            defaultValue={sections.find(s => s.id === selectedElement)?.content.title}
                            className="text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Подзаголовок</Label>
                          <Input 
                            type="text" 
                            defaultValue={sections.find(s => s.id === selectedElement)?.content.subtitle}
                            className="text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Текст кнопки</Label>
                          <Input 
                            type="text" 
                            defaultValue={sections.find(s => s.id === selectedElement)?.content.button}
                            className="text-sm"
                          />
                        </div>
                      </>
                    )}

                    {sections.find(s => s.id === selectedElement)?.type === 'features' && (
                      <>
                        <div className="space-y-1">
                          <Label className="text-xs">Заголовок секции</Label>
                          <Input 
                            type="text" 
                            defaultValue={sections.find(s => s.id === selectedElement)?.content.title}
                            className="text-sm"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Style settings */}
                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Стили</h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Фон</Label>
                      <div className="flex gap-2">
                        <input 
                          type="color" 
                          defaultValue="#ffffff"
                          className="w-10 h-8 rounded border cursor-pointer" 
                        />
                        <Input 
                          type="text" 
                          defaultValue={sections.find(s => s.id === selectedElement)?.styles.background}
                          className="flex-1 text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs">Цвет текста</Label>
                      <div className="flex gap-2">
                        <input 
                          type="color" 
                          defaultValue={sections.find(s => s.id === selectedElement)?.styles.textColor}
                          className="w-10 h-8 rounded border cursor-pointer" 
                        />
                        <Input 
                          type="text" 
                          defaultValue={sections.find(s => s.id === selectedElement)?.styles.textColor}
                          className="flex-1 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t pt-4 space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="sm"
                    onClick={() => duplicateSection(selectedElement)}
                  >
                    <Icon name="Copy" size={14} className="mr-2" />
                    Дублировать секцию
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full text-red-600" 
                    size="sm"
                    onClick={() => deleteSection(selectedElement)}
                  >
                    <Icon name="Trash2" size={14} className="mr-2" />
                    Удалить секцию
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center">
              <div className="text-slate-400">
                <Icon name="MousePointerClick" size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-sm">Кликните на элемент на странице, чтобы настроить его</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Сохранить шаблон</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Название шаблона</Label>
                  <Input 
                    id="template-name"
                    placeholder="Например: Главная страница"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Описание (необязательно)</Label>
                  <Textarea 
                    placeholder="Краткое описание шаблона"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowSaveDialog(false)}
                  >
                    Отмена
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      const input = document.getElementById('template-name') as HTMLInputElement;
                      saveTemplate(input.value);
                    }}
                  >
                    <Icon name="Save" size={16} className="mr-2" />
                    Сохранить
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Templates Dialog */}
      {showTemplatesDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Мои шаблоны</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowTemplatesDialog(false)}
                >
                  <Icon name="X" size={18} />
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {savedTemplates.map(template => (
                  <div 
                    key={template.id}
                    className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                    onClick={() => loadTemplate(template.id)}
                  >
                    <div className="text-4xl mb-3 text-center">{template.thumbnail}</div>
                    <h3 className="font-semibold mb-2">{template.name}</h3>
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>{template.sections} секций</span>
                      <span>{template.date}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-slate-700">
                <Icon name="Info" size={16} className="inline mr-2 text-blue-500" />
                Нажмите на шаблон, чтобы загрузить его в редактор
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default VisualEditor;