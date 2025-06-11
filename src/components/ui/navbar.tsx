
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [adminKeySequence, setAdminKeySequence] = useState<string[]>([]);
  const [isAdminVisible, setIsAdminVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Secret key sequence to reveal admin access: "htrx"
  const secretKeySequence = ['h', 't', 'r', 'x'];
  
  // Listen for key presses
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...adminKeySequence, e.key].slice(-secretKeySequence.length);
      setAdminKeySequence(newSequence);
      
      // Check if current sequence matches secret sequence
      if (JSON.stringify(newSequence) === JSON.stringify(secretKeySequence)) {
        setIsAdminVisible(true);
        sessionStorage.setItem('adminAccess', 'true');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Check if admin access was previously granted in this session
    const hasAdminAccess = sessionStorage.getItem('adminAccess') === 'true';
    setIsAdminVisible(hasAdminAccess);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [adminKeySequence]);
  
  // Handle Ctrl+Shift+A shortcut for admin panel
  useEffect(() => {
    const handleKeyCombo = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setIsAdminVisible(true);
        sessionStorage.setItem('adminAccess', 'true');
      }
    };
    
    window.addEventListener('keydown', handleKeyCombo);
    return () => window.removeEventListener('keydown', handleKeyCombo);
  }, []);
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-neon-blue' : 'text-white/80 hover:text-white';
  };
  
  // Hidden click counter for admin access
  const [cornerClicks, setCornerClicks] = useState(0);
  const handleCornerClick = () => {
    const newCount = cornerClicks + 1;
    setCornerClicks(newCount);
    if (newCount >= 5) {
      setIsAdminVisible(true);
      sessionStorage.setItem('adminAccess', 'true');
      setCornerClicks(0);
    }
  };

  const handleAdminClick = () => {
    navigate('/dashboard-access-9382xkjv');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/all-templates', label: 'All Designs' },
    { path: '/categories', label: 'Categories' },
    { path: '/latest', label: 'Latest' },
    { path: '/resources', label: 'Resources' },
    { path: '/connect', label: 'Connect' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cyber/80 backdrop-blur-lg border-b border-cyber-border">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div 
            className="w-12 h-9 rounded-md bg-neon-blue/20 flex items-center justify-center cyber-border-glow" 
            onClick={handleCornerClick}
          >
            <span className="font-orbitron font-bold text-white">HTR</span>
          </div>
          <span className="font-orbitron font-bold text-xl tracking-wider cyber-text-glow">
            hack the root
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className={`font-medium ${isActive(link.path)}`}>
              {link.label}
            </Link>
          ))}
          <div className="relative ml-4">
            <input 
              type="text" 
              placeholder="Search Designs..." 
              className="bg-cyber-light pl-9 pr-4 py-2 rounded-md border border-cyber-border focus:outline-none focus:border-neon-blue/70 focus:cyber-border-glow w-48 text-sm"
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {isAdminVisible && (
            <Button 
              variant="outline" 
              size="sm" 
              className="cyber-button"
              onClick={handleAdminClick}
            >
              <User className="mr-2 h-4 w-4" />
              Control Panel
            </Button>
          )}
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
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`py-2 px-3 rounded-md ${isActive(link.path) === 'text-neon-blue' ? 'bg-cyber-light' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="relative mt-2">
              <input 
                type="text" 
                placeholder="Search Designs..." 
                className="bg-cyber-light pl-9 pr-4 py-2 rounded-md border border-cyber-border focus:outline-none focus:border-neon-blue/70 w-full text-sm"
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            {isAdminVisible && (
              <Button 
                variant="outline"
                className="w-full justify-center py-2 px-3 text-center rounded-md bg-cyber-light border border-cyber-border"
                onClick={() => {
                  navigate('/dashboard-access-9382xkjv');
                  setIsOpen(false);
                }}
              >
                <User className="mr-2 h-4 w-4" />
                Control Panel
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
