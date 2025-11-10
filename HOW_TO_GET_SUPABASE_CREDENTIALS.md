# 🔑 How to Get Your Supabase Credentials

## Step 1: Go to Supabase Dashboard

1. Open: **https://app.supabase.com**
2. Log in to your account
3. Select your project (or create a new one if you haven't)

## Step 2: Find Your API Credentials

1. In the left sidebar, click **Settings** (gear icon at the bottom)
2. Click **API** (under Project Settings)
3. You'll see two important values:

### 📍 Project URL
- Look for **"Project URL"** or **"URL"**
- It looks like: `https://xxxxxxxxxxxxx.supabase.co`
- Copy this entire URL

### 🔐 anon/public key
- Look for **"Project API keys"**
- Find the **"anon"** or **"public"** key (NOT the service_role key!)
- It looks like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (very long string)
- Copy this entire key

## Step 3: Add to .env File

1. Open the `.env` file in your project root
2. Paste your values:

```env
REACT_APP_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
REACT_APP_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. **Save the file**
4. **Restart your React app** (stop `npm start` and run it again)

## Step 4: Verify It Works

After restarting, you should see:
- ✅ No more error messages in console
- ✅ Your app loads normally

---

## ⚠️ Important Notes

- **Never commit `.env` to Git** - it contains secrets!
- The `.env` file should be in your **project root** (same folder as `package.json`)
- Make sure there are **no spaces** around the `=` sign
- Don't use quotes around the values
- After changing `.env`, you **must restart** `npm start`

---

## 📸 Visual Guide

When you're in Settings → API, you'll see something like:

```
Project URL
https://abcdefghijklmnop.supabase.co

API Keys
┌─────────────────────────────────────────────────────────┐
│ anon / public                                            │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBh... │
│ [Copy]                                                   │
└─────────────────────────────────────────────────────────┘
```

Copy both of those values into your `.env` file!

