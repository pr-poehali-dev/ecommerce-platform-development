import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import type { Product } from '../ProductsManager';

interface ProductPhotosModalProps {
  product: Product;
  onSave: (productId: string, photos: string[]) => void;
  onClose: () => void;
}

const ProductPhotosModal = ({ product, onSave, onClose }: ProductPhotosModalProps) => {
  const [photos, setPhotos] = useState<string[]>(product.photos);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleAddPhoto = () => {
    if (newPhotoUrl.trim()) {
      setPhotos([...photos, newPhotoUrl.trim()]);
      setNewPhotoUrl('');
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotos(prev => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setPhotos(prev => [...prev, event.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleMovePhoto = (fromIndex: number, direction: 'left' | 'right') => {
    const toIndex = direction === 'left' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= photos.length) return;

    const newPhotos = [...photos];
    [newPhotos[fromIndex], newPhotos[toIndex]] = [newPhotos[toIndex], newPhotos[fromIndex]];
    setPhotos(newPhotos);
  };

  const handleSubmit = () => {
    onSave(product.id, photos);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="w-full max-w-4xl my-8">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Управление фотографиями</h2>
              <p className="text-sm text-slate-500 mt-1">{product.name}</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <Icon name="X" size={24} />
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Upload area */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? 'border-primary bg-primary/5' : 'border-slate-300 hover:border-slate-400'
            }`}
          >
            <Icon name="Upload" size={48} className="mx-auto text-slate-400 mb-4" />
            <p className="text-sm text-slate-600 mb-2">
              Перетащите изображения сюда или выберите файлы
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="photo-upload"
            />
            <label htmlFor="photo-upload">
              <Button type="button" size="sm" variant="outline" asChild>
                <span className="cursor-pointer">Выбрать файлы</span>
              </Button>
            </label>
          </div>

          {/* Add by URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Добавить по URL</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddPhoto()}
                placeholder="https://example.com/photo.jpg"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              <Button type="button" onClick={handleAddPhoto} size="sm">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить
              </Button>
            </div>
          </div>

          {/* Photos grid */}
          {photos.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium">Фотографии ({photos.length})</p>
                <p className="text-xs text-slate-500">Первое фото — главное</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-slate-100 border-2 border-slate-200">
                      <img
                        src={photo}
                        alt={`Фото ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f1f5f9" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23cbd5e1" font-family="sans-serif"%3E%3F%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </div>
                    {index === 0 && (
                      <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                        Главное
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                      {index > 0 && (
                        <button
                          onClick={() => handleMovePhoto(index, 'left')}
                          className="p-2 bg-white rounded-full hover:bg-slate-100"
                          title="Переместить влево"
                        >
                          <Icon name="ChevronLeft" size={16} />
                        </button>
                      )}
                      {index < photos.length - 1 && (
                        <button
                          onClick={() => handleMovePhoto(index, 'right')}
                          className="p-2 bg-white rounded-full hover:bg-slate-100"
                          title="Переместить вправо"
                        >
                          <Icon name="ChevronRight" size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleRemovePhoto(index)}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                        title="Удалить"
                      >
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <Icon name="ImageOff" size={48} className="mx-auto mb-3 text-slate-300" />
              <p className="text-sm">Фотографий пока нет</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button type="button" onClick={handleSubmit} className="flex-1">
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить ({photos.length})
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPhotosModal;