
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { fetchTemplates, deleteTemplate } from '@/services/templates';
import { Template } from '@/types/templates';
import { Search, Plus, Edit, Trash2, Eye, Star, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TemplatesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  const { data: templates = [], isLoading, refetch } = useQuery({
    queryKey: ['templates'],
    queryFn: fetchTemplates,
  });
  
  const handleDeleteTemplate = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this template? This action cannot be undone.')) {
      try {
        await deleteTemplate(id);
        toast({
          title: "Template deleted",
          description: "The template has been successfully deleted."
        });
        refetch();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete the template. Please try again.",
          variant: "destructive"
        });
      }
    }
  };
  
  // Filter templates based on search query
  const filteredTemplates = templates.filter((template: Template) => {
    const searchRegex = new RegExp(searchQuery, 'i');
    return searchRegex.test(template.title) || 
      (template.description && searchRegex.test(template.description)) ||
      (template.tags && template.tags.some(tag => searchRegex.test(tag)));
  });
  
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
          <div>
            <h1 className="font-orbitron text-2xl font-bold">Templates</h1>
            <p className="text-muted-foreground">Manage website templates</p>
          </div>
          <Button asChild className="cyber-button bg-neon-purple text-white hover:bg-neon-purple/90">
            <Link to="/secure-panel/content/add">
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
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-neon-blue"></div>
            </div>
          ) : filteredTemplates.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cyber-light/50">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs font-medium">Template</th>
                    <th className="text-left py-3 px-4 text-xs font-medium">Category</th>
                    <th className="text-left py-3 px-4 text-xs font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-medium">Stats</th>
                    <th className="text-left py-3 px-4 text-xs font-medium">Created</th>
                    <th className="text-right py-3 px-4 text-xs font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyber-border">
                  {filteredTemplates.map((template: Template) => (
                    <tr key={template.id}>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-md overflow-hidden bg-cyber-dark">
                            {template.thumbnail ? (
                              <img 
                                src={template.thumbnail} 
                                alt={template.title} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-cyber-light/20 flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">No image</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{template.title}</div>
                            <div className="text-xs text-muted-foreground truncate max-w-xs">
                              {template.description?.substring(0, 60)}
                              {template.description && template.description.length > 60 ? '...' : ''}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {template.category_name || 'Uncategorized'}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`
                          inline-block px-2 py-1 text-xs font-medium rounded-full
                          ${template.status === 'published' 
                            ? 'bg-neon-green/20 text-neon-green' 
                            : 'bg-amber-500/20 text-amber-500'}
                        `}>
                          {template.status === 'published' ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-3 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <Eye size={12} className="mr-1" />
                            {template.views || 0}
                          </span>
                          <span className="flex items-center">
                            <Star size={12} className="mr-1" />
                            {template.rating || 0}/5
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(template.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0 border-cyber-border"
                            asChild
                          >
                            <Link to={`/template/${template.id}`} target="_blank">
                              <span className="sr-only">View</span>
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0 border-cyber-border hover:border-neon-green"
                            asChild
                          >
                            <Link to={`/secure-panel/content/edit/${template.id}`}>
                              <span className="sr-only">Edit</span>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0 border-cyber-border hover:border-neon-red text-neon-red hover:text-white"
                            onClick={() => handleDeleteTemplate(template.id)}
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
                <Link to="/secure-panel/content/add">Add Template</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default TemplatesPage;
