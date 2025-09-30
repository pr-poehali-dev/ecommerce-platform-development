export const getDefaultContent = (blockType: string) => {
  switch (blockType) {
    case 'header':
      return { logo: 'Логотип', menu: ['Ссылка 1', 'Ссылка 2'], phone: '+7 999 999 99 99' };
    case 'hero':
      return { title: 'Заголовок', subtitle: 'Подзаголовок', button: 'Кнопка', image: '' };
    case 'features':
      return { title: 'Преимущества', items: [{ icon: 'Star', title: 'Преимущество', text: 'Описание' }] };
    case 'about':
      return { title: 'О нас', text: 'Текст о компании', image: '' };
    case 'testimonials':
      return { title: 'Отзывы', reviews: [{ author: 'Имя', text: 'Отзыв', rating: 5 }] };
    case 'contact':
      return { title: 'Контакты', phone: '+7 999 999 99 99', email: 'info@example.com', address: 'Адрес' };
    case 'footer':
      return { company: 'Компания © 2024', links: [], social: [] };
    default:
      return { title: 'Новая секция' };
  }
};

export const getDefaultStyles = (blockType: string) => {
  return {
    background: '#ffffff',
    textColor: '#1e293b',
    padding: '4rem 2rem'
  };
};

export const getPreviewWidth = (previewMode: 'desktop' | 'tablet' | 'mobile') => {
  switch (previewMode) {
    case 'mobile': return '375px';
    case 'tablet': return '768px';
    default: return '100%';
  }
};

export const blocks = [
  { id: 'header', name: 'Шапка сайта', icon: 'Layout', category: 'structure' },
  { id: 'hero', name: 'Главный баннер', icon: 'Monitor', category: 'content' },
  { id: 'features', name: 'Преимущества', icon: 'Star', category: 'content' },
  { id: 'about', name: 'О компании', icon: 'Info', category: 'content' },
  { id: 'products', name: 'Товары сеткой', icon: 'Package', category: 'shop' },
  { id: 'categories', name: 'Категории', icon: 'FolderTree', category: 'shop' },
  { id: 'testimonials', name: 'Отзывы', icon: 'MessageSquare', category: 'content' },
  { id: 'gallery', name: 'Галерея', icon: 'Image', category: 'content' },
  { id: 'pricing', name: 'Тарифы', icon: 'DollarSign', category: 'content' },
  { id: 'faq', name: 'FAQ', icon: 'HelpCircle', category: 'content' },
  { id: 'team', name: 'Команда', icon: 'Users', category: 'content' },
  { id: 'stats', name: 'Статистика', icon: 'BarChart', category: 'content' },
  { id: 'cta', name: 'Призыв к действию', icon: 'Megaphone', category: 'content' },
  { id: 'contact', name: 'Контакты', icon: 'Mail', category: 'content' },
  { id: 'map', name: 'Карта', icon: 'MapPin', category: 'content' },
  { id: 'newsletter', name: 'Подписка', icon: 'Bell', category: 'content' },
  { id: 'footer', name: 'Подвал сайта', icon: 'Layout', category: 'structure' }
];

export const savedTemplates = [
  { id: 1, name: 'Главная страница', thumbnail: '🏠', sections: 7, date: '28.09.2024' },
  { id: 2, name: 'Страница каталога', thumbnail: '🛍️', sections: 5, date: '25.09.2024' },
  { id: 3, name: 'О компании', thumbnail: '📋', sections: 4, date: '20.09.2024' }
];

export const initialSections = [
  {
    id: 'header-1',
    type: 'header',
    name: 'Шапка',
    content: {
      logo: 'Воздушные шары',
      menu: ['Главная', 'Каталог', 'О нас', 'Контакты'],
      phone: '+7 900 123 45 67'
    },
    styles: {
      background: '#ffffff',
      textColor: '#1e293b',
      height: '80px'
    }
  },
  {
    id: 'hero-1',
    type: 'hero',
    name: 'Главный баннер',
    content: {
      title: 'Воздушные шары для любого праздника',
      subtitle: 'Доставка по Москве за 2 часа',
      button: 'Смотреть каталог',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&h=600&fit=crop'
    },
    styles: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: '#ffffff',
      minHeight: '500px'
    }
  },
  {
    id: 'features-1',
    type: 'features',
    name: 'Преимущества',
    content: {
      title: 'Почему выбирают нас',
      items: [
        { icon: 'Truck', title: 'Быстрая доставка', text: 'Доставим за 2 часа по Москве' },
        { icon: 'Award', title: 'Качество', text: 'Только проверенные производители' },
        { icon: 'Smile', title: 'Радость', text: 'Создаем праздничное настроение' }
      ]
    },
    styles: {
      background: '#ffffff',
      textColor: '#1e293b'
    }
  },
  {
    id: 'products-1',
    type: 'products',
    name: 'Товары',
    content: {
      title: 'Популярные товары',
      products: [
        { name: 'Шар сердце', price: '150 ₽', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop' },
        { name: 'Набор шаров', price: '890 ₽', image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=400&fit=crop' },
        { name: 'Цифра 5', price: '650 ₽', image: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=400&h=400&fit=crop' }
      ]
    },
    styles: {
      background: '#f8fafc',
      textColor: '#1e293b'
    }
  },
  {
    id: 'testimonials-1',
    type: 'testimonials',
    name: 'Отзывы',
    content: {
      title: 'Отзывы наших клиентов',
      reviews: [
        { author: 'Анна М.', text: 'Отличные шары! Праздник удался на славу!', rating: 5 },
        { author: 'Иван П.', text: 'Быстрая доставка, качественный товар', rating: 5 },
        { author: 'Мария С.', text: 'Заказываю уже не первый раз, всё супер!', rating: 5 }
      ]
    },
    styles: {
      background: '#ffffff',
      textColor: '#1e293b'
    }
  },
  {
    id: 'footer-1',
    type: 'footer',
    name: 'Подвал',
    content: {
      company: 'Воздушные шары © 2024',
      links: ['О нас', 'Доставка', 'Контакты'],
      social: ['Instagram', 'VK', 'Telegram']
    },
    styles: {
      background: '#1e293b',
      textColor: '#ffffff'
    }
  }
];