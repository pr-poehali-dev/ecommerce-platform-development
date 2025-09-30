export interface FontConfig {
  headlineFont: string;
  textFont: string;
  cssLink?: string;
  source: 'library' | 'google' | 'custom';
}

const FONT_CONFIG_KEY = 'poehali_font_config';

export const saveFontConfig = (config: FontConfig) => {
  localStorage.setItem(FONT_CONFIG_KEY, JSON.stringify(config));
  applyFonts(config);
};

export const loadFontConfig = (): FontConfig | null => {
  const saved = localStorage.getItem(FONT_CONFIG_KEY);
  return saved ? JSON.parse(saved) : null;
};

export const applyFonts = (config: FontConfig) => {
  const root = document.documentElement;
  
  if (config.cssLink) {
    const existingLink = document.getElementById('custom-font-link');
    if (existingLink) {
      existingLink.remove();
    }
    
    const link = document.createElement('link');
    link.id = 'custom-font-link';
    link.rel = 'stylesheet';
    link.href = config.cssLink;
    document.head.appendChild(link);
  }
  
  root.style.setProperty('--font-headline', config.headlineFont);
  root.style.setProperty('--font-text', config.textFont);
  
  const style = document.getElementById('dynamic-font-style');
  if (style) {
    style.remove();
  }
  
  const newStyle = document.createElement('style');
  newStyle.id = 'dynamic-font-style';
  newStyle.textContent = `
    body {
      font-family: "${config.textFont}", sans-serif !important;
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: "${config.headlineFont}", sans-serif !important;
    }
  `;
  document.head.appendChild(newStyle);
};

export const getGoogleFontsLink = (fonts: string[]): string => {
  const fontParams = fonts.map(font => 
    font.replace(/\s+/g, '+') + ':wght@400;500;600;700'
  ).join('&family=');
  
  return `https://fonts.googleapis.com/css2?family=${fontParams}&display=swap`;
};

export const LIBRARY_FONTS = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Montserrat',
  'PT Sans',
  'PT Serif',
  'Playfair Display',
  'Raleway',
  'Manrope',
  'Ubuntu',
  'Noto Sans',
  'Noto Serif',
  'Oswald',
  'Cormorant',
  'Rubik',
  'Comfortaa',
  'Arial',
  'Georgia',
  'Times New Roman'
];

export const initializeFonts = () => {
  const config = loadFontConfig();
  if (config) {
    applyFonts(config);
  }
};