@echo off
title Setup Environment Variables
color 0E
echo ========================================
echo   Supabase Environment Setup
echo ========================================
echo.
echo This will help you create your .env file
echo.
echo You'll need to get these from:
echo   https://app.supabase.com -^> Your Project -^> Settings -^> API
echo.
pause
echo.

echo Enter your Supabase Project URL:
echo (Example: https://abcdefghijklmnop.supabase.co)
set /p SUPABASE_URL="URL: "

echo.
echo Enter your Supabase anon/public key:
echo (This is a long string starting with eyJ...)
set /p SUPABASE_KEY="Key: "

echo.
echo Creating .env file...

(
echo # Supabase Configuration
echo REACT_APP_SUPABASE_URL=%SUPABASE_URL%
echo REACT_APP_SUPABASE_KEY=%SUPABASE_KEY%
) > .env

echo.
echo ✅ .env file created successfully!
echo.
echo IMPORTANT: Restart your React app (npm start) for changes to take effect!
echo.
pause

