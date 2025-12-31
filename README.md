<div align="center">
  <h1>🛢️ روغن‌یاب خودرو | RoghanYab</h1>
  <p><strong>راهنمای تخصصی انتخاب روغن موتور خودرو | Professional Car Engine Oil Finder</strong></p>
  <p>نسخه ۱.۰.۰ | Version 1.0.0</p>
</div>

---

## 📖 درباره پروژه | About the Project

### فارسی | Farsi

**روغن‌یاب** یک اپلیکیشن وب پیشرفته و تخصصی است که به مالکان خودروهای ایرانی کمک می‌کند تا روغن موتور مناسب برای خودروی خود را به راحتی پیدا کنند. این اپلیکیشن با پوشش گسترده برندها و مدل‌های موجود در بازار ایران، اطلاعات دقیق فنی شامل گرانروی پیشنهادی، سطح کیفی API، و حجم روغن مورد نیاز (با و بدون فیلتر) را در اختیار کاربران قرار می‌دهد.

این پروژه با استفاده از تکنولوژی‌های مدرن وب توسعه یافته و به صورت Progressive Web App (PWA) طراحی شده است که امکان نصب روی دستگاه‌های موبایل و استفاده آفلاین را فراهم می‌کند.

### English

**RoghanYab** (روغن‌یاب) is an advanced and specialized web application that helps Iranian car owners easily find the appropriate engine oil for their vehicles. The application provides comprehensive coverage of brands and models available in the Iranian market, offering precise technical information including recommended viscosity, API quality grade, and required oil volume (with and without filter).

This project is developed using modern web technologies and designed as a Progressive Web App (PWA), enabling installation on mobile devices and offline usage.

---

## ✨ ویژگی‌ها | Features

### فارسی | Farsi

- 🔍 **جستجوی پیشرفته**: جستجوی سریع و آسان در بین برندها و مدل‌های مختلف خودرو
- 📱 **طراحی واکنش‌گرا**: رابط کاربری بهینه شده برای تمامی دستگاه‌ها (موبایل، تبلت، دسکتاپ)
- 🌙 **حالت تاریک**: پشتیبانی کامل از حالت تاریک برای تجربه کاربری بهتر
- 📊 **اطلاعات فنی دقیق**: نمایش جزئیات کامل شامل:
  - گرانروی پیشنهادی (Viscosity)
  - سطح کیفی API
  - حجم روغن با فیلتر
  - حجم روغن بدون فیلتر
- 🤖 **مشاوره هوشمند**: دریافت مشاوره تخصصی و راهنمایی‌های کاربردی
- 📲 **PWA**: قابلیت نصب به عنوان اپلیکیشن موبایل
- 🌐 **پشتیبانی آفلاین**: دسترسی به اطلاعات پایه حتی بدون اتصال به اینترنت
- 🇮🇷 **پشتیبانی از برندهای ایرانی**: شامل محصولات ایران‌خودرو، سایپا، مدیران خودرو و برندهای وارداتی

### English

- 🔍 **Advanced Search**: Quick and easy search across various car brands and models
- 📱 **Responsive Design**: Optimized user interface for all devices (mobile, tablet, desktop)
- 🌙 **Dark Mode**: Full support for dark mode for better user experience
- 📊 **Detailed Technical Information**: Complete details including:
  - Recommended Viscosity
  - API Quality Grade
  - Oil Volume with Filter
  - Oil Volume without Filter
- 🤖 **Smart Consultation**: Receive expert advice and practical guidance
- 📲 **PWA**: Installable as a mobile application
- 🌐 **Offline Support**: Access to basic information even without internet connection
- 🇮🇷 **Iranian Brands Support**: Including Iran Khodro, Saipa, Modiran Khodro products and imported brands

---

## 🚀 شروع سریع | Quick Start

### پیش‌نیازها | Prerequisites

- **Node.js** (نسخه ۱۸ یا بالاتر | Version 18 or higher)
- **npm** یا **yarn**

### نصب و راه‌اندازی | Installation

1. **کلون کردن پروژه | Clone the repository:**
   ```bash
   git clone https://github.com/tohidshabanloo/roghanyab.git
   cd roghanyab
   ```

2. **نصب وابستگی‌ها | Install dependencies:**
   ```bash
   npm install
   ```

3. **تنظیم متغیرهای محیطی | Set up environment variables:**
   
   فایل `.env.local` را ایجاد کنید و کلید API خود را اضافه کنید:
   Create a `.env.local` file and add your API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **اجرای پروژه | Run the project:**
   ```bash
   npm run dev
   ```

5. **ساخت نسخه تولید | Build for production:**
   ```bash
   npm run build
   ```

6. **ساخت APK اندروید | Build Android APK:**
   
   برای ساخت APK اندروید، به فایل `BUILD_ANDROID.md` مراجعه کنید.
   
   For building Android APK, refer to `BUILD_ANDROID.md` file.
   
   **سریع | Quick:**
   ```bash
   # Windows
   setup-android-build.bat    # بررسی محیط
   build-android.bat          # ساخت APK
   
   # Linux/Mac
   npm run android:debug      # ساخت APK Debug
   npm run android:build      # ساخت APK Release
   ```

---

## 🛠️ تکنولوژی‌های استفاده شده | Technologies Used

### Frontend
- **React 19** - کتابخانه رابط کاربری
- **TypeScript** - زبان برنامه‌نویسی
- **Vite** - ابزار ساخت و توسعه
- **Tailwind CSS** - فریمورک CSS
- **Lucide React** - آیکون‌های رابط کاربری

### Features
- **Progressive Web App (PWA)** - قابلیت نصب و استفاده آفلاین
- **Responsive Design** - طراحی واکنش‌گرا
- **Dark Mode** - حالت تاریک
- **Modern UI/UX** - رابط کاربری مدرن

---

## 📁 ساختار پروژه | Project Structure

```
roghanyab/
├── App.tsx                 # کامپوننت اصلی اپلیکیشن
├── index.tsx               # نقطه ورود اپلیکیشن
├── index.html              # فایل HTML اصلی
├── constants.tsx            # داده‌های ثابت (برندها و مدل‌ها)
├── types.ts                # تعاریف TypeScript
├── manifest.json           # فایل مانیفست PWA
├── metadata.json           # متادیتای پروژه
├── services/
│   └── geminiService.ts    # سرویس مشاوره هوشمند
├── roghan.png              # آیکون اپلیکیشن
└── package.json            # وابستگی‌های پروژه
```

---

## 🎯 نحوه استفاده | How to Use

### فارسی | Farsi

1. **انتخاب برند**: از لیست برندهای موجود، برند خودروی خود را انتخاب کنید
2. **انتخاب مدل**: پس از انتخاب برند، مدل خودروی خود را از لیست مدل‌ها انتخاب کنید
3. **انتخاب موتور**: نوع موتور خودروی خود را انتخاب کنید
4. **مشاهده اطلاعات**: اطلاعات فنی کامل شامل گرانروی، سطح API، و حجم روغن را مشاهده کنید
5. **دریافت مشاوره**: برای دریافت مشاوره تخصصی، به اینترنت متصل شوید

### English

1. **Select Brand**: Choose your car brand from the available list
2. **Select Model**: After selecting the brand, choose your car model from the list
3. **Select Engine**: Select your vehicle's engine type
4. **View Information**: View complete technical information including viscosity, API grade, and oil volume
5. **Get Consultation**: Connect to the internet to receive expert consultation

---

## 📱 نصب به عنوان اپلیکیشن | Install as App

### Android
1. مرورگر Chrome را باز کنید
2. به آدرس اپلیکیشن بروید
3. منوی مرورگر را باز کنید
4. گزینه "Add to Home Screen" یا "نصب اپلیکیشن" را انتخاب کنید

### iOS
1. مرورگر Safari را باز کنید
2. به آدرس اپلیکیشن بروید
3. دکمه Share را فشار دهید
4. گزینه "Add to Home Screen" را انتخاب کنید

---

## 🤝 مشارکت | Contributing

مشارکت‌های شما در بهبود این پروژه بسیار ارزشمند است. لطفاً:

1. پروژه را Fork کنید
2. یک شاخه جدید ایجاد کنید (`git checkout -b feature/AmazingFeature`)
3. تغییرات خود را Commit کنید (`git commit -m 'Add some AmazingFeature'`)
4. به شاخه خود Push کنید (`git push origin feature/AmazingFeature`)
5. یک Pull Request ایجاد کنید

Your contributions to improving this project are highly valued. Please:

1. Fork the project
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to your branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 مجوز | License

این پروژه تحت مجوز اختصاصی است. تمامی حقوق محفوظ است.

This project is under proprietary license. All rights reserved.

---

## 👨‍💻 توسعه‌دهنده | Developer

**توهید شعبانلو | Tohid Shabanloo**

- 🌐 وب‌سایت: [koolegard.com](https://koolegard.com)
- 📧 ایمیل: [اطلاعات تماس در وب‌سایت]

---

## 🏢 شرکت | Company

**راهوام | Rahvam**

- 🌐 وب‌سایت: [rahvan.ir](https://rahvan.ir)

---

## 📞 تماس با ما | Contact Us

برای سوالات، پیشنهادات و گزارش باگ‌ها، لطفاً از طریق GitHub Issues با ما در تماس باشید.

For questions, suggestions, and bug reports, please contact us through GitHub Issues.

---

## 🙏 تشکر | Acknowledgments

- از تمامی کاربرانی که از این اپلیکیشن استفاده می‌کنند و بازخوردهای ارزشمند خود را ارائه می‌دهند، صمیمانه تشکر می‌کنیم.
- We sincerely thank all users who use this application and provide valuable feedback.

---

<div align="center">
  <p>ساخته شده با ❤️ در ایران | Made with ❤️ in Iran</p>
  <p>© ۱۴۰۳ | 2024 - تمامی حقوق محفوظ است | All rights reserved</p>
</div>
