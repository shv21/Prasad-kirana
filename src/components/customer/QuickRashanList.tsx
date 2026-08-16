import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MessageSquare, ClipboardList, Check } from 'lucide-react';

const commonRashanPresets = [
  { name: 'G пшеница / Atta (कणिक/आटा)', defaultQty: '5 kg' },
  { name: 'Kolam / Basmati Rice (तांदूळ)', defaultQty: '5 kg' },
  { name: 'Toor Dal (तूर डाळ)', defaultQty: '1 kg' },
  { name: 'Sunflower / Groundnut Oil (तेल)', defaultQty: '2 Litres' },
  { name: 'Tata Salt (मीठ)', defaultQty: '1 kg' },
  { name: 'Sugar (साखर)', defaultQty: '2 kg' },
  { name: 'Red Label / Society Tea (चहा पत्ती)', defaultQty: '500 g' },
  { name: 'Surf Excel / Washing Powder (सर्फ)', defaultQty: '1 kg' },
  { name: 'Bath Soap 3-Pack (अंघोळीचा साबण)', defaultQty: '1 Pack' },
  { name: 'Everest Turmeric / Chilli Masala', defaultQty: '200 g' }
];

export const QuickRashanList: React.FC = () => {
  const { settings } = useStore();

  const [selectedPresets, setSelectedPresets] = useState<string[]>([
    'G пшеница / Atta (कणिक/आटा)',
    'Sunflower / Groundnut Oil (तेल)',
    'Tata Salt (मीठ)'
  ]);

  const [customListText, setCustomListText] = useState('');

  const togglePreset = (name: string) => {
    if (selectedPresets.includes(name)) {
      setSelectedPresets((prev) => prev.filter((i) => i !== name));
    } else {
      setSelectedPresets((prev) => [...prev, name]);
    }
  };

  const handleSendWhatsAppList = () => {
    const cleanPhone = settings.whatsappNumber.replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    let msg = `🛒 *माझी महिना किराणा लिस्ट (MONTHLY RASHAN LIST)*\n`;
    msg += `-------------------------------\n`;
    msg += `दुकान: ${settings.shopName} (${settings.address})\n`;
    msg += `-------------------------------\n`;

    if (selectedPresets.length > 0) {
      msg += `*निवडलेल्या किराणा वस्तू (Selected Items):*\n`;
      selectedPresets.forEach((item, idx) => {
        msg += `${idx + 1}. ${item}\n`;
      });
      msg += `\n`;
    }

    if (customListText.trim()) {
      msg += `*इतर अतिरिक्त सामान (Custom List):*\n`;
      msg += `${customListText.trim()}\n\n`;
    }

    msg += `कृपया भाव सांगा व होम डिलिव्हरी/पिकअप कन्फर्म करा. धन्यवाद!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${phoneWithCountry}?text=${encoded}`, '_blank');
  };

  return (
    <section id="quick-rashan-section" className="py-10 bg-emerald-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-emerald-900 rounded-3xl p-6 sm:p-8 border border-emerald-800 shadow-2xl relative overflow-hidden">
          
          <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
            <ClipboardList className="w-4 h-4" />
            <span>फास्ट किराणा लिस्ट ऑर्डर (Quick Rashan List)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            व्हाट्सॲपवर १-क्लिक किराणा लिस्ट पाठवा!
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200 mt-1 max-w-2xl">
            वेळ वाचवा! खालील नेहमी लागणाऱ्या किराणा वस्तू सेलेक्ट करा किंवा तुमची स्वतःची लिस्ट टाईप करा आणि डायरेक्ट दुकानाच्या व्हॉट्सॲपवर ({settings.phone}) पाठवा.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            
            {/* Quick Checklist */}
            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                1. दरमहा लागणारा नेहमीचा किराणा टिक करा (Select Items):
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {commonRashanPresets.map((item) => {
                  const isChecked = selectedPresets.includes(item.name);
                  return (
                    <button
                      key={item.name}
                      onClick={() => togglePreset(item.name)}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer text-left ${
                        isChecked
                          ? 'bg-emerald-700 border-emerald-400 text-white shadow-xs'
                          : 'bg-emerald-950/60 border-emerald-800/80 text-emerald-200 hover:bg-emerald-800/50'
                      }`}
                    >
                      <div>
                        <span className="block font-bold">{item.name}</span>
                        <span className="text-[10px] opacity-75">{item.defaultQty}</span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          isChecked ? 'bg-amber-400 text-slate-950 border-amber-400' : 'border-emerald-600'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom List Box */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-emerald-950/80 p-5 rounded-2xl border border-emerald-800">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
                  2. आणखी काही हवे असल्यास इथे टाईप करा (Type Custom Items):
                </h3>
                <textarea
                  rows={4}
                  placeholder="उदा: 2kg साखर, 1L शेंगदाणा तेल, 1 पॅक मॅगी, 500g चहा..."
                  value={customListText}
                  onChange={(e) => setCustomListText(e.target.value)}
                  className="w-full p-3 text-xs bg-emerald-900/90 border border-emerald-700 text-white placeholder-emerald-400/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <button
                onClick={handleSendWhatsAppList}
                className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
              >
                <MessageSquare className="w-5 h-5 fill-slate-950" />
                <span>व्हॉट्सॲपवर लिस्ट पाठवा (Send List to Shop)</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
