import React, { useState } from 'react';
import { authService, LoginRequest } from '../services/auth.service';
import { ApiError } from '../../../shared/utils/handleError';

interface LoginPageProps {
  onNavigateToRegister?: () => void;
  onLoginSuccess?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigateToRegister, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authService.login({ email, password });
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err: any) {
      if (err instanceof ApiError) {
        if (err.message.includes('ACCOUNT_NOT_VERIFIED')) {
          setError('Falta la verificación de la cuenta, por favor revisa tu correo electrónico.');
        } else {
          setError('Credenciales inválidas, por favor intenta nuevamente.');
        }
      } else {
        setError('Ocurrió un error inesperado al iniciar sesión.');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex min-h-screen overflow-hidden">
      <section className="hidden md:flex relative w-1/2 flex-col justify-between p-12 overflow-hidden bg-primary-container">
        <div className="absolute inset-0 z-0">
          <img
            alt="Ultra-modern luxury gym interior"
            className="w-full h-full object-cover opacity-60"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUQS6jx5cll36Zb5wXX0pKFNy9p2n0H6OcQjBASMyd-O7fJkn-nwv6wYmiTXOnY2cslOvdKCie5LAYZO7copUPrV6nRyzzlyz8tdU01sCBCKhc9O86yEDoH_U2Y1MLL7AmIvwuzc2wr-xuKOxdlknrWEz5F0LG5O9O_FSzoCJRU0sIlC3g5B0gc5d1TDNP_sLLv943joTjpyUI2U1NcUJ5xZ2EOcfAhn7YRF1KJch9GL4kRkLZUIP782WkDRvMzUIEupZegxhl-x4c"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary/80 to-transparent"></div>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-secondary-fixed rounded-full flex items-center justify-center">
            <span
              className="material-symbols-outlined text-on-secondary-fixed"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-headline">
            Gym Core
          </span>
        </div>
        <div className="relative z-10 max-w-lg mb-20">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight font-headline tracking-tight">
            Potencia el rendimiento de tu franquicia
          </h1>
          <div className="mt-8 flex gap-4">
            <div className="h-1 w-12 bg-secondary-fixed rounded-full"></div>
            <p className="text-surface-variant/80 text-lg">
              Liderando la evolución del fitness arquitectónico y la gestión de
              alto impacto.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-24 bg-surface-container-lowest">
        <div className="w-full max-w-md space-y-8">
          <header className="space-y-3">
            <h2 className="text-4xl font-bold text-on-surface font-headline tracking-tight">
              Bienvenido de nuevo
            </h2>
            <p className="text-on-surface-variant text-lg">
              Ingresa tus credenciales para acceder al panel
            </p>
          </header>
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            {error && (
              <div className="bg-error/10 border border-error/20 text-error p-4 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label
                className="block text-sm font-semibold text-on-surface-variant ml-1"
                htmlFor="email"
              >
                Correo electrónico
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-secondary transition-colors">
                  <span className="material-symbols-outlined text-xl">
                    mail
                  </span>
                </div>
                <input
                  className="block w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-secondary-container transition-all text-on-surface placeholder:text-outline outline-none"
                  id="email"
                  name="email"
                  placeholder="nombre@franquicia.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm font-semibold text-on-surface-variant ml-1"
                htmlFor="password"
              >
                Contraseña
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-secondary transition-colors">
                  <span className="material-symbols-outlined text-xl">
                    lock
                  </span>
                </div>
                <input
                  className="block w-full pl-12 pr-12 py-4 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-secondary-container transition-all text-on-surface placeholder:text-outline outline-none"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-on-surface transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-xl">
                    visibility
                  </span>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    className="peer h-5 w-5 rounded border-outline text-secondary focus:ring-secondary-container transition-all cursor-pointer"
                    type="checkbox"
                  />
                </div>
                <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                  Recordarme
                </span>
              </label>
              <a
                className="text-sm font-medium text-on-primary-container hover:underline underline-offset-4 transition-all"
                href="#"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <button
              className="w-full py-4 bg-secondary text-white font-bold rounded-xl shadow-lg shadow-secondary/20 hover:scale-[1.02] hover:bg-on-secondary-container transition-all duration-200 font-headline flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              type="submit"
              disabled={loading}
            >
              <span>{loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}</span>
              {!loading && <span className="material-symbols-outlined text-xl">login</span>}
            </button>
          </form>
          <div className="space-y-6 pt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-surface-container-lowest px-4 text-outline font-medium">
                  ¿Nuevo en Gym Core?
                </span>
              </div>
            </div>
            <div className="text-center space-y-4">
              <p className="text-on-surface-variant">
                Comienza hoy mismo a transformar la gestión de tu gimnasio con nuestra tecnología de vanguardia.
              </p>
              <button
                className="w-full py-4 bg-white border-2 border-secondary text-secondary font-bold rounded-xl hover:bg-secondary/5 hover:scale-[1.01] transition-all duration-200 font-headline flex items-center justify-center gap-2 cursor-pointer"
                type="button"
                onClick={onNavigateToRegister}
              >
                <span>Registrarse</span>
                <span className="material-symbols-outlined text-xl">
                  person_add
                </span>
              </button>
              <p className="text-xs text-outline italic">
                O solicita una demostración personalizada con nuestro equipo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-surface-container-lowest border-t border-outline-variant/30 w-full py-6 flex flex-col md:flex-row justify-between items-center px-12 fixed bottom-0 left-0 right-0 z-20">
        <div className="text-outline text-[10px] uppercase tracking-widest font-medium">
          © 2024 Gym Core. Architectural Pulse.
        </div>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a
            className="text-outline text-[10px] uppercase tracking-widest font-medium hover:text-secondary transition-colors"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-outline text-[10px] uppercase tracking-widest font-medium hover:text-secondary transition-colors"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="text-outline text-[10px] uppercase tracking-widest font-medium hover:text-secondary transition-colors"
            href="#"
          >
            Contact Support
          </a>
        </div>
      </footer>
    </main>
  );
};
