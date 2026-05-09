@echo off
echo ========================================
echo  Retail Portal - GitHub Upload Script
echo ========================================
echo.

REM Check if Git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not installed on your system!
    echo.
    echo Please follow these steps:
    echo 1. Download Git from: https://git-scm.com/download/win
    echo 2. Install Git (keep all default settings)
    echo 3. Restart your computer
    echo 4. Run this script again
    echo.
    pause
    exit /b 1
)

echo [OK] Git is installed
echo.

REM Configure Git user
echo Configuring Git user...
git config --global user.name "vivan500"
git config --global user.email "viveksorout888@gmail.com"
echo [OK] Git configured
echo.

REM Create README.md
echo Creating README.md...
echo # Retail-Portal > README.md
echo [OK] README.md created
echo.

REM Initialize Git repository
echo Initializing Git repository...
git init
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to initialize Git repository
    pause
    exit /b 1
)
echo [OK] Repository initialized
echo.

REM Add all files
echo Adding all files to Git...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to add files
    pause
    exit /b 1
)
echo [OK] Files added
echo.

REM Commit files
echo Committing files...
git commit -m "Initial commit: Complete Retail Ordering Portal MERN Stack"
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to commit files
    pause
    exit /b 1
)
echo [OK] Files committed
echo.

REM Rename branch to main
echo Setting main branch...
git branch -M main
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to rename branch
    pause
    exit /b 1
)
echo [OK] Branch set to main
echo.

REM Add remote origin
echo Adding remote repository...
git remote add origin https://github.com/vivan500/Retail-Portal.git
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Remote might already exist, trying to set URL...
    git remote set-url origin https://github.com/vivan500/Retail-Portal.git
)
echo [OK] Remote repository configured
echo.

REM Push to GitHub
echo ========================================
echo  Pushing to GitHub...
echo ========================================
echo.
echo You will be asked to login to GitHub.
echo Please enter your credentials when prompted.
echo.
echo If you have 2FA enabled, you'll need to use a Personal Access Token
echo instead of your password. Get it from:
echo https://github.com/settings/tokens
echo.
pause

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo  SUCCESS! Upload Complete!
    echo ========================================
    echo.
    echo Your project is now available at:
    echo https://github.com/vivan500/Retail-Portal
    echo.
) else (
    echo.
    echo ========================================
    echo  Upload Failed
    echo ========================================
    echo.
    echo Possible reasons:
    echo 1. Authentication failed - check your credentials
    echo 2. Repository doesn't exist - create it on GitHub first
    echo 3. Network connection issue
    echo.
    echo Please check the error message above.
    echo.
)

pause
