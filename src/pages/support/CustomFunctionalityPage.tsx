import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { CodepenIcon, GitMerge, LayoutPanelLeft, Database, CloudLightning, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomFunctionalityPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <Link to="/support/help-center" className="text-neon-blue hover:underline inline-flex items-center">
              ← Back to Help Center
            </Link>
            <h1 className="text-3xl font-orbitron font-bold mt-6 mb-4">
              Adding Custom Functionality
            </h1>
            <div className="cyber-panel p-4 mb-6 flex items-center">
              <CodepenIcon className="h-6 w-6 text-neon-purple mr-3" />
              <p className="text-muted-foreground">
                Learn how to extend and customize HTR templates with your own functionality
              </p>
            </div>
          </div>

          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-orbitron font-medium mb-4 flex items-center">
                <GitMerge className="h-5 w-5 mr-2 text-neon-blue" />
                Component Architecture
              </h2>
              <div className="cyber-panel p-6 space-y-4">
                <p>
                  HTR templates are built with a modular component architecture that makes them easy to customize:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>All components are organized in a logical folder structure</li>
                  <li>Components are designed to be reusable and composable</li>
                  <li>TypeScript interfaces are provided for component props</li>
                  <li>Most components accept custom CSS classes for styling overrides</li>
                </ul>
                <div className="bg-cyber-dark p-4 rounded-md mt-4 font-mono text-sm">
                  <code className="text-neon-green">
                    {`// Example of extending a component
import { Button } from '@/components/ui/button';

// Creating a custom button with extended functionality
const CustomButton = ({ 
  children, 
  withIcon, 
  ...props 
}) => {
  return (
    <Button {...props}>
      {withIcon && <Icon className="mr-2" />}
      {children}
    </Button>
  );
};`}
                  </code>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-orbitron font-medium mb-4 flex items-center">
                <LayoutPanelLeft className="h-5 w-5 mr-2 text-neon-purple" />
                Adding Custom Pages
              </h2>
              <div className="cyber-panel p-6 space-y-4">
                <p>
                  Extend the template with your own pages to add new sections to your application:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Create new page components in the src/pages directory</li>
                  <li>Add routes for your new pages in App.tsx</li>
                  <li>Link to your new pages from your navigation components</li>
                  <li>Reuse existing layout components for consistent design</li>
                </ul>
                <div className="bg-cyber-dark p-4 rounded-md mt-4 font-mono text-sm">
                  <code className="text-neon-green">
                    {`// Adding a new route in App.tsx
<Routes>
  {/* Existing routes */}
  <Route path="/" element={<HomePage />} />
  
  {/* Your new custom page */}
  <Route path="/custom-feature" element={<CustomFeaturePage />} />
</Routes>

// Creating a navigation link
<Link to="/custom-feature" className="nav-link">
  Custom Feature
</Link>`}
                  </code>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-orbitron font-medium mb-4 flex items-center">
                <Database className="h-5 w-5 mr-2 text-neon-green" />
                Backend Integration
              </h2>
              <div className="cyber-panel p-6 space-y-4">
                <p>
                  Connect your template to backend services and APIs:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Templates are pre-configured for Supabase integration</li>
                  <li>Create API service files for different endpoints</li>
                  <li>Use React Query for efficient data fetching and caching</li>
                  <li>Implement proper error handling and loading states</li>
                </ul>
                <div className="bg-cyber-dark p-4 rounded-md mt-4 font-mono text-sm">
                  <code className="text-neon-green">
                    {`// Example of creating a custom API service
// src/services/customService.ts
import { supabase } from '@/integrations/supabase/client';

export async function fetchCustomData() {
  const { data, error } = await supabase
    .from('custom_table')
    .select('*')
    
  if (error) throw error;
  return data;
}

// Using the service with React Query
const { data, isLoading, error } = useQuery({
  queryKey: ['customData'],
  queryFn: fetchCustomData
});`}
                  </code>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-orbitron font-medium mb-4 flex items-center">
                <CloudLightning className="h-5 w-5 mr-2 text-neon-blue" />
                Third-Party Integrations
              </h2>
              <div className="cyber-panel p-6 space-y-4">
                <p>
                  Extend functionality with popular third-party services:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Payment processing with Stripe</li>
                  <li>Analytics with Google Analytics or Plausible</li>
                  <li>Email services like SendGrid or Mailchimp</li>
                  <li>Authentication providers (Google, Github, etc.)</li>
                </ul>
                <p className="mt-4">
                  For third-party integrations, we recommend creating separate service files and hooking them into your application through custom hooks or context providers.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-orbitron font-medium mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-neon-purple" />
                Best Practices for Custom Code
              </h2>
              <div className="cyber-panel p-6 space-y-4">
                <p>
                  Follow these guidelines to ensure your customizations are maintainable and robust:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Keep components small and focused on a single responsibility</li>
                  <li>Use TypeScript interfaces for all props and state</li>
                  <li>Implement proper error handling for API calls</li>
                  <li>Write unit tests for critical functionality</li>
                  <li>Use feature flags for experimental features</li>
                  <li>Document your custom components and hooks</li>
                </ul>
                <p className="mt-4">
                  Whenever possible, extend existing components rather than rewriting them from scratch. This makes it easier to maintain compatibility with future template updates.
                </p>
              </div>
            </section>
          </div>
          
          <div className="mt-12 p-6 cyber-panel bg-gradient-to-br from-cyber-dark to-cyber text-center">
            <h3 className="text-xl font-orbitron mb-3">Need Help With Customization?</h3>
            <p className="mb-6 text-muted-foreground">
              Our development team can assist you with custom implementations and advanced features.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/support" className="bg-neon-purple/90 hover:bg-neon-purple text-white px-6 py-2 rounded">
                Request Custom Development
              </Link>
              <Link to="/docs" className="border border-cyber-border hover:border-neon-blue px-6 py-2 rounded">
                View Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomFunctionalityPage;
