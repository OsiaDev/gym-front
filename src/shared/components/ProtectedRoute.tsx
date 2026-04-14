import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { authService } from '../../features/auth/services/auth.service';
import { apiService } from '../services/api.service';

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
    const [isValidating, setIsValidating] = useState(true);

    useEffect(() => {
        if (!token || !user) {
            setIsValidating(false);
            return;
        }

        const validateSession = async () => {
            try {
                // Validate against the backend. If user was deleted from DB (e.g. docker reset),
                // this returns 401.
                await apiService.get(`/v1/auth/me?email=${encodeURIComponent(user.email)}`);
                setIsValidating(false); // Only set false on success
            } catch (error) {
                console.error("User session is no longer valid in the database:", error);
                // The interceptor might already trigger window.location.href = '/login',
                // but React-Router Navigate might intercept it. 
                // We ensure logout and redirect, and we DO NOT set isValidating=false
                // to keep the spinner until the browser reloads to the login screen.
                await authService.logout();
                window.location.href = '/login';
            }
        };

        validateSession();
    }, [token, user]);

    // Si no hay token o usuario, al login
    if (!token || !user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (isValidating) {
        return (
            <div className="flex h-screen items-center justify-center bg-surface">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
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
