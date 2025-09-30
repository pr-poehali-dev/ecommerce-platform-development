import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const GalleryModule = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const albums = [
    {
      id: 1,
      name: 'Детские праздники',
      photos: 24,
      cover: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop',
      date: '28.09.2024'
    },
    {
      id: 2,
      name: 'Свадебное оформление',
      photos: 18,
      cover: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=300&fit=crop',
      date: '25.09.2024'
    },
    {
      id: 3,
      name: 'Корпоративные мероприятия',
      photos: 32,
      cover: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=400&h=300&fit=crop',
      date: '20.09.2024'
    },
    {
      id: 4,
      name: 'Выпускные',
      photos: 15,
      cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop',
      date: '15.09.2024'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Фотогалерея</h2>
          <p className="text-sm text-slate-600 mt-1">Управление фотоальбомами</p>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded transition-colors ${
                view === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
              }`}
            >
              <Icon name="Grid3x3" size={16} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded transition-colors ${
                view === 'list' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
              }`}
            >
              <Icon name="List" size={16} />
            </button>
          </div>
          <Button>
            <Icon name="Plus" size={16} className="mr-2" />
            Создать альбом
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Поиск альбомов</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Поиск по названию альбома..."
            className="max-w-md"
          />
        </CardContent>
      </Card>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => (
            <Card key={album.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-slate-200">
                <img
                  src={album.cover}
                  alt={album.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium">
                  {album.photos} фото
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-slate-800 mb-2">{album.name}</h3>
                <p className="text-sm text-slate-500 mb-3">{album.date}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Icon name="Eye" size={14} className="mr-1" />
                    Открыть
                  </Button>
                  <Button size="sm" variant="outline">
                    <Icon name="Edit" size={14} />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {albums.map((album) => (
            <Card key={album.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={album.cover}
                    alt={album.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 mb-1">{album.name}</h3>
                    <p className="text-sm text-slate-500">{album.photos} фото • {album.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Icon name="Eye" size={14} className="mr-1" />
                      Открыть
                    </Button>
                    <Button size="sm" variant="outline">
                      <Icon name="Edit" size={14} />
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
      )}

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Icon name="Info" size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-slate-700">
              <p className="font-medium mb-1">Рекомендации по фотографиям</p>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>Оптимальный размер изображений: 1200x800 пикселей</li>
                <li>Поддерживаемые форматы: JPG, PNG, WEBP</li>
                <li>Максимальный размер файла: 5 МБ</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GalleryModule;