import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://agrcbfdljxlxbpnyqchj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFncmNiZmRsanhseGJwbnlxY2hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxODMxNzIsImV4cCI6MjA1OTc1OTE3Mn0.cC05jhGNN2erhHZuX4VoDKfpkTjYkSjtX49hhWCW218'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})