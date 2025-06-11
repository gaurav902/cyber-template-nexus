
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Shield, Lock, Eye, Database } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cyber">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shield className="h-8 w-8 text-neon-blue" />
              <h1 className="font-orbitron text-4xl font-bold cyber-text-glow">
                Privacy Policy
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              How HACK THE ROOT protects and handles your information
            </p>
          </div>

          <div className="space-y-8">
            <section className="bg-cyber-dark border border-cyber-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="h-5 w-5 text-neon-blue" />
                <h2 className="font-orbitron text-xl font-semibold text-white">Information We Collect</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  At HACK THE ROOT, we collect minimal information necessary to provide our design creation platform services:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Account information (email address, username)</li>
                  <li>Usage analytics (pages visited, designs downloaded)</li>
                  <li>Device and browser information for optimization</li>
                  <li>Cookies for authentication and preferences</li>
                </ul>
              </div>
            </section>

            <section className="bg-cyber-dark border border-cyber-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-5 w-5 text-neon-blue" />
                <h2 className="font-orbitron text-xl font-semibold text-white">How We Use Your Data</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>Your information is used to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide access to our design library</li>
                  <li>Improve user experience and platform performance</li>
                  <li>Send important service updates and notifications</li>
                  <li>Prevent fraud and ensure platform security</li>
                </ul>
              </div>
            </section>

            <section className="bg-cyber-dark border border-cyber-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-5 w-5 text-neon-blue" />
                <h2 className="font-orbitron text-xl font-semibold text-white">Data Protection</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We implement industry-standard security measures to protect your data:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encrypted data transmission (SSL/TLS)</li>
                  <li>Secure database storage with access controls</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to personal information</li>
                </ul>
              </div>
            </section>

            <section className="bg-cyber-dark border border-cyber-border rounded-lg p-6">
              <h2 className="font-orbitron text-xl font-semibold text-white mb-4">Your Rights</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal data</li>
                  <li>Request data correction or deletion</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Export your data in a portable format</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, contact us at{' '}
                  <Link to="/connect/contact" className="text-neon-blue hover:underline">
                    privacy@hacktheroot.com
                  </Link>
                </p>
              </div>
            </section>

            <section className="bg-cyber-dark border border-cyber-border rounded-lg p-6">
              <h2 className="font-orbitron text-xl font-semibold text-white mb-4">Updates to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
