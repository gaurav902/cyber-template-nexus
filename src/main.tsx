
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { supabase } from '@/integrations/supabase/client';

// Create a user with the admin email and password if it doesn't exist
// This is only for demo purposes and should not be done in a production app
async function bootstrapAdmin() {
  try {
    // Check if admin user exists
    const { data: { users }, error: fetchError } = await supabase.auth.admin.listUsers();
    
    if (fetchError) {
      console.error("Error checking for admin user:", fetchError);
      return;
    }
    
    // Type assertion for the entire users array
    const typedUsers = users as Array<{
      id: string;
      user_metadata: Record<string, any>;
      // Add other properties as needed
    }>;
    
    const adminExists = typedUsers?.some(user => {
      return user.user_metadata && user.user_metadata.email === 'admin@admin.com';
    });
    
    if (!adminExists) {
      // Create admin user
      await supabase.auth.admin.createUser({
        email: 'admin@admin.com',
        password: 'admin123',
        email_confirm: true,
        user_metadata: { role: 'admin' }
      });
    }
  } catch (error) {
    console.error("Error bootstrapping admin:", error);
  }
}

// bootstrapAdmin(); // Uncomment this for development only

createRoot(document.getElementById("root")!).render(<App />);
