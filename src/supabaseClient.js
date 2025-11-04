import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qarplahyjhdipjjqorfr.supabase.co'

const supabaseKey = process.env.REACT_APP_SUPABASE_KEY

if (!supabaseKey) {
  console.error('❌ REACT_APP_SUPABASE_KEY is missing!')
  console.error('Make sure your .env file contains: REACT_APP_SUPABASE_KEY=your_key_here')
  console.error('And restart the dev server after adding it.')
}

const supabase = createClient(supabaseUrl, supabaseKey || '')

export { supabase }


