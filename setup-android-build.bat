@echo off
echo ========================================
echo   Android Build Environment Setup
echo ========================================
echo.

echo Checking Java installation...
where java >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Java is not installed or not in PATH!
    echo.
    echo Please install Java JDK 17 or higher from:
    echo   - Oracle: https://www.oracle.com/java/technologies/downloads/
    echo   - OpenJDK: https://adoptium.net/
    echo.
    echo After installation, add Java to your PATH or set JAVA_HOME:
    echo   set JAVA_HOME=C:\Program Files\Java\jdk-17
    echo   set PATH=%%JAVA_HOME%%\bin;%%PATH%%
    echo.
    pause
    exit /b 1
)

echo [OK] Java found
java -version
echo.

echo Checking JAVA_HOME...
if "%JAVA_HOME%"=="" (
    echo [WARNING] JAVA_HOME is not set!
    echo.
    echo Attempting to find Java installation...
    for /f "tokens=*" %%i in ('where java') do (
        set JAVA_PATH=%%i
        goto :found_java
    )
    
    :found_java
    echo Found Java at: %JAVA_PATH%
    echo.
    echo Please set JAVA_HOME manually. Common locations:
    echo   C:\Program Files\Java\jdk-17
    echo   C:\Program Files\Java\jdk-21
    echo   C:\Program Files\Eclipse Adoptium\jdk-17.0.x-hotspot
    echo.
    echo You can set it temporarily with:
    echo   set JAVA_HOME=your_java_path
    echo   set PATH=%%JAVA_HOME%%\bin;%%PATH%%
    echo.
    echo Or permanently in System Properties ^> Environment Variables
    echo.
) else (
    echo [OK] JAVA_HOME is set to: %JAVA_HOME%
)

echo.
echo Checking Android SDK...
if "%ANDROID_HOME%"=="" (
    echo [WARNING] ANDROID_HOME is not set!
    echo.
    echo If you have Android Studio installed, common locations:
    echo   C:\Users\%USERNAME%\AppData\Local\Android\Sdk
    echo.
    echo Create android\local.properties with:
    echo   sdk.dir=C:\\Users\\%USERNAME%\\AppData\\Local\\Android\\Sdk
    echo.
) else (
    echo [OK] ANDROID_HOME is set to: %ANDROID_HOME%
)

echo.
echo ========================================
echo   Setup Check Complete
echo ========================================
echo.
echo Next steps:
echo   1. Make sure JAVA_HOME is set correctly
echo   2. Create android\local.properties with SDK path (if needed)
echo   3. Run build-android.bat to build the APK
echo.
pause

