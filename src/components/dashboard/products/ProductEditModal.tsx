import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import type { Product } from '../ProductsManager';

interface ProductEditModalProps {
  product: Product;
  categories: Array<{ id: string; name: string }>;
  onSave: (product: Product) => void;
  onClose: () => void;
}

const ProductEditModal = ({ product, categories, onSave, onClose }: ProductEditModalProps) => {
  const [formData, setFormData] = useState<Product>(product);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleChange = (field: keyof Product, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Введите название товара');
      return;
    }
    if (formData.priceRetail <= 0) {
      alert('Введите розничную цену');
      return;
    }
    
    const category = categories.find(c => c.id === formData.categoryId);
    onSave({
      ...formData,
      categoryName: category?.name || ''
    });
  };

  const handleProfitMargin = () => {
    const margin = prompt('Введите наценку на опт (%):', '20');
    if (margin !== null) {
      const percent = parseFloat(margin);
      if (!isNaN(percent)) {
        const wholesale = Math.round(formData.priceRetail * (1 - percent / 100));
        setFormData(prev => ({ ...prev, priceWholesale: wholesale }));
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="w-full max-w-3xl my-8">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {product.name === 'Новый товар' ? 'Новый товар' : 'Редактирование товара'}
            </h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <Icon name="X" size={24} />
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Название *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Название товара"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="article">Артикул</Label>
                <Input
                  id="article"
                  value={formData.article}
                  onChange={(e) => handleChange('article', e.target.value)}
                  placeholder="Артикул"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Категория</Label>
              <select
                id="category"
                value={formData.categoryId}
                onChange={(e) => handleChange('categoryId', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="">Выберите категорию</option>
                {categories.filter(c => c.id).map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Prices */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priceRetail">Розничная цена * (₽)</Label>
                <Input
                  id="priceRetail"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.priceRetail}
                  onChange={(e) => handleChange('priceRetail', parseFloat(e.target.value) || 0)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="priceWholesale">Оптовая цена (₽)</Label>
                  <button
                    type="button"
                    onClick={handleProfitMargin}
                    className="text-xs text-primary hover:underline"
                  >
                    Рассчитать наценку
                  </button>
                </div>
                <Input
                  id="priceWholesale"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.priceWholesale}
                  onChange={(e) => handleChange('priceWholesale', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            {/* Price diff indicator */}
            {formData.priceRetail > 0 && formData.priceWholesale > 0 && (
              <div className="p-3 bg-slate-50 rounded-md text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Разница цен:</span>
                  <span className="font-medium text-slate-700">
                    {formData.priceRetail - formData.priceWholesale} ₽ 
                    ({Math.round((1 - formData.priceWholesale / formData.priceRetail) * 100)}%)
                  </span>
                </div>
              </div>
            )}

            {/* Stock and position */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Количество на складе</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => handleChange('stock', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Позиция</Label>
                <Input
                  id="position"
                  type="number"
                  min="0"
                  value={formData.position}
                  onChange={(e) => handleChange('position', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Описание товара"
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none"
              />
            </div>

            {/* Hidden flag */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isHidden"
                checked={formData.isHidden}
                onChange={(e) => handleChange('isHidden', e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="isHidden" className="cursor-pointer">
                Скрыть товар на сайте
              </Label>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <Button type="submit" className="flex-1">
                <Icon name="Save" size={16} className="mr-2" />
                Сохранить
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Отмена
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductEditModal;