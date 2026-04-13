import React, { useState, useEffect } from 'react';
import { LoginPage } from '@features/auth/pages/LoginPage';
import { RegisterPage } from '@features/auth/pages/RegisterPage';
import { OnboardingPage } from '@features/onboarding/pages/OnboardingPage';
import { authService } from '@features/auth/services/auth.service';

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'register' | 'dashboard' | 'onboarding'>('login');

  const handleLoginSuccess = () => {
    const user = authService.getStoredUser();
    if (user && user.empresaId) {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      {currentPage === 'login' && (
        <LoginPage 
          onNavigateToRegister={() => setCurrentPage('register')}
          onLoginSuccess={handleLoginSuccess} 
        />
      )}
      {currentPage === 'register' && (
        <RegisterPage onNavigateToLogin={() => setCurrentPage('login')} />
      )}
      {currentPage === 'onboarding' && (
        <OnboardingPage onComplete={() => {
          authService.logout();
          setCurrentPage('login');
          setTimeout(() => alert('¡Configuración completada! Por favor, inicia sesión nuevamente para cargar tu nuevo espacio de trabajo.'), 100);
        }} />
      )}
      {currentPage === 'dashboard' && (
        <main className="min-h-screen flex items-center justify-center bg-surface-container-lowest">
          <div className="text-center p-8">
            <h1 className="text-4xl font-headline font-bold text-on-surface mb-4">Panel de Control</h1>
            <p className="text-on-surface-variant mb-8 text-lg">Tu cuenta ha sido verificada. Bienvenido a tu panel de gestión.</p>
            <button 
              onClick={() => {
                // Logout flow
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_user');
                setCurrentPage('login');
              }}
              className="py-3 px-6 bg-secondary text-white font-bold rounded-xl shadow hover:bg-on-secondary-container transition-all"
            >
              Cerrar Sesión
            </button>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
