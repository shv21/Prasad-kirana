import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Truck, PhoneCall } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { settings } = useStore();

  if (!settings.announcementBar) return null;

  return (
    <div className="bg-emerald-700 text-emerald-50 px-4 py-2 text-xs md:text-sm font-medium text-center flex items-center justify-center gap-2 shadow-inner">
      <Truck className="w-4 h-4 shrink-0 animate-bounce" />
      <span className="truncate">{settings.announcementBar}</span>
      <a
        href={`tel:${settings.phone}`}
        className="hidden md:inline-flex items-center gap-1 bg-emerald-800 hover:bg-emerald-900 text-white px-2.5 py-0.5 rounded-full text-xs transition-colors ml-2"
      >
        <PhoneCall className="w-3 h-3" />
        Call {settings.phone}
      </a>
    </div>
  );
};
