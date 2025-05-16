
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CreditCard, Wallet, BarChart, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PaymentsDocsPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto mb-12">
          <Button variant="outline" size="sm" asChild className="mb-6">
            <Link to="/docs">← Back to Documentation</Link>
          </Button>
          
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="h-8 w-8 text-neon-purple" />
            <h1 className="text-3xl font-orbitron font-bold cyber-text-glow">
              Payment Gateway Integration
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground mb-8">
            Integrate payment gateways like Stripe and PayPal into your projects
          </p>

          <div className="cyber-card p-6 mb-8">
            <h2 className="text-2xl font-orbitron font-medium mb-4">Payment Gateway Options</h2>
            <p className="mb-4">
              Our templates support various payment gateways to process online payments securely.
              Each gateway offers different features and pricing structures.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="cyber-card bg-cyber-dark p-4 flex flex-col">
                <div className="mb-3 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-neon-purple" />
                  <h3 className="font-medium">Stripe</h3>
                </div>
                <p className="text-sm text-muted-foreground flex-grow mb-4">
                  Comprehensive payment platform with support for subscriptions, one-time payments, and marketplace payments.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="https://stripe.com" target="_blank" rel="noopener noreferrer">
                    Visit Stripe
                  </a>
                </Button>
              </div>
              <div className="cyber-card bg-cyber-dark p-4 flex flex-col">
                <div className="mb-3 flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-neon-blue" />
                  <h3 className="font-medium">PayPal</h3>
                </div>
                <p className="text-sm text-muted-foreground flex-grow mb-4">
                  Widely recognized payment solution with built-in buyer and seller protection.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="https://paypal.com/business" target="_blank" rel="noopener noreferrer">
                    Visit PayPal
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="stripe">
            <TabsList className="mb-6">
              <TabsTrigger value="stripe">Stripe Integration</TabsTrigger>
              <TabsTrigger value="paypal">PayPal Integration</TabsTrigger>
              <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="stripe" className="cyber-card p-6">
              <h2 className="text-xl font-orbitron font-medium mb-4">Stripe Integration</h2>
              <p className="mb-4">
                Integrate Stripe payments into your application:
              </p>
              
              <ol className="space-y-4 mb-6">
                <li className="p-3 bg-cyber-light/20 rounded-md">
                  <strong className="text-neon-purple">Step 1:</strong> Set up a Stripe account and get your API keys
                </li>
                <li className="p-3 bg-cyber-light/20 rounded-md">
                  <strong className="text-neon-purple">Step 2:</strong> Configure Supabase Edge Functions with your Stripe secret key
                </li>
                <li className="p-3 bg-cyber-light/20 rounded-md">
                  <strong className="text-neon-purple">Step 3:</strong> Create a checkout session using the provided code
                </li>
                <li className="p-3 bg-cyber-light/20 rounded-md">
                  <strong className="text-neon-purple">Step 4:</strong> Handle successful payments and webhooks
                </li>
              </ol>
              
              <div className="bg-cyber-dark p-4 rounded-md mb-4 overflow-auto">
                <pre className="text-sm">
                  <code>
{`// Example Edge Function for Stripe checkout
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

// CORS headers for browser compatibility
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { productId, quantity } = await req.json();

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "");

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Your Product" },
            unit_amount: 2000, // $20.00
          },
          quantity: quantity || 1,
        },
      ],
      mode: "payment",
      success_url: \`\${req.headers.get("origin")}/payment-success\`,
      cancel_url: \`\${req.headers.get("origin")}/payment-canceled\`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});`}
                  </code>
                </pre>
              </div>
              
              <p className="text-muted-foreground mb-4">
                Front-end implementation to initiate the payment:
              </p>
              
              <div className="bg-cyber-dark p-4 rounded-md overflow-auto">
                <pre className="text-sm">
                  <code>
{`import { supabase } from '@/integrations/supabase/client';

const handlePayment = async () => {
  try {
    // Call the Stripe checkout edge function
    const { data, error } = await supabase
      .functions
      .invoke('stripe-checkout', {
        body: { productId: 'prod_123', quantity: 1 }
      });
      
    if (error) throw error;
    
    // Redirect to Stripe Checkout
    window.location.href = data.url;
  } catch (error) {
    console.error('Error initiating payment:', error);
  }
};`}
                  </code>
                </pre>
              </div>
            </TabsContent>
            
            <TabsContent value="paypal" className="cyber-card p-6">
              <h2 className="text-xl font-orbitron font-medium mb-4">PayPal Integration</h2>
              <p className="mb-4">
                Integrate PayPal payments into your application:
              </p>
              
              <ol className="space-y-4 mb-6">
                <li className="p-3 bg-cyber-light/20 rounded-md">
                  <strong className="text-neon-blue">Step 1:</strong> Create a PayPal Developer account and get API credentials
                </li>
                <li className="p-3 bg-cyber-light/20 rounded-md">
                  <strong className="text-neon-blue">Step 2:</strong> Set up a server function to create PayPal orders
                </li>
                <li className="p-3 bg-cyber-light/20 rounded-md">
                  <strong className="text-neon-blue">Step 3:</strong> Implement the PayPal Button component in your frontend
                </li>
                <li className="p-3 bg-cyber-light/20 rounded-md">
                  <strong className="text-neon-blue">Step 4:</strong> Handle successful payments and verification
                </li>
              </ol>
              
              <div className="bg-cyber-dark p-4 rounded-md mb-4 overflow-auto">
                <pre className="text-sm">
                  <code>
{`// Example Edge Function for PayPal order creation
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { productId, amount } = await req.json();

    // PayPal API base URL (sandbox or live)
    const baseURL = 'https://api-m.sandbox.paypal.com';
    
    // Get access token
    const tokenResponse = await fetch(\`\${baseURL}/v1/oauth2/token\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': \`Basic \${btoa(\`\${Deno.env.get("PAYPAL_CLIENT_ID")}:\${Deno.env.get("PAYPAL_CLIENT_SECRET")}\`)}\`
      },
      body: 'grant_type=client_credentials'
    });
    
    const tokenData = await tokenResponse.json();
    
    // Create PayPal order
    const orderResponse = await fetch(\`\${baseURL}/v2/checkout/orders\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${tokenData.access_token}\`
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: amount.toString()
          }
        }],
        application_context: {
          return_url: \`\${req.headers.get("origin")}/payment-success\`,
          cancel_url: \`\${req.headers.get("origin")}/payment-canceled\`
        }
      })
    });
    
    const orderData = await orderResponse.json();
    
    return new Response(JSON.stringify(orderData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});`}
                  </code>
                </pre>
              </div>
            </TabsContent>
            
            <TabsContent value="subscriptions" className="cyber-card p-6">
              <h2 className="text-xl font-orbitron font-medium mb-4">Subscription Management</h2>
              <p className="mb-4">
                Implement recurring subscription payments with Stripe:
              </p>
              
              <div className="flex items-center gap-3 mb-4">
                <RefreshCw className="h-5 w-5 text-neon-green" />
                <h3 className="font-medium">Setting up subscription products</h3>
              </div>
              
              <p className="mb-6">
                First, set up your subscription products and pricing in the Stripe Dashboard. Then, implement the subscription flow:
              </p>
              
              <div className="bg-cyber-dark p-4 rounded-md mb-6 overflow-auto">
                <pre className="text-sm">
                  <code>
{`// Example Edge Function for creating a subscription checkout
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { priceId, customerId } = await req.json();

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "");

    // Create a subscription checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer: customerId,
      success_url: \`\${req.headers.get("origin")}/subscription-success?session_id={CHECKOUT_SESSION_ID}\`,
      cancel_url: \`\${req.headers.get("origin")}/subscription-canceled\`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});`}
                  </code>
                </pre>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <BarChart className="h-5 w-5 text-neon-purple" />
                <h3 className="font-medium">Managing subscriptions</h3>
              </div>
              
              <p className="mb-4">
                Provide customers with a portal to manage their subscriptions:
              </p>
              
              <div className="bg-cyber-dark p-4 rounded-md overflow-auto">
                <pre className="text-sm">
                  <code>
{`// Example Edge Function for creating a customer portal session
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerId } = await req.json();

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "");

    // Create a portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: \`\${req.headers.get("origin")}/account\`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});`}
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

export default PaymentsDocsPage;
