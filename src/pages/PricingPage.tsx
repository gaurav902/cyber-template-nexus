
import React from 'react';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { CheckIcon } from 'lucide-react';

const PricingPage = () => {
  const pricingPlans = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for getting started",
      features: [
        "Access to 10 templates",
        "Community support",
        "Basic documentation"
      ],
      isPopular: false,
      buttonText: "Get Started"
    },
    {
      name: "Premium",
      price: "$49",
      description: "For professional developers",
      features: [
        "Access to all templates",
        "Priority support",
        "Premium documentation",
        "Custom branding",
        "Regular updates"
      ],
      isPopular: true,
      buttonText: "Subscribe Now"
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large teams & companies",
      features: [
        "All Premium features",
        "Dedicated support",
        "Custom development",
        "Team collaboration",
        "API access"
      ],
      isPopular: false,
      buttonText: "Contact Us"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="font-orbitron text-4xl font-bold mb-4">
              Simple, Transparent <span className="text-neon-blue">Pricing</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works best for your needs. All plans include access to our core features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`cyber-panel p-6 relative ${
                  plan.isPopular ? 'cyber-border-glow border-neon-blue' : ''
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-neon-blue text-black px-3 py-1 text-sm font-medium">
                    Popular
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="font-orbitron text-xl font-bold">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && plan.price !== "Free" && (
                      <span className="text-muted-foreground ml-1">/month</span>
                    )}
                  </div>
                  <p className="text-muted-foreground mt-2">{plan.description}</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-neon-green mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={`w-full cyber-button ${
                    plan.isPopular ? 'bg-neon-blue text-black hover:bg-neon-blue/90' : ''
                  }`}
                  variant={plan.isPopular ? 'default' : 'outline'}
                >
                  {plan.buttonText}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PricingPage;
