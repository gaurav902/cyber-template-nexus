
import { supabase } from "@/integrations/supabase/client";
import { Template } from "@/types/templates";

// Fetch all templates
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
  
  // Transform the data to match our Template interface
  return (data || []).map(item => ({
    ...item,
    category_name: item.categories?.name || null
  })) as Template[];
}

// Fetch templates by category ID
export async function fetchTemplatesByCategory(categoryId: string) {
  const { data, error } = await supabase
    .from('templates')
    .select(`
      *,
      categories(name)
    `)
    .eq('category_id', categoryId)
    .eq('status', 'published')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  
  // Transform the data to match our Template interface
  return (data || []).map(item => ({
    ...item,
    category_name: item.categories?.name || null
  })) as Template[];
}

// Fetch a single template by ID
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
  
  // Transform to match Template interface
  return {
    ...data,
    category_name: data.categories?.name || null
  } as Template;
}

// Create a new template
export async function createTemplate(template: Omit<Template, 'id' | 'created_at' | 'updated_at' | 'views' | 'rating'>) {
  const { data, error } = await supabase
    .from('templates')
    .insert(template)
    .select()
    .single();
  
  if (error) throw error;
  return data as Template;
}

// Update a template
export async function updateTemplate(id: string, template: Partial<Template>) {
  const { data, error } = await supabase
    .from('templates')
    .update(template)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Template;
}

// Delete a template
export async function deleteTemplate(id: string) {
  const { error } = await supabase
    .from('templates')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

// Increment view count for a template
export async function incrementTemplateViews(id: string) {
  const { error } = await supabase
    .rpc('increment_template_views', { template_id: id });
  
  if (error) throw error;
  return true;
}
