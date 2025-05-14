
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-neon-blue' : 'text-white/80 hover:text-white';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cyber/80 backdrop-blur-lg border-b border-cyber-border">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-neon-blue/20 flex items-center justify-center cyber-border-glow">
            <span className="font-orbitron font-bold text-white">X</span>
          </div>
          <span className="font-orbitron font-bold text-xl tracking-wider cyber-text-glow">
            TemplateX
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`font-medium ${isActive('/')}`}>
            Home
          </Link>
          <Link to="/templates" className={`font-medium ${isActive('/templates')}`}>
            Templates
          </Link>
          <Link to="/categories" className={`font-medium ${isActive('/categories')}`}>
            Categories
          </Link>
          <div className="relative ml-4">
            <input 
              type="text" 
              placeholder="Search templates..." 
              className="bg-cyber-light pl-9 pr-4 py-2 rounded-md border border-cyber-border focus:outline-none focus:border-neon-blue/70 focus:cyber-border-glow w-48 text-sm"
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/admin/login">
            <Button variant="outline" size="sm" className="cyber-button">
              <User className="mr-2 h-4 w-4" />
              Admin
            </Button>
          </Link>
        </div>

        <button 
          className="md:hidden focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden pt-2 pb-4 px-4 bg-cyber-dark border-b border-cyber-border">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className={`py-2 px-3 rounded-md ${isActive('/') === 'text-neon-blue' ? 'bg-cyber-light' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/templates" 
              className={`py-2 px-3 rounded-md ${isActive('/templates') === 'text-neon-blue' ? 'bg-cyber-light' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Templates
            </Link>
            <Link 
              to="/categories" 
              className={`py-2 px-3 rounded-md ${isActive('/categories') === 'text-neon-blue' ? 'bg-cyber-light' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Categories
            </Link>
            <div className="relative mt-2">
              <input 
                type="text" 
                placeholder="Search templates..." 
                className="bg-cyber-light pl-9 pr-4 py-2 rounded-md border border-cyber-border focus:outline-none focus:border-neon-blue/70 w-full text-sm"
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            <Link 
              to="/admin/login" 
              className="py-2 px-3 text-center rounded-md bg-cyber-light border border-cyber-border"
              onClick={() => setIsOpen(false)}
            >
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
