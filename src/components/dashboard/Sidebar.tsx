import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
}

interface MenuSection {
  id: string;
  title: string;
  icon: string;
  items: MenuItem[];
}

interface SidebarProps {
  sidebarOpen: boolean;
  activeSection: string;
  openSections: { [key: string]: boolean };
  menuSections: MenuSection[];
  onToggleSection: (section: string) => void;
  onSetActiveSection: (section: string) => void;
}

const Sidebar = ({
  sidebarOpen,
  activeSection,
  openSections,
  menuSections,
  onToggleSection,
  onSetActiveSection
}: SidebarProps) => {
  const navigate = useNavigate();

  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-800 to-slate-900 text-white transition-all duration-300 z-40 ${
        sidebarOpen ? 'w-64' : 'w-0 -translate-x-full'
      }`}
    >
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-orange-500 rounded-xl flex items-center justify-center">
            <Icon name="Layers" className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold">SiteBuilder</span>
        </div>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-180px)] p-4">
        {menuSections.map(section => (
          <div key={section.id} className="mb-2">
            <div
              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 cursor-pointer transition-colors"
              onClick={() => onToggleSection(section.id)}
            >
              <div className="flex items-center gap-3">
                <Icon name={section.icon as any} size={18} />
                <span className="font-medium text-sm">{section.title}</span>
              </div>
              <Icon 
                name="ChevronRight" 
                size={16} 
                className={`transition-transform ${openSections[section.id] ? 'rotate-90' : ''}`}
              />
            </div>
            {openSections[section.id] && (
              <div className="ml-4 mt-1 space-y-1">
                {section.items.map(item => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-2 p-2 pl-4 rounded-lg cursor-pointer transition-colors text-sm ${
                      activeSection === item.id
                        ? 'bg-primary/20 text-white'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    }`}
                    onClick={() => onSetActiveSection(item.id)}
                  >
                    <Icon name={item.icon as any} size={14} />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700 bg-slate-900">
        <div className="text-xs space-y-2">
          <div className="flex justify-between text-slate-400">
            <span>На счету:</span>
            <span className="text-red-400 font-semibold">42 руб</span>
          </div>
          <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
            Пополнить
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;