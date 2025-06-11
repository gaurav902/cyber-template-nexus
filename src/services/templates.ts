
import { supabase } from "@/integrations/supabase/client";
import { Creation } from "@/types/templates";

// Fetch all creations
export async function fetchTemplates(options = { onlyPublished: false }) {
  let query = supabase.from('templates').select(`
    *,
    categories(name)
  `);
  
  if (options.onlyPublished) {
    query = query.eq('status', 'published');
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  
  // Transform the data to match our Creation interface
  return (data || []).map(item => ({
    ...item,
    category_name: item.categories?.name || null
  })) as Creation[];
}

// Fetch a single creation by ID
export async function fetchTemplateById(id: string) {
  const { data, error } = await supabase
    .from('templates')
    .select(`
      *,
      categories(name)
    `)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  
  // Transform to match Creation interface
  return {
    ...data,
    category_name: data.categories?.name || null
  } as Creation;
}

// Create a new creation
export async function createTemplate(creation: Omit<Creation, 'id' | 'created_at' | 'updated_at' | 'views' | 'rating'>) {
  const { data, error } = await supabase
    .from('templates')
    .insert(creation)
    .select()
    .single();
  
  if (error) throw error;
  return data as Creation;
}

// Update a creation
export async function updateTemplate(id: string, creation: Partial<Creation>) {
  const { data, error } = await supabase
    .from('templates')
    .update(creation)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Creation;
}

// Delete a creation
export async function deleteTemplate(id: string) {
  const { error } = await supabase
    .from('templates')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

// Increment view count for a creation
export async function incrementTemplateViews(id: string) {
  const { error } = await supabase
    .rpc('increment_template_views', { template_id: id });
  
  if (error) throw error;
  return true;
}
