
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Database, Key, Shield, Server, Users, FileCheck, Table } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SupabaseDocsPage = () => {
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
              <div className="w-10 h-10 mr-4 flex items-center justify-center bg-emerald-500/20 rounded-md">
                <Database className="h-6 w-6 text-emerald-400" />
              </div>
              <h1 className="text-3xl font-orbitron font-bold">
                Supabase Integration
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Database, authentication, storage, and serverless functions
            </p>
          </div>

          <div className="space-y-12">
            <div className="cyber-panel p-6">
              <h2 className="text-xl font-orbitron font-medium mb-4">Overview</h2>
              <p className="mb-4">
                All HTR templates come with built-in Supabase integration, providing you with a powerful backend infrastructure for your web applications. Supabase is an open-source Firebase alternative that provides all the backend features you need.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start p-3 bg-cyber-light/30 rounded-md">
                  <Database className="h-5 w-5 text-emerald-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">PostgreSQL Database</h3>
                    <p className="text-sm text-muted-foreground">
                      Full-featured relational database with real-time capabilities
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-cyber-light/30 rounded-md">
                  <Shield className="h-5 w-5 text-emerald-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      Secure user authentication with multiple providers
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-cyber-light/30 rounded-md">
                  <FileCheck className="h-5 w-5 text-emerald-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Storage</h3>
                    <p className="text-sm text-muted-foreground">
                      Store and serve user-generated content and files
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-cyber-light/30 rounded-md">
                  <Server className="h-5 w-5 text-emerald-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Edge Functions</h3>
                    <p className="text-sm text-muted-foreground">
                      Serverless functions for custom backend logic
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-orbitron font-medium mb-4">Getting Started</h2>
              <div className="cyber-panel p-6 space-y-4">
                <p>
                  To use Supabase with HTR templates, follow these steps:
                </p>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground mb-4">
                  <li>
                    <span className="text-white font-medium">Create a Supabase account</span>: 
                    Visit <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">supabase.com</a> and sign up for an account
                  </li>
                  <li>
                    <span className="text-white font-medium">Create a new project</span>: 
                    Set up a new project in the Supabase dashboard
                  </li>
                  <li>
                    <span className="text-white font-medium">Get your API keys</span>: 
                    Find your project URL and anon key in the API settings
                  </li>
                  <li>
                    <span className="text-white font-medium">Configure your template</span>: 
                    Add your Supabase URL and anon key to your HTR template's environment variables
                  </li>
                </ol>
                <div className="bg-cyber-dark p-4 rounded-md border border-cyber-border">
                  <p className="text-sm text-muted-foreground mb-2">Example .env configuration:</p>
                  <pre className="font-mono text-xs text-emerald-400 overflow-x-auto">
                    <code>
                      VITE_SUPABASE_URL=https://your-project.supabase.co<br />
                      VITE_SUPABASE_ANON_KEY=your-anon-key
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-orbitron font-medium mb-4">Database Integration</h2>
              <div className="cyber-panel p-6 space-y-4">
                <p className="mb-2">
                  HTR templates use the Supabase JavaScript client to interact with your database. Here's a basic example:
                </p>
                <div className="bg-cyber-dark p-4 rounded-md border border-cyber-border mb-4">
                  <pre className="font-mono text-xs text-emerald-400 overflow-x-auto">
                    <code>
{`// Fetch data from a table
import { supabase } from '@/integrations/supabase/client';

async function fetchItems() {
  const { data, error } = await supabase
    .from('items')
    .select('*');
    
  if (error) throw error;
  return data;
}

// Insert data into a table
async function addItem(item) {
  const { data, error } = await supabase
    .from('items')
    .insert([item])
    .select();
    
  if (error) throw error;
  return data[0];
}`}
                    </code>
                  </pre>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <Table className="h-5 w-5 text-emerald-400" />
                  <h3 className="font-medium">Table Design Tips</h3>
                </div>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Use UUIDs for primary keys when possible</li>
                  <li>Add created_at and updated_at timestamp fields to most tables</li>
                  <li>Implement Row Level Security (RLS) for data protection</li>
                  <li>Use foreign key constraints to maintain data integrity</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-orbitron font-medium mb-4">Authentication</h2>
              <div className="cyber-panel p-6 space-y-4">
                <p>
                  HTR templates include pre-configured authentication hooks to work with Supabase Auth. Here are the key features:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <div className="flex items-start p-3 bg-cyber-light/30 rounded-md">
                    <Users className="h-5 w-5 text-emerald-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Multiple Auth Providers</h3>
                      <p className="text-sm text-muted-foreground">
                        Email/password, Google, GitHub, and more
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start p-3 bg-cyber-light/30 rounded-md">
                    <Key className="h-5 w-5 text-emerald-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">Token Management</h3>
                      <p className="text-sm text-muted-foreground">
                        Automatic JWT handling and refresh
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-cyber-dark p-4 rounded-md border border-cyber-border mb-4">
                  <pre className="font-mono text-xs text-emerald-400 overflow-x-auto">
                    <code>
{`// Sign up a new user
import { supabase } from '@/integrations/supabase/client';

async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

// Sign in a user
async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

// Sign out
async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}`}
                    </code>
                  </pre>
                </div>
                <p className="text-muted-foreground text-sm">
                  Check out the full authentication documentation on the <a href="https://supabase.com/docs/guides/auth" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">Supabase website</a>.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 p-6 cyber-panel bg-gradient-to-br from-cyber-dark to-cyber">
            <h3 className="text-xl font-orbitron font-medium mb-4">Advanced Supabase Features</h3>
            <p className="mb-6 text-muted-foreground">
              Our templates support advanced Supabase features that can help you build complex applications:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-cyber-light/20 rounded-md">
                <h4 className="font-medium mb-2">Realtime Subscriptions</h4>
                <p className="text-sm text-muted-foreground">
                  Subscribe to database changes and update your UI in real-time.
                </p>
              </div>
              <div className="p-4 bg-cyber-light/20 rounded-md">
                <h4 className="font-medium mb-2">Row Level Security</h4>
                <p className="text-sm text-muted-foreground">
                  Fine-grained access control at the row level for database tables.
                </p>
              </div>
              <div className="p-4 bg-cyber-light/20 rounded-md">
                <h4 className="font-medium mb-2">Storage Buckets</h4>
                <p className="text-sm text-muted-foreground">
                  Store and retrieve user files with access controls.
                </p>
              </div>
              <div className="p-4 bg-cyber-light/20 rounded-md">
                <h4 className="font-medium mb-2">Database Functions</h4>
                <p className="text-sm text-muted-foreground">
                  Create custom PostgreSQL functions for complex operations.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Button className="cyber-button bg-emerald-500/90 hover:bg-emerald-500 text-black font-medium">
                <a href="https://supabase.com/docs" target="_blank" rel="noopener noreferrer">
                  View Full Supabase Documentation
                </a>
              </Button>
            </div>
          </div>
          
          <div className="mt-12 mb-6 flex justify-between items-center">
            <Link to="/docs" className="text-neon-blue hover:underline inline-flex items-center">
              ← Back to Documentation
            </Link>
            <Link to="/docs/payments" className="text-neon-blue hover:underline inline-flex items-center">
              Payment Gateways →
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SupabaseDocsPage;
