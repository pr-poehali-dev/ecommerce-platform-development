import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import LeftSidebar from './visual-editor/LeftSidebar';
import RightSidebar from './visual-editor/RightSidebar';
import SectionRenderer from './visual-editor/SectionRenderer';
import EditorDialogs from './visual-editor/EditorDialogs';

const VisualEditor = () => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activePanel, setActivePanel] = useState<'blocks' | 'styles'>('blocks');
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
        <LeftSidebar
          activePanel={activePanel}
          onPanelChange={setActivePanel}
          blocks={blocks}
          onAddBlock={addNewSection}
        />

        {/* Center - Preview */}
        <div className="flex-1 overflow-auto bg-slate-200 p-8">
          <div 
            className="mx-auto bg-white shadow-2xl overflow-hidden transition-all duration-300"
            style={{ width: getPreviewWidth(), minHeight: '100%' }}
          >
            {sections.map((section, index) => (
              <div key={section.id} className="relative group">
                <SectionRenderer
                  section={section}
                  isSelected={selectedElement === section.id}
                  onSelect={setSelectedElement}
                />
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

        {/* Right sidebar */}
        <RightSidebar
          selectedElement={selectedElement}
          sections={sections}
          onDuplicate={duplicateSection}
          onDelete={deleteSection}
        />
      </div>

      {/* Dialogs */}
      <EditorDialogs
        showSaveDialog={showSaveDialog}
        showTemplatesDialog={showTemplatesDialog}
        savedTemplates={savedTemplates}
        onCloseSave={() => setShowSaveDialog(false)}
        onCloseTemplates={() => setShowTemplatesDialog(false)}
        onSaveTemplate={saveTemplate}
        onLoadTemplate={loadTemplate}
      />
    </div>
  );
};

export default VisualEditor;