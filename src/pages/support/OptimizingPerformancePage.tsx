
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Zap, Terminal, BarChart, Clock, Laptop, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

const OptimizingPerformancePage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <Link to="/support/help-center" className="text-neon-blue hover:underline inline-flex items-center">
              ← Back to Help Center
            </Link>
            <h1 className="text-3xl font-orbitron font-bold mt-6 mb-4">
              Optimizing Design Performance
            </h1>
            <div className="cyber-panel p-4 mb-6 flex items-center">
              <Zap className="h-6 w-6 text-neon-green mr-3" />
              <p className="text-muted-foreground">
                Learn how to maximize the speed and efficiency of your HTR Designs
              </p>
            </div>
          </div>

          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-orbitron font-medium mb-4 flex items-center">
                <Terminal className="h-5 w-5 mr-2 text-neon-blue" />
                Bundle Size Optimization
              </h2>
              <div className="cyber-panel p-6 space-y-4">
                <p>
                  Larger JavaScript bundles can significantly affect your site's load time. Here's how to keep your bundle size in check:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Use dynamic imports for code splitting</li>
                  <li>Implement tree shaking by using ES modules</li>
                  <li>Consider using lightweight alternatives for heavy libraries</li>
                  <li>Remove unused dependencies from your project</li>
                </ul>
                <div className="bg-cyber-dark p-4 rounded-md mt-4 font-mono text-sm">
                  <code className="text-neon-green">
                    {`// Example of code splitting with dynamic import
const SomeComponent = React.lazy(() => import('./SomeComponent'));

// In your component
<React.Suspense fallback={<Spinner />}>
  <SomeComponent />
</React.Suspense>`}
                  </code>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-orbitron font-medium mb-4 flex items-center">
                <BarChart className="h-5 w-5 mr-2 text-neon-purple" />
                Rendering Performance
              </h2>
              <div className="cyber-panel p-6 space-y-4">
                <p>
                  Optimize your React components to minimize unnecessary renders and improve UI responsiveness:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Use React.memo for pure functional components</li>
                  <li>Implement useCallback for functions passed to child components</li>
                  <li>Utilize useMemo for expensive calculations</li>
                  <li>Avoid inline function definitions in render methods</li>
                  <li>Consider using virtualization for long lists</li>
                </ul>
                <div className="bg-cyber-dark p-4 rounded-md mt-4 font-mono text-sm">
                  <code className="text-neon-green">
                    {`// Example of memoization
const MemoizedComponent = React.memo(({ value }) => {
  // Only re-renders when value changes
  return <div>{value}</div>;
});

// Example of useCallback
const handleClick = useCallback(() => {
  console.log('Clicked!');
}, []);`}
                  </code>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-orbitron font-medium mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-neon-blue" />
                Data Loading Strategies
              </h2>
              <div className="cyber-panel p-6 space-y-4">
                <p>
                  Efficient data loading can significantly improve user experience:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Implement proper loading states and skeleton screens</li>
                  <li>Use pagination or infinite scroll for large data sets</li>
                  <li>Implement proper caching with React Query or SWR</li>
                  <li>Consider prefetching data for likely user navigation paths</li>
                </ul>
                <div className="bg-cyber-dark p-4 rounded-md mt-4 font-mono text-sm">
                  <code className="text-neon-green">
                    {`// Example with React Query
const { data, isLoading } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  staleTime: 60 * 1000, // 1 minute
})

// Prefetching example
queryClient.prefetchQuery({
  queryKey: ['post', id], 
  queryFn: () => fetchPost(id)
})`}
                  </code>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-orbitron font-medium mb-4 flex items-center">
                <Laptop className="h-5 w-5 mr-2 text-neon-green" />
                Responsive Design Optimization
              </h2>
              <div className="cyber-panel p-6 space-y-4">
                <p>
                  Ensure your site performs well across all devices:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Optimize images with responsive sizes and formats (WebP)</li>
                  <li>Use appropriate media queries for different screen sizes</li>
                  <li>Consider serving different asset sizes based on device</li>
                  <li>Test performance on actual mobile devices, not just emulators</li>
                </ul>
                <div className="bg-cyber-dark p-4 rounded-md mt-4 font-mono text-sm">
                  <code className="text-neon-green">
                    {`// Example of responsive image
<img
  srcSet="image-sm.webp 480w, image-md.webp 800w, image-lg.webp 1200w"
  sizes="(max-width: 600px) 480px, (max-width: 1000px) 800px, 1200px"
  src="image-md.webp"
  alt="Responsive image"
/>`}
                  </code>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-orbitron font-medium mb-4 flex items-center">
                <Code className="h-5 w-5 mr-2 text-neon-purple" />
                Performance Testing Tools
              </h2>
              <div className="cyber-panel p-6 space-y-4">
                <p>
                  Use these tools to measure and improve your application's performance:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Lighthouse (built into Chrome DevTools)</li>
                  <li>WebPageTest for comprehensive performance analysis</li>
                  <li>Chrome DevTools Performance tab for runtime performance</li>
                  <li>React DevTools Profiler for component rendering analysis</li>
                  <li>Bundle analyzers like "source-map-explorer"</li>
                </ul>
                <p className="mt-4">
                  Make performance testing a regular part of your development workflow. Test early and often to catch issues before they impact your users.
                </p>
              </div>
            </section>
          </div>
          
          <div className="mt-12 p-6 cyber-panel bg-gradient-to-br from-cyber-dark to-cyber text-center">
            <h3 className="text-xl font-orbitron mb-3">Need More Help?</h3>
            <p className="mb-6 text-muted-foreground">
              Our support team is ready to assist you with any performance optimization questions or issues.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/support" className="bg-neon-blue/90 hover:bg-neon-blue text-black px-6 py-2 rounded">
                Contact Support
              </Link>
              <Link to="/support/faqs" className="border border-cyber-border hover:border-neon-blue px-6 py-2 rounded">
                View FAQs
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OptimizingPerformancePage;
