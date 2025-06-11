
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { FileText, Users, AlertTriangle, Scale } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cyber">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Scale className="h-8 w-8 text-neon-blue" />
              <h1 className="font-orbitron text-4xl font-bold cyber-text-glow">
                Terms of Service
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Legal terms and conditions for using HACK THE ROOT
            </p>
          </div>

          <div className="space-y-8">
            <section className="bg-cyber-dark border border-cyber-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-5 w-5 text-neon-blue" />
                <h2 className="font-orbitron text-xl font-semibold text-white">Acceptance of Terms</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  By accessing and using HACK THE ROOT ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
                </p>
                <p>
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>
            </section>

            <section className="bg-cyber-dark border border-cyber-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-5 w-5 text-neon-blue" />
                <h2 className="font-orbitron text-xl font-semibold text-white">Use License</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Permission is granted to temporarily download and use the designs from HACK THE ROOT for personal and commercial use, provided that:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You do not redistribute designs as standalone products</li>
                  <li>You may modify designs for your specific needs</li>
                  <li>Attribution to HACK THE ROOT is appreciated but not required</li>
                  <li>You do not claim original authorship of unmodified designs</li>
                </ul>
              </div>
            </section>

            <section className="bg-cyber-dark border border-cyber-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-5 w-5 text-neon-blue" />
                <h2 className="font-orbitron text-xl font-semibold text-white">Disclaimer</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The designs and materials on HACK THE ROOT are provided on an 'as is' basis. To the fullest extent permitted by law, this Company:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Excludes all representations and warranties relating to this website and its contents</li>
                  <li>Excludes all liability for damages arising out of or in connection with your use of this website</li>
                  <li>Does not guarantee compatibility with all systems or browsers</li>
                  <li>Does not warrant that designs are error-free or secure</li>
                </ul>
              </div>
            </section>

            <section className="bg-cyber-dark border border-cyber-border rounded-lg p-6">
              <h2 className="font-orbitron text-xl font-semibold text-white mb-4">Prohibited Uses</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You may not use our service:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                </ul>
              </div>
            </section>

            <section className="bg-cyber-dark border border-cyber-border rounded-lg p-6">
              <h2 className="font-orbitron text-xl font-semibold text-white mb-4">Revisions and Errata</h2>
              <p className="text-muted-foreground">
                The materials appearing on HACK THE ROOT could include technical, typographical, or photographic errors. HACK THE ROOT does not warrant that any of the materials on its website are accurate, complete, or current. HACK THE ROOT may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            <section className="bg-cyber-dark border border-cyber-border rounded-lg p-6">
              <h2 className="font-orbitron text-xl font-semibold text-white mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us at{' '}
                <Link to="/connect/contact" className="text-neon-blue hover:underline">
                  legal@hacktheroot.com
                </Link>
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
