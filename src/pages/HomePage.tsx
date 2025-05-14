
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowDown, Layers, Flame, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { TemplateCard, Template } from '@/components/template-card';

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
  }
];

const categories = [
  { id: "1", name: "Admin Dashboard", count: 24, icon: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3" },
  { id: "2", name: "Portfolio", count: 18, icon: "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3" },
  { id: "3", name: "E-Commerce", count: 15, icon: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3" },
  { id: "4", name: "Blog", count: 12, icon: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3" }
];

const HomePage = () => {
  const [trendingTemplates, setTrendingTemplates] = useState<Template[]>([]);
  const [recentTemplates, setRecentTemplates] = useState<Template[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from API
    setTrendingTemplates(sampleTemplates.slice(0, 3)); // First 3 templates as trending
    setRecentTemplates(sampleTemplates.slice(3)); // Last 3 as recently added
  }, []);

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
                  <Button size="lg" className="cyber-button bg-neon-blue hover:bg-neon-blue/90 text-black font-medium">
                    Browse Templates
                  </Button>
                  <Button size="lg" variant="outline" className="cyber-button">
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
                    src="https://images.unsplash.com/photo-1555066932-e78dd8fb77bb?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3" 
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
              {trendingTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
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
              {categories.map((category) => (
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
              ))}
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
              {recentTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
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
              <Button size="lg" className="cyber-button bg-neon-purple hover:bg-neon-purple/90 text-white font-medium">
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
