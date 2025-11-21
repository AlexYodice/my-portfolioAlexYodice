# 🔧 Fix "Invalid Grant" Gmail Error in EmailJS

## ❌ **The Problem:**
You're seeing this error:
```
Gmail_API: Invalid grant. Please reconnect your Gmail account
POST https://api.emailjs.com/api/v1.0/email/send-form 412 (Precondition Failed)
```

This means your **Gmail OAuth token has expired** and needs to be reconnected.

---

## ✅ **The Solution: Reconnect Gmail in EmailJS**

### Step 1: Go to EmailJS Dashboard
1. Visit: https://dashboard.emailjs.com/admin/service
2. Find your service: **Gmail** (Service ID: `service_dxo91cr`)
3. Click **Edit** (or the service name)

### Step 2: Disconnect Gmail
1. In the "Gmail Connect" section
2. Click the **"Disconnect"** button next to `alexanderyodice2@gmail.com`
3. Confirm the disconnection

### Step 3: Reconnect Gmail
1. Click **"Connect"** or **"Connect Gmail"** button
2. You'll be redirected to Google OAuth
3. Sign in with: `alexanderyodice2@gmail.com`
4. **IMPORTANT:** Check the box: **"Allow 'Send email on your behalf' permission"**
5. Click **"Allow"** to grant permissions
6. You'll be redirected back to EmailJS

### Step 4: Verify Connection
1. You should see: **"Connected as alexanderyodice2@gmail.com"**
2. Check the box: **"Send test email to verify configuration"**
3. Click **"Update Service"**
4. You should receive a test email

### Step 5: Test Your Contact Form
1. Go back to your website
2. Fill out the contact form
3. Click Send
4. Check browser console (F12) - should see success!
5. Check EmailJS Events tab - should show successful send

---

## 🔄 **Why This Happens:**
- Gmail OAuth tokens expire after a period of inactivity
- If you revoked access in Google Account settings
- If the token was invalidated for security reasons

---

## 🛡️ **Prevention:**
- Reconnect Gmail every few months if you see this error
- Don't revoke EmailJS access in your Google Account settings
- Keep the EmailJS service active (send at least one email per month)

---

## ✅ **After Reconnecting:**
Your contact form should work immediately. No code changes needed - the fix is in the EmailJS dashboard!

---

## 🐛 **Still Not Working?**
1. Check EmailJS Events tab for detailed error messages
2. Verify the service ID and template ID are correct
3. Make sure you're using the correct Gmail account
4. Try disconnecting and reconnecting again

---

**Need help?** Check EmailJS documentation: https://www.emailjs.com/docs/

