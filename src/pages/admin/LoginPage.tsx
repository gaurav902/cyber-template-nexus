
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Lock, User, Eye, EyeOff, Mail } from 'lucide-react';
import { signIn, setupAdminAccount, isAdminSetupNeeded } from '@/services/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSetupMode, setIsSetupMode] = useState(false);
  const [checkingSetup, setCheckingSetup] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = (location.state as any)?.from?.pathname || '/admin/dashboard';

  // Check if admin setup is needed
  useEffect(() => {
    const checkAdminSetup = async () => {
      try {
        const setupNeeded = await isAdminSetupNeeded();
        setIsSetupMode(setupNeeded);
      } catch (error) {
        console.error("Error checking admin setup:", error);
      } finally {
        setCheckingSetup(false);
      }
    };

    checkAdminSetup();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSetupMode) {
        // Handle admin setup
        if (password !== confirmPassword) {
          toast({
            title: "Passwords don't match",
            description: "Please make sure your passwords match",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        await setupAdminAccount(email, password);
        toast({
          title: "Admin account created",
          description: "Your admin account has been set up successfully",
        });
        
        // Automatically sign in after setup
        await signIn(email, password);
        navigate(from, { replace: true });
      } else {
        // Regular login
        await signIn(email, password);
        navigate(from, { replace: true });
      }
    } catch (error: any) {
      toast({
        title: isSetupMode ? "Setup failed" : "Login failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (checkingSetup) {
    return (
      <>
        <Navbar />
        <div className="pt-16 min-h-screen flex flex-col items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Checking admin setup status...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

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
              <h1 className="font-orbitron text-2xl font-bold mt-4 mb-2">
                {isSetupMode ? 'Admin Setup' : 'Admin Login'}
              </h1>
              <p className="text-muted-foreground text-sm">
                {isSetupMode 
                  ? 'Create your admin account to get started'
                  : 'Access your admin dashboard and manage templates'}
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
                    placeholder="Enter your email"
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

              {isSetupMode && (
                <div className="space-y-2">
                  <label className="text-sm font-medium block">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10 pr-10 bg-cyber-light border-cyber-border"
                      required
                    />
                  </div>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full cyber-button bg-neon-blue hover:bg-neon-blue/90 text-black font-medium"
                disabled={loading}
              >
                {loading 
                  ? 'Processing...' 
                  : isSetupMode 
                    ? 'Create Admin Account' 
                    : 'Login to Admin Panel'}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
