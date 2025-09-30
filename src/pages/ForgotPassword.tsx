import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Забыли пароль?</h1>
          <p className="text-foreground/60">Мы поможем восстановить доступ</p>
        </div>

        <Card className="shadow-2xl border-2 bg-white/90 backdrop-blur-sm">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle className="text-2xl">Восстановление пароля</CardTitle>
                <CardDescription>
                  Введите email, который вы использовали при регистрации
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="bg-accent/50 border border-primary/20 rounded-lg p-4 flex gap-3">
                  <Icon name="Info" className="text-primary flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-sm text-foreground/70">
                    Мы отправим ссылку для сброса пароля на указанный email адрес
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full h-12 text-base" size="lg">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить ссылку
                </Button>
                
                <Button 
                  type="button"
                  variant="ghost" 
                  className="w-full"
                  onClick={() => navigate('/login')}
                >
                  <Icon name="ArrowLeft" size={18} className="mr-2" />
                  Вернуться к входу
                </Button>
              </CardFooter>
            </form>
          ) : (
            <>
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle2" className="text-green-600" size={32} />
                </div>
                <CardTitle className="text-2xl text-center">Проверьте почту</CardTitle>
                <CardDescription className="text-center">
                  Мы отправили инструкции по восстановлению пароля на
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="font-semibold text-lg text-primary">{email}</p>
                </div>

                <div className="bg-accent/50 border border-primary/20 rounded-lg p-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <Icon name="Clock" className="text-primary flex-shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-foreground/70">
                      Письмо придет в течение нескольких минут
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="AlertCircle" className="text-primary flex-shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-foreground/70">
                      Не забудьте проверить папку "Спам"
                    </p>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <p className="text-sm text-foreground/60 mb-3">
                    Не получили письмо?
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                  >
                    <Icon name="RotateCw" size={18} className="mr-2" />
                    Отправить снова
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => navigate('/login')}
                >
                  <Icon name="ArrowLeft" size={18} className="mr-2" />
                  Вернуться к входу
                </Button>
              </CardFooter>
            </>
          )}
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

export default ForgotPassword;