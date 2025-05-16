
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { FileText, HelpCircle, BookOpen, MessageCircleQuestion } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResourcesPage = () => {
  const resources = [
    {
      title: 'Documentation',
      description: 'Comprehensive guides and reference materials for all our templates',
      icon: FileText,
      link: '/docs',
      color: 'bg-neon-blue/20 text-neon-blue'
    },
    {
      title: 'Support',
      description: 'Get help with installation, customization, and troubleshooting',
      icon: HelpCircle,
      link: '/support',
      color: 'bg-neon-purple/20 text-neon-purple'
    },
    {
      title: 'Help Center',
      description: 'Find answers to common questions about our templates and services',
      icon: BookOpen,
      link: '/support/help-center',
      color: 'bg-emerald-500/20 text-emerald-400'
    },
    {
      title: 'FAQs',
      description: 'Frequently asked questions to help you get started quickly',
      icon: MessageCircleQuestion,
      link: '/support/faqs',
      color: 'bg-amber-500/20 text-amber-400'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-orbitron font-bold mb-4 cyber-text-glow">
            Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to get the most out of our templates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {resources.map((resource, index) => (
            <Link 
              key={index} 
              to={resource.link}
              className="cyber-panel p-6 hover:border-neon-blue/70 transition-all duration-300"
            >
              <div className="flex items-start">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${resource.color}`}>
                  <resource.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-orbitron text-xl font-medium mb-2">{resource.title}</h3>
                  <p className="text-muted-foreground">{resource.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="cyber-panel p-8 mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-orbitron font-medium mb-4">Need Additional Help?</h2>
          <p className="text-muted-foreground mb-6">
            Our team is ready to assist you with any questions or concerns you may have about our templates. 
            We're here to ensure you get the most out of your purchase.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/connect/contact" className="cyber-button bg-neon-blue hover:bg-neon-blue/90 text-black px-4 py-3 rounded flex justify-center items-center">
              Contact Our Support Team
            </Link>
            <Link to="/support" className="cyber-button bg-neon-purple hover:bg-neon-purple/90 text-white px-4 py-3 rounded flex justify-center items-center">
              Visit Support Center
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResourcesPage;
