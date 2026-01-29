
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Car, Info, ChevronLeft, RefreshCw, AlertTriangle, Moon, Sun, FileText, Droplets, Wrench, Book, Database, Plus, Trash2, X, Edit } from 'lucide-react';
import { App as CapacitorApp } from '@capacitor/app';
import { Preferences } from '@capacitor/preferences';
import DatePicker, { utils } from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { BRANDS } from './constants';
import { Brand, CarModel, EngineOption, MaintenanceLog as Log } from './types';

// @ts-ignore
import appLogo from './roghan.png';

const LOG_STORAGE_KEY = 'maintenance_logs';
const MY_CAR_STORAGE_KEY = 'my_car_selection';

const serviceOptions = [
    'تعویض روغن موتور',
    'تعویض فیلتر روغن',
    'تعویض فیلتر کابین',
    'تعویض فیلتر بنزین',
    'تعویض فیلتر هوا',
    'تعویض شمع‌ها',
    'سرویس ترمزها'
];

const toPersianDigits = (n: string | number) => {
    if (n === null || n === undefined) return '';
    const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(n).replace(/[0-9]/g, w => id[+w]);
};

const formatDate = (dateStr: string) => {
    if (dateStr.includes('/')) return dateStr;

    // Handle legacy ISO strings
    try {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        // If year is < 1600, it was incorrectly saved as Jalali-in-Gregorian
        if (year < 1600) {
            return `${year}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
        }
        return date.toLocaleDateString('fa-IR-u-nu-latn');
    } catch (e) {
        return dateStr;
    }
};

const App: React.FC = () => {
    const [view, setView] = useState('dashboard');
    const [myCar, setMyCar] = useState<any | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
    const [selectedModel, setSelectedModel] = useState<CarModel | null>(null);
    const [selectedEngine, setSelectedEngine] = useState<EngineOption | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [logs, setLogs] = useState<Log[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [kilometer, setKilometer] = useState('');
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [notes, setNotes] = useState('');
    const [selectedDay, setSelectedDay] = useState(utils('fa').getToday());
    const [showMyCarInfo, setShowMyCarInfo] = useState(false);
    const [editingLog, setEditingLog] = useState<Log | null>(null);
    const [showCustomCar, setShowCustomCar] = useState(false);
    const [customCarName, setCustomCarName] = useState('');

    useEffect(() => {
        const loadInitialData = async () => {
            const { value: myCarValue } = await Preferences.get({ key: MY_CAR_STORAGE_KEY });
            if (myCarValue) {
                const savedCar = JSON.parse(myCarValue);
                if (savedCar.isCustom) {
                    setMyCar(savedCar);
                } else {
                    const brand = BRANDS.find(b => b.id === savedCar.brandId);
                    const model = brand?.models.find(m => m.id === savedCar.modelId);
                    const engine = model?.engines.find(e => e.id === savedCar.engineId);
                    if (brand && model && engine) {
                        setMyCar({ brand, model, engine, isCustom: false });
                    } else {
                        setView('browser');
                    }
                }
            } else {
                setView('browser');
            }
            const { value: logsValue } = await Preferences.get({ key: LOG_STORAGE_KEY });
            if (logsValue) {
                const parsedLogs: Log[] = JSON.parse(logsValue);
                parsedLogs.sort((a, b) => b.date.localeCompare(a.date));
                setLogs(parsedLogs);
            }
        };
        loadInitialData();

        CapacitorApp.addListener('backButton', ({ canGoBack }) => {
            handleBackPress();
        });

        return () => {
            CapacitorApp.removeAllListeners();
        }

    }, []);

    const handleBackPress = () => {
        if (showMyCarInfo) {
            setShowMyCarInfo(false);
        } else if (showForm) {
            resetLogForm();
        } else if (view === 'browser') {
            if (selectedEngine) {
                setSelectedEngine(null);
            } else if (selectedModel) {
                setSelectedModel(null);
            } else if (selectedBrand) {
                resetBrowser();
            } else if (showCustomCar) {
                setShowCustomCar(false);
            } else if (myCar) {
                setView('dashboard');
            } else {
                CapacitorApp.exitApp();
            }
        } else {
            CapacitorApp.exitApp();
        }
    }

    const filteredBrands = useMemo(() => BRANDS.filter(brand => brand.name.toLowerCase().includes(searchTerm.toLowerCase()) || brand.id.toLowerCase().includes(searchTerm.toLowerCase())), [searchTerm]);
    const filteredModels = useMemo(() => !selectedBrand ? [] : selectedBrand.models.filter(model => model.name.toLowerCase().includes(searchTerm.toLowerCase())), [selectedBrand, searchTerm]);

    const handleSelectEngine = (engine: EngineOption) => setSelectedEngine(engine);

    const handleSetMyCar = async (carData: any) => {
        await Preferences.set({ key: MY_CAR_STORAGE_KEY, value: JSON.stringify(carData) });
        if (carData.isCustom) {
            setMyCar(carData);
        } else {
            const brand = BRANDS.find(b => b.id === carData.brandId)!;
            const model = brand.models.find(m => m.id === carData.modelId)!;
            const engine = model.engines.find(e => e.id === carData.engineId)!;
            setMyCar({ brand, model, engine, isCustom: false });
        }
        setView('dashboard');
        resetBrowser();
    };

    const resetBrowser = () => {
        setSelectedBrand(null);
        setSelectedModel(null);
        setSelectedEngine(null);
        setSearchTerm('');
        setShowCustomCar(false);
        setCustomCarName('');
    };

    const saveLogs = async (updatedLogs: Log[]) => {
        await Preferences.set({ key: LOG_STORAGE_KEY, value: JSON.stringify(updatedLogs) });
        updatedLogs.sort((a, b) => b.date.localeCompare(a.date));
        setLogs(updatedLogs);
    };

    const handleSaveLog = () => {
        if (!kilometer || selectedServices.length === 0) {
            alert('لطفاً کیلومتر و حداقل یک سرویس را مشخص کنید.');
            return;
        }

        let updatedLogs;
        if (editingLog) {
            updatedLogs = logs.map(log =>
                log.id === editingLog.id
                    ? { ...log, date: `${selectedDay.year}/${String(selectedDay.month).padStart(2, '0')}/${String(selectedDay.day).padStart(2, '0')}`, kilometer: Number(kilometer), services: selectedServices, notes }
                    : log
            );
        } else {
            const newLog: Log = {
                id: new Date().toISOString(),
                date: `${selectedDay.year}/${String(selectedDay.month).padStart(2, '0')}/${String(selectedDay.day).padStart(2, '0')}`,
                kilometer: Number(kilometer),
                services: selectedServices,
                notes: notes,
            };
            updatedLogs = [...logs, newLog];
        }
        saveLogs(updatedLogs);
        resetLogForm();
    };

    const handleDeleteLog = (id: string) => saveLogs(logs.filter(log => log.id !== id));

    const handleStartEdit = (log: Log) => {
        setEditingLog(log);
        if (log.date.includes('/')) {
            const [y, m, d] = log.date.split('/').map(Number);
            setSelectedDay({ year: y, month: m, day: d });
        } else {
            const date = new Date(log.date);
            setSelectedDay({ year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() });
        }
        setKilometer(String(log.kilometer));
        setSelectedServices(log.services);
        setNotes(log.notes || '');
        setShowForm(true);
        window.scrollTo(0, 0);
    };

    const resetLogForm = () => {
        setKilometer('');
        setSelectedServices([]);
        setNotes('');
        setSelectedDay(utils('fa').getToday());
        setShowForm(false);
        setEditingLog(null);
    };

    const toggleService = (service: string) => setSelectedServices(prev => prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]);

    const renderHeader = () => (
        <header className={`bg-gradient-to-l ${isDarkMode ? 'from-gray-800 to-gray-900' : 'from-blue-700 to-indigo-800'} text-white p-5 sticky top-0 z-[9999] shadow-lg select-none`}>
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-xl font-black flex items-center gap-2">
                    <img src={appLogo} alt="Logo" className="w-8 h-8 object-contain drop-shadow-md" />
                    روغن‌یاب خودرو
                </h1>
                <div className="flex gap-2">
                    {view === 'dashboard' && myCar ? (
                        <button onClick={() => setView('browser')} title="بانک اطلاعاتی خودروها" className="bg-white/10 p-2 rounded-xl"><Database size={20} /></button>
                    ) : null}
                    {view === 'browser' && myCar ? (
                        <button onClick={() => setView('dashboard')} title="داشبورد من" className="bg-white/10 p-2 rounded-xl"><Book size={20} /></button>
                    ) : null}
                    <button onClick={() => setIsDarkMode(!isDarkMode)} className="bg-white/10 p-2 rounded-xl"><Moon size={20} /></button>
                </div>
            </div>
        </header>
    );

    const renderFooter = () => (
        <footer className={`p-8 text-center border-t text-[11px] select-none ${isDarkMode ? 'border-gray-800 bg-gray-900 text-gray-500' : 'bg-gray-50 text-gray-400'}`}>
            <p className="font-bold">تمامی حقوق محفوظ است © ۱۴۰۴ | روغن‌یاب</p>
            <p className="mt-2 leading-relaxed">
                طراحی و توسعه توسط{' '}
                <a href="https://koolegard.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline font-bold">توحید شعبانلو</a>
                {' | '}
                <a href="https://rahvan.ir/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline font-bold">گروه رهوان</a>
            </p>
            <p className="mt-1 opacity-60">نسخه ۲.۰.۰ (اندروید)</p>
        </footer>
    );

    const ResultCard: React.FC<{ icon: React.ReactNode, label: string, value: string, color: string, isDark: boolean }> = ({ icon, label, value, color, isDark }) => {
        const colorMap: Record<string, string> = { amber: 'bg-amber-50 text-amber-900', blue: 'bg-blue-50 text-blue-900', emerald: 'bg-emerald-50 text-emerald-900', teal: 'bg-teal-50 text-teal-900' };
        const darkColorMap: Record<string, string> = { amber: 'bg-amber-900/10 text-amber-400', blue: 'bg-blue-900/10 text-blue-400', emerald: 'bg-emerald-900/10 text-emerald-400', teal: 'bg-teal-900/10 text-teal-400' };
        return <div className={`p-4 rounded-2xl flex flex-col gap-2 transition-all ${isDark ? darkColorMap[color] : colorMap[color]}`}><div className="flex items-center gap-2 text-xs font-black opacity-70 uppercase">{icon}{label}</div><div className="text-lg font-black">{value}</div></div>
    }

    const TipsList = ({ tips }: { tips?: string | string[] }) => {
        if (!tips || tips.length === 0) return <p className="opacity-60 text-sm">نکته خاصی برای این مدل ثبت نشده است.</p>;
        const tipsArray = Array.isArray(tips) ? tips : [tips];
        return <ul className="list-disc pr-4 space-y-2 text-sm">{tipsArray.map((tip, index) => <li key={index}>{tip}</li>)}</ul>;
    };

    const renderMyCarInfoModal = () => (
        <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4" onClick={() => setShowMyCarInfo(false)}>
            <div className={`relative animate-in zoom-in-95 w-full max-w-2xl rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setShowMyCarInfo(false)} className="absolute top-2 right-2 p-2 bg-black/20 rounded-full z-10"><X size={18} className="text-white" /></button>
                <div className={`p-5 rounded-t-2xl text-white ${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-l from-blue-600 to-indigo-700'}`}>
                    <h2 className="text-xl font-black">{myCar?.model.name}</h2>
                    <p className="opacity-80 text-xs mt-1">{myCar?.engine.name}</p>
                </div>
                <div className="p-4 grid grid-cols-1 gap-3">
                    <ResultCard isDark={isDarkMode} icon={<Droplets size={16} />} label="گرانروی پیشنهادی" value={myCar!.engine.viscosity} color="amber" />
                    <ResultCard isDark={isDarkMode} icon={<Info size={16} />} label="سطح کیفی API" value={myCar!.engine.apiGrade} color="blue" />
                    <div className="grid grid-cols-2 gap-3">
                        <ResultCard isDark={isDarkMode} icon={<AlertTriangle size={14} />} label="حجم با فیلتر" value={myCar!.engine.capacityWithFilter} color="emerald" />
                        <ResultCard isDark={isDarkMode} icon={<AlertTriangle size={14} />} label="حجم بدون فیلتر" value={myCar!.engine.capacityWithoutFilter} color="teal" />
                    </div>
                </div>
                <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <h3 className="font-black text-lg mb-2">نکات مهم نگهداری</h3>
                    <div className="leading-relaxed"><TipsList tips={myCar!.engine.tips} /></div>
                </div>
            </div>
        </div>
    );

    const renderBrowser = () => (
        <main className="flex-1 p-4 pb-12 overflow-x-hidden">
            {showCustomCar ? (
                <section className="animate-in fade-in">
                    <button onClick={() => setShowCustomCar(false)} className="flex items-center text-blue-500 mb-6 font-bold text-sm"><ChevronLeft size={18} />بازگشت</button>
                    <h3 className="font-bold text-lg mb-2">ثبت خودروی سفارشی</h3>
                    <p className="text-sm opacity-70 mb-4">نام خودروی خود را (مثلا: پراید مدل ۸۸) وارد کنید.</p>
                    <input type="text" value={customCarName} onChange={(e) => setCustomCarName(e.target.value)} placeholder="نام خودرو" className={`w-full p-3 mb-4 rounded-lg font-bold text-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`} />
                    <button onClick={() => handleSetMyCar({ isCustom: true, customName: customCarName })} className="w-full bg-green-600 text-white font-bold py-3 rounded-lg">ذخیره خودروی من</button>
                </section>
            ) : (
                <>
                    {!myCar && !selectedBrand && <p className="text-center p-3 mb-4 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm">برای شروع، لطفاً خودروی اصلی خود را از لیست زیر انتخاب کنید.</p>}

                    {!selectedBrand && (
                        <section>
                            <div className="relative mb-6">
                                <Search className="absolute right-4 top-4 text-gray-400" size={18} />
                                <input type="text" placeholder="جستجوی برند..." className={`w-full pr-12 pl-4 py-4 border-2 rounded-2xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'}`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {filteredBrands.map(brand => (
                                    <button key={brand.id} onClick={() => { setSelectedBrand(brand); setSearchTerm(''); }} className={`flex flex-col items-center justify-center p-4 border-2 rounded-2xl group aspect-square ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                                        <div className="w-12 h-12 mb-3 flex items-center justify-center"><img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain" /></div>
                                        <span className="font-bold text-center text-xs">{brand.name}</span>
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => setShowCustomCar(true)} className="w-full text-center py-4 mt-4 text-blue-600 dark:text-blue-400 font-bold">خودروی من در لیست نیست</button>
                        </section>
                    )}
                    {selectedBrand && !selectedModel && (
                        <section className="animate-in fade-in">
                            <button onClick={() => resetBrowser()} className="flex items-center text-blue-500 mb-6 font-bold text-sm"><ChevronLeft size={18} />بازگشت به برندها</button>
                            <div className="grid grid-cols-1 gap-3">
                                {filteredModels.map(model => (
                                    <button key={model.id} onClick={() => setSelectedModel(model)} className={`w-full flex items-center justify-between p-5 border-2 rounded-2xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                                        <div className="flex items-center gap-4"><Car size={20} className="text-gray-400" /><span className="font-bold text-md">{model.name}</span></div>
                                        <ChevronLeft size={16} className="text-gray-300" />
                                    </button>
                                ))}
                            </div>
                        </section>
                    )}
                    {selectedModel && !selectedEngine && (
                        <section className="animate-in fade-in">
                            <button onClick={() => setSelectedModel(null)} className="flex items-center text-blue-500 mb-6 font-bold text-sm"><ChevronLeft size={18} />بازگشت به مدل‌ها</button>
                            <div className="space-y-4">
                                {selectedModel.engines.map(engine => (
                                    <button key={engine.id} onClick={() => handleSelectEngine(engine)} className={`w-full text-right p-6 border-2 rounded-3xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                                        <div className="font-black text-lg mb-1">{engine.name}</div>
                                        <div className="text-xs opacity-50">انتخاب این موتور</div>
                                    </button>
                                ))}
                            </div>
                        </section>
                    )}
                    {selectedEngine && (
                        <div className="animate-in zoom-in-95">
                            <button onClick={() => setSelectedEngine(null)} className="flex items-center text-blue-500 mb-6 font-bold text-sm"><ChevronLeft size={18} />بازگشت به انتخاب موتور</button>
                            {!myCar && <div className="p-4 mb-4 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200">
                                <h3 className="font-bold">ثبت به عنوان خودروی من</h3>
                                <p className="text-xs mb-3">با انتخاب این گزینه، این خودرو در صفحه اصلی شما نمایش داده می‌شود.</p>
                                <button onClick={() => handleSetMyCar({ isCustom: false, brandId: selectedBrand!.id, modelId: selectedModel!.id, engineId: selectedEngine!.id })} className="w-full bg-green-600 text-white font-bold py-2 rounded-lg">انتخاب {selectedModel?.name}</button>
                            </div>}
                            <div className={`rounded-2xl border-2 overflow-hidden shadow-xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-blue-50'}`}>
                                <div className={`p-5 text-white ${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-l from-blue-600 to-indigo-700'}`}><h2 className="text-xl font-black">{selectedModel?.name}</h2><p className="opacity-80 text-xs mt-1">{selectedEngine.name}</p></div>
                                <div className="p-4 grid grid-cols-1 gap-3">
                                    <ResultCard isDark={isDarkMode} icon={<Droplets size={16} />} label="گرانروی پیشنهادی" value={selectedEngine.viscosity} color="amber" />
                                    <ResultCard isDark={isDarkMode} icon={<Info size={16} />} label="سطح کیفی API" value={selectedEngine.apiGrade} color="blue" />
                                    <div className="grid grid-cols-2 gap-3">
                                        <ResultCard isDark={isDarkMode} icon={<AlertTriangle size={14} />} label="حجم با فیلتر" value={selectedEngine.capacityWithFilter} color="emerald" />
                                        <ResultCard isDark={isDarkMode} icon={<AlertTriangle size={14} />} label="حجم بدون فیلتر" value={selectedEngine.capacityWithoutFilter} color="teal" />
                                    </div>
                                </div>
                            </div>
                            <div className={`mt-4 rounded-2xl p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                                <h3 className="font-black text-lg mb-2">نکات مهم نگهداری</h3>
                                <TipsList tips={selectedEngine.tips} />
                            </div>
                        </div>
                    )}
                </>
            )}
        </main>
    );

    const renderDashboard = () => (
        <main className="p-4">
            {myCar &&
                <div className={`p-4 rounded-xl mb-6 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
                    <p className="text-sm opacity-80">خودروی من</p>
                    <p className="font-black text-lg">{myCar.isCustom ? myCar.customName : `${myCar.brand.name} - ${myCar.model.name}`}</p>
                    <div className="flex justify-center items-center gap-3 mt-2">
                        {!myCar.isCustom && <button onClick={() => setShowMyCarInfo(true)} className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-1"><Info size={12} /> مشخصات فنی</button>}
                        <button onClick={() => { if (confirm('آیا از تغییر خودروی خود مطمئن هستید؟ سوابق سرویس شما باقی خواهد ماند.')) { Preferences.remove({ key: MY_CAR_STORAGE_KEY }); setMyCar(null); setView('browser'); } }} className="text-xs text-red-500">تغییر خودرو</button>
                    </div>
                </div>
            }

            {showForm ? (
                <div className={`p-4 rounded-2xl border mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <h3 className="font-bold text-lg mb-4">{editingLog ? 'ویرایش سرویس' : 'ثبت سرویس جدید'}</h3>
                    <div className="mb-4">
                        <label className="font-bold text-sm block mb-2">تاریخ سرویس</label>
                        <DatePicker
                            value={selectedDay}
                            onChange={setSelectedDay}
                            inputPlaceholder="انتخاب تاریخ"
                            shouldHighlightWeekends
                            locale="fa"
                            inputClassName={`w-full p-3 rounded-lg text-center font-bold relative z-0 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                            calendarClassName={isDarkMode ? "dark-theme centered-calendar" : "centered-calendar"}
                        />
                        <style>{`
                        .responsive-calendar-wrapper {
                            z-index: 9998;
                            position: fixed; /* Use fixed positioning */
                            top: 0; right: 0; bottom: 0; left: 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .DayPicker {
                           position: relative !important; /* Override absolute positioning */
                           left: auto !important; 
                           top: auto !important;
                           transform: none !important;
                        }
                        ${isDarkMode && `.dark-theme { --cl-bg: #2d3748; --cl-color-disabled: #4a5568; --cl-color: #e2e8f0; --cl-hover: #4a5568; --cl-color-head: #a0aec0;}`}
                    `}</style>
                    </div>
                    <div className="mb-4">
                        <label className="font-bold text-sm block mb-2">کیلومتر فعلی خودرو</label>
                        <input type="number" value={kilometer} onChange={e => setKilometer(e.target.value)} placeholder="مثال: ۱۲۵۰۰۰" className={`w-full p-3 rounded-lg text-center font-bold relative z-0 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`} />
                    </div>
                    <div className="mb-4">
                        <label className="font-bold text-sm block mb-2">سرویس‌های انجام شده</label>
                        <div className="grid grid-cols-2 gap-2">
                            {serviceOptions.map(service => <button key={service} onClick={() => toggleService(service)} className={`p-3 rounded-lg text-xs font-bold transition-colors ${selectedServices.includes(service) ? 'bg-blue-600 text-white' : (isDarkMode ? 'bg-gray-700' : 'bg-gray-100')}`}>{service}</button>)}
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="font-bold text-sm block mb-2">یادداشت (اختیاری)</label>
                        <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="مثلاً: استفاده از روغن بهران رانا" className={`w-full p-3 rounded-lg text-sm ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`} rows={2}></textarea>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={handleSaveLog} className="flex-1 py-3 bg-green-600 text-white rounded-lg font-bold">ذخیره</button>
                        <button onClick={resetLogForm} className={`flex-1 py-3 rounded-lg font-bold ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>انصراف</button>
                    </div>
                </div>
            ) : (
                myCar && <button onClick={() => setShowForm(true)} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 mb-6 shadow-lg shadow-blue-500/50">
                    <Plus size={20} /> ثبت سرویس جدید
                </button>
            )}

            {logs.length > 0 ? logs.map(log => (
                <div key={log.id} className={`p-4 rounded-2xl border mb-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold text-lg">{toPersianDigits(log.kilometer.toLocaleString())} کیلومتر</p>
                            <p className="text-xs opacity-70 mb-3">
                                {toPersianDigits(formatDate(log.date))}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleStartEdit(log)} className="text-blue-500 p-2"><Edit size={16} /></button>
                            <button onClick={() => { if (confirm('آیا از حذف این سابقه مطمئن هستید؟')) handleDeleteLog(log.id) }} className="text-red-500 p-2"><Trash2 size={16} /></button>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {log.services.map(s => <span key={s} className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>{s}</span>)}
                    </div>
                    {log.notes && <p className={`text-xs p-2 rounded-lg mt-2 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>{log.notes}</p>}
                </div>
            )) : <p className="text-center opacity-50 mt-10">هیچ سابقه‌ای ثبت نشده است.</p>}
        </main>
    );

    return (
        <div className={`min-h-screen flex flex-col max-w-2xl mx-auto shadow-2xl ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
            {renderHeader()}
            <div className="flex-1 overflow-y-auto">
                {view === 'dashboard' ? renderDashboard() : renderBrowser()}
            </div>
            {showMyCarInfo && myCar && !myCar.isCustom && renderMyCarInfoModal()}
            {renderFooter()}
        </div>
    );
};

export default App;
