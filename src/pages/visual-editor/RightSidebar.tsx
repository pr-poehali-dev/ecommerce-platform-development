import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface RightSidebarProps {
  selectedElement: string | null;
  sections: any[];
  onDuplicate: (sectionId: string) => void;
  onDelete: (sectionId: string) => void;
  onUpdateContent: (sectionId: string, field: string, value: any) => void;
  onUpdateStyles: (sectionId: string, styles: any) => void;
}

const GOOGLE_FONTS = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Oswald',
  'Raleway',
  'PT Sans',
  'Merriweather',
  'Playfair Display',
  'Ubuntu',
  'Nunito',
  'Poppins',
  'Rubik',
  'Work Sans'
];

const RightSidebar = ({ selectedElement, sections, onDuplicate, onDelete, onUpdateContent, onUpdateStyles }: RightSidebarProps) => {
  const selectedSection = sections.find(s => s.id === selectedElement);
  const [localStyles, setLocalStyles] = useState(selectedSection?.styles || {});

  const handleContentChange = (field: string, value: any) => {
    if (selectedElement) {
      onUpdateContent(selectedElement, field, value);
    }
  };

  const handleStyleChange = (styleKey: string, value: any) => {
    const newStyles = { ...localStyles, [styleKey]: value };
    setLocalStyles(newStyles);
    if (selectedElement) {
      onUpdateStyles(selectedElement, newStyles);
    }
  };

  const handleImageUpload = (field: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target?.result as string;
          handleContentChange(field, imageUrl);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="w-80 bg-white border-l flex flex-col">
      <div className="border-b p-4">
        <h2 className="font-semibold text-slate-800">
          {selectedElement ? selectedSection?.name : 'Выберите элемент'}
        </h2>
      </div>

      {selectedElement ? (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Содержимое</h3>
              <div className="space-y-3">
                {selectedSection?.type === 'header' && (
                  <>
                    <div className="space-y-1">
                      <Label className="text-xs">Логотип</Label>
                      <Input 
                        type="text" 
                        value={selectedSection?.content.logo || ''}
                        onChange={(e) => handleContentChange('logo', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Телефон</Label>
                      <Input 
                        type="text" 
                        value={selectedSection?.content.phone || ''}
                        onChange={(e) => handleContentChange('phone', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  </>
                )}

                {selectedSection?.type === 'hero' && (
                  <>
                    <div className="space-y-1">
                      <Label className="text-xs">Заголовок</Label>
                      <Input 
                        type="text" 
                        value={selectedSection?.content.title || ''}
                        onChange={(e) => handleContentChange('title', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Подзаголовок</Label>
                      <Input 
                        type="text" 
                        value={selectedSection?.content.subtitle || ''}
                        onChange={(e) => handleContentChange('subtitle', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Текст кнопки</Label>
                      <Input 
                        type="text" 
                        value={selectedSection?.content.button || ''}
                        onChange={(e) => handleContentChange('button', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Фоновое изображение</Label>
                      <div className="flex gap-2">
                        <Input 
                          type="text" 
                          value={selectedSection?.content.image || ''}
                          onChange={(e) => handleContentChange('image', e.target.value)}
                          placeholder="URL изображения"
                          className="text-sm flex-1"
                        />
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleImageUpload('image')}
                        >
                          <Icon name="Upload" size={14} />
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {selectedSection?.type === 'features' && (
                  <>
                    <div className="space-y-1">
                      <Label className="text-xs">Заголовок секции</Label>
                      <Input 
                        type="text" 
                        value={selectedSection?.content.title || ''}
                        onChange={(e) => handleContentChange('title', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Стили</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-xs">Фон</Label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      value={localStyles.background || '#ffffff'}
                      onChange={(e) => handleStyleChange('background', e.target.value)}
                      className="w-10 h-8 rounded border cursor-pointer" 
                    />
                    <Input 
                      type="text" 
                      value={localStyles.background || '#ffffff'}
                      onChange={(e) => handleStyleChange('background', e.target.value)}
                      className="flex-1 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Цвет текста</Label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      value={localStyles.textColor || '#000000'}
                      onChange={(e) => handleStyleChange('textColor', e.target.value)}
                      className="w-10 h-8 rounded border cursor-pointer" 
                    />
                    <Input 
                      type="text" 
                      value={localStyles.textColor || '#000000'}
                      onChange={(e) => handleStyleChange('textColor', e.target.value)}
                      className="flex-1 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Шрифт</Label>
                  <Select 
                    value={localStyles.fontFamily || 'Inter'}
                    onValueChange={(value) => handleStyleChange('fontFamily', value)}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {GOOGLE_FONTS.map(font => (
                        <SelectItem key={font} value={font}>{font}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Размер шрифта (px)</Label>
                  <div className="flex items-center gap-3">
                    <Slider
                      value={[parseInt(localStyles.fontSize) || 16]}
                      onValueChange={([value]) => handleStyleChange('fontSize', `${value}px`)}
                      min={12}
                      max={72}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-xs text-slate-500 w-8">{parseInt(localStyles.fontSize) || 16}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Отступы (padding)</Label>
                  <div className="flex items-center gap-3">
                    <Slider
                      value={[parseInt(localStyles.padding) || 20]}
                      onValueChange={([value]) => handleStyleChange('padding', `${value}px`)}
                      min={0}
                      max={100}
                      step={5}
                      className="flex-1"
                    />
                    <span className="text-xs text-slate-500 w-8">{parseInt(localStyles.padding) || 20}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Выравнивание</Label>
                  <Select 
                    value={localStyles.textAlign || 'left'}
                    onValueChange={(value) => handleStyleChange('textAlign', value)}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Слева</SelectItem>
                      <SelectItem value="center">По центру</SelectItem>
                      <SelectItem value="right">Справа</SelectItem>
                      <SelectItem value="justify">По ширине</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <Button 
                variant="outline" 
                className="w-full" 
                size="sm"
                onClick={() => onDuplicate(selectedElement)}
              >
                <Icon name="Copy" size={14} className="mr-2" />
                Дублировать секцию
              </Button>
              <Button 
                variant="outline" 
                className="w-full text-red-600" 
                size="sm"
                onClick={() => onDelete(selectedElement)}
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
  );
};

export default RightSidebar;