import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, FileText, Code, HelpCircle } from 'lucide-react';

const DocumentationPage = () => {
  const navigate = useNavigate();
  
  const handleIntegrationClick = (path: string) => {
    navigate(path);
  };
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto mb-12 text-center">
          <div className="flex justify-center mb-6">
            <BookOpen className="h-12 w-12 text-neon-blue" />
          </div>
          <h1 className="text-4xl font-orbitron font-bold mb-4 cyber-text-glow">
            Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn how to use our templates and resources effectively
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24 cyber-card p-4">
              <h3 className="font-orbitron text-lg font-medium mb-4">Contents</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#getting-started" className="text-neon-blue hover:underline">Getting Started</a>
                </li>
                <li>
                  <a href="#installation" className="text-neon-blue hover:underline">Installation Guide</a>
                </li>
                <li>
                  <a href="#customization" className="text-neon-blue hover:underline">Customization</a>
                </li>
                <li>
                  <a href="#integrations" className="text-neon-blue hover:underline">Integrations</a>
                </li>
                <li>
                  <a href="#faqs" className="text-neon-blue hover:underline">FAQs</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <section id="getting-started" className="cyber-card p-6">
              <h2 className="text-2xl font-orbitron font-medium mb-4">Getting Started</h2>
              <p className="text-muted-foreground mb-4">
                Welcome to TemplateX, your source for high-quality, futuristic web templates. This guide will help you get started with using our templates in your projects.
              </p>
              <p className="mb-4">
                All our templates are designed with modern web standards in mind and come with comprehensive documentation to help you customize them to your needs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="cyber-card bg-cyber-dark p-4 flex items-start space-x-3">
                  <FileText className="h-6 w-6 text-neon-purple mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Documentation</h4>
                    <p className="text-sm text-muted-foreground">Complete guides for all templates</p>
                  </div>
                </div>
                <div className="cyber-card bg-cyber-dark p-4 flex items-start space-x-3">
                  <Code className="h-6 w-6 text-neon-green mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Code Examples</h4>
                    <p className="text-sm text-muted-foreground">Practical snippets to get started</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="installation" className="cyber-card p-6">
              <h2 className="text-2xl font-orbitron font-medium mb-4">Installation Guide</h2>
              <p className="text-muted-foreground mb-4">
                Follow these steps to install and set up your template:
              </p>
              <ol className="list-decimal list-inside space-y-3 mb-4">
                <li className="p-2 bg-cyber-light/30 rounded-md">
                  <span className="font-medium">Download</span> the template from your account dashboard
                </li>
                <li className="p-2 bg-cyber-light/30 rounded-md">
                  <span className="font-medium">Extract</span> the ZIP file to your desired location
                </li>
                <li className="p-2 bg-cyber-light/30 rounded-md">
                  <span className="font-medium">Install dependencies</span>: Run <code className="bg-cyber-dark p-1 rounded">npm install</code> or <code className="bg-cyber-dark p-1 rounded">yarn</code>
                </li>
                <li className="p-2 bg-cyber-light/30 rounded-md">
                  <span className="font-medium">Start development server</span>: Run <code className="bg-cyber-dark p-1 rounded">npm run dev</code> or <code className="bg-cyber-dark p-1 rounded">yarn dev</code>
                </li>
              </ol>
              <div className="mt-6">
                <h3 className="font-medium mb-2">System Requirements</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Node.js 16.x or later</li>
                  <li>NPM or Yarn package manager</li>
                  <li>Modern browser (Chrome, Firefox, Safari, Edge)</li>
                </ul>
              </div>
            </section>

            <section id="customization" className="cyber-card p-6">
              <h2 className="text-2xl font-orbitron font-medium mb-4">Customization</h2>
              <p className="text-muted-foreground mb-4">
                Our templates are designed to be easily customizable to match your brand and requirements.
              </p>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-cyber-border">
                  <AccordionTrigger className="text-left">Styling with Tailwind CSS</AccordionTrigger>
                  <AccordionContent>
                    Our templates use Tailwind CSS for styling. You can customize colors, spacing, and more by modifying the tailwind.config.js file. The cyberpunk theme uses custom colors that you can adjust to match your brand.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-cyber-border">
                  <AccordionTrigger className="text-left">Modifying Components</AccordionTrigger>
                  <AccordionContent>
                    Components are organized in the src/components directory. You can modify existing components or create new ones to extend functionality. Each component is designed to be modular and reusable.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-cyber-border">
                  <AccordionTrigger className="text-left">Adding New Pages</AccordionTrigger>
                  <AccordionContent>
                    To add new pages, create new components in the src/pages directory and add routes in the App.tsx file. Each page should follow the existing pattern with appropriate layout and styling.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-cyber-border">
                  <AccordionTrigger className="text-left">Customizing Data</AccordionTrigger>
                  <AccordionContent>
                    Replace sample data with your own by modifying the API calls or static data files. Templates with Supabase integration allow you to connect to your own database for dynamic content.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <section id="integrations" className="cyber-card p-6">
              <h2 className="text-2xl font-orbitron font-medium mb-4">Integrations</h2>
              <p className="text-muted-foreground mb-4">
                Our templates support various integrations to extend functionality:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="cyber-card bg-cyber-dark p-4 cursor-pointer hover:border-neon-blue transition-colors" onClick={() => handleIntegrationClick('/docs/supabase')}>
                  <h4 className="font-medium mb-2">Supabase</h4>
                  <p className="text-sm text-muted-foreground mb-3">Database, authentication, and storage</p>
                  <Button variant="link" className="text-neon-blue text-sm p-0 h-auto" onClick={() => handleIntegrationClick('/docs/supabase')}>
                    Learn more →
                  </Button>
                </div>
                <div className="cyber-card bg-cyber-dark p-4 cursor-pointer hover:border-neon-purple transition-colors" onClick={() => handleIntegrationClick('/docs/payments')}>
                  <h4 className="font-medium mb-2">Payment Gateways</h4>
                  <p className="text-sm text-muted-foreground mb-3">Stripe and PayPal integration</p>
                  <Button variant="link" className="text-neon-blue text-sm p-0 h-auto" onClick={() => handleIntegrationClick('/docs/payments')}>
                    Learn more →
                  </Button>
                </div>
                <div className="cyber-card bg-cyber-dark p-4 cursor-pointer hover:border-neon-green transition-colors" onClick={() => handleIntegrationClick('/docs/analytics')}>
                  <h4 className="font-medium mb-2">Analytics</h4>
                  <p className="text-sm text-muted-foreground mb-3">Google Analytics and custom tracking</p>
                  <Button variant="link" className="text-neon-blue text-sm p-0 h-auto" onClick={() => handleIntegrationClick('/docs/analytics')}>
                    Learn more →
                  </Button>
                </div>
                <div className="cyber-card bg-cyber-dark p-4 cursor-pointer hover:border-neon-pink transition-colors" onClick={() => handleIntegrationClick('/docs/cms')}>
                  <h4 className="font-medium mb-2">CMS</h4>
                  <p className="text-sm text-muted-foreground mb-3">Content management systems</p>
                  <Button variant="link" className="text-neon-blue text-sm p-0 h-auto" onClick={() => handleIntegrationClick('/docs/cms')}>
                    Learn more →
                  </Button>
                </div>
              </div>
            </section>

            <section id="faqs" className="cyber-card p-6">
              <h2 className="text-2xl font-orbitron font-medium mb-4">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq-1" className="border-cyber-border">
                  <AccordionTrigger className="text-left">Can I use these templates for commercial projects?</AccordionTrigger>
                  <AccordionContent>
                    Yes, all our templates come with a commercial license that allows you to use them in personal and commercial projects. Please refer to the license details for specific terms.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-2" className="border-cyber-border">
                  <AccordionTrigger className="text-left">Do I get access to future updates?</AccordionTrigger>
                  <AccordionContent>
                    Yes, when you purchase a template, you get access to all future updates for that template. Updates will be available in your account dashboard.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-3" className="border-cyber-border">
                  <AccordionTrigger className="text-left">How do I get support if I have issues?</AccordionTrigger>
                  <AccordionContent>
                    We offer support through our support portal and community forums. Premium templates include direct email support for faster resolution.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-4" className="border-cyber-border">
                  <AccordionTrigger className="text-left">Can I request custom modifications?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we offer custom modification services for an additional fee. Contact our support team with your requirements for a quote.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <div className="mt-10">
              <div className="border border-cyber-border rounded-lg p-6 bg-gradient-to-br from-cyber-dark to-cyber">
                <h3 className="font-orbitron text-xl mb-4">Need additional help?</h3>
                <p className="text-muted-foreground mb-6">
                  Our support team is here to help you with any questions you may have about our templates.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="cyber-button bg-neon-blue hover:bg-neon-blue/90 text-black font-medium">
                    <Link to="/connect/contact">Contact Support</Link>
                  </Button>
                  <Button variant="outline" className="cyber-button">
                    <Link to="/connect/discord">Join Discord Community</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DocumentationPage;
