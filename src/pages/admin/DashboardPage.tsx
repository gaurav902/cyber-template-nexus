
import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, File, Layers, BarChart3, TrendingUp, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats, fetchTrendingTemplates, fetchLatestTemplates } from '@/services/dashboard';
import { Template } from '@/types/templates';

const DashboardPage = () => {
  const { toast } = useToast();
  const [trendingTemplates, setTrendingTemplates] = useState<Template[]>([]);
  const [recentTemplates, setRecentTemplates] = useState<Template[]>([]);

  // Fetch dashboard stats
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
    onError: (error) => {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    }
  });

  // Fetch trending templates
  const { isLoading: isTrendingLoading } = useQuery({
    queryKey: ['trendingTemplates'],
    queryFn: fetchTrendingTemplates,
    onSuccess: (data) => {
      setTrendingTemplates(data);
    },
    onError: (error) => {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to load trending templates",
        variant: "destructive",
      });
    }
  });

  // Fetch latest templates
  const { isLoading: isRecentLoading } = useQuery({
    queryKey: ['recentTemplates'],
    queryFn: fetchLatestTemplates,
    onSuccess: (data) => {
      setRecentTemplates(data);
    },
    onError: (error) => {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to load recent templates",
        variant: "destructive",
      });
    }
  });

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
                  <File className="h-6 w-6 text-neon-blue" />
                </div>
                <div className="text-2xl font-bold">
                  {isLoading ? '...' : stats?.templates_count}
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
                  {isLoading ? '...' : stats?.template_views}
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
                  {isLoading ? '...' : stats?.categories_count}
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
                  {isLoading ? '...' : stats?.unique_visitors}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trending Templates Section */}
        <Card className="cyber-card bg-cyber-dark border-cyber-border shadow-lg">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <div className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-neon-blue" />
                <CardTitle>Trending Templates</CardTitle>
              </div>
              <CardDescription>
                Most viewed templates on your platform
              </CardDescription>
            </div>
            <Button asChild variant="outline" size="sm" className="cyber-button">
              <Link to="/admin/trending">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {isTrendingLoading ? (
              <div className="text-center py-4">Loading trending templates...</div>
            ) : trendingTemplates.length === 0 ? (
              <div className="text-center py-4">No trending templates found</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {trendingTemplates.slice(0, 3).map((template) => (
                  <div key={template.id} className="cyber-card bg-cyber-light/10 p-4">
                    <div className="aspect-video mb-2 overflow-hidden rounded">
                      <img 
                        src={template.thumbnail} 
                        alt={template.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium mb-1 truncate">{template.title}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{template.views} views</span>
                      <Link to={`/admin/templates/edit/${template.id}`} className="text-neon-blue text-sm">
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recently Added Templates */}
        <Card className="cyber-card bg-cyber-dark border-cyber-border shadow-lg">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-neon-purple" />
                <CardTitle>Recently Added</CardTitle>
              </div>
              <CardDescription>
                Latest templates added to your platform
              </CardDescription>
            </div>
            <Button asChild variant="outline" size="sm" className="cyber-button">
              <Link to="/admin/templates">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {isRecentLoading ? (
              <div className="text-center py-4">Loading recent templates...</div>
            ) : recentTemplates.length === 0 ? (
              <div className="text-center py-4">No recent templates found</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentTemplates.slice(0, 3).map((template) => (
                  <div key={template.id} className="cyber-card bg-cyber-light/10 p-4">
                    <div className="aspect-video mb-2 overflow-hidden rounded">
                      <img 
                        src={template.thumbnail} 
                        alt={template.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium mb-1 truncate">{template.title}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {new Date(template.created_at).toLocaleDateString()}
                      </span>
                      <Link to={`/admin/templates/edit/${template.id}`} className="text-neon-blue text-sm">
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="cyber-card bg-gradient-to-br from-cyber-dark to-cyber border-cyber-border p-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-orbitron text-2xl font-bold mb-4">
              Ready to Build Something <span className="text-shimmer">Amazing</span>?
            </h2>
            <p className="text-muted-foreground mb-6">
              Explore our collection of premium templates and start building your next project today.
            </p>
            <Button asChild size="lg" className="cyber-button bg-neon-purple hover:bg-neon-purple/90 text-white font-medium">
              <Link to="/get-started">Get Started</Link>
            </Button>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
