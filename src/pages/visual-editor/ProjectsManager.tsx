import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { projectStorage, Project as StoredProject } from '@/utils/projectStorage';
import { useToast } from '@/hooks/use-toast';

interface Project {
  id: number;
  name: string;
  thumbnail: string;
  pages: number;
  updatedAt: string;
  published: boolean;
}

interface ProjectsManagerProps {
  onOpenProject: (projectId: number) => void;
  onCreateProject: () => void;
}

const ProjectsManager = ({ onOpenProject, onCreateProject }: ProjectsManagerProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [projects, setProjects] = useState<StoredProject[]>([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const storedProjects = projectStorage.getAllProjects();
    setProjects(storedProjects);
  };

  const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Удалить этот проект?')) {
      projectStorage.deleteProject(projectId);
      loadProjects();
      toast({
        title: 'Проект удалён',
        description: 'Проект успешно удалён',
      });
    }
  };

  const handleDuplicateProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const duplicated = projectStorage.duplicateProject(projectId);
    if (duplicated) {
      loadProjects();
      toast({
        title: 'Проект скопирован',
        description: `Создана копия проекта`,
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const getProjectIdNumber = (projectId: string): number => {
    return parseInt(projectId.replace('project-', ''));
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Мои проекты</h1>
            <p className="text-slate-600 mt-1">Управление сайтами и страницами</p>
          </div>
          <Button size="lg" onClick={onCreateProject}>
            <Icon name="Plus" size={20} className="mr-2" />
            Создать проект
          </Button>
        </div>

        {/* Toolbar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск проектов..."
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 rounded transition-colors ${
                    view === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                  }`}
                >
                  <Icon name="Grid3x3" size={18} />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 rounded transition-colors ${
                    view === 'list' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                  }`}
                >
                  <Icon name="List" size={18} />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Create New Card */}
            <Card
              className="border-dashed border-2 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
              onClick={onCreateProject}
            >
              <CardContent className="p-8 flex flex-col items-center justify-center h-80">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Plus" size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Создать проект</h3>
                <p className="text-sm text-slate-600 text-center">
                  Начните создание нового сайта
                </p>
              </CardContent>
            </Card>

            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden cursor-pointer hover:shadow-xl transition-all group"
                onClick={() => onOpenProject(getProjectIdNumber(project.id))}
              >
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
                  {project.previewImage ? (
                    <img
                      src={project.previewImage}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon name="Layout" size={64} className="text-primary/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      <Button size="sm" className="flex-1" onClick={(e) => {
                        e.stopPropagation();
                        onOpenProject(getProjectIdNumber(project.id));
                      }}>
                        <Icon name="Edit" size={14} className="mr-1" />
                        Редактировать
                      </Button>
                      <Button size="sm" variant="secondary" onClick={(e) => handleDuplicateProject(project.id, e)}>
                        <Icon name="Copy" size={14} />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={(e) => handleDeleteProject(project.id, e)}>
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-slate-800 flex-1 truncate">{project.name}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <Icon name="Layers" size={14} />
                      {project.sections.length} секций
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      {formatDate(project.updatedAt)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => onOpenProject(getProjectIdNumber(project.id))}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg overflow-hidden flex items-center justify-center">
                        {project.previewImage ? (
                          <img
                            src={project.previewImage}
                            alt={project.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Icon name="Layout" size={32} className="text-primary/30" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-slate-800">{project.name}</h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span>{project.sections.length} секций</span>
                          <span>Обновлен {formatDate(project.updatedAt)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={(e) => {
                          e.stopPropagation();
                          onOpenProject(getProjectIdNumber(project.id));
                        }}>
                          <Icon name="Edit" size={14} className="mr-1" />
                          Редактировать
                        </Button>
                        <Button size="sm" variant="outline" onClick={(e) => handleDuplicateProject(project.id, e)}>
                          <Icon name="Copy" size={14} />
                        </Button>
                        <Button size="sm" variant="outline" onClick={(e) => handleDeleteProject(project.id, e)}>
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {filteredProjects.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Icon name="SearchX" size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">Проекты не найдены</p>
              <Button className="mt-4" onClick={() => setSearchQuery('')}>
                Сбросить поиск
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProjectsManager;

export default ProjectsManager;