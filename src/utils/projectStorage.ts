export interface Project {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  sections: any[];
  previewImage?: string;
}

const STORAGE_KEY = 'visual_editor_projects';
const CURRENT_PROJECT_KEY = 'visual_editor_current_project';

export const projectStorage = {
  getAllProjects(): Project[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading projects:', error);
      return [];
    }
  },

  getProject(id: string): Project | null {
    const projects = this.getAllProjects();
    return projects.find(p => p.id === id) || null;
  },

  saveProject(project: Omit<Project, 'updatedAt'>): Project {
    const projects = this.getAllProjects();
    const updatedProject: Project = {
      ...project,
      updatedAt: new Date().toISOString()
    };
    
    const existingIndex = projects.findIndex(p => p.id === project.id);
    if (existingIndex >= 0) {
      projects[existingIndex] = updatedProject;
    } else {
      projects.push(updatedProject);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    return updatedProject;
  },

  deleteProject(id: string): void {
    const projects = this.getAllProjects();
    const filtered = projects.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    
    const currentProjectId = this.getCurrentProjectId();
    if (currentProjectId === id) {
      this.clearCurrentProject();
    }
  },

  duplicateProject(id: string): Project | null {
    const project = this.getProject(id);
    if (!project) return null;

    const newProject: Omit<Project, 'updatedAt'> = {
      id: `project-${Date.now()}`,
      name: `${project.name} (копия)`,
      createdAt: new Date().toISOString(),
      sections: JSON.parse(JSON.stringify(project.sections)),
      previewImage: project.previewImage
    };

    return this.saveProject(newProject);
  },

  setCurrentProject(id: string): void {
    localStorage.setItem(CURRENT_PROJECT_KEY, id);
  },

  getCurrentProjectId(): string | null {
    return localStorage.getItem(CURRENT_PROJECT_KEY);
  },

  clearCurrentProject(): void {
    localStorage.removeItem(CURRENT_PROJECT_KEY);
  },

  autoSave(projectId: string, sections: any[]): void {
    const project = this.getProject(projectId);
    if (project) {
      this.saveProject({
        ...project,
        sections
      });
    }
  },

  createNewProject(name: string, sections: any[]): Project {
    const newProject: Omit<Project, 'updatedAt'> = {
      id: `project-${Date.now()}`,
      name,
      createdAt: new Date().toISOString(),
      sections
    };
    return this.saveProject(newProject);
  },

  generatePreviewImage(sections: any[]): string {
    if (sections.length === 0) return '';
    
    const firstSection = sections[0];
    return firstSection.content?.image || '';
  }
};