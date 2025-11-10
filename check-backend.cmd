@echo off
title Backend - Supabase Connection Check
color 0B
echo ========================================
echo   Supabase Backend Connection Check
echo ========================================
echo.
echo Checking environment variables...
echo.

if exist ".env" (
    echo .env file found!
    echo.
    echo Checking for Supabase credentials...
    echo.
    
    findstr /C:"REACT_APP_SUPABASE_URL" .env >nul 2>&1
    if %errorlevel% equ 0 (
        echo [OK] REACT_APP_SUPABASE_URL is set
    ) else (
        echo [ERROR] REACT_APP_SUPABASE_URL is missing!
    )
    
    findstr /C:"REACT_APP_SUPABASE_KEY" .env >nul 2>&1
    if %errorlevel% equ 0 (
        echo [OK] REACT_APP_SUPABASE_KEY is set
    ) else (
        echo [ERROR] REACT_APP_SUPABASE_KEY is missing!
    )
    
    echo.
    echo ========================================
    echo Note: Supabase is a hosted backend service
    echo No local server is required to run.
    echo.
    echo Make sure your Supabase:
    echo   1. Projects table is created
    echo   2. Storage bucket 'projects' exists
    echo   3. RLS policies are configured
    echo.
) else (
    echo [WARNING] .env file not found!
    echo.
    echo You need to create a .env file with:
    echo   REACT_APP_SUPABASE_URL=your_supabase_url
    echo   REACT_APP_SUPABASE_KEY=your_supabase_key
    echo.
)

echo ========================================
echo.
echo Supabase Backend Status:
echo   - Backend Type: Cloud-hosted (Supabase)
echo   - Database: PostgreSQL (via Supabase)
echo   - Storage: Supabase Storage
echo   - API: Supabase REST API
echo.
echo Your backend is already running in the cloud!
echo No need to start a local backend server.
echo.
echo ========================================
echo.
pause

