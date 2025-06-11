
import React from "react";
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
import TrendingPage from "./pages/admin/TrendingPage";
import FeaturedAdminPage from "./pages/admin/FeaturedPage";
import AddTemplatePage from "./pages/admin/AddTemplatePage";
import EditTemplatePage from "./pages/admin/EditTemplatePage";
import CategoriesPage from "./pages/admin/CategoriesPage";
import SettingsPage from "./pages/admin/SettingsPage";
import MessagesPage from "./pages/admin/MessagesPage";
import PrivateRoute from "./components/admin/PrivateRoute";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import AllTemplatesPage from "./pages/AllTemplatesPage";
import CategoriesListPage from "./pages/CategoriesListPage";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import LatestPage from "./pages/LatestPage";
import ResourcesPage from "./pages/ResourcesPage";
import ConnectPage from "./pages/ConnectPage";
import GetStartedPage from "./pages/get-started/GetStartedPage";
import DocumentationPage from "./pages/docs/DocumentationPage";
import SupportPage from "./pages/support/SupportPage";
import HelpCenterPage from "./pages/support/HelpCenterPage";
import FAQPage from "./pages/support/FAQPage";
import ContactPage from "./pages/connect/ContactPage";
import SupabaseDocsPage from "./pages/docs/supabase/SupabaseDocsPage";
import PaymentsDocsPage from "./pages/docs/payments/PaymentsDocsPage";
import AnalyticsDocsPage from "./pages/docs/analytics/AnalyticsDocsPage";
import CMSDocsPage from "./pages/docs/cms/CMSDocsPage";
import OptimizingPerformancePage from "./pages/support/OptimizingPerformancePage";
import CustomFunctionalityPage from "./pages/support/CustomFunctionalityPage";
import DiscordPage from "./pages/connect/DiscordPage";
import GitHubPage from "./pages/connect/GitHubPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import CookiesPage from "./pages/CookiesPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/designs" element={<TemplatesPage />} />
              <Route path="/designs/:id" element={<TemplateDetailPage />} />
              <Route path="/all-designs" element={<AllTemplatesPage />} />
              <Route path="/categories" element={<CategoriesListPage />} />
              <Route path="/categories/:id" element={<CategoryDetailPage />} />
              <Route path="/latest" element={<LatestPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/connect" element={<ConnectPage />} />
              <Route path="/get-started" element={<GetStartedPage />} />
              
              {/* Legacy routes for backwards compatibility */}
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="/templates/:id" element={<TemplateDetailPage />} />
              <Route path="/all-templates" element={<AllTemplatesPage />} />
              
              {/* Legal Pages */}
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              
              {/* Documentation and Support Routes */}
              <Route path="/docs" element={<DocumentationPage />} />
              <Route path="/docs/supabase" element={<SupabaseDocsPage />} />
              <Route path="/docs/payments" element={<PaymentsDocsPage />} />
              <Route path="/docs/analytics" element={<AnalyticsDocsPage />} />
              <Route path="/docs/cms" element={<CMSDocsPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/support/help-center" element={<HelpCenterPage />} />
              <Route path="/support/faqs" element={<FAQPage />} />
              <Route path="/support/help-center/optimizing-performance" element={<OptimizingPerformancePage />} />
              <Route path="/support/help-center/custom-functionality" element={<CustomFunctionalityPage />} />
              <Route path="/connect/contact" element={<ContactPage />} />
              <Route path="/connect/discord" element={<DiscordPage />} />
              <Route path="/connect/github" element={<GitHubPage />} />
              
              {/* Admin Routes - Obscured URLs */}
              <Route path="/dashboard-access-9382xkjv" element={<LoginPage />} />
              <Route path="/secure-panel/dashboard" element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              } />
              <Route path="/secure-panel/content" element={
                <PrivateRoute>
                  <TemplatesAdminPage />
                </PrivateRoute>
              } />
              <Route path="/secure-panel/analytics" element={
                <PrivateRoute>
                  <TrendingPage />
                </PrivateRoute>
              } />
              <Route path="/secure-panel/messages" element={
                <PrivateRoute>
                  <MessagesPage />
                </PrivateRoute>
              } />
              <Route path="/secure-panel/content/new" element={
                <PrivateRoute>
                  <AddTemplatePage />
                </PrivateRoute>
              } />
              <Route path="/secure-panel/content/edit/:id" element={
                <PrivateRoute>
                  <EditTemplatePage />
                </PrivateRoute>
              } />
              <Route path="/secure-panel/taxonomy" element={
                <PrivateRoute>
                  <CategoriesPage />
                </PrivateRoute>
              } />
              <Route path="/secure-panel/config" element={
                <PrivateRoute>
                  <SettingsPage />
                </PrivateRoute>
              } />
              
              {/* Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
