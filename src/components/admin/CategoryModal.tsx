import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import type { Category } from '../../types';
import { ImageUploadInput } from '../ui/ImageUploadInput';
import { X } from 'lucide-react';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryToEdit?: Category | null;
}

const iconOptions = [
  'Wheat',
  'Container',
  'Droplet',
  'Flame',
  'Cookie',
  'Coffee',
  'Milk',
  'Sparkles',
  'Sparkle'
];

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  categoryToEdit
}) => {
  const { addCategory, updateCategory, categories } = useStore();

  const [name, setName] = useState('');
  const [iconName, setIconName] = useState('Wheat');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number>(categories.length + 1);

  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name);
      setIconName(categoryToEdit.iconName);
      setDescription(categoryToEdit.description || '');
      setImage(categoryToEdit.image || '');
      setDisplayOrder(categoryToEdit.displayOrder || 1);
    } else {
      setName('');
      setIconName('Wheat');
      setDescription('');
      setImage('https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80');
      setDisplayOrder(categories.length + 1);
    }
  }, [categoryToEdit, isOpen, categories]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (categoryToEdit) {
        await updateCategory(categoryToEdit.id, {
          name,
          iconName,
          description,
          image,
          displayOrder: Number(displayOrder)
        });
      } else {
        await addCategory({
          name,
          iconName,
          description,
          image,
          displayOrder: Number(displayOrder)
        });
      }
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-200 animate-pop-in">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <h3 className="font-bold text-base sm:text-lg">
            {categoryToEdit ? 'Edit Category' : 'Add New Category'}
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
              Category Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Atta & Flour Mill / Rice & Dal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Icon Type *
            </label>
            <select
              value={iconName}
              onChange={(e) => setIconName(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {iconOptions.map((icon) => (
                <option key={icon} value={icon}>
                  {icon} Icon
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Display Sequence Order
            </label>
            <input
              type="number"
              min={1}
              value={displayOrder}
              onChange={(e) => setDisplayOrder(Number(e.target.value))}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <ImageUploadInput
            label="Category Image"
            value={image}
            onChange={setImage}
            helpText="Upload a category picture from your device gallery or paste an image URL."
          />

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Category Description (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Short summary of items in this category..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

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
              {categoryToEdit ? 'Save Changes' : 'Create Category'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
