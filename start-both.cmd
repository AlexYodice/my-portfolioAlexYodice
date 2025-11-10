@echo off
title Starting Both Frontend and Backend Check
color 0E
echo ========================================
echo   Starting Frontend and Backend Check
echo ========================================
echo.
echo Opening Frontend window...
start "Frontend - React Portfolio" cmd /k "start-frontend.cmd"
timeout /t 2 /nobreak >nul

echo Opening Backend Check window...
start "Backend - Supabase Connection" cmd /k "check-backend.cmd"
timeout /t 1 /nobreak >nul

echo.
echo Both windows have been opened!
echo.
echo Frontend: Will run on http://localhost:3000
echo Backend: Check the other window for Supabase status
echo.
echo ========================================
echo.
pause

