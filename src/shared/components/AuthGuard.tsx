import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '../../features/auth/services/auth.service';

/**
 * Rutas públicas (Login, Register).
 * Si el usuario ya inició sesión, redirigirlo a donde deba estar (Onboarding o Dashboard)
 */
export const AuthGuard: React.FC = () => {
    const token = authService.getToken();
    const user = authService.getStoredUser();

    if (token && user) {
        if (user.empresaId) {
            return <Navigate to="/dashboard" replace />;
        } else {
            return <Navigate to="/onboarding" replace />;
        }
    }

    return <Outlet />;
};
