# 🚀 راهنمای سریع ساخت APK | Quick APK Build Guide

## ✅ مراحل کامل | Complete Steps

### 1. نصب Java (✅ انجام شده | Done)
Java JDK 17 نصب شده است در:
```
C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot
```

### 2. تنظیم JAVA_HOME (در هر session جدید)

```powershell
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
```

### 3. نصب Android SDK (⚠️ نیاز است | Required)

**گزینه ۱: نصب Android Studio (توصیه می‌شود)**
- دانلود: https://developer.android.com/studio
- نصب کنید (SDK به صورت خودکار نصب می‌شود)
- SDK در این مسیر خواهد بود: `C:\Users\shaba\AppData\Local\Android\Sdk`

**گزینه ۲: فقط Command Line Tools**
- دانلود: https://developer.android.com/studio#command-tools
- استخراج به: `C:\Android\Sdk`

### 4. تنظیم Android SDK

بعد از نصب SDK، فایل `android\local.properties` را ایجاد کنید:

```properties
sdk.dir=C:\\Users\\shaba\\AppData\\Local\\Android\\Sdk
```

یا از اسکریپت استفاده کنید:
```powershell
.\setup-android-sdk.ps1
```

### 5. ساخت APK

```powershell
# تنظیم Java
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"

# ساخت وب پروژه
npm run build

# همگام‌سازی
npx cap sync android

# ساخت APK
cd android
.\gradlew.bat assembleDebug
cd ..

# APK شما آماده است:
# android\app\build\outputs\apk\debug\app-debug.apk
```

## 📝 دستورات یکجا | All-in-One Commands

```powershell
# تنظیم Java
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"

# ساخت کامل
npm run build
npx cap sync android
cd android
.\gradlew.bat assembleDebug
cd ..
```

## 🎯 وضعیت فعلی | Current Status

- ✅ Java نصب شده
- ✅ پروژه وب Build شده
- ✅ Android sync شده
- ⚠️ Android SDK نیاز است

**مرحله بعدی:** نصب Android SDK و سپس ساخت APK





