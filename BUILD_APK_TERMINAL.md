# 📱 ساخت APK با استفاده از Terminal | Build APK Using Terminal Only

## ⚠️ پیش‌نیازها | Prerequisites

برای ساخت APK فقط با Terminal، به موارد زیر نیاز دارید:

### 1. Java JDK (ضروری | Required)

**دانلود و نصب:**
- **OpenJDK 17** (توصیه می‌شود): https://adoptium.net/temurin/releases/
- یا **Oracle JDK**: https://www.oracle.com/java/technologies/downloads/

**بعد از نصب، JAVA_HOME را تنظیم کنید:**

```powershell
# در PowerShell (موقت - فقط برای این session)
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.x-hotspot"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"

# بررسی
java -version
```

**یا به صورت دائمی:**
1. System Properties → Environment Variables
2. New System Variable: `JAVA_HOME` = مسیر نصب Java
3. Edit `PATH` → Add: `%JAVA_HOME%\bin`

### 2. Android SDK (اختیاری - اگر Android Studio ندارید)

اگر Android Studio نصب دارید، SDK در این مسیر است:
```
C:\Users\shaba\AppData\Local\Android\Sdk
```

اگر ندارید، می‌توانید فقط Command Line Tools را دانلود کنید.

---

## 🚀 مراحل ساخت APK | Build Steps

### مرحله ۱: بررسی محیط | Step 1: Check Environment

```powershell
# بررسی Java
java -version

# بررسی Gradle (بعد از تنظیم Java)
cd android
.\gradlew.bat --version
```

### مرحله ۲: ساخت پروژه وب | Step 2: Build Web Project

```powershell
cd C:\Users\shaba\Desktop\RoghanYab
npm run build
```

### مرحله ۳: همگام‌سازی با Android | Step 3: Sync with Android

```powershell
npx cap sync android
```

### مرحله ۴: ساخت APK | Step 4: Build APK

**برای Debug APK (تست):**
```powershell
cd android
.\gradlew.bat assembleDebug
```

**برای Release APK (انتشار):**
```powershell
cd android
.\gradlew.bat assembleRelease
```

### مرحله ۵: پیدا کردن فایل APK | Step 5: Find APK File

بعد از ساخت موفق، APK در این مسیر است:

```
android\app\build\outputs\apk\debug\app-debug.apk      # Debug
android\app\build\outputs\apk\release\app-release.apk # Release
```

---

## 📝 دستورات کامل (یکجا) | Complete Commands (All at Once)

### روش سریع با اسکریپت | Quick Method with Script

```powershell
# فقط این دو خط را اجرا کنید:
.\setup-android-build.bat    # بررسی محیط
.\build-android.bat          # ساخت APK
```

### روش دستی | Manual Method

```powershell
# 1. ساخت وب
npm run build

# 2. همگام‌سازی
npx cap sync android

# 3. ساخت APK
cd android
.\gradlew.bat assembleDebug

# 4. بازگشت به ریشه
cd ..
```

---

## 🔧 حل مشکلات | Troubleshooting

### خطای: `JAVA_HOME is not set`

```powershell
# پیدا کردن مسیر Java
where java

# تنظیم JAVA_HOME (اگر Java نصب است اما JAVA_HOME تنظیم نشده)
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
```

### خطای: `SDK location not found`

فایل `android\local.properties` را ایجاد کنید:

```properties
sdk.dir=C:\\Users\\shaba\\AppData\\Local\\Android\\Sdk
```

### خطای: `Gradle build failed`

```powershell
cd android
.\gradlew.bat clean
.\gradlew.bat build --refresh-dependencies
```

### خطای: Memory issues

فایل `android\gradle.properties` را بررسی کنید - باید این خط را داشته باشد:
```properties
org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m
```

---

## ✅ بررسی موفقیت | Verify Success

بعد از ساخت، این دستور را اجرا کنید:

```powershell
# بررسی وجود فایل APK
Test-Path "android\app\build\outputs\apk\debug\app-debug.apk"

# نمایش اطلاعات فایل
Get-Item "android\app\build\outputs\apk\debug\app-debug.apk" | Select-Object Name, Length, LastWriteTime
```

---

## 📦 نصب APK روی دستگاه | Install APK on Device

```powershell
# اتصال دستگاه Android با USB Debugging
adb devices

# نصب APK
adb install android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 🎯 خلاصه دستورات | Command Summary

```powershell
# همه چیز در یک خط (بعد از تنظیم Java):
npm run build && npx cap sync android && cd android && .\gradlew.bat assembleDebug && cd ..
```

یا استفاده از npm scripts:

```powershell
npm run android:debug    # ساخت Debug APK
npm run android:build    # ساخت Release APK
```

---

**نکته:** اگر Java نصب نیست، ابتدا آن را نصب کنید و سپس این مراحل را دنبال کنید.

**Note:** If Java is not installed, install it first, then follow these steps.

