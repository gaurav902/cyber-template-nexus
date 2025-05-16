
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { BookOpen, Lightbulb, Zap, Code, HelpCircle, BarChart, Settings, Server, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const HelpCenterPage = () => {
  const helpCategories = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of using HTR templates',
      icon: BookOpen,
      links: [
        { title: 'Installation Guide', href: '/get-started' },
        { title: 'Template Structure', href: '/docs' },
        { title: 'First Steps Tutorial', href: '/get-started' }
      ]
    },
    {
      title: 'Customization',
      description: 'Make the templates your own',
      icon: Lightbulb,
      links: [
        { title: 'Styling Guide', href: '/docs' },
        { title: 'Component Customization', href: '/docs' },
        { title: 'Adding Custom Functionality', href: '/support/help-center/custom-functionality' }
      ]
    },
    {
      title: 'Performance',
      description: 'Optimize your application',
      icon: Zap,
      links: [
        { title: 'Optimizing Template Performance', href: '/support/help-center/optimizing-performance' },
        { title: 'Reducing Bundle Size', href: '/docs' },
        { title: 'Performance Monitoring', href: '/docs/analytics' }
      ]
    },
    {
      title: 'Integrations',
      description: 'Connect with external services',
      icon: Code,
      links: [
        { title: 'Authentication Setup', href: '/docs/supabase' },
        { title: 'Database Connection', href: '/docs/supabase' },
        { title: 'API Integration', href: '/docs' }
      ]
    },
    {
      title: 'Troubleshooting',
      description: 'Solve common issues',
      icon: HelpCircle,
      links: [
        { title: 'Common Errors', href: '/support/faqs' },
        { title: 'Build Problems', href: '/support/faqs' },
        { title: 'API Troubleshooting', href: '/support/faqs' }
      ]
    },
    {
      title: 'Deployment',
      description: 'Launch your application',
      icon: Server,
      links: [
        { title: 'Deployment Options', href: '/docs' },
        { title: 'Environment Setup', href: '/docs' },
        { title: 'Production Checklist', href: '/docs' }
      ]
    },
    {
      title: 'Monitoring',
      description: 'Track application metrics',
      icon: BarChart,
      links: [
        { title: 'Analytics Setup', href: '/docs/analytics' },
        { title: 'User Tracking', href: '/docs/analytics' },
        { title: 'Performance Metrics', href: '/docs/analytics' }
      ]
    },
    {
      title: 'Advanced Configuration',
      description: 'Expert-level settings',
      icon: Settings,
      links: [
        { title: 'Environment Variables', href: '/docs' },
        { title: 'Build Configuration', href: '/docs' },
        { title: 'Security Settings', href: '/docs' }
      ]
    }
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto mb-12 text-center">
          <div className="w-16 h-16 bg-neon-purple/10 text-neon-purple rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-orbitron font-bold mb-4 cyber-text-glow">Help Center</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to your questions and learn how to get the most out of HTR templates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {helpCategories.map((category, index) => (
            <div key={index} className="cyber-panel p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-neon-blue/10 text-neon-blue flex items-center justify-center mr-4">
                  <category.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-orbitron text-xl font-medium">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </div>
              <ul className="space-y-2 pl-14">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.href} 
                      className="text-neon-blue hover:underline flex items-center"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="cyber-panel p-8 mb-12 bg-gradient-to-br from-cyber-dark to-cyber">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 rounded-full bg-neon-green/20 text-neon-green flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-orbitron font-medium mb-3 text-center md:text-left">Can't find what you're looking for?</h3>
              <p className="text-muted-foreground mb-6">
                Our support team is ready to assist you with any questions or issues you may encounter. 
                Contact us through your preferred support channel and we'll get back to you as soon as possible.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link to="/support" className="cyber-button bg-neon-blue hover:bg-neon-blue/90 text-black px-4 py-2 rounded">
                  Support Options
                </Link>
                <Link to="/connect/contact" className="cyber-button bg-neon-purple hover:bg-neon-purple/90 text-white px-4 py-2 rounded">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HelpCenterPage;
