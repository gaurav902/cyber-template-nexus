
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Lock, Eye, EyeOff, Mail } from 'lucide-react';
import { signIn } from '@/services/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = (location.state as any)?.from?.pathname || '/secure-panel/dashboard';

  useEffect(() => {
    // Store the fact that user found the admin login
    sessionStorage.setItem('adminAccess', 'true');
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Regular login
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyber">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.15),transparent_30%),radial-gradient(circle_at_70%_70%,rgba(30,174,219,0.15),transparent_35%)]"></div>
      <div className="w-full max-w-md mx-auto">
        <div className="cyber-panel p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-neon-blue/20 mx-auto flex items-center justify-center cyber-border-glow">
              <span className="font-orbitron font-bold text-3xl cyber-text-glow">H</span>
            </div>
            <h1 className="font-orbitron text-2xl font-bold mt-4 mb-2">
              Control Panel
            </h1>
            <p className="text-muted-foreground text-sm">
              Access your secure dashboard
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@admin.com"
                  className="pl-10 bg-cyber-light border-cyber-border"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-cyber-light border-cyber-border"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full cyber-button bg-neon-blue hover:bg-neon-blue/90 text-black font-medium"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Login to Control Panel'}
            </Button>
            
            <div className="text-center text-sm">
              <p className="text-muted-foreground mb-4">
                Return to <Link to="/" className="text-neon-blue hover:underline">Home page</Link>
              </p>
              
              <p className="text-muted-foreground">Default admin credentials:</p>
              <p>Email: admin@admin.com</p>
              <p>Password: admin123</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
