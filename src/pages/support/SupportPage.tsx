
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { HelpCircle, MessageCircle, Phone, Mail, FileText, Users } from 'lucide-react';

const SupportPage = () => {
  // WhatsApp and phone number
  const whatsappNumber = "9119295094";
  const phoneNumber = "9119295094";
  
  // Format WhatsApp URL
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello%20HTR%20Support,%20I%20need%20assistance%20with%20my%20template.`;
  
  // Format phone URL
  const phoneUrl = `tel:${phoneNumber}`;
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto mb-12 text-center">
          <div className="flex justify-center mb-6">
            <HelpCircle className="h-12 w-12 text-neon-purple" />
          </div>
          <h1 className="text-4xl font-orbitron font-bold mb-4 cyber-text-glow">
            Support
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Get the help you need with our comprehensive support resources
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button className="cyber-button bg-neon-blue hover:bg-neon-blue/90 text-black font-medium">
              <Link to="/support/help-center">Help Center</Link>
            </Button>
            <Button className="cyber-button bg-neon-purple hover:bg-neon-purple/90 text-white font-medium">
              <Link to="/support/faqs">FAQs</Link>
            </Button>
            <Button variant="outline" className="cyber-button">
              <Link to="/connect/contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="cyber-card p-6 hover:cyber-border-glow transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-neon-blue/20 text-neon-blue">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-orbitron font-medium">Live Chat Support</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Get immediate help from our support team through our WhatsApp chat feature. Available during business hours.
            </p>
            <Button variant="outline" className="w-full cyber-button">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full">Chat on WhatsApp</a>
            </Button>
          </div>

          <div className="cyber-card p-6 hover:cyber-border-glow transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-neon-purple/20 text-neon-purple">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-orbitron font-medium">Phone Support</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Speak directly with our support specialists for complex issues that require immediate attention.
            </p>
            <Button variant="outline" className="w-full cyber-button">
              <a href={phoneUrl} className="w-full">Call {phoneNumber}</a>
            </Button>
          </div>

          <div className="cyber-card p-6 hover:cyber-border-glow transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-neon-green/20 text-neon-green">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-orbitron font-medium">Email Support</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Send us your questions or issues via email and receive a detailed response within 24 hours.
            </p>
            <Button variant="outline" className="w-full cyber-button">
              <Link to="/connect/contact" className="w-full">Email Support</Link>
            </Button>
          </div>

          <div className="cyber-card p-6 hover:cyber-border-glow transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-neon-pink/20 text-neon-pink">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-orbitron font-medium">Documentation</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Browse our comprehensive documentation for guides, tutorials, and technical details.
            </p>
            <Button variant="outline" className="w-full cyber-button">
              <Link to="/docs" className="w-full">View Documentation</Link>
            </Button>
          </div>
        </div>

        <div className="cyber-card p-8 bg-gradient-to-br from-cyber-dark to-cyber mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-neon-blue/20 text-neon-blue">
              <Users className="h-10 w-10" />
            </div>
            <div>
              <h3 className="text-2xl font-orbitron font-medium mb-3">Join Our Community</h3>
              <p className="text-muted-foreground mb-6">
                Connect with other developers and designers using our templates. Share tips, get inspired, and solve challenges together in our community forums and Discord server.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="cyber-button bg-neon-blue hover:bg-neon-blue/90 text-black font-medium">
                  <a href="https://discord.gg/htr-templates" target="_blank" rel="noopener noreferrer">Join Discord</a>
                </Button>
                <Button variant="outline" className="cyber-button">
                  <a href="https://github.com/htr-templates/discussions" target="_blank" rel="noopener noreferrer">GitHub Discussions</a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-orbitron font-medium mb-4">Can't find what you need?</h3>
          <p className="text-muted-foreground mb-8">
            Our support team is just a click away. We're here to help you resolve any issues you may encounter with our templates.
          </p>
          <Button size="lg" className="cyber-button bg-neon-purple hover:bg-neon-purple/90 text-white font-medium">
            <Link to="/connect/contact">Contact Our Support Team</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SupportPage;
