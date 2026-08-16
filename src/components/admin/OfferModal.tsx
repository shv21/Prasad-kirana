import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import type { Offer } from '../../types';
import { ImageUploadInput } from '../ui/ImageUploadInput';
import { X } from 'lucide-react';

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  offerToEdit?: Offer | null;
}

const colorPresets = [
  { label: 'Emerald Green', value: 'from-emerald-600 to-teal-700' },
  { label: 'Amber Orange', value: 'from-amber-500 to-orange-600' },
  { label: 'Deep Green', value: 'from-green-700 to-emerald-800' },
  { label: 'Royal Blue', value: 'from-blue-600 to-indigo-700' }
];

export const OfferModal: React.FC<OfferModalProps> = ({
  isOpen,
  onClose,
  offerToEdit
}) => {
  const { addOffer, updateOffer } = useStore();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [discountText, setDiscountText] = useState('10% OFF');
  const [code, setCode] = useState('');
  const [bannerColor, setBannerColor] = useState(colorPresets[0].value);
  const [imageUrl, setImageUrl] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (offerToEdit) {
      setTitle(offerToEdit.title);
      setSubtitle(offerToEdit.subtitle);
      setDiscountText(offerToEdit.discountText);
      setCode(offerToEdit.code || '');
      setBannerColor(offerToEdit.bannerColor || colorPresets[0].value);
      setImageUrl(offerToEdit.imageUrl || '');
      setIsActive(offerToEdit.isActive);
    } else {
      setTitle('');
      setSubtitle('');
      setDiscountText('10% OFF');
      setCode('');
      setBannerColor(colorPresets[0].value);
      setImageUrl('https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80');
      setIsActive(true);
    }
  }, [offerToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (offerToEdit) {
      updateOffer(offerToEdit.id, {
        title,
        subtitle,
        discountText,
        code,
        bannerColor,
        imageUrl,
        isActive
      });
    } else {
      addOffer({
        title,
        subtitle,
        discountText,
        code,
        bannerColor,
        imageUrl,
        isActive
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-200 animate-pop-in">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <h3 className="font-bold text-base sm:text-lg">
            {offerToEdit ? 'Edit Promotional Offer' : 'Create New Offer Banner'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Offer Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Weekend Wheat & Rice Savings"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Badge Tag *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 10% OFF / FREE DELIVERY / BUY 2 GET 1"
              value={discountText}
              onChange={(e) => setDiscountText(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Offer Subtitle / Description *
            </label>
            <textarea
              required
              rows={2}
              placeholder="e.g. Get 10% OFF on CSP Flour Mill Chakki Atta 10kg pack..."
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Promo Code (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. CSPFRESH"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
          </div>

          <ImageUploadInput
            label="Banner Image (Optional)"
            value={imageUrl}
            onChange={setImageUrl}
            helpText="Upload a deal banner image from device or paste image URL."
          />

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Banner Style Color
            </label>
            <select
              value={bannerColor}
              onChange={(e) => setBannerColor(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            >
              {colorPresets.map((preset) => (
                <option key={preset.value} value={preset.value}>
                  {preset.label}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800 pt-1">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 accent-emerald-600 rounded"
            />
            Offer Active on Customer Storefront
          </label>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md"
            >
              {offerToEdit ? 'Save Changes' : 'Create Offer'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
