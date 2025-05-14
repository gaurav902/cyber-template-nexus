
import { supabase } from "@/integrations/supabase/client";
import { Template } from "@/components/template-card";

export async function getTemplates() {
  const { data, error } = await supabase
    .from('templates')
    .select(`
      *,
      categories:category_id(name)
    `)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  
  return data.map(template => ({
    ...template,
    category: template.categories?.name || 'Uncategorized'
  }));
}

export async function getTemplateById(id: string) {
  const { data, error } = await supabase
    .from('templates')
    .select(`
      *,
      categories:category_id(name)
    `)
    .eq('id', id)
    .single();
    
  if (error) throw error;
  
  return {
    ...data,
    category: data.categories?.name || 'Uncategorized'
  };
}

export async function incrementTemplateViews(id: string) {
  const { error } = await supabase.rpc('increment_template_views', {
    template_id: id
  });
  
  if (error) console.error("Error incrementing views:", error);
}

export async function createTemplate(template: Partial<Template>) {
  const { data, error } = await supabase
    .from('templates')
    .insert([template])
    .select();
    
  if (error) throw error;
  return data[0];
}

export async function updateTemplate(id: string, updates: Partial<Template>) {
  const { data, error } = await supabase
    .from('templates')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();
    
  if (error) throw error;
  return data[0];
}

export async function deleteTemplate(id: string) {
  const { error } = await supabase
    .from('templates')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
  return true;
}

export async function getDashboardStats() {
  const { data, error } = await supabase
    .from('stats')
    .select('*')
    .order('date', { ascending: false })
    .limit(1);
    
  if (error) throw error;
  
  // If no stats exist, generate some default ones
  if (!data || data.length === 0) {
    const templatesCount = await getTemplatesCount();
    const categoriesCount = await getCategoriesCount();
    
    return {
      template_views: 0,
      unique_visitors: 0,
      templates_count: templatesCount,
      categories_count: categoriesCount
    };
  }
  
  return data[0];
}

export async function getTemplatesCount() {
  const { count, error } = await supabase
    .from('templates')
    .select('*', { count: 'exact', head: true });
    
  if (error) throw error;
  return count || 0;
}

export async function getCategoriesCount() {
  const { count, error } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true });
    
  if (error) throw error;
  return count || 0;
}

export async function getViewsData() {
  // In a real app, this would fetch actual view data per month
  // For now, we'll generate sample data
  return [
    { name: 'Jan', views: 4000 },
    { name: 'Feb', views: 3000 },
    { name: 'Mar', views: 5000 },
    { name: 'Apr', views: 4500 },
    { name: 'May', views: 7000 },
    { name: 'Jun', views: 6000 },
    { name: 'Jul', views: 8500 }
  ];
}
