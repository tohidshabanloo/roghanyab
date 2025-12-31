# PowerShell script to build Android APK
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Building RoghanYab Android APK" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Java
Write-Host "[Checking] Java installation..." -ForegroundColor Yellow
try {
    $javaVersion = java -version 2>&1
    Write-Host "[OK] Java found" -ForegroundColor Green
    $javaVersion | Select-Object -First 1
} catch {
    Write-Host "[ERROR] Java is not installed or not in PATH!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Java JDK 17+ from:" -ForegroundColor Yellow
    Write-Host "  https://adoptium.net/" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "After installation, set JAVA_HOME:" -ForegroundColor Yellow
    Write-Host '  $env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.x-hotspot"' -ForegroundColor Cyan
    Write-Host '  $env:PATH = "$env:JAVA_HOME\bin;$env:PATH"' -ForegroundColor Cyan
    exit 1
}

Write-Host ""

# Step 1: Build web project
Write-Host "[1/3] Building web project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Web build failed!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 2: Sync with Android
Write-Host "[2/3] Syncing with Android..." -ForegroundColor Yellow
npx cap sync android
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Sync failed!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 3: Build Android APK
Write-Host "[3/3] Building Android APK..." -ForegroundColor Yellow
Set-Location android
.\gradlew.bat assembleDebug
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Android build failed!" -ForegroundColor Red
    Set-Location ..
    exit 1
}

Set-Location ..

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Build completed successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

$apkPath = "android\app\build\outputs\apk\debug\app-debug.apk"
if (Test-Path $apkPath) {
    $apkFile = Get-Item $apkPath
    Write-Host "APK location: $apkPath" -ForegroundColor Cyan
    Write-Host "File size: $([math]::Round($apkFile.Length / 1MB, 2)) MB" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "To install on device:" -ForegroundColor Yellow
    Write-Host "  adb install $apkPath" -ForegroundColor Cyan
} else {
    Write-Host "[WARNING] APK file not found at expected location!" -ForegroundColor Yellow
}

Write-Host ""

