
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowDown, Layers, Flame, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { TemplateCard } from '@/components/template-card';
import { Template } from '@/types/templates';
import { useQuery } from '@tanstack/react-query';
import { fetchTrendingTemplates, fetchFeaturedTemplates, fetchLatestTemplates } from '@/services/dashboard';
import { getCategories } from '@/services/categories';

const HomePage = () => {
  const navigate = useNavigate();
  
  const { data: trendingTemplates = [], isLoading: isLoadingTrending } = useQuery({
    queryKey: ['trendingTemplates'],
    queryFn: fetchTrendingTemplates,
  });
  
  const { data: recentTemplates = [], isLoading: isLoadingRecent } = useQuery({
    queryKey: ['latestTemplates'],
    queryFn: fetchLatestTemplates,
  });
  
  const { data: categoriesData = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  
  // Format categories with additional UI data
  const categories = categoriesData.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description || '',
    count: 0, // We'll need to fetch this from templates count by category
    icon: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3" // Default image
  }));

  return (
    <>
      <Navbar />
      <div className="pt-16"> {/* Padding to offset fixed navbar */}
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center bg-cyber">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.15),transparent_40%),radial-gradient(circle_at_70%_30%,rgba(30,174,219,0.15),transparent_35%)]"></div>
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block py-1 px-3 rounded-full bg-neon-blue/10 text-neon-blue text-sm mb-6 border border-neon-blue/30">
                  The Future of Web Templates
                </span>
                <h1 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  <span className="text-shimmer">Next Generation</span>
                  <br /> Website Templates
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                  Discover and explore our vast collection of futuristic, 
                  high-performance website templates designed for the modern web.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="cyber-button bg-neon-blue hover:bg-neon-blue/90 text-black font-medium"
                    onClick={() => navigate('/templates')}
                  >
                    Browse Templates
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="cyber-button"
                    onClick={() => navigate('/get-started')}
                  >
                    Learn More <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-cyber-light border border-cyber-border flex items-center justify-center text-xs">
                        {i}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    <span className="text-white">200+</span> Premium Templates
                  </span>
                </div>
              </div>
              <div className="hidden lg:block relative">
                <div className="aspect-[4/3] cyber-panel overflow-hidden cyber-purple-glow animate-float">
                  <img 
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="Dashboard Template Preview" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-40 aspect-square cyber-panel cyber-border-glow animate-pulse-slow">
                  <img 
                    src="https://images.unsplash.com/photo-1555066932-e78dd8fb77bb?q=80&w=3438&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="Code snippet" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="absolute -top-8 -right-8 w-32 aspect-square cyber-panel cyber-green-glow animate-float">
                  <img 
                    src="https://images.unsplash.com/photo-1621839673705-6617adf9e890?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="3D element" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ArrowDown className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
        </section>

        {/* Trending Templates Section */}
        <section className="py-24 bg-cyber">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center mb-2">
                  <Flame className="text-neon-purple mr-2 h-5 w-5" />
                  <h2 className="font-orbitron text-2xl font-bold">Trending Templates</h2>
                </div>
                <p className="text-muted-foreground">
                  Most popular templates this month
                </p>
              </div>
              <Link to="/templates" className="inline-flex items-center text-neon-blue hover:underline font-medium">
                View All Templates
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoadingTrending ? (
                <div className="col-span-3 text-center py-12">Loading trending templates...</div>
              ) : trendingTemplates.length > 0 ? (
                trendingTemplates.slice(0, 3).map((template: Template) => (
                  <TemplateCard key={template.id} template={template} />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">No trending templates found</div>
              )}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 bg-cyber-dark">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center mb-2">
                  <Layers className="text-neon-green mr-2 h-5 w-5" />
                  <h2 className="font-orbitron text-2xl font-bold">Browse Categories</h2>
                </div>
                <p className="text-muted-foreground">
                  Find templates by category
                </p>
              </div>
              <Link to="/categories" className="inline-flex items-center text-neon-blue hover:underline font-medium">
                View All Categories
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {isLoadingCategories ? (
                <div className="col-span-4 text-center py-12">Loading categories...</div>
              ) : categories.length > 0 ? (
                categories.slice(0, 4).map((category) => (
                  <Link key={category.id} to={`/categories/${category.id}`} className="group">
                    <div className="cyber-card overflow-hidden h-full">
                      <div className="aspect-[16/9] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-cyber to-transparent z-10"></div>
                        <img 
                          src={category.icon} 
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-orbitron font-medium group-hover:text-neon-green transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {category.count} templates
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-4 text-center py-12">No categories found</div>
              )}
            </div>
          </div>
        </section>

        {/* Recently Added Section */}
        <section className="py-24 bg-cyber">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center mb-2">
                  <Clock className="text-neon-blue mr-2 h-5 w-5" />
                  <h2 className="font-orbitron text-2xl font-bold">Recently Added</h2>
                </div>
                <p className="text-muted-foreground">
                  Fresh templates added to our collection
                </p>
              </div>
              <Link to="/templates?sort=latest" className="inline-flex items-center text-neon-blue hover:underline font-medium">
                View All Latest
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoadingRecent ? (
                <div className="col-span-3 text-center py-12">Loading recent templates...</div>
              ) : recentTemplates.length > 0 ? (
                recentTemplates.slice(0, 3).map((template: Template) => (
                  <TemplateCard key={template.id} template={template} />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">No recently added templates found</div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-cyber-dark relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(30,174,219,0.15),transparent_30%),radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.15),transparent_30%)]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-6">
                Ready to Build Something <span className="text-shimmer">Amazing</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Explore our collection of premium templates and start building your next project today.
              </p>
              <Button 
                size="lg" 
                className="cyber-button bg-neon-purple hover:bg-neon-purple/90 text-white font-medium"
                onClick={() => navigate('/get-started')}
              >
                Get Started
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
