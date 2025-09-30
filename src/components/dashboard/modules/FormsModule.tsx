import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const FormsModule = () => {
  const forms = [
    {
      id: 1,
      name: 'Обратная связь',
      fields: ['Имя', 'Email', 'Телефон', 'Сообщение'],
      submissions: 45,
      isActive: true
    },
    {
      id: 2,
      name: 'Заказать звонок',
      fields: ['Имя', 'Телефон', 'Время звонка'],
      submissions: 78,
      isActive: true
    },
    {
      id: 3,
      name: 'Вопрос специалисту',
      fields: ['Имя', 'Email', 'Вопрос'],
      submissions: 23,
      isActive: false
    }
  ];

  const recentSubmissions = [
    { id: 1, form: 'Обратная связь', name: 'Анна Петрова', date: '30.09.2024 15:23', status: 'new' },
    { id: 2, form: 'Заказать звонок', name: 'Иван Сидоров', date: '30.09.2024 14:15', status: 'processed' },
    { id: 3, form: 'Обратная связь', name: 'Мария Иванова', date: '29.09.2024 18:45', status: 'processed' },
    { id: 4, form: 'Вопрос специалисту', name: 'Петр Козлов', date: '29.09.2024 12:30', status: 'new' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Формы обратной связи</h2>
          <p className="text-sm text-slate-600 mt-1">Управление формами и обращениями</p>
        </div>
        <Button>
          <Icon name="Plus" size={16} className="mr-2" />
          Создать форму
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {forms.map((form) => (
          <Card key={form.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Icon name="FileText" size={24} className="text-blue-600" />
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  form.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {form.isActive ? 'Активна' : 'Отключена'}
                </span>
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">{form.name}</h3>
              <p className="text-sm text-slate-600 mb-3">
                Поля: {form.fields.join(', ')}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">{form.submissions} обращений</span>
                <Button size="sm" variant="outline">
                  <Icon name="Settings" size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Последние обращения</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSubmissions.map((submission) => (
              <div key={submission.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-slate-800">{submission.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      submission.status === 'new' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {submission.status === 'new' ? 'Новое' : 'Обработано'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{submission.form} • {submission.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Icon name="Eye" size={14} className="mr-1" />
                    Открыть
                  </Button>
                  <Button size="sm" variant="outline">
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormsModule;