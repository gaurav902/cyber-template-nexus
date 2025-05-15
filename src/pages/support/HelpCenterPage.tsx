
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { HelpCircle, Search, BookOpen, Code, LifeBuoy, FileText, Zap } from 'lucide-react';
import { useState } from 'react';

interface HelpArticle {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  link: string;
}

const helpArticles: HelpArticle[] = [
  {
    id: '1',
    title: 'Getting Started with Templates',
    category: 'Basics',
    excerpt: 'Learn how to download, install, and set up your template for the first time.',
    link: '/docs#getting-started'
  },
  {
    id: '2',
    title: 'Customizing Template Styles',
    category: 'Customization',
    excerpt: 'How to modify colors, typography, and other design elements to match your brand.',
    link: '/docs#customization'
  },
  {
    id: '3',
    title: 'Connecting to Supabase Backend',
    category: 'Integration',
    excerpt: 'Step-by-step guide to connect your template to Supabase for data management.',
    link: '/docs/supabase'
  },
  {
    id: '4',
    title: 'Troubleshooting Common Issues',
    category: 'Support',
    excerpt: 'Solutions to the most frequently encountered problems and errors.',
    link: '/support/faqs'
  },
  {
    id: '5',
    title: 'Optimizing Template Performance',
    category: 'Advanced',
    excerpt: 'Tips and techniques to ensure your website loads quickly and performs well.',
    link: '/docs/performance'
  },
  {
    id: '6',
    title: 'Adding Custom Functionality',
    category: 'Development',
    excerpt: 'How to extend your template with custom components and features.',
    link: '/docs/custom-development'
  }
];

const popularTopics = [
  { title: 'Installation Guide', icon: Zap, link: '/docs#installation' },
  { title: 'Styling Components', icon: Code, link: '/docs#customization' },
  { title: 'User Authentication', icon: LifeBuoy, link: '/docs/authentication' },
  { title: 'Template Updates', icon: FileText, link: '/docs/updates' }
];

const HelpCenterPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<HelpArticle[]>(helpArticles);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredArticles(helpArticles);
    } else {
      const results = helpArticles.filter(
        article => 
          article.title.toLowerCase().includes(query) || 
          article.category.toLowerCase().includes(query) || 
          article.excerpt.toLowerCase().includes(query)
      );
      setFilteredArticles(results);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto mb-12 text-center">
          <div className="flex justify-center mb-6">
            <HelpCircle className="h-12 w-12 text-neon-green" />
          </div>
          <h1 className="text-4xl font-orbitron font-bold mb-4 cyber-text-glow">
            Help Center
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Find answers to your questions and learn how to get the most out of our templates
          </p>
          <div className="relative max-w-2xl mx-auto mb-16">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for help articles..."
              className="pl-10 py-6 text-lg bg-cyber-light border-cyber-border focus:border-neon-blue/70"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-orbitron font-medium mb-6">Popular Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTopics.map((topic, index) => (
              <Link key={index} to={topic.link}>
                <div className="cyber-card p-6 hover:cyber-border-glow transition-all duration-300 h-full flex flex-col items-center text-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-cyber-light/50 mb-4">
                    <topic.icon className="h-6 w-6 text-neon-blue" />
                  </div>
                  <h3 className="font-medium text-lg">{topic.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-orbitron font-medium mb-6">Help Articles</h2>
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map(article => (
                <Link key={article.id} to={article.link}>
                  <div className="cyber-card p-6 hover:cyber-border-glow transition-all duration-300 h-full">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium text-lg">{article.title}</h3>
                      <span className="text-xs bg-cyber-light/30 px-2 py-1 rounded text-neon-blue">
                        {article.category}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{article.excerpt}</p>
                    <span className="text-neon-blue hover:underline text-sm flex items-center">
                      Read more 
                      <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="cyber-card p-8 text-center">
              <h3 className="text-xl font-medium mb-2">No results found</h3>
              <p className="text-muted-foreground mb-6">We couldn't find any articles matching your search.</p>
              <Button 
                onClick={() => { setSearchQuery(''); setFilteredArticles(helpArticles); }} 
                className="cyber-button"
                variant="outline"
              >
                Clear search
              </Button>
            </div>
          )}
        </div>

        <div className="cyber-card p-8 bg-gradient-to-br from-cyber-dark to-cyber">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-neon-purple/20 text-neon-purple">
              <BookOpen className="h-10 w-10" />
            </div>
            <div>
              <h3 className="text-2xl font-orbitron font-medium mb-3">Can't find what you're looking for?</h3>
              <p className="text-muted-foreground mb-6">
                Browse our comprehensive documentation or contact our support team for personalized assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="cyber-button bg-neon-purple hover:bg-neon-purple/90 text-white font-medium">
                  <Link to="/docs">Complete Documentation</Link>
                </Button>
                <Button variant="outline" className="cyber-button">
                  <Link to="/connect/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HelpCenterPage;
