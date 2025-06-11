
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { FileText, Layout, Image, Code, PencilLine, Globe, Settings, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CMSDocsPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <Link to="/docs" className="text-neon-blue hover:underline inline-flex items-center">
              ← Back to Documentation
            </Link>
            <div className="flex items-center mt-6 mb-4">
              <div className="w-10 h-10 mr-4 flex items-center justify-center bg-rose-500/20 rounded-md">
                <FileText className="h-6 w-6 text-rose-400" />
              </div>
              <h1 className="text-3xl font-orbitron font-bold">
                CMS Integration
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Content management system options for your web applications
            </p>
          </div>

          <div className="space-y-12">
            <div className="cyber-panel p-6">
              <h2 className="text-xl font-orbitron font-medium mb-4">Overview</h2>
              <p className="mb-4">
                HTR Designs support various content management system (CMS) integrations to help you manage and update content without requiring code changes. These integrations range from headless CMS platforms to custom solutions built with Supabase.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start p-3 bg-cyber-light/30 rounded-md">
                  <Layout className="h-5 w-5 text-rose-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Page Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Create and manage pages and layouts
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-cyber-light/30 rounded-md">
                  <PencilLine className="h-5 w-5 text-rose-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Content Editing</h3>
                    <p className="text-sm text-muted-foreground">
                      Rich text editing and content creation tools
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-cyber-light/30 rounded-md">
                  <Image className="h-5 w-5 text-rose-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Media Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload and organize images and other media
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-cyber-light/30 rounded-md">
                  <Globe className="h-5 w-5 text-rose-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Multilingual Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage content in multiple languages
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-orbitron font-medium mb-4">Headless CMS Integration</h2>
              <div className="cyber-panel p-6 space-y-4">
                <p className="mb-4">
                  Headless CMS systems provide content through APIs, allowing flexibility in how you present the content in your application. HTR Designs support these popular headless CMS platforms:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-cyber-light/20 rounded-md">
                    <img 
                      src="https://images.seeklogo.com/logo-png/43/1/storyblok-logo-png_seeklogo-435514.png" 
                      alt="Storyblok" 
                      className="h-8 mb-3" 
                    />
                    <p className="text-sm text-muted-foreground mb-2">
                      Component-based headless CMS with visual editor
                    </p>
                    <a href="https://www.storyblok.com" target="_blank" rel="noopener noreferrer" className="text-rose-400 hover:underline text-xs">
                      storyblok.com
                    </a>
                  </div>
                  <div className="p-4 bg-cyber-light/20 rounded-md">
                    <img 
                      src="https://seeklogo.com/images/C/contentful-logo-C395C545BF-seeklogo.com.png" 
                      alt="Contentful" 
                      className="h-8 mb-3" 
                    />
                    <p className="text-sm text-muted-foreground mb-2">
                      API-first content infrastructure platform
                    </p>
                    <a href="https://www.contentful.com" target="_blank" rel="noopener noreferrer" className="text-rose-400 hover:underline text-xs">
                      contentful.com
                    </a>
                  </div>
                  <div className="p-4 bg-cyber-light/20 rounded-md">
                    <img 
                      src="https://thoughtoverdesign.com/wp-content/uploads/2021/05/sanity_logowhite2.png" 
                      alt="Sanity" 
                      className="h-8 mb-3" 
                    />
                    <p className="text-sm text-muted-foreground mb-2">
                      Flexible platform for structured content
                    </p>
                    <a href="https://www.sanity.io" target="_blank" rel="noopener noreferrer" className="text-rose-400 hover:underline text-xs">
                      sanity.io
                    </a>
                  </div>
                </div>
                <div className="bg-cyber-dark p-4 rounded-md border border-cyber-border">
                  <p className="text-sm text-muted-foreground mb-2">Example integration with Storyblok:</p>
                  <pre className="font-mono text-xs text-rose-400 overflow-x-auto">
                    <code>
{`// src/services/cms.ts
import StoryblokClient from 'storyblok-js-client';

const Storyblok = new StoryblokClient({
  accessToken: import.meta.env.VITE_STORYBLOK_API_KEY,
  cache: {
    clear: 'auto',
    type: 'memory'
  }
});

export async function getStory(slug: string, params = {}) {
  try {
    const { data } = await Storyblok.get(\`cdn/stories/\${slug}\`, {
      version: 'published',
      ...params
    });
    
    return data?.story;
  } catch (error) {
    console.error('Error getting story:', error);
    return null;
  }
}

export async function getStories(params = {}) {
  try {
    const { data } = await Storyblok.get('cdn/stories', {
      version: 'published',
      ...params
    });
    
    return data?.stories || [];
  } catch (error) {
    console.error('Error getting stories:', error);
    return [];
  }
}

// Usage example with React Query:
import { useQuery } from '@tanstack/react-query';
import { getStory } from '@/services/cms';

function PageContent({ slug }) {
  const { data: pageData, isLoading } = useQuery({
    queryKey: ['page', slug],
    queryFn: () => getStory(slug)
  });
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>{pageData.content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: pageData.content.body }} />
    </div>
  );
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-orbitron font-medium mb-4">Supabase as a CMS</h2>
              <div className="cyber-panel p-6 space-y-4">
                <div className="flex items-center mb-4">
                  <Database className="h-6 w-6 text-emerald-400 mr-3" />
                  <p className="text-muted-foreground text-sm">
                    Build your own custom CMS with Supabase
                  </p>
                </div>
                <p className="mb-4">
                  HTR Designs include a built-in solution for creating a custom CMS using Supabase as the backend. This approach gives you complete control over your content structure and admin interface:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-cyber-light/20 rounded-md">
                    <h4 className="font-medium mb-2">Benefits</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm text-muted-foreground">
                      <li>Full control over content structure</li>
                      <li>Custom admin interface design</li>
                      <li>No additional subscription costs</li>
                      <li>Integrated with your authentication system</li>
                      <li>Realtime updates using Supabase subscriptions</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-cyber-light/20 rounded-md">
                    <h4 className="font-medium mb-2">Implementation Steps</h4>
                    <ol className="list-decimal pl-4 space-y-1 text-sm text-muted-foreground">
                      <li>Create content tables in Supabase</li>
                      <li>Configure Row Level Security policies</li>
                      <li>Build admin interface components</li>
                      <li>Implement content fetching services</li>
                      <li>Add rich text editor integration</li>
                    </ol>
                  </div>
                </div>
                <div className="bg-cyber-dark p-4 rounded-md border border-cyber-border">
                  <p className="text-sm text-muted-foreground mb-2">Example Supabase CMS implementation:</p>
                  <pre className="font-mono text-xs text-rose-400 overflow-x-auto">
                    <code>
{`// Example SQL for content table structure
/*
CREATE TABLE pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  meta_description TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Only authenticated admin users can edit pages
CREATE POLICY "Allow admins full access" ON pages
  USING (auth.jwt() ? 'admin')
  WITH CHECK (auth.jwt() ? 'admin');
  
-- Anyone can read published pages
CREATE POLICY "Allow public to read published pages" ON pages
  FOR SELECT
  USING (published = true);
*/

// src/services/cms.ts
import { supabase } from '@/integrations/supabase/client';

export async function getPage(slug: string) {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();
    
  if (error) throw error;
  return data;
}

export async function updatePage(id: string, updates: any) {
  const { data, error } = await supabase
    .from('pages')
    .update({
      ...updates,
      updated_at: new Date()
    })
    .eq('id', id)
    .select();
    
  if (error) throw error;
  return data[0];
}

export async function createPage(page: any) {
  const { data, error } = await supabase
    .from('pages')
    .insert([{
      ...page,
      created_at: new Date(),
      updated_at: new Date()
    }])
    .select();
    
  if (error) throw error;
  return data[0];
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-orbitron font-medium mb-4">Rich Text Editing</h2>
              <div className="cyber-panel p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="h-5 w-5 text-rose-400" />
                  <h3 className="font-medium">WYSIWYG Editors</h3>
                </div>
                <p className="mb-4 text-muted-foreground">
                  HTR Designs include support for these popular rich text editors:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-cyber-light/20 rounded-md">
                    <h4 className="font-medium mb-2">TipTap</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Headless editor based on ProseMirror
                    </p>
                    <a href="https://tiptap.dev" target="_blank" rel="noopener noreferrer" className="text-rose-400 hover:underline text-xs">
                      tiptap.dev
                    </a>
                  </div>
                  <div className="p-4 bg-cyber-light/20 rounded-md">
                    <h4 className="font-medium mb-2">Slate</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Customizable framework for building rich text editors
                    </p>
                    <a href="https://docs.slatejs.org" target="_blank" rel="noopener noreferrer" className="text-rose-400 hover:underline text-xs">
                      docs.slatejs.org
                    </a>
                  </div>
                  <div className="p-4 bg-cyber-light/20 rounded-md">
                    <h4 className="font-medium mb-2">React Quill</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      React wrapper for Quill rich text editor
                    </p>
                    <a href="https://github.com/zenoamaro/react-quill" target="_blank" rel="noopener noreferrer" className="text-rose-400 hover:underline text-xs">
                      github.com/zenoamaro/react-quill
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4 mt-6">
                  <Settings className="h-5 w-5 text-rose-400" />
                  <h3 className="font-medium">Custom Components</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  HTR Designs include reusable components for building your own CMS interface, including:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Image upload and gallery components</li>
                  <li>Form builders and content editors</li>
                  <li>Dynamic layout components</li>
                  <li>Content preview tools</li>
                  <li>Publishing workflows</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 p-6 cyber-panel bg-gradient-to-br from-cyber-dark to-cyber">
            <h3 className="text-xl font-orbitron font-medium mb-4">CMS Best Practices</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Choose a CMS that matches your content complexity needs</li>
              <li>Plan your content structure carefully before implementation</li>
              <li>Implement proper content versioning and backup systems</li>
              <li>Test your CMS with content editors to ensure good UX</li>
              <li>Consider accessibility needs when building custom editors</li>
              <li>Use proper caching strategies for content delivery</li>
              <li>Implement content previews before publishing</li>
            </ul>
            <div className="flex justify-center">
              <Button className="cyber-button bg-rose-500/90 hover:bg-rose-500 text-white font-medium">
                <Link to="/support/help-center">
                  Need Help With CMS Setup?
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-12 mb-6 flex justify-between items-center">
            <Link to="/docs/analytics" className="text-neon-blue hover:underline inline-flex items-center">
              ← Analytics Integration
            </Link>
            <Link to="/docs" className="text-neon-blue hover:underline inline-flex items-center">
              Back to Documentation
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CMSDocsPage;
