import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { TemplateCard } from '@/components/template-card';
import { Template } from '@/types/templates';
import { useQuery } from '@tanstack/react-query';
import { fetchTemplatesByCategory } from '@/services/templates';
import { getCategoryById } from '@/services/categories';

const CategoryTemplatesPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  
  const { data: category, isLoading: isCategoryLoading } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => getCategoryById(categoryId!),
    enabled: !!categoryId
  });
  
  const { data: templates = [], isLoading: isTemplatesLoading } = useQuery({
    queryKey: ['categoryTemplates', categoryId],
    queryFn: () => fetchTemplatesByCategory(categoryId!),
    enabled: !!categoryId
  });
  
  // Filter templates based on search query
  const filteredTemplates = templates.filter((template: Template) => {
    const searchRegex = new RegExp(searchQuery, 'i');
    return searchRegex.test(template.title) || 
      (template.description && searchRegex.test(template.description)) ||
      (template.tags && template.tags.some(tag => searchRegex.test(tag)));
  });
  
  // Sort templates based on selected option
  const sortedTemplates = [...filteredTemplates].sort((a: Template, b: Template) => {
    switch (sortOption) {
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'oldest':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case 'popular':
        return (b.views || 0) - (a.views || 0);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });
  
  const isLoading = isCategoryLoading || isTemplatesLoading;
  
  return (
    <>
      <Navbar />
      <div className="pt-16"> {/* Padding to offset fixed navbar */}
        <div className="container mx-auto px-4 py-12">
          <div className="mb-12">
            <Link to="/categories" className="text-neon-blue hover:underline mb-2 inline-block">
              ← Back to Categories
            </Link>
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-8 w-64 bg-cyber-light/20 rounded mb-2"></div>
                <div className="h-4 w-48 bg-cyber-light/20 rounded"></div>
              </div>
            ) : (
              <>
                <h1 className="font-orbitron text-3xl font-bold mb-2">
                  {category?.name || 'Category'} Templates
                </h1>
                <p className="text-muted-foreground">
                  {category?.description || 'Browse templates in this category'}
                </p>
              </>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search templates..."
                  className="pl-10 bg-cyber-light border-cyber-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-between cyber-button"
                  onClick={() => {
                    const options = ['newest', 'oldest', 'popular', 'rating'];
                    const currentIndex = options.indexOf(sortOption);
                    const nextIndex = (currentIndex + 1) % options.length;
                    setSortOption(options[nextIndex]);
                  }}
                >
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Sort: {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="cyber-panel animate-pulse">
                  <div className="aspect-video bg-cyber-light/20 rounded-t-lg"></div>
                  <div className="p-4">
                    <div className="h-6 bg-cyber-light/20 rounded mb-2"></div>
                    <div className="h-4 bg-cyber-light/20 rounded w-3/4 mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-cyber-light/20 rounded w-20"></div>
                      <div className="h-6 bg-cyber-light/20 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : sortedTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedTemplates.map((template: Template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          ) : (
            <div className="cyber-panel p-8 text-center">
              <h3 className="text-xl mb-2">No templates found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery 
                  ? `No results found for "${searchQuery}". Try a different search term.`
                  : 'There are no templates in this category yet.'}
              </p>
              <Button asChild variant="outline">
                <Link to="/templates">Browse All Templates</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryTemplatesPage;
