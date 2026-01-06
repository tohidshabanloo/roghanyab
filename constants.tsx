
import { Brand } from './types';

export const BRANDS: Brand[] = [
  {
    id: 'ikco',
    name: 'ایران خودرو (IKCO)',
    logo: 'https://cdn.icon-icons.com/icons2/2402/PNG/512/iran_khodro_logo_icon_145812.png',
    models: [
      {
        id: 'tara',
        name: 'تارا (Tara)',
        engines: [
          { 
            id: 'tu5p', 
            name: 'TU5P', 
            viscosity: '5W-30', 
            capacityWithFilter: '3.75 لیتر', 
            capacityWithoutFilter: '3.2 لیتر', 
            apiGrade: 'SN',
            tips: [
              "روغن 5W-30 فقط اگر از اصالت روغن مطمئن هستید؛ در ترافیک سنگین/گرمای بالا 5W-40 می‌تواند گزینه ایمن‌تری باشد.",
              "تعویض روغن در کاربری شهری سنگین: 5,000–7,000 کیلومتر (بسته به کیفیت روغن و سبک رانندگی).",
              "فیلتر هوا در شهرهای گردوخاکی زودتر از موعد چک/تعویض شود (مصرف سوخت و ناک را تحت تاثیر می‌گذارد)."
            ]
          }
        ]
      },
      {
        id: '206-tu5',
        name: 'پژو ۲۰۶ (تیپ ۵ / TU5)',
        engines: [
          { 
            id: 'tu5', 
            name: 'TU5', 
            viscosity: '5W-40 / 10W-40', 
            capacityWithFilter: '3.75 لیتر', 
            capacityWithoutFilter: '3.25 لیتر', 
            apiGrade: 'SN',
            tips: [
              "در کاربری شهری سنگین: تعویض روغن 5,000–7,000 کیلومتر؛ در کاربری عادی 7,000–10,000 (با روغن باکیفیت).",
              "شمع و کویل روی نرمی موتور/مصرف اثر مستقیم دارند؛ اگر ناک/ریپ حس شد، اول کیفیت بنزین و سیستم جرقه را بررسی کنید.",
              "دریچه گاز و سنسور اکسیژن در ترافیک و سوخت متغیر ایران بیشتر نیاز به سرویس دوره‌ای دارند."
            ]
          }
        ]
      },
      {
        id: '207',
        name: 'پژو ۲۰۷ (207i)',
        engines: [
          { 
            id: 'tu5', 
            name: 'TU5', 
            viscosity: '5W-40 / 10W-40', 
            capacityWithFilter: '3.75 لیتر', 
            capacityWithoutFilter: '3.25 لیتر', 
            apiGrade: 'SN',
            tips: [
              "در برخی تیپ‌ها حساسیت به کویل و کیفیت بنزین بیشتر دیده می‌شود؛ از شتاب‌گیری سنگین در دور پایین پرهیز کنید.",
              "روغن 10W-40 برای مناطق گرمسیر و کارکرد بالا اقتصادی‌تر است."
            ]
          },
          { 
            id: 'tu5p', 
            name: 'TU5P (MC/اتومات)', 
            viscosity: '5W-30', 
            capacityWithFilter: '3.75 لیتر', 
            capacityWithoutFilter: '3.2 لیتر', 
            apiGrade: 'SN',
            tips: [
              "برای موتور TU5P حتما از روغن 5W-30 با کیفیت بالا (SN) استفاده کنید."
            ]
          }
        ]
      },
      {
        id: 'runna',
        name: 'رانا / رانا پلاس',
        engines: [
          { 
            id: 'tu5', 
            name: 'TU5', 
            viscosity: '5W-40 / 10W-40', 
            capacityWithFilter: '3.75 لیتر', 
            capacityWithoutFilter: '3.25 لیتر', 
            apiGrade: 'SN',
            tips: [
              "در کاربری شهری سنگین: تعویض روغن 5,000–7,000 کیلومتر.",
              "دریچه گاز و سنسور اکسیژن در ترافیک و سوخت متغیر ایران بیشتر نیاز به سرویس دوره‌ای دارند."
            ]
          }
        ]
      },
      {
        id: 'dena',
        name: 'دنا / دنا پلاس / سورن',
        engines: [
          { 
            id: 'ef7', 
            name: 'EF7 (1.7L)', 
            viscosity: '5W-40 / 10W-40', 
            capacityWithFilter: '5.5 لیتر', 
            capacityWithoutFilter: '5 لیتر', 
            apiGrade: 'SN',
            tips: [
              "موتور EF7 به کیفیت روغن حساس است؛ تعویض دیرهنگام می‌تواند به سوپاپ/زنجیر/سایش کمک کند.",
              "در ترافیک سنگین/گرما بازه تعویض روغن را به 5,000–7,000 کاهش دهید.",
              "سطح آب و سلامت فن/ترموستات را منظم چک کنید؛ دمای بالا در این موتور پرریسک است."
            ]
          },
          { 
            id: 'ef7-turbo', 
            name: 'EF7 Turbo (TC7)', 
            viscosity: '10W-40 / 5W-40', 
            capacityWithFilter: '5.5 لیتر', 
            capacityWithoutFilter: '5 لیتر', 
            apiGrade: 'SN',
            tips: [
              "برای نسخه توربو، استفاده از روغن با کیفیت بالا (SN/SP) و تعویض به موقع حیاتی است."
            ]
          }
        ]
      },
      {
        id: 'pars-xu7',
        name: 'پژو پارس / ۴۰۵ / سمند (XU7)',
        engines: [
          { 
            id: 'xu7', 
            name: 'XU7 / XU7P', 
            viscosity: '10W-40 / 20W-50', 
            capacityWithFilter: '4.5 لیتر', 
            capacityWithoutFilter: '4 لیتر', 
            apiGrade: 'SL / SN',
            tips: [
              "برای موتورهای کارکرده/روغن‌سوز، گریدهای غلیظ‌تر (20W-50) می‌تواند مصرف روغن را کم کند.",
              "سیستم خنک‌کاری (رادیاتور/فن/ترموستات) را جدی بگیرید؛ بالا رفتن دما در این خانواده موتور شایع است.",
              "در رانندگی کوتاه‌مسیر و ترافیک، زمان تعویض روغن را کوتاه‌تر کنید."
            ]
          }
        ]
      },
      {
        id: 'arisan-2',
        name: 'آریسان ۲',
        engines: [
          { 
            id: 'xu7p-cng', 
            name: 'XU7P (CNG)', 
            viscosity: '10W-40 / 5W-40', 
            capacityWithFilter: '4.5 لیتر', 
            capacityWithoutFilter: '4 لیتر', 
            apiGrade: 'SN',
            tips: [
              "به‌علت کاربری باری، بازه تعویض روغن/فیلتر را کوتاه‌تر بگیرید (خصوصاً در گردوخاک).",
              "بازدید دوره‌ای پلوس/گردگیر/کمک‌ها و لاستیک‌ها اهمیت بیشتری دارد."
            ]
          }
        ]
      },
      {
        id: 'haima-s5-s7',
        name: 'هایما S5 / S7 / 8S',
        engines: [
          { 
            id: 'haima-turbo', 
            name: 'Turbo (1.5T / 1.8T)', 
            viscosity: '5W-40 / 5W-30', 
            capacityWithFilter: '4.5 - 5 لیتر', 
            capacityWithoutFilter: '4.2 لیتر', 
            apiGrade: 'SN / SP',
            tips: [
              "برای توربو: پس از رانندگی پرفشار، قبل از خاموش کردن 30–60 ثانیه درجا کار کند (حفاظت از توربو).",
              "بنزین بی‌کیفیت می‌تواند باعث ناک/کاهش شتاب شود؛ شمع و سنسور اکسیژن را دوره‌ای چک کنید.",
              "فیلتر هوا در مناطق گردوخاکی زودتر تعویض شود."
            ]
          }
        ]
      },
      {
        id: 'rira',
        name: 'ری‌را (Rira)',
        engines: [
          { 
            id: 'ef7-tc-plus', 
            name: 'EFP Turbo', 
            viscosity: '5W-30 / 5W-40', 
            capacityWithFilter: '5 لیتر', 
            capacityWithoutFilter: '4.5 لیتر', 
            apiGrade: 'SN / SP',
            tips: [
              "به‌علت توربو/فناوری جدیدتر، فقط روغن با استاندارد معتبر و اصل استفاده شود.",
              "در ترافیک سنگین، بازه تعویض روغن کوتاه‌تر شود.",
              "سرویس دوره‌ای سیستم خنک‌کاری و بازدید نشتی‌ها جدی گرفته شود."
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'saipa',
    name: 'سایپا (SAIPA)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Saipa_logo.svg/1200px-Saipa_logo.svg.png',
    models: [
      {
        id: 'quick-saina-tiba',
        name: 'کوییک / ساینا / تیبا (خانواده X200)',
        engines: [
          { 
            id: 'm15', 
            name: 'M15 (1.5L)', 
            viscosity: '10W-40 / 5W-40', 
            capacityWithFilter: '3.4 لیتر', 
            capacityWithoutFilter: '3 لیتر', 
            apiGrade: 'SN',
            tips: [
              "روغن 10W-40 معمولاً انتخاب رایج بازار است؛ در زمستان سردسیر 5W-30/5W-40 (طبق دفترچه) می‌تواند استارت سرد بهتری بدهد.",
              "فیلتر هوا و شمع‌ها را منظم بررسی کنید؛ بنزین و گردوخاک روی شتاب و مصرف اثر زیادی دارد.",
              "در گیربکس‌های CVT، سرویس روغن گیربکس را دقیق و به‌موقع انجام دهید."
            ]
          }
        ]
      },
      {
        id: 'shahin',
        name: 'شاهین (G / CVT / Plus)',
        engines: [
          { 
            id: 'm15t', 
            name: 'M15 Turbo', 
            viscosity: '10W-40', 
            capacityWithFilter: '3.8 لیتر', 
            capacityWithoutFilter: '3.4 لیتر', 
            apiGrade: 'SN',
            tips: [
              "برای شاهین توربو، تعویض روغن به موقع بسیار حیاتی است.",
              "از روغن با درجه کیفی SN استفاده کنید."
            ]
          },
          { 
            id: 'me16', 
            name: 'ME16 (Shahin Plus)', 
            viscosity: '5W-30 / 5W-40', 
            capacityWithFilter: '3.9 لیتر', 
            capacityWithoutFilter: '3.5 لیتر', 
            apiGrade: 'SN / SP',
            tips: [
              "موتور ۱۶ سوپاپ جدید (مشابه TU5P)؛ حساسیت بالاتر به روغن."
            ]
          }
        ]
      },
      {
        id: 'atlas',
        name: 'اطلس (Atlas)',
        engines: [
          { 
            id: 'm15i', 
            name: 'M15i (بهینه)', 
            viscosity: '10W-40', 
            capacityWithFilter: '3.4 لیتر', 
            capacityWithoutFilter: '3 لیتر', 
            apiGrade: 'SN',
            tips: [
              "مشابه کوییک/ساینا، اما نسخه بهینه‌سازی شده موتور."
            ]
          }
        ]
      },
      {
        id: '151-pickup',
        name: 'وانت پراید ۱۵۱',
        engines: [
          { 
            id: 'm13', 
            name: 'M13', 
            viscosity: '10W-40 / 20W-50', 
            capacityWithFilter: '3.4 لیتر', 
            capacityWithoutFilter: '3 لیتر', 
            apiGrade: 'SL / SN',
            tips: [
              "به‌علت کاربری باری، بازه تعویض روغن را کوتاه‌تر بگیرید.",
              "بازدید منظم سیستم ترمز، کمک‌ها و لاستیک‌ها (به‌ویژه در بارگیری) ضروری است."
            ]
          }
        ]
      },
      {
        id: 'zamyad',
        name: 'نیسان زامیاد / پادرا / کارون',
        engines: [
          { 
            id: 'z24', 
            name: 'Z24 / M24', 
            viscosity: '10W-40 / 15W-40', 
            capacityWithFilter: '4.5 - 5 لیتر', 
            capacityWithoutFilter: '4.2 لیتر', 
            apiGrade: 'SL / SN',
            tips: [
              "به‌علت کاربری سنگین باری، روغن و فیلتر باکیفیت استفاده کنید و بازه تعویض را کاهش دهید.",
              "اگر دوگانه‌سوز است: سرویس دوره‌ای سیستم گاز و نشتی‌یابی را جدی بگیرید."
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'pars-khodro',
    name: 'پارس خودرو',
    logo: 'https://upload.wikimedia.org/wikipedia/fa/thumb/b/b3/Parskhodrologo.png/250px-Parskhodrologo.png',
    models: [
      {
        id: 'sahand',
        name: 'سهند (Sahand)',
        engines: [
          { 
            id: 'm15i', 
            name: 'M15i', 
            viscosity: '10W-40 / 5W-40', 
            capacityWithFilter: '3.4 لیتر', 
            capacityWithoutFilter: '3 لیتر', 
            apiGrade: 'SN',
            tips: [
              "طبق دفترچه همان مدل/سال، گرید روغن و بازه تعویض تنظیم شود.",
              "در شهرهای گردوخاکی: فیلتر هوا و فیلتر کابین زودتر تعویض شوند."
            ]
          }
        ]
      },
      {
        id: 'p90',
        name: 'کادیلا (P90)',
        engines: [
          { 
            id: 'me16', 
            name: 'ME16', 
            viscosity: '5W-30 / 5W-40', 
            capacityWithFilter: '3.9 لیتر', 
            capacityWithoutFilter: '3.5 لیتر', 
            apiGrade: 'SN',
            tips: [
              "پلتفرم ال ۹۰ با موتور جدید؛ روغن مطابق با موتور ME16 (مشابه شاهین پلاس) استفاده شود."
            ]
          }
        ]
      },
      {
        id: 'l90-sandero',
        name: 'ال ۹۰ / ساندرو',
        engines: [
          { 
            id: 'k4m', 
            name: 'K4M', 
            viscosity: '10W-40', 
            capacityWithFilter: '4.8 لیتر', 
            capacityWithoutFilter: '4.5 لیتر', 
            apiGrade: 'SL / SM / SN',
            tips: [
              "موتور K4M بسیار با دوام است اما به سطح روغن و تسمه تایم حساس است."
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'kerman',
    name: 'کرمان موتور (KMC / JAC)',
    logo: 'https://kermanmotor.com/App_Themes/KermanMotor/images/logo.png',
    models: [
      {
        id: 'j4',
        name: 'جک J4',
        engines: [
          { 
            id: '1.5-na', 
            name: '1.5L NA', 
            viscosity: '10W-40 / 5W-30', 
            capacityWithFilter: '4 لیتر', 
            capacityWithoutFilter: '3.6 لیتر', 
            apiGrade: 'SM / SN',
            tips: [
               "برای کارکرد روان‌تر و مصرف کمتر، 5W-30 پیشنهاد می‌شود."
            ]
          }
        ]
      },
      {
        id: 'kmc-series',
        name: 'KMC J7 / X5 / K7',
        engines: [
          { 
            id: '1.5-tgdi', 
            name: '1.5 TGDI', 
            viscosity: '5W-30 / 5W-40', 
            capacityWithFilter: '4.5 - 5 لیتر', 
            capacityWithoutFilter: '4.2 لیتر', 
            apiGrade: 'SN / SP',
            tips: [
              "برای نسخه‌های توربو GDI: روغن با استاندارد SP (ضد ناک) بسیار حیاتی است.",
              "تعویض زودتر روغن در ترافیک سنگین توصیه می‌شود."
            ]
          }
        ]
      },
      {
        id: 't8-t9',
        name: 'پیکاپ T8 / T9',
        engines: [
          { 
            id: '2.0-turbo', 
            name: '2.0L Turbo', 
            viscosity: '5W-40', 
            capacityWithFilter: '5 - 5.5 لیتر', 
            capacityWithoutFilter: '4.8 لیتر', 
            apiGrade: 'SN / SP',
            tips: [
              "برای پیکاپ‌ها: بازدید دوره‌ای دیفرانسیل/چهارچرخ/سیستم تعلیق به‌علت کاربری سخت‌تر."
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bahman',
    name: 'بهمن موتور (Fidelity / Dignity)',
    logo: 'https://upload.wikimedia.org/wikipedia/fa/thumb/b/be/Bahman_Group_Logo.png/220px-Bahman_Group_Logo.png',
    models: [
      {
        id: 'fidelity',
        name: 'فیدلیتی (Prime / Prestige)',
        engines: [
          { 
            id: '1.5t', 
            name: '1.5L / 1.6L Turbo', 
            viscosity: '5W-30 / 5W-40', 
            capacityWithFilter: '4.5 - 5 لیتر', 
            capacityWithoutFilter: '4.2 لیتر', 
            apiGrade: 'SN / SP',
            tips: [
              "در موتورهای توربو، کیفیت روغن و فیلتر حیاتی است؛ تعویض دیرهنگام ریسک خرابی توربو را بالا می‌برد.",
              "در گیربکس‌های اتومات/دوکلاچه: سرویس روغن گیربکس طبق دفترچه انجام شود."
            ]
          }
        ]
      },
      {
        id: 'dignity',
        name: 'دیگنیتی (Prime / Prestige)',
        engines: [
          { 
            id: '1.5t-2.0t', 
            name: '1.5L / 2.0L Turbo', 
            viscosity: '5W-30 / 5W-40', 
            capacityWithFilter: '4.5 - 5 لیتر', 
            capacityWithoutFilter: '4.2 لیتر', 
            apiGrade: 'SN / SP',
            tips: [
              "بنزین و گردوخاک ایران: فیلتر هوا/سنسور اکسیژن/شمع‌ها را در بازه کوتاه‌تر چک کنید."
            ]
          }
        ]
      },
      {
        id: 'respect',
        name: 'ریسپکت (Respect)',
        engines: [
          { 
            id: '1.5t', 
            name: '1.5L Turbo', 
            viscosity: '5W-30 / 5W-40', 
            capacityWithFilter: '4.5 لیتر', 
            capacityWithoutFilter: '4 لیتر', 
            apiGrade: 'SN / SP',
            tips: [
              "توربو: روغن اصل و تعویض زودتر در ترافیک و گرما."
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'modiran',
    name: 'مدیران خودرو (MVM / Fownix)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Chery_Logo.png',
    models: [
      {
        id: 'x22-x33-cross',
        name: 'MVM X22 Pro / X33 Cross',
        engines: [
          { 
            id: '1.0t', 
            name: '1.0L Turbo (3 Cyl)', 
            viscosity: '5W-30', 
            capacityWithFilter: '3.5 - 3.8 لیتر', 
            capacityWithoutFilter: '3.2 لیتر', 
            apiGrade: 'SN / SP',
            tips: [
              "برای توربوهای چری: روغن کم‌کیفیت یا تعویض دیرهنگام می‌تواند مصرف روغن/افت توان ایجاد کند.",
              "در ترافیک سنگین، بازه تعویض روغن کوتاه‌تر شود."
            ]
          }
        ]
      },
      {
        id: 'fownix-fx-tiggo',
        name: 'Fownix FX / Tiggo 7/8 Pro',
        engines: [
          { 
            id: '1.6-tgdi', 
            name: '1.6 TGDI / 1.5 T', 
            viscosity: '5W-30 / 0W-20', 
            capacityWithFilter: '4.5 - 5 لیتر', 
            capacityWithoutFilter: '4.2 لیتر', 
            apiGrade: 'SN / SP',
            tips: [
              "موتورهای TGDI چری بسیار حساس به کیفیت روغن هستند (حتما SP).",
              "سرویس سیستم خنک‌کاری و تمیز بودن رادیاتور/کندانسور کولر در گرمای ایران مهم است."
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'farda',
    name: 'فردا موتورز (FMC)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png',
    models: [
      {
        id: 'fmc-t5-sx5',
        name: 'FMC T5 / SX5 / Suba M4',
        engines: [
          { 
            id: '1.5t-1.6', 
            name: '1.5L Turbo / 1.6L NA', 
            viscosity: '5W-40 / 5W-30', 
            capacityWithFilter: '4 - 4.5 لیتر', 
            capacityWithoutFilter: '3.8 لیتر', 
            apiGrade: 'SN / SP',
            tips: [
              "در مدل‌های توربو: بعد از رانندگی پرفشار، کمی زمان برای خنک‌کاری توربو در نظر بگیرید.",
              "سرویس روغن گیربکس اتوماتیک طبق دفترچه همان مدل؛ استفاده از روغن اشتباه می‌تواند آسیب جدی بزند."
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'lamari',
    name: 'لاماری (Arian Pars)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png',
    models: [
      {
        id: 'ema',
        name: 'لاماری ایما (Ema)',
        engines: [
          { 
            id: '1.5-tgdi', 
            name: '1.5 TGDI', 
            viscosity: '5W-30 / 5W-40', 
            capacityWithFilter: '4.5 لیتر', 
            capacityWithoutFilter: '4.2 لیتر', 
            apiGrade: 'SN / SP',
            tips: [
              "توربو: روغن اصل و تعویض زودتر در ترافیک و گرما.",
              "بنزین متغیر ایران: شمع‌ها و سیستم جرقه را زودتر چک کنید.",
              "فیلتر هوای تمیز برای جلوگیری از افت توان و مصرف سوخت مهم است."
            ]
          }
        ]
      }
    ]
  }
];
