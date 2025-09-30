import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import ProductEditModal from './products/ProductEditModal';
import ProductPhotosModal from './products/ProductPhotosModal';

export interface Product {
  id: string;
  name: string;
  article: string;
  priceRetail: number;
  priceWholesale: number;
  stock: number;
  categoryId: string;
  categoryName: string;
  photos: string[];
  description: string;
  isHidden: boolean;
  position: number;
  syncedWith?: string;
}

const ProductsManager = () => {
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchArticle, setSearchArticle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [photosProduct, setPhotosProduct] = useState<Product | null>(null);

  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Шар "С Днем Рождения" розовый',
      article: 'BL-001',
      priceRetail: 150,
      priceWholesale: 120,
      stock: 45,
      categoryId: '105',
      categoryName: 'Девичник',
      photos: [],
      description: 'Фольгированный шар с надписью',
      isHidden: false,
      position: 1
    },
    {
      id: '2',
      name: 'Набор шаров "Гендер пати"',
      article: 'GP-015',
      priceRetail: 850,
      priceWholesale: 700,
      stock: 12,
      categoryId: '124',
      categoryName: 'Гендер пати',
      photos: [],
      description: 'Набор из 10 шаров для gender reveal',
      isHidden: false,
      position: 2
    },
    {
      id: '3',
      name: 'Букет "Выписка из роддома"',
      article: 'VYP-023',
      priceRetail: 1200,
      priceWholesale: 950,
      stock: 8,
      categoryId: '130',
      categoryName: 'Выписка',
      photos: [],
      description: 'Композиция из шаров с цифрой',
      isHidden: false,
      position: 3
    }
  ]);

  const categories = [
    { id: '', name: 'Все категории' },
    { id: '105', name: 'Девичник' },
    { id: '124', name: 'Гендер пати' },
    { id: '130', name: 'Выписка' },
    { id: '93', name: 'Шары на годик' },
    { id: '120', name: 'Для девочек' },
    { id: '126', name: 'Для мальчиков' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching:', { searchId, searchName, searchArticle, selectedCategory });
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: 'Новый товар',
      article: '',
      priceRetail: 0,
      priceWholesale: 0,
      stock: 0,
      categoryId: '',
      categoryName: '',
      photos: [],
      description: '',
      isHidden: false,
      position: products.length + 1
    };
    setEditingProduct(newProduct);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSaveProduct = (product: Product) => {
    const existingIndex = products.findIndex(p => p.id === product.id);
    if (existingIndex >= 0) {
      const updated = [...products];
      updated[existingIndex] = product;
      setProducts(updated);
      
      if (product.syncedWith) {
        const syncedIndex = products.findIndex(p => p.id === product.syncedWith);
        if (syncedIndex >= 0) {
          updated[syncedIndex] = { ...updated[syncedIndex], stock: product.stock };
          setProducts(updated);
        }
      }
    } else {
      setProducts([...products, product]);
    }
    setEditingProduct(null);
  };

  const handleDuplicate = (product: Product, syncStock: boolean = false) => {
    const duplicate: Product = {
      ...product,
      id: Date.now().toString(),
      name: `${product.name} (копия)`,
      article: `${product.article}-copy`,
      position: products.length + 1,
      syncedWith: syncStock ? product.id : undefined
    };
    setProducts([...products, duplicate]);
    alert(`Товар скопирован ${syncStock ? 'с синхронизацией остатков' : ''}`);
  };

  const handleDelete = (product: Product) => {
    if (confirm(`Удалить товар "${product.name}"?`)) {
      setProducts(products.filter(p => p.id !== product.id));
      alert('Товар удален');
    }
  };

  const handleQuickPriceEdit = (productId: string, type: 'retail' | 'wholesale') => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const currentPrice = type === 'retail' ? product.priceRetail : product.priceWholesale;
    const newPrice = prompt(`Введите ${type === 'retail' ? 'розничную' : 'оптовую'} цену:`, currentPrice.toString());
    
    if (newPrice !== null) {
      const price = parseFloat(newPrice);
      if (!isNaN(price)) {
        const updated = products.map(p => 
          p.id === productId 
            ? { ...p, [type === 'retail' ? 'priceRetail' : 'priceWholesale']: price }
            : p
        );
        setProducts(updated);
      }
    }
  };

  const handleStockEdit = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const newStock = prompt('Введите количество на складе:', product.stock.toString());
    
    if (newStock !== null) {
      const stock = parseInt(newStock);
      if (!isNaN(stock)) {
        const updated = products.map(p => {
          if (p.id === productId) {
            return { ...p, stock };
          }
          if (p.syncedWith === productId || product.syncedWith === p.id) {
            return { ...p, stock };
          }
          return p;
        });
        setProducts(updated);
      }
    }
  };

  const handleManagePhotos = (product: Product) => {
    setPhotosProduct(product);
  };

  const handleSavePhotos = (productId: string, photos: string[]) => {
    const updated = products.map(p => 
      p.id === productId ? { ...p, photos } : p
    );
    setProducts(updated);
    setPhotosProduct(null);
  };

  return (
    <div className="space-y-4">
      {/* Search form */}
      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="space-y-3">
            <div className="flex flex-wrap items-end gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium">ID</label>
                <Input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="ID"
                  className="w-32"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Название</label>
                <Input
                  type="text"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="Название"
                  className="w-48"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Артикул</label>
                <Input
                  type="text"
                  value={searchArticle}
                  onChange={(e) => setSearchArticle(e.target.value)}
                  placeholder="Артикул"
                  className="w-32"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Категория</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-48 border border-gray-300 rounded-md px-3 py-2 text-sm h-10"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <Button type="submit" size="sm">
                <Icon name="Search" size={16} className="mr-2" />
                Найти
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">
          Всего товаров: {products.length}
        </div>
        <Button onClick={handleAddProduct} size="sm">
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить товар
        </Button>
      </div>

      {/* Products table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Фото</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Название</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Артикул</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Розница</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Опт</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">Остаток</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Категория</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Действия</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-slate-600">{product.id}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleManagePhotos(product)}
                        className="w-12 h-12 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                      >
                        {product.photos.length > 0 ? (
                          <img src={product.photos[0]} alt="" className="w-full h-full object-cover rounded" />
                        ) : (
                          <Icon name="Image" size={20} className="text-slate-400" />
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${product.isHidden ? 'text-slate-400' : 'text-slate-700'}`}>
                          {product.name}
                        </span>
                        {product.syncedWith && (
                          <Icon name="Link" size={14} className="text-primary" title="Остатки синхронизированы" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{product.article}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleQuickPriceEdit(product.id, 'retail')}
                        className="text-sm text-slate-700 hover:text-primary transition-colors"
                      >
                        {product.priceRetail} ₽
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleQuickPriceEdit(product.id, 'wholesale')}
                        className="text-sm text-slate-700 hover:text-primary transition-colors"
                      >
                        {product.priceWholesale} ₽
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleStockEdit(product.id)}
                        className={`text-sm font-medium transition-colors ${
                          product.stock === 0 
                            ? 'text-red-600 hover:text-red-700' 
                            : product.stock < 10 
                            ? 'text-orange-600 hover:text-orange-700' 
                            : 'text-green-600 hover:text-green-700'
                        }`}
                      >
                        {product.stock}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{product.categoryName}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(product)}
                          title="Редактировать"
                        >
                          <Icon name="Edit" size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleManagePhotos(product)}
                          title="Фото"
                        >
                          <Icon name="Image" size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDuplicate(product, false)}
                          title="Копировать"
                        >
                          <Icon name="Copy" size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDuplicate(product, true)}
                          title="Копировать с синхронизацией остатков"
                        >
                          <Icon name="Link" size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(product)}
                          title="Удалить"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit modal */}
      {editingProduct && (
        <ProductEditModal
          product={editingProduct}
          categories={categories}
          onSave={handleSaveProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}

      {/* Photos modal */}
      {photosProduct && (
        <ProductPhotosModal
          product={photosProduct}
          onSave={handleSavePhotos}
          onClose={() => setPhotosProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductsManager;