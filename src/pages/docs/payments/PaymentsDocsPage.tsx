import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { CreditCard, DollarSign, ShoppingCart, Receipt, Shield, Settings, Repeat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PaymentsDocsPage = () => {
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
              <div className="w-10 h-10 mr-4 flex items-center justify-center bg-indigo-500/20 rounded-md">
                <CreditCard className="h-6 w-6 text-indigo-400" />
              </div>
              <h1 className="text-3xl font-orbitron font-bold">
                Payment Gateways
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Secure payment processing with Stripe and PayPal integration
            </p>
          </div>

          <div className="space-y-12">
            <div className="cyber-panel p-6">
              <h2 className="text-xl font-orbitron font-medium mb-4">Overview</h2>
              <p className="mb-4">
                HTR templates include built-in support for popular payment gateways, allowing you to easily add payment processing to your applications. Our integrations focus on security, ease of use, and comprehensive feature sets.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start p-3 bg-cyber-light/30 rounded-md">
                  <DollarSign className="h-5 w-5 text-indigo-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">One-time Payments</h3>
                    <p className="text-sm text-muted-foreground">
                      Process single transactions for products or services
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-cyber-light/30 rounded-md">
                  <Repeat className="h-5 w-5 text-indigo-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Subscriptions</h3>
                    <p className="text-sm text-muted-foreground">
                      Recurring billing for membership or subscription models
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-cyber-light/30 rounded-md">
                  <ShoppingCart className="h-5 w-5 text-indigo-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Shopping Cart</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete e-commerce checkout solutions
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-cyber-light/30 rounded-md">
                  <Shield className="h-5 w-5 text-indigo-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Security Features</h3>
                    <p className="text-sm text-muted-foreground">
                      Fraud prevention and data protection
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-orbitron font-medium mb-4">Stripe Integration</h2>
              <div className="cyber-panel p-6 space-y-4">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png" 
                    alt="Stripe" 
                    className="h-8 mr-4" 
                  />
                  <p className="text-muted-foreground text-sm">
                    Stripe is our recommended payment processor for web applications
                  </p>
                </div>
                <p>
                  Setting up Stripe with HTR templates is straightforward:
                </p>
                <ol className="list-decimal pl-6 space-y-3 text-muted-foreground mb-4">
                  <li>
                    <span className="text-white font-medium">Create a Stripe account</span>: 
                    Visit <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">stripe.com</a> and sign up
                  </li>
                  <li>
                    <span className="text-white font-medium">Get your API keys</span>: 
                    Find your publishable and secret keys in the Stripe Dashboard
                  </li>
                  <li>
                    <span className="text-white font-medium">Install Stripe packages</span>: 
                    Add the necessary libraries to your project
                  </li>
                  <li>
                    <span className="text-white font-medium">Configure your template</span>: 
                    Add your Stripe keys to your environment variables
                  </li>
                </ol>
                <div className="bg-cyber-dark p-4 rounded-md border border-cyber-border">
                  <p className="text-sm text-muted-foreground mb-2">Basic Stripe Checkout implementation:</p>
                  <pre className="font-mono text-xs text-indigo-400 overflow-x-auto">
                    <code>
{`import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load Stripe outside component to avoid recreating Stripe object
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Payment form component
function CheckoutForm({ paymentAmount }: { paymentAmount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    
    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    
    if (error) {
      console.error(error);
    } else {
      // Send payment method ID to your server
      const { id } = paymentMethod;
      // Process payment on server...
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay ${paymentAmount}</button>
    </form>
  );
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-orbitron font-medium mb-4">PayPal Integration</h2>
              <div className="cyber-panel p-6 space-y-4">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/PayPal_logo.svg/2560px-PayPal_logo.svg.png" 
                    alt="PayPal" 
                    className="h-6 mr-4" 
                  />
                  <p className="text-muted-foreground text-sm">
                    PayPal integration for broader payment options
                  </p>
                </div>
                <p className="mb-4">
                  HTR templates support PayPal integration for customers who prefer this payment method:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li>PayPal Standard Checkout buttons</li>
                  <li>PayPal Smart Buttons with multiple funding options</li>
                  <li>Express checkout flows</li>
                  <li>Subscription billing through PayPal</li>
                </ul>
                <div className="bg-cyber-dark p-4 rounded-md border border-cyber-border">
                  <p className="text-sm text-muted-foreground mb-2">Basic PayPal Button implementation:</p>
                  <pre className="font-mono text-xs text-indigo-400 overflow-x-auto">
                    <code>
{`import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

function PayPalCheckout({ amount }) {
  return (
    <PayPalScriptProvider 
      options={{ 
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID 
      }}
    >
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            // Handle successful payment
            console.log("Payment successful", details);
          });
        }}
      />
    </PayPalScriptProvider>
  );
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-orbitron font-medium mb-4">Backend Integration</h2>
              <div className="cyber-panel p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Receipt className="h-5 w-5 text-indigo-400" />
                  <h3 className="font-medium">Securing Payment Processing</h3>
                </div>
                <p className="mb-4 text-muted-foreground">
                  For secure payment processing, sensitive operations should always be handled on the server side. HTR templates include Supabase edge functions for secure payment processing:
                </p>
                <div className="bg-cyber-dark p-4 rounded-md border border-cyber-border mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Example Stripe server-side processing:</p>
                  <pre className="font-mono text-xs text-indigo-400 overflow-x-auto">
                    <code>
{`// Supabase Edge Function
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@11.18.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'), {
  apiVersion: '2022-11-15',
})

serve(async (req) => {
  try {
    const { paymentMethodId, amount, currency = 'usd' } = await req.json()
    
    // Create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency,
      payment_method: paymentMethodId,
      confirm: true,
    })
    
    return new Response(JSON.stringify({ 
      success: true, 
      paymentIntent 
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})`}
                    </code>
                  </pre>
                </div>
                <div className="flex items-center gap-3 mb-4 mt-6">
                  <Settings className="h-5 w-5 text-indigo-400" />
                  <h3 className="font-medium">Webhooks for Event Handling</h3>
                </div>
                <p className="text-muted-foreground">
                  Implement webhooks to handle payment events like successful payments, failed charges, and subscription updates. HTR templates include examples for setting up webhooks with both Stripe and PayPal.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 p-6 cyber-panel bg-gradient-to-br from-cyber-dark to-cyber">
            <h3 className="text-xl font-orbitron font-medium mb-4">Best Practices for Payment Processing</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Never store credit card details in your database</li>
              <li>Always use HTTPS for all payment-related pages</li>
              <li>Implement proper error handling for payment failures</li>
              <li>Keep your API keys secure and never expose them in client-side code</li>
              <li>Implement idempotency keys to prevent duplicate charges</li>
              <li>Add comprehensive logging for troubleshooting payment issues</li>
              <li>Test thoroughly with sandbox/test mode before going live</li>
            </ul>
            <div className="flex justify-center">
              <Button className="cyber-button bg-indigo-500/90 hover:bg-indigo-500 text-white font-medium">
                <Link to="/support/help-center">
                  Need Help With Payments?
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-12 mb-6 flex justify-between items-center">
            <Link to="/docs/supabase" className="text-neon-blue hover:underline inline-flex items-center">
              ← Supabase Integration
            </Link>
            <Link to="/docs/analytics" className="text-neon-blue hover:underline inline-flex items-center">
              Analytics Integration →
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentsDocsPage;
