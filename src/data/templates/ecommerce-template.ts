export const ecommerceTemplate = {
  id: 'ecommerce-pro',
  name: 'E-commerce Pro',
  description: 'Профессиональный шаблон интернет-магазина',
  sections: [
    {
      id: 'header-1',
      type: 'header',
      name: 'Шапка сайта',
      content: {
        logo: 'Мой Магазин',
        phone: '+7 (495) 000-00-00',
        email: 'info@myshop.ru',
        navigation: [
          { label: 'Каталог', link: '/catalog' },
          { label: 'О магазине', link: '/about' },
          { label: 'Доставка', link: '/shipping' },
          { label: 'Контакты', link: '/contacts' }
        ],
        hasSearch: true,
        hasCart: true,
        hasLogin: true
      },
      styles: {
        backgroundColor: '#ffffff',
        textColor: '#333333',
        logoSize: '150px',
        padding: '20px',
        borderBottom: '1px solid #e5e7eb'
      }
    },
    {
      id: 'hero-slider-1',
      type: 'hero-slider',
      name: 'Главный слайдер',
      content: {
        slides: [
          {
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
            title: 'Новая коллекция 2025',
            subtitle: 'Скидки до 50% на все товары',
            buttonText: 'Смотреть каталог',
            buttonLink: '/catalog'
          },
          {
            image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=600&fit=crop',
            title: 'Бесплатная доставка',
            subtitle: 'При заказе от 3000 рублей',
            buttonText: 'Подробнее',
            buttonLink: '/shipping'
          }
        ],
        autoPlay: true,
        interval: 5000
      },
      styles: {
        height: '500px',
        overlayColor: 'rgba(0,0,0,0.3)',
        titleColor: '#ffffff',
        titleSize: '48px',
        subtitleColor: '#ffffff',
        subtitleSize: '24px'
      }
    },
    {
      id: 'features-1',
      type: 'features',
      name: 'Преимущества',
      content: {
        title: 'Почему выбирают нас',
        features: [
          {
            icon: 'Truck',
            title: 'Быстрая доставка',
            description: 'Доставим ваш заказ в течение 1-3 дней'
          },
          {
            icon: 'ShieldCheck',
            title: 'Гарантия качества',
            description: 'Все товары сертифицированы'
          },
          {
            icon: 'CreditCard',
            title: 'Удобная оплата',
            description: 'Наличными, картой или онлайн'
          },
          {
            icon: 'Headphones',
            title: 'Поддержка 24/7',
            description: 'Всегда на связи для вас'
          }
        ]
      },
      styles: {
        backgroundColor: '#f9fafb',
        padding: '80px 20px',
        titleColor: '#1f2937',
        titleSize: '36px',
        iconColor: '#3b82f6',
        iconSize: '48px'
      }
    },
    {
      id: 'products-new-1',
      type: 'products-grid',
      name: 'Новинки',
      content: {
        title: 'Новинки',
        subtitle: 'Последние поступления в нашем магазине',
        products: [
          {
            id: 1,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
            name: 'Стильные часы',
            price: 4990,
            oldPrice: 6990,
            rating: 5,
            badge: 'Хит'
          },
          {
            id: 2,
            image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
            name: 'Солнцезащитные очки',
            price: 2490,
            rating: 4,
            badge: 'Новинка'
          },
          {
            id: 3,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
            name: 'Кожаный рюкзак',
            price: 5990,
            oldPrice: 7990,
            rating: 5,
            badge: '-25%'
          },
          {
            id: 4,
            image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop',
            name: 'Кроссовки Nike',
            price: 8990,
            rating: 5,
            badge: 'Хит'
          }
        ],
        columns: 4,
        showAddToCart: true,
        showQuickView: true
      },
      styles: {
        backgroundColor: '#ffffff',
        padding: '80px 20px',
        titleColor: '#1f2937',
        titleSize: '36px',
        cardBorderRadius: '8px',
        cardShadow: '0 2px 8px rgba(0,0,0,0.1)',
        priceColor: '#3b82f6',
        oldPriceColor: '#9ca3af'
      }
    },
    {
      id: 'banner-promo-1',
      type: 'banner',
      name: 'Промо баннер',
      content: {
        image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&h=400&fit=crop',
        title: 'Сезонная распродажа',
        subtitle: 'Скидки до 70% на зимнюю коллекцию',
        buttonText: 'Успеть купить',
        buttonLink: '/sale',
        alignment: 'left'
      },
      styles: {
        height: '400px',
        overlayColor: 'rgba(0,0,0,0.4)',
        titleColor: '#ffffff',
        titleSize: '42px',
        subtitleColor: '#ffffff',
        buttonColor: '#ef4444'
      }
    },
    {
      id: 'categories-1',
      type: 'categories',
      name: 'Категории товаров',
      content: {
        title: 'Популярные категории',
        categories: [
          {
            name: 'Одежда',
            image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop',
            link: '/category/clothes',
            count: 156
          },
          {
            name: 'Обувь',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
            link: '/category/shoes',
            count: 89
          },
          {
            name: 'Аксессуары',
            image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=300&h=300&fit=crop',
            link: '/category/accessories',
            count: 124
          },
          {
            name: 'Электроника',
            image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=300&fit=crop',
            link: '/category/electronics',
            count: 67
          }
        ]
      },
      styles: {
        backgroundColor: '#f9fafb',
        padding: '80px 20px',
        titleColor: '#1f2937',
        cardBorderRadius: '12px',
        cardHoverScale: '1.05'
      }
    },
    {
      id: 'testimonials-1',
      type: 'testimonials',
      name: 'Отзывы клиентов',
      content: {
        title: 'Что говорят наши клиенты',
        testimonials: [
          {
            name: 'Анна Иванова',
            avatar: 'https://i.pravatar.cc/150?img=1',
            rating: 5,
            text: 'Отличный магазин! Быстрая доставка, качественные товары. Обязательно буду заказывать еще!',
            date: '15 января 2025'
          },
          {
            name: 'Дмитрий Петров',
            avatar: 'https://i.pravatar.cc/150?img=2',
            rating: 5,
            text: 'Очень доволен покупкой. Всё пришло в срок, товар соответствует описанию. Спасибо!',
            date: '12 января 2025'
          },
          {
            name: 'Елена Смирнова',
            avatar: 'https://i.pravatar.cc/150?img=3',
            rating: 4,
            text: 'Хороший выбор товаров, адекватные цены. Рекомендую!',
            date: '8 января 2025'
          }
        ]
      },
      styles: {
        backgroundColor: '#ffffff',
        padding: '80px 20px',
        titleColor: '#1f2937',
        cardBackgroundColor: '#f9fafb',
        cardBorderRadius: '8px',
        starColor: '#fbbf24'
      }
    },
    {
      id: 'newsletter-1',
      type: 'newsletter',
      name: 'Подписка на новости',
      content: {
        title: 'Подпишитесь на рассылку',
        subtitle: 'Получайте первыми информацию о новинках и акциях',
        placeholder: 'Введите ваш email',
        buttonText: 'Подписаться',
        disclaimer: 'Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности'
      },
      styles: {
        backgroundColor: '#3b82f6',
        textColor: '#ffffff',
        padding: '60px 20px',
        titleSize: '32px',
        inputBorderRadius: '8px'
      }
    },
    {
      id: 'footer-1',
      type: 'footer',
      name: 'Подвал сайта',
      content: {
        columns: [
          {
            title: 'Информация',
            links: [
              { label: 'О компании', link: '/about' },
              { label: 'Доставка и оплата', link: '/shipping' },
              { label: 'Возврат товара', link: '/returns' },
              { label: 'Контакты', link: '/contacts' }
            ]
          },
          {
            title: 'Покупателям',
            links: [
              { label: 'Как оформить заказ', link: '/how-to-order' },
              { label: 'Программа лояльности', link: '/loyalty' },
              { label: 'Вопросы и ответы', link: '/faq' },
              { label: 'Отзывы', link: '/reviews' }
            ]
          },
          {
            title: 'Контакты',
            content: [
              { type: 'phone', value: '+7 (495) 000-00-00' },
              { type: 'email', value: 'info@myshop.ru' },
              { type: 'address', value: 'г. Москва, ул. Примерная, д. 1' },
              { type: 'schedule', value: 'Пн-Пт: 9:00-20:00, Сб-Вс: 10:00-18:00' }
            ]
          }
        ],
        social: [
          { platform: 'vk', link: 'https://vk.com/myshop' },
          { platform: 'instagram', link: 'https://instagram.com/myshop' },
          { platform: 'telegram', link: 'https://t.me/myshop' }
        ],
        copyright: '© 2025 Мой Магазин. Все права защищены.',
        payments: ['visa', 'mastercard', 'mir']
      },
      styles: {
        backgroundColor: '#1f2937',
        textColor: '#9ca3af',
        linkColor: '#d1d5db',
        titleColor: '#ffffff',
        padding: '60px 20px 20px',
        borderTop: '4px solid #3b82f6'
      }
    }
  ],
  colors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    accent: '#ef4444',
    background: '#ffffff',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: '#e5e7eb'
  },
  fonts: {
    headings: 'Inter',
    body: 'Inter'
  }
};