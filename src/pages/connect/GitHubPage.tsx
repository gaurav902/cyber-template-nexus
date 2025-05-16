
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Github, Code, GitBranch, ArrowRight, Users, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const GitHubPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto mb-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center">
              <Github className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-orbitron font-bold mb-4 cyber-text-glow">
            GitHub Discussions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Join our GitHub community to discuss code, report issues, and contribute to our templates
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="cyber-button bg-white text-black hover:bg-white/90 font-medium">
              <a href="https://github.com/htr-templates/discussions" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Github className="mr-2 h-5 w-5" />
                Join GitHub Discussions
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          <div className="cyber-panel p-6 hover:border-neon-green/70 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-neon-green/20 text-neon-green">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-orbitron font-medium">Code Discussions</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Discuss coding patterns, best practices, and implementation details of our templates with our community of developers.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Get help with complex coding challenges</li>
              <li>Share your implementations and code snippets</li>
              <li>Learn advanced techniques from experienced developers</li>
            </ul>
          </div>

          <div className="cyber-panel p-6 hover:border-neon-blue/70 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-neon-blue/20 text-neon-blue">
                <GitBranch className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-orbitron font-medium">Issue Reporting</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Help improve our templates by reporting bugs, suggesting new features, or requesting enhancements.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Report issues with detailed reproduction steps</li>
              <li>Suggest new features that would benefit the community</li>
              <li>Vote on existing feature requests</li>
            </ul>
          </div>
        </div>

        <div className="cyber-panel p-8 bg-gradient-to-br from-cyber-dark to-cyber mb-16 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-neon-purple/20 text-neon-purple">
              <Users className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-orbitron font-medium mb-3">Contributing Guidelines</h3>
              <p className="text-muted-foreground mb-6">
                We welcome contributions from all members of our community. Here's how you can contribute:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Fork repositories and submit pull requests with improvements</li>
                <li>Create detailed issues for bugs with reproduction steps</li>
                <li>Share examples of how you've extended our templates</li>
                <li>Help other community members by answering questions</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="cyber-card p-6 hover:cyber-border-glow transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="h-5 w-5 text-neon-blue" />
                <h4 className="font-orbitron">Q&A</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Ask questions about implementation details and get answers from our team and community.
              </p>
            </div>
            
            <div className="cyber-card p-6 hover:cyber-border-glow transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="h-5 w-5 text-neon-purple" />
                <h4 className="font-orbitron">Ideas</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Share and discuss ideas for template improvements and new features.
              </p>
            </div>
            
            <div className="cyber-card p-6 hover:cyber-border-glow transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="h-5 w-5 text-neon-green" />
                <h4 className="font-orbitron">Show & Tell</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Showcase projects you've built with our templates and get feedback.
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-orbitron font-medium mb-4">Join Our Developer Community</h3>
          <p className="text-muted-foreground mb-8">
            Connect with us on GitHub to stay updated on template development, report issues, and contribute to our open source projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="cyber-button bg-white text-black hover:bg-white/90 font-medium">
              <a href="https://github.com/htr-templates/discussions" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Github className="mr-2 h-5 w-5" />
                Join GitHub Discussions
              </a>
            </Button>
            <Link to="/connect/discord">
              <Button variant="outline" className="cyber-button">
                Join Discord Community
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GitHubPage;
