import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface ZeroBlockEditorProps {
  onClose: () => void;
  onSave: (html: string, css: string, js: string) => void;
}

const ZeroBlockEditor = ({ onClose, onSave }: ZeroBlockEditorProps) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [blockName, setBlockName] = useState('Новый Zero Block');
  const [html, setHtml] = useState(`<div class="zero-block">
  <div class="container">
    <h2>Заголовок блока</h2>
    <p>Текст блока</p>
  </div>
</div>`);
  const [css, setCss] = useState(`.zero-block {
  padding: 60px 20px;
  background: #f8f9fa;
}

.zero-block .container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.zero-block h2 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1e293b;
}

.zero-block p {
  font-size: 1.125rem;
  color: #64748b;
}`);
  const [js, setJs] = useState(`// JavaScript код для блока
console.log('Zero Block загружен');

// Пример интерактивности
document.addEventListener('DOMContentLoaded', function() {
  const block = document.querySelector('.zero-block');
  if (block) {
    block.addEventListener('click', function() {
      console.log('Блок нажат');
    });
  }
});`);

  const [showPreview, setShowPreview] = useState(false);

  const handleSave = () => {
    onSave(html, css, js);
    onClose();
  };

  const renderPreview = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
      </html>
    `;
  };

  const insertCode = (code: string) => {
    if (activeTab === 'html') {
      setHtml(html + '\n' + code);
    } else if (activeTab === 'css') {
      setCss(css + '\n' + code);
    } else {
      setJs(js + '\n' + code);
    }
  };

  const codeSnippets = [
    {
      name: 'Кнопка',
      html: '<button class="custom-btn">Нажми меня</button>',
      css: `.custom-btn {
  padding: 12px 32px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}
.custom-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
}`
    },
    {
      name: 'Карточка',
      html: `<div class="card">
  <h3>Заголовок</h3>
  <p>Описание карточки</p>
</div>`,
      css: `.card {
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}`
    },
    {
      name: 'Анимация появления',
      js: `const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.animate').forEach(el => {
  observer.observe(el);
});`
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Input
                value={blockName}
                onChange={(e) => setBlockName(e.target.value)}
                className="font-semibold text-lg border-0 px-0 focus-visible:ring-0"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Icon name="Eye" size={16} className="mr-2" />
                {showPreview ? 'Скрыть' : 'Предпросмотр'}
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Icon name="Save" size={16} className="mr-2" />
                Сохранить
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>
        </CardHeader>

        <div className="flex-1 flex overflow-hidden">
          {/* Code Editor */}
          <div className="flex-1 flex flex-col border-r">
            {/* Tabs */}
            <div className="flex gap-1 p-2 bg-slate-50 border-b">
              <button
                onClick={() => setActiveTab('html')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'html'
                    ? 'bg-white shadow-sm text-slate-800'
                    : 'text-slate-600 hover:bg-white/50'
                }`}
              >
                <Icon name="Code" size={14} className="inline mr-2" />
                HTML
              </button>
              <button
                onClick={() => setActiveTab('css')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'css'
                    ? 'bg-white shadow-sm text-slate-800'
                    : 'text-slate-600 hover:bg-white/50'
                }`}
              >
                <Icon name="Palette" size={14} className="inline mr-2" />
                CSS
              </button>
              <button
                onClick={() => setActiveTab('js')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'js'
                    ? 'bg-white shadow-sm text-slate-800'
                    : 'text-slate-600 hover:bg-white/50'
                }`}
              >
                <Icon name="Zap" size={14} className="inline mr-2" />
                JavaScript
              </button>
            </div>

            {/* Code Area */}
            <div className="flex-1 p-4 overflow-auto">
              {activeTab === 'html' && (
                <Textarea
                  value={html}
                  onChange={(e) => setHtml(e.target.value)}
                  className="h-full font-mono text-sm resize-none"
                  placeholder="Введите HTML код..."
                />
              )}
              {activeTab === 'css' && (
                <Textarea
                  value={css}
                  onChange={(e) => setCss(e.target.value)}
                  className="h-full font-mono text-sm resize-none"
                  placeholder="Введите CSS код..."
                />
              )}
              {activeTab === 'js' && (
                <Textarea
                  value={js}
                  onChange={(e) => setJs(e.target.value)}
                  className="h-full font-mono text-sm resize-none"
                  placeholder="Введите JavaScript код..."
                />
              )}
            </div>
          </div>

          {/* Sidebar with snippets */}
          <div className="w-80 flex flex-col bg-slate-50">
            <div className="p-4 border-b bg-white">
              <h3 className="font-semibold text-slate-800">Готовые элементы</h3>
              <p className="text-xs text-slate-600 mt-1">Нажмите, чтобы вставить код</p>
            </div>
            <div className="flex-1 overflow-auto p-4 space-y-3">
              {codeSnippets.map((snippet, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    if (snippet.html) insertCode(snippet.html);
                    if (snippet.css) insertCode(snippet.css);
                    if (snippet.js) insertCode(snippet.js);
                  }}
                >
                  <CardContent className="p-3">
                    <h4 className="font-medium text-sm text-slate-800 mb-1">
                      {snippet.name}
                    </h4>
                    <div className="flex gap-1">
                      {snippet.html && (
                        <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded">
                          HTML
                        </span>
                      )}
                      {snippet.css && (
                        <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                          CSS
                        </span>
                      )}
                      {snippet.js && (
                        <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded">
                          JS
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-3">
                  <div className="flex items-start gap-2">
                    <Icon name="Info" size={16} className="text-purple-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-purple-900">
                      <p className="font-medium mb-1">Библиотека кодов</p>
                      <p>Доступ к готовым компонентам из nolim.cc</p>
                      <Button size="sm" variant="outline" className="mt-2 w-full text-xs h-7">
                        Открыть библиотеку
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="w-1/2 border-l">
              <div className="h-full overflow-auto bg-white">
                <iframe
                  srcDoc={renderPreview()}
                  className="w-full h-full border-0"
                  title="Preview"
                />
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ZeroBlockEditor;