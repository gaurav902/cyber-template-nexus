
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Edit, Globe, Database } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CMSDocsPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto mb-12">
          <Button variant="outline" size="sm" asChild className="mb-6">
            <Link to="/docs">← Back to Documentation</Link>
          </Button>
          
          <div className="flex items-center gap-3 mb-6">
            <FileText className="h-8 w-8 text-neon-blue" />
            <h1 className="text-3xl font-orbitron font-bold cyber-text-glow">
              CMS Integration
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground mb-8">
            Manage content with various CMS solutions integrated into your templates
          </p>

          <div className="cyber-card p-6 mb-8">
            <h2 className="text-2xl font-orbitron font-medium mb-4">Content Management Systems</h2>
            <p className="mb-4">
              Our templates support various content management systems to help you manage and update your content without coding.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="cyber-card bg-cyber-dark p-4 flex flex-col">
                <div className="mb-3 flex items-center gap-2">
                  <Database className="h-5 w-5 text-neon-blue" />
                  <h3 className="font-medium">Supabase CMS</h3>
                </div>
                <p className="text-sm text-muted-foreground flex-grow mb-4">
                  Build your own custom CMS with Supabase's database and authentication features.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/docs/supabase">
                    Learn About Supabase
                  </Link>
                </Button>
              </div>
              <div className="cyber-card bg-cyber-dark p-4 flex flex-col">
                <div className="mb-3 flex items-center gap-2">
                  <Edit className="h-5 w-5 text-neon-purple" />
                  <h3 className="font-medium">Headless CMS</h3>
                </div>
                <p className="text-sm text-muted-foreground flex-grow mb-4">
                  Connect to popular headless CMS platforms like Contentful, Sanity, or Strapi.
                </p>
                <Button variant="outline" size="sm" className="w-full" disabled>
                  Coming Soon
                </Button>
              </div>
              <div className="cyber-card bg-cyber-dark p-4 flex flex-col">
                <div className="mb-3 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-neon-green" />
                  <h3 className="font-medium">Markdown/MDX</h3>
                </div>
                <p className="text-sm text-muted-foreground flex-grow mb-4">
                  Use Markdown or MDX files for content management with Git-based workflows.
                </p>
                <Button variant="outline" size="sm" className="w-full" disabled>
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="supabase-cms">
            <TabsList className="mb-6">
              <TabsTrigger value="supabase-cms">Supabase CMS</TabsTrigger>
              <TabsTrigger value="headless">Headless CMS</TabsTrigger>
              <TabsTrigger value="markdown">Markdown/MDX</TabsTrigger>
            </TabsList>
            
            <TabsContent value="supabase-cms" className="cyber-card p-6">
              <h2 className="text-xl font-orbitron font-medium mb-4">Building a CMS with Supabase</h2>
              <p className="mb-4">
                Create a custom content management system using Supabase:
              </p>
              
              <ol className="space-y-4 mb-6">
                <li className="p-3 bg-cyber-light/20 rounded-md">
                  <strong className="text-neon-blue">Step 1:</strong> Set up content tables in your Supabase database
                </li>
                <li className="p-3 bg-cyber-light/20 rounded-md">
                  <strong className="text-neon-blue">Step 2:</strong> Create an admin interface to manage content
                </li>
                <li className="p-3 bg-cyber-light/20 rounded-md">
                  <strong className="text-neon-blue">Step 3:</strong> Implement Row Level Security (RLS) policies to control access
                </li>
                <li className="p-3 bg-cyber-light/20 rounded-md">
                  <strong className="text-neon-blue">Step 4:</strong> Use Supabase JavaScript client to fetch content for your frontend
                </li>
              </ol>
              
              <div className="bg-cyber-dark p-4 rounded-md mb-6 overflow-auto">
                <pre className="text-sm">
                  <code>
{`-- Example content tables for a blog
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  author_id UUID REFERENCES auth.users(id) NOT NULL,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  category_id UUID REFERENCES public.categories(id)
);

CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.post_tags (
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Add Row Level Security
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public access to published content
CREATE POLICY "Anyone can read published posts"
ON public.posts
FOR SELECT
USING (published = true);

CREATE POLICY "Anyone can read categories"
ON public.categories
FOR SELECT
USING (true);

CREATE POLICY "Anyone can read tags"
ON public.tags
FOR SELECT
USING (true);

CREATE POLICY "Anyone can read post_tags"
ON public.post_tags
FOR SELECT
USING (true);

-- RLS Policies for admin access (adjust this based on your admin role setup)
CREATE POLICY "Admins can manage posts"
ON public.posts
USING (auth.uid() IN (SELECT user_id FROM public.admins));`}
                  </code>
                </pre>
              </div>
              
              <p className="mb-4">
                Fetch content on the frontend:
              </p>
              
              <div className="bg-cyber-dark p-4 rounded-md overflow-auto">
                <pre className="text-sm">
                  <code>
{`import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useBlogPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select(\`
            *,
            categories:category_id (name, slug),
            tags:post_tags (
              tag_id (name, slug)
            ),
            authors:author_id (id, name, avatar_url)
          \`)
          .eq('published', true)
          .order('published_at', { ascending: false });

        if (error) throw error;
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return { posts, loading, error };
}`}
                  </code>
                </pre>
              </div>
            </TabsContent>
            
            <TabsContent value="headless" className="cyber-card p-6">
              <h2 className="text-xl font-orbitron font-medium mb-4">Integrating Headless CMS</h2>
              <p className="mb-4">
                Connect your template to a headless CMS like Contentful:
              </p>
              
              <div className="flex items-center gap-3 mb-4">
                <Edit className="h-5 w-5 text-neon-purple" />
                <h3 className="font-medium">Contentful Integration</h3>
              </div>
              
              <p className="mb-4">
                First, set up a Contentful account and create content models. Then integrate with your frontend:
              </p>
              
              <div className="bg-cyber-dark p-4 rounded-md mb-6 overflow-auto">
                <pre className="text-sm">
                  <code>
{`// Example integration with Contentful
import { createClient } from 'contentful';

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Fetch blog posts
export async function getBlogPosts() {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'blogPost',
      order: '-sys.createdAt',
    });

    return response.items.map(item => ({
      id: item.sys.id,
      title: item.fields.title,
      slug: item.fields.slug,
      content: item.fields.content,
      excerpt: item.fields.excerpt,
      featuredImage: item.fields.featuredImage?.fields?.file?.url,
      createdAt: item.sys.createdAt,
      author: item.fields.author?.fields,
      category: item.fields.category?.fields,
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Fetch a single blog post by slug
export async function getBlogPostBySlug(slug) {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
    });

    if (!response.items.length) {
      return null;
    }

    const item = response.items[0];
    return {
      id: item.sys.id,
      title: item.fields.title,
      slug: item.fields.slug,
      content: item.fields.content,
      excerpt: item.fields.excerpt,
      featuredImage: item.fields.featuredImage?.fields?.file?.url,
      createdAt: item.sys.createdAt,
      author: item.fields.author?.fields,
      category: item.fields.category?.fields,
    };
  } catch (error) {
    console.error(\`Error fetching blog post with slug "\${slug}":, error);
    return null;
  }
}`}
                  </code>
                </pre>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <Edit className="h-5 w-5 text-neon-green" />
                <h3 className="font-medium">Sanity Integration</h3>
              </div>
              
              <p className="mb-4">
                Another popular headless CMS option is Sanity:
              </p>
              
              <div className="bg-cyber-dark p-4 rounded-md overflow-auto">
                <pre className="text-sm">
                  <code>
{`// Example integration with Sanity
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2022-01-01',
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}

// Fetch blog posts
export async function getBlogPosts() {
  const query = \`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    "author": author->{name, image},
    "categories": categories[]->
  }\`;

  try {
    const posts = await sanityClient.fetch(query);
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Fetch a single blog post by slug
export async function getBlogPostBySlug(slug) {
  const query = \`*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    body,
    excerpt,
    publishedAt,
    "author": author->{name, image},
    "categories": categories[]->
  }\`;

  try {
    const post = await sanityClient.fetch(query, { slug });
    return post;
  } catch (error) {
    console.error(\`Error fetching blog post with slug "\${slug}":, error);
    return null;
  }
}`}
                  </code>
                </pre>
              </div>
            </TabsContent>
            
            <TabsContent value="markdown" className="cyber-card p-6">
              <h2 className="text-xl font-orbitron font-medium mb-4">Markdown/MDX Content Management</h2>
              <p className="mb-4">
                Use Markdown or MDX files for a Git-based content workflow:
              </p>
              
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-5 w-5 text-neon-green" />
                <h3 className="font-medium">Setting up MDX</h3>
              </div>
              
              <p className="mb-6">
                First, install the necessary packages and set up your project to support MDX:
              </p>
              
              <div className="bg-cyber-dark p-4 rounded-md mb-6 overflow-auto">
                <pre className="text-sm">
                  <code>
{`// Example: Reading MDX files from the filesystem
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from 'rehype-prism-plus';

const contentDirectory = path.join(process.cwd(), 'content');

// Get all post slugs
export function getPostSlugs() {
  return fs.readdirSync(contentDirectory);
}

// Get post data by slug
export async function getPostBySlug(slug) {
  const filePath = path.join(contentDirectory, \`\${slug}.mdx\`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  // Parse front matter
  const { data, content } = matter(fileContents);
  
  // Serialize MDX content
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypePrism],
    },
    scope: data,
  });
  
  return {
    slug,
    frontMatter: data,
    content: mdxSource,
  };
}

// Get all posts
export async function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = [];
  
  for (const slug of slugs) {
    const postSlug = slug.replace(/\\.mdx$/, '');
    const post = await getPostBySlug(postSlug);
    posts.push(post);
  }
  
  // Sort by date
  return posts.sort((a, b) => {
    return new Date(b.frontMatter.date) - new Date(a.frontMatter.date);
  });
}`}
                  </code>
                </pre>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-5 w-5 text-neon-blue" />
                <h3 className="font-medium">Rendering MDX Content</h3>
              </div>
              
              <p className="mb-4">
                Rendering the MDX content in your React components:
              </p>
              
              <div className="bg-cyber-dark p-4 rounded-md overflow-auto">
                <pre className="text-sm">
                  <code>
{`import { MDXRemote } from 'next-mdx-remote';
import { useState, useEffect } from 'react';
import { getPostBySlug } from '../lib/mdx';

// Custom components for MDX
const components = {
  h1: (props) => <h1 className="text-2xl font-bold my-4" {...props} />,
  h2: (props) => <h2 className="text-xl font-bold my-3" {...props} />,
  p: (props) => <p className="my-2" {...props} />,
  // Add more custom components as needed
};

export default function BlogPost({ slug }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      try {
        const postData = await getPostBySlug(slug);
        setPost(postData);
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <article className="prose dark:prose-invert">
      <h1>{post.frontMatter.title}</h1>
      <div className="text-sm text-gray-500">
        {new Date(post.frontMatter.date).toLocaleDateString()}
      </div>
      {post.frontMatter.tags && (
        <div className="flex gap-2 my-4">
          {post.frontMatter.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
      )}
      <MDXRemote {...post.content} components={components} />
    </article>
  );
}`}
                  </code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CMSDocsPage;
