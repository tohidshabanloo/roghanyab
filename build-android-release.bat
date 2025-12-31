@echo off
echo ========================================
echo   Building RoghanYab Android APK (Release)
echo ========================================
echo.

echo [1/3] Building web project...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Web build failed!
    pause
    exit /b 1
)

echo.
echo [2/3] Syncing with Android...
call npx cap sync android
if %errorlevel% neq 0 (
    echo ERROR: Sync failed!
    pause
    exit /b 1
)

echo.
echo [3/3] Building Android APK (Release)...
cd android
call gradlew.bat assembleRelease
if %errorlevel% neq 0 (
    echo ERROR: Android build failed!
    cd ..
    pause
    exit /b 1
)

cd ..
echo.
echo ========================================
echo   Build completed successfully!
echo ========================================
echo.
echo APK location: android\app\build\outputs\apk\release\app-release.apk
echo.
echo NOTE: This is an unsigned APK. For Google Play Store, you need to sign it.
echo See BUILD_ANDROID.md for signing instructions.
echo.
pause

