import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, LayoutTemplate, FolderKanban, Settings, User, LogOut, Menu, X, Mail 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    sessionStorage.removeItem('adminAccess');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navItems = [
    { path: '/secure-panel/dashboard', label: 'Dashboard', icon: Home },
    { path: '/secure-panel/content', label: 'Templates', icon: LayoutTemplate },
    { path: '/secure-panel/taxonomy', label: 'Categories', icon: FolderKanban },
    { path: '/secure-panel/messages', label: 'Messages', icon: Mail },
    { path: '/secure-panel/config', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-cyber">
      {/* Mobile header */}
      <div className="md:hidden bg-cyber-dark border-b border-cyber-border p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mr-4"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-neon-blue/20 flex items-center justify-center cyber-border-glow">
              <span className="font-orbitron font-bold text-sm">H</span>
            </div>
            <span className="font-orbitron font-bold text-lg tracking-wider cyber-text-glow">
              hack the root
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cyber-dark border-b border-cyber-border">
          <div className="py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 ${
                  isActive(item.path)
                    ? 'text-neon-blue bg-cyber-light'
                    : 'text-muted-foreground hover:text-white hover:bg-cyber-light/50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-muted-foreground hover:text-white hover:bg-cyber-light/50"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Desktop sidebar and main content */}
      <div className="flex">
        {/* Sidebar - desktop */}
        <div
          className={`bg-cyber-dark border-r border-cyber-border fixed h-full z-20 transition-all duration-300 ease-in-out hidden md:block ${
            sidebarOpen ? 'w-64' : 'w-20'
          }`}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-11 h-9 rounded-md bg-neon-blue/20 flex items-center justify-center cyber-border-glow">
                  <span className="font-orbitron font-bold">HTR</span>
                </div>
                {sidebarOpen && (
                  <span className="font-orbitron font-bold text-xl tracking-wider cyber-text-glow">
                    hacktheroot
                  </span>
                )}
              </Link>
              {sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="ml-auto"
                >
                  <X className="h-5 w-5 text-muted-foreground hover:text-white" />
                </button>
              )}
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="ml-auto"
                >
                  <Menu className="h-5 w-5 text-muted-foreground hover:text-white" />
                </button>
              )}
            </div>

            <div className="flex-1 py-6 overflow-y-auto">
              <nav className="px-2 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-3 rounded-md transition-colors ${
                      isActive(item.path)
                        ? 'bg-cyber-light text-neon-blue'
                        : 'text-muted-foreground hover:text-white hover:bg-cyber-light/50'
                    }`}
                  >
                    <item.icon className="h-5 w-5 min-w-5" />
                    {sidebarOpen && <span className="ml-3">{item.label}</span>}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="p-4 border-t border-cyber-border">
              {sidebarOpen ? (
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-neon-purple/20 flex items-center justify-center cyber-purple-glow">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {user?.email || 'Admin'}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user?.email || 'admin@admin.com'}
                    </p>
                  </div>
                  <button onClick={handleLogout}>
                    <LogOut className="h-5 w-5 text-muted-foreground hover:text-white" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center p-2 rounded-md hover:bg-cyber-light/50"
                >
                  <LogOut className="h-5 w-5 text-muted-foreground hover:text-white" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${
            sidebarOpen ? 'md:ml-64' : 'md:ml-20'
          }`}
        >
          <main className="p-6 md:p-8 pt-16 md:pt-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
