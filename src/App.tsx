
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TemplatesPage from "./pages/TemplatesPage";
import TemplateDetailPage from "./pages/TemplateDetailPage";
import LoginPage from "./pages/admin/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import TemplatesAdminPage from "./pages/admin/TemplatesAdminPage";
import AddTemplatePage from "./pages/admin/AddTemplatePage";
import EditTemplatePage from "./pages/admin/EditTemplatePage";
import CategoriesPage from "./pages/admin/CategoriesPage";
import PrivateRoute from "./components/admin/PrivateRoute";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/templates/:id" element={<TemplateDetailPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin/dashboard" element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            } />
            <Route path="/admin/templates" element={
              <PrivateRoute>
                <TemplatesAdminPage />
              </PrivateRoute>
            } />
            <Route path="/admin/templates/add" element={
              <PrivateRoute>
                <AddTemplatePage />
              </PrivateRoute>
            } />
            <Route path="/admin/templates/edit/:id" element={
              <PrivateRoute>
                <EditTemplatePage />
              </PrivateRoute>
            } />
            <Route path="/admin/categories" element={
              <PrivateRoute>
                <CategoriesPage />
              </PrivateRoute>
            } />
            
            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
