
// Import necessary components and hooks
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Define settings type
interface Settings {
  id: string;
  site_name: string;
  site_description: string;
  logo_url: string | null;
  favicon_url: string | null;
  email_notifications: boolean;
  maintenance_mode: boolean;
  created_at: string;
}

// Define form schema
const formSchema = z.object({
  site_name: z.string().min(1, "Site name is required"),
  site_description: z.string(),
  logo_url: z.string().nullable(),
  favicon_url: z.string().nullable(),
  email_notifications: z.boolean(),
  maintenance_mode: z.boolean(),
});

const SettingsPage = () => {
  const [settings, setSettings] = useState<Settings | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      site_name: "TemplateX",
      site_description: "Next Generation Website Templates",
      logo_url: null,
      favicon_url: null,
      email_notifications: true,
      maintenance_mode: false,
    },
  });

  // Fetch settings from the database
  const { isLoading, error } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      // In a real app, we'd fetch from the database
      // For now, we'll use default settings
      const settings = {
        id: "1",
        site_name: "TemplateX",
        site_description: "Next Generation Website Templates",
        logo_url: null,
        favicon_url: null,
        email_notifications: true,
        maintenance_mode: false,
        created_at: new Date().toISOString(),
      };
      return settings;
    },
    meta: {
      onSuccess: (data: Settings) => {
        setSettings(data);
      }
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // In a real app, we'd update the database
      console.log("Saving settings:", values);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Update form values with saved data
      form.reset(values);
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Failed to save settings:", error);
      alert("Failed to save settings. Please try again.");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Settings</h2>
          <p className="text-muted-foreground">
            Manage your site settings and preferences
          </p>
        </div>

        {isLoading ? (
          <div>Loading settings...</div>
        ) : error ? (
          <div>Error loading settings</div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Configure the general settings for your site
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="site_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="site_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize how your site looks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="logo_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Logo URL</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="favicon_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Favicon URL</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>
                    Configure system-related settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email_notifications"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <div>
                          <FormLabel>Email Notifications</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Receive email notifications for important events
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maintenance_mode"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <div>
                          <FormLabel>Maintenance Mode</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Put your site in maintenance mode
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="ml-auto">
                    Save Settings
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        )}
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
