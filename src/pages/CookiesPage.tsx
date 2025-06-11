
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Cookie, Settings, BarChart3, Shield } from 'lucide-react';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-cyber">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Cookie className="h-8 w-8 text-neon-blue" />
              <h1 className="font-orbitron text-4xl font-bold cyber-text-glow">
                Cookie Policy
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              How HACK THE ROOT uses cookies and similar technologies
            </p>
          </div>

          <div className="space-y-8">
            <section className="bg-cyber-dark border border-cyber-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Cookie className="h-5 w-5 text-neon-blue" />
                <h2 className="font-orbitron text-xl font-semibold text-white">What Are Cookies</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                </p>
                <p>
                  HACK THE ROOT uses cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                </p>
              </div>
            </section>

            <section className="bg-cyber-dark border border-cyber-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="h-5 w-5 text-neon-blue" />
                <h2 className="font-orbitron text-xl font-semibold text-white">Types of Cookies We Use</h2>
              </div>
              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-white mb-2">Essential Cookies</h3>
                  <p>These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">Performance Cookies</h3>
                  <p>These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">Functional Cookies</h3>
                  <p>These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages.</p>
                </div>
              </div>
            </section>

            <section className="bg-cyber-dark border border-cyber-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="h-5 w-5 text-neon-blue" />
                <h2 className="font-orbitron text-xl font-semibold text-white">Third-Party Cookies</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We may use third-party services that place cookies on your device:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Google Analytics:</strong> To understand how visitors use our website</li>
                  <li><strong>Authentication Services:</strong> To manage user sessions securely</li>
                  <li><strong>CDN Services:</strong> To improve website performance and loading times</li>
                </ul>
                <p>
                  These third parties have their own privacy policies and cookie policies, which we encourage you to review.
                </p>
              </div>
            </section>

            <section className="bg-cyber-dark border border-cyber-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-5 w-5 text-neon-blue" />
                <h2 className="font-orbitron text-xl font-semibold text-white">Managing Cookies</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
                </p>
                <p>
                  However, if you do this, you may have to manually adjust some preferences every time you visit a site and some services and functionality may not work.
                </p>
                <div className="mt-4">
                  <h3 className="font-semibold text-white mb-2">Browser Settings</h3>
                  <p>Most web browsers allow you to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>See what cookies you have and delete them individually</li>
                    <li>Block third-party cookies</li>
                    <li>Block cookies from particular sites</li>
                    <li>Block all cookies from being set</li>
                    <li>Delete all cookies when you close your browser</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-cyber-dark border border-cyber-border rounded-lg p-6">
              <h2 className="font-orbitron text-xl font-semibold text-white mb-4">Updates to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our practices. We will notify you of any significant changes by posting the updated policy on our website.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>
            </section>

            <section className="bg-cyber-dark border border-cyber-border rounded-lg p-6">
              <h2 className="font-orbitron text-xl font-semibold text-white mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about our use of cookies, please contact us at{' '}
                <Link to="/connect/contact" className="text-neon-blue hover:underline">
                  cookies@hacktheroot.com
                </Link>
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
