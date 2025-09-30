import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { saveFontConfig, loadFontConfig, getGoogleFontsLink, LIBRARY_FONTS as LIB_FONTS } from '@/utils/fontManager';

interface Font {
  id: string;
  name: string;
  preview: string;
}

const LIBRARY_FONTS: Font[] = LIB_FONTS.map(font => ({
  id: font,
  name: font,
  preview: 'АаБбВв 123'
}));

const FontsManager = () => {
  const [activeTab, setActiveTab] = useState<'library' | 'google' | 'upload'>('google');
  const [headlineFont, setHeadlineFont] = useState('Inter');
  const [textFont, setTextFont] = useState('Inter');
  const [googleCssLink, setGoogleCssLink] = useState('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  const [googleHeadlineFont, setGoogleHeadlineFont] = useState('Inter');
  const [googleTextFont, setGoogleTextFont] = useState('Inter');
  const [uploadCssLink, setUploadCssLink] = useState('');
  const [uploadHeadlineFont, setUploadHeadlineFont] = useState('');
  const [uploadTextFont, setUploadTextFont] = useState('');
  const [showHeadlineDropdown, setShowHeadlineDropdown] = useState(false);
  const [showTextDropdown, setShowTextDropdown] = useState(false);

  useEffect(() => {
    const config = loadFontConfig();
    if (config) {
      setActiveTab(config.source);
      if (config.source === 'library') {
        setHeadlineFont(config.headlineFont);
        setTextFont(config.textFont);
      } else if (config.source === 'google') {
        setGoogleCssLink(config.cssLink || '');
        setGoogleHeadlineFont(config.headlineFont);
        setGoogleTextFont(config.textFont);
      } else if (config.source === 'custom') {
        setUploadCssLink(config.cssLink || '');
        setUploadHeadlineFont(config.headlineFont);
        setUploadTextFont(config.textFont);
      }
    }
  }, []);

  useEffect(() => {
    const fonts = [getCurrentHeadlineFont(), getCurrentTextFont()].filter(Boolean);
    if (fonts.length === 0) return;

    const cssLink = activeTab === 'library' 
      ? getGoogleFontsLink(fonts)
      : activeTab === 'google' 
        ? googleCssLink 
        : uploadCssLink;

    if (!cssLink) return;

    const existingLink = document.getElementById('preview-font-link');
    if (existingLink) {
      existingLink.remove();
    }

    const link = document.createElement('link');
    link.id = 'preview-font-link';
    link.rel = 'stylesheet';
    link.href = cssLink;
    document.head.appendChild(link);

    return () => {
      const linkToRemove = document.getElementById('preview-font-link');
      if (linkToRemove) {
        linkToRemove.remove();
      }
    };
  }, [activeTab, headlineFont, textFont, googleHeadlineFont, googleTextFont, googleCssLink, uploadHeadlineFont, uploadTextFont, uploadCssLink]);

  const getCurrentHeadlineFont = () => {
    if (activeTab === 'library') return headlineFont;
    if (activeTab === 'google') return googleHeadlineFont;
    return uploadHeadlineFont;
  };

  const getCurrentTextFont = () => {
    if (activeTab === 'library') return textFont;
    if (activeTab === 'google') return googleTextFont;
    return uploadTextFont;
  };

  const handleSave = () => {
    let fontConfig;
    
    if (activeTab === 'library') {
      const cssLink = getGoogleFontsLink([headlineFont, textFont]);
      fontConfig = { 
        headlineFont, 
        textFont, 
        cssLink,
        source: 'library' as const
      };
    } else if (activeTab === 'google') {
      fontConfig = { 
        cssLink: googleCssLink, 
        headlineFont: googleHeadlineFont, 
        textFont: googleTextFont,
        source: 'google' as const
      };
    } else {
      fontConfig = { 
        cssLink: uploadCssLink, 
        headlineFont: uploadHeadlineFont, 
        textFont: uploadTextFont,
        source: 'custom' as const
      };
    }

    saveFontConfig(fontConfig);
    alert('Шрифты успешно применены! Обновите страницу, чтобы увидеть изменения.');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <Icon name="Type" className="text-blue-600" size={24} />
          <h2 className="text-2xl font-semibold text-gray-900">Настройка шрифтов</h2>
        </div>
        <p className="text-sm text-gray-600">
          Выберите шрифты для заголовков и текста вашего сайта
        </p>
      </div>

      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('library')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'library'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Библиотека
          </button>
          <button
            onClick={() => setActiveTab('google')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'google'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Google Fonts
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'upload'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Загрузить шрифт
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'library' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                Мы отобрали для вас лучшие шрифты. Используйте их, чтобы придать своему проекту подходящий стиль.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Шрифт для заголовков
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowHeadlineDropdown(!showHeadlineDropdown)}
                    className="w-full px-4 py-2 text-left border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
                  >
                    <span style={{ fontFamily: headlineFont }}>{headlineFont}</span>
                    <Icon name="ChevronDown" size={20} />
                  </button>
                  {showHeadlineDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {LIBRARY_FONTS.map((font) => (
                        <button
                          key={font.id}
                          onClick={() => {
                            setHeadlineFont(font.id);
                            setShowHeadlineDropdown(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                          style={{ fontFamily: font.id }}
                        >
                          <div className="font-medium">{font.name}</div>
                          <div className="text-sm text-gray-500">{font.preview}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Шрифт для текста
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowTextDropdown(!showTextDropdown)}
                    className="w-full px-4 py-2 text-left border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
                  >
                    <span style={{ fontFamily: textFont }}>{textFont}</span>
                    <Icon name="ChevronDown" size={20} />
                  </button>
                  {showTextDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {LIBRARY_FONTS.map((font) => (
                        <button
                          key={font.id}
                          onClick={() => {
                            setTextFont(font.id);
                            setShowTextDropdown(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                          style={{ fontFamily: font.id }}
                        >
                          <div className="font-medium">{font.name}</div>
                          <div className="text-sm text-gray-500">{font.preview}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'google' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700 mb-2">
                Подключите любой шрифт из библиотеки{' '}
                <a href="https://fonts.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Google Fonts
                </a>
                . Укажите ссылку на внешний CSS-файл Google и полное название шрифта в полях ниже.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CSS ссылка
              </label>
              <input
                type="text"
                value={googleCssLink}
                onChange={(e) => setGoogleCssLink(e.target.value)}
                placeholder="Например: https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Шрифт для заголовков
                </label>
                <input
                  type="text"
                  value={googleHeadlineFont}
                  onChange={(e) => setGoogleHeadlineFont(e.target.value)}
                  placeholder="Например: Roboto"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Шрифт для текста
                </label>
                <input
                  type="text"
                  value={googleTextFont}
                  onChange={(e) => setGoogleTextFont(e.target.value)}
                  placeholder="Например: Open Sans"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                Вы можете подключить любой свой шрифт. Загрузите файлы в формате WOFF или WOFF2 и укажите название шрифта в поля ниже (или укажите ссылку на CSS-файл на стороннем сервере).
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Файлы шрифта
              </label>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Icon name="Upload" size={20} />
                Загрузить файлы шрифта
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Или укажите ссылку на CSS файл ниже
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CSS ссылка
              </label>
              <input
                type="text"
                value={uploadCssLink}
                onChange={(e) => setUploadCssLink(e.target.value)}
                placeholder="Например: https://example.com/fonts/myfont.css"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Шрифт для заголовков
                </label>
                <input
                  type="text"
                  value={uploadHeadlineFont}
                  onChange={(e) => setUploadHeadlineFont(e.target.value)}
                  placeholder="Например: MyCustomFont"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Шрифт для текста
                </label>
                <input
                  type="text"
                  value={uploadTextFont}
                  onChange={(e) => setUploadTextFont(e.target.value)}
                  placeholder="Например: MyCustomFont"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Предпросмотр</h3>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 space-y-6">
            <div>
              <p className="text-xs text-gray-500 mb-2">Шрифт для заголовков: {getCurrentHeadlineFont()}</p>
              <h1 
                className="text-4xl font-bold text-gray-900 mb-2"
                style={{ fontFamily: `"${getCurrentHeadlineFont()}", sans-serif` }}
              >
                Великолепный заголовок
              </h1>
              <h2 
                className="text-3xl font-semibold text-gray-800 mb-2"
                style={{ fontFamily: `"${getCurrentHeadlineFont()}", sans-serif` }}
              >
                Подзаголовок второго уровня
              </h2>
              <h3 
                className="text-2xl font-medium text-gray-700"
                style={{ fontFamily: `"${getCurrentHeadlineFont()}", sans-serif` }}
              >
                Подзаголовок третьего уровня
              </h3>
            </div>

            <div className="border-t border-gray-300 pt-4">
              <p className="text-xs text-gray-500 mb-2">Шрифт для текста: {getCurrentTextFont()}</p>
              <p 
                className="text-base text-gray-700 leading-relaxed mb-3"
                style={{ fontFamily: `"${getCurrentTextFont()}", sans-serif` }}
              >
                Это пример обычного текста. Здесь вы можете увидеть, как будет выглядеть основной контент вашего сайта с выбранным шрифтом. Важно, чтобы текст был читаемым и приятным для глаз посетителей.
              </p>
              <p 
                className="text-sm text-gray-600"
                style={{ fontFamily: `"${getCurrentTextFont()}", sans-serif` }}
              >
                АаБбВвГгДдЕеЁёЖжЗзИиЙй • 0123456789 • AaBbCcDdEeFfGg
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                style={{ fontFamily: `"${getCurrentTextFont()}", sans-serif` }}
              >
                Кнопка с текстовым шрифтом
              </button>
              <button 
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                style={{ fontFamily: `"${getCurrentHeadlineFont()}", sans-serif` }}
              >
                Кнопка с шрифтом заголовков
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Отмена
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Icon name="Save" size={20} />
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default FontsManager;