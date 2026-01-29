# Script to help setup Android SDK
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Android SDK Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$sdkPath = $null
$sdkFound = $false

# Check common SDK locations
$sdkLocations = @(
    "$env:LOCALAPPDATA\Android\Sdk",
    "$env:USERPROFILE\AppData\Local\Android\Sdk",
    "C:\Android\Sdk",
    "$env:ProgramFiles\Android\Sdk"
)

Write-Host "[Checking] Android SDK locations..." -ForegroundColor Yellow

foreach ($location in $sdkLocations) {
    if (Test-Path $location) {
        $sdkPath = $location
        $sdkFound = $true
        Write-Host "[FOUND] Android SDK at: $sdkPath" -ForegroundColor Green
        break
    }
}

if (-not $sdkFound) {
    Write-Host "[NOT FOUND] Android SDK is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "You have two options:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Option 1: Install Android Studio (Recommended - includes SDK)" -ForegroundColor Cyan
    Write-Host "  URL: https://developer.android.com/studio" -ForegroundColor White
    Write-Host "  After installation, SDK will be at:" -ForegroundColor White
    Write-Host "  $env:LOCALAPPDATA\Android\Sdk" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Option 2: Install Android SDK Command Line Tools only" -ForegroundColor Cyan
    Write-Host "  URL: https://developer.android.com/studio#command-tools" -ForegroundColor White
    Write-Host "  Download: Command line tools only" -ForegroundColor White
    Write-Host "  Extract to: C:\Android\Sdk" -ForegroundColor White
    Write-Host ""
    Write-Host "After installation, run this script again to configure." -ForegroundColor Yellow
    Write-Host ""
    
    $response = Read-Host "Would you like to open the download page? (Y/N)"
    if ($response -eq "Y" -or $response -eq "y") {
        Start-Process "https://developer.android.com/studio"
    }
    
    exit 1
}

# Create local.properties file
Write-Host ""
Write-Host "[Creating] local.properties file..." -ForegroundColor Yellow

$localPropsPath = "android\local.properties"
$sdkDirPath = $sdkPath.Replace('\', '\\')
$content = "sdk.dir=$sdkDirPath"

$content | Out-File -FilePath $localPropsPath -Encoding ASCII -NoNewline

Write-Host "[OK] Created $localPropsPath" -ForegroundColor Green
Write-Host "  Content: sdk.dir=$sdkPath" -ForegroundColor Gray
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Android SDK Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Now you can build the APK:" -ForegroundColor Cyan
Write-Host "  cd android" -ForegroundColor White
Write-Host "  .\gradlew.bat assembleDebug" -ForegroundColor White
Write-Host ""





