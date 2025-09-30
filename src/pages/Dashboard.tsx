import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects] = useState([
    {
      id: 1,
      name: 'Мой интернет-магазин',
      url: 'myshop.site',
      status: 'active',
      views: 1240,
      created: '15 сент 2024'
    },
    {
      id: 2,
      name: 'Портфолио',
      url: 'portfolio.site',
      status: 'draft',
      views: 0,
      created: '20 сент 2024'
    }
  ]);

  const [user] = useState({
    name: 'Иван Петров',
    email: 'ivan@example.com',
    plan: 'Бизнес',
    sites: 2
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Icon name="Layers" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-foreground">SiteBuilder</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Icon name="Bell" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Settings" size={20} />
            </Button>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">ИП</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="projects" className="gap-2">
              <Icon name="Layout" size={18} />
              Мои проекты
            </TabsTrigger>
            <TabsTrigger value="builder" className="gap-2">
              <Icon name="Wrench" size={18} />
              Конструктор
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <Icon name="User" size={18} />
              Профиль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Мои проекты</h1>
                <p className="text-foreground/70">Управляйте вашими сайтами</p>
              </div>
              <Button size="lg" onClick={() => navigate('/builder')}>
                <Icon name="Plus" size={20} className="mr-2" />
                Создать сайт
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-orange-500 rounded-xl flex items-center justify-center">
                        <Icon name="Globe" className="text-white" size={24} />
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {project.status === 'active' ? 'Активен' : 'Черновик'}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Icon name="Link" size={14} />
                      {project.url}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-foreground/70">
                        <Icon name="Eye" size={16} />
                        {project.views} просмотров
                      </div>
                      <div className="text-foreground/70">
                        {project.created}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="Edit" size={16} className="mr-2" />
                        Редактировать
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="MoreVertical" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-primary/5 to-orange-500/5 border-dashed border-2 border-primary/30 cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center h-full min-h-[280px] text-center p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name="Plus" className="text-primary" size={32} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Создать новый сайт</h3>
                  <p className="text-foreground/60 text-sm">
                    Начните с готового шаблона или создайте с нуля
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="builder" className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Конструктор сайтов</h1>
              <p className="text-foreground/70">Создавайте страницы с помощью готовых блоков</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1 space-y-4">
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Блоки</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      { icon: 'Layout', name: 'Hero секция' },
                      { icon: 'Type', name: 'Текстовый блок' },
                      { icon: 'Image', name: 'Галерея' },
                      { icon: 'ShoppingCart', name: 'Товары' },
                      { icon: 'MessageSquare', name: 'Отзывы' },
                      { icon: 'Mail', name: 'Форма контактов' },
                      { icon: 'CreditCard', name: 'Оплата' }
                    ].map((block, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 cursor-pointer transition-colors"
                      >
                        <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                          <Icon name={block.icon as any} size={16} className="text-primary" />
                        </div>
                        <span className="text-sm font-medium">{block.name}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-3">
                <Card className="bg-white/80 backdrop-blur-sm min-h-[600px]">
                  <CardContent className="p-8">
                    <div className="border-2 border-dashed border-primary/30 rounded-2xl p-12 text-center min-h-[550px] flex flex-col items-center justify-center">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                        <Icon name="MousePointer" className="text-primary" size={40} />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">Перетащите блок сюда</h3>
                      <p className="text-foreground/60 max-w-md">
                        Выберите нужный блок слева и перетащите его на эту область, чтобы начать создание вашего сайта
                      </p>
                      <div className="mt-8 flex gap-4">
                        <Button variant="outline">
                          <Icon name="Eye" size={16} className="mr-2" />
                          Предпросмотр
                        </Button>
                        <Button>
                          <Icon name="Save" size={16} className="mr-2" />
                          Сохранить
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Личный кабинет</h1>
              <p className="text-foreground/70">Управление аккаунтом и подпиской</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Личная информация</CardTitle>
                    <CardDescription>Обновите данные вашего профиля</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                    <Button>
                      <Icon name="Save" size={16} className="mr-2" />
                      Сохранить изменения
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Интеграция платежей</CardTitle>
                    <CardDescription>Подключите платежные системы к вашим сайтам</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: 'ЮKassa', status: 'connected', icon: 'CreditCard' },
                      { name: 'Stripe', status: 'not_connected', icon: 'DollarSign' },
                      { name: 'PayPal', status: 'not_connected', icon: 'Wallet' }
                    ].map((payment, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon name={payment.icon as any} size={20} className="text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold">{payment.name}</div>
                            <div className="text-sm text-foreground/60">
                              {payment.status === 'connected' ? 'Подключено' : 'Не подключено'}
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant={payment.status === 'connected' ? 'outline' : 'default'}
                          size="sm"
                        >
                          {payment.status === 'connected' ? 'Настроить' : 'Подключить'}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-primary to-orange-600 text-white border-0">
                  <CardHeader>
                    <CardTitle>Ваш тариф</CardTitle>
                    <CardDescription className="text-white/80">Текущая подписка</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center py-4">
                      <div className="text-5xl font-bold mb-2">{user.plan}</div>
                      <div className="text-white/80">2 490 ₽/месяц</div>
                    </div>
                    <div className="space-y-2 pt-4 border-t border-white/20">
                      <div className="flex justify-between">
                        <span className="text-white/80">Сайтов:</span>
                        <span className="font-semibold">{user.sites} из ∞</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Хранилище:</span>
                        <span className="font-semibold">15 ГБ из 50 ГБ</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Продление:</span>
                        <span className="font-semibold">15 окт 2024</span>
                      </div>
                    </div>
                    <Button className="w-full bg-white text-primary hover:bg-white/90 mt-4">
                      Улучшить тариф
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Быстрые действия</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="HelpCircle" size={16} className="mr-2" />
                      Справка
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="MessageCircle" size={16} className="mr-2" />
                      Поддержка
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-destructive">
                      <Icon name="LogOut" size={16} className="mr-2" />
                      Выйти
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;