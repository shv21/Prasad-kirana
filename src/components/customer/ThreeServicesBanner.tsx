import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Landmark, ShoppingBag, Wheat, CreditCard, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export const ThreeServicesBanner: React.FC = () => {
  const { settings, setSelectedCategory } = useStore();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="three-services-section" className="py-10 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-slate-950" />
            <span>आमच्या ३ मुख्य तत्पर सेवा (Our 3 Core Services)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            एकाच छताखाली ३ महत्वाच्या सेवा!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            पाचोड खुर्द झेड.पी. शाळेजवळ (Near ZP School Pachod Kh.) — बँक व्यवहार, रोजचा किराणा व ताजी अट्टा चक्की.
          </p>
        </div>

        {/* 3 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* SERVICE 1: CSP Banking Service Point */}
          <div className="bg-slate-800/90 rounded-2xl p-6 border-2 border-blue-500/40 hover:border-blue-400 transition-all flex flex-col justify-between shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              १. CSP Banking
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Landmark className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <span>ग्राहक सेवा केंद्र</span>
                  <span className="text-xs text-blue-400 font-semibold">(CSP Point)</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  खातेदारांसाठी झटपट व सुरक्षित बँक व्यवहार सुविधा. बँकेत रांगेत उभे राहण्याची गरज नाही!
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-700/80 text-xs">
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>आधार द्वारे पैसे काढणे (AEPS Cash Withdrawal)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>मायक्रो एटीएम (Micro ATM Machine)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>खात्यात रोख पैसे भरणे (Cash Deposit)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>मनी ट्रान्सफर व बॅलन्स चौकशी (Money Transfer)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/60">
              <a
                href={`tel:${settings.phone}`}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
              >
                <CreditCard className="w-4 h-4" />
                <span>बँकिंग सेवेसाठी कॉल करा: {settings.phone}</span>
              </a>
            </div>
          </div>

          {/* SERVICE 2: Grocery Store */}
          <div className="bg-slate-800/90 rounded-2xl p-6 border-2 border-emerald-500/40 hover:border-emerald-400 transition-all flex flex-col justify-between shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              २. Grocery Store
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <span>किराणा स्टोअर्स</span>
                  <span className="text-xs text-emerald-400 font-semibold">(Rashan Shop)</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  रोजच्या वापराचा संपूर्ण घरगुती किराणा माल रास्त भावात उपलब्ध.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-700/80 text-xs">
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>तांदूळ (कोलम/बासमती), तूर व मूग डाळ</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>सूर्यफूल, शेंगदाणा तेल व शुद्ध गाईचे तूप</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>टाटा मीठ, मधुर साखर, मसाले व चहा पत्ती</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>सर्फ एक्सेल, विम, साबण व पूजा साहित्य</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/60">
              <button
                onClick={() => scrollTo('products-section')}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
              >
                <span>किराणा वस्तू ऑनलाईन ऑर्डर करा</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SERVICE 3: Flour Mill (Atta Chakki) */}
          <div className="bg-slate-800/90 rounded-2xl p-6 border-2 border-amber-500/40 hover:border-amber-400 transition-all flex flex-col justify-between shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              ३. Flour Mill
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Wheat className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <span>अट्टा चक्की</span>
                  <span className="text-xs text-amber-400 font-semibold">(CSP Flour Mill)</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  गहू व धान्याचे शुद्ध व स्वच्छ दळण. तसेच तयार ताजे दळलेले पीठ उपलब्ध!
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-700/80 text-xs">
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>लोकवण गहू ताजी चक्की कणिक (10kg Bags)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>शाळू ज्वारी व बाजरीचे पीठ (Jowar/Bajra)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>चणा डाळीचे अस्सल बेसन पीठ</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>धान्य व मसाल्यांचे कस्टम दळण</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/60">
              <button
                onClick={() => {
                  setSelectedCategory('cat-1');
                  scrollTo('products-section');
                }}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
              >
                <span>ताजे चक्की पीठ पहा (View Atta)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
