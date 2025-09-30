import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface NotificationTabsProps {
  activeTab: string;
}

const NotificationTabs = ({ activeTab }: NotificationTabsProps) => {
  return (
    <>
      {/* Administrators tab */}
      {activeTab === 'administrators' && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3 text-sm text-slate-600 mb-6">
                <Icon name="Info" size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <p>
                  Вы можете добавить до 5 администраторов с правами доступа к панели управления магазином.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <div className="font-medium text-slate-800">myshop123 (Владелец)</div>
                    <div className="text-sm text-slate-600">shop@example.com</div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Полный доступ
                  </span>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium text-slate-800 mb-4">Добавить администратора</h3>
                  <div className="space-y-3">
                    <Input placeholder="Email нового администратора" type="email" />
                    <div className="space-y-2">
                      <Label>Права доступа</Label>
                      <div className="grid gap-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span className="text-sm">Управление заказами</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span className="text-sm">Управление товарами</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Управление настройками</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Финансы и статистика</span>
                        </label>
                      </div>
                    </div>
                    <Button className="w-full">
                      <Icon name="UserPlus" size={18} className="mr-2" />
                      Отправить приглашение
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* SMS notifications tab */}
      {activeTab === 'sms' && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 text-sm text-slate-600 mb-6">
              <Icon name="Info" size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <p>
                Настройте уведомления по SMS о важных событиях в магазине. Стоимость SMS зависит от вашего оператора связи.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sms-phone">Номер телефона для уведомлений</Label>
                <Input id="sms-phone" type="tel" defaultValue="+7 900 123 45 67" />
              </div>

              <div className="space-y-2">
                <Label>Получать SMS о следующих событиях:</Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Новые заказы</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Сообщения от покупателей</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Отмена заказов</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Критические ошибки на сайте</span>
                  </label>
                </div>
              </div>

              <Button>Сохранить настройки</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Telegram notifications tab */}
      {activeTab === 'telegram' && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 text-sm text-slate-600 mb-6">
              <Icon name="Info" size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <p>
                Получайте уведомления в Telegram о важных событиях в магазине. Быстро и бесплатно!
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="CheckCircle" size={20} className="text-green-600" />
                  <span className="font-medium text-green-800">Telegram подключен</span>
                </div>
                <p className="text-sm text-green-700">@myshop_bot - Воздушные шары и сувениры</p>
              </div>

              <div className="space-y-2">
                <Label>Получать уведомления о следующих событиях:</Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Новые заказы</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Сообщения от покупателей</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Статус заказов изменен</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Отзывы о товарах</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Товары заканчиваются на складе</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button>Сохранить настройки</Button>
                <Button variant="outline">Отключить Telegram</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Email notifications tab */}
      {activeTab === 'emails' && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 text-sm text-slate-600 mb-6">
              <Icon name="Info" size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <p>
                Настройте email-уведомления о событиях в магазине. Письма будут отправляться на указанный адрес.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notification-email">Email для уведомлений</Label>
                <Input id="notification-email" type="email" defaultValue="shop@example.com" />
              </div>

              <div className="space-y-2">
                <Label>Получать email о следующих событиях:</Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Новые заказы</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Сообщения от покупателей</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Отмена заказов</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Отзывы о товарах</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Товары заканчиваются на складе</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Еженедельная статистика</span>
                  </label>
                </div>
              </div>

              <Button>Сохранить настройки</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Email senders tab */}
      {activeTab === 'senders' && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 text-sm text-slate-600 mb-6">
              <Icon name="Info" size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <p>
                Настройте адреса отправителей для различных типов писем, которые отправляются покупателям.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sender-orders">Письма о заказах</Label>
                <Input id="sender-orders" type="email" defaultValue="orders@myshop.ru" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sender-notifications">Уведомления покупателям</Label>
                <Input id="sender-notifications" type="email" defaultValue="noreply@myshop.ru" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sender-support">Поддержка клиентов</Label>
                <Input id="sender-support" type="email" defaultValue="support@myshop.ru" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sender-marketing">Рассылки и акции</Label>
                <Input id="sender-marketing" type="email" defaultValue="info@myshop.ru" />
              </div>

              <Button>Сохранить настройки</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default NotificationTabs;