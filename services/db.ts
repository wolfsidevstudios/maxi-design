
import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
const SUPABASE_URL = 'https://dgbrdmccaxgsknluxcre.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnYnJkbWNjYXhnc2tubHV4Y3JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzg0OTAsImV4cCI6MjA3Mjg1NDQ5MH0.k7gU0a67nWOApF7DdDSH_x2Ihsy64M8ZRbby7qnrc2U';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const joinWaitlist = async (email: string): Promise<{ success: boolean; message: string }> => {
  // Simulate network delay for UX
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (!email || !email.includes('@')) {
    return { success: false, message: "Please enter a valid email address." };
  }

  try {
    // Attempt to insert into the 'waitlist' table
    const { error } = await supabase
      .from('waitlist')
      .insert([{ email, created_at: new Date().toISOString() }]);

    if (error) {
      // Handle missing table error (42P01 is PostgreSQL code for undefined_table)
      if (error.code === '42P01') {
         console.error("CRITICAL ERROR: 'waitlist' table not found. Please run the SQL script provided in 'supabase_setup.sql' in your Supabase SQL Editor.");
         return { success: false, message: "Database not configured. Admin: Run SQL script." };
      }
      // Handle duplicate email error (Supabase unique constraint 23505)
      if (error.code === '23505') {
         return { success: true, message: "You're already on the list!" };
      }
      console.error("Supabase Error:", error);
      throw error;
    }

    // Store email locally just for reference, but DOES NOT grant access
    localStorage.setItem('maxi_waitlist_email', email);
    
    return { success: true, message: "Spot secured! We'll be in touch." };

  } catch (error: any) {
    console.error(error);
    return { 
      success: false, 
      message: "Something went wrong. Please try again later." 
    };
  }
};

export const validateInviteCode = async (code: string): Promise<boolean> => {
  if (!code) return false;
  
  try {
    const { data, error } = await supabase
      .from('invite_codes')
      .select('code, is_active')
      .eq('code', code)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      return false;
    }
    
    return true;
  } catch (e) {
    console.error("Error checking invite code", e);
    return false;
  }
};

export const hasJoinedWaitlist = (): boolean => {
   // STRICT CHECK: Only return true if the 'access_granted' token is present.
   // Signing up for the waitlist is no longer enough to enter the app.
   return !!localStorage.getItem('maxi_access_granted');
};