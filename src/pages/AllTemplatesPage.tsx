
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { useQuery } from '@tanstack/react-query';
import { fetchTemplates } from '@/services/templates';
import { TemplateCard } from '@/components/template-card';
import { Loader } from 'lucide-react';

const AllTemplatesPage = () => {
  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: () => fetchTemplates({ onlyPublished: true })
  });

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-orbitron font-bold mb-4 cyber-text-glow">
            All Templates
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse our complete collection of high-quality templates for your next project
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="h-10 w-10 animate-spin text-neon-blue" />
          </div>
        ) : templates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No templates found</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AllTemplatesPage;
