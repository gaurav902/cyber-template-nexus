
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { MessageSquare, Users, ArrowRight, Headphones, Star, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const DiscordPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto mb-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-xl bg-[#5865F2]/20 flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-[#5865F2]" />
            </div>
          </div>
          <h1 className="text-4xl font-orbitron font-bold mb-4 cyber-text-glow">
            Join Our Discord Community
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Connect with fellow developers, get help with template customization, and stay updated on the latest releases
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="cyber-button bg-[#5865F2] hover:bg-[#5865F2]/90 text-white font-medium">
              <a href="https://discord.gg/QbdC7FXed2" target="_blank" rel="noopener noreferrer" className="flex items-center">
                Join Discord Server
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="cyber-panel p-6 hover:border-neon-blue/70 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-neon-blue/20 text-neon-blue">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-orbitron font-medium">Active Community</h3>
            </div>
            <p className="text-muted-foreground">
              Connect with hundreds of developers using HTR templates. Share your projects, get feedback, and collaborate on ideas.
            </p>
          </div>

          <div className="cyber-panel p-6 hover:border-neon-blue/70 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-neon-purple/20 text-neon-purple">
                <Headphones className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-orbitron font-medium">Direct Support</h3>
            </div>
            <p className="text-muted-foreground">
              Get direct help from our team and community members. Ask questions, troubleshoot issues, and get guidance for your project.
            </p>
          </div>

          <div className="cyber-panel p-6 hover:border-neon-blue/70 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-neon-green/20 text-neon-green">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-orbitron font-medium">Exclusive Content</h3>
            </div>
            <p className="text-muted-foreground">
              Get early access to new templates, exclusive tips, and special offers only available to our Discord members.
            </p>
          </div>
        </div>

        <div className="cyber-panel p-8 bg-gradient-to-br from-cyber-dark to-cyber mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#5865F2]/20 text-[#5865F2]">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-orbitron font-medium mb-3">Community Guidelines</h3>
              <p className="text-muted-foreground mb-6">
                Our Discord community is a safe and collaborative space for developers of all skill levels. We ask all members to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
                <li>Be respectful and inclusive to all members</li>
                <li>Share knowledge and help others when possible</li>
                <li>Stay on topic in dedicated channels</li>
                <li>Avoid self-promotion outside of designated channels</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                By joining our Discord server, you agree to follow these guidelines and Discord's Terms of Service.
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-2xl font-orbitron font-medium mb-4">Not ready to join Discord?</h3>
          <p className="text-muted-foreground mb-8">
            No problem! You can still get support through our other channels.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/support" className="cyber-button bg-neon-purple hover:bg-neon-purple/90 text-white px-6 py-2 rounded">
              Support Center
            </Link>
            <Link to="/connect/github" className="cyber-button bg-cyber-light hover:bg-cyber border border-cyber-border px-6 py-2 rounded">
              GitHub Discussions
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DiscordPage;
