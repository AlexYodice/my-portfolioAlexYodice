import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || ''

// Check if Supabase is properly configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseKey && 
  supabaseUrl !== '' && 
  supabaseKey !== '' && 
  !supabaseUrl.includes('placeholder') &&
  !supabaseKey.includes('placeholder'))

// Only log errors in development mode
if (process.env.NODE_ENV === 'development') {
  if (!isSupabaseConfigured) {
    console.warn('⚠️ Supabase not configured - using fallback data')
    console.warn('   To enable Supabase:')
    console.warn('   1. Run: setup-env.cmd (in this folder)')
    console.warn('   2. Or create .env file with REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY')
    console.warn('   3. Get credentials from: https://app.supabase.com → Settings → API')
  } else {
    console.log('✅ Supabase environment variables loaded successfully')
  }
}

// Create a mock client that doesn't make network requests when not configured
let supabaseClient;

if (isSupabaseConfigured) {
  // Create real client only when properly configured
  supabaseClient = createClient(supabaseUrl, supabaseKey)
  
  // Test connection on startup (only in development)
  if (process.env.NODE_ENV === 'development') {
    supabaseClient.from('projects').select('id').limit(1)
      .then(({ error }) => {
        if (error) {
          console.warn('⚠️ Supabase connection test:', error.message)
        } else {
          console.log('✅ Supabase connection successful!')
        }
      })
      .catch((err) => {
        console.warn('⚠️ Could not test Supabase connection:', err.message)
      })
  }
} else {
  // Create a mock client that returns empty results without making network requests
  supabaseClient = {
    from: () => ({
      select: () => ({
        order: () => ({
          limit: () => Promise.resolve({ data: [], error: null })
        }),
        limit: () => Promise.resolve({ data: [], error: null })
      }),
      insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      update: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      delete: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
    })
  }
}

export const supabase = supabaseClient


