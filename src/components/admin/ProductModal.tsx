import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import type { Product, StockStatus } from '../../types';
import { X, Image as ImageIcon } from 'lucide-react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

const sampleImages = [
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518110165387-74f7429ee632?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=500&auto=format&fit=crop&q=80'
];

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  productToEdit
}) => {
  const { categories, addProduct, updateProduct } = useStore();

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [mrp, setMrp] = useState<number>(0);
  const [categoryId, setCategoryId] = useState('');
  const [stockCount, setStockCount] = useState<number>(20);
  const [isPopular, setIsPopular] = useState(false);
  const [isOffer, setIsOffer] = useState(false);
  const [isFlourMillSpecial, setIsFlourMillSpecial] = useState(false);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(sampleImages[0]);

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setBrand(productToEdit.brand);
      setWeight(productToEdit.weight);
      setPrice(productToEdit.price);
      setMrp(productToEdit.mrp);
      setCategoryId(productToEdit.categoryId);
      setStockCount(productToEdit.stockCount);
      setIsPopular(productToEdit.isPopular);
      setIsOffer(productToEdit.isOffer);
      setIsFlourMillSpecial(!!productToEdit.isFlourMillSpecial);
      setDescription(productToEdit.description || '');
      setImage(productToEdit.image);
    } else {
      setName('');
      setBrand('');
      setWeight('1 kg');
      setPrice(0);
      setMrp(0);
      setCategoryId(categories[0]?.id || '');
      setStockCount(25);
      setIsPopular(false);
      setIsOffer(false);
      setIsFlourMillSpecial(false);
      setDescription('');
      setImage(sampleImages[0]);
    }
  }, [productToEdit, isOpen, categories]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCat = categories.find((c) => c.id === categoryId);

    const discountPercent = mrp > price && mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0;
    const stockStatus: StockStatus = stockCount <= 0 ? 'out_of_stock' : stockCount <= 5 ? 'low_stock' : 'in_stock';

    const payload = {
      name,
      brand: brand || 'Generic',
      weight: weight || '1 Unit',
      price: Number(price),
      mrp: Number(mrp) || Number(price),
      categoryId,
      categoryName: selectedCat?.name || 'General',
      stockStatus,
      stockCount: Number(stockCount),
      isPopular,
      isOffer: isOffer || discountPercent > 0,
      discountPercent,
      isFlourMillSpecial,
      description,
      image
    };

    if (productToEdit) {
      updateProduct(productToEdit.id, payload);
    } else {
      addProduct(payload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200 animate-pop-in">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <h3 className="font-bold text-base sm:text-lg">
            {productToEdit ? 'Edit Product Item' : 'Add New Kirana Product'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Tata Salt / Aashirvaad Atta"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Brand Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Tata / Everest / CSP Mill"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Category *
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Weight / Unit *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 1 kg, 500 g, 1 L"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Available Stock Count *
              </label>
              <input
                type="number"
                min={0}
                required
                value={stockCount}
                onChange={(e) => setStockCount(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Selling Price (₹) *
              </label>
              <input
                type="number"
                min={1}
                required
                placeholder="28"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-emerald-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                MRP Original Price (₹)
              </label>
              <input
                type="number"
                min={0}
                placeholder="30"
                value={mrp}
                onChange={(e) => setMrp(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
              <input
                type="checkbox"
                checked={isPopular}
                onChange={(e) => setIsPopular(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded"
              />
              Mark as Popular 🔥
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
              <input
                type="checkbox"
                checked={isOffer}
                onChange={(e) => setIsOffer(e.target.checked)}
                className="w-4 h-4 accent-amber-600 rounded"
              />
              Mark as Deal/Offer 🏷️
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-extrabold text-amber-900">
              <input
                type="checkbox"
                checked={isFlourMillSpecial}
                onChange={(e) => setIsFlourMillSpecial(e.target.checked)}
                className="w-4 h-4 accent-amber-600 rounded"
              />
              CSP Flour Mill Item 🌾
            </label>
          </div>

          {/* Image Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Product Image URL
            </label>
            <input
              type="text"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            {/* Image Presets Selector */}
            <div className="mt-2">
              <p className="text-[11px] text-slate-500 mb-1.5 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5" />
                Or pick a preset demo image:
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {sampleImages.map((imgUrl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setImage(imgUrl)}
                    className={`w-10 h-10 rounded-lg overflow-hidden border-2 shrink-0 ${
                      image === imgUrl ? 'border-emerald-600 ring-2 ring-emerald-300' : 'border-slate-200'
                    }`}
                  >
                    <img src={imgUrl} alt="preset" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Fresh quality item from shop..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md"
            >
              {productToEdit ? 'Save Changes' : 'Add Product to Inventory'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
