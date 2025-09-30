import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import SectionRenderer from './SectionRenderer';

interface Section {
  id: string;
  type: string;
  name: string;
  content: any;
  styles: any;
}

interface EditorCanvasProps {
  sections: Section[];
  selectedElement: string | null;
  previewWidth: string;
  onSelectElement: (id: string | null) => void;
  onMoveSection: (sectionId: string, direction: 'up' | 'down') => void;
  onDuplicateSection: (sectionId: string) => void;
  onDeleteSection: (sectionId: string) => void;
}

const EditorCanvas = ({
  sections,
  selectedElement,
  previewWidth,
  onSelectElement,
  onMoveSection,
  onDuplicateSection,
  onDeleteSection
}: EditorCanvasProps) => {
  return (
    <div className="flex-1 overflow-auto bg-slate-200 p-8">
      <div 
        className="mx-auto bg-white shadow-2xl overflow-hidden transition-all duration-300"
        style={{ width: previewWidth, minHeight: '100%' }}
      >
        {sections.map((section, index) => (
          <div key={section.id} className="relative group">
            <SectionRenderer
              section={section}
              isSelected={selectedElement === section.id}
              onSelect={onSelectElement}
            />
            {selectedElement === section.id && (
              <div className="absolute top-2 right-2 flex gap-1 bg-white rounded-lg shadow-lg p-1">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8 p-0"
                  onClick={() => onMoveSection(section.id, 'up')}
                  disabled={index === 0}
                >
                  <Icon name="ChevronUp" size={14} />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8 p-0"
                  onClick={() => onMoveSection(section.id, 'down')}
                  disabled={index === sections.length - 1}
                >
                  <Icon name="ChevronDown" size={14} />
                </Button>
                <div className="w-px bg-slate-200" />
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8 p-0"
                  onClick={() => onDuplicateSection(section.id)}
                >
                  <Icon name="Copy" size={14} />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8 p-0 text-red-600"
                  onClick={() => onDeleteSection(section.id)}
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditorCanvas;