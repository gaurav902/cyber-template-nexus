
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { useQuery } from '@tanstack/react-query';
import { getCategoryById } from '@/services/categories';
import { fetchTemplates } from '@/services/templates';
import { TemplateCard } from '@/components/template-card';
import { Loader, ChevronLeft } from 'lucide-react';

const CategoryDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategoryById(id as string),
    enabled: !!id
  });
  
  const { data: templates = [], isLoading: templatesLoading } = useQuery({
    queryKey: ['templates', 'category', id],
    queryFn: async () => {
      const allTemplates = await fetchTemplates({ onlyPublished: true });
      return allTemplates.filter(template => template.category_id === id);
    },
    enabled: !!id
  });
  
  const isLoading = categoryLoading || templatesLoading;
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="mb-8">
          <Link to="/categories" className="inline-flex items-center text-neon-blue hover:text-neon-blue/80">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Categories
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="h-10 w-10 animate-spin text-neon-blue" />
          </div>
        ) : category ? (
          <>
            <div className="mb-12">
              <h1 className="text-4xl font-orbitron font-bold mb-4 cyber-text-glow">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-xl text-muted-foreground max-w-3xl">
                  {category.description}
                </p>
              )}
            </div>
            
            {templates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            ) : (
              <div className="cyber-panel p-8 text-center">
                <p className="text-lg mb-4">No Designs found in this category</p>
                <Link to="/templates" className="text-neon-blue hover:underline">
                  Browse all Designs
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="cyber-panel p-8 text-center">
            <p className="text-lg mb-4">Category not found</p>
            <Link to="/categories" className="text-neon-blue hover:underline">
              Back to categories
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoryDetailPage;
