# 📱 راهنمای ساخت APK اندروید | Android APK Build Guide

## پیش‌نیازها | Prerequisites

### Windows

1. **Java Development Kit (JDK)**
   - دانلود JDK 17 یا بالاتر از [Oracle](https://www.oracle.com/java/technologies/downloads/) یا [OpenJDK](https://adoptium.net/)
   - نصب JDK و اضافه کردن به PATH
   - بررسی نصب: `java -version`

2. **Android Studio** (اختیاری اما توصیه می‌شود)
   - دانلود از [developer.android.com](https://developer.android.com/studio)
   - Android Studio شامل Android SDK و Gradle است

3. **Android SDK** (اگر Android Studio نصب نکردید)
   - دانلود Android SDK Command Line Tools
   - تنظیم متغیر محیطی `ANDROID_HOME`

### Linux/Mac

```bash
# نصب JDK
sudo apt install openjdk-17-jdk  # Ubuntu/Debian
brew install openjdk@17          # macOS

# بررسی نصب
java -version
```

---

## 🔧 مراحل ساخت APK | Build Steps

### روش ۱: استفاده از اسکریپت (ساده‌تر) | Method 1: Using Script (Easier)

```bash
# 1. ساخت پروژه وب
npm run build

# 2. همگام‌سازی با اندروید
npm run cap:sync

# 3. ساخت APK Debug (برای تست)
npm run android:debug

# یا ساخت APK Release (برای انتشار)
npm run android:build
```

### روش ۲: استفاده از Android Studio | Method 2: Using Android Studio

1. **باز کردن پروژه در Android Studio:**
   ```bash
   npm run cap:open
   ```
   این دستور پروژه Android را در Android Studio باز می‌کند.

2. **در Android Studio:**
   - Build → Build Bundle(s) / APK(s) → Build APK(s)
   - یا Build → Generate Signed Bundle / APK

### روش ۳: استفاده از Gradle مستقیم | Method 3: Direct Gradle

```bash
# Windows
cd android
gradlew.bat assembleDebug
gradlew.bat assembleRelease

# Linux/Mac
cd android
./gradlew assembleDebug
./gradlew assembleRelease
```

---

## 📍 محل فایل APK | APK Location

پس از ساخت موفق، فایل APK در مسیر زیر قرار دارد:

After successful build, the APK file is located at:

```
android/app/build/outputs/apk/debug/app-debug.apk    # Debug version
android/app/build/outputs/apk/release/app-release.apk # Release version
```

---

## ⚠️ حل مشکلات رایج | Troubleshooting

### خطای ۱: `JAVA_HOME is not set`

**راه حل:**
```bash
# Windows (PowerShell)
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"

# Windows (CMD)
set JAVA_HOME=C:\Program Files\Java\jdk-17
set PATH=%JAVA_HOME%\bin;%PATH%

# Linux/Mac
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
export PATH=$JAVA_HOME/bin:$PATH
```

### خطای ۲: `SDK location not found`

**راه حل:**
1. فایل `android/local.properties` را ایجاد کنید:
   ```properties
   sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
   ```
   یا در Linux/Mac:
   ```properties
   sdk.dir=/home/username/Android/Sdk
   ```

### خطای ۳: `Gradle build failed`

**راه حل:**
```bash
cd android
./gradlew clean
./gradlew build --refresh-dependencies
```

### خطای ۴: `Minimum supported Gradle version`

**راه حل:**
فایل `android/gradle/wrapper/gradle-wrapper.properties` را بررسی کنید و نسخه Gradle را به‌روزرسانی کنید.

### خطای ۵: مشکلات مربوط به حافظه

**راه حل:**
فایل `android/gradle.properties` را ویرایش کنید:
```properties
org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m
```

---

## 🔐 ساخت APK امضا شده | Building Signed APK

برای انتشار در Google Play Store، باید APK را امضا کنید:

### 1. ایجاد Keystore

```bash
keytool -genkey -v -keystore roghanyab-release.keystore -alias roghanyab -keyalg RSA -keysize 2048 -validity 10000
```

### 2. تنظیم در `android/app/build.gradle`

```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file('../roghanyab-release.keystore')
            storePassword 'your-store-password'
            keyAlias 'roghanyab'
            keyPassword 'your-key-password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            ...
        }
    }
}
```

---

## 📝 نکات مهم | Important Notes

1. **همیشه قبل از ساخت، پروژه را Build کنید:**
   ```bash
   npm run build
   npm run cap:sync
   ```

2. **برای تست، از Debug APK استفاده کنید**

3. **برای انتشار، حتماً از Release APK امضا شده استفاده کنید**

4. **اطمینان حاصل کنید که `GEMINI_API_KEY` در `.env.local` تنظیم شده است**

5. **فایل `android/local.properties` را به `.gitignore` اضافه کنید (اگر اضافه نشده)**

---

## 🆘 در صورت بروز مشکل | If You Encounter Issues

1. پروژه را Clean کنید:
   ```bash
   cd android
   ./gradlew clean
   ```

2. Cache را پاک کنید:
   ```bash
   rm -rf android/.gradle
   rm -rf android/app/build
   ```

3. Dependencies را به‌روزرسانی کنید:
   ```bash
   npm run cap:sync
   ```

4. لاگ کامل را بررسی کنید:
   ```bash
   cd android
   ./gradlew assembleDebug --stacktrace --info
   ```

---

## 📞 پشتیبانی | Support

برای گزارش مشکل یا سوال، لطفاً یک Issue در GitHub ایجاد کنید.

For reporting issues or questions, please create a GitHub Issue.

---

**توسعه‌دهنده | Developer:** Tohid Shabanloo - [koolegard.com](https://koolegard.com)  
**شرکت | Company:** Rahvam - [rahvan.ir](https://rahvan.ir)

