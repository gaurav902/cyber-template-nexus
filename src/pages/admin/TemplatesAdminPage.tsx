import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow, TableHeader, TableHead, TableBody, Table } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Eye, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fetchTemplates, deleteTemplate, updateTemplate } from '@/services/templates';
import { Creation } from '@/types/templates';

const TemplatesAdminPage = () => {
  const [templates, setTemplates] = useState<Creation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const data = await fetchTemplates();
      setTemplates(data);
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

  const handlePublishToggle = async (template: Creation) => {
    try {
      const newStatus = template.status === 'published' ? 'draft' : 'published';
      await updateTemplate(template.id, { 
        status: newStatus 
      } as Creation);
      
      setTemplates(templates.map(t => 
        t.id === template.id ? { ...t, status: newStatus } : t
      ));
      
      toast({
        title: `Template ${newStatus === 'published' ? 'Published' : 'Unpublished'}`,
        description: `"${template.title}" is now ${newStatus}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update template status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (template: Creation) => {
    if (confirm(`Are you sure you want to delete "${template.title}"?`)) {
      try {
        await deleteTemplate(template.id);
        setTemplates(templates.filter(t => t.id !== template.id));
        toast({
          title: "Template Deleted",
          description: `"${template.title}" has been deleted.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete template",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
            <p className="text-muted-foreground">
              Manage your website templates.
            </p>
          </div>
          <Link to="/secure-panel/content/new">
            <Button className="cyber-button bg-neon-blue hover:bg-neon-blue/90 text-black font-medium">
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          </Link>
        </div>

        <div className="bg-cyber-dark rounded-lg border border-cyber-border">
          <Table>
            <TableHeader>
              <TableRow className="border-cyber-border hover:bg-transparent">
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Loading templates...
                  </TableCell>
                </TableRow>
              ) : templates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No templates found. Create your first template!
                  </TableCell>
                </TableRow>
              ) : (
                templates.map((template) => (
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
                    <TableCell>{template.views || 0}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePublishToggle(template)}
                        className="bg-cyber-light border-cyber-border text-sm"
                      >
                        {template.status === 'published' ? 'Unpublish' : 'Publish'}
                      </Button>
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
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 text-muted-foreground hover:text-red-500"
                        onClick={() => handleDelete(template)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TemplatesAdminPage;
