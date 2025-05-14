
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Template } from '@/components/template-card';
import { Eye, Star, Github, Download, ExternalLink, Copy, Link as LinkIcon } from 'lucide-react';

// Sample data - would be fetched from API in real app
const sampleTemplates: Record<string, Template> = {
  "1": {
    id: "1",
    title: "Neon Dashboard",
    description: "A futuristic dashboard template with neon accents and dark mode. Perfect for admin interfaces, SaaS applications, and monitoring dashboards. Features include customizable widgets, interactive charts, and responsive design for all screen sizes.\n\nBuilt with React and Tailwind CSS, this template includes everything you need to get started with your next admin dashboard project. The dark theme reduces eye strain and creates a sleek, modern look.",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Admin Dashboard",
    tags: ["React", "Tailwind CSS", "Dark Mode", "Charts", "Admin UI"],
    views: 1452,
    rating: 4.8,
    demoUrl: "https://example.com/demo",
    githubUrl: "https://github.com",
    createdAt: "2023-04-12T10:00:00Z"
  }
};

const TemplateDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from API
    setLoading(true);
    if (id && sampleTemplates[id]) {
      setTemplate(sampleTemplates[id]);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-16 min-h-screen flex items-center justify-center">
          <div className="cyber-panel p-8 animate-pulse">
            <p>Loading template details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!template) {
    return (
      <>
        <Navbar />
        <div className="pt-16 min-h-screen flex items-center justify-center">
          <div className="cyber-panel p-8 max-w-lg mx-auto text-center">
            <h2 className="font-orbitron text-2xl font-bold mb-4">Template Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The template you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/templates">
              <Button className="cyber-button">
                Browse Templates
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-16"> {/* Padding to offset fixed navbar */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Template Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="cyber-panel p-6">
                <h1 className="font-orbitron text-2xl font-bold mb-2">{template.title}</h1>
                <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                  <span className="flex items-center">
                    <Eye size={14} className="mr-1" /> {template.views}
                  </span>
                  <span className="flex items-center">
                    <Star size={14} className="mr-1 text-neon-green" /> {template.rating}/5
                  </span>
                </div>
                
                <Link to={`/categories/${template.category}`}>
                  <Badge variant="secondary" className="mb-4 bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue border-none">
                    {template.category}
                  </Badge>
                </Link>
                
                <Separator className="my-4 bg-cyber-border" />
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Description</h3>
                    <p className="text-muted-foreground text-sm whitespace-pre-line">
                      {template.description}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {template.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs border-cyber-border">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Added on</h3>
                    <p className="text-muted-foreground text-sm">
                      {new Date(template.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="cyber-panel p-6 space-y-4">
                <h3 className="font-orbitron font-medium">Actions</h3>
                
                <Button variant="outline" className="cyber-button w-full justify-start" asChild>
                  <a href={template.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
                
                <Button variant="outline" className="cyber-button w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
                
                <Button variant="outline" className="cyber-button w-full justify-start">
                  <Copy className="mr-2 h-4 w-4" />
                  Clone Repository
                </Button>
                
                <Button variant="outline" className="cyber-button w-full justify-start">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Share Template
                </Button>
              </div>
            </div>
            
            {/* Right Column - Preview */}
            <div className="lg:col-span-2">
              <div className="cyber-panel p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-orbitron font-medium">Live Preview</h2>
                  <a 
                    href={template.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-neon-blue text-sm flex items-center hover:underline"
                  >
                    Open in New Tab <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
                
                <div className="flex-grow cyber-border-glow rounded-md overflow-hidden">
                  {/* In a real app, this would be an iframe loading from template.demoUrl */}
                  <div className="h-full min-h-[500px] bg-cyber-dark p-4 flex items-center justify-center">
                    <div className="text-center">
                      <img 
                        src={template.thumbnail} 
                        alt={template.title}
                        className="w-full max-w-3xl rounded-md mb-4 shadow-lg"
                      />
                      <p className="text-muted-foreground">
                        This is where the interactive demo would load. <br/>
                        In a real application, an iframe would display the live template preview.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Templates */}
          <div className="mt-16">
            <h2 className="font-orbitron text-xl font-bold mb-6">Similar Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Related templates would be displayed here */}
              <div className="cyber-panel p-6 text-center flex items-center justify-center">
                <p className="text-muted-foreground">
                  Related templates would be displayed here
                </p>
              </div>
              <div className="cyber-panel p-6 text-center flex items-center justify-center">
                <p className="text-muted-foreground">
                  Related templates would be displayed here
                </p>
              </div>
              <div className="cyber-panel p-6 text-center flex items-center justify-center">
                <p className="text-muted-foreground">
                  Related templates would be displayed here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TemplateDetailPage;
