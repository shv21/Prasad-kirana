import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import { FilterDrawer } from './FilterDrawer';
import { SlidersHorizontal, PackageSearch, X } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const {
    products,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    stockOnly,
    offersOnly
  } = useStore();

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Compute filtered & sorted product list
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search query filter (matches name, brand, category)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = product.name.toLowerCase().includes(q);
          const matchBrand = product.brand.toLowerCase().includes(q);
          const matchCat = product.categoryName.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchCat) return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && product.categoryId !== selectedCategory) {
          return false;
        }

        // Stock filter
        if (stockOnly && (product.stockStatus === 'out_of_stock' || product.stockCount <= 0)) {
          return false;
        }

        // Offers filter
        if (offersOnly && (!product.discountPercent || product.discountPercent <= 0)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.price - b.price;
        if (sortBy === 'price_high') return b.price - a.price;
        if (sortBy === 'newest') return b.id.localeCompare(a.id);
        // Default 'popular'
        if (a.isPopular && !b.isPopular) return -1;
        if (!a.isPopular && b.isPopular) return 1;
        return 0;
      });
  }, [products, searchQuery, selectedCategory, stockOnly, offersOnly, sortBy]);

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (stockOnly ? 1 : 0) +
    (offersOnly ? 1 : 0) +
    (sortBy !== 'popular' ? 1 : 0);

  const selectedCategoryObj = categories.find((c) => c.id === selectedCategory);

  return (
    <section id="products-section" className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>{selectedCategoryObj ? selectedCategoryObj.name : 'Store Inventory'}</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                {filteredProducts.length} items
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Fresh quality products from {selectedCategoryObj ? selectedCategoryObj.name : 'all categories'}
            </p>
          </div>

          {/* Controls: Sort & Filter Toggle */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="popular">Sort: Popularity</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="newest">Newest Products</option>
            </select>

            {/* Filter Drawer Button */}
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="relative flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-amber-400 text-slate-900 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center ml-0.5">
                  {activeFilterCount}
                </span>
              )}
            </button>

          </div>
        </div>

        {/* Category Horizontal Quick Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Items ({products.length})
          </button>
          {categories.map((c) => {
            const count = products.filter((p) => p.categoryId === c.id).length;
            const isSelected = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {c.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Active Search & Filter Tags Bar */}
        {(searchQuery || selectedCategory !== 'all' || stockOnly || offersOnly) && (
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 mb-6 text-xs">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
              Active Filters:
            </span>
            {searchQuery && (
              <span className="bg-white text-slate-800 border border-slate-300 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
                Search: "{searchQuery}"
                <X className="w-3.5 h-3.5 text-slate-400 hover:text-slate-700 cursor-pointer" onClick={() => setSearchQuery('')} />
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="bg-white text-slate-800 border border-slate-300 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
                Cat: {selectedCategoryObj?.name}
                <X className="w-3.5 h-3.5 text-slate-400 hover:text-slate-700 cursor-pointer" onClick={() => setSelectedCategory('all')} />
              </span>
            )}
            {stockOnly && (
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-lg font-medium">
                In-Stock Only
              </span>
            )}
            {offersOnly && (
              <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-lg font-medium">
                Discounts Only
              </span>
            )}
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 bg-slate-50 rounded-3xl border border-slate-200/80">
            <div className="w-16 h-16 bg-slate-200/80 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <PackageSearch className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-1">
              No products found
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
              We couldn't find any items matching your current search or filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md"
            >
              Clear Search & Show All Products
            </button>
          </div>
        )}

      </div>

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
      />
    </section>
  );
};
