
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { TemplateCard, Template } from '@/components/template-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, X } from 'lucide-react';

// Sample data - would be fetched from API in real app
const sampleTemplates: Template[] = [
  {
    id: "1",
    title: "Neon Dashboard",
    description: "A futuristic dashboard template with neon accents and dark mode.",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Admin Dashboard",
    tags: ["React", "Tailwind CSS", "Dark Mode"],
    views: 1452,
    rating: 4.8,
    demoUrl: "https://example.com/demo",
    githubUrl: "https://github.com",
    createdAt: "2023-04-12T10:00:00Z"
  },
  {
    id: "2",
    title: "Cyber Portfolio",
    description: "A cyberpunk-themed portfolio template for developers and designers.",
    thumbnail: "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Portfolio",
    tags: ["React", "Three.js", "Animation"],
    views: 876,
    rating: 4.6,
    demoUrl: "https://example.com/demo",
    githubUrl: "https://github.com",
    createdAt: "2023-05-28T10:00:00Z"
  },
  {
    id: "3",
    title: "E-Commerce Dark",
    description: "A modern e-commerce template with dark theme and smooth animations.",
    thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "E-Commerce",
    tags: ["React", "Next.js", "Stripe"],
    views: 2103,
    rating: 4.9,
    demoUrl: "https://example.com/demo",
    githubUrl: "https://github.com",
    createdAt: "2023-06-15T10:00:00Z"
  },
  {
    id: "4",
    title: "Tech Blog",
    description: "A minimalist blog template focused on readability and tech content.",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Blog",
    tags: ["React", "MDX", "Dark Mode"],
    views: 987,
    rating: 4.5,
    demoUrl: "https://example.com/demo",
    githubUrl: "https://github.com",
    createdAt: "2023-07-03T10:00:00Z"
  },
  {
    id: "5",
    title: "AI Showcase",
    description: "A template designed for AI projects and demos with interactive elements.",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "AI/ML",
    tags: ["React", "TensorFlow.js", "API"],
    views: 1548,
    rating: 4.7,
    demoUrl: "https://example.com/demo",
    githubUrl: "https://github.com",
    createdAt: "2023-08-22T10:00:00Z"
  },
  {
    id: "6",
    title: "SaaS Landing",
    description: "A high-conversion SaaS landing page template with dark theme and CTA focus.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Landing Page",
    tags: ["React", "Animation", "CTA"],
    views: 1872,
    rating: 4.8,
    demoUrl: "https://example.com/demo",
    githubUrl: "https://github.com",
    createdAt: "2023-09-10T10:00:00Z"
  },
  {
    id: "7",
    title: "Crypto Dashboard",
    description: "A dark-themed crypto dashboard with real-time charts and data visualization.",
    thumbnail: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Admin Dashboard",
    tags: ["React", "Charts", "API"],
    views: 1345,
    rating: 4.7,
    demoUrl: "https://example.com/demo",
    githubUrl: "https://github.com",
    createdAt: "2023-10-05T10:00:00Z"
  },
  {
    id: "8",
    title: "Dark Mode Blog",
    description: "A blog template with elegant dark mode design and reading experience focus.",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Blog",
    tags: ["React", "Dark Mode", "MDX"],
    views: 763,
    rating: 4.4,
    demoUrl: "https://example.com/demo",
    githubUrl: "https://github.com",
    createdAt: "2023-11-18T10:00:00Z"
  }
];

const categories = [
  "All Categories", "Admin Dashboard", "Portfolio", "E-Commerce", 
  "Blog", "Landing Page", "AI/ML", "Documentation"
];

const tags = [
  "React", "Tailwind CSS", "Dark Mode", "Three.js", "Animation", 
  "Next.js", "Stripe", "MDX", "API", "Charts", "TensorFlow.js", "CTA"
];

const TemplatesPage = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('latest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from API
    setTemplates(sampleTemplates);
    setFilteredTemplates(sampleTemplates);
  }, []);

  useEffect(() => {
    let result = [...templates];
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        template => template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   template.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory && selectedCategory !== 'All Categories') {
      result = result.filter(template => template.category === selectedCategory);
    }
    
    // Filter by tags
    if (selectedTags.length > 0) {
      result = result.filter(template => {
        return selectedTags.every(tag => template.tags.includes(tag));
      });
    }
    
    // Sort
    if (sortOption === 'latest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortOption === 'popular') {
      result.sort((a, b) => b.views - a.views);
    } else if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredTemplates(result);
  }, [searchQuery, selectedCategory, selectedTags, sortOption, templates]);

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
                    {categories.map(category => (
                      <Button 
                        key={category}
                        variant="outline" 
                        size="sm"
                        className={`cyber-button text-xs ${selectedCategory === category ? 'bg-neon-blue/20 border-neon-blue' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-medium">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
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
          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTemplates.map(template => (
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
