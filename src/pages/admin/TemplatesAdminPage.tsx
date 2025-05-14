
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash2, Eye, Check, X, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTemplates, deleteTemplate, updateTemplate } from '@/services/templates';
import { Template } from '@/components/template-card';

const TemplatesAdminPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: getTemplates,
  });
  
  const deleteMutation = useMutation({
    mutationFn: deleteTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      toast({
        title: "Template deleted",
        description: "The template has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete template: ${error.message}`,
        variant: "destructive",
      });
    },
  });
  
  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => {
      return updateTemplate(id, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      toast({
        title: "Status updated",
        description: "The template status has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update status: ${error.message}`,
        variant: "destructive",
      });
    },
  });
  
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this template? This action cannot be undone.")) {
      deleteMutation.mutate(id);
    }
  };
  
  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    toggleStatusMutation.mutate({ id, status: newStatus });
  };
  
  const filteredTemplates = templates.filter((template: any) => {
    const searchRegex = new RegExp(searchQuery, 'i');
    return searchRegex.test(template.title) || searchRegex.test(template.description);
  });
  
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
          <div>
            <h1 className="font-orbitron text-2xl font-bold">Templates</h1>
            <p className="text-muted-foreground">Manage all website templates</p>
          </div>
          <Button className="cyber-button bg-neon-purple text-white hover:bg-neon-purple/90" asChild>
            <Link to="/admin/templates/add">
              <Plus className="mr-2 h-4 w-4" />
              Add New Template
            </Link>
          </Button>
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
        
        <div className="cyber-panel">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader className="h-8 w-8 animate-spin text-neon-blue" />
            </div>
          ) : filteredTemplates.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cyber-light/50">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs font-medium">Template</th>
                    <th className="text-left py-3 px-4 text-xs font-medium">Category</th>
                    <th className="text-left py-3 px-4 text-xs font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-medium">Views</th>
                    <th className="text-left py-3 px-4 text-xs font-medium">Rating</th>
                    <th className="text-left py-3 px-4 text-xs font-medium">Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyber-border">
                  {filteredTemplates.map((template: any) => (
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
                              {template.description.substring(0, 60)}...
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{template.category}</td>
                      <td className="py-3 px-4">
                        <Badge variant={template.status === 'published' ? 'default' : 'secondary'} className={`
                          ${template.status === 'published' ? 'bg-neon-green/20 text-neon-green hover:bg-neon-green/30' : 'bg-muted text-muted-foreground'}
                          border-none cursor-pointer
                        `} onClick={() => handleToggleStatus(template.id, template.status)}>
                          {template.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">{template.views}</td>
                      <td className="py-3 px-4 text-sm">{template.rating}</td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(template.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-cyber-border hover:border-neon-blue" asChild>
                            <Link to={`/templates/${template.id}`}>
                              <span className="sr-only">View</span>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-cyber-border hover:border-neon-green" asChild>
                            <Link to={`/admin/templates/edit/${template.id}`}>
                              <span className="sr-only">Edit</span>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-cyber-border hover:border-neon-red text-neon-red hover:text-white" 
                            onClick={() => handleDelete(template.id)}
                            disabled={deleteMutation.isPending}
                          >
                            <span className="sr-only">Delete</span>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground mb-4">No templates found.</p>
              <Button asChild>
                <Link to="/admin/templates/add">Add Template</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default TemplatesAdminPage;
