
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Plus, LayoutTemplate, FileText, Users, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getTemplates, getDashboardStats, getViewsData } from '@/services/templates';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { data: templates = [], isLoading: isTemplatesLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: getTemplates,
  });
  
  const { data: stats = {}, isLoading: isStatsLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardStats,
  });
  
  const { data: viewsData = [], isLoading: isViewsLoading } = useQuery({
    queryKey: ['viewsData'],
    queryFn: getViewsData,
  });
  
  // Get recent templates only
  const recentTemplates = templates.slice(0, 3);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
          <div>
            <h1 className="font-orbitron text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back to your admin panel</p>
          </div>
          <Button className="cyber-button bg-neon-purple text-white hover:bg-neon-purple/90" asChild>
            <Link to="/admin/templates/add">
              <Plus className="mr-2 h-4 w-4" />
              Add New Template
            </Link>
          </Button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="cyber-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{stats.templates_count || 0}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-neon-green">↑ 8%</span> from last month
              </p>
            </CardContent>
            <CardFooter className="pt-0 pb-2">
              <LayoutTemplate className="h-4 w-4 text-muted-foreground" />
            </CardFooter>
          </Card>
          
          <Card className="cyber-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{stats.template_views || 0}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-neon-blue">↑ 12%</span> from last month
              </p>
            </CardContent>
            <CardFooter className="pt-0 pb-2">
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardFooter>
          </Card>
          
          <Card className="cyber-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{stats.categories_count || 0}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-neon-purple">New:</span> AI/ML
              </p>
            </CardContent>
            <CardFooter className="pt-0 pb-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardFooter>
          </Card>
          
          <Card className="cyber-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Draft Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">
                {templates.filter((t: any) => t.status === 'draft').length}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-neon-green">3</span> ready for review
              </p>
            </CardContent>
            <CardFooter className="pt-0 pb-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardFooter>
          </Card>
        </div>
        
        {/* Chart */}
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="font-orbitron">Views Over Time</CardTitle>
            <CardDescription>Template views for the past 7 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={viewsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                  <XAxis dataKey="name" stroke="#8E9196" />
                  <YAxis stroke="#8E9196" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F1F1F',
                      border: '1px solid #2A2A2A',
                      borderRadius: '0.375rem'
                    }} 
                    labelStyle={{ color: "#FFF" }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#1EAEDB" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Templates */}
        <Card className="cyber-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-orbitron">Recently Added Templates</CardTitle>
              <Button variant="link" className="text-neon-blue p-0 h-auto" asChild>
                <Link to="/admin/templates" className="flex items-center">
                  View All <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cyber-light/50">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs font-medium">Template</th>
                    <th className="text-left py-3 px-4 text-xs font-medium">Category</th>
                    <th className="text-left py-3 px-4 text-xs font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-xs font-medium">Views</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyber-border">
                  {recentTemplates.map((template: any) => (
                    <tr key={template.id}>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded overflow-hidden">
                            <img 
                              src={template.thumbnail} 
                              alt={template.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{template.title}</p>
                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {template.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{template.category}</td>
                      <td className="py-3 px-4">
                        <Badge variant={template.status === 'published' ? 'default' : 'secondary'} className={`${
                          template.status === 'published' ? 'bg-neon-green/20 text-neon-green hover:bg-neon-green/30' : 'bg-muted text-muted-foreground'
                        } border-none`}>
                          {template.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(template.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-sm">{template.views}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="outline" size="sm" asChild className="h-8 border-cyber-border hover:border-neon-blue">
                            <Link to={`/admin/templates/edit/${template.id}`}>Edit</Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild className="h-8 border-cyber-border hover:border-neon-purple">
                            <Link to={`/templates/${template.id}`}>View</Link>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {recentTemplates.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-muted-foreground">
                        No templates found. <Link to="/admin/templates/add" className="text-neon-blue hover:underline">Add your first template</Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
