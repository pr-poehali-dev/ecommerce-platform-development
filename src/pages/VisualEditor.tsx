import { useState } from 'react';
import LeftSidebar from './visual-editor/LeftSidebar';
import RightSidebar from './visual-editor/RightSidebar';
import EditorDialogs from './visual-editor/EditorDialogs';
import EditorToolbar from './visual-editor/EditorToolbar';
import EditorCanvas from './visual-editor/EditorCanvas';
import {
  blocks,
  savedTemplates,
  initialSections,
  getDefaultContent,
  getDefaultStyles,
  getPreviewWidth
} from './visual-editor/editorUtils';

const VisualEditor = () => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activePanel, setActivePanel] = useState<'blocks' | 'styles'>('blocks');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showTemplatesDialog, setShowTemplatesDialog] = useState(false);
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

  return (
    <div className="h-screen flex flex-col bg-slate-100">
      <EditorToolbar
        previewMode={previewMode}
        onPreviewModeChange={setPreviewMode}
        onShowTemplates={() => setShowTemplatesDialog(true)}
        onSave={() => setShowSaveDialog(true)}
      />

      <div className="flex-1 flex overflow-hidden">
        <LeftSidebar
          activePanel={activePanel}
          onPanelChange={setActivePanel}
          blocks={blocks}
          onAddBlock={addNewSection}
        />

        <EditorCanvas
          sections={sections}
          selectedElement={selectedElement}
          previewWidth={getPreviewWidth(previewMode)}
          onSelectElement={setSelectedElement}
          onMoveSection={moveSection}
          onDuplicateSection={duplicateSection}
          onDeleteSection={deleteSection}
        />

        <RightSidebar
          selectedElement={selectedElement}
          sections={sections}
          onDuplicate={duplicateSection}
          onDelete={deleteSection}
        />
      </div>

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