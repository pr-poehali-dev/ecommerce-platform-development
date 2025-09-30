import { useState } from 'react';
import SettingsBlocks from './general-settings/SettingsBlocks';
import NotificationTabs from './general-settings/NotificationTabs';
import DataManagementTabs from './general-settings/DataManagementTabs';

const GeneralSettings = () => {
  const [activeTab, setActiveTab] = useState('settings');
  const [expandedBlocks, setExpandedBlocks] = useState<{ [key: string]: boolean }>({
    account: true,
    password: true,
    auth: true,
    telegram: true,
    domain: true,
    mailService: true,
    redirects: true,
    sitemap: true,
    watermark: true,
    panelSettings: true,
    linkedAccounts: true,
    sape: true,
    deleteWebsite: true
  });

  const toggleBlock = (block: string) => {
    setExpandedBlocks(prev => ({ ...prev, [block]: !prev[block] }));
  };

  const tabs = [
    { id: 'settings', label: 'Общие настройки' },
    { id: 'administrators', label: 'Администраторы сайта' },
    { id: 'sms', label: 'Уведомления по SMS' },
    { id: 'telegram', label: 'Уведомления в Telegram' },
    { id: 'emails', label: 'Уведомления по е-мейл' },
    { id: 'senders', label: 'Отправители е-мейл' },
    { id: 'copy', label: 'Копирование данных' },
    { id: 'backups', label: 'Резервные копии' }
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Общие настройки</h2>
        <p className="text-slate-600">Управление основными параметрами магазина</p>
      </div>

      {/* Horizontal tabs menu */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex flex-wrap gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-primary border-b-2 border-primary'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === 'settings' && (
        <SettingsBlocks expandedBlocks={expandedBlocks} toggleBlock={toggleBlock} />
      )}

      <NotificationTabs activeTab={activeTab} />
      <DataManagementTabs activeTab={activeTab} />
    </div>
  );
};

export default GeneralSettings;