
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Car, Droplets, Info, ChevronLeft, RefreshCw, MessageSquare, AlertTriangle, X, Moon, Sun, WifiOff } from 'lucide-react';
import { BRANDS } from './constants';
import { Brand, CarModel, EngineOption } from './types';
import { getExpertAdvice } from './services/geminiService';

const App: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedModel, setSelectedModel] = useState<CarModel | null>(null);
  const [selectedEngine, setSelectedEngine] = useState<EngineOption | null>(null);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const filteredBrands = useMemo(() => {
    return BRANDS.filter(brand => 
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredModels = useMemo(() => {
    if (!selectedBrand) return [];
    return selectedBrand.models.filter(model =>
      model.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [selectedBrand, searchTerm]);

  const resetSelection = () => {
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedEngine(null);
    setAiAdvice(null);
    setSearchTerm('');
  };

  const handleEngineSelect = async (engine: EngineOption) => {
    setSelectedEngine(engine);
    if (!isOnline) {
      setAiAdvice("برای دریافت مشاوره هوشمند، لطفاً به اینترنت متصل شوید. اطلاعات پایه فنی در بالا قابل مشاهده است.");
      return;
    }
    setLoadingAi(true);
    setAiAdvice(null);
    const infoString = `${selectedBrand?.name} - ${selectedModel?.name} - موتور ${engine.name}`;
    const advice = await getExpertAdvice(infoString);
    setAiAdvice(advice);
    setLoadingAi(false);
  };

  const ImageOrIcon = ({ src, alt, className }: { src?: string, alt: string, className: string }) => {
    const [error, setError] = useState(false);
    if (!src || error) {
      return (
        <div className={`${className} bg-gray-100 dark:bg-gray-700 flex items-center justify-center rounded-xl`}>
          <Car className="text-gray-400 dark:text-gray-500" size={24} />
        </div>
      );
    }
    return <img src={src} alt={alt} className={className} onError={() => setError(true)} />;
  };

  return (
    <div className={`min-h-screen flex flex-col max-w-2xl mx-auto shadow-2xl transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <header className={`bg-gradient-to-l ${isDarkMode ? 'from-gray-800 to-gray-900' : 'from-blue-700 to-indigo-800'} text-white p-5 sticky top-0 z-30 shadow-lg select-none`}>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-black flex items-center gap-2">
            <Droplets className="text-yellow-400" />
            روغن‌یاب خودرو
          </h1>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="bg-white/10 p-2 rounded-xl active:scale-90 transition-all"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {(selectedBrand || selectedModel) && (
              <button 
                onClick={resetSelection}
                className="bg-white/10 p-2 rounded-xl active:scale-90 transition-all"
              >
                <RefreshCw size={20} />
              </button>
            )}
          </div>
        </div>
        <p className="text-blue-100 text-xs opacity-90">نسخه اپلیکیشن اندروید - راهنمای فنی</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 pb-12 overflow-x-hidden">
        
        {!selectedBrand && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute right-4 top-4 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="جستجوی برند (مثلاً هیوندای یا سایپا)..."
                  className={`w-full pr-12 pl-4 py-4 border-2 rounded-2xl focus:border-blue-500 focus:outline-none transition-all text-sm font-bold ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-100 text-gray-900 placeholder-gray-400'}`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <h2 className="text-md font-bold mb-4 flex items-center gap-2 px-1">
              <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">۱</span>
              برند خودرو را انتخاب کنید:
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredBrands.map(brand => (
                <button
                  key={brand.id}
                  onClick={() => { setSelectedBrand(brand); setSearchTerm(''); }}
                  className={`flex flex-col items-center justify-center p-4 border-2 rounded-2xl transition-all active:scale-95 group aspect-square shadow-sm ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}
                >
                  <div className="w-12 h-12 mb-3 flex items-center justify-center">
                    <ImageOrIcon src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  <span className="font-bold text-center text-[11px] sm:text-xs">{brand.name}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {selectedBrand && !selectedModel && (
          <section className="animate-in fade-in slide-in-from-right-4 duration-500">
            <button onClick={() => setSelectedBrand(null)} className="flex items-center text-blue-500 mb-6 font-bold text-sm">
              <ChevronLeft size={18} />
              بازگشت به برندها
            </button>

            <div className="mb-6">
              <input 
                type="text" 
                placeholder={`جستجوی مدل ${selectedBrand.name}...`}
                className={`w-full px-4 py-4 border-2 rounded-2xl focus:border-blue-500 focus:outline-none transition-all text-sm font-bold ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-100 text-gray-900'}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              {filteredModels.map(model => (
                <button
                  key={model.id}
                  onClick={() => { setSelectedModel(model); setSearchTerm(''); }}
                  className={`w-full flex items-center justify-between p-5 border-2 rounded-2xl active:scale-[0.98] transition-all shadow-sm ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}
                >
                  <div className="flex items-center gap-4">
                    <Car size={20} className="text-gray-400" />
                    <span className="font-bold text-md">{model.name}</span>
                  </div>
                  <ChevronLeft size={16} className="text-gray-300" />
                </button>
              ))}
            </div>
          </section>
        )}

        {selectedModel && !selectedEngine && (
          <section className="animate-in fade-in slide-in-from-right-4 duration-500">
            <button onClick={() => setSelectedModel(null)} className="flex items-center text-blue-500 mb-6 font-bold text-sm">
              <ChevronLeft size={18} />
              بازگشت به مدل‌ها
            </button>
            <div className="space-y-4">
              {selectedModel.engines.map(engine => (
                <button
                  key={engine.id}
                  onClick={() => handleEngineSelect(engine)}
                  className={`w-full text-right p-6 border-2 rounded-3xl active:scale-[0.98] transition-all shadow-sm ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}
                >
                  <div className="font-black text-lg mb-1">{engine.name}</div>
                  <div className="text-xs opacity-50">مشاهده ظرفیت و گرانروی</div>
                </button>
              ))}
            </div>
          </section>
        )}

        {selectedEngine && (
          <div className="animate-in zoom-in-95 duration-500">
            <div className={`rounded-[2rem] border-2 overflow-hidden shadow-2xl mb-8 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-blue-50'}`}>
              <div className={`p-6 text-white ${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-l from-blue-600 to-indigo-700'}`}>
                <h2 className="text-xl font-black">{selectedModel?.name}</h2>
                <p className="opacity-80 text-xs mt-1">{selectedEngine.name}</p>
              </div>
              
              <div className="p-5 grid grid-cols-1 gap-3">
                <ResultCard isDark={isDarkMode} icon={<Droplets size={16}/>} label="گرانروی پیشنهادی" value={selectedEngine.viscosity} color="amber" />
                <ResultCard isDark={isDarkMode} icon={<Info size={16}/>} label="سطح کیفی API" value={selectedEngine.apiGrade} color="blue" />
                <div className="grid grid-cols-2 gap-3">
                  <ResultCard isDark={isDarkMode} icon={<AlertTriangle size={14}/>} label="حجم با فیلتر" value={selectedEngine.capacityWithFilter} color="emerald" />
                  <ResultCard isDark={isDarkMode} icon={<AlertTriangle size={14}/>} label="حجم بدون فیلتر" value={selectedEngine.capacityWithoutFilter} color="teal" />
                </div>
              </div>
            </div>

            <div className={`rounded-[2rem] p-6 shadow-xl relative overflow-hidden ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-indigo-900 text-white'}`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-indigo-500' : 'bg-white/10'}`}>
                  {isOnline ? <MessageSquare className="text-yellow-400" size={20} /> : <WifiOff className="text-red-400" size={20} />}
                </div>
                <h3 className="font-black text-lg">مشاوره هوشمند</h3>
              </div>

              {loadingAi ? (
                <div className="flex flex-col items-center justify-center py-6 opacity-70">
                  <RefreshCw className="animate-spin mb-2" size={24} />
                  <span className="text-xs font-bold">در حال دریافت اطلاعات...</span>
                </div>
              ) : (
                <div className={`text-xs leading-7 whitespace-pre-line p-5 rounded-2xl ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-white/5 border border-white/10'}`}>
                  {aiAdvice}
                </div>
              )}
            </div>

            <button onClick={resetSelection} className={`w-full mt-8 font-black py-5 rounded-[1.5rem] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-3 ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-gray-900 text-white'}`}>
              <RefreshCw size={18} />
              جستجوی جدید
            </button>
          </div>
        )}
      </main>

      <footer className={`p-8 text-center border-t text-[11px] select-none ${isDarkMode ? 'border-gray-800 bg-gray-900 text-gray-500' : 'bg-gray-50 text-gray-400'}`}>
        <p className="font-bold">تمامی حقوق محفوظ است © ۱۴۰۳ | روغن‌یاب</p>
        <p className="mt-2 leading-relaxed">
          طراحی و توسعه توسط{' '}
          <a 
            href="https://koolegard.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:underline font-bold"
          >
            توحید شعبانلو
          </a>
        </p>
        <p className="mt-1 opacity-60">نسخه ۱.۰.۰ (اندروید)</p>
      </footer>
    </div>
  );
};

const ResultCard: React.FC<{ icon: React.ReactNode, label: string, value: string, color: string, isDark: boolean }> = ({ icon, label, value, color, isDark }) => {
  const colorMap: Record<string, string> = {
    amber: isDark ? 'bg-amber-900/10 text-amber-400 border-amber-900/30' : 'bg-amber-50 text-amber-900 border-amber-100',
    blue: isDark ? 'bg-blue-900/10 text-blue-400 border-blue-900/30' : 'bg-blue-50 text-blue-900 border-blue-100',
    emerald: isDark ? 'bg-emerald-900/10 text-emerald-400 border-emerald-900/30' : 'bg-emerald-50 text-emerald-900 border-emerald-100',
    teal: isDark ? 'bg-teal-900/10 text-teal-400 border-teal-900/30' : 'bg-teal-50 text-teal-900 border-teal-100',
  };

  return (
    <div className={`p-4 rounded-2xl border flex flex-col gap-2 transition-all ${colorMap[color]}`}>
      <div className="flex items-center gap-2 text-[10px] font-black opacity-70 uppercase">
        {icon}
        {label}
      </div>
      <div className="text-lg font-black">{value}</div>
    </div>
  );
};

export default App;
