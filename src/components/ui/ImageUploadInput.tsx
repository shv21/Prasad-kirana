import React, { useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, X } from 'lucide-react';

interface ImageUploadInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  helpText?: string;
  presetImages?: string[];
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  label,
  value,
  onChange,
  required = false,
  helpText,
  presetImages = []
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compress & convert file to data URL
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 600;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          onChange(dataUrl);
        }
      };
      if (typeof event.target?.result === 'string') {
        img.src = event.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Preview if image exists */}
      {value && (
        <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-sm group bg-slate-100 mb-2">
          <img src={value} alt="Selected preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-90 hover:opacity-100 transition-opacity"
            title="Remove image"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Input Options Row */}
      <div className="flex flex-col sm:flex-row items-stretch gap-2">
        {/* Device File Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Upload className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Upload Image from Device</span>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Web URL input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Or paste image web URL (https://...)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>

      {/* Preset Images if provided */}
      {presetImages.length > 0 && (
        <div className="mt-2">
          <p className="text-[11px] text-slate-500 mb-1 flex items-center gap-1">
            <ImageIcon className="w-3.5 h-3.5" />
            Or pick from sample images:
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {presetImages.map((imgUrl, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onChange(imgUrl)}
                className={`w-9 h-9 rounded-lg overflow-hidden border-2 shrink-0 ${
                  value === imgUrl ? 'border-emerald-600 ring-2 ring-emerald-300' : 'border-slate-200'
                }`}
              >
                <img src={imgUrl} alt="preset" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {helpText && <p className="text-[10px] text-slate-500">{helpText}</p>}
    </div>
  );
};
