import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LeftSidebar from './visual-editor/LeftSidebar';
import RightSidebar from './visual-editor/RightSidebar';
import EditorDialogs from './visual-editor/EditorDialogs';
import EditorToolbar from './visual-editor/EditorToolbar';
import EditorCanvas from './visual-editor/EditorCanvas';
import ProjectsManager from './visual-editor/ProjectsManager';
import ZeroBlockEditor from './visual-editor/ZeroBlockEditor';
import {
  blocks,
  savedTemplates,
  initialSections,
  getDefaultContent,
  getDefaultStyles,
  getPreviewWidth
} from './visual-editor/editorUtils';
import { ecommerceTemplate } from '@/data/templates/ecommerce-template';

const VisualEditor = () => {
  const location = useLocation();
  const [view, setView] = useState<'projects' | 'editor'>('projects');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activePanel, setActivePanel] = useState<'blocks' | 'styles'>('blocks');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showTemplatesDialog, setShowTemplatesDialog] = useState(false);
  const [showZeroEditor, setShowZeroEditor] = useState(false);
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

  const addZeroBlock = (html: string, css: string, js: string) => {
    const newSection = {
      id: `zero-${Date.now()}`,
      type: 'zero',
      name: 'Zero Block',
      content: { html, css, js },
      styles: {}
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

  const handleOpenProject = (projectId: number) => {
    console.log('Открытие проекта:', projectId);
    setView('editor');
  };

  const handleCreateProject = () => {
    console.log('Создание нового проекта');
    setSections(initialSections);
    setView('editor');
  };

  useEffect(() => {
    const state = location.state as { templateId?: string; templateName?: string };
    if (state?.templateId) {
      console.log('Загрузка шаблона:', state.templateName);
      
      if (state.templateId === 'ecommerce-pro') {
        const templateSections = ecommerceTemplate.sections.map(section => ({
          id: section.id,
          type: section.type,
          name: section.name,
          content: section.content,
          styles: section.styles
        }));
        setSections(templateSections);
      } else {
        setSections(initialSections);
      }
      
      setView('editor');
    }
  }, [location.state]);

  if (view === 'projects') {
    return (
      <ProjectsManager
        onOpenProject={handleOpenProject}
        onCreateProject={handleCreateProject}
      />
    );
  }

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
          onShowZeroEditor={() => setShowZeroEditor(true)}
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

      {showZeroEditor && (
        <ZeroBlockEditor
          onClose={() => setShowZeroEditor(false)}
          onSave={addZeroBlock}
        />
      )}
    </div>
  );
};

export default VisualEditor;