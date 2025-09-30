import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const NewsModule = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const news = [
    {
      id: 1,
      title: 'Новая коллекция воздушных шаров',
      content: 'Встречайте новую коллекцию фольгированных шаров с героями мультфильмов!',
      date: '28.09.2024',
      views: 234,
      status: 'published'
    },
    {
      id: 2,
      title: 'Скидка 20% на все товары',
      content: 'Только до конца недели - скидка 20% на весь ассортимент.',
      date: '25.09.2024',
      views: 456,
      status: 'published'
    },
    {
      id: 3,
      title: 'График работы на праздники',
      content: 'Изменения в графике работы в праздничные дни.',
      date: '20.09.2024',
      views: 189,
      status: 'draft'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Лента новостей</h2>
          <p className="text-sm text-slate-600 mt-1">Управление новостями и анонсами</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить новость
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Новая новость</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Заголовок</label>
              <Input placeholder="Введите заголовок новости" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Содержание</label>
              <Textarea rows={4} placeholder="Текст новости..." />
            </div>
            <div className="flex gap-2">
              <Button>Опубликовать</Button>
              <Button variant="outline">Сохранить черновик</Button>
              <Button variant="ghost" onClick={() => setShowAddForm(false)}>Отмена</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {news.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-slate-800">{item.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.status === 'published' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {item.status === 'published' ? 'Опубликовано' : 'Черновик'}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-3">{item.content}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Eye" size={14} />
                      {item.views} просмотров
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline">
                    <Icon name="Edit" size={14} className="mr-1" />
                    Изменить
                  </Button>
                  <Button size="sm" variant="outline">
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewsModule;