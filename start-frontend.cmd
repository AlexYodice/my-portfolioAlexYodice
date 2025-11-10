@echo off
title Frontend - React Portfolio
color 0A
echo ========================================
echo   Starting Frontend (React App)
echo ========================================
echo.
echo Current directory: %CD%
echo.
echo Checking for node_modules...
if not exist "node_modules\" (
    echo node_modules not found! Installing dependencies...
    echo.
    call npm install
    echo.
    echo Dependencies installed!
    echo.
)

echo Starting React development server...
echo.
echo The app will open at http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

call npm start

pause

