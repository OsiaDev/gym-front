import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@features/auth/pages/LoginPage';
import { RegisterPage } from '@features/auth/pages/RegisterPage';
import { OnboardingPage } from '@features/onboarding/pages/OnboardingPage';
import { DashboardPage } from '@features/dashboard/pages/DashboardPage';
import { ClientPage } from '@features/clients/pages/ClientPage';
import { AuthGuard } from '@shared/components/AuthGuard';
import { ProtectedRoute } from '@shared/components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface">
        <Routes>
          {/* Public Routes (Only accessible if NOT logged in, or redirects based on state) */}
          <Route element={<AuthGuard />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Protected Routes */}
          {/* Onboarding: requires auth, but MUST NOT have an empresaId */}
          <Route element={<ProtectedRoute requireEmpresa={false} />}>
            <Route path="/onboarding" element={<OnboardingPage />} />
          </Route>

          {/* Dashboard: requires auth AND MUST have an empresaId */}
          <Route element={<ProtectedRoute requireEmpresa={true} />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/clients" element={<ClientPage />} />
          </Route>

          {/* Fallback route */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
