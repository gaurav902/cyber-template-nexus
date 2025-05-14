import { useState, useEffect } from 'react';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { TemplateCard } from '@/components/template-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, X, Loader } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchTemplates } from '@/services/templates';
import { getCategories } from '@/services/categories';

const TemplatesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('latest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [allTags, setAllTags] = useState<string[]>([]);
  
  const { data: templates = [], isLoading: isTemplatesLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: fetchTemplates,
  });
  
  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  // Extract all unique tags from templates
  useEffect(() => {
    if (templates && templates.length > 0) {
      const tagsSet = new Set<string>();
      (templates as any[]).forEach((template) => {
        if (template.tags && Array.isArray(template.tags)) {
          template.tags.forEach((tag: string) => tagsSet.add(tag));
        }
      });
      setAllTags(Array.from(tagsSet).sort());
    }
  }, [templates]);
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedTags([]);
    setSortOption('latest');
  };
  
  // Fix the filteredTemplates to properly cast templates to an array
  const filteredTemplates = (templates as any[]).filter((template) => {
    // Filter by status - only show published templates
    if (template.status !== 'published') {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, 'i');
      if (!searchRegex.test(template.title) && !searchRegex.test(template.description)) {
        return false;
      }
    }
    
    // Filter by category
    if (selectedCategory && selectedCategory !== 'All Categories' && template.category !== selectedCategory) {
      return false;
    }
    
    // Filter by tags
    if (selectedTags.length > 0) {
      const templateTags = template.tags || [];
      if (!selectedTags.every(tag => templateTags.includes(tag))) {
        return false;
      }
    }
    
    return true;
  }).sort((a: any, b: any) => {
    // Sort
    if (sortOption === 'latest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else if (sortOption === 'popular') {
      return b.views - a.views;
    } else if (sortOption === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  const isLoading = isTemplatesLoading || isCategoriesLoading;
  
  return (
    <>
      <Navbar />
      <div className="pt-16"> {/* Padding to offset fixed navbar */}
        {/* Header */}
        <section className="bg-cyber-dark py-16 mb-8">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">Browse Templates</h1>
              <p className="text-muted-foreground">
                Explore our collection of premium website templates for your next project
              </p>
            </div>
          </div>
        </section>
        
        <div className="container mx-auto px-4 pb-20">
          {/* Search and Filter Bar */}
          <div className="cyber-panel mb-8 p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates..."
                  className="pl-9 bg-cyber-light border-cyber-border"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-cyber-light border border-cyber-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-neon-blue"
                >
                  <option value="latest">Latest</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <Button 
                  variant="outline" 
                  className="cyber-button flex items-center gap-2"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter className="h-4 w-4" />
                  <span className="hidden md:inline">Filters</span>
                </Button>
                {(selectedCategory !== 'All Categories' || selectedTags.length > 0) && (
                  <Button 
                    variant="outline" 
                    className="cyber-button flex items-center gap-2 border-neon-purple/50"
                    onClick={clearFilters}
                  >
                    <X className="h-4 w-4" />
                    <span className="hidden md:inline">Clear</span>
                  </Button>
                )}
              </div>
            </div>
            
            {/* Filter Panel */}
            {isFilterOpen && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-cyber-border">
                <div>
                  <h3 className="mb-2 font-medium">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      key="all-categories"
                      variant="outline" 
                      size="sm"
                      className={`cyber-button text-xs ${selectedCategory === 'All Categories' ? 'bg-neon-blue/20 border-neon-blue' : ''}`}
                      onClick={() => setSelectedCategory('All Categories')}
                    >
                      All Categories
                    </Button>
                    {categories.map((category: any) => (
                      <Button 
                        key={category.id}
                        variant="outline" 
                        size="sm"
                        className={`cyber-button text-xs ${selectedCategory === category.name ? 'bg-neon-blue/20 border-neon-blue' : ''}`}
                        onClick={() => setSelectedCategory(category.name)}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-medium">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <Button 
                        key={tag}
                        variant="outline" 
                        size="sm"
                        className={`cyber-button text-xs ${selectedTags.includes(tag) ? 'bg-neon-purple/20 border-neon-purple' : ''}`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Results Count */}
          <div className="mb-6 text-muted-foreground">
            Found {filteredTemplates.length} templates
          </div>
          
          {/* Templates Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader className="h-8 w-8 animate-spin text-neon-blue" />
            </div>
          ) : filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTemplates.map((template: any) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          ) : (
            <div className="cyber-panel py-16 text-center">
              <h3 className="text-xl font-orbitron mb-2">No templates found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
              <Button 
                variant="outline" 
                className="cyber-button"
                onClick={clearFilters}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TemplatesPage;
