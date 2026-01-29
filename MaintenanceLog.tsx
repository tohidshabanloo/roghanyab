
import React, { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';
import DatePicker, { Calendar, utils } from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Plus, Trash2, X, AlertTriangle } from 'lucide-react';
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

const formatDate = (dateStr: string) => {
  if (dateStr.includes('/')) return dateStr;
  try {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    if (year < 1600) {
      return `${year}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
    }
    return date.toLocaleDateString('fa-IR-u-nu-latn');
  } catch (e) {
    return dateStr;
  }
};

export const MaintenanceLog: React.FC<{ onClose: () => void, isDarkMode: boolean }> = ({ onClose, isDarkMode }) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [kilometer, setKilometer] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [selectedDay, setSelectedDay] = useState(utils('fa').getToday());
  const [alertDialog, setAlertDialog] = useState<{ isOpen: boolean; title: string, message: string } | null>(null);

  useEffect(() => {
    const loadLogs = async () => {
      const { value } = await Preferences.get({ key: STORAGE_KEY });
      if (value) {
        const parsedLogs: Log[] = JSON.parse(value);
        // Sort logs by date, newest first
        parsedLogs.sort((a, b) => b.date.localeCompare(a.date));
        setLogs(parsedLogs);
      }
    };
    loadLogs();
  }, []);

  const saveLogs = async (updatedLogs: Log[]) => {
    await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify(updatedLogs) });
    // Sort logs by date before setting state
    updatedLogs.sort((a, b) => b.date.localeCompare(a.date));
    setLogs(updatedLogs);
  };

  const handleAddLog = () => {
    if (!kilometer || selectedServices.length === 0) {
      setAlertDialog({
        isOpen: true,
        title: 'خطا',
        message: 'لطفاً کیلومتر و حداقل یک سرویس را مشخص کنید.'
      });
      return;
    }

    const newLog: Log = {
      id: new Date().toISOString(),
      date: `${selectedDay.year}/${String(selectedDay.month).padStart(2, '0')}/${String(selectedDay.day).padStart(2, '0')}`,
      kilometer: Number(kilometer),
      services: selectedServices,
      notes: notes,
      nextServiceKilometer: Number(kilometer) + 5000
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
          <p className="text-xs opacity-70 mb-3">
            {toPersianDigits(formatDate(log.date))}
          </p>
        </div>
        <button onClick={() => handleDeleteLog(log.id)} className="text-red-500 p-2 active:scale-90 transition-transform">
          <Trash2 size={16} />
        </button>
      </div>

      <div className={`mb-3 p-3 rounded-xl border-2 border-dashed ${isDarkMode ? 'border-blue-900/50 bg-blue-900/10' : 'border-blue-100 bg-blue-50/50'}`}>
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold opacity-70">پیش‌بینی سرویس بعدی:</span>
          <span className="text-sm font-black text-blue-600 dark:text-blue-400">
            {toPersianDigits((log.nextServiceKilometer || (log.kilometer + 5000)).toLocaleString())} کیلومتر
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-2">
        {log.services.map(s => <span key={s} className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>{s}</span>)}
      </div>
      {log.notes && <p className={`text-xs p-2 rounded-lg mt-2 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>{log.notes}</p>}
    </div>
  );

  const renderAlertDialog = () => {
    if (!alertDialog?.isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/60 z-[10000] flex items-center justify-center p-6 backdrop-blur-sm transition-all" onClick={() => setAlertDialog(null)}>
        <div
          className={`w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`p-6 text-center ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-amber-900/20 text-amber-500' : 'bg-amber-50 text-amber-600'}`}>
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-black mb-2">{alertDialog.title}</h3>
            <p className="text-sm opacity-70 leading-relaxed">{alertDialog.message}</p>
          </div>
          <div className="flex border-t border-gray-700/10 dark:border-gray-700">
            <button
              onClick={() => setAlertDialog(null)}
              className="flex-1 py-4 font-bold text-blue-500 active:bg-gray-100 dark:active:bg-gray-700/50 transition-colors"
            >
              متوجه شدم
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black">سوابق سرویس</h2>
        <button onClick={onClose} className={`p-2 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}><X size={20} /></button>
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
            <style>{`
                    .responsive-calendar-wrapper { z-index: 9998; }
                    ${isDarkMode && `.dark-theme { --cl-bg: #2d3748; --cl-color-disabled: #4a5568; --cl-color: #e2e8f0; --cl-hover: #4a5568; --cl-color-head: #a0aec0;}`}
                `}</style>
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
            {kilometer && (
              <div className={`mt-2 p-2 rounded-lg text-xs font-bold text-center ${isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700'}`}>
                زمان پیشنهادی برای تعویض روغن بعدی: {toPersianDigits((Number(kilometer) + 5000).toLocaleString())} کیلومتر
              </div>
            )}
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
          <Plus size={20} />
          ثبت سرویس جدید
        </button>
      )}

      {!showForm && (
        logs.length > 0 ? logs.map(renderLog) : <p className="text-center opacity-50 mt-10">هیچ سابقه‌ای ثبت نشده است.</p>
      )}
      {renderAlertDialog()}
    </div>
  );
};
