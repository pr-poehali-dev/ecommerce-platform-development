import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface EditorToolbarProps {
  previewMode: 'desktop' | 'tablet' | 'mobile';
  onPreviewModeChange: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  onShowTemplates: () => void;
  onSave: () => void;
}

const EditorToolbar = ({
  previewMode,
  onPreviewModeChange,
  onShowTemplates,
  onSave
}: EditorToolbarProps) => {
  return (
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
        <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => onPreviewModeChange('desktop')}
            className={`p-2 rounded transition-colors ${previewMode === 'desktop' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
            title="Десктоп"
          >
            <Icon name="Monitor" size={18} />
          </button>
          <button
            onClick={() => onPreviewModeChange('tablet')}
            className={`p-2 rounded transition-colors ${previewMode === 'tablet' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
            title="Планшет"
          >
            <Icon name="Tablet" size={18} />
          </button>
          <button
            onClick={() => onPreviewModeChange('mobile')}
            className={`p-2 rounded transition-colors ${previewMode === 'mobile' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
            title="Мобильный"
          >
            <Icon name="Smartphone" size={18} />
          </button>
        </div>

        <div className="h-6 w-px bg-gray-300 mx-2" />

        <Button variant="outline" size="sm" onClick={onShowTemplates}>
          <Icon name="FolderOpen" size={16} className="mr-2" />
          Шаблоны
        </Button>
        <Button variant="outline" size="sm">
          <Icon name="Eye" size={16} className="mr-2" />
          Предпросмотр
        </Button>
        <Button size="sm" onClick={onSave}>
          <Icon name="Save" size={16} className="mr-2" />
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;