import React from 'react';
import { useStore } from '../../context/StoreContext';
import type { LucideIcon } from 'lucide-react';
import {
  Wheat,
  Container,
  Droplet,
  Flame,
  Cookie,
  Coffee,
  Milk,
  Sparkles,
  Sparkle,
  ShoppingBag
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Wheat,
  Container,
  Droplet,
  Flame,
  Cookie,
  Coffee,
  Milk,
  Sparkles,
  Sparkle
};

export const CategoryGrid: React.FC = () => {
  const { categories, products, selectedCategory, setSelectedCategory } = useStore();

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="categories-section" className="py-10 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Explore Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Find everyday staples, flour mill products & packaged snacks
            </p>
          </div>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline"
            >
              Show All Categories
            </button>
          )}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          
          {/* 'All Categories' Card */}
          <button
            onClick={() => handleSelectCategory('all')}
            className={`flex flex-col items-center p-4 rounded-2xl border transition-all text-center group cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-500 hover:shadow-md'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${
                selectedCategory === 'all'
                  ? 'bg-white/20 text-white'
                  : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm leading-tight">All Products</h3>
            <p
              className={`text-[11px] mt-1 ${
                selectedCategory === 'all' ? 'text-emerald-100' : 'text-slate-500'
              }`}
            >
              {products.length} Items
            </p>
          </button>

          {/* Dynamic Categories */}
          {categories.map((cat) => {
            const Icon = iconMap[cat.iconName] || ShoppingBag;
            const count = products.filter((p) => p.categoryId === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`flex flex-col items-center p-4 rounded-2xl border transition-all text-center group cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-500 hover:shadow-md'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm leading-tight line-clamp-1">
                  {cat.name}
                </h3>
                <p
                  className={`text-[11px] mt-1 ${
                    isSelected ? 'text-emerald-100' : 'text-slate-500'
                  }`}
                >
                  {count} Items
                </p>
              </button>
            );
          })}

        </div>

      </div>
    </section>
  );
};
