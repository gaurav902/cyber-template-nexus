
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Settings {
  site_name: string;
  meta_description: string;
  contact_email: string;
  show_featured: boolean;
  enable_ratings: boolean;
  maintenance_mode: boolean;
}

const SettingsPage = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Settings>({
    site_name: 'TemplateX',
    meta_description: 'Next Generation Website Templates',
    contact_email: 'admin@admin.com',
    show_featured: true,
    enable_ratings: true,
    maintenance_mode: false
  });

  // This would normally fetch from the database
  const { isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      // In a real app, this would fetch from the database
      // For now, we'll use the default values
      return settings;
    },
    onSuccess: (data) => {
      setSettings(data);
    }
  });

  // This would normally save to the database
  const { mutate: saveSettings, isPending: isSaving } = useMutation({
    mutationFn: async (newSettings: Settings) => {
      // In a real app, this would save to the database
      // For now, we'll simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return newSettings;
    },
    onSuccess: () => {
      toast({
        title: "Settings saved",
        description: "Your settings have been successfully updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleChange = (field: keyof Settings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(settings);
  };

  const resetCache = async () => {
    try {
      // In a real app, this would clear the server/CDN cache
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Cache cleared",
        description: "The site cache has been successfully cleared."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear cache. Please try again.",
        variant: "destructive",
      });
    }
  };

  const regenerateApiKey = async () => {
    try {
      // In a real app, this would generate a new API key
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "API key regenerated",
        description: "Your new API key has been generated successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to regenerate API key. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your website settings and configuration.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader className="h-8 w-8 animate-spin text-neon-blue" />
          </div>
        ) : (
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList className="cyber-card bg-cyber-dark border-cyber-border">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="api">API & Integration</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleSubmit}>
              <TabsContent value="general" className="space-y-4">
                <Card className="cyber-card bg-cyber-dark border-cyber-border">
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>
                      Configure the basic settings of your website.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="siteName">Site Name</Label>
                      <Input 
                        id="siteName"
                        value={settings.site_name}
                        onChange={(e) => handleChange('site_name', e.target.value)}
                        className="bg-cyber-light border-cyber-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="metaDescription">Meta Description</Label>
                      <Input 
                        id="metaDescription"
                        value={settings.meta_description}
                        onChange={(e) => handleChange('meta_description', e.target.value)}
                        className="bg-cyber-light border-cyber-border"
                      />
                      <p className="text-xs text-muted-foreground">
                        Brief description of your website for search engines.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <Input 
                        id="contactEmail"
                        type="email"
                        value={settings.contact_email}
                        onChange={(e) => handleChange('contact_email', e.target.value)}
                        className="bg-cyber-light border-cyber-border"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="features" className="space-y-4">
                <Card className="cyber-card bg-cyber-dark border-cyber-border">
                  <CardHeader>
                    <CardTitle>Feature Settings</CardTitle>
                    <CardDescription>
                      Enable or disable various website features.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Featured Templates</h4>
                        <p className="text-sm text-muted-foreground">
                          Show featured templates on the homepage.
                        </p>
                      </div>
                      <Switch 
                        checked={settings.show_featured}
                        onCheckedChange={(checked) => handleChange('show_featured', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Template Ratings</h4>
                        <p className="text-sm text-muted-foreground">
                          Allow users to rate templates.
                        </p>
                      </div>
                      <Switch 
                        checked={settings.enable_ratings}
                        onCheckedChange={(checked) => handleChange('enable_ratings', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="api" className="space-y-4">
                <Card className="cyber-card bg-cyber-dark border-cyber-border">
                  <CardHeader>
                    <CardTitle>API Settings</CardTitle>
                    <CardDescription>
                      Manage API keys and integration settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="apiKey">API Key</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="apiKey"
                          value="sk_test_51JGh8RLs9FJasmf42f3X0NpA1CEPuIEN6tkSRx"
                          readOnly
                          className="bg-cyber-light border-cyber-border font-mono"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={regenerateApiKey}
                          className="cyber-button"
                        >
                          Regenerate
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Use this key to access the API. Keep it secret!
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t border-cyber-border">
                      <h4 className="font-medium mb-4">Connected Services</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-cyber-light/20 rounded-md">
                          <div>
                            <h5 className="font-medium">Supabase</h5>
                            <p className="text-sm text-muted-foreground">Connected</p>
                          </div>
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-cyber-light/20 rounded-md">
                          <div>
                            <h5 className="font-medium">Google Analytics</h5>
                            <p className="text-sm text-muted-foreground">Not connected</p>
                          </div>
                          <Button variant="outline" size="sm" className="cyber-button">
                            Connect
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="maintenance" className="space-y-4">
                <Card className="cyber-card bg-cyber-dark border-cyber-border">
                  <CardHeader>
                    <CardTitle>Maintenance Settings</CardTitle>
                    <CardDescription>
                      Configure maintenance mode and perform system tasks.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Maintenance Mode</h4>
                        <p className="text-sm text-muted-foreground">
                          Display a maintenance page to visitors.
                        </p>
                      </div>
                      <Switch 
                        checked={settings.maintenance_mode}
                        onCheckedChange={(checked) => handleChange('maintenance_mode', checked)}
                      />
                    </div>
                    
                    <div className="pt-4 border-t border-cyber-border">
                      <h4 className="font-medium mb-4">System Maintenance</h4>
                      <div className="space-y-4">
                        <div className="p-3 bg-cyber-light/20 rounded-md">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium">Clear Cache</h5>
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm" 
                              onClick={resetCache}
                              className="cyber-button"
                            >
                              Clear
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Clear all cached data to force-reload the latest content.
                          </p>
                        </div>
                        <div className="p-3 bg-cyber-light/20 rounded-md">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium">Database Status</h5>
                            <span className="text-sm text-green-400">Healthy</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Last check: 15 minutes ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <div className="flex justify-end mt-4">
                <Button 
                  type="submit"
                  disabled={isSaving}
                  className="cyber-button bg-neon-blue hover:bg-neon-blue/90 text-black font-medium"
                >
                  {isSaving ? 'Saving...' : 'Save Settings'}
                </Button>
              </div>
            </form>
          </Tabs>
        )}
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
