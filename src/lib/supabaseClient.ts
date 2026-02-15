import { createClient } from '@supabase/supabase-js'

// These environment variables must be set in your .env.local file
const supabaseUrl = "https://ueqvtzvrqzscaqbwurtj.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlcXZ0enZycXpzY2FxYnd1cnRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNjEzNzAsImV4cCI6MjA4NjczNzM3MH0.B1ozjiJim39ueXKGu8xzAhPNLWix0kelgS6CNkLCZMk"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)