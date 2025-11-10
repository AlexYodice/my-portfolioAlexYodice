import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || ''

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables.')
  console.error('Make sure your .env file has REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY set.')
  console.error('')
  console.error('Quick fix:')
  console.error('1. Run: setup-env.cmd (in this folder)')
  console.error('2. Or create .env file manually with:')
  console.error('   REACT_APP_SUPABASE_URL=your_url')
  console.error('   REACT_APP_SUPABASE_KEY=your_key')
  console.error('3. Get credentials from: https://app.supabase.com → Settings → API')
} else {
  console.log('✅ Supabase environment variables loaded successfully')
  console.log('📍 URL:', supabaseUrl)
}

// Create client with fallback empty strings to prevent crash
export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseKey || 'placeholder-key')

// Test connection on startup
if (supabaseUrl && supabaseKey) {
  supabase.from('projects').select('id').limit(1)
    .then(({ error }) => {
      if (error) {
        console.warn('⚠️ Supabase connection test:', error.message)
        console.warn('   This might be normal if the projects table doesn\'t exist yet.')
        console.warn('   Make sure to run the SQL setup scripts in your Supabase dashboard.')
      } else {
        console.log('✅ Supabase connection successful!')
      }
    })
    .catch((err) => {
      console.warn('⚠️ Could not test Supabase connection:', err.message)
    })
}


