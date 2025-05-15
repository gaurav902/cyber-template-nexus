
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Github, Twitter, MessageCircle, Mail } from 'lucide-react';

const ConnectPage = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      description: 'Follow our repositories for code examples and contributions',
      icon: Github,
      url: 'https://github.com',
      color: 'bg-neutral-800',
      textColor: 'text-white'
    },
    {
      name: 'Twitter',
      description: 'Stay updated with the latest news and announcements',
      icon: Twitter,
      url: 'https://twitter.com',
      color: 'bg-sky-500',
      textColor: 'text-white'
    },
    {
      name: 'Discord',
      description: 'Join our community for discussions and support',
      icon: MessageCircle,
      url: 'https://discord.com',
      color: 'bg-indigo-600',
      textColor: 'text-white'
    },
    {
      name: 'Contact Us',
      description: 'Reach out directly to our team for inquiries',
      icon: Mail,
      url: '/contact',
      color: 'bg-neon-purple',
      textColor: 'text-white'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-orbitron font-bold mb-4 cyber-text-glow">
            Connect With Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our community and stay connected across various platforms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {socialLinks.map((link, index) => (
            <a 
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-panel p-6 hover:border-neon-blue/70 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-lg ${link.color} flex items-center justify-center mr-4`}>
                  <link.icon className={`h-6 w-6 ${link.textColor}`} />
                </div>
                <h3 className="font-orbitron text-xl font-medium">{link.name}</h3>
              </div>
              <p className="text-muted-foreground">{link.description}</p>
            </a>
          ))}
        </div>

        <div className="cyber-panel p-8 mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-orbitron font-medium mb-6">Send Us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium">Your Name</label>
                <input 
                  type="text" 
                  id="name"
                  className="w-full bg-cyber-light border border-cyber-border rounded-md p-3 focus:outline-none focus:border-neon-blue"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium">Your Email</label>
                <input 
                  type="email" 
                  id="email"
                  className="w-full bg-cyber-light border border-cyber-border rounded-md p-3 focus:outline-none focus:border-neon-blue"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block mb-2 text-sm font-medium">Subject</label>
              <input 
                type="text" 
                id="subject"
                className="w-full bg-cyber-light border border-cyber-border rounded-md p-3 focus:outline-none focus:border-neon-blue"
                placeholder="Enter subject"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium">Message</label>
              <textarea 
                id="message"
                rows={6}
                className="w-full bg-cyber-light border border-cyber-border rounded-md p-3 focus:outline-none focus:border-neon-blue"
                placeholder="Type your message here..."
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="cyber-button bg-neon-blue hover:bg-neon-blue/90 text-black px-6 py-3 rounded"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConnectPage;
