
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';

interface FAQCategory {
  name: string;
  faqs: {
    question: string;
    answer: React.ReactNode;
  }[];
}

const faqCategories: FAQCategory[] = [
  {
    name: "General",
    faqs: [
      {
        question: "What is TemplateX?",
        answer: "TemplateX is a platform that offers high-quality, cyberpunk-themed website templates and UI components for modern web applications. Our templates are built with React, Tailwind CSS, and other modern technologies to provide a cutting-edge user experience."
      },
      {
        question: "How do I get started with TemplateX?",
        answer: "To get started, browse our template collection and select one that fits your project needs. After purchasing, you can download the template files from your account dashboard and follow the installation instructions provided in the documentation."
      },
      {
        question: "Do I need to credit TemplateX when using a template?",
        answer: "No, you don't need to provide credit when using our templates. All templates come with a standard license that allows you to use them without attribution. However, we appreciate mentions and shares if you're happy with our products!"
      },
      {
        question: "Can I use these templates for client projects?",
        answer: "Yes, our standard license allows you to use the templates for both personal and client projects. You can use a single purchase for one end product (yours or a client's). For multiple clients or multiple projects, you would need to purchase additional licenses."
      }
    ]
  },
  {
    name: "Technical",
    faqs: [
      {
        question: "What technologies are used in your templates?",
        answer: "Our templates are built with React, TypeScript, Tailwind CSS, and other modern web technologies. We also use libraries like Shadcn UI, React Query, and Supabase for enhanced functionality and features."
      },
      {
        question: "Do I need coding knowledge to use these templates?",
        answer: "Basic knowledge of React and JavaScript/TypeScript is recommended to customize the templates effectively. However, we provide comprehensive documentation to help you get started even if you're relatively new to these technologies."
      },
      {
        question: "Are the templates responsive?",
        answer: "Yes, all our templates are fully responsive and work well on all screen sizes, from mobile devices to large desktop monitors. We use Tailwind CSS for responsive design, ensuring a great user experience across all devices."
      },
      {
        question: "Can I integrate these templates with a backend?",
        answer: "Absolutely! Our templates are designed to be backend-agnostic. They can be integrated with any REST or GraphQL API. Some templates also come with Supabase integration examples for authentication, database, and storage functionality."
      }
    ]
  },
  {
    name: "Licensing & Pricing",
    faqs: [
      {
        question: "What does the license include?",
        answer: "Our standard license grants you non-exclusive rights to use the template for one end product (yours or a client's). It includes all template files, documentation, and access to updates for the purchased template."
      },
      {
        question: "Do you offer refunds?",
        answer: "Yes, we offer a 14-day money-back guarantee if you're not satisfied with the template. Please contact our support team with your purchase details to process the refund."
      },
      {
        question: "Can I upgrade my license later?",
        answer: "Yes, you can upgrade from a standard license to an extended license by paying the difference in price. Contact our support team for assistance with license upgrades."
      },
      {
        question: "Do you offer discounts for bulk purchases?",
        answer: "Yes, we offer discounts for purchasing multiple templates or for agencies requiring multiple licenses. Please contact our sales team for more information on bulk pricing."
      }
    ]
  },
  {
    name: "Support & Updates",
    faqs: [
      {
        question: "How long do I receive updates for?",
        answer: "You receive lifetime updates for the purchased template. This includes bug fixes, security updates, and feature enhancements within the same major version."
      },
      {
        question: "How can I get support if I have issues?",
        answer: (
          <>
            We offer support through multiple channels:
            <ul className="list-disc list-inside mt-2 ml-4 space-y-1 text-muted-foreground">
              <li>Documentation and help center</li>
              <li>Email support</li>
              <li>Discord community</li>
              <li>GitHub discussions (for code-related issues)</li>
            </ul>
            Premium templates also include priority email support.
          </>
        )
      },
      {
        question: "Do you offer customization services?",
        answer: "Yes, we offer custom development services to modify templates according to your specific needs. Contact our development team with your requirements for a quote."
      },
      {
        question: "How often are templates updated?",
        answer: "We regularly update our templates to ensure they remain compatible with the latest versions of React, Tailwind, and other dependencies. Major updates typically occur every 3-6 months, with smaller updates and bug fixes released as needed."
      }
    ]
  }
];

const FAQPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto mb-12 text-center">
          <div className="flex justify-center mb-6">
            <HelpCircle className="h-12 w-12 text-neon-pink" />
          </div>
          <h1 className="text-4xl font-orbitron font-bold mb-4 cyber-text-glow">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our templates and services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          <div className="lg:col-span-1">
            <div className="sticky top-24 cyber-card p-4 space-y-2">
              {faqCategories.map((category, index) => (
                <a 
                  key={index}
                  href={`#${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block p-2 rounded-md hover:bg-cyber-light/30 transition-colors"
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 space-y-10">
            {faqCategories.map((category, categoryIndex) => (
              <div 
                key={categoryIndex} 
                id={category.name.toLowerCase().replace(/\s+/g, '-')}
                className="scroll-mt-24"
              >
                <h2 className="text-2xl font-orbitron font-medium mb-6">{category.name}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem 
                      key={faqIndex} 
                      value={`${categoryIndex}-${faqIndex}`}
                      className="border-cyber-border"
                    >
                      <AccordionTrigger className="text-left hover:text-neon-blue">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="text-muted-foreground py-2">
                          {faq.answer}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>

        <div className="cyber-card p-8 bg-gradient-to-br from-cyber-dark to-cyber text-center">
          <h3 className="text-2xl font-orbitron font-medium mb-3">Still have questions?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            If you couldn't find the answer to your question, feel free to reach out to our support team. We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="cyber-button bg-neon-blue hover:bg-neon-blue/90 text-black font-medium">
              <Link to="/connect/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" className="cyber-button">
              <Link to="/docs">Browse Documentation</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQPage;
