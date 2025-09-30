import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-scale-in">
        <div className="text-center mb-8">
          <div 
            className="inline-flex items-center gap-2 mb-8 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Icon name="Layers" className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Создайте аккаунт</h1>
          <p className="text-foreground/60">Начните создавать сайты бесплатно</p>
        </div>

        <Card className="shadow-2xl border-2 bg-white/90 backdrop-blur-sm">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-2xl">Регистрация</CardTitle>
              <CardDescription>Заполните форму для создания аккаунта</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <div className="relative">
                  <Icon 
                    name="User" 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" 
                    size={18} 
                  />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Иван Петров"
                    className="pl-10 h-12"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Icon 
                    name="Mail" 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" 
                    size={18} 
                  />
                  <Input
                    id="email"
                    type="email"
                    placeholder="ivan@example.com"
                    className="pl-10 h-12"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                  <Icon 
                    name="Lock" 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" 
                    size={18} 
                  />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Минимум 8 символов"
                    className="pl-10 h-12"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Повторите пароль</Label>
                <div className="relative">
                  <Icon 
                    name="Lock" 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" 
                    size={18} 
                  />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-12"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="terms"
                  className="w-4 h-4 mt-1 rounded border-border text-primary focus:ring-primary"
                  required
                />
                <label htmlFor="terms" className="text-sm text-foreground/70">
                  Я согласен с{' '}
                  <a href="#" className="text-primary hover:underline">
                    Пользовательским соглашением
                  </a>
                  {' '}и{' '}
                  <a href="#" className="text-primary hover:underline">
                    Политикой конфиденциальности
                  </a>
                </label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full h-12 text-base" size="lg">
                <Icon name="UserPlus" size={20} className="mr-2" />
                Создать аккаунт
              </Button>
              
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-foreground/60">или зарегистрируйтесь через</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="h-12"
                  onClick={() => {}}
                >
                  <Icon name="Github" size={20} className="mr-2" />
                  GitHub
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="h-12"
                  onClick={() => {}}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                  Telegram
                </Button>
              </div>

              <p className="text-center text-sm text-foreground/60">
                Уже есть аккаунт?{' '}
                <a 
                  href="#" 
                  className="text-primary hover:underline font-semibold"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/login');
                  }}
                >
                  Войти
                </a>
              </p>
            </CardFooter>
          </form>
        </Card>

        <div className="text-center mt-8 text-sm text-foreground/60">
          <a 
            href="#" 
            className="hover:text-primary transition-colors"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
          >
            ← Вернуться на главную
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;