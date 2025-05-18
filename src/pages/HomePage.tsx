
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowDown, Layers, Flame, Clock, Code, Zap, Shield, Users, BookOpen, Monitor, 
  TerminalSquare, Workflow, Cpu, GitBranch, Database, BarChart3, LayoutDashboard, Globe, CloudLightning,
  Search, SlidersHorizontal, Star } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent, useSpring, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { TemplateCard } from '@/components/template-card';
import { Template } from '@/types/templates';
import { useQuery } from '@tanstack/react-query';
import { fetchTrendingTemplates, fetchFeaturedTemplates, fetchLatestTemplates } from '@/services/dashboard';
import { getCategories } from '@/services/categories';
import { Category } from '@/services/categories';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

// Define the Download icon component first before using it
const Download = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={cn("lucide lucide-download", className)}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

const HomePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const trendingRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const latestRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  // Section inView states
  const heroInView = useInView(heroRef, { once: false });
  const featuresInView = useInView(featuresRef, { once: false });
  const statsInView = useInView(statsRef, { once: true });
  const trendingInView = useInView(trendingRef, { once: true });
  const categoriesInView = useInView(categoriesRef, { once: true });
  const latestInView = useInView(latestRef, { once: true });
  const testimonialsInView = useInView(testimonialsRef, { once: true });
  
  // Parallax effects with useScroll
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const parallaxY1 = useTransform(smoothProgress, [0, 1], [0, -100]);
  const parallaxY2 = useTransform(smoothProgress, [0, 1], [0, 100]);
  const rotate = useTransform(smoothProgress, [0, 1], [0, 360]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  
  // Interactive header effect
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollY(latest);
  });
  
  // Type casting to ensure compatibility with Template type
  const { data: trendingTemplates = [], isLoading: isLoadingTrending } = useQuery({
    queryKey: ['trendingTemplates'],
    queryFn: fetchTrendingTemplates,
  });
  
  const { data: recentTemplates = [], isLoading: isLoadingRecent } = useQuery({
    queryKey: ['latestTemplates'],
    queryFn: fetchLatestTemplates,
  });
  
  const { data: featuredTemplates = [], isLoading: isLoadingFeatured } = useQuery({
    queryKey: ['featuredTemplates'],
    queryFn: fetchFeaturedTemplates,
  });
  
  const { data: categoriesData = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  
  // Format categories with data from the database
  const categories = categoriesData.map((category: Category) => ({
    id: category.id,
    name: category.name,
    description: category.description || '',
    count: Math.floor(Math.random() * 20) + 5, // Placeholder for template count
    icon: category.image_url || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3"
  }));

  // Filter templates based on search
  const filteredTemplates = [...trendingTemplates, ...recentTemplates, ...featuredTemplates]
    .filter((template: any) => template.title?.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((template: any, index: number, self: any[]) => 
      self.findIndex((t: any) => t.id === template.id) === index
    );

  // Stats to display
  const stats = [
    { count: '200+', label: 'Templates', icon: LayoutDashboard },
    { count: '20+', label: 'Categories', icon: Layers },
    { count: '5000+', label: 'Downloads', icon: Download },
    { count: '98%', label: 'Satisfaction', icon: Star }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const scaleIn = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
  };
  
  const slideIn = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
  };
  
  const countUp = {
    hidden: { opacity: 0, count: 0 },
    visible: { opacity: 1, count: 100, transition: { duration: 2 } }
  };
  
  const formatTemplate = (templateData: any): Template => ({
    id: templateData.id,
    title: templateData.title,
    description: templateData.description,
    thumbnail: templateData.thumbnail,
    category_id: templateData.category_id || null,
    tags: templateData.tags || [],
    status: templateData.status as "published" | "draft",
    views: templateData.views,
    rating: templateData.rating,
    created_at: templateData.created_at,
    updated_at: templateData.updated_at,
    github_url: templateData.github_url || null,
    demo_url: templateData.demo_url || null,
    download_url: templateData.download_url || null
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Searching templates",
      description: `Found ${filteredTemplates.length} templates matching "${searchQuery}"`,
    });
  };

  // 3D tilt effect handler
  const handleTiltEffect = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const boundingRect = card.getBoundingClientRect();
    const centerX = boundingRect.left + boundingRect.width / 2;
    const centerY = boundingRect.top + boundingRect.height / 2;
    const percentX = (e.clientX - centerX) / (boundingRect.width / 2);
    const percentY = (e.clientY - centerY) / (boundingRect.height / 2);
    
    card.style.transform = `perspective(1000px) rotateY(${percentX * 5}deg) rotateX(${percentY * -5}deg)`;
  };
  
  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
  };
  
  const Download = ({ className }: { className?: string }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={cn("lucide lucide-download", className)}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );

  return (
    <>
      <motion.div 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 backdrop-blur-lg transition-all duration-300",
          scrollY > 0.05 ? "bg-cyber-dark/80 shadow-md shadow-neon-blue/10" : "bg-transparent"
        )}
      >
        <Navbar />
      </motion.div>
      
      <div className="pt-16"> {/* Padding to offset fixed navbar */}
        {/* Hero Section with Interactive 3D Effect */}
        <motion.section 
          ref={heroRef}
          className="relative min-h-[100vh] flex items-center bg-cyber overflow-hidden"
        >
          {/* Dynamic background effects */}
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.15),transparent_40%),radial-gradient(circle_at_70%_30%,rgba(30,174,219,0.15),transparent_35%)]"
            style={{ 
              scale,
              opacity
            }}
          />
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className={`absolute w-${Math.floor(Math.random() * 3) + 1} h-${Math.floor(Math.random() * 3) + 1} rounded-full bg-neon-${['blue', 'purple', 'green'][Math.floor(Math.random() * 3)]}/20`}
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{
                  x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                  y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: Math.random() * 20 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>

          {/* Grid overlay */}
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(10, 10, 10, 0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }} />

          <motion.div 
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="container mx-auto px-4 py-20 relative z-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeInUp}>
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="inline-block py-1 px-3 rounded-full bg-neon-blue/10 text-neon-blue text-sm mb-6 border border-neon-blue/30"
                >
                  The Future is Now
                </motion.span>
                <motion.h1 
                  className="font-orbitron text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6"
                  variants={fadeInUp}
                >
                  <span className="text-shimmer bg-gradient-to-r from-white via-neon-blue to-neon-purple bg-[length:200%_100%]">HTR</span>
                  <span className="block md:mt-2 text-3xl md:text-4xl lg:text-5xl">Next-Gen Templates</span>
                </motion.h1>
                <motion.p 
                  className="text-lg text-muted-foreground mb-8 max-w-lg"
                  variants={fadeInUp}
                >
                  Discover our collection of futuristic, high-performance website templates 
                  with cutting-edge features and stunning animations.
                </motion.p>
                
                {/* Search component */}
                <motion.form 
                  className="relative mb-8"
                  variants={fadeInUp}
                  onSubmit={handleSearch}
                >
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-24 py-6 bg-cyber-light/40 border-cyber-border focus:border-neon-blue"
                  />
                  <Button 
                    type="submit"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 cyber-button bg-neon-blue hover:bg-neon-blue/90 text-black font-medium"
                  >
                    Search
                  </Button>
                </motion.form>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  variants={fadeInUp}
                >
                  <Button 
                    size="lg" 
                    className="cyber-button bg-neon-purple hover:bg-neon-purple/90 text-white font-medium group relative overflow-hidden"
                    onClick={() => navigate('/templates')}
                  >
                    <span className="relative z-10">Explore Templates</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-green opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="cyber-button group relative overflow-hidden"
                    onClick={() => navigate('/get-started')}
                  >
                    <span className="relative z-10 flex items-center">
                      Learn More 
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Button>
                </motion.div>
                
                <motion.div 
                  className="mt-8 flex items-center gap-4"
                  variants={fadeInUp}
                >
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <motion.div 
                        key={i} 
                        className="w-8 h-8 rounded-full bg-cyber-light border border-cyber-border flex items-center justify-center text-xs"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {i}
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    <span className="text-white">200+</span> Premium Templates
                  </span>
                </motion.div>
              </motion.div>
              
              {/* 3D Interactive Preview */}
              <motion.div 
                className="hidden lg:flex items-center justify-center relative perspective-1000"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.div
                  className="absolute w-64 h-64 rounded-full bg-neon-purple/10 filter blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                <motion.div
                  className="absolute w-72 h-72 rounded-full bg-neon-blue/10 filter blur-3xl"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.5, 0.3, 0.5],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* 3D Tilt Card Effect */}
                <motion.div
                  className="relative cyber-panel aspect-[4/3] overflow-hidden cyber-purple-glow z-10"
                  initial={{ y: 30 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  onMouseMove={handleTiltEffect}
                  onMouseLeave={resetTilt}
                  style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease' }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="Dashboard Template Preview" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-orbitron text-lg font-medium">Enterprise Dashboard</h3>
                    <p className="text-white/70 text-sm">Real-time analytics & monitoring</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-6 -left-6 w-40 aspect-square cyber-panel cyber-border-glow z-20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  onMouseMove={handleTiltEffect}
                  onMouseLeave={resetTilt}
                  style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease' }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1555066932-e78dd8fb77bb?q=80&w=3438&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="Code snippet" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <h3 className="text-white font-orbitron text-xs font-medium">TypeScript</h3>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -top-8 -right-8 w-32 aspect-square cyber-panel cyber-green-glow z-20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  onMouseMove={handleTiltEffect}
                  onMouseLeave={resetTilt}
                  style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease' }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1621839673705-6617adf9e890?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="3D element" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <h3 className="text-white font-orbitron text-xs font-medium">3D Models</h3>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            
            <motion.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="h-6 w-6 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Animated Stats Section - New Section */}
        <motion.section 
          ref={statsRef}
          className="relative py-16 bg-cyber-dark overflow-hidden"
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(30, 174, 219, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 174, 219, 0.03) 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            backgroundPosition: 'center center',
          }} />

          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              animate={statsInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="cyber-card p-6 text-center relative overflow-hidden group"
                  variants={fadeInUp}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 mx-auto rounded-lg bg-neon-blue/10 flex items-center justify-center mb-4 group-hover:bg-neon-blue/20 transition-colors duration-300">
                      <stat.icon className="h-6 w-6 text-neon-blue" />
                    </div>
                    <motion.h3 
                      className="font-orbitron text-3xl font-bold cyber-text-glow"
                      initial={{ opacity: 0 }}
                      animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {stat.count}
                    </motion.h3>
                    <p className="text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section with Interactive Cards */}
        <motion.section 
          ref={featuresRef}
          className="py-24 bg-cyber-dark relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_50%,rgba(139,92,246,0.08),transparent_30%),radial-gradient(circle_at_60%_50%,rgba(30,174,219,0.08),transparent_30%)]"></div>
          
          <motion.div 
            style={{ y: parallaxY1 }}
            className="absolute -left-32 top-1/4 w-64 h-64 rounded-full bg-neon-purple/10 filter blur-[100px]"
          />
          
          <motion.div 
            style={{ y: parallaxY2 }}
            className="absolute -right-32 bottom-1/4 w-64 h-64 rounded-full bg-neon-blue/10 filter blur-[100px]"
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="font-orbitron text-3xl font-bold mb-4">
                Cutting-Edge <span className="text-neon-blue">Features</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our templates are built with the latest technologies and best practices for optimal performance
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                { icon: Code, title: "Modern Code Base", description: "Built with React, TypeScript and modern patterns", color: "blue" },
                { icon: Zap, title: "Lightning Fast", description: "Optimized for speed and performance", color: "purple" },
                { icon: Shield, title: "Secure By Design", description: "Following security best practices", color: "green" },
                { icon: Monitor, title: "Responsive Design", description: "Looks great on any device size", color: "blue" },
                { icon: GitBranch, title: "Version Control", description: "All templates include Git repositories", color: "purple" },
                { icon: Database, title: "API Integration", description: "Ready to connect with your backend", color: "green" },
                { icon: Cpu, title: "Low Memory Footprint", description: "Optimized asset loading and code splitting", color: "blue" },
                { icon: BarChart3, title: "Analytics Ready", description: "Built-in support for tracking user behavior", color: "purple" },
                { icon: Globe, title: "Internationalization", description: "Multi-language support built-in", color: "green" }
              ].map((feature, index) => (
                <motion.div 
                  key={index} 
                  className={`cyber-card p-6 hover:cyber-${feature.color}-glow transition-all duration-300 relative group`}
                  variants={scaleIn}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-neon-${feature.color}/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-lg bg-neon-${feature.color}/20 flex items-center justify-center mb-4 group-hover:bg-neon-${feature.color}/30 transition-colors duration-300`}>
                      <feature.icon className={`h-6 w-6 text-neon-${feature.color}`} />
                    </div>
                    <h3 className="font-orbitron text-xl font-medium mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                  
                  <div className={`absolute bottom-0 left-0 h-1 bg-neon-${feature.color}/50 w-0 group-hover:w-full transition-all duration-500 rounded-b-lg`}></div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Interactive Demo Showcase */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-16 p-8 cyber-panel relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-dark/50 to-cyber-light/5"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <h3 className="font-orbitron text-2xl font-bold mb-4">Interactive Demo Mode</h3>
                  <p className="text-muted-foreground mb-6">Experience templates before you download. Our interactive preview lets you test all features in real-time.</p>
                  <div className="flex space-x-4">
                    <Button 
                      variant="outline"
                      className="gap-2 cyber-button bg-neon-blue/10 hover:bg-neon-blue/20 border-neon-blue/30"
                    >
                      <Workflow className="w-4 h-4" />
                      <span>Try Demo</span>
                    </Button>
                    <Button 
                      variant="outline"
                      className="gap-2 cyber-button"
                    >
                      <TerminalSquare className="w-4 h-4" />
                      <span>View Code</span>
                    </Button>
                  </div>
                </div>
                
                <div className="md:w-1/2 relative">
                  <div className="relative rounded-lg overflow-hidden cyber-border-glow aspect-video">
                    <img 
                      src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=3420&auto=format&fit=crop&ixlib=rb-4.0.3" 
                      alt="Interactive Demo" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      <span className="text-white font-medium">Interactive Preview</span>
                      <Badge variant="outline" className="bg-neon-blue/20 text-neon-blue border-neon-blue/40">
                        Live Demo
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <motion.div 
                    className="absolute -top-4 -right-4 w-12 h-12 bg-neon-purple/20 rounded-lg border border-neon-purple/40 flex items-center justify-center"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity
                    }}
                  >
                    <Cpu className="w-6 h-6 text-neon-purple" />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute -bottom-4 -left-4 w-12 h-12 bg-neon-green/20 rounded-lg border border-neon-green/40 flex items-center justify-center"
                    animate={{ 
                      y: [0, 10, 0],
                      rotate: [0, -5, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      delay: 1
                    }}
                  >
                    <CloudLightning className="w-6 h-6 text-neon-green" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Trending Templates Section with Tab Filtering */}
        <motion.section 
          ref={trendingRef}
          className="py-24 bg-cyber relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.07),transparent_70%)]"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial="hidden"
              animate={trendingInView ? "visible" : "hidden"}
              variants={fadeInUp}
              className="flex flex-col md:flex-row md:items-center justify-between mb-12"
            >
              <div className="mb-6 md:mb-0">
                <div className="flex items-center mb-2">
                  <Flame className="text-neon-purple mr-2 h-5 w-5" />
                  <h2 className="font-orbitron text-2xl font-bold">Trending Templates</h2>
                </div>
                <p className="text-muted-foreground">
                  Most popular templates this month
                </p>
              </div>
              
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList className="bg-cyber-light/40 border border-cyber-border">
                  <TabsTrigger value="all" className="data-[state=active]:bg-neon-purple/20 data-[state=active]:text-neon-purple">All</TabsTrigger>
                  <TabsTrigger value="dashboard" className="data-[state=active]:bg-neon-blue/20 data-[state=active]:text-neon-blue">Dashboards</TabsTrigger>
                  <TabsTrigger value="app" className="data-[state=active]:bg-neon-green/20 data-[state=active]:text-neon-green">Apps</TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>

            <motion.div 
              initial="hidden"
              animate={trendingInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <TabsContent value="all" className="mt-0">
                <Carousel className="w-full">
                  <CarouselContent>
                    {isLoadingTrending ? (
                      <div className="col-span-3 text-center py-12">Loading trending templates...</div>
                    ) : trendingTemplates.length > 0 ? (
                      trendingTemplates.map((templateData: any, index: number) => (
                        <CarouselItem key={`all-${templateData.id}`} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
                          <motion.div variants={scaleIn}>
                            <TemplateCard template={formatTemplate(templateData)} />
                          </motion.div>
                        </CarouselItem>
                      ))
                    ) : (
                      <div className="col-span-3 text-center py-12">No trending templates found</div>
                    )}
                  </CarouselContent>
                  <div className="flex justify-end gap-2 mt-4">
                    <CarouselPrevious className="relative inset-0 transform-none translate-x-0 translate-y-0 right-0 top-0" />
                    <CarouselNext className="relative inset-0 transform-none translate-x-0 translate-y-0 right-0 top-0" />
                  </div>
                </Carousel>
              </TabsContent>
              
              <TabsContent value="dashboard" className="mt-0">
                <Carousel className="w-full">
                  <CarouselContent>
                    {isLoadingTrending ? (
                      <div className="col-span-3 text-center py-12">Loading trending dashboards...</div>
                    ) : (
                      trendingTemplates
                        .filter((t: any) => t.tags?.includes('dashboard') || t.title.toLowerCase().includes('dashboard'))
                        .map((templateData: any, index: number) => (
                          <CarouselItem key={`dashboard-${templateData.id}`} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
                            <motion.div variants={scaleIn}>
                              <TemplateCard template={formatTemplate(templateData)} />
                            </motion.div>
                          </CarouselItem>
                        ))
                    )}
                  </CarouselContent>
                  <div className="flex justify-end gap-2 mt-4">
                    <CarouselPrevious className="relative inset-0 transform-none translate-x-0 translate-y-0 right-0 top-0" />
                    <CarouselNext className="relative inset-0 transform-none translate-x-0 translate-y-0 right-0 top-0" />
                  </div>
                </Carousel>
              </TabsContent>
              
              <TabsContent value="app" className="mt-0">
                <Carousel className="w-full">
                  <CarouselContent>
                    {isLoadingTrending ? (
                      <div className="col-span-3 text-center py-12">Loading trending apps...</div>
                    ) : (
                      trendingTemplates
                        .filter((t: any) => t.tags?.includes('app') || t.title.toLowerCase().includes('app'))
                        .map((templateData: any, index: number) => (
                          <CarouselItem key={`app-${templateData.id}`} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
                            <motion.div variants={scaleIn}>
                              <TemplateCard template={formatTemplate(templateData)} />
                            </motion.div>
                          </CarouselItem>
                        ))
                    )}
                  </CarouselContent>
                  <div className="flex justify-end gap-2 mt-4">
                    <CarouselPrevious className="relative inset-0 transform-none translate-x-0 translate-y-0 right-0 top-0" />
                    <CarouselNext className="relative inset-0 transform-none translate-x-0 translate-y-0 right-0 top-0" />
                  </div>
                </Carousel>
              </TabsContent>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={trendingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 text-center"
            >
              <Link to="/templates" className="inline-flex items-center text-neon-blue hover:underline font-medium">
                View All Templates
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Categories Section with Interactive Cards */}
        <motion.section 
          ref={categoriesRef}
          className="py-24 bg-cyber-dark relative overflow-hidden"
        >
          <motion.div 
            style={{ rotate }}
            className="absolute -right-40 top-40 w-80 h-80 rounded-full border border-neon-purple/10 opacity-30"
          />
          <motion.div 
            style={{ rotate: parallaxY1 }}
            className="absolute -right-60 top-40 w-120 h-120 rounded-full border border-neon-blue/10 opacity-20"
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial="hidden"
              animate={categoriesInView ? "visible" : "hidden"}
              variants={fadeInUp}
              className="flex flex-col md:flex-row md:items-center justify-between mb-12"
            >
              <div className="mb-6 md:mb-0">
                <div className="flex items-center mb-2">
                  <Layers className="text-neon-green mr-2 h-5 w-5" />
                  <h2 className="font-orbitron text-2xl font-bold">Explore Categories</h2>
                </div>
                <p className="text-muted-foreground">
                  Find templates by category
                </p>
              </div>
              <Link to="/categories" className="inline-flex items-center text-neon-blue hover:underline font-medium">
                View All Categories
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </motion.div>

            <motion.div 
              initial="hidden"
              animate={categoriesInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {isLoadingCategories ? (
                <div className="col-span-4 text-center py-12">Loading categories...</div>
              ) : categories.length > 0 ? (
                categories.slice(0, 8).map((category, index) => (
                  <motion.div key={category.id} variants={scaleIn}>
                    <Link to={`/categories/${category.id}`} className="group block h-full">
                      <div className="cyber-card overflow-hidden h-full transition-all duration-500 hover:cyber-border-glow">
                        <div className="aspect-[16/9] relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-cyber to-transparent z-10"></div>
                          <img 
                            src={category.icon}
                            alt={category.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          
                          {/* Category badge */}
                          <div className="absolute top-3 right-3 z-20">
                            <Badge className="bg-cyber-dark/70 border-cyber-border text-xs">
                              {category.count} templates
                            </Badge>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-orbitron font-medium group-hover:text-neon-green transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {category.description || `Explore our ${category.name} templates collection`}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-4 text-center py-12">No categories found</div>
              )}
            </motion.div>
            
            {/* Interactive filter cards */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              <div className="cyber-panel bg-gradient-to-br from-cyber-dark to-cyber-light border-cyber-border p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-lg bg-neon-blue/20 flex items-center justify-center">
                      <SlidersHorizontal className="h-6 w-6 text-neon-blue" />
                    </div>
                    <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30">New</Badge>
                  </div>
                  
                  <h3 className="font-orbitron text-xl font-medium mb-2">Advanced Filters</h3>
                  <p className="text-muted-foreground mb-4">Find exactly what you need with our powerful filtering system.</p>
                  
                  <Button variant="outline" className="gap-2 cyber-button">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Filter Templates</span>
                  </Button>
                </div>
              </div>
              
              <div className="cyber-panel bg-gradient-to-br from-cyber-dark to-cyber-light border-cyber-border p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-lg bg-neon-purple/20 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-neon-purple" />
                    </div>
                    <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">Popular</Badge>
                  </div>
                  
                  <h3 className="font-orbitron text-xl font-medium mb-2">Documentation</h3>
                  <p className="text-muted-foreground mb-4">Comprehensive guides and documentation for all templates.</p>
                  
                  <Button variant="outline" className="gap-2 cyber-button">
                    <BookOpen className="w-4 h-4" />
                    <span>View Docs</span>
                  </Button>
                </div>
              </div>
              
              <div className="cyber-panel bg-gradient-to-br from-cyber-dark to-cyber-light border-cyber-border p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-lg bg-neon-green/20 flex items-center justify-center">
                      <Users className="h-6 w-6 text-neon-green" />
                    </div>
                    <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">Community</Badge>
                  </div>
                  
                  <h3 className="font-orbitron text-xl font-medium mb-2">Support Forum</h3>
                  <p className="text-muted-foreground mb-4">Get help from our community of developers and designers.</p>
                  
                  <Button variant="outline" className="gap-2 cyber-button">
                    <Users className="w-4 h-4" />
                    <span>Join Community</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Recently Added Section with 3D Hover Effects */}
        <motion.section 
          ref={latestRef}
          className="py-24 bg-cyber relative overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(30,174,219,0.1),transparent_70%)]"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial="hidden"
              animate={latestInView ? "visible" : "hidden"}
              variants={fadeInUp}
              className="flex flex-col md:flex-row md:items-center justify-between mb-12"
            >
              <div className="mb-6 md:mb-0">
                <div className="flex items-center mb-2">
                  <Clock className="text-neon-blue mr-2 h-5 w-5" />
                  <h2 className="font-orbitron text-2xl font-bold">Recently Added</h2>
                </div>
                <p className="text-muted-foreground">
                  Fresh templates added to our collection
                </p>
              </div>
              <Link to="/templates?sort=latest" className="inline-flex items-center text-neon-blue hover:underline font-medium">
                View All Latest
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </motion.div>

            <motion.div 
              initial="hidden"
              animate={latestInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {isLoadingRecent ? (
                <div className="col-span-3 text-center py-12">Loading recent templates...</div>
              ) : recentTemplates.length > 0 ? (
                recentTemplates.slice(0, 3).map((templateData: any, i) => {
                  const template = formatTemplate(templateData);
                  return (
                    <motion.div 
                      key={template.id} 
                      variants={scaleIn}
                      className="group"
                      whileHover={{ 
                        y: -5,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <div 
                        className="cyber-card overflow-hidden h-full transition-all duration-300 hover:cyber-border-glow"
                        onMouseMove={handleTiltEffect}
                        onMouseLeave={resetTilt}
                        style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease' }}
                      >
                        <div className="aspect-[16/9] relative overflow-hidden">
                          {/* New label */}
                          <div className="absolute top-3 left-3 z-20">
                            <Badge className="bg-neon-blue text-black font-medium">New</Badge>
                          </div>
                          
                          <img 
                            src={template.thumbnail || `https://images.unsplash.com/photo-157499882853${i}-odc9delwydk?q=80&w=1974&auto=format&fit=crop`} 
                            alt={template.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/90 to-transparent"></div>
                          
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="font-orbitron text-lg font-medium text-white">{template.title}</h3>
                            <p className="text-white/70 text-sm line-clamp-2">{template.description}</p>
                            
                            <div className="flex justify-between items-center mt-3">
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="bg-cyber-light/30 border-cyber-border py-0 h-5">
                                  <Flame className="w-3 h-3 mr-1" />
                                  {template.views || 0} views
                                </Badge>
                              </div>
                              
                              <Link 
                                to={`/templates/${template.id}`}
                                className="text-xs text-white/70 hover:text-white flex items-center"
                              >
                                Details
                                <ChevronRight className="w-3 h-3 ml-1" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-3 text-center py-12">No recently added templates found</div>
              )}
            </motion.div>
            
            {/* Advanced Search Panel */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={latestInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-16 p-8 cyber-panel relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-dark/50 to-cyber-light/5"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <h3 className="font-orbitron text-2xl font-bold mb-4">Can't Find What You Need?</h3>
                  <p className="text-muted-foreground mb-6">
                    Use our advanced search to find the perfect template for your project, or request a custom template.
                  </p>
                  <form 
                    onSubmit={handleSearch} 
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                          placeholder="Search templates..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 bg-cyber-dark/40 border-cyber-border"
                        />
                      </div>
                    </div>
                    <Button 
                      type="submit"
                      className="cyber-button bg-neon-green hover:bg-neon-green/90 text-black font-medium"
                    >
                      Search
                    </Button>
                  </form>
                </div>
                
                <div className="md:w-1/2 relative">
                  <div className="p-6 border border-dashed border-cyber-border rounded-lg text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-neon-purple/10 flex items-center justify-center mb-4">
                      <SlidersHorizontal className="h-8 w-8 text-neon-purple" />
                    </div>
                    <h4 className="font-orbitron text-lg font-medium mb-2">Advanced Filtering</h4>
                    <p className="text-muted-foreground mb-4">
                      Find exactly what you need with our powerful filtering system.
                    </p>
                    <Button 
                      variant="outline"
                      className="cyber-button"
                      onClick={() => navigate('/templates')}
                    >
                      Advanced Search
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Testimonials Section with Interactive Cards */}
        <motion.section 
          ref={testimonialsRef}
          className="py-24 bg-cyber-dark relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.07),transparent_70%)]"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial="hidden"
              animate={testimonialsInView ? "visible" : "hidden"}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="font-orbitron text-3xl font-bold mb-4">
                What Our <span className="text-neon-purple">Users</span> Say
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Hear from developers who have built amazing projects with our templates
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              animate={testimonialsInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  name: "Alex Chen",
                  role: "Frontend Developer",
                  quote: "These templates saved me weeks of development time. The code quality is outstanding!",
                  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&h=120&q=80",
                  rating: 5
                },
                {
                  name: "Sarah Johnson",
                  role: "Full-stack Engineer",
                  quote: "The integration with Supabase was seamless. I built and launched my SaaS in record time.",
                  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&h=120&q=80",
                  rating: 5
                },
                {
                  name: "Michael Rodriguez",
                  role: "UI/UX Designer",
                  quote: "As a designer, I appreciate how easy it is to customize these templates to match my vision.",
                  avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&h=120&q=80",
                  rating: 4
                }
              ].map((testimonial, index) => (
                <motion.div 
                  key={index} 
                  className="cyber-card p-6 bg-gradient-to-br from-cyber to-cyber-light relative group"
                  variants={scaleIn}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full mr-4 border-2 border-neon-purple/50"
                      />
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="italic text-muted-foreground mb-4">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < testimonial.rating ? 'text-neon-purple' : 'text-muted-foreground/30'}`}
                          fill={i < testimonial.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                    
                    {/* Animated highlight */}
                    <div className="absolute bottom-0 left-0 h-1 bg-neon-purple/50 w-0 group-hover:w-full transition-all duration-500 rounded-b-lg"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Tech Stack Section with Animation */}
        <motion.section 
          ref={techStackRef}
          className="py-24 bg-cyber relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,174,219,0.08),transparent_70%)]"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="font-orbitron text-3xl font-bold mb-4">
                Built With <span className="text-neon-green">Modern Tech</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our templates leverage the latest web technologies for optimal performance
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8"
            >
              {[
                { name: "React", logo: "https://reactjs.org/favicon.ico", color: "blue" },
                { name: "TypeScript", logo: "https://www.typescriptlang.org/favicon-32x32.png", color: "blue" },
                { name: "Supabase", logo: "https://supabase.com/favicon/favicon-32x32.png", color: "green" },
                { name: "Tailwind CSS", logo: "https://tailwindcss.com/favicons/favicon-32x32.png", color: "blue" },
                { name: "Framer Motion", logo: "https://www.framer.com/images/favicon.png", color: "purple" }
              ].map((tech, index) => (
                <motion.div 
                  key={index} 
                  className={`flex flex-col items-center justify-center p-6 cyber-card hover:cyber-${tech.color}-glow transition-all duration-300 group`}
                  variants={scaleIn}
                  whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <div className="relative">
                    <motion.div
                      className={`absolute inset-0 bg-neon-${tech.color}/20 rounded-full filter blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    />
                    <img src={tech.logo} alt={tech.name} className="w-12 h-12 mb-3 relative z-10" />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-white transition-colors duration-300">{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Technology features */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="cyber-panel p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-neon-blue/10 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-neon-blue" />
                  </div>
                  <h3 className="font-orbitron text-xl font-medium mb-2">Performance Optimized</h3>
                  <p className="text-muted-foreground">All templates are optimized for speed and efficiency, scoring high on Lighthouse.</p>
                </div>
              </div>
              
              <div className="cyber-panel p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-neon-purple/10 flex items-center justify-center mb-4">
                    <Database className="h-6 w-6 text-neon-purple" />
                  </div>
                  <h3 className="font-orbitron text-xl font-medium mb-2">Backend Integration</h3>
                  <p className="text-muted-foreground">Seamlessly connect to Supabase, Firebase, or your custom API endpoint.</p>
                </div>
              </div>
              
              <div className="cyber-panel p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-neon-green/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-neon-green" />
                  </div>
                  <h3 className="font-orbitron text-xl font-medium mb-2">Security First</h3>
                  <p className="text-muted-foreground">Built with security best practices to keep your application and users safe.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section with Parallax */}
        <motion.section 
          ref={ctaRef}
          className="py-24 bg-cyber-dark relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(30,174,219,0.15),transparent_30%),radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.15),transparent_30%)]"></div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute top-1/4 -right-20 w-40 h-40"
              style={{ y: parallaxY1 }}
            >
              <div className="w-full h-full rounded-full border border-neon-blue/20 opacity-40" />
            </motion.div>
            
            <motion.div 
              className="absolute bottom-1/4 -left-20 w-60 h-60"
              style={{ y: parallaxY2 }}
            >
              <div className="w-full h-full rounded-full border border-neon-purple/20 opacity-30" />
            </motion.div>
          </div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="container mx-auto px-4 relative z-10"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-6">
                Ready to Build Something <span className="text-shimmer">Amazing</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Explore our collection of premium templates and start building your next project today.
              </p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    className="cyber-button bg-neon-purple hover:bg-neon-purple/90 text-white font-medium w-full sm:w-auto group relative overflow-hidden"
                    onClick={() => navigate('/templates')}
                  >
                    <span className="relative z-10">Explore Templates</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-purple opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="cyber-button w-full sm:w-auto"
                    onClick={() => navigate('/get-started')}
                  >
                    Get Started
                  </Button>
                </motion.div>
              </motion.div>
              
              {/* Newsletter signup */}
              <div className="mt-12 max-w-md mx-auto">
                <h3 className="font-orbitron text-xl font-medium mb-4">Stay Updated</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Subscribe to our newsletter for updates on new templates and features.
                </p>
                <form className="flex flex-col sm:flex-row gap-2">
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-cyber/50 border-cyber-border" 
                  />
                  <Button 
                    className="cyber-button bg-neon-green hover:bg-neon-green/90 text-black font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      toast({
                        title: "Thanks for subscribing!",
                        description: "You'll receive updates on new templates and features.",
                      });
                    }}
                  >
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
