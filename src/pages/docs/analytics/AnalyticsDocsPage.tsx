
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { BarChart, LineChart, PieChart, Activity, TrendingUp, MousePointer, UserCheck, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AnalyticsDocsPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <Link to="/docs" className="text-neon-blue hover:underline inline-flex items-center">
              ← Back to Documentation
            </Link>
            <div className="flex items-center mt-6 mb-4">
              <div className="w-10 h-10 mr-4 flex items-center justify-center bg-cyan-500/20 rounded-md">
                <BarChart className="h-6 w-6 text-cyan-400" />
              </div>
              <h1 className="text-3xl font-orbitron font-bold">
                Analytics Integration
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Track user behavior and measure performance with built-in analytics
            </p>
          </div>

          <div className="space-y-12">
            <div className="cyber-panel p-6">
              <h2 className="text-xl font-orbitron font-medium mb-4">Overview</h2>
              <p className="mb-4">
                HTR Designs include support for various analytics solutions to help you understand user behavior, track performance metrics, and make data-driven decisions to improve your application.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start p-3 bg-cyber-light/30 rounded-md">
                  <UserCheck className="h-5 w-5 text-cyan-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">User Behavior</h3>
                    <p className="text-sm text-muted-foreground">
                      Track how users interact with your application
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-cyber-light/30 rounded-md">
                  <TrendingUp className="h-5 w-5 text-cyan-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Conversion Tracking</h3>
                    <p className="text-sm text-muted-foreground">
                      Measure successful user journeys and conversions
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-cyber-light/30 rounded-md">
                  <Activity className="h-5 w-5 text-cyan-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Performance Metrics</h3>
                    <p className="text-sm text-muted-foreground">
                      Monitor load times and application performance
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-cyber-light/30 rounded-md">
                  <Search className="h-5 w-5 text-cyan-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Custom Events</h3>
                    <p className="text-sm text-muted-foreground">
                      Track specific actions and custom metrics
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-orbitron font-medium mb-4">Google Analytics Integration</h2>
              <div className="cyber-panel p-6 space-y-4">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://www.vectorlogo.zone/logos/google_analytics/google_analytics-icon.svg" 
                    alt="Google Analytics" 
                    className="h-8 w-8 mr-4" 
                  />
                  <p className="text-muted-foreground text-sm">
                    Google Analytics 4 integration for comprehensive website analytics
                  </p>
                </div>
                <p>
                  Setting up Google Analytics with HTR Designs:
                </p>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground mb-4">
                  <li>
                    <span className="text-white font-medium">Create a Google Analytics 4 property</span>: 
                    Set up an account at <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">analytics.google.com</a>
                  </li>
                  <li>
                    <span className="text-white font-medium">Get your Measurement ID</span>: 
                    Find your G-XXXXXXXX ID in the GA4 Data Streams
                  </li>
                  <li>
                    <span className="text-white font-medium">Install the analytics package</span>: 
                    Use the official Google Analytics package
                  </li>
                  <li>
                    <span className="text-white font-medium">Configure your Designs</span>: 
                    Add your Measurement ID to your environment variables
                  </li>
                </ol>
                <div className="bg-cyber-dark p-4 rounded-md border border-cyber-border">
                  <p className="text-sm text-muted-foreground mb-2">Basic Google Analytics 4 setup:</p>
                  <pre className="font-mono text-xs text-cyan-400 overflow-x-auto">
                    <code>
{`// src/lib/analytics.ts
import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Initialize GA4
export const initGA = () => {
  if (GA_MEASUREMENT_ID && typeof window !== 'undefined') {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }
};

// Track page views
export const logPageView = (path: string) => {
  ReactGA.send({ hitType: 'pageview', page: path });
  console.log(\`Page view logged: \${path}\`);
};

// Track events
export const logEvent = (category: string, action: string, label?: string, value?: number) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

// Usage in your app
// In your main App component or router:
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, logPageView } from '@/lib/analytics';

function App() {
  const location = useLocation();
  
  useEffect(() => {
    initGA();
  }, []);
  
  useEffect(() => {
    if (location) {
      logPageView(location.pathname + location.search);
    }
  }, [location]);
  
  // Rest of your app
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-orbitron font-medium mb-4">Custom Analytics Solutions</h2>
              <div className="cyber-panel p-6 space-y-4">
                <p className="mb-4">
                  HTR Designs support privacy-focused analytics alternatives that don't rely on cookies or track personal information:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-cyber-light/20 rounded-md">
                    <h4 className="font-medium mb-2">Plausible Analytics</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Lightweight, cookie-free analytics that respects privacy.
                    </p>
                    <a href="https://plausible.io" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline text-sm">
                      plausible.io
                    </a>
                  </div>
                  <div className="p-4 bg-cyber-light/20 rounded-md">
                    <h4 className="font-medium mb-2">Simple Analytics</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Privacy-first analytics with no cookies and no tracking.
                    </p>
                    <a href="https://simpleanalytics.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline text-sm">
                      simpleanalytics.com
                    </a>
                  </div>
                </div>
                <div className="bg-cyber-dark p-4 rounded-md border border-cyber-border">
                  <p className="text-sm text-muted-foreground mb-2">Example Plausible Analytics setup:</p>
                  <pre className="font-mono text-xs text-cyan-400 overflow-x-auto">
                    <code>
{`// src/lib/plausible-analytics.ts
export const initPlausible = (domain: string) => {
  if (typeof window !== 'undefined') {
    // Create script element
    const script = document.createElement('script');
    script.defer = true;
    script.setAttribute('data-domain', domain);
    script.src = 'https://plausible.io/js/plausible.js';
    
    // Add script to document
    document.head.appendChild(script);
  }
};

// In your main component:
import { useEffect } from 'react';
import { initPlausible } from '@/lib/plausible-analytics';

function App() {
  useEffect(() => {
    initPlausible('yourdomain.com');
  }, []);
  
  // Rest of your app
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-orbitron font-medium mb-4">Internal Analytics with Supabase</h2>
              <div className="cyber-panel p-6">
                <p className="mb-4">
                  HTR Designs include a built-in solution for tracking key metrics using Supabase, giving you complete control over your analytics data:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex flex-col items-center p-4 bg-cyber-light/20 rounded-md">
                    <LineChart className="h-8 w-8 text-cyan-400 mb-3" />
                    <h4 className="font-medium mb-2 text-center">User Tracking</h4>
                    <p className="text-sm text-muted-foreground text-center">
                      Track user sessions and page views
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-cyber-light/20 rounded-md">
                    <PieChart className="h-8 w-8 text-cyan-400 mb-3" />
                    <h4 className="font-medium mb-2 text-center">Conversion Tracking</h4>
                    <p className="text-sm text-muted-foreground text-center">
                      Monitor sign-ups and purchases
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-cyber-light/20 rounded-md">
                    <MousePointer className="h-8 w-8 text-cyan-400 mb-3" />
                    <h4 className="font-medium mb-2 text-center">Event Logging</h4>
                    <p className="text-sm text-muted-foreground text-center">
                      Record custom user interactions
                    </p>
                  </div>
                </div>
                <div className="bg-cyber-dark p-4 rounded-md border border-cyber-border">
                  <p className="text-sm text-muted-foreground mb-2">Example internal tracking implementation:</p>
                  <pre className="font-mono text-xs text-cyan-400 overflow-x-auto">
                    <code>
{`// src/services/analytics.ts
import { supabase } from '@/integrations/supabase/client';

export async function logPageView(path: string, userId?: string) {
  try {
    const { data, error } = await supabase
      .from('analytics_page_views')
      .insert([
        { 
          path, 
          user_id: userId || null,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          timestamp: new Date()
        }
      ]);
      
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error logging page view:', err);
    // Don't fail the application if analytics fails
    return null;
  }
}

export async function logEvent(event_name: string, event_data: any = {}, userId?: string) {
  try {
    const { data, error } = await supabase
      .from('analytics_events')
      .insert([
        { 
          event_name,
          event_data,
          user_id: userId || null,
          timestamp: new Date()
        }
      ]);
      
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error logging event:', err);
    return null;
  }
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 p-6 cyber-panel bg-gradient-to-br from-cyber-dark to-cyber">
            <h3 className="text-xl font-orbitron font-medium mb-4">Analytics Best Practices</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Be transparent about data collection in your privacy policy</li>
              <li>Respect user privacy and comply with regulations like GDPR and CCPA</li>
              <li>Implement proper consent mechanisms for cookie-based tracking</li>
              <li>Don't overtrack - focus on metrics that provide actionable insights</li>
              <li>Use analytics to improve user experience, not just to collect data</li>
              <li>Consider privacy-focused alternatives to traditional analytics</li>
            </ul>
            <div className="flex justify-center">
              <Button className="cyber-button bg-cyan-500/90 hover:bg-cyan-500 text-black font-medium">
                <Link to="/docs/cms">
                  View CMS Integration →
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-12 mb-6 flex justify-between items-center">
            <Link to="/docs/payments" className="text-neon-blue hover:underline inline-flex items-center">
              ← Payment Gateways
            </Link>
            <Link to="/docs/cms" className="text-neon-blue hover:underline inline-flex items-center">
              CMS Integration →
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AnalyticsDocsPage;
