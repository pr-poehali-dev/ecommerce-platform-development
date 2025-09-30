import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface Block {
  id: string;
  name: string;
  icon: string;
  category: string;
}

interface LeftSidebarProps {
  activePanel: 'blocks' | 'styles';
  onPanelChange: (panel: 'blocks' | 'styles') => void;
  blocks: Block[];
  onAddBlock: (blockId: string) => void;
}

const LeftSidebar = ({ activePanel, onPanelChange, blocks, onAddBlock }: LeftSidebarProps) => {
  return (
    <div className="w-80 bg-white border-r flex flex-col">
      <div className="border-b p-4">
        <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => onPanelChange('blocks')}
            className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
              activePanel === 'blocks' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
            }`}
          >
            <Icon name="Layout" size={16} className="inline mr-2" />
            Блоки
          </button>
          <button
            onClick={() => onPanelChange('styles')}
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
                    onClick={() => onAddBlock(block.id)}
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
                    onClick={() => onAddBlock(block.id)}
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
                    onClick={() => onAddBlock(block.id)}
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
  );
};

export default LeftSidebar;