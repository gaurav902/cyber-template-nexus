import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Plus, LayoutTemplate, FileText, Users, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Template } from '@/components/template-card';

// Sample data for charts
const viewsData = [
  { name: 'Jan', views: 4000 },
  { name: 'Feb', views: 3000 },
  { name: 'Mar', views: 5000 },
  { name: 'Apr', views: 4500 },
  { name: 'May', views: 7000 },
  { name: 'Jun', views: 6000 },
  { name: 'Jul', views: 8500 }
];

// Sample templates data
const recentTemplates = [
  {
    id: "1",
    title: "Neon Dashboard",
    description: "A futuristic dashboard template with neon accents and dark mode.",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Admin Dashboard",
    tags: ["React", "Tailwind CSS"],
    views: 1452,
    rating: 4.8,
    status: "published",
    createdAt: "2023-04-12T10:00:00Z"
  },
  {
    id: "2",
    title: "Cyber Portfolio",
    description: "A cyberpunk-themed portfolio template for developers and designers.",
    thumbnail: "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Portfolio",
    tags: ["React", "Three.js"],
    views: 876,
    rating: 4.6,
    status: "published",
    createdAt: "2023-05-28T10:00:00Z"
  },
  {
    id: "3",
    title: "E-Commerce Dark",
    description: "A modern e-commerce template with dark theme and smooth animations.",
    thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "E-Commerce",
    tags: ["React", "Next.js"],
    views: 2103,
    rating: 4.9,
    status: "draft",
    createdAt: "2023-06-15T10:00:00Z"
  }
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is logged in as admin
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
    } else {
      setIsAdmin(true);
    }
  }, [navigate]);

  if (!isAdmin) {
    return null; // Don't render anything while checking authentication
  }

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
              <div className="text-2xl font-bold mb-1">42</div>
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
              <div className="text-2xl font-bold mb-1">24,531</div>
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
              <div className="text-2xl font-bold mb-1">8</div>
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
              <div className="text-2xl font-bold mb-1">5</div>
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
                  {recentTemplates.map((template) => (
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
                        {new Date(template.createdAt).toLocaleDateString()}
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
