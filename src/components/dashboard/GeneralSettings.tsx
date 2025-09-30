import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const GeneralSettings = () => {
  const [expandedBlocks, setExpandedBlocks] = useState<{ [key: string]: boolean }>({
    account: true,
    password: true,
    auth: true,
    domain: true,
    watermark: true
  });

  const toggleBlock = (block: string) => {
    setExpandedBlocks(prev => ({ ...prev, [block]: !prev[block] }));
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Общие настройки</h2>
        <p className="text-slate-600">Управление основными параметрами магазина</p>
      </div>

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
                <Input id="phone" type="tel" defaultValue="+7 900 123 45 67" />
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
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Icon 
                  name={expandedBlocks.password ? 'Minus' : 'Plus'} 
                  size={20} 
                  className="text-slate-600"
                />
                Смена пароля
              </CardTitle>
            </div>
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

        {/* Отдельный домен */}
        <Card>
          <CardHeader 
            className="cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleBlock('domain')}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Icon 
                  name={expandedBlocks.domain ? 'Minus' : 'Plus'} 
                  size={20} 
                  className="text-slate-600"
                />
                Отдельный домен
              </CardTitle>
            </div>
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
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Icon 
                  name={expandedBlocks.watermark ? 'Minus' : 'Plus'} 
                  size={20} 
                  className="text-slate-600"
                />
                Качество изображений и водяной знак
              </CardTitle>
            </div>
          </CardHeader>
          {expandedBlocks.watermark && (
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Водяной знак</Label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>Нет</option>
                  <option>В левом верхнем углу</option>
                  <option>В правом верхнем углу</option>
                  <option>В центре</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Качество (1-100)</Label>
                <Input type="number" defaultValue="90" min="1" max="100" />
              </div>
              <Button>Сохранить</Button>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default GeneralSettings;