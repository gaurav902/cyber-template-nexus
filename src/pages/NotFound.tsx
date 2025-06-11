
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="cyber-panel p-8 max-w-lg mx-auto text-center">
          <div className="text-8xl font-orbitron font-bold mb-4 text-shimmer">404</div>
          <h1 className="text-2xl font-orbitron mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="default"
              className="cyber-button bg-neon-blue hover:bg-neon-blue/90 text-black font-medium"
              asChild
            >
              <Link to="/">Go to Homepage</Link>
            </Button>
            <Button 
              variant="outline"
              className="cyber-button"
              asChild
            >
              <Link to="/templates">Browse Designs</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
