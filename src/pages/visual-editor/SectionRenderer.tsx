import Icon from '@/components/ui/icon';
import EditableText from './EditableText';

interface SectionRendererProps {
  section: any;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdateContent: (sectionId: string, field: string, value: any) => void;
}

const SectionRenderer = ({ section, isSelected, onSelect, onUpdateContent }: SectionRendererProps) => {
  const renderSection = () => {
    switch (section.type) {
      case 'header':
        return (
          <div 
            onClick={() => onSelect(section.id)}
            className={`cursor-pointer transition-all ${isSelected ? 'ring-4 ring-primary' : 'hover:ring-2 hover:ring-blue-300'}`}
            style={{ 
              background: section.styles.background, 
              color: section.styles.textColor,
              height: section.styles.height || '80px',
              padding: '0 2rem'
            }}
          >
            <div className="h-full flex items-center justify-between max-w-7xl mx-auto">
              <EditableText
                value={section.content.logo}
                onChange={(value) => onUpdateContent(section.id, 'logo', value)}
                className="font-bold text-xl"
                as="span"
              />
              <nav className="hidden md:flex gap-6 text-sm">
                {section.content.menu?.map((item: string, i: number) => (
                  <a key={i} href="#" className="hover:text-primary transition-colors">{item}</a>
                ))}
              </nav>
              <div className="flex items-center gap-2">
                <Icon name="Phone" size={16} />
                <EditableText
                  value={section.content.phone}
                  onChange={(value) => onUpdateContent(section.id, 'phone', value)}
                  className="text-sm"
                  as="span"
                />
              </div>
            </div>
          </div>
        );
        
      case 'hero':
        return (
          <div 
            onClick={() => onSelect(section.id)}
            className={`cursor-pointer transition-all relative overflow-hidden ${isSelected ? 'ring-4 ring-primary' : 'hover:ring-2 hover:ring-blue-300'}`}
            style={{ 
              background: section.styles.background,
              color: section.styles.textColor,
              minHeight: section.styles.minHeight || '500px'
            }}
          >
            {section.content.image && (
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${section.content.image})` }}
              />
            )}
            <div className="relative max-w-7xl mx-auto px-8 py-24 flex flex-col items-center justify-center text-center">
              <EditableText
                value={section.content.title}
                onChange={(value) => onUpdateContent(section.id, 'title', value)}
                className="text-5xl font-bold mb-4"
                as="h1"
              />
              <EditableText
                value={section.content.subtitle}
                onChange={(value) => onUpdateContent(section.id, 'subtitle', value)}
                className="text-xl mb-8 opacity-90"
                as="p"
              />
              <button className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:shadow-lg transition-shadow">
                <EditableText
                  value={section.content.button}
                  onChange={(value) => onUpdateContent(section.id, 'button', value)}
                  className=""
                  as="span"
                />
              </button>
            </div>
          </div>
        );

      case 'features':
        return (
          <div 
            onClick={() => onSelect(section.id)}
            className={`cursor-pointer transition-all ${isSelected ? 'ring-4 ring-primary' : 'hover:ring-2 hover:ring-blue-300'}`}
            style={{ 
              background: section.styles.background,
              color: section.styles.textColor,
              padding: '4rem 2rem'
            }}
          >
            <div className="max-w-7xl mx-auto">
              <EditableText
                value={section.content.title}
                onChange={(value) => onUpdateContent(section.id, 'title', value)}
                className="text-3xl font-bold text-center mb-12"
                as="h2"
              />
              <div className="grid md:grid-cols-3 gap-8">
                {section.content.items?.map((item: any, i: number) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name={item.icon as any} size={32} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'products':
        return (
          <div 
            onClick={() => onSelect(section.id)}
            className={`cursor-pointer transition-all ${isSelected ? 'ring-4 ring-primary' : 'hover:ring-2 hover:ring-blue-300'}`}
            style={{ 
              background: section.styles.background,
              color: section.styles.textColor,
              padding: '4rem 2rem'
            }}
          >
            <div className="max-w-7xl mx-auto">
              <EditableText
                value={section.content.title}
                onChange={(value) => onUpdateContent(section.id, 'title', value)}
                className="text-3xl font-bold text-center mb-12"
                as="h2"
              />
              <div className="grid md:grid-cols-3 gap-6">
                {section.content.products?.map((product: any, i: number) => (
                  <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{product.name}</h3>
                      <p className="text-primary font-bold">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div 
            onClick={() => onSelect(section.id)}
            className={`cursor-pointer transition-all ${isSelected ? 'ring-4 ring-primary' : 'hover:ring-2 hover:ring-blue-300'}`}
            style={{ 
              background: section.styles.background,
              color: section.styles.textColor,
              padding: '4rem 2rem'
            }}
          >
            <div className="max-w-7xl mx-auto">
              <EditableText
                value={section.content.title}
                onChange={(value) => onUpdateContent(section.id, 'title', value)}
                className="text-3xl font-bold text-center mb-12"
                as="h2"
              />
              <div className="grid md:grid-cols-3 gap-6">
                {section.content.reviews?.map((review: any, i: number) => (
                  <div key={i} className="bg-slate-50 rounded-lg p-6">
                    <div className="flex gap-1 mb-3">
                      {[...Array(review.rating)].map((_, j) => (
                        <Icon key={j} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <p className="text-slate-700 mb-4">"{review.text}"</p>
                    <p className="font-semibold">{review.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'footer':
        return (
          <div 
            onClick={() => onSelect(section.id)}
            className={`cursor-pointer transition-all ${isSelected ? 'ring-4 ring-primary' : 'hover:ring-2 hover:ring-blue-300'}`}
            style={{ 
              background: section.styles.background,
              color: section.styles.textColor,
              padding: '3rem 2rem'
            }}
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap justify-between items-center gap-6">
                <div className="text-sm opacity-80">{section.content.company}</div>
                <div className="flex gap-6 text-sm">
                  {section.content.links?.map((link: string, i: number) => (
                    <a key={i} href="#" className="hover:text-primary transition-colors">{link}</a>
                  ))}
                </div>
                <div className="flex gap-4">
                  {section.content.social?.map((social: string, i: number) => (
                    <a key={i} href="#" className="hover:text-primary transition-colors">
                      <Icon name="Circle" size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div 
            onClick={() => onSelect(section.id)}
            className={`cursor-pointer transition-all p-12 text-center ${isSelected ? 'ring-4 ring-primary' : 'hover:ring-2 hover:ring-blue-300'}`}
            style={{ background: section.styles.background, color: section.styles.textColor }}
          >
            <Icon name="Layout" size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">{section.name}</p>
          </div>
        );
    }
  };

  return renderSection();
};

export default SectionRenderer;