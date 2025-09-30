import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Template {
  id: number;
  name: string;
  thumbnail: string;
  sections: number;
  date: string;
}

interface EditorDialogsProps {
  showSaveDialog: boolean;
  showTemplatesDialog: boolean;
  savedTemplates: Template[];
  onCloseSave: () => void;
  onCloseTemplates: () => void;
  onSaveTemplate: (name: string) => void;
  onLoadTemplate: (id: number) => void;
}

const EditorDialogs = ({
  showSaveDialog,
  showTemplatesDialog,
  savedTemplates,
  onCloseSave,
  onCloseTemplates,
  onSaveTemplate,
  onLoadTemplate
}: EditorDialogsProps) => {
  return (
    <>
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
                    onClick={onCloseSave}
                  >
                    Отмена
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      const input = document.getElementById('template-name') as HTMLInputElement;
                      onSaveTemplate(input.value);
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

      {showTemplatesDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Мои шаблоны</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={onCloseTemplates}
                >
                  <Icon name="X" size={18} />
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {savedTemplates.map(template => (
                  <div 
                    key={template.id}
                    className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                    onClick={() => onLoadTemplate(template.id)}
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
    </>
  );
};

export default EditorDialogs;