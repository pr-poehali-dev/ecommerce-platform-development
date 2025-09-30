import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const ShopSettings = () => {
  const [activeTab, setActiveTab] = useState('main');
  
  // Main settings state
  const [itemsType, setItemsType] = useState('0');
  const [itemsOnPage, setItemsOnPage] = useState('1000');
  const [itemsLoader, setItemsLoader] = useState(true);
  const [itemsOrder, setItemsOrder] = useState('id');
  const [compareItems, setCompareItems] = useState('1');
  const [favoritesItems, setFavoritesItems] = useState('1');
  const [showSubcatItems, setShowSubcatItems] = useState('1');
  const [itemPricelist, setItemPricelist] = useState('0');
  const [roundBase, setRoundBase] = useState('-1');
  const [hideZeroPrice, setHideZeroPrice] = useState('0');
  const [hideZeroStore, setHideZeroStore] = useState('0');
  const [itemImgZoom, setItemImgZoom] = useState('1');
  
  // Discounts state
  const [discounts, setDiscounts] = useState('');
  const [individualDiscount, setIndividualDiscount] = useState('2');

  const tabs = [
    { id: 'main', label: 'Настройки модуля' },
    { id: 'vendors', label: 'Производители' },
    { id: 'prices', label: 'Типы цен' },
    { id: 'fields', label: 'Поля товаров' },
    { id: 'blocks', label: 'Метки для товаров' },
    { id: 'basket', label: 'Настройки корзины' },
    { id: 'order_fields', label: 'Поля оформления заказа' },
    { id: 'statuses', label: 'Статусы заказов' },
    { id: 'delivery', label: 'Службы доставки' },
    { id: 'payment', label: 'Платежные системы' },
    { id: 'kaas', label: 'Кассовое обслуживание' },
    { id: 'coupons', label: 'Купоны на скидки' },
    { id: 'currencies', label: 'Управление валютами' }
  ];

  const handleSaveMain = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving main settings', {
      itemsType, itemsOnPage, itemsLoader, itemsOrder,
      compareItems, favoritesItems, showSubcatItems,
      itemPricelist, roundBase, hideZeroPrice, hideZeroStore, itemImgZoom
    });
    alert('Настройки сохранены');
  };

  const handleSaveDiscounts = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving discount settings', { discounts, individualDiscount });
    alert('Настройки скидок сохранены');
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <Card>
        <CardContent className="p-0">
          <div className="flex flex-wrap border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white border-b-2 border-primary text-primary'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Settings Tab */}
      {activeTab === 'main' && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSaveMain} className="space-y-6">
                {/* Items Type */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="font-semibold">Тип товаров</Label>
                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-600"
                      title="Какие товары будут продаваться в магазине. Для цифровых товаров будут неактивными поля 'Вес' и 'Доставка', но появится поле для загрузки файла."
                    >
                      <Icon name="HelpCircle" size={16} />
                    </button>
                  </div>
                  <select
                    value={itemsType}
                    onChange={(e) => setItemsType(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="0">Только реальные</option>
                    <option value="1">Только цифровые</option>
                    <option value="2">И реальные и цифровые</option>
                  </select>
                </div>

                {/* Items per page */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="font-semibold">Товаров на странице</Label>
                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-600"
                      title="Количество товаров на одной странице при постраничном разбиении. Опция 'Подгружать при прокрутке' включает подгрузку товаров на страницу при прокрутке до нижнего края."
                    >
                      <Icon name="HelpCircle" size={16} />
                    </button>
                  </div>
                  <Input
                    type="number"
                    value={itemsOnPage}
                    onChange={(e) => setItemsOnPage(e.target.value)}
                    className="w-full md:w-48"
                  />
                  <label className="flex items-center gap-2 cursor-pointer mt-2">
                    <input
                      type="checkbox"
                      checked={itemsLoader}
                      onChange={(e) => setItemsLoader(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm text-slate-700">Подгружать при прокрутке</span>
                  </label>
                </div>

                {/* Items order */}
                <div className="space-y-2">
                  <Label className="font-semibold">Упорядочить товары</Label>
                  <select
                    value={itemsOrder}
                    onChange={(e) => setItemsOrder(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">По позиции и цене</option>
                    <option value="price">По цене +</option>
                    <option value="price_dsc">По цене -</option>
                    <option value="name">По названию +</option>
                    <option value="name_dsc">По названию -</option>
                    <option value="id">По дате добавления +</option>
                    <option value="id_dsc">По дате добавления -</option>
                  </select>
                </div>

                {/* Compare items */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="font-semibold">Сравнение товаров</Label>
                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-600"
                      title="Возможность покупателю добавить товары к сравнению"
                    >
                      <Icon name="HelpCircle" size={16} />
                    </button>
                  </div>
                  <select
                    value={compareItems}
                    onChange={(e) => setCompareItems(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="0">Отключено</option>
                    <option value="1">Включено</option>
                  </select>
                </div>

                {/* Favorites items */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="font-semibold">Избранные товары</Label>
                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-600"
                      title="Возможность покупателю добавить товары в список избранных для последующего просмотра"
                    >
                      <Icon name="HelpCircle" size={16} />
                    </button>
                  </div>
                  <select
                    value={favoritesItems}
                    onChange={(e) => setFavoritesItems(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="0">Отключено</option>
                    <option value="1">Включено</option>
                  </select>
                </div>

                {/* Show subcategory items */}
                <div className="space-y-2">
                  <Label className="font-semibold">Отображать в разделе товары из подразделов</Label>
                  <select
                    value={showSubcatItems}
                    onChange={(e) => setShowSubcatItems(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="0">Нет</option>
                    <option value="1">Да</option>
                  </select>
                </div>

                {/* Multiple prices */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="font-semibold">Несколько цен</Label>
                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-600"
                      title="Возможность указать несколько цен для каждого товара (разные модификации, комплектации и т.д.)"
                    >
                      <Icon name="HelpCircle" size={16} />
                    </button>
                  </div>
                  <select
                    value={itemPricelist}
                    onChange={(e) => setItemPricelist(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="0">Нет</option>
                    <option value="1">Да (в корзину добавляется название товара и название доп.цены)</option>
                    <option value="2">Да (в корзину добавляется только название доп.цены)</option>
                    <option value="3">Да (в корзину добавляется название товара и название доп.цены + модификации товара, если есть)</option>
                    <option value="4">Да (в корзину добавляется только название доп.цены + модификации товара, если есть)</option>
                  </select>
                </div>

                {/* Round prices */}
                <div className="space-y-2">
                  <Label className="font-semibold">Округлять цены</Label>
                  <select
                    value={roundBase}
                    onChange={(e) => setRoundBase(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="-1">Нет</option>
                    <option value="0">до целых</option>
                    <option value="1">до десятых</option>
                    <option value="2">до сотых</option>
                  </select>
                </div>

                {/* Zero price */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="font-semibold">С нулевой ценой</Label>
                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-600"
                      title="Отображение товаров с нулевой ценой"
                    >
                      <Icon name="HelpCircle" size={16} />
                    </button>
                  </div>
                  <select
                    value={hideZeroPrice}
                    onChange={(e) => setHideZeroPrice(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="0">Отображать</option>
                    <option value="1">Скрывать</option>
                  </select>
                </div>

                {/* Zero stock */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="font-semibold">С нулевым кол-вом</Label>
                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-600"
                      title="Отображение товаров, которых нет в наличии (с нулевым количеством)"
                    >
                      <Icon name="HelpCircle" size={16} />
                    </button>
                  </div>
                  <select
                    value={hideZeroStore}
                    onChange={(e) => setHideZeroStore(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="0">Отображать</option>
                    <option value="1">Скрывать</option>
                  </select>
                </div>

                {/* Image zoom */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="font-semibold">Увеличивать фото</Label>
                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-600"
                      title="Способ просмотра больших фотографий товара — при нажатии всплывает полноразмерное фото, либо при наведении на фото увеличивается его фрагмент (функция лупы)"
                    >
                      <Icon name="HelpCircle" size={16} />
                    </button>
                  </div>
                  <select
                    value={itemImgZoom}
                    onChange={(e) => setItemImgZoom(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="0">При нажатии</option>
                    <option value="1">При наведении</option>
                  </select>
                </div>

                <Button type="submit">
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Discounts Block */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Icon name="BadgePercent" size={20} />
                Скидки
              </h3>
              <form onSubmit={handleSaveDiscounts} className="space-y-6">
                {/* Discount sizes */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="font-semibold">Размеры скидок от стоимости заказа</Label>
                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-600"
                      title="Размеры скидок указываются в виде: [сумма заказа]=[размер скидки]%. Например: 10000=1%, 20000=3%, 50000=5%"
                    >
                      <Icon name="HelpCircle" size={16} />
                    </button>
                  </div>
                  <textarea
                    value={discounts}
                    onChange={(e) => setDiscounts(e.target.value)}
                    placeholder="10000=1%&#10;20000=3%&#10;50000=5%"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm min-h-[150px] font-mono"
                  />
                  <p className="text-xs text-slate-500">
                    Формат: сумма=скидка% (каждое правило с новой строки)
                  </p>
                </div>

                {/* Individual discounts */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="font-semibold">Индивид. скидки</Label>
                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-600"
                      title="Правила применения скидки от суммы заказа вместе с индивидуальной скидкой зарегистрированного пользователя"
                    >
                      <Icon name="HelpCircle" size={16} />
                    </button>
                  </div>
                  <select
                    value={individualDiscount}
                    onChange={(e) => setIndividualDiscount(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="0">прибавляются к скидке от стоимости</option>
                    <option value="1">отменяют скидку от стоимости</option>
                    <option value="2">используется бОльшая скидка</option>
                    <option value="3">используется меньшая скидка</option>
                  </select>
                </div>

                {/* Link to coupons */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('coupons');
                    }}
                    className="text-primary hover:underline font-medium flex items-center gap-2"
                  >
                    <Icon name="Ticket" size={18} />
                    Купоны на скидки
                  </a>
                </div>

                <Button type="submit">
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Other tabs - placeholder */}
      {activeTab !== 'main' && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <Icon name="Settings" size={48} className="text-slate-300" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-700">
                  {tabs.find(t => t.id === activeTab)?.label}
                </h3>
                <p className="text-sm text-slate-500">
                  Функционал находится в разработке
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ShopSettings;