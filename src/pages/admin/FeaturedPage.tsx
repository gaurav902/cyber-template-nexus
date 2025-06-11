import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow, TableHeader, TableHead, TableBody, Table } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Star, Loader, Edit, Eye, Search, StarOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fetchTemplates, updateTemplate } from '@/services/templates';
import { Creation } from '@/types/templates';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const FeaturedPage = () => {
  const [templates, setTemplates] = useState<Creation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const data = await fetchTemplates();
      // Let's assume featured items are those with higher ratings
      const sortedTemplates = [...data].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      setTemplates(sortedTemplates);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load templates",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatured = async (template: Creation) => {
    try {
      // Here we're using the rating to represent if a template is featured
      // A better approach would be to add a "featured" boolean field in the database
      const newRating = template.rating ? 0 : 5; // Toggle between 5 (featured) and 0 (not featured)
      
      await updateTemplate(template.id, { 
        rating: newRating 
      } as Creation);
      
      setTemplates(templates.map(t => 
        t.id === template.id ? { ...t, rating: newRating } : t
      ));
      
      toast({
        title: newRating === 5 ? "Template Featured" : "Template Unfeatured",
        description: `"${template.title}" is now ${newRating === 5 ? 'featured' : 'no longer featured'}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update template status",
        variant: "destructive",
      });
    }
  };

  const filteredTemplates = templates.filter((template) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      template.title.toLowerCase().includes(searchLower) ||
      template.description.toLowerCase().includes(searchLower) ||
      (template.category_name && template.category_name.toLowerCase().includes(searchLower)) ||
      (template.tags && template.tags.some(tag => tag.toLowerCase().includes(searchLower)))
    );
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Featured Templates</h1>
          <p className="text-muted-foreground">
            Manage which templates are featured on your website.
          </p>
        </div>

        <div className="cyber-panel p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              className="pl-9 bg-cyber-light border-cyber-border"
            />
          </div>
        </div>

        <div className="bg-cyber-dark rounded-lg border border-cyber-border">
          <Table>
            <TableHeader>
              <TableRow className="border-cyber-border hover:bg-transparent">
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <Loader className="h-8 w-8 animate-spin mx-auto mb-2 text-neon-blue" />
                    <div className="text-muted-foreground">Loading templates...</div>
                  </TableCell>
                </TableRow>
              ) : filteredTemplates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <div className="text-muted-foreground">No templates found matching your search.</div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredTemplates.map((template) => (
                  <TableRow key={template.id} className="border-cyber-border">
                    <TableCell className="font-medium">{template.title}</TableCell>
                    <TableCell>{template.category_name || 'Uncategorized'}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={template.status === 'published' ? 'bg-green-500/20 text-green-400 border-green-800' : 'bg-amber-500/20 text-amber-400 border-amber-800'}
                      >
                        {template.status === 'published' ? 'Published' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFeatured(template)}
                        className={`h-8 ${template.rating > 0 ? 'text-yellow-400' : 'text-muted-foreground'}`}
                      >
                        {template.rating > 0 ? (
                          <Star className="h-5 w-5 fill-yellow-400" />
                        ) : (
                          <StarOff className="h-5 w-5" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Link to={`/templates/${template.id}`} target="_blank">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to={`/secure-panel/content/edit/${template.id}`}>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="text-center text-muted-foreground text-sm p-4">
          Click the star icon to toggle whether a template is featured on your website.
        </div>
      </div>
    </AdminLayout>
  );
};

export default FeaturedPage;
