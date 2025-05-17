
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import DashboardAccessPage from './pages/DashboardAccessPage';
import DashboardPage from './pages/admin/DashboardPage';
import TemplatesAdminPage from './pages/admin/TemplatesPage';
import CategoriesPage from './pages/admin/CategoriesPage';
import SettingsPage from './pages/admin/SettingsPage';
import AddTemplatePage from './pages/admin/AddTemplatePage';
import EditTemplatePage from './pages/admin/EditTemplatePage';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/connect/ContactPage';
import ConnectPage from './pages/ConnectPage';
import TemplateDetailsPage from './pages/TemplateDetailsPage';
import CategoryTemplatesPage from './pages/CategoryTemplatesPage';
import PrivateRoute from './components/admin/PrivateRoute';
import { Toaster } from '@/components/ui/toaster';
import MessagesPage from './pages/admin/MessagesPage';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminAccess = sessionStorage.getItem('adminAccess');
    setIsAdmin(!!adminAccess);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/connect" element={<ConnectPage />} />
            <Route path="/template/:id" element={<TemplateDetailsPage />} />
            <Route path="/category/:categoryId" element={<CategoryTemplatesPage />} />
            <Route path="/dashboard-access-9382xkjv" element={<DashboardAccessPage />} />

            {/* Admin routes */}
            <Route path="/secure-panel" element={<PrivateRoute><Outlet /></PrivateRoute>}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="content" element={<TemplatesAdminPage />} />
              <Route path="content/add" element={<AddTemplatePage />} />
              <Route path="content/edit/:id" element={<EditTemplatePage />} />
              <Route path="taxonomy" element={<CategoriesPage />} />
              <Route path="config" element={<SettingsPage />} />
              <Route path="messages" element={<MessagesPage />} />
            </Route>
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
