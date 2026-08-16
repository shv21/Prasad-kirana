import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, SlidersHorizontal, Check, RefreshCw } from 'lucide-react';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, onClose }) => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    stockOnly,
    setStockOnly,
    offersOnly,
    setOffersOnly
  } = useStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-slide-up">
          
          {/* Header */}
          <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base sm:text-lg font-bold">Filter & Sort Products</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5 text-slate-300" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-6">
            
            {/* Sort Options */}
            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-500 tracking-wider mb-3">
                Sort By
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'popular', label: '🔥 Popularity' },
                  { id: 'price_low', label: '💰 Price: Low to High' },
                  { id: 'price_high', label: '💎 Price: High to Low' },
                  { id: 'newest', label: '✨ Newest First' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSortBy(opt.id as any)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors ${
                      sortBy === opt.id
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-500'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {sortBy === opt.id && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-500 tracking-wider mb-3">
                Category
              </label>
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full p-2.5 rounded-xl text-xs font-semibold text-left flex items-center justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>All Categories</span>
                  {selectedCategory === 'all' && <Check className="w-4 h-4" />}
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`w-full p-2.5 rounded-xl text-xs font-semibold text-left flex items-center justify-between ${
                      selectedCategory === c.id
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{c.name}</span>
                    {selectedCategory === c.id && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Checkboxes */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <label className="block text-xs font-extrabold uppercase text-slate-500 tracking-wider">
                Availability & Offers
              </label>
              
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <span className="text-xs font-medium text-slate-800">In Stock Items Only</span>
                <input
                  type="checkbox"
                  checked={stockOnly}
                  onChange={(e) => setStockOnly(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-amber-50/70 border border-amber-200 cursor-pointer">
                <span className="text-xs font-medium text-amber-900">Discounted / Offer Items Only</span>
                <input
                  type="checkbox"
                  checked={offersOnly}
                  onChange={(e) => setOffersOnly(e.target.checked)}
                  className="w-4 h-4 accent-amber-600 rounded"
                />
              </label>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSortBy('popular');
                setStockOnly(false);
                setOffersOnly(false);
              }}
              className="flex items-center justify-center gap-1.5 p-3 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 flex-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
            <button
              onClick={onClose}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-3 rounded-xl text-xs flex-1 text-center shadow-md"
            >
              Apply Filters
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
