import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface Block {
  id: string;
  name: string;
  category: string;
  type: 'preset' | 'zero';
  thumbnail: string;
  description: string;
}

interface BlockLibraryProps {
  onAddBlock: (blockType: string, blockData?: any) => void;
  onShowZeroEditor: () => void;
}

const BlockLibrary = ({ onAddBlock, onShowZeroEditor }: BlockLibraryProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Все блоки', icon: 'Grid3x3' },
    { id: 'covers', name: 'Обложки', icon: 'Layout' },
    { id: 'text', name: 'Текст', icon: 'Type' },
    { id: 'gallery', name: 'Галереи', icon: 'Image' },
    { id: 'features', name: 'Преимущества', icon: 'Star' },
    { id: 'shop', name: 'Магазин', icon: 'ShoppingCart' },
    { id: 'forms', name: 'Формы', icon: 'FileText' },
    { id: 'zero', name: 'Zero блоки', icon: 'Code' }
  ];

  const blocks: Block[] = [
    {
      id: 'cover-1',
      name: 'Обложка с изображением',
      category: 'covers',
      type: 'preset',
      thumbnail: '🎨',
      description: 'Полноэкранная обложка с фоном'
    },
    {
      id: 'cover-2',
      name: 'Обложка с видео',
      category: 'covers',
      type: 'preset',
      thumbnail: '🎬',
      description: 'Обложка с видео-фоном'
    },
    {
      id: 'text-1',
      name: 'Текстовый блок',
      category: 'text',
      type: 'preset',
      thumbnail: '📝',
      description: 'Заголовок и текст'
    },
    {
      id: 'text-2',
      name: 'Текст в 2 колонки',
      category: 'text',
      type: 'preset',
      thumbnail: '📰',
      description: 'Текст в две колонки'
    },
    {
      id: 'gallery-1',
      name: 'Галерея сеткой',
      category: 'gallery',
      type: 'preset',
      thumbnail: '🖼️',
      description: 'Изображения в сетке'
    },
    {
      id: 'gallery-2',
      name: 'Слайдер',
      category: 'gallery',
      type: 'preset',
      thumbnail: '🎞️',
      description: 'Карусель изображений'
    },
    {
      id: 'features-1',
      name: 'Иконки в ряд',
      category: 'features',
      type: 'preset',
      thumbnail: '⭐',
      description: 'Преимущества с иконками'
    },
    {
      id: 'shop-1',
      name: 'Карточки товаров',
      category: 'shop',
      type: 'preset',
      thumbnail: '🛍️',
      description: 'Сетка товаров'
    },
    {
      id: 'form-1',
      name: 'Форма контактов',
      category: 'forms',
      type: 'preset',
      thumbnail: '✉️',
      description: 'Форма обратной связи'
    }
  ];

  const filteredBlocks = blocks.filter(block => {
    const matchesSearch = block.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || block.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full flex flex-col">
      {/* Search */}
      <div className="p-4 border-b">
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск блоков..."
            className="pl-9"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 border-b">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                activeCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Icon name={category.icon as any} size={14} />
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Zero Block Creator */}
      {activeCategory === 'zero' && (
        <div className="p-4">
          <Card className="bg-gradient-to-br from-purple-500 to-blue-500 text-white border-0 cursor-pointer hover:shadow-lg transition-shadow" onClick={onShowZeroEditor}>
            <CardContent className="p-6 text-center">
              <Icon name="Code" size={48} className="mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Создать Zero Block</h3>
              <p className="text-sm text-white/90 mb-4">
                Создайте уникальный блок с полным контролем над HTML/CSS/JS
              </p>
              <Button variant="secondary" size="sm" className="w-full">
                <Icon name="Plus" size={16} className="mr-2" />
                Открыть редактор
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Blocks Grid */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {filteredBlocks.map(block => (
            <Card
              key={block.id}
              className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
              onClick={() => onAddBlock(block.id)}
            >
              <CardContent className="p-4">
                <div className="text-4xl mb-3 text-center">{block.thumbnail}</div>
                <h4 className="font-semibold text-sm text-slate-800 mb-1 text-center">
                  {block.name}
                </h4>
                <p className="text-xs text-slate-500 text-center">
                  {block.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBlocks.length === 0 && (
          <div className="text-center py-12">
            <Icon name="SearchX" size={48} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500">Блоки не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockLibrary;