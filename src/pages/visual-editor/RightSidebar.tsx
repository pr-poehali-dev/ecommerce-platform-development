import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface RightSidebarProps {
  selectedElement: string | null;
  sections: any[];
  onDuplicate: (sectionId: string) => void;
  onDelete: (sectionId: string) => void;
}

const RightSidebar = ({ selectedElement, sections, onDuplicate, onDelete }: RightSidebarProps) => {
  const selectedSection = sections.find(s => s.id === selectedElement);

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
                        defaultValue={selectedSection?.content.logo}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Телефон</Label>
                      <Input 
                        type="text" 
                        defaultValue={selectedSection?.content.phone}
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
                        defaultValue={selectedSection?.content.title}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Подзаголовок</Label>
                      <Input 
                        type="text" 
                        defaultValue={selectedSection?.content.subtitle}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Текст кнопки</Label>
                      <Input 
                        type="text" 
                        defaultValue={selectedSection?.content.button}
                        className="text-sm"
                      />
                    </div>
                  </>
                )}

                {selectedSection?.type === 'features' && (
                  <>
                    <div className="space-y-1">
                      <Label className="text-xs">Заголовок секции</Label>
                      <Input 
                        type="text" 
                        defaultValue={selectedSection?.content.title}
                        className="text-sm"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

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
                      defaultValue={selectedSection?.styles.background}
                      className="flex-1 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Цвет текста</Label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      defaultValue={selectedSection?.styles.textColor}
                      className="w-10 h-8 rounded border cursor-pointer" 
                    />
                    <Input 
                      type="text" 
                      defaultValue={selectedSection?.styles.textColor}
                      className="flex-1 text-sm"
                    />
                  </div>
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