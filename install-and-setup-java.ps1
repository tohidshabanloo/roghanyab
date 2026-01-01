# Script to help install and setup Java for Android builds
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Java Setup for Android Build" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Java is already installed
Write-Host "[Checking] Java installation..." -ForegroundColor Yellow
$javaFound = $false
$javaPath = $null

# Check common Java locations
$javaLocations = @(
    "C:\Program Files\Java\jdk-*",
    "C:\Program Files\Eclipse Adoptium\jdk-*",
    "C:\Program Files\Microsoft\jdk-*",
    "C:\Program Files (x86)\Java\jdk-*"
)

foreach ($location in $javaLocations) {
    $jdkDirs = Get-ChildItem -Path $location -ErrorAction SilentlyContinue | Sort-Object Name -Descending
    if ($jdkDirs) {
        $javaPath = $jdkDirs[0].FullName
        $javaFound = $true
        Write-Host "[FOUND] Java at: $javaPath" -ForegroundColor Green
        break
    }
}

# Check if java is in PATH
if (-not $javaFound) {
    try {
        $javaCheck = java -version 2>&1
        if ($javaCheck) {
            $javaFound = $true
            Write-Host "[FOUND] Java is in PATH" -ForegroundColor Green
        }
    } catch {
        # Java not found
    }
}

if (-not $javaFound) {
    Write-Host "[NOT FOUND] Java is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Java JDK 17 or higher:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Option 1: Download from Adoptium (Recommended)" -ForegroundColor Cyan
    Write-Host "  URL: https://adoptium.net/temurin/releases/" -ForegroundColor White
    Write-Host "  Choose: Windows x64, JDK 17 LTS" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 2: Download from Oracle" -ForegroundColor Cyan
    Write-Host "  URL: https://www.oracle.com/java/technologies/downloads/" -ForegroundColor White
    Write-Host ""
    Write-Host "After installation, run this script again to set JAVA_HOME." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Or manually set JAVA_HOME:" -ForegroundColor Yellow
    Write-Host '  $env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"' -ForegroundColor Cyan
    Write-Host '  # Or run: .\install-and-setup-java.ps1' -ForegroundColor Cyan
    Write-Host '  $env:PATH = "$env:JAVA_HOME\bin;$env:PATH"' -ForegroundColor Cyan
    Write-Host ""
    
    # Try to open the download page
    $response = Read-Host "Would you like to open the download page? (Y/N)"
    if ($response -eq "Y" -or $response -eq "y") {
        Start-Process "https://adoptium.net/temurin/releases/"
    }
    
    exit 1
}

# If Java path was found, set JAVA_HOME
if ($javaPath) {
    Write-Host ""
    Write-Host "[Setting] JAVA_HOME environment variable..." -ForegroundColor Yellow
    
    # Set for current session
    $env:JAVA_HOME = $javaPath
    $env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
    
    Write-Host "[OK] JAVA_HOME set to: $env:JAVA_HOME" -ForegroundColor Green
    Write-Host ""
    
    # Verify
    Write-Host "[Verifying] Java installation..." -ForegroundColor Yellow
    try {
        $version = java -version 2>&1 | Select-Object -First 1
        Write-Host $version -ForegroundColor Green
        Write-Host "[OK] Java is working!" -ForegroundColor Green
    } catch {
        Write-Host "[ERROR] Java verification failed!" -ForegroundColor Red
        exit 1
    }
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  Java Setup Complete!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Note: This JAVA_HOME setting is only for this PowerShell session." -ForegroundColor Yellow
    Write-Host "To make it permanent:" -ForegroundColor Yellow
    Write-Host "  1. Open System Properties > Environment Variables" -ForegroundColor White
    Write-Host "  2. Add System Variable: JAVA_HOME = $javaPath" -ForegroundColor White
    Write-Host "  3. Edit PATH and add: %JAVA_HOME%\bin" -ForegroundColor White
    Write-Host ""
    Write-Host "Now you can run:" -ForegroundColor Cyan
    Write-Host "  cd android" -ForegroundColor White
    Write-Host "  .\gradlew.bat assembleDebug" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "[OK] Java is already configured!" -ForegroundColor Green
    java -version
}

