
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow, TableHeader, TableHead, TableBody, Table } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Loader, TrendingUp, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fetchTemplates, updateTemplate } from '@/services/templates';
import { Template } from '@/types/templates';

const TrendingPage = () => {
  const { toast } = useToast();
  const [trendingTemplates, setTrendingTemplates] = useState<Template[]>([]);
  const [featuredTemplates, setFeaturedTemplates] = useState<Template[]>([]);
  
  const { isLoading } = useQuery({
    queryKey: ['templates', 'all'],
    queryFn: async () => {
      const allTemplates = await fetchTemplates();
      
      // Sort by views for trending
      const trending = [...allTemplates].sort((a, b) => b.views - a.views).slice(0, 10);
      setTrendingTemplates(trending);
      
      // Sort by rating for featured
      const featured = [...allTemplates].sort((a, b) => b.rating - a.rating).slice(0, 10);
      setFeaturedTemplates(featured);
      
      return { trending, featured };
    }
  });
  
  const { mutate: toggleFeatured } = useMutation({
    mutationFn: async ({ template, isFeatured }: { template: Template, isFeatured: boolean }) => {
      const tags = [...template.tags];
      
      if (isFeatured && !tags.includes('featured')) {
        tags.push('featured');
      } else if (!isFeatured && tags.includes('featured')) {
        const index = tags.indexOf('featured');
        tags.splice(index, 1);
      }
      
      return updateTemplate(template.id, { tags });
    },
    onSuccess: (_, variables) => {
      const { template, isFeatured } = variables;
      toast({
        title: isFeatured ? 'Template Featured' : 'Template Unfeatured',
        description: `"${template.title}" has been ${isFeatured ? 'added to' : 'removed from'} featured templates.`
      });
      
      // Update local state
      if (isFeatured) {
        setTrendingTemplates(prev => prev.map(t => 
          t.id === template.id ? { ...t, tags: [...t.tags, 'featured'] } : t
        ));
        setFeaturedTemplates(prev => prev.map(t => 
          t.id === template.id ? { ...t, tags: [...t.tags, 'featured'] } : t
        ));
      } else {
        setTrendingTemplates(prev => prev.map(t => {
          if (t.id === template.id) {
            return {
              ...t,
              tags: t.tags.filter(tag => tag !== 'featured')
            };
          }
          return t;
        }));
        setFeaturedTemplates(prev => prev.map(t => {
          if (t.id === template.id) {
            return {
              ...t,
              tags: t.tags.filter(tag => tag !== 'featured')
            };
          }
          return t;
        }));
      }
    },
    onError: (_, variables) => {
      toast({
        title: "Error",
        description: `Failed to update featured status for "${variables.template.title}".`,
        variant: "destructive"
      });
    }
  });
  
  const handleToggleFeatured = (template: Template) => {
    const isFeatured = !template.tags.includes('featured');
    toggleFeatured({ template, isFeatured });
  };
  
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-12">
          <Loader className="h-8 w-8 animate-spin text-neon-blue" />
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trending & Featured</h1>
          <p className="text-muted-foreground">
            Manage trending and featured templates on your website.
          </p>
        </div>
        
        <div className="space-y-6">
          <Card className="cyber-card bg-cyber-dark border-cyber-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-neon-blue" /> 
                  Trending Templates
                </CardTitle>
                <CardDescription>
                  Templates with the highest view counts are automatically listed here.
                </CardDescription>
              </div>
              <Button variant="outline" className="cyber-button">
                View Report
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-cyber-border hover:bg-transparent">
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead className="text-right">Featured</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trendingTemplates.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        No trending templates found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    trendingTemplates.map((template) => (
                      <TableRow key={template.id} className="border-cyber-border">
                        <TableCell className="font-medium">{template.title}</TableCell>
                        <TableCell>{template.category_name || 'Uncategorized'}</TableCell>
                        <TableCell>{template.views}</TableCell>
                        <TableCell className="text-right">
                          <Switch 
                            checked={template.tags.includes('featured')}
                            onCheckedChange={() => handleToggleFeatured(template)}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card className="cyber-card bg-cyber-dark border-cyber-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Star className="mr-2 h-5 w-5 text-yellow-400" /> 
                  Featured Templates
                </CardTitle>
                <CardDescription>
                  Templates marked as featured will be highlighted on the website.
                </CardDescription>
              </div>
              <Button variant="outline" className="cyber-button">
                View Analytics
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-cyber-border hover:bg-transparent">
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-right">Featured</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {featuredTemplates.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        No featured templates found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    featuredTemplates.map((template) => (
                      <TableRow key={template.id} className="border-cyber-border">
                        <TableCell className="font-medium">{template.title}</TableCell>
                        <TableCell>{template.category_name || 'Uncategorized'}</TableCell>
                        <TableCell>{template.rating}</TableCell>
                        <TableCell className="text-right">
                          <Switch 
                            checked={template.tags.includes('featured')}
                            onCheckedChange={() => handleToggleFeatured(template)}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TrendingPage;
