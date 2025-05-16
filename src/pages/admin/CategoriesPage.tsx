
import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Plus, Edit, Trash2, Loader, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCategories, createCategory, updateCategory, deleteCategory, Category } from '@/services/categories';

const CategoriesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  
  const createMutation = useMutation({
    mutationFn: ({ name, description, imageUrl }: { name: string, description: string, imageUrl: string }) => {
      // In a real implementation, we'd pass the image URL to the backend
      // For now, we'll just simulate it
      return createCategory(name, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Category created",
        description: "The category has been successfully created.",
      });
      resetForm();
      setIsAddDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create category: ${error.message}`,
        variant: "destructive",
      });
    },
  });
  
  const updateMutation = useMutation({
    mutationFn: ({ id, name, description, imageUrl }: { id: string, name: string, description: string, imageUrl: string }) => {
      // In a real implementation, we'd pass the image URL to the backend
      return updateCategory(id, { name, description });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Category updated",
        description: "The category has been successfully updated.",
      });
      resetForm();
      setIsEditDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update category: ${error.message}`,
        variant: "destructive",
      });
    },
  });
  
  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Category deleted",
        description: "The category has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete category: ${error.message}`,
        variant: "destructive",
      });
    },
  });
  
  const resetForm = () => {
    setCategoryName('');
    setCategoryDescription('');
    setCategoryImage('');
    setCurrentCategoryId(null);
  };
  
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryName.trim()) {
      createMutation.mutate({ 
        name: categoryName, 
        description: categoryDescription,
        imageUrl: categoryImage
      });
    }
  };
  
  const handleUpdateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCategoryId && categoryName.trim()) {
      updateMutation.mutate({
        id: currentCategoryId,
        name: categoryName,
        description: categoryDescription,
        imageUrl: categoryImage
      });
    }
  };
  
  const handleEditClick = (category: Category) => {
    setCurrentCategoryId(category.id);
    setCategoryName(category.name);
    setCategoryDescription(category.description || '');
    // In a real app, we'd fetch the image URL
    setCategoryImage('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3');
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteCategory = (id: string) => {
    if (window.confirm("Are you sure you want to delete this category? This action cannot be undone.")) {
      deleteMutation.mutate(id);
    }
  };
  
  const filteredCategories = categories.filter((category: Category) => {
    const searchRegex = new RegExp(searchQuery, 'i');
    return searchRegex.test(category.name) || 
      (category.description && searchRegex.test(category.description));
  });
  
  const placeholderImages = [
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    "https://images.unsplash.com/photo-1518770660439-4636190af475",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  ];
  
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
          <div>
            <h1 className="font-orbitron text-2xl font-bold">Categories</h1>
            <p className="text-muted-foreground">Manage template categories</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="cyber-button bg-neon-purple text-white hover:bg-neon-purple/90">
                <Plus className="mr-2 h-4 w-4" />
                Add New Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddCategory} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input 
                    id="name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                    placeholder="Category name"
                    className="bg-cyber-light border-cyber-border"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">Description</label>
                  <Textarea 
                    id="description"
                    value={categoryDescription}
                    onChange={(e) => setCategoryDescription(e.target.value)}
                    placeholder="Category description (optional)"
                    className="bg-cyber-light border-cyber-border min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="image" className="text-sm font-medium">
                    <div className="flex items-center">
                      <Image className="h-4 w-4 mr-2" />
                      Category Image URL
                    </div>
                  </label>
                  <Input 
                    id="image"
                    value={categoryImage}
                    onChange={(e) => setCategoryImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="bg-cyber-light border-cyber-border"
                  />
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground mb-2">Select a placeholder image:</p>
                    <div className="grid grid-cols-5 gap-2">
                      {placeholderImages.map((img, index) => (
                        <div 
                          key={index}
                          onClick={() => setCategoryImage(img)}
                          className={`w-full aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${categoryImage === img ? 'border-neon-blue' : 'border-transparent'}`}
                        >
                          <img 
                            src={`${img}?w=100`} 
                            alt={`Placeholder ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      'Add Category'
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="cyber-panel p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search categories..."
              className="pl-9 bg-cyber-light border-cyber-border"
            />
          </div>
        </div>
        
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdateCategory} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="edit-name" className="text-sm font-medium">Name</label>
                <Input 
                  id="edit-name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                  placeholder="Category name"
                  className="bg-cyber-light border-cyber-border"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-description" className="text-sm font-medium">Description</label>
                <Textarea 
                  id="edit-description"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  placeholder="Category description (optional)"
                  className="bg-cyber-light border-cyber-border min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-image" className="text-sm font-medium">
                  <div className="flex items-center">
                    <Image className="h-4 w-4 mr-2" />
                    Category Image URL
                  </div>
                </label>
                <Input 
                  id="edit-image"
                  value={categoryImage}
                  onChange={(e) => setCategoryImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="bg-cyber-light border-cyber-border"
                />
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-2">Select a placeholder image:</p>
                  <div className="grid grid-cols-5 gap-2">
                    {placeholderImages.map((img, index) => (
                      <div 
                        key={index}
                        onClick={() => setCategoryImage(img)}
                        className={`w-full aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${categoryImage === img ? 'border-neon-blue' : 'border-transparent'}`}
                      >
                        <img 
                          src={`${img}?w=100`} 
                          alt={`Placeholder ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {categoryImage && (
                  <div className="mt-4 p-2 border border-cyber-border rounded-md">
                    <p className="text-xs text-muted-foreground mb-2">Current image preview:</p>
                    <div className="aspect-video rounded-md overflow-hidden">
                      <img 
                        src={categoryImage}
                        alt="Category preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Category'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        
        <div className="cyber-panel">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader className="h-8 w-8 animate-spin text-neon-blue" />
            </div>
          ) : filteredCategories.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cyber-light/50">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs font-medium">Image</th>
                    <th className="text-left py-3 px-4 text-xs font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-xs font-medium">Description</th>
                    <th className="text-left py-3 px-4 text-xs font-medium">Created</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyber-border">
                  {filteredCategories.map((category: Category) => (
                    <tr key={category.id}>
                      <td className="py-3 px-4 w-16">
                        <div className="w-12 h-12 rounded-md overflow-hidden bg-cyber-light/50 flex items-center justify-center">
                          <Image className="h-6 w-6 text-muted-foreground" />
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{category.name}</div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {category.description || 'No description available'}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(category.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0 border-cyber-border hover:border-neon-green"
                            onClick={() => handleEditClick(category)}
                          >
                            <span className="sr-only">Edit</span>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0 border-cyber-border hover:border-neon-red text-neon-red hover:text-white"
                            onClick={() => handleDeleteCategory(category.id)}
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
              <p className="text-muted-foreground mb-4">No categories found.</p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                Add Category
              </Button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CategoriesPage;
