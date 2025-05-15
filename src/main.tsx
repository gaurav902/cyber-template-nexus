
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { supabase } from '@/integrations/supabase/client';

// Create a user with the admin email and password if it doesn't exist
// This is only for demo purposes and should not be done in a production app
async function bootstrapAdmin() {
  try {
    // Check if admin user exists
    const { data, error } = await supabase.auth.admin.signUp({
      email: 'admin@admin.com',
      password: 'admin123',
      options: {
        data: { role: 'admin' }
      }
    });
    
    if (error) {
      console.error("Error creating admin user:", error);
      return;
    }
    
    console.log("Admin user created or already exists");
  } catch (error) {
    console.error("Error bootstrapping admin:", error);
  }
}

// bootstrapAdmin(); // Uncomment this for development only

createRoot(document.getElementById("root")!).render(<App />);
