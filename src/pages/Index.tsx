import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const features = [
    {
      icon: 'Blocks',
      title: 'Конструктор без кода',
      description: 'Создавайте сайты просто перетаскивая готовые блоки'
    },
    {
      icon: 'Palette',
      title: 'Готовые шаблоны',
      description: 'Более 50 профессиональных дизайнов для любой ниши'
    },
    {
      icon: 'CreditCard',
      title: 'Прием платежей',
      description: 'Интеграция с популярными платежными системами'
    },
    {
      icon: 'Smartphone',
      title: 'Мобильная версия',
      description: 'Все сайты автоматически адаптируются под смартфоны'
    },
    {
      icon: 'Zap',
      title: 'Быстрая загрузка',
      description: 'Оптимизированный код для максимальной скорости'
    },
    {
      icon: 'Shield',
      title: 'Безопасность',
      description: 'SSL-сертификаты и защита от атак из коробки'
    }
  ];

  const plans = [
    {
      name: 'Стартовый',
      price: '990',
      period: 'месяц',
      description: 'Идеально для первого проекта',
      features: [
        'До 10 страниц',
        '5 ГБ хранилища',
        'Базовые блоки конструктора',
        'Поддержка 24/7',
        'SSL-сертификат'
      ],
      color: 'from-orange-100 to-peach-100'
    },
    {
      name: 'Бизнес',
      price: '2490',
      period: 'месяц',
      description: 'Для растущего бизнеса',
      features: [
        'Неограниченно страниц',
        '50 ГБ хранилища',
        'Все блоки конструктора',
        'Интеграция платежей',
        'Приоритетная поддержка',
        'Собственный домен'
      ],
      color: 'from-orange-200 to-peach-200',
      popular: true
    },
    {
      name: 'Премиум',
      price: '4990',
      period: 'месяц',
      description: 'Максимальные возможности',
      features: [
        'Всё из тарифа Бизнес',
        '200 ГБ хранилища',
        'API доступ',
        'Белый label',
        'Персональный менеджер',
        'Разработка на заказ'
      ],
      color: 'from-orange-300 to-peach-300'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Icon name="Layers" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-foreground">SiteBuilder</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-foreground/70 hover:text-foreground transition-colors">
              Возможности
            </a>
            <a href="#pricing" className="text-foreground/70 hover:text-foreground transition-colors">
              Тарифы
            </a>
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Войти
            </Button>
            <Button onClick={() => navigate('/register')}>
              Начать бесплатно
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Icon name="Menu" size={24} />
          </Button>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Icon name="Sparkles" size={16} />
                Запустите сайт за 15 минут
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                Создайте свой сайт
                <span className="text-primary"> без кода</span>
              </h1>
              <p className="text-xl text-foreground/70 leading-relaxed">
                Профессиональный конструктор сайтов с интеграцией платежных систем. 
                Просто перетаскивайте блоки и запускайте бизнес онлайн.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg h-14 px-8" onClick={() => navigate('/dashboard')}>
                  Создать сайт бесплатно
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg h-14 px-8">
                  <Icon name="Play" size={20} className="mr-2" />
                  Посмотреть демо
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <Icon name="Users" size={24} className="text-primary" />
                  <div>
                    <div className="font-bold text-2xl">12,500+</div>
                    <div className="text-sm text-foreground/60">Пользователей</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Globe" size={24} className="text-primary" />
                  <div>
                    <div className="font-bold text-2xl">25,000+</div>
                    <div className="text-sm text-foreground/60">Созданных сайтов</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
              <img
                src="/img/d931dc61-853e-4876-83d0-813753df5fc9.jpg"
                alt="Конструктор сайтов"
                className="relative rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Всё для вашего успеха
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Мы собрали все инструменты, чтобы вы могли сосредоточиться на росте бизнеса
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Icon name={feature.icon as any} className="text-primary" size={28} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 animate-scale-in">
              <img
                src="/img/bf744f66-0878-4139-8ef0-da14c666239f.jpg"
                alt="Успешный предприниматель"
                className="rounded-3xl shadow-2xl w-full"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6 animate-fade-in">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                Начните зарабатывать уже сегодня
              </h2>
              <p className="text-xl text-foreground/70 leading-relaxed">
                Встроенная интеграция с популярными платежными системами позволяет принимать оплату с первого дня.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" className="text-white" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Банковские карты</h3>
                    <p className="text-foreground/70">Visa, Mastercard, МИР — всё работает из коробки</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" className="text-white" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Электронные кошельки</h3>
                    <p className="text-foreground/70">ЮMoney, QIWI, WebMoney и другие</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" className="text-white" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Моментальные выплаты</h3>
                    <p className="text-foreground/70">Деньги поступают на ваш счет сразу после оплаты</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Выберите свой тариф
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Начните бесплатно и обновляйтесь по мере роста
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index}
                className={`relative border-2 hover:shadow-2xl transition-all duration-300 animate-fade-in ${
                  plan.popular 
                    ? 'border-primary scale-105 shadow-xl' 
                    : 'hover:border-primary hover:-translate-y-1'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Популярный
                  </div>
                )}
                <CardHeader>
                  <div className={`w-full h-2 bg-gradient-to-r ${plan.color} rounded-full mb-4`}></div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  <div className="pt-4">
                    <div className="flex items-end gap-2">
                      <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-foreground/60 pb-2">₽/{plan.period}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Icon name="Check" className="text-primary flex-shrink-0 mt-0.5" size={20} />
                      <span className="text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full h-12 text-base"
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => navigate('/dashboard')}
                  >
                    {plan.popular ? 'Начать сейчас' : 'Выбрать тариф'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-br from-primary to-orange-600 text-white border-0 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <CardContent className="relative py-16 px-8 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Готовы создать свой сайт?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Присоединяйтесь к тысячам предпринимателей, которые уже запустили свой бизнес с нашей платформой
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Введите ваш email"
                  className="h-14 bg-white text-foreground border-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 h-14 px-8 whitespace-nowrap"
                  onClick={() => navigate('/dashboard')}
                >
                  Начать бесплатно
                </Button>
              </div>
              <p className="text-sm text-white/70 mt-4">
                Кредитная карта не требуется • 14 дней бесплатно
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-foreground/5 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                  <Icon name="Layers" className="text-white" size={20} />
                </div>
                <span className="text-xl font-bold text-foreground">SiteBuilder</span>
              </div>
              <p className="text-foreground/70">
                Создавайте профессиональные сайты без знания кода
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Продукт</h3>
              <ul className="space-y-2 text-foreground/70">
                <li><a href="#" className="hover:text-primary transition-colors">Возможности</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Тарифы</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Шаблоны</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Примеры</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Компания</h3>
              <ul className="space-y-2 text-foreground/70">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Блог</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Карьера</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Поддержка</h3>
              <ul className="space-y-2 text-foreground/70">
                <li><a href="#" className="hover:text-primary transition-colors">Справка</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Документация</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Сообщество</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Статус</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-foreground/60 text-sm">
              © 2024 SiteBuilder. Все права защищены.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Icon name="Linkedin" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;