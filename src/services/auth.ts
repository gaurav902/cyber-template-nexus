
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

// Initialize the admin user if it doesn't exist
export async function initializeAdminUser() {
  try {
    const { data, error } = await supabase.auth.admin.listUsers();
    
    if (error) throw error;
    
    const adminExists = data.users?.some(user => {
      const userMetadata = user.user_metadata as Record<string, any>;
      return userMetadata?.email === 'admin@admin.com';
    });
    
    if (!adminExists) {
      const { error } = await supabase.auth.admin.createUser({
        email: "admin@admin.com",
        password: "admin123",
        email_confirm: true,
        user_metadata: { role: "admin" }
      });
      
      if (error) console.error("Error creating admin user:", error);
    }
  } catch (error) {
    console.error("Error checking for admin user:", error);
  }
}
