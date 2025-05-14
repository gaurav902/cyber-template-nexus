
import { supabase } from "@/integrations/supabase/client";

// Sign in with email and password
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Get current session
export async function getCurrentSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// Get current user
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Check if admin account exists
export async function isAdminSetupNeeded() {
  try {
    const { data, error } = await supabase
      .from('admin_setup')
      .select('setup_complete')
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error("Error checking admin setup:", error);
      return true;
    }
    
    // If no record exists or setup is not complete, admin setup is needed
    return !data || !data.setup_complete;
  } catch (error) {
    console.error("Error checking admin setup:", error);
    return true; // Default to needing setup if there's an error
  }
}

// Setup admin account
export async function setupAdminAccount(email: string, password: string) {
  try {
    // Create the admin user
    const { data: userData, error: userError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role: "admin" }
      }
    });
    
    if (userError) throw userError;
    
    // Mark setup as complete
    const { error: setupError } = await supabase
      .from('admin_setup')
      .upsert({ id: 1, setup_complete: true });
    
    if (setupError) throw setupError;
    
    return userData;
  } catch (error) {
    console.error("Error setting up admin account:", error);
    throw error;
  }
}

// Initialize the admin user if it doesn't exist (for backwards compatibility)
export async function initializeAdminUser() {
  // This function is kept for backward compatibility but is no longer needed
  // as we now have the admin setup flow
  return;
}
