@echo off
title Get Your Supabase Key
color 0A
echo ========================================
echo   Getting Your Supabase API Key
echo ========================================
echo.
echo Opening your Supabase project API settings...
echo.
echo Once the page opens:
echo   1. Look for "Project API keys" section
echo   2. Find the "anon" or "public" key
echo   3. Click the "Copy" button next to it
echo   4. Come back here and paste it
echo.
echo Opening browser...
start https://app.supabase.com/project/qarplahyjhdipjjqorfr/settings/api
echo.
echo Browser opened! Follow the steps above.
echo.
pause

