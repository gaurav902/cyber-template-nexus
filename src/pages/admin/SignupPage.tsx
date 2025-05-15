
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Lock, Eye, EyeOff, Mail, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { role: "admin" }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Account created",
        description: "Your admin account has been created successfully",
      });
      
      navigate('/admin/login', { replace: true });
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <div className="cyber-panel p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-neon-purple/20 mx-auto flex items-center justify-center cyber-border-glow">
                <User className="h-8 w-8 text-neon-purple" />
              </div>
              <h1 className="font-orbitron text-2xl font-bold mt-4 mb-2">
                Admin Signup
              </h1>
              <p className="text-muted-foreground text-sm">
                Create a new admin account to manage your site
              </p>
            </div>
            
            <form onSubmit={handleSignup} className="space-y-6">
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
                    placeholder="Create a password"
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
              
              <div className="space-y-2">
                <label className="text-sm font-medium block">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10 bg-cyber-light border-cyber-border"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full cyber-button bg-neon-purple hover:bg-neon-purple/90 text-white font-medium"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create Admin Account'}
              </Button>
              
              <div className="text-center text-sm">
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/admin/login" className="text-neon-blue hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignupPage;
