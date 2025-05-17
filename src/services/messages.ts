
import { supabase } from '@/integrations/supabase/client';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  department?: string;
  created_at: string;
  read: boolean;
}

// Fetch all contact messages
export async function fetchContactMessages() {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    throw new Error(`Error fetching contact messages: ${error.message}`);
  }
  
  return data as ContactMessage[];
}

// Mark a message as read
export async function markMessageAsRead(messageId: string) {
  const { error } = await supabase
    .from('contact_messages')
    .update({ read: true })
    .eq('id', messageId);
    
  if (error) {
    throw new Error(`Error marking message as read: ${error.message}`);
  }
  
  return true;
}

// Delete a message
export async function deleteMessage(messageId: string) {
  const { error } = await supabase
    .from('contact_messages')
    .delete()
    .eq('id', messageId);
    
  if (error) {
    throw new Error(`Error deleting message: ${error.message}`);
  }
  
  return true;
}

// Send a contact message
export async function sendContactMessage(messageData: Omit<ContactMessage, 'id' | 'created_at' | 'read'>) {
  const { error } = await supabase
    .from('contact_messages')
    .insert([{
      ...messageData,
      read: false
    }]);
    
  if (error) {
    throw new Error(`Error sending contact message: ${error.message}`);
  }
  
  return true;
}
