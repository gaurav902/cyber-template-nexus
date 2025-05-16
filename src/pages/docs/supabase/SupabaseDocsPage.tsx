
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Database, Key, Lock, Server } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SupabaseDocsPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto mb-12">
          <Button variant="outline" size="sm" asChild className="mb-6">
            <Link to="/docs">← Back to Documentation</Link>
          </Button>
          
          <div className="flex items-center gap-3 mb-6">
            <Database className="h-8 w-8 text-neon-blue" />
            <h1 className="text-3xl font-orbitron font-bold cyber-text-glow">
              Supabase Integration
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground mb-8">
            Learn how to use Supabase with our templates for database, authentication, and storage functionality
          </p>

          <div className="cyber-card p-6 mb-8">
            <h2 className="text-2xl font-orbitron font-medium mb-4">Getting Started with Supabase</h2>
            <p className="mb-4">
              Supabase provides a complete backend solution including database, authentication, storage, and serverless functions.
              Our templates include built-in support for Supabase, making it easy to add backend functionality to your projects.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="cyber-card bg-cyber-dark p-4 flex flex-col">
                <div className="mb-3 flex items-center gap-2">
                  <Key className="h-5 w-5 text-neon-blue" />
                  <h3 className="font-medium">Step 1: Setup</h3>
                </div>
                <p className="text-sm text-muted-foreground flex-grow">
                  Create a Supabase project and obtain your API keys
                </p>
              </div>
              <div className="cyber-card bg-cyber-dark p-4 flex flex-col">
                <div className="mb-3 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-neon-purple" />
                  <h3 className="font-medium">Step 2: Connect</h3>
                </div>
                <p className="text-sm text-muted-foreground flex-grow">
                  Connect your template to Supabase using the provided keys
                </p>
              </div>
              <div className="cyber-card bg-cyber-dark p-4 flex flex-col">
                <div className="mb-3 flex items-center gap-2">
                  <Server className="h-5 w-5 text-neon-green" />
                  <h3 className="font-medium">Step 3: Use</h3>
                </div>
                <p className="text-sm text-muted-foreground flex-grow">
                  Start using authentication, database and storage features
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="auth">
            <TabsList className="mb-6">
              <TabsTrigger value="auth">Authentication</TabsTrigger>
              <TabsTrigger value="database">Database</TabsTrigger>
              <TabsTrigger value="storage">Storage</TabsTrigger>
              <TabsTrigger value="functions">Edge Functions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="auth" className="cyber-card p-6">
              <h2 className="text-xl font-orbitron font-medium mb-4">Authentication</h2>
              <p className="mb-4">
                Supabase provides a simple way to add authentication to your project. Here's how to implement it:
              </p>
              
              <div className="bg-cyber-dark p-4 rounded-md mb-4 overflow-auto">
                <pre className="text-sm">
                  <code>
{`import { supabase } from '@/integrations/supabase/client';

// Sign up a new user
const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });
  return { data, error };
};

// Sign in an existing user
const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
};

// Sign out
const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};
`}
                  </code>
                </pre>
              </div>
            </TabsContent>
            
            <TabsContent value="database" className="cyber-card p-6">
              <h2 className="text-xl font-orbitron font-medium mb-4">Database</h2>
              <p className="mb-4">
                Access and manipulate your data with Supabase's powerful PostgreSQL database:
              </p>
              
              <div className="bg-cyber-dark p-4 rounded-md mb-4 overflow-auto">
                <pre className="text-sm">
                  <code>
{`import { supabase } from '@/integrations/supabase/client';

// Fetch all items from a table
const fetchItems = async () => {
  const { data, error } = await supabase
    .from('your_table')
    .select('*');
  return { data, error };
};

// Insert a new item
const insertItem = async (item) => {
  const { data, error } = await supabase
    .from('your_table')
    .insert(item)
    .select();
  return { data, error };
};

// Update an item
const updateItem = async (id, updates) => {
  const { data, error } = await supabase
    .from('your_table')
    .update(updates)
    .eq('id', id)
    .select();
  return { data, error };
};

// Delete an item
const deleteItem = async (id) => {
  const { error } = await supabase
    .from('your_table')
    .delete()
    .eq('id', id);
  return { error };
};
`}
                  </code>
                </pre>
              </div>
            </TabsContent>
            
            <TabsContent value="storage" className="cyber-card p-6">
              <h2 className="text-xl font-orbitron font-medium mb-4">File Storage</h2>
              <p className="mb-4">
                Store and retrieve files with Supabase Storage:
              </p>
              
              <div className="bg-cyber-dark p-4 rounded-md mb-4 overflow-auto">
                <pre className="text-sm">
                  <code>
{`import { supabase } from '@/integrations/supabase/client';

// Upload a file
const uploadFile = async (bucket, path, file) => {
  const { data, error } = await supabase
    .storage
    .from(bucket)
    .upload(path, file);
  return { data, error };
};

// Get a public URL for a file
const getPublicUrl = (bucket, path) => {
  const { data } = supabase
    .storage
    .from(bucket)
    .getPublicUrl(path);
  return data.publicUrl;
};

// Download a file
const downloadFile = async (bucket, path) => {
  const { data, error } = await supabase
    .storage
    .from(bucket)
    .download(path);
  return { data, error };
};

// Delete a file
const deleteFile = async (bucket, path) => {
  const { error } = await supabase
    .storage
    .from(bucket)
    .remove([path]);
  return { error };
};
`}
                  </code>
                </pre>
              </div>
            </TabsContent>
            
            <TabsContent value="functions" className="cyber-card p-6">
              <h2 className="text-xl font-orbitron font-medium mb-4">Edge Functions</h2>
              <p className="mb-4">
                Deploy serverless functions for backend logic with Supabase Edge Functions:
              </p>
              
              <div className="bg-cyber-dark p-4 rounded-md mb-4 overflow-auto">
                <pre className="text-sm">
                  <code>
{`import { supabase } from '@/integrations/supabase/client';

// Call an edge function
const callFunction = async (functionName, payload) => {
  const { data, error } = await supabase
    .functions
    .invoke(functionName, {
      body: payload
    });
  return { data, error };
};

// Example usage
const sendEmail = async (to, subject, content) => {
  return await callFunction('send-email', {
    to,
    subject,
    content
  });
};
`}
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

export default SupabaseDocsPage;
