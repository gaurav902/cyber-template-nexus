
import { useState } from 'react';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/services/categories';
import { Link } from 'react-router-dom';
import { Loader, FolderIcon, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const CategoriesListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const filteredCategories = categories.filter((category) => {
    const searchRegex = new RegExp(searchQuery, 'i');
    return searchRegex.test(category.name) || 
      (category.description && searchRegex.test(category.description));
  });

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-orbitron font-bold mb-4 cyber-text-glow">
            Designs Categories
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse Designs by category to find the perfect match for your project
          </p>
        </div>

        <div className="max-w-lg mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search categories..."
              className="pl-10 bg-cyber-light border-cyber-border text-lg py-6"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="h-10 w-10 animate-spin text-neon-blue" />
          </div>
        ) : filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <Link 
                key={category.id} 
                to={`/categories/${category.id}`}
                className="cyber-panel p-6 hover:border-neon-blue/70 transition duration-300"
              >
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  {category.image_url ? (
                    <img 
                      src={category.image_url} 
                      alt={category.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&auto=format';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-cyber-light flex items-center justify-center">
                      <FolderIcon className="h-16 w-16 text-neon-blue/30" />
                    </div>
                  )}
                </div>
                <div className="flex items-center mb-3">
                  <FolderIcon className="h-5 w-5 text-neon-blue mr-2" />
                  <h3 className="font-orbitron text-lg font-medium">{category.name}</h3>
                </div>
                {category.description && (
                  <p className="text-muted-foreground mb-3">{category.description}</p>
                )}
                <div className="text-sm text-neon-blue/80 font-medium">
                  Browse Designs →
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No categories found</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoriesListPage;
