
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
          { id: 'tu5p', name: 'TU5P', viscosity: '5W-30', capacityWithFilter: '3.75 لیتر', capacityWithoutFilter: '3.2 لیتر', apiGrade: 'SN' }
        ]
      },
      {
        id: 'dena',
        name: 'دنا / دنا پلاس',
        engines: [
          { id: 'ef7', name: 'EF7 (1.7L)', viscosity: '10W-40', capacityWithFilter: '5.5 لیتر', capacityWithoutFilter: '5 لیتر', apiGrade: 'SN / SM' },
          { id: 'ef7-turbo', name: 'EF7 Turbo (TC7)', viscosity: '10W-40', capacityWithFilter: '5.5 لیتر', capacityWithoutFilter: '5 لیتر', apiGrade: 'SN' }
        ]
      },
      {
        id: '207',
        name: 'پژو ۲۰۷',
        engines: [
          { id: 'tu5', name: 'TU5', viscosity: '10W-40', capacityWithFilter: '3.75 لیتر', capacityWithoutFilter: '3.2 لیتر', apiGrade: 'SL / SM' },
          { id: 'tu5p', name: 'TU5P (MC)', viscosity: '5W-30', capacityWithFilter: '3.75 لیتر', capacityWithoutFilter: '3.2 لیتر', apiGrade: 'SN' }
        ]
      },
      {
        id: '206',
        name: 'پژو ۲۰۶',
        engines: [
          { id: 'tu3', name: 'TU3 (تیپ ۲)', viscosity: '10W-40', capacityWithFilter: '3.25 لیتر', capacityWithoutFilter: '3 لیتر', apiGrade: 'SL / SM' },
          { id: 'tu5', name: 'TU5 (تیپ ۵)', viscosity: '10W-40', capacityWithFilter: '3.75 لیتر', capacityWithoutFilter: '3.2 لیتر', apiGrade: 'SL / SM' }
        ]
      },
      {
        id: 'pars',
        name: 'پژو پارس',
        engines: [
          { id: 'xu7p', name: 'XU7P (جدید)', viscosity: '0W-20 / 5W-30', capacityWithFilter: '4.5 لیتر', capacityWithoutFilter: '4 لیتر', apiGrade: 'SL / SM' },
          { id: 'xu7', name: 'XU7 (قدیمی)', viscosity: '20W-50', capacityWithFilter: '4.5 لیتر', capacityWithoutFilter: '4 لیتر', apiGrade: 'SJ / SL' },
          { id: 'tu5', name: 'TU5 (LX)', viscosity: '10W-40', capacityWithFilter: '3.75 لیتر', capacityWithoutFilter: '3.2 لیتر', apiGrade: 'SL / SM' }
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
        id: 'shahin',
        name: 'شاهین (Shahin)',
        engines: [
          { id: 'm15t', name: 'M15 Turbo', viscosity: '10W-40', capacityWithFilter: '3.8 لیتر', capacityWithoutFilter: '3.4 لیتر', apiGrade: 'SN' }
        ]
      },
      {
        id: 'quick',
        name: 'کوییک / ساینا / تیبا',
        engines: [
          { id: 'm15', name: 'M15 (۱.۵ لیتری)', viscosity: '10W-40', capacityWithFilter: '3.4 لیتر', capacityWithoutFilter: '3 لیتر', apiGrade: 'SJ / SL' }
        ]
      },
      {
        id: 'pride',
        name: 'پراید (Prid)',
        engines: [
          { id: 'm13-euro4', name: 'موتور HP+ (یورو ۴)', viscosity: '10W-40', capacityWithFilter: '3.4 لیتر', capacityWithoutFilter: '3 لیتر', apiGrade: 'SJ / SL' },
          { id: 'old-pride', name: 'پراید قدیمی (صبا/نسیم)', viscosity: '20W-50', capacityWithFilter: '3.4 لیتر', capacityWithoutFilter: '3 لیتر', apiGrade: 'SG / SJ' }
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
        id: 'l90',
        name: 'ال ۹۰ (L90 / Tondar)',
        engines: [
          { id: 'k4m', name: 'K4M (۱.۶ لیتری)', viscosity: '10W-40', capacityWithFilter: '4.8 لیتر', capacityWithoutFilter: '4.5 لیتر', apiGrade: 'SL / SM / SN' }
        ]
      },
      {
        id: 'sandero',
        name: 'ساندرو / استپ‌وی',
        engines: [
          { id: 'k4m', name: 'K4M', viscosity: '10W-40', capacityWithFilter: '4.8 لیتر', capacityWithoutFilter: '4.5 لیتر', apiGrade: 'SL / SM / SN' }
        ]
      },
      {
        id: 'brilliance',
        name: 'برلیانس (Brilliance)',
        engines: [
          { id: 'h330-1.5', name: 'موتور ۱.۵ لیتری', viscosity: '10W-40', capacityWithFilter: '4.2 لیتر', capacityWithoutFilter: '3.9 لیتر', apiGrade: 'SM / SN' },
          { id: 'h330-1.6', name: 'موتور ۱.۶ لیتری', viscosity: '5W-30 / 10W-40', capacityWithFilter: '4.2 لیتر', capacityWithoutFilter: '3.9 لیتر', apiGrade: 'SN' }
        ]
      }
    ]
  },
  {
    id: 'hyundai',
    name: 'هیوندای (Hyundai)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/2560px-Hyundai_Motor_Company_logo.svg.png',
    models: [
      {
        id: 'santafe',
        name: 'سانتافه (Santa Fe IX45)',
        engines: [
          { id: '2.4gdi', name: '2.4 GDI (۲۰۱۴-۲۰۱۸)', viscosity: '5W-30 / 5W-40', capacityWithFilter: '4.8 لیتر', capacityWithoutFilter: '4.5 لیتر', apiGrade: 'SN' }
        ]
      },
      {
        id: 'sonata',
        name: 'سوناتا (Sonata LF/YF)',
        engines: [
          { id: '2.4l', name: '2.4 MPI/GDI', viscosity: '5W-20 / 5W-30', capacityWithFilter: '4.8 لیتر', capacityWithoutFilter: '4.5 لیتر', apiGrade: 'SM / SN' }
        ]
      },
      {
        id: 'elantra',
        name: 'الانترا (Elantra)',
        engines: [
          { id: '1.8l', name: '1.8L (۲۰۱۲-۲۰۱۶)', viscosity: '5W-20 / 5W-30', capacityWithFilter: '4 لیتر', capacityWithoutFilter: '3.7 لیتر', apiGrade: 'SM / SN' },
          { id: '2.0l', name: '2.0L (۲۰۱۷-۲۰۱۸)', viscosity: '5W-30', capacityWithFilter: '4 لیتر', capacityWithoutFilter: '3.7 لیتر', apiGrade: 'SN' }
        ]
      }
    ]
  },
  {
    id: 'kia',
    name: 'کیا (KIA)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Kia_logo.svg/1280px-Kia_logo.svg.png',
    models: [
      {
        id: 'sportage',
        name: 'اسپورتیج (Sportage)',
        engines: [
          { id: '2.4l', name: '2.4 MPI (QL/SL)', viscosity: '5W-30 / 5W-40', capacityWithFilter: '4.8 لیتر', capacityWithoutFilter: '4.5 لیتر', apiGrade: 'SM / SN' }
        ]
      },
      {
        id: 'cerato',
        name: 'سراتو (Cerato YD/TD)',
        engines: [
          { id: '2.0l', name: '2.0L (مونتاژ و وارداتی)', viscosity: '5W-30', capacityWithFilter: '4 لیتر', capacityWithoutFilter: '3.7 لیتر', apiGrade: 'SM / SN' }
        ]
      }
    ]
  },
  {
    id: 'toyota',
    name: 'تویوتا (Toyota)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/1200px-Toyota_carlogo.svg.png',
    models: [
      {
        id: 'corolla',
        name: 'کرولا (Corolla)',
        engines: [
          { id: '1.8l', name: '1.8L (۲۰۰۸-۲۰۱۷)', viscosity: '5W-30 / 0W-20', capacityWithFilter: '4.2 لیتر', capacityWithoutFilter: '3.9 لیتر', apiGrade: 'SM / SN' }
        ]
      },
      {
        id: 'camry',
        name: 'کمری (Camry)',
        engines: [
          { id: '2.4l', name: '2.4L (GLX)', viscosity: '5W-30 / 10W-40', capacityWithFilter: '4.3 لیتر', capacityWithoutFilter: '4 لیتر', apiGrade: 'SL / SM' }
        ]
      }
    ]
  },
  {
    id: 'mvm',
    name: 'مدیران خودرو (MVM/Chery)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Chery_Logo.png',
    models: [
      {
        id: 'x22',
        name: 'MVM X22 / Pro',
        engines: [
          { id: '1.5l', name: '1.5L Atmo', viscosity: '10W-40', capacityWithFilter: '4.2 لیتر', capacityWithoutFilter: '3.8 لیتر', apiGrade: 'SM' },
          { id: '1.0t', name: '1.0L Turbo', viscosity: '5W-30', capacityWithFilter: '3.5 لیتر', capacityWithoutFilter: '3 لیتر', apiGrade: 'SN' }
        ]
      },
      {
        id: 'tiggo7',
        name: 'تیگو ۷ (Tiggo 7)',
        engines: [
          { id: '1.5t', name: '1.5L Turbo', viscosity: '5W-40 / 5W-30', capacityWithFilter: '4.5 لیتر', capacityWithoutFilter: '4.2 لیتر', apiGrade: 'SN' }
        ]
      }
    ]
  },
  {
    id: 'bahman',
    name: 'گروه بهمن (Fidelity/Dignity)',
    logo: 'https://upload.wikimedia.org/wikipedia/fa/thumb/b/be/Bahman_Group_Logo.png/220px-Bahman_Group_Logo.png',
    models: [
      {
        id: 'fidelity',
        name: 'فیدلیتی (Fidelity Prime)',
        engines: [
          { id: '1.5t', name: '1.5L Turbo', viscosity: '5W-30', capacityWithFilter: '4.7 لیتر', capacityWithoutFilter: '4.3 لیتر', apiGrade: 'SN' }
        ]
      },
      {
        id: 'dignity',
        name: 'دیگنیتی (Dignity Prime)',
        engines: [
          { id: '1.5t', name: '1.5L Turbo', viscosity: '5W-30', capacityWithFilter: '4.5 لیتر', capacityWithoutFilter: '4.2 لیتر', apiGrade: 'SN' }
        ]
      }
    ]
  },
  {
    id: 'kerman',
    name: 'کرمان موتور (JAC/KMC)',
    logo: 'https://kermanmotor.com/App_Themes/KermanMotor/images/logo.png',
    models: [
      {
        id: 'j4',
        name: 'جک J4',
        engines: [
          { id: 'j4-1.5', name: '1.5L', viscosity: '10W-40', capacityWithFilter: '4 لیتر', capacityWithoutFilter: '3.6 لیتر', apiGrade: 'SM' }
        ]
      },
      {
        id: 's5',
        name: 'جک S5',
        engines: [
          { id: 's5-2.0t', name: '2.0L Turbo', viscosity: '5W-40', capacityWithFilter: '5 لیتر', capacityWithoutFilter: '4.6 لیتر', apiGrade: 'SN' },
          { id: 's5-1.5t', name: '1.5L Turbo (GDI)', viscosity: '5W-30', capacityWithFilter: '4.5 لیتر', capacityWithoutFilter: '4.2 لیتر', apiGrade: 'SN' }
        ]
      }
    ]
  }
];
