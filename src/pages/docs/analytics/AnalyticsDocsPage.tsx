
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BarChart, PieChart, Activity, LineChart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AnalyticsDocsPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto mb-12">
          <Button variant="outline" size="sm" asChild className="mb-6">
            <Link to="/docs">← Back to Documentation</Link>
          </Button>
          
          <div className="flex items-center gap-3 mb-6">
            <BarChart className="h-8 w-8 text-neon-green" />
            <h1 className="text-3xl font-orbitron font-bold cyber-text-glow">
              Analytics Integration
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground mb-8">
            Track user behavior and gather insights with analytics tools
          </p>

          <div className="cyber-card p-6 mb-8">
            <h2 className="text-2xl font-orbitron font-medium mb-4">Analytics Solutions</h2>
            <p className="mb-4">
              Our templates support different analytics solutions to help you track user behavior and gather insights.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="cyber-card bg-cyber-dark p-4 flex flex-col">
                <div className="mb-3 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-neon-green" />
                  <h3 className="font-medium">Google Analytics</h3>
                </div>
                <p className="text-sm text-muted-foreground flex-grow mb-4">
                  Complete analytics solution with comprehensive tracking and reporting capabilities.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer">
                    Visit Google Analytics
                  </a>
                </Button>
              </div>
              <div className="cyber-card bg-cyber-dark p-4 flex flex-col">
                <div className="mb-3 flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-neon-blue" />
                  <h3 className="font-medium">Plausible</h3>
                </div>
                <p className="text-sm text-muted-foreground flex-grow mb-4">
                  Privacy-focused, lightweight analytics without cookies.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="https://plausible.io" target="_blank" rel="noopener noreferrer">
                    Visit Plausible
                  </a>
                </Button>
              </div>
              <div className="cyber-card bg-cyber-dark p-4 flex flex-col">
                <div className="mb-3 flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-neon-purple" />
                  <h3 className="font-medium">Custom Analytics</h3>
                </div>
                <p className="text-sm text-muted-foreground flex-grow mb-4">
                  Build your own analytics solution with our templates and Supabase.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/docs/supabase">
                    Learn About Supabase
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="google">
            <TabsList className="mb-6">
              <TabsTrigger value="google">Google Analytics</TabsTrigger>
              <TabsTrigger value="plausible">Plausible</TabsTrigger>
              <TabsTrigger value="custom">Custom Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="google" className="cyber-card p-6">
              <h2 className="text-xl font-orbitron font-medium mb-4">Google Analytics Integration</h2>
              <p className="mb-4">
                Integrate Google Analytics (GA4) into your application:
              </p>
              
              <ol className="space-y-4 mb-6">
                <li className="p-3 bg-cyber-light/20 rounded-md">
                  <strong className="text-neon-green">Step 1:</strong> Create a Google Analytics account and set up a property
                </li>
                <li className="p-3 bg-cyber-light/20 rounded-md">
                  <strong className="text-neon-green">Step 2:</strong> Obtain your Measurement ID (G-XXXXXXXX)
                </li>
                <li className="p-3 bg-cyber-light/20 rounded-md">
                  <strong className="text-neon-green">Step 3:</strong> Add the Google Analytics script to your application
                </li>
              </ol>
              
              <div className="bg-cyber-dark p-4 rounded-md mb-4 overflow-auto">
                <pre className="text-sm">
                  <code>
{`// Analytics component for Google Analytics
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Replace with your Measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXX';

export const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics
    const loadGoogleAnalytics = () => {
      const script = document.createElement('script');
      script.src = \`https://www.googletagmanager.com/gtag/js?id=\${GA_MEASUREMENT_ID}\`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID);
    };

    loadGoogleAnalytics();
  }, []);

  useEffect(() => {
    // Track page views
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      });
    }
  }, [location]);

  return null; // This component doesn't render anything
};`}
                  </code>
                </pre>
              </div>
              
              <p className="mb-4">
                Add the Analytics component to your main App component:
              </p>
              
              <div className="bg-cyber-dark p-4 rounded-md overflow-auto">
                <pre className="text-sm">
                  <code>
{`import { Analytics } from './components/Analytics';

function App() {
  return (
    <>
      {/* Your app components */}
      <Analytics /> 
    </>
  );
}`}
                  </code>
                </pre>
              </div>
            </TabsContent>
            
            <TabsContent value="plausible" className="cyber-card p-6">
              <h2 className="text-xl font-orbitron font-medium mb-4">Plausible Analytics Integration</h2>
              <p className="mb-4">
                Integrate Plausible Analytics, a lightweight and privacy-focused alternative:
              </p>
              
              <ol className="space-y-4 mb-6">
                <li className="p-3 bg-cyber-light/20 rounded-md">
                  <strong className="text-neon-blue">Step 1:</strong> Sign up for a Plausible Analytics account
                </li>
                <li className="p-3 bg-cyber-light/20 rounded-md">
                  <strong className="text-neon-blue">Step 2:</strong> Add your website to your Plausible account
                </li>
                <li className="p-3 bg-cyber-light/20 rounded-md">
                  <strong className="text-neon-blue">Step 3:</strong> Add the Plausible script to your application
                </li>
              </ol>
              
              <div className="bg-cyber-dark p-4 rounded-md mb-4 overflow-auto">
                <pre className="text-sm">
                  <code>
{`// Analytics component for Plausible
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Replace with your domain
const PLAUSIBLE_DOMAIN = 'yourdomain.com';

export const PlausibleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Plausible Analytics
    const loadPlausible = () => {
      const script = document.createElement('script');
      script.src = 'https://plausible.io/js/script.js';
      script.dataset.domain = PLAUSIBLE_DOMAIN;
      script.defer = true;
      document.head.appendChild(script);
    };

    loadPlausible();
  }, []);

  useEffect(() => {
    // Track page views for SPA
    if (window.plausible) {
      window.plausible('pageview');
    }
  }, [location]);

  return null; // This component doesn't render anything
};`}
                  </code>
                </pre>
              </div>
              
              <p className="mb-4">
                Add the Plausible Analytics component to your main App component:
              </p>
              
              <div className="bg-cyber-dark p-4 rounded-md overflow-auto">
                <pre className="text-sm">
                  <code>
{`import { PlausibleAnalytics } from './components/PlausibleAnalytics';

function App() {
  return (
    <>
      {/* Your app components */}
      <PlausibleAnalytics /> 
    </>
  );
}`}
                  </code>
                </pre>
              </div>
            </TabsContent>
            
            <TabsContent value="custom" className="cyber-card p-6">
              <h2 className="text-xl font-orbitron font-medium mb-4">Custom Analytics with Supabase</h2>
              <p className="mb-4">
                Build your own analytics system using Supabase:
              </p>
              
              <ol className="space-y-4 mb-6">
                <li className="p-3 bg-cyber-light/20 rounded-md">
                  <strong className="text-neon-purple">Step 1:</strong> Create an analytics table in your Supabase database
                </li>
                <li className="p-3 bg-cyber-light/20 rounded-md">
                  <strong className="text-neon-purple">Step 2:</strong> Create a client-side tracking component
                </li>
                <li className="p-3 bg-cyber-light/20 rounded-md">
                  <strong className="text-neon-purple">Step 3:</strong> Build a dashboard to visualize your data
                </li>
              </ol>
              
              <div className="bg-cyber-dark p-4 rounded-md mb-4 overflow-auto">
                <pre className="text-sm">
                  <code>
{`-- Create a table for tracking page views
CREATE TABLE public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create a table for tracking events
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  event_data JSONB,
  page_path TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add Row Level Security policies
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Allow insert from anyone for page_views
CREATE POLICY "Anyone can insert page_views"
ON public.page_views
FOR INSERT
TO public
WITH CHECK (true);

-- Allow insert from anyone for events
CREATE POLICY "Anyone can insert events"
ON public.events
FOR INSERT
TO public
WITH CHECK (true);`}
                  </code>
                </pre>
              </div>
              
              <p className="mb-4">
                Create a tracking component to record analytics data:
              </p>
              
              <div className="bg-cyber-dark p-4 rounded-md overflow-auto">
                <pre className="text-sm">
                  <code>
{`// Custom analytics component
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const CustomAnalytics = () => {
  const location = useLocation();

  // Track page view
  const trackPageView = async (path, title) => {
    try {
      await supabase.from('page_views').insert({
        page_path: path,
        page_title: title,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
      });
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  };

  // Track custom event
  const trackEvent = async (eventName, eventData = {}) => {
    try {
      await supabase.from('events').insert({
        event_name: eventName,
        event_data: eventData,
        page_path: window.location.pathname,
      });
    } catch (error) {
      console.error(\`Failed to track event "\${eventName}":, error);
    }
  };

  // Make the track function available globally
  useEffect(() => {
    window.trackEvent = trackEvent;
  }, []);

  // Track page views when route changes
  useEffect(() => {
    trackPageView(location.pathname, document.title);
  }, [location]);

  return null; // This component doesn't render anything
};`}
                  </code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AnalyticsDocsPage;
