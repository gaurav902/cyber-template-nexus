import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { TemplateCard } from '@/components/template-card';
import { ArrowRight, Star, Eye, Github, Code, Palette, Zap, Shield, Layers, Sparkles } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchTemplates } from '@/services/templates';
import { Creation } from '@/types/templates';

const HomePage = () => {
  const [featuredTemplates, setFeaturedTemplates] = useState<Creation[]>([]);
  const { data: templates, isLoading, error } = useQuery({
    queryKey: ['templates'],
    queryFn: () => fetchTemplates({ onlyPublished: true }),
  });

  useEffect(() => {
    if (templates) {
      // Assuming templates are already sorted by rating in the backend
      const featured = templates.filter((template) => template.rating > 3).slice(0, 3);
      setFeaturedTemplates(featured);
    }
  }, [templates]);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-cyber-dark py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="font-orbitron text-4xl md:text-5xl font-bold mb-6 cyber-text-glow">
                  Unlock Your Web Potential
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Discover high-quality website templates to kickstart your projects.
                </p>
                <Button asChild className="cyber-button bg-neon-blue hover:bg-neon-blue/90 text-black font-medium">
                  <Link to="/templates">
                    Browse Templates <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
              <div className="flex justify-center">
                <img
                  src="/hero-image.svg"
                  alt="Website Templates"
                  className="max-w-md rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Templates */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-orbitron text-3xl font-bold mb-8 text-center">
              Featured Templates
            </h2>
            {isLoading ? (
              <div className="text-center">Loading featured templates...</div>
            ) : error ? (
              <div className="text-center text-red-500">Error loading templates.</div>
            ) : featuredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            ) : (
              <div className="text-center">No featured templates found.</div>
            )}
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-cyber-dark py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-orbitron text-3xl font-bold mb-8 text-center">
              Explore Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Example Categories - Replace with dynamic data if available */}
              <Link to="/templates?category=Portfolio" className="cyber-panel p-4 text-center hover:shadow-md transition-shadow duration-300">
                <Palette className="mx-auto h-6 w-6 text-neon-blue mb-2" />
                <h3 className="font-medium">Portfolio</h3>
                <p className="text-sm text-muted-foreground">Showcase your work.</p>
              </Link>
              <Link to="/templates?category=E-commerce" className="cyber-panel p-4 text-center hover:shadow-md transition-shadow duration-300">
                <Zap className="mx-auto h-6 w-6 text-neon-green mb-2" />
                <h3 className="font-medium">E-commerce</h3>
                <p className="text-sm text-muted-foreground">Sell your products online.</p>
              </Link>
              <Link to="/templates?category=Blog" className="cyber-panel p-4 text-center hover:shadow-md transition-shadow duration-300">
                <Code className="mx-auto h-6 w-6 text-neon-yellow mb-2" />
                <h3 className="font-medium">Blog</h3>
                <p className="text-sm text-muted-foreground">Share your thoughts and ideas.</p>
              </Link>
              <Link to="/templates?category=Landing Page" className="cyber-panel p-4 text-center hover:shadow-md transition-shadow duration-300">
                <Layers className="mx-auto h-6 w-6 text-neon-purple mb-2" />
                <h3 className="font-medium">Landing Page</h3>
                <p className="text-sm text-muted-foreground">Capture leads and promote your product.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-orbitron text-3xl font-bold mb-8 text-center">
              Why Choose Our Templates?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="cyber-panel p-4 text-center">
                <Sparkles className="mx-auto h-6 w-6 text-neon-blue mb-2" />
                <h3 className="font-medium">High-Quality Designs</h3>
                <p className="text-sm text-muted-foreground">Professionally crafted templates.</p>
              </div>
              <div className="cyber-panel p-4 text-center">
                <Shield className="mx-auto h-6 w-6 text-neon-green mb-2" />
                <h3 className="font-medium">Secure & Reliable</h3>
                <p className="text-sm text-muted-foreground">Safe and dependable templates.</p>
              </div>
              <div className="cyber-panel p-4 text-center">
                <Github className="mx-auto h-6 w-6 text-neon-yellow mb-2" />
                <h3 className="font-medium">Easy Customization</h3>
                <p className="text-sm text-muted-foreground">Customize to fit your brand.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
