'use client';

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Template } from '@/types/templates';
import {
  Eye,
  Star,
  Github,
  Download,
  ExternalLink,
  Copy,
  Link as LinkIcon
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import {
  fetchTemplateById,
  incrementTemplateViews
} from '@/services/templates';
import { useToast } from '@/hooks/use-toast';

const TemplateDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const {
    data: template,
    isLoading,
    error
  } = useQuery({
    queryKey: ['template', id],
    queryFn: () => fetchTemplateById(id!),
    enabled: !!id
  });

  useEffect(() => {
    if (id) {
      incrementTemplateViews(id).catch(console.error);
    }
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: 'Link copied',
      description: 'Designs link copied to clipboard.'
    });
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen flex items-center justify-center">
          <div className="cyber-panel p-8 animate-pulse">
            <p>Loading Designs details...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !template) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen flex items-center justify-center">
          <div className="cyber-panel p-8 max-w-lg mx-auto text-center">
            <h2 className="font-orbitron text-2xl font-bold mb-4">Designs Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The Designs you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/templates">
              <Button className="cyber-button">Browse Designs</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel */}
            <aside className="lg:col-span-1 space-y-8">
              <section className="cyber-panel p-6">
                <h1 className="font-orbitron text-2xl font-bold mb-2">{template.title}</h1>
                <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                  <span className="flex items-center">
                    <Eye size={14} className="mr-1" /> {template.views}
                  </span>
                  <span className="flex items-center">
                    <Star size={14} className="mr-1 text-neon-green" /> {template.rating}/5
                  </span>
                </div>

                <Link to={`/templates?category=${template.category_name || ''}`}>
                  <Badge
                    variant="secondary"
                    className="mb-4 bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue border-none"
                  >
                    {template.category_name || 'Uncategorized'}
                  </Badge>
                </Link>

                <Separator className="my-4 bg-cyber-border" />

                <div className="space-y-4 text-sm">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Description</h3>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {template.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-1">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {template.tags?.map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-xs border-cyber-border">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-1">Added on</h3>
                    <p className="text-muted-foreground">
                      {new Date(template.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </section>

              {/* Actions */}
              <section className="cyber-panel p-6 space-y-4">
                <h3 className="font-orbitron font-medium">Actions</h3>

                {template.github_url && (
                  <Button variant="outline" className="cyber-button w-full justify-start" asChild>
                    <a href={template.github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View on GitHub
                    </a>
                  </Button>
                )}

                {template.download_url && (
                  <Button variant="outline" className="cyber-button w-full justify-start" asChild>
                    <a href={template.download_url} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Download Designs
                    </a>
                  </Button>
                )}

                {template.github_url && (
                  <Button
                    variant="outline"
                    className="cyber-button w-full justify-start"
                    onClick={() => {
                      navigator.clipboard.writeText(template.github_url);
                      toast({
                        title: 'Copied!',
                        description: 'GitHub repository URL copied to clipboard.'
                      });
                    }}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Clone Repository
                  </Button>
                )}

                <Button
                  variant="outline"
                  className="cyber-button w-full justify-start"
                  onClick={handleCopyLink}
                >
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Share Designs
                </Button>
              </section>
            </aside>

            {/* Right Panel */}
            <section className="lg:col-span-2">
              <div className="cyber-panel p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-orbitron font-medium">Live Preview</h2>
                  {template.demo_url && (
                    <a
                      href={template.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neon-blue text-sm flex items-center hover:underline"
                    >
                      Open in New Tab <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </div>

                <div className="flex-grow cyber-border-glow rounded-md overflow-hidden">
                  {template.demo_url ? (
                    <iframe
                      src={template.demo_url}
                      title="Live Preview"
                      className="w-full min-h-[400px] lg:min-h-[600px] border-none rounded-md"
                      allowFullScreen
                    />
                  ) : (
                    <div className="h-full min-h-[400px] bg-cyber-dark p-4 flex items-center justify-center">
                      <div className="text-center">
                        <img
                          src={template.thumbnail}
                          alt={template.title}
                          className="w-full max-w-3xl rounded-md mb-4 shadow-lg"
                        />
                        <p className="text-muted-foreground">
                          No interactive preview available for this Designs.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TemplateDetailPage;
