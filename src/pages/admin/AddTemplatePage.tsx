
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getCategories } from '@/services/categories';
import { createTemplate } from '@/services/templates';
import { Loader } from 'lucide-react';
import { Template } from '@/types/templates';

const AddTemplatePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });
  
  const createTemplateMutation = useMutation({
    mutationFn: createTemplate,
    onSuccess: () => {
      toast({
        title: "Template created",
        description: "Your new template has been created successfully.",
      });
      navigate('/admin/templates');
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create template: ${error.message}`,
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
    
    const templateData = {
      title,
      description,
      category_id: categoryId || null,
      thumbnail,
      demo_url: demoUrl,
      github_url: githubUrl,
      download_url: downloadUrl,
      status: status as 'draft' | 'published',
      tags: tagsArray,
    };
    
    createTemplateMutation.mutate(templateData);
  };
  
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-orbitron text-2xl font-bold">Add New Template</h1>
          <p className="text-muted-foreground">Create a new website template</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="cyber-panel p-6">
            <h2 className="font-orbitron text-xl font-medium mb-6">Template Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter template title"
                  required
                  className="bg-cyber-light border-cyber-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full bg-cyber-light border border-cyber-border rounded-md p-2 text-sm focus:outline-none focus:border-neon-blue"
                >
                  <option value="">Select a category</option>
                  {categories.map((category: any) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter template description"
                  required
                  className="min-h-[100px] bg-cyber-light border-cyber-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail URL *</Label>
                <Input
                  id="thumbnail"
                  type="url"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  required
                  className="bg-cyber-light border-cyber-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="React, Tailwind CSS, Dark Mode"
                  className="bg-cyber-light border-cyber-border"
                />
              </div>
            </div>
          </div>
          
          <div className="cyber-panel p-6">
            <h2 className="font-orbitron text-xl font-medium mb-6">URLs & Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="demoUrl">Demo URL</Label>
                <Input
                  id="demoUrl"
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://example.com/demo"
                  className="bg-cyber-light border-cyber-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input
                  id="githubUrl"
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username/repo"
                  className="bg-cyber-light border-cyber-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="downloadUrl">Download URL</Label>
                <Input
                  id="downloadUrl"
                  type="url"
                  value={downloadUrl}
                  onChange={(e) => setDownloadUrl(e.target.value)}
                  placeholder="https://example.com/download"
                  className="bg-cyber-light border-cyber-border"
                />
              </div>
            </div>
          </div>
          
          <div className="cyber-panel p-6">
            <h2 className="font-orbitron text-xl font-medium mb-6">Publishing</h2>
            
            <div className="space-y-4">
              <Label>Status</Label>
              <RadioGroup value={status} onValueChange={setStatus} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="draft" id="draft" />
                  <Label htmlFor="draft" className="cursor-pointer">Draft</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="published" id="published" />
                  <Label htmlFor="published" className="cursor-pointer">Published</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/templates')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || createTemplateMutation.isPending}>
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Create Template'
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddTemplatePage;
