
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowDown, Layers, Flame, Clock, Code, Zap, Shield, Users, BookOpen, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { TemplateCard } from '@/components/template-card';
import { Template } from '@/types/templates';
import { useQuery } from '@tanstack/react-query';
import { fetchTrendingTemplates, fetchFeaturedTemplates, fetchLatestTemplates } from '@/services/dashboard';
import { getCategories } from '@/services/categories';
import { Category } from '@/services/categories';
import { motion } from 'framer-motion';

const HomePage = () => {
  const navigate = useNavigate();
  
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

  return (
    <>
      <Navbar />
      <div className="pt-16"> {/* Padding to offset fixed navbar */}
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center bg-cyber overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.15),transparent_40%),radial-gradient(circle_at_70%_30%,rgba(30,174,219,0.15),transparent_35%)]"></div>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="container mx-auto px-4 py-20 relative z-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeInUp}>
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="inline-block py-1 px-3 rounded-full bg-neon-blue/10 text-neon-blue text-sm mb-6 border border-neon-blue/30"
                >
                  The Future of Web Templates
                </motion.span>
                <motion.h1 
                  className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                  variants={fadeInUp}
                >
                  <span className="text-shimmer">HTR</span>
                </motion.h1>
                <motion.p 
                  className="text-lg text-muted-foreground mb-8 max-w-lg"
                  variants={fadeInUp}
                >
                  Discover and explore our vast collection of futuristic, 
                  high-performance website templates designed for the modern web.
                </motion.p>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  variants={fadeInUp}
                >
                  <Button 
                    size="lg" 
                    className="cyber-button bg-neon-blue hover:bg-neon-blue/90 text-black font-medium"
                    onClick={() => navigate('/templates')}
                  >
                    Browse Templates
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="cyber-button"
                    onClick={() => navigate('/get-started')}
                  >
                    Learn More <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
                <motion.div 
                  className="mt-8 flex items-center gap-4"
                  variants={fadeInUp}
                >
                  <div className="flex -space-x-2">
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
              <div className="hidden lg:block relative">
                <motion.div 
                  className="aspect-[4/3] cyber-panel overflow-hidden cyber-purple-glow"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="Dashboard Template Preview" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-6 -left-6 w-40 aspect-square cyber-panel cyber-border-glow"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1555066932-e78dd8fb77bb?q=80&w=3438&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="Code snippet" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </motion.div>
                <motion.div 
                  className="absolute -top-8 -right-8 w-32 aspect-square cyber-panel cyber-green-glow"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1621839673705-6617adf9e890?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="3D element" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </motion.div>
              </div>
            </div>
            <motion.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="h-6 w-6 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section - New Section */}
        <section className="py-24 bg-cyber-dark">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
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
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {[
                { icon: Code, title: "Modern Code Base", description: "Built with React, TypeScript and modern patterns" },
                { icon: Zap, title: "Lightning Fast", description: "Optimized for speed and performance" },
                { icon: Shield, title: "Secure By Design", description: "Following security best practices" },
                { icon: Monitor, title: "Responsive Design", description: "Looks great on any device size" }
              ].map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="cyber-card p-6 hover:cyber-border-glow transition-all duration-300"
                  variants={scaleIn}
                >
                  <div className="w-12 h-12 rounded-lg bg-neon-blue/20 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-neon-blue" />
                  </div>
                  <h3 className="font-orbitron text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Trending Templates Section */}
        <section className="py-24 bg-cyber">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
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
              <Link to="/templates" className="inline-flex items-center text-neon-blue hover:underline font-medium">
                View All Templates
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {isLoadingTrending ? (
                <div className="col-span-3 text-center py-12">Loading trending templates...</div>
              ) : trendingTemplates.length > 0 ? (
                trendingTemplates.slice(0, 3).map((templateData: any) => {
                  // Convert to Template type to ensure compatibility
                  const template: Template = {
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
                  };
                  return (
                    <motion.div key={template.id} variants={scaleIn}>
                      <TemplateCard template={template} />
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-3 text-center py-12">No trending templates found</div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 bg-cyber-dark">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col md:flex-row md:items-center justify-between mb-12"
            >
              <div className="mb-6 md:mb-0">
                <div className="flex items-center mb-2">
                  <Layers className="text-neon-green mr-2 h-5 w-5" />
                  <h2 className="font-orbitron text-2xl font-bold">Browse Categories</h2>
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
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {isLoadingCategories ? (
                <div className="col-span-4 text-center py-12">Loading categories...</div>
              ) : categories.length > 0 ? (
                categories.slice(0, 4).map((category, index) => (
                  <motion.div key={category.id} variants={scaleIn}>
                    <Link to={`/categories/${category.id}`} className="group block h-full">
                      <div className="cyber-card overflow-hidden h-full transition-all duration-300 hover:cyber-border-glow">
                        <div className="aspect-[16/9] relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-cyber to-transparent z-10"></div>
                          <img 
                            src={category.icon}
                            alt={category.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-orbitron font-medium group-hover:text-neon-green transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {category.count} templates
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
          </div>
        </section>

        {/* Recently Added Section */}
        <section className="py-24 bg-cyber">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
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
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {isLoadingRecent ? (
                <div className="col-span-3 text-center py-12">Loading recent templates...</div>
              ) : recentTemplates.length > 0 ? (
                recentTemplates.slice(0, 3).map((templateData: any) => {
                  // Convert to Template type to ensure compatibility
                  const template: Template = {
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
                  };
                  return (
                    <motion.div key={template.id} variants={scaleIn}>
                      <TemplateCard template={template} />
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-3 text-center py-12">No recently added templates found</div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section - New Section */}
        <section className="py-24 bg-cyber-dark">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
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
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  name: "Alex Chen",
                  role: "Frontend Developer",
                  quote: "These templates saved me weeks of development time. The code quality is outstanding!",
                  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&h=120&q=80"
                },
                {
                  name: "Sarah Johnson",
                  role: "Full-stack Engineer",
                  quote: "The integration with Supabase was seamless. I built and launched my SaaS in record time.",
                  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&h=120&q=80"
                },
                {
                  name: "Michael Rodriguez",
                  role: "UI/UX Designer",
                  quote: "As a designer, I appreciate how easy it is to customize these templates to match my vision.",
                  avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&h=120&q=80"
                }
              ].map((testimonial, index) => (
                <motion.div 
                  key={index} 
                  className="cyber-card p-6 bg-gradient-to-br from-cyber to-cyber-light"
                  variants={scaleIn}
                  whileHover={{ y: -5 }}
                >
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
                  <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Tech Stack Section - New Section */}
        <section className="py-24 bg-cyber">
          <div className="container mx-auto px-4">
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
              className="flex flex-wrap justify-center gap-8 items-center"
            >
              {[
                { name: "React", logo: "https://reactjs.org/favicon.ico" },
                { name: "TypeScript", logo: "https://www.typescriptlang.org/favicon-32x32.png" },
                { name: "Supabase", logo: "https://supabase.com/favicon/favicon-32x32.png" },
                { name: "Tailwind CSS", logo: "https://tailwindcss.com/favicons/favicon-32x32.png" },
                { name: "Framer Motion", logo: "https://www.framer.com/images/favicon.png" }
              ].map((tech, index) => (
                <motion.div 
                  key={index} 
                  className="flex flex-col items-center p-4"
                  variants={scaleIn}
                  whileHover={{ scale: 1.1 }}
                >
                  <img src={tech.logo} alt={tech.name} className="w-12 h-12 mb-3" />
                  <span className="text-sm text-muted-foreground">{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-cyber-dark relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(30,174,219,0.15),transparent_30%),radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.15),transparent_30%)]"></div>
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
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="cyber-button bg-neon-purple hover:bg-neon-purple/90 text-white font-medium"
                  onClick={() => navigate('/get-started')}
                >
                  Get Started
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
