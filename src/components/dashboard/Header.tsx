import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const Header = ({ sidebarOpen, onToggleSidebar }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
          >
            <Icon name="Menu" size={24} />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Магазин</h1>
            <a 
              href="https://myshop.ru" 
              target="_blank" 
              className="text-sm text-blue-600 hover:underline"
            >
              myshop.ru
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className="text-slate-600">Новых заказов:</span>
            <span className="ml-2 font-semibold text-green-600">3</span>
          </div>
          <Button variant="ghost" size="icon">
            <Icon name="Bell" size={20} />
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-red-600 hover:text-red-700"
          >
            Выход
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;