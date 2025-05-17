
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-cyber-dark border-t border-cyber-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-12 h-9 rounded-md bg-neon-blue/20 flex items-center justify-center cyber-border-glow">
                <span className="font-orbitron font-bold text-white">HTR</span>
              </div>
              <span className="font-orbitron font-bold text-xl tracking-wider cyber-text-glow">
                hack the root
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mt-2">
              Your one-stop platform for discovering and using beautiful website templates.
            </p>
          </div>
          
          <div>
            <h3 className="font-orbitron text-white mb-4 text-lg">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/templates" className="text-muted-foreground hover:text-neon-blue">All Templates</Link></li>
              <li><Link to="/categories" className="text-muted-foreground hover:text-neon-blue">Categories</Link></li>
              <li><Link to="/latest" className="text-muted-foreground hover:text-neon-blue">Latest</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-orbitron text-white mb-4 text-lg">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/docs" className="text-muted-foreground hover:text-neon-blue">Documentation</Link></li>
              <li><Link to="/support" className="text-muted-foreground hover:text-neon-blue">Support</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-neon-blue">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-neon-blue">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-orbitron text-white mb-4 text-lg">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/HTR-hacktheroot" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neon-blue flex items-center gap-2">
                  <Github size={14} />
                  GitHub
                </a>
              </li>
              <li><a href="#" className="text-muted-foreground hover:text-neon-blue">Twitter</a></li>
              <li><Link to="/connect/discord" className="text-muted-foreground hover:text-neon-blue">Discord</Link></li>
              <li><Link to="/connect/contact" className="text-muted-foreground hover:text-neon-blue">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-cyber-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} HACK THE ROOT. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="#/privacy" className="text-muted-foreground hover:text-white text-sm">Privacy</Link>
            <Link to="#/terms" className="text-muted-foreground hover:text-white text-sm">Terms</Link>
            <Link to="#/cookies" className="text-muted-foreground hover:text-white text-sm">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
