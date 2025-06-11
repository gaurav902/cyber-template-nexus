
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { useQuery } from '@tanstack/react-query';
import { fetchTemplates } from '@/services/templates';
import { TemplateCard } from '@/components/template-card';
import { Loader, Clock } from 'lucide-react';

const LatestPage = () => {
  const { data: creations = [], isLoading } = useQuery({
    queryKey: ['templates', 'latest'],
    queryFn: async () => {
      const allCreations = await fetchTemplates({ onlyPublished: true });
      // Sort by created_at, newest first
      return allCreations.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ).slice(0, 12); // Show only the latest 12
    }
  });

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto mb-12 text-center">
          <div className="flex justify-center mb-6">
            <Clock className="h-12 w-12 text-neon-blue" />
          </div>
          <h1 className="text-4xl font-orbitron font-bold mb-4 cyber-text-glow">
            Latest Creations
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our most recently added designs for you to explore
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="h-10 w-10 animate-spin text-neon-blue" />
          </div>
        ) : creations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {creations.map((creation) => (
              <TemplateCard key={creation.id} template={creation} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No designs found</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default LatestPage;
