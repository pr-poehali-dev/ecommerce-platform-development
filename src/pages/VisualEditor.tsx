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
import { projectStorage } from '@/utils/projectStorage';
import { useToast } from '@/hooks/use-toast';

const VisualEditor = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [view, setView] = useState<'projects' | 'editor'>('projects');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activePanel, setActivePanel] = useState<'blocks' | 'styles'>('blocks');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showTemplatesDialog, setShowTemplatesDialog] = useState(false);
  const [showZeroEditor, setShowZeroEditor] = useState(false);
  const [sections, setSections] = useState(initialSections);
  const [editingText, setEditingText] = useState<{sectionId: string; field: string} | null>(null);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [projectName, setProjectName] = useState<string>('Новый проект');

  const addNewSection = (blockType: string) => {
    const newSection = {
      id: `${blockType}-${Date.now()}`,
      type: blockType,
      name: blocks.find(b => b.id === blockType)?.name || 'Новая секция',
      content: getDefaultContent(blockType),
      styles: getDefaultStyles(blockType)
    };
    const newSections = [...sections, newSection];
    setSections(newSections);
    autoSaveProject(newSections);
  };

  const addZeroBlock = (html: string, css: string, js: string) => {
    const newSection = {
      id: `zero-${Date.now()}`,
      type: 'zero',
      name: 'Zero Block',
      content: { html, css, js },
      styles: {}
    };
    const newSections = [...sections, newSection];
    setSections(newSections);
    autoSaveProject(newSections);
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
      autoSaveProject(newSections);
    }
  };

  const deleteSection = (sectionId: string) => {
    if (confirm('Удалить эту секцию?')) {
      const newSections = sections.filter(s => s.id !== sectionId);
      setSections(newSections);
      if (selectedElement === sectionId) {
        setSelectedElement(null);
      }
      autoSaveProject(newSections);
    }
  };

  const moveSection = (sectionId: string, direction: 'up' | 'down') => {
    const index = sections.findIndex(s => s.id === sectionId);
    if (index === -1) return;
    
    if (direction === 'up' && index > 0) {
      const newSections = [...sections];
      [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
      setSections(newSections);
      autoSaveProject(newSections);
    } else if (direction === 'down' && index < sections.length - 1) {
      const newSections = [...sections];
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
      setSections(newSections);
      autoSaveProject(newSections);
    }
  };

  const updateSectionContent = (sectionId: string, field: string, value: any) => {
    const newSections = sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          content: {
            ...section.content,
            [field]: value
          }
        };
      }
      return section;
    });
    setSections(newSections);
    autoSaveProject(newSections);
  };

  const updateSectionStyles = (sectionId: string, styles: any) => {
    const newSections = sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          styles: {
            ...section.styles,
            ...styles
          }
        };
      }
      return section;
    });
    setSections(newSections);
    autoSaveProject(newSections);
  };

  const autoSaveProject = (updatedSections: any[]) => {
    if (currentProjectId) {
      projectStorage.autoSave(currentProjectId, updatedSections);
    }
  };

  const saveTemplate = (templateName: string) => {
    if (currentProjectId) {
      const project = projectStorage.getProject(currentProjectId);
      if (project) {
        projectStorage.saveProject({
          ...project,
          name: templateName,
          sections
        });
        setProjectName(templateName);
        toast({
          title: 'Проект сохранён',
          description: `Проект "${templateName}" успешно сохранён`,
        });
      }
    } else {
      const newProject = projectStorage.createNewProject(templateName, sections);
      setCurrentProjectId(newProject.id);
      setProjectName(templateName);
      projectStorage.setCurrentProject(newProject.id);
      toast({
        title: 'Проект создан',
        description: `Проект "${templateName}" успешно создан`,
      });
    }
    setShowSaveDialog(false);
  };

  const loadTemplate = (templateId: number) => {
    console.log('Загрузка шаблона:', templateId);
    alert('Шаблон загружен!');
    setShowTemplatesDialog(false);
  };

  const handleOpenProject = (projectId: number) => {
    const projectIdStr = `project-${projectId}`;
    const project = projectStorage.getProject(projectIdStr);
    if (project) {
      setSections(project.sections);
      setCurrentProjectId(project.id);
      setProjectName(project.name);
      projectStorage.setCurrentProject(project.id);
      setView('editor');
    }
  };

  const handleCreateProject = () => {
    const newProject = projectStorage.createNewProject('Новый проект', initialSections);
    setSections(newProject.sections);
    setCurrentProjectId(newProject.id);
    setProjectName(newProject.name);
    projectStorage.setCurrentProject(newProject.id);
    setView('editor');
  };

  useEffect(() => {
    const state = location.state as { templateId?: string; templateName?: string };
    if (state?.templateId) {
      console.log('Загрузка шаблона:', state.templateName);
      
      let templateSections = initialSections;
      if (state.templateId === 'ecommerce-pro') {
        templateSections = ecommerceTemplate.sections.map(section => ({
          id: section.id,
          type: section.type,
          name: section.name,
          content: section.content,
          styles: section.styles
        }));
      }
      
      const newProject = projectStorage.createNewProject(
        state.templateName || 'Новый проект',
        templateSections
      );
      setSections(templateSections);
      setCurrentProjectId(newProject.id);
      setProjectName(newProject.name);
      projectStorage.setCurrentProject(newProject.id);
      setView('editor');
    }
  }, [location.state]);

  useEffect(() => {
    const savedProjectId = projectStorage.getCurrentProjectId();
    if (savedProjectId) {
      const project = projectStorage.getProject(savedProjectId);
      if (project) {
        setSections(project.sections);
        setCurrentProjectId(project.id);
        setProjectName(project.name);
        setView('editor');
      }
    }
  }, []);

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
        projectName={projectName}
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
          onUpdateContent={updateSectionContent}
        />

        <RightSidebar
          selectedElement={selectedElement}
          sections={sections}
          onDuplicate={duplicateSection}
          onDelete={deleteSection}
          onUpdateContent={updateSectionContent}
          onUpdateStyles={updateSectionStyles}
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