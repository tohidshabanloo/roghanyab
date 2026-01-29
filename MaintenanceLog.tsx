
import React, { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';
import DatePicker, { Calendar, utils } from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Plus, Trash2, X } from 'lucide-react';
import { MaintenanceLog as Log } from './types';

const STORAGE_KEY = 'maintenance_logs';

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
  const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(n).replace(/[0-9]/g, w => id[+w]);
};

export const MaintenanceLog: React.FC<{ onClose: () => void, isDarkMode: boolean }> = ({ onClose, isDarkMode }) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [kilometer, setKilometer] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [selectedDay, setSelectedDay] = useState(utils('fa').getToday());

  useEffect(() => {
    const loadLogs = async () => {
      const { value } = await Preferences.get({ key: STORAGE_KEY });
      if (value) {
        const parsedLogs: Log[] = JSON.parse(value);
        // Sort logs by date, newest first
        parsedLogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setLogs(parsedLogs);
      }
    };
    loadLogs();
  }, []);

  const saveLogs = async (updatedLogs: Log[]) => {
    await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify(updatedLogs) });
    // Sort logs by date before setting state
    updatedLogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setLogs(updatedLogs);
  };

  const handleAddLog = () => {
    if (!kilometer || selectedServices.length === 0) {
      alert('لطفاً کیلومتر و حداقل یک سرویس را مشخص کنید.');
      return;
    }

    const newLog: Log = {
      id: new Date().toISOString(),
      date: new Date(`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`).toISOString(),
      kilometer: Number(kilometer),
      services: selectedServices,
      notes: notes,
    };

    const updatedLogs = [...logs, newLog];
    saveLogs(updatedLogs);
    resetForm();
  };

  const handleDeleteLog = (id: string) => {
    const updatedLogs = logs.filter(log => log.id !== id);
    saveLogs(updatedLogs);
  };

  const resetForm = () => {
    setKilometer('');
    setSelectedServices([]);
    setNotes('');
    setSelectedDay(utils('fa').getToday());
    setShowForm(false);
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const renderLog = (log: Log) => (
    <div key={log.id} className={`p-4 rounded-2xl border mb-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="font-bold text-lg">{toPersianDigits(log.kilometer.toLocaleString())} کیلومتر</p>
          <p className="text-xs opacity-70 mb-3">{toPersianDigits(new Date(log.date).toLocaleDateString('fa-IR-u-nu-latn'))}</p>
        </div>
        <button onClick={() => handleDeleteLog(log.id)} className="text-red-500 p-2 active:scale-90 transition-transform">
          <Trash2 size={16} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {log.services.map(s => <span key={s} className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>{s}</span>)}
      </div>
      {log.notes && <p className={`text-xs p-2 rounded-lg mt-2 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>{log.notes}</p>}
    </div>
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black">سوابق سرویس</h2>
        <button onClick={onClose} className={`p-2 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}><X size={20}/></button>
      </div>

      {showForm ? (
        <div className={`p-4 rounded-2xl border mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="mb-4">
                <label className="font-bold text-sm block mb-2">تاریخ سرویس</label>
                <DatePicker
                    value={selectedDay}
                    onChange={setSelectedDay}
                    inputPlaceholder="انتخاب تاریخ"
                    shouldHighlightWeekends
                    locale="fa"
                    inputClassName={`w-full p-3 rounded-lg text-center font-bold ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                    calendarClassName={isDarkMode ? 'responsive-calendar dark-theme' : 'responsive-calendar'}
                />
                <style>{isDarkMode && `.dark-theme { --cl-bg: #2d3748; --cl-color-disabled: #4a5568; --cl-color: #e2e8f0; --cl-hover: #4a5568; --cl-color-head: #a0aec0;}`}</style>
            </div>

          <div className="mb-4">
            <label className="font-bold text-sm block mb-2">کیلومتر فعلی خودرو</label>
            <input 
              type="number"
              value={kilometer}
              onChange={e => setKilometer(e.target.value)}
              placeholder="مثال: ۱۲۵۰۰۰"
              className={`w-full p-3 rounded-lg text-center font-bold ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            />
          </div>

          <div className="mb-4">
            <label className="font-bold text-sm block mb-2">سرویس‌های انجام شده</label>
            <div className="grid grid-cols-2 gap-2">
              {serviceOptions.map(service => (
                <button 
                  key={service}
                  onClick={() => toggleService(service)}
                  className={`p-3 rounded-lg text-xs font-bold transition-colors ${selectedServices.includes(service) ? 'bg-blue-600 text-white' : (isDarkMode ? 'bg-gray-700' : 'bg-gray-100')}`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="font-bold text-sm block mb-2">یادداشت (اختیاری)</label>
            <textarea 
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="مثلاً: استفاده از روغن بهران رانا"
              className={`w-full p-3 rounded-lg text-sm ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              rows={2}
            ></textarea>
          </div>

          <div className="flex gap-3">
            <button onClick={handleAddLog} className="flex-1 py-3 bg-green-600 text-white rounded-lg font-bold">ذخیره</button>
            <button onClick={resetForm} className={`flex-1 py-3 rounded-lg font-bold ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>انصراف</button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setShowForm(true)}
          className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 mb-6 active:scale-95 transition-transform shadow-lg shadow-blue-500/50"
        >
          <Plus size={20}/>
          ثبت سرویس جدید
        </button>
      )}

      {logs.length > 0 ? logs.map(renderLog) : <p className="text-center opacity-50 mt-10">هیچ سابقه‌ای ثبت نشده است.</p>}
    </div>
  );
};
