import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Link as RouterLink } from 'react-router-dom';
import { Rocket, Code, Layout, Users, Database } from 'lucide-react';

const GetStartedPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto mb-12 text-center">
          <div className="flex justify-center mb-6">
            <Rocket className="h-12 w-12 text-neon-purple" />
          </div>
          <h1 className="text-4xl font-orbitron font-bold mb-4 cyber-text-glow">
            Get Started with HACK THE ROOT
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Everything you need to build your next amazing project
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button className="cyber-button bg-neon-blue hover:bg-neon-blue/90 text-black font-medium">
              <Link to="/templates">Browse Designs</Link>
            </Button>
            <Button className="cyber-button bg-neon-purple hover:bg-neon-purple/90 text-white font-medium">
              <Link to="/docs">Documentation</Link>
            </Button>
          </div>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-orbitron font-medium mb-6 text-center">Quick Start Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="cyber-card p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-neon-blue/20 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">1</span>
                </div>
                <h3 className="font-medium mb-2">Choose a Designs</h3>
                <p className="text-sm text-muted-foreground">
                  Browse our collection and find a Designs that suits your project needs.
                </p>
              </div>
              <div className="cyber-card p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-neon-purple/20 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">2</span>
                </div>
                <h3 className="font-medium mb-2">Download & Install</h3>
                <p className="text-sm text-muted-foreground">
                  Purchase, download, and set up your Designs with our step-by-step guide.
                </p>
              </div>
              <div className="cyber-card p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-neon-green/20 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">3</span>
                </div>
                <h3 className="font-medium mb-2">Customize</h3>
                <p className="text-sm text-muted-foreground">
                  Modify the Designs to fit your brand and add your content and features.
                </p>
              </div>
              <div className="cyber-card p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-neon-pink/20 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">4</span>
                </div>
                <h3 className="font-medium mb-2">Deploy</h3>
                <p className="text-sm text-muted-foreground">
                  Launch your project and share it with the world on your preferred hosting.
                </p>
              </div>
            </div>
            <div className="text-center">
              <Button variant="outline" className="cyber-button">
                <Link to="/docs#getting-started">View Detailed Guide</Link>
              </Button>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-orbitron font-medium mb-6 text-center">Designs Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="cyber-card p-6 flex gap-4">
                <div className="p-2 bg-cyber-light/30 rounded-md h-min">
                  <Code className="h-5 w-5 text-neon-blue" />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Modern Stack</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Built with React, TypeScript, and Tailwind CSS for a powerful and flexible development experience.
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-neon-blue rounded-full mr-2"></span>
                      React & TypeScript
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-neon-blue rounded-full mr-2"></span>
                      Tailwind CSS & Shadcn UI
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-neon-blue rounded-full mr-2"></span>
                      Vite for fast development
                    </li>
                  </ul>
                </div>
              </div>
              <div className="cyber-card p-6 flex gap-4">
                <div className="p-2 bg-cyber-light/30 rounded-md h-min">
                  <Layout className="h-5 w-5 text-neon-purple" />
                </div>
                <div>
                  <h3 className="font-medium mb-2">UI Components</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Professionally designed UI components that are ready to use and fully customizable.
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-neon-purple rounded-full mr-2"></span>
                      Responsive design
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-neon-purple rounded-full mr-2"></span>
                      Dark mode support
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-neon-purple rounded-full mr-2"></span>
                      Accessible components
                    </li>
                  </ul>
                </div>
              </div>
              <div className="cyber-card p-6 flex gap-4">
                <div className="p-2 bg-cyber-light/30 rounded-md h-min">
                  <Database className="h-5 w-5 text-neon-green" />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Backend Integration</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ready to connect with your preferred backend services and APIs.
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-neon-green rounded-full mr-2"></span>
                      Supabase integration
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-neon-green rounded-full mr-2"></span>
                      REST API examples
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-neon-green rounded-full mr-2"></span>
                      Authentication flows
                    </li>
                  </ul>
                </div>
              </div>
              <div className="cyber-card p-6 flex gap-4">
                <div className="p-2 bg-cyber-light/30 rounded-md h-min">
                  <Users className="h-5 w-5 text-neon-pink" />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Support & Community</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access to comprehensive documentation and a helpful community.
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-neon-pink rounded-full mr-2"></span>
                      Detailed documentation
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-neon-pink rounded-full mr-2"></span>
                      Community forums
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-neon-pink rounded-full mr-2"></span>
                      Premium support options
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="cyber-card p-8 bg-gradient-to-br from-cyber-dark to-cyber text-center">
            <h2 className="text-2xl font-orbitron font-medium mb-4">Ready to Build Something Amazing?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore our collection of premium Designs and start building your next project today.
            </p>
            <Button size="lg" className="cyber-button bg-neon-blue hover:bg-neon-blue/90 text-black font-medium">
              <Link to="/templates">Browse Designs</Link>
            </Button>
          </section>

          <section>
            <h2 className="text-2xl font-orbitron font-medium mb-8 text-center">Need Help Getting Started?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="cyber-card p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-cyber-light/30 rounded-full flex items-center justify-center">
                  <Code className="h-8 w-8 text-neon-blue" />
                </div>
                <h3 className="font-medium mb-2">Documentation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive guides and API references for all Designs.
                </p>
                <Button variant="outline" className="cyber-button w-full">
                  <Link to="/docs">View Docs</Link>
                </Button>
              </div>
              <div className="cyber-card p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-cyber-light/30 rounded-full flex items-center justify-center">
                  <Layout className="h-8 w-8 text-neon-purple" />
                </div>
                <h3 className="font-medium mb-2">Examples</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  View example projects built with our Designs.
                </p>
                <Button variant="outline" className="cyber-button w-full">
                  <Link to="/docs/examples">View Examples</Link>
                </Button>
              </div>
              <div className="cyber-card p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-cyber-light/30 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-neon-green" />
                </div>
                <h3 className="font-medium mb-2">Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get help from our team or community forums.
                </p>
                <Button variant="outline" className="cyber-button w-full">
                  <Link to="/support">Get Support</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GetStartedPage;

// Simple Link component wrapper for buttons
interface LinkProps {
  children: React.ReactNode;
  to: string;
  className?: string;
}

function Link({ children, to, className = "" }: LinkProps) {
  return (
    <RouterLink to={to} className={`w-full flex items-center justify-center ${className}`}>
      {children}
    </RouterLink>
  );
}
