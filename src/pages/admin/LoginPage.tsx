
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // For demo purposes, hardcoded admin credentials
  const adminEmail = "admin@templatex.com";
  const adminPassword = "admin123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // In a real app, this would be an API call with JWT auth
    setTimeout(() => {
      if (email === adminEmail && password === adminPassword) {
        // Simulate storing JWT token
        localStorage.setItem('adminToken', 'demo-token-xyz');
        localStorage.setItem('adminUser', JSON.stringify({
          name: 'Admin User',
          email: adminEmail,
          role: 'admin'
        }));
        
        toast({
          title: "Login successful",
          description: "Welcome back, Admin!",
        });
        
        navigate('/admin/dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <div className="cyber-panel p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-neon-blue/20 mx-auto flex items-center justify-center cyber-border-glow">
                <span className="font-orbitron font-bold text-3xl cyber-text-glow">X</span>
              </div>
              <h1 className="font-orbitron text-2xl font-bold mt-4 mb-2">Admin Login</h1>
              <p className="text-muted-foreground text-sm">
                Access your admin dashboard and manage templates
              </p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium block">Email</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@templatex.com"
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
                {loading ? 'Authenticating...' : 'Login to Admin Panel'}
              </Button>
            </form>
            
            <div className="mt-6 text-center text-xs text-muted-foreground">
              <p>Demo credentials:</p>
              <p>Email: admin@templatex.com</p>
              <p>Password: admin123</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
