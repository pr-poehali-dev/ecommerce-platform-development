import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface SettingsBlocksProps {
  expandedBlocks: { [key: string]: boolean };
  toggleBlock: (block: string) => void;
}

const SettingsBlocks = ({ expandedBlocks, toggleBlock }: SettingsBlocksProps) => {
  return (
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
                <option value="1">Создавать файл</option>
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
                <option>В центре</option>
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
                <option value="Europe/Moscow">Europe/Moscow</option>
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
  );
};

export default SettingsBlocks;