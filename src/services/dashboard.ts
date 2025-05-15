
import { supabase } from "@/integrations/supabase/client";

export interface DashboardStats {
  templates_count: number;
  categories_count: number;
  template_views: number;
  unique_visitors: number;
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  try {
    // Get templates count
    const { count: templatesCount, error: templatesError } = await supabase
      .from('templates')
      .select('*', { count: 'exact', head: true });

    // Get categories count
    const { count: categoriesCount, error: categoriesError } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true });

    // Get total views
    const { data: templates, error: viewsError } = await supabase
      .from('templates')
      .select('views');

    if (templatesError || categoriesError || viewsError) {
      throw new Error('Error fetching dashboard data');
    }

    const totalViews = templates?.reduce((sum, template) => sum + (template.views || 0), 0) || 0;

    return {
      templates_count: templatesCount || 0,
      categories_count: categoriesCount || 0,
      template_views: totalViews,
      unique_visitors: Math.floor(totalViews * 0.7) // Simulating unique visitors as 70% of views
    };
  } catch (error) {
    console.error('Error in fetchDashboardStats:', error);
    throw error;
  }
}

export async function updateRecentlyAddedTemplates(templateId: string): Promise<boolean> {
  try {
    // In a real app, you would update a "recently_added" flag or table
    // For now, we'll just simulate it by updating the template's created_at date
    const { error } = await supabase
      .from('templates')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', templateId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error in updateRecentlyAddedTemplates:', error);
    throw error;
  }
}

export async function fetchTrendingTemplates() {
  try {
    // Get templates sorted by views, the most viewed templates are trending
    const { data, error } = await supabase
      .from('templates')
      .select(`
        *,
        categories(name)
      `)
      .eq('status', 'published')
      .order('views', { ascending: false })
      .limit(6);

    if (error) throw error;

    // Transform the data to include category_name
    return (data || []).map(item => ({
      ...item,
      category_name: item.categories?.name || null
    }));
  } catch (error) {
    console.error('Error in fetchTrendingTemplates:', error);
    throw error;
  }
}

export async function fetchFeaturedTemplates() {
  try {
    // Get templates that have the "featured" tag
    const { data, error } = await supabase
      .from('templates')
      .select(`
        *,
        categories(name)
      `)
      .eq('status', 'published')
      .contains('tags', ['featured'])
      .order('rating', { ascending: false })
      .limit(6);

    if (error) throw error;

    // Transform the data to include category_name
    return (data || []).map(item => ({
      ...item,
      category_name: item.categories?.name || null
    }));
  } catch (error) {
    console.error('Error in fetchFeaturedTemplates:', error);
    throw error;
  }
}

export async function fetchLatestTemplates() {
  try {
    // Get the most recently created templates
    const { data, error } = await supabase
      .from('templates')
      .select(`
        *,
        categories(name)
      `)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(6);

    if (error) throw error;

    // Transform the data to include category_name
    return (data || []).map(item => ({
      ...item,
      category_name: item.categories?.name || null
    }));
  } catch (error) {
    console.error('Error in fetchLatestTemplates:', error);
    throw error;
  }
}
