import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { authService } from '../../features/auth/services/auth.service';

interface ProtectedRouteProps {
    requireEmpresa?: boolean;
}

/**
 * Rutas protegidas (Onboarding, Dashboard).
 * requireEmpresa: true para Dashboard, false para Onboarding
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requireEmpresa = true }) => {
    const token = authService.getToken();
    const user = authService.getStoredUser();
    const location = useLocation();

    // Si no hay token o usuario, al login
    if (!token || !user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    // Si la ruta requiere que haya una empresa registrada (Dashboard)
    if (requireEmpresa && !user.empresaId) {
        return <Navigate to="/onboarding" replace />;
    }

    // Si la ruta NO requiere empresa (Onboarding), y el usuario ya tiene empresa, enviarlo al Dashboard
    if (!requireEmpresa && user.empresaId) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};
