
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const DashboardAccessPage = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple example password - in a real app, you'd use a secure authentication method
    if (password === 'admin123') {
      sessionStorage.setItem('adminAccess', 'true');
      navigate('/secure-panel/dashboard');
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber p-4">
      <div className="cyber-panel max-w-md w-full p-6">
        <h1 className="font-orbitron text-2xl font-bold mb-6 text-center">Admin Access</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-cyber-light border-cyber-border"
            />
          </div>
          <Button type="submit" className="w-full cyber-button">
            Access Dashboard
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DashboardAccessPage;
