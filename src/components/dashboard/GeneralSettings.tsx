import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

const GeneralSettings = () => {
  const [activeTab, setActiveTab] = useState('settings');
  const [expandedBlocks, setExpandedBlocks] = useState<{ [key: string]: boolean }>({
    account: true,
    password: true,
    auth: true,
    telegram: true,
    domain: true,
    mailService: true,
    redirects: true,
    sitemap: true,
    watermark: true,
    panelSettings: true,
    linkedAccounts: true,
    sape: true,
    deleteWebsite: true
  });

  const toggleBlock = (block: string) => {
    setExpandedBlocks(prev => ({ ...prev, [block]: !prev[block] }));
  };

  const tabs = [
    { id: 'settings', label: 'Общие настройки' },
    { id: 'administrators', label: 'Администраторы сайта' },
    { id: 'sms', label: 'Уведомления по SMS' },
    { id: 'telegram', label: 'Уведомления в Telegram' },
    { id: 'emails', label: 'Уведомления по е-мейл' },
    { id: 'senders', label: 'Отправители е-мейл' },
    { id: 'copy', label: 'Копирование данных' },
    { id: 'backups', label: 'Резервные копии' }
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Общие настройки</h2>
        <p className="text-slate-600">Управление основными параметрами магазина</p>
      </div>

      {/* Horizontal tabs menu */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex flex-wrap gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-primary border-b-2 border-primary'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === 'settings' && (
        <div className="space-y-4">
          {/* Настройки аккаунта */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleBlock('account')}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Icon 
                    name={expandedBlocks.account ? 'Minus' : 'Plus'} 
                    size={20} 
                    className="text-slate-600"
                  />
                  Настройки аккаунта
                </CardTitle>
              </div>
            </CardHeader>
            {expandedBlocks.account && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Логин</Label>
                  <div className="text-slate-600 font-medium">myshop123</div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" defaultValue="shop@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон моб.</Label>
                  <Input id="phone" type="tel" defaultValue="+7 900 123 45 67" disabled className="text-gray-500" />
                  <p className="text-xs text-green-600">номер подтвержден</p>
                </div>
                <Button>Сохранить</Button>
              </CardContent>
            )}
          </Card>

          {/* Смена пароля */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleBlock('password')}
            >
              <CardTitle className="flex items-center gap-2">
                <Icon 
                  name={expandedBlocks.password ? 'Minus' : 'Plus'} 
                  size={20} 
                  className="text-slate-600"
                />
                Смена пароля
              </CardTitle>
            </CardHeader>
            {expandedBlocks.password && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">Новый пароль</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Пароль еще раз</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="old-password">Старый пароль</Label>
                  <Input id="old-password" type="password" />
                </div>
                <Button>Сохранить</Button>
              </CardContent>
            )}
          </Card>

          {/* Двухэтапная авторизация */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleBlock('auth')}
            >
              <CardTitle className="flex items-center gap-2">
                <Icon 
                  name={expandedBlocks.auth ? 'Minus' : 'Plus'} 
                  size={20} 
                  className="text-slate-600"
                />
                Двухэтапная авторизация
              </CardTitle>
            </CardHeader>
            {expandedBlocks.auth && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="auth-method">Основной метод</Label>
                  <select id="auth-method" className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="0">Отключен</option>
                    <option value="1">Код по SMS</option>
                    <option value="2">Код на емейл</option>
                    <option value="3">Код в Telegram</option>
                    <option value="4">Google Authenticator</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Методы авторизации</Label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Код по SMS</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Код на емейл</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Код в Telegram</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Google Authenticator</span>
                    </label>
                  </div>
                </div>
                <Button>Сохранить</Button>
              </CardContent>
            )}
          </Card>

          {/* Привязать телеграм-аккаунт */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleBlock('telegram')}
            >
              <CardTitle className="flex items-center gap-2">
                <Icon 
                  name={expandedBlocks.telegram ? 'Minus' : 'Plus'} 
                  size={20} 
                  className="text-slate-600"
                />
                Привязать телеграм-аккаунт
              </CardTitle>
            </CardHeader>
            {expandedBlocks.telegram && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Аккаунт в Telegram</Label>
                  <div className="text-sm">
                    <span className="text-slate-600">Воздушные шары и сувениры (myshop38)</span>
                    <Button variant="link" className="ml-2 text-red-600 p-0 h-auto">
                      отвязать
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Отдельный домен */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleBlock('domain')}
            >
              <CardTitle className="flex items-center gap-2">
                <Icon 
                  name={expandedBlocks.domain ? 'Minus' : 'Plus'} 
                  size={20} 
                  className="text-slate-600"
                />
                Отдельный домен
              </CardTitle>
            </CardHeader>
            {expandedBlocks.domain && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="domain">Отдельный домен</Label>
                  <Input id="domain" defaultValue="myshop.ru" />
                  <p className="text-xs text-green-600">подключен</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                  <p className="font-medium mb-2">Для прикрепления домена укажите DNS:</p>
                  <div className="font-mono text-xs space-y-1">
                    <div>ns1.alltrades.site</div>
                    <div>ns2.alltrades.site</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Зеркала сайта</Label>
                  <Button variant="link" className="p-0 h-auto">Добавить зеркало</Button>
                </div>
                <Button disabled>Сохранить</Button>
                <p className="text-xs text-slate-500">
                  если необходимо поменять домен или почтовую службу, пожалуйста обращайтесь в техподдержку
                </p>
              </CardContent>
            )}
          </Card>

          {/* Почта на домене */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleBlock('mailService')}
            >
              <CardTitle className="flex items-center gap-2">
                <Icon 
                  name={expandedBlocks.mailService ? 'Minus' : 'Plus'} 
                  size={20} 
                  className="text-slate-600"
                />
                Почта на домене
              </CardTitle>
            </CardHeader>
            {expandedBlocks.mailService && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mail-service">Почтовая служба</Label>
                  <select id="mail-service" className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="0">Не подключена</option>
                    <option value="4">Яндекс 360</option>
                    <option value="1">Zoho Mail</option>
                    <option value="2">VK WorkMail</option>
                    <option value="3">Google Workspace</option>
                  </select>
                </div>
                <Button>Сохранить</Button>
              </CardContent>
            )}
          </Card>

          {/* Переадресация */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleBlock('redirects')}
            >
              <CardTitle className="flex items-center gap-2">
                <Icon 
                  name={expandedBlocks.redirects ? 'Minus' : 'Plus'} 
                  size={20} 
                  className="text-slate-600"
                />
                Переадресация (redirect)
              </CardTitle>
            </CardHeader>
            {expandedBlocks.redirects && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="redirect-domains">Переадресация доменов</Label>
                  <Textarea id="redirect-domains" rows={4} placeholder="domain1 domain2&#10;domain3 domain4" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="redirect-pages">Переадресация страниц</Label>
                  <Textarea id="redirect-pages" rows={4} placeholder="URL1 URL2&#10;URL3 URL4" />
                </div>
                <Button>Сохранить</Button>
              </CardContent>
            )}
          </Card>

          {/* Файл SITEMAP */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleBlock('sitemap')}
            >
              <CardTitle className="flex items-center gap-2">
                <Icon 
                  name={expandedBlocks.sitemap ? 'Minus' : 'Plus'} 
                  size={20} 
                  className="text-slate-600"
                />
                Файл SITEMAP (для поисковых систем)
              </CardTitle>
            </CardHeader>
            {expandedBlocks.sitemap && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sitemap-enable">Файл sitemap</Label>
                  <select id="sitemap-enable" className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="0">Не создавать файл</option>
                    <option value="1" selected>Создавать файл</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Адрес файла SITEMAP</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">https://myshop.ru/sitemap.xml</span>
                    <Button variant="link" className="p-0 h-auto">обновить файл</Button>
                  </div>
                  <p className="text-xs text-slate-500">
                    Файл обновляется автоматически один раз в сутки
                  </p>
                </div>
                <Button>Сохранить</Button>
              </CardContent>
            )}
          </Card>

          {/* Водяной знак */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleBlock('watermark')}
            >
              <CardTitle className="flex items-center gap-2">
                <Icon 
                  name={expandedBlocks.watermark ? 'Minus' : 'Plus'} 
                  size={20} 
                  className="text-slate-600"
                />
                Качество изображений и водяной знак
              </CardTitle>
            </CardHeader>
            {expandedBlocks.watermark && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="watermark-position">Водяной знак</Label>
                  <select id="watermark-position" className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option>Нет</option>
                    <option>В левом верхнем углу</option>
                    <option>В правом верхнем углу</option>
                    <option>В левом нижнем углу</option>
                    <option>В правом нижнем углу</option>
                    <option>Слева по центру</option>
                    <option>Справа по центру</option>
                    <option selected>В центре</option>
                    <option>В центре вверху</option>
                    <option>В центре внизу</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="watermark-file">Файл картинки</Label>
                  <Input id="watermark-file" type="file" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image-quality">Качество (1-100)</Label>
                  <Input id="image-quality" type="number" defaultValue="90" min="1" max="100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webp-format">Формат WebP</Label>
                  <select id="webp-format" className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="0">Включен</option>
                    <option value="1">Отключен</option>
                  </select>
                </div>
                <Button>Сохранить</Button>
              </CardContent>
            )}
          </Card>

          {/* Настройки панели управления */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleBlock('panelSettings')}
            >
              <CardTitle className="flex items-center gap-2">
                <Icon 
                  name={expandedBlocks.panelSettings ? 'Minus' : 'Plus'} 
                  size={20} 
                  className="text-slate-600"
                />
                Настройки панели управления
              </CardTitle>
            </CardHeader>
            {expandedBlocks.panelSettings && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="items-per-page">Элементов на странице</Label>
                  <Input id="items-per-page" type="number" defaultValue="100" />
                </div>
                <div className="space-y-2">
                  <Label>Уведомления от браузера</Label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">о новых заказах</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">о новых сообщениях</span>
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Часовой пояс</Label>
                  <select id="timezone" className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="Europe/Moscow" selected>Europe/Moscow</option>
                    <option value="Europe/London">Europe/London</option>
                    <option value="America/New_York">America/New_York</option>
                    <option value="Asia/Tokyo">Asia/Tokyo</option>
                  </select>
                </div>
                <Button>Сохранить</Button>
              </CardContent>
            )}
          </Card>

          {/* Привязать аккаунты */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleBlock('linkedAccounts')}
            >
              <CardTitle className="flex items-center gap-2">
                <Icon 
                  name={expandedBlocks.linkedAccounts ? 'Minus' : 'Plus'} 
                  size={20} 
                  className="text-slate-600"
                />
                Привязать аккаунты (другие магазины на платформе)
              </CardTitle>
            </CardHeader>
            {expandedBlocks.linkedAccounts && (
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600">Нет привязанных аккаунтов.</p>
                <div className="space-y-2">
                  <Label>Привязать аккаунт</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Логин" className="w-32" />
                    <Input type="password" placeholder="Пароль" className="w-32" />
                    <Button>Привязать аккаунт</Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Удаление сайта */}
          <Card className="border-red-200">
            <CardHeader 
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleBlock('deleteWebsite')}
            >
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Icon 
                  name={expandedBlocks.deleteWebsite ? 'Minus' : 'Plus'} 
                  size={20} 
                />
                Удаление сайта
              </CardTitle>
            </CardHeader>
            {expandedBlocks.deleteWebsite && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="delete-password">Текущий пароль</Label>
                  <Input id="delete-password" type="password" />
                  <p className="text-xs text-red-600">
                    Внимание! Интернет-магазин удаляется из системы полностью без возможности последующего восстановления данных!
                  </p>
                </div>
                <Button variant="destructive">Удалить сайт</Button>
              </CardContent>
            )}
          </Card>
        </div>
      )}

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
    </div>
  );
};

export default GeneralSettings;