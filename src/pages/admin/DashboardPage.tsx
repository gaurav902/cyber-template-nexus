
import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileTemplate, Layers, BarChart3 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface StatsData {
  templates_count: number;
  categories_count: number;
  template_views: number;
  unique_visitors: number;
}

const DashboardPage = () => {
  const [stats, setStats] = useState<StatsData>({
    templates_count: 0,
    categories_count: 0,
    template_views: 0,
    unique_visitors: 0
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchStats() {
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

        const totalViews = templates?.reduce((sum, template) => sum + (template.views || 0), 0) || 0;

        if (templatesError || categoriesError || viewsError) {
          throw new Error('Error fetching dashboard data');
        }

        setStats({
          templates_count: templatesCount || 0,
          categories_count: categoriesCount || 0,
          template_views: totalViews,
          unique_visitors: Math.floor(totalViews * 0.7) // Simulating unique visitors as 70% of views
        });
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [toast]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your templates and website traffic.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="cyber-card bg-cyber-dark border-cyber-border shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Templates
              </CardTitle>
              <CardDescription>
                Available templates in your collection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-cyber-light/30 rounded-md">
                  <FileTemplate className="h-6 w-6 text-neon-blue" />
                </div>
                <div className="text-2xl font-bold">
                  {loading ? '...' : stats.templates_count}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cyber-card bg-cyber-dark border-cyber-border shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Views
              </CardTitle>
              <CardDescription>
                Combined views across all templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-cyber-light/30 rounded-md">
                  <BarChart3 className="h-6 w-6 text-neon-green" />
                </div>
                <div className="text-2xl font-bold">
                  {loading ? '...' : stats.template_views}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cyber-card bg-cyber-dark border-cyber-border shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Categories
              </CardTitle>
              <CardDescription>
                Template categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-cyber-light/30 rounded-md">
                  <Layers className="h-6 w-6 text-neon-purple" />
                </div>
                <div className="text-2xl font-bold">
                  {loading ? '...' : stats.categories_count}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cyber-card bg-cyber-dark border-cyber-border shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Unique Visitors
              </CardTitle>
              <CardDescription>
                Estimated unique visitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-cyber-light/30 rounded-md">
                  <Users className="h-6 w-6 text-neon-pink" />
                </div>
                <div className="text-2xl font-bold">
                  {loading ? '...' : stats.unique_visitors}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
