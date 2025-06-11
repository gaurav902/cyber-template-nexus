
import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow, TableHeader, TableHead, TableBody, Table } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader, Edit, Eye, ChevronUp, ChevronDown, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fetchTemplates, updateTemplate } from '@/services/templates';
import { Template } from '@/types/templates';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const TrendingPage = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
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
      // Sort by views (highest first)
      const sortedTemplates = [...data].sort((a, b) => (b.views || 0) - (a.views || 0));
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
          <h1 className="text-3xl font-bold tracking-tight">Trending Templates</h1>
          <p className="text-muted-foreground">
            View and manage your most popular templates based on view count.
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
                <TableHead>
                  <div className="flex items-center">
                    Views
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
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
                      <div className="font-mono text-md">{template.views || 0}</div>
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
          Trending templates are ordered by total view count. The most viewed templates appear at the top.
        </div>
      </div>
    </AdminLayout>
  );
};

export default TrendingPage;
