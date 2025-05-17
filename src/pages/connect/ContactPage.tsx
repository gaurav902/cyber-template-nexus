
import { useState } from 'react';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, MessageCircle, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { submitContactMessage } from '@/services/contact';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    department: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, department: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitContactMessage(formData);
      toast({
        title: "Message sent",
        description: "We've received your message and will respond shortly.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        department: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto mb-12 text-center">
          <div className="flex justify-center mb-6">
            <Mail className="h-12 w-12 text-neon-blue" />
          </div>
          <h1 className="text-4xl font-orbitron font-bold mb-4 cyber-text-glow">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get in touch with our team. We're here to help and answer any questions you may have.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <div className="cyber-card p-6">
              <h2 className="text-xl font-orbitron font-medium mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-cyber-light/30 rounded-md">
                    <Mail className="h-5 w-5 text-neon-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-muted-foreground">support@templatex.com</p>
                    <p className="text-muted-foreground">info@templatex.com</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-cyber-light/30 rounded-md">
                    <Phone className="h-5 w-5 text-neon-green" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-muted-foreground">Mon-Fri, 9am-5pm EST</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-cyber-light/30 rounded-md">
                    <MessageCircle className="h-5 w-5 text-neon-purple" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Live Chat</h3>
                    <p className="text-muted-foreground">Available 24/7 for premium users</p>
                    <p className="text-muted-foreground">9am-5pm EST for standard users</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-cyber-light/30 rounded-md">
                    <MapPin className="h-5 w-5 text-neon-pink" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Address</h3>
                    <p className="text-muted-foreground">123 Cyber Street</p>
                    <p className="text-muted-foreground">Tech City, TX 98765</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="cyber-card p-6">
              <h2 className="text-xl font-orbitron font-medium mb-4">Connect With Us</h2>
              <p className="text-muted-foreground mb-4">
                Follow us on social media for the latest updates, tips, and resources.
              </p>
              <div className="flex gap-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-cyber-light/30 rounded-md hover:bg-cyber-light/50 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-cyber-light/30 rounded-md hover:bg-cyber-light/50 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.159 1.207A4.92 4.92 0 0016.905 2 4.928 4.928 0 0012 6.929c0 .387.043.763.13 1.124A13.98 13.98 0 011.671 3.154a4.892 4.892 0 001.525 6.574 4.924 4.924 0 01-2.229-.616v.061a4.928 4.928 0 003.95 4.827 4.963 4.963 0 01-2.222.084 4.93 4.93 0 004.604 3.417 9.873 9.873 0 01-6.116 2.105A10.16 10.16 0 000 19.5a14.01 14.01 0 007.58 2.213c9.053 0 14.002-7.496 14.002-13.99 0-.213-.005-.425-.014-.636a9.936 9.936 0 002.46-2.548l-.047-.02z"/>
                  </svg>
                </a>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-cyber-light/30 rounded-md hover:bg-cyber-light/50 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 00-.079.036c-.21.393-.411.979-.565 1.43-.557-.085-1.114-.17-1.67-.17-.561 0-1.114.085-1.67.17-.154-.451-.355-1.037-.566-1.43a.077.077 0 00-.079-.036c-1.715.29-3.356.8-4.885 1.491a.07.07 0 00-.032.027C3.013 10.802 2.389 16.93 5.43 20.05a.082.082 0 00.043.028c1.399.942 2.91 1.814 4.555 2.09a.075.075 0 00.08-.037c.442-.6.835-1.235 1.173-1.9a.075.075 0 00-.041-.105c-.966-.356-1.87-.797-2.735-1.3a.075.075 0 01-.008-.126c.183-.138.366-.283.541-.428a.075.075 0 01.076-.01c3.989 1.824 8.295 1.824 12.24 0a.077.077 0 01.078.01c.174.145.357.29.54.428a.075.075 0 01-.006.127c-.864.502-1.772.943-2.736 1.299a.075.075 0 00-.041.105c.344.666.731 1.3 1.172 1.9a.075.075 0 00.08.037c1.647-.276 3.158-1.148 4.556-2.09a.075.075 0 00.044-.029c3.383-3.469 2.96-9.545.29-14.508a.067.067 0 00-.03-.028zM8.675 15.388c-.897 0-1.641-.823-1.641-1.834 0-1.011.728-1.834 1.641-1.834.918 0 1.658.83 1.641 1.834 0 1.011-.724 1.834-1.64 1.834zm6.058 0c-.898 0-1.641-.823-1.641-1.834 0-1.011.728-1.834 1.64-1.834.919 0 1.658.83 1.642 1.834 0 1.011-.725 1.834-1.641 1.834z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="cyber-card p-6">
              <h2 className="text-xl font-orbitron font-medium mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="bg-cyber-light border-cyber-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="bg-cyber-light border-cyber-border"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select 
                      value={formData.department} 
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger className="bg-cyber-light border-cyber-border">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter subject"
                      required
                      className="bg-cyber-light border-cyber-border"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message here"
                    required
                    className="min-h-[150px] bg-cyber-light border-cyber-border"
                  />
                </div>
                
                <div className="text-right">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="cyber-button bg-neon-blue hover:bg-neon-blue/90 text-black font-medium"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="cyber-card p-6 mb-8">
          <h2 className="text-xl font-orbitron font-medium mb-4">FAQ</h2>
          <p className="text-muted-foreground mb-6">
            Before contacting us, you might find answers to common questions in our FAQ section.
          </p>
          <Link to="/support/faqs">
            <Button variant="outline" className="cyber-button">
              View Frequently Asked Questions
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
