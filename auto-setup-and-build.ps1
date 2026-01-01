# Automated Android SDK setup and APK build script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Automated APK Build Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Set Java
Write-Host "[1/4] Setting up Java..." -ForegroundColor Yellow
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
java -version | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Java not working!" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Java configured" -ForegroundColor Green
Write-Host ""

# Step 2: Check/Setup Android SDK
Write-Host "[2/4] Checking Android SDK..." -ForegroundColor Yellow
$sdkPath = "$env:LOCALAPPDATA\Android\Sdk"

if (-not (Test-Path $sdkPath)) {
    Write-Host "[INFO] Android SDK not found. Creating minimal setup..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To build APK, you need Android SDK." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Quickest way:" -ForegroundColor Cyan
    Write-Host "  1. Download Android Studio: https://developer.android.com/studio" -ForegroundColor White
    Write-Host "  2. Install it (it includes SDK)" -ForegroundColor White
    Write-Host "  3. Run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "OR use online build service:" -ForegroundColor Cyan
    Write-Host "  - Capacitor Cloud Build (paid)" -ForegroundColor White
    Write-Host "  - GitHub Actions (free for public repos)" -ForegroundColor White
    Write-Host ""
    
    # Try to create SDK directory structure (won't work without actual SDK)
    Write-Host "[ATTEMPTING] Creating SDK directory..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $sdkPath -Force | Out-Null
    
    Write-Host "[INFO] SDK directory created, but you still need to install Android SDK" -ForegroundColor Yellow
    Write-Host "      Location: $sdkPath" -ForegroundColor Gray
    Write-Host ""
    
    # Create local.properties anyway
    $localProps = "android\local.properties"
    $sdkDirPath = $sdkPath.Replace('\', '\\')
    "sdk.dir=$sdkDirPath" | Out-File -FilePath $localProps -Encoding ASCII -NoNewline
    Write-Host "[INFO] Created local.properties (will work after SDK installation)" -ForegroundColor Yellow
} else {
    Write-Host "[OK] Android SDK found at: $sdkPath" -ForegroundColor Green
    
    # Create/update local.properties
    $localProps = "android\local.properties"
    $sdkDirPath = $sdkPath.Replace('\', '\\')
    "sdk.dir=$sdkDirPath" | Out-File -FilePath $localProps -Encoding ASCII -NoNewline
    Write-Host "[OK] local.properties configured" -ForegroundColor Green
}
Write-Host ""

# Step 3: Build web project
Write-Host "[3/4] Building web project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Web build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Web project built" -ForegroundColor Green
Write-Host ""

# Step 4: Sync Android
Write-Host "[4/4] Syncing with Android..." -ForegroundColor Yellow
npx cap sync android
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Sync failed!" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Android synced" -ForegroundColor Green
Write-Host ""

# Step 5: Build APK
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Building APK..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location android
.\gradlew.bat assembleDebug

if ($LASTEXITCODE -eq 0) {
    Set-Location ..
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  SUCCESS! APK Built!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    $apkPath = "android\app\build\outputs\apk\debug\app-debug.apk"
    if (Test-Path $apkPath) {
        $apkFile = Get-Item $apkPath
        Write-Host "APK Location: $apkPath" -ForegroundColor Cyan
        Write-Host "File Size: $([math]::Round($apkFile.Length / 1MB, 2)) MB" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "To install on device:" -ForegroundColor Yellow
        Write-Host "  adb install $apkPath" -ForegroundColor White
    }
} else {
    Set-Location ..
    Write-Host ""
    Write-Host "[ERROR] Build failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "  1. Android SDK not installed - install Android Studio" -ForegroundColor White
    Write-Host "  2. SDK path incorrect - check android\local.properties" -ForegroundColor White
    Write-Host "  3. Missing SDK components - run Android Studio SDK Manager" -ForegroundColor White
}

