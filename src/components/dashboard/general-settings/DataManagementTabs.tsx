import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface DataManagementTabsProps {
  activeTab: string;
}

const DataManagementTabs = ({ activeTab }: DataManagementTabsProps) => {
  return (
    <>
      {/* Copy data tab */}
      {activeTab === 'copy' && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 text-sm text-amber-700 bg-amber-50 p-3 rounded-lg mb-6">
              <Icon name="AlertTriangle" size={20} className="flex-shrink-0 mt-0.5" />
              <p>
                Копирование данных создаст точную копию всех товаров, категорий и настроек из другого магазина на этой платформе.
                Текущие данные будут заменены!
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="source-shop">Магазин-источник (логин)</Label>
                <Input id="source-shop" placeholder="Введите логин магазина" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="source-password">Пароль магазина-источника</Label>
                <Input id="source-password" type="password" placeholder="Введите пароль" />
              </div>

              <div className="space-y-2">
                <Label>Что копировать:</Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Товары и категории</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Настройки магазина</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Дизайн и оформление</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Страницы контента</span>
                  </label>
                </div>
              </div>

              <Button variant="destructive" className="w-full">
                <Icon name="Copy" size={18} className="mr-2" />
                Начать копирование
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Backups tab */}
      {activeTab === 'backups' && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3 text-sm text-slate-600 mb-6">
                <Icon name="Info" size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <p>
                  Резервные копии создаются автоматически каждые 24 часа и хранятся 30 дней. Вы можете в любой момент восстановить магазин из копии.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-slate-800">Автоматические резервные копии</h3>
                  <Button>
                    <Icon name="Download" size={18} className="mr-2" />
                    Создать копию сейчас
                  </Button>
                </div>

                <div className="space-y-2">
                  {[
                    { date: '30.09.2025 03:00', size: '24.5 МБ' },
                    { date: '29.09.2025 03:00', size: '24.3 МБ' },
                    { date: '28.09.2025 03:00', size: '24.1 МБ' },
                    { date: '27.09.2025 03:00', size: '23.9 МБ' },
                    { date: '26.09.2025 03:00', size: '23.7 МБ' }
                  ].map((backup, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <Icon name="Database" size={20} className="text-slate-600" />
                        <div>
                          <div className="font-medium text-slate-800">{backup.date}</div>
                          <div className="text-sm text-slate-600">{backup.size}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Icon name="Download" size={16} className="mr-1" />
                          Скачать
                        </Button>
                        <Button size="sm">
                          <Icon name="RotateCcw" size={16} className="mr-1" />
                          Восстановить
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default DataManagementTabs;