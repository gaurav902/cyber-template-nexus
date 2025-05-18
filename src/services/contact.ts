
import { supabase } from "@/integrations/supabase/client";

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  department?: string;
  read?: boolean;
  created_at?: string;
}

export async function submitContactMessage(message: ContactMessage) {
  console.log("Submitting contact message:", message);
  
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([message])
    .select();
    
  if (error) {
    console.error("Error submitting contact message:", error);
    throw error;
  }
  
  console.log("Contact message submitted successfully:", data);
  return data[0];
}

export async function getContactMessages() {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
}

export async function getUnreadMessagesCount() {
  const { count, error } = await supabase
    .from('contact_messages')
    .select('*', { count: 'exact', head: true })
    .eq('read', false);
    
  if (error) throw error;
  return count || 0;
}

export async function markMessageAsRead(id: string) {
  const { error } = await supabase
    .from('contact_messages')
    .update({ read: true })
    .eq('id', id);
    
  if (error) throw error;
  return true;
}

export async function deleteMessage(id: string) {
  const { error } = await supabase
    .from('contact_messages')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
  return true;
}
