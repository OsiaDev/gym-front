import React, { useState } from 'react';
import { authApi } from '../api/auth.api';
import { VerifyEmailPage } from './VerifyEmailPage';

interface RegisterPageProps {
    onNavigateToLogin?: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigateToLogin }) => {
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        nickUsuario: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError(null);
        if (fieldErrors[name]) {
            setFieldErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleBlurEmail = async () => {
        if (!formData.email) return;
        try {
            const exists = await authApi.checkEmail(formData.email);
            if (exists) {
                setFieldErrors(prev => ({ ...prev, email: 'El correo electrónico ya está registrado' }));
            }
        } catch (err) {}
    };

    const handleBlurNick = async () => {
        if (!formData.nickUsuario) return;
        try {
            const exists = await authApi.checkNick(formData.nickUsuario);
            if (exists) {
                setFieldErrors(prev => ({ ...prev, nickUsuario: 'El nombre de usuario ya está en uso' }));
            }
        } catch (err) {}
    };

    const handleBlurPassword = () => {
        if (!formData.password) return;
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,20}$/;
        if (!pattern.test(formData.password)) {
            setFieldErrors(prev => ({ ...prev, password: 'Contraseña débil. Debe tener 8-20 caracteres, mayúscula, minúscula, número y algún símbolo.' }));
        }
    };

    const handleBlurConfirmPassword = () => {
        if (!formData.confirmPassword || !formData.password) return;
        if (formData.password !== formData.confirmPassword) {
            setFieldErrors(prev => ({ ...prev, confirmPassword: 'Las contraseñas no coinciden' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validar si existen errores en el formulario antes de enviar
        if (Object.values(fieldErrors).some(err => err !== '')) {
            setError("Por favor corrige los errores del formulario");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            await authApi.register(formData);
            setIsSuccess(true);
        } catch (err: any) {
            // Manejar mensaje de error desde handleError (axios)
            setError(err.message || "Ocurrió un error inesperado");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return <VerifyEmailPage email={formData.email} onNavigateToLogin={onNavigateToLogin} />;
    }

    return (
        <div className="flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-x-hidden w-full min-h-screen">
            <div className="fixed top-1/4 -left-20 w-96 h-96 bg-primary-fixed/30 blur-[120px] rounded-full -z-50"></div>
            <div className="fixed bottom-1/4 -right-20 w-80 h-80 bg-secondary-container/20 blur-[100px] rounded-full -z-50"></div>

            <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-[20px] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.04)] border-b border-outline-variant/10">
                <div className="flex justify-between items-center h-16 px-8 max-w-7xl mx-auto w-full">
                    <div className="text-xl font-extrabold tracking-tighter text-slate-900">
                        Gym Core
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-slate-500 font-medium text-sm hidden sm:block">Centro de Ayuda</span>
                        <span className="material-symbols-outlined text-slate-900 cursor-pointer">help</span>
                    </div>
                </div>
            </header>

            <main className="w-full max-w-xl mt-20 mb-12">
                <div className="bg-surface-container-lowest rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] p-8 sm:p-10 border border-outline-variant/10">
                    <div className="mb-8 text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary-container mb-4">
                            <span className="material-symbols-outlined text-on-secondary-container text-2xl">fitness_center</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-on-background mb-2">
                            Comienza a gestionar tu imperio fitness
                        </h1>
                        <p className="text-on-surface-variant font-medium text-sm sm:text-base">Crea tu cuenta en Gym Core para empezar.</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-xl text-sm font-medium text-center">
                                {error}
                            </div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Nombres</label>
                                <input name="nombres" value={formData.nombres} onChange={handleChange} required className="w-full px-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-on-background transition-all placeholder:text-outline/50" placeholder="Ej. Ignacio Zarid" type="text" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Apellidos</label>
                                <input name="apellidos" value={formData.apellidos} onChange={handleChange} required className="w-full px-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-on-background transition-all placeholder:text-outline/50" placeholder="Ej. Ballesteros Algarin" type="text" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Nombre de Usuario</label>
                                <input name="nickUsuario" value={formData.nickUsuario} onChange={handleChange} onBlur={handleBlurNick} required className={`w-full px-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-on-background transition-all placeholder:text-outline/50 ${fieldErrors.nickUsuario ? 'ring-2 ring-error/50' : ''}`} placeholder="alex.pierce92" type="text" />
                                {fieldErrors.nickUsuario && <span className="text-xs text-error ml-1">{fieldErrors.nickUsuario}</span>}
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Email</label>
                                <input name="email" value={formData.email} onChange={handleChange} onBlur={handleBlurEmail} required className={`w-full px-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-on-background transition-all placeholder:text-outline/50 ${fieldErrors.email ? 'ring-2 ring-error/50' : ''}`} placeholder="alex@kinetic.com" type="email" />
                                {fieldErrors.email && <span className="text-xs text-error ml-1">{fieldErrors.email}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Contraseña</label>
                                <input name="password" value={formData.password} onChange={handleChange} onBlur={handleBlurPassword} required className={`w-full px-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-on-background transition-all placeholder:text-outline/50 ${fieldErrors.password ? 'ring-2 ring-error/50' : ''}`} placeholder="••••••••" type="password" />
                                {fieldErrors.password && <span className="text-xs text-error ml-1">{fieldErrors.password}</span>}
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Confirmar Contraseña</label>
                                <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} onBlur={handleBlurConfirmPassword} required className={`w-full px-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-on-background transition-all placeholder:text-outline/50 ${fieldErrors.confirmPassword ? 'ring-2 ring-error/50' : ''}`} placeholder="••••••••" type="password" />
                                {fieldErrors.confirmPassword && <span className="text-xs text-error ml-1">{fieldErrors.confirmPassword}</span>}
                            </div>
                        </div>

                        <button disabled={isLoading} className="w-full mt-6 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" type="submit">
                            {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
                            {isLoading ? (
                                <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                            ) : (
                                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-outline-variant/10 flex justify-center">
                        <p className="text-sm text-on-surface-variant">
                            ¿Ya tienes una cuenta? <a className="text-on-primary-container font-bold hover:underline" href="#" onClick={(e) => { e.preventDefault(); onNavigateToLogin?.(); }}>Inicia sesión</a>
                        </p>
                    </div>
                </div>
            </main>

            <footer className="mt-auto mb-8 text-center text-outline text-[11px] sm:text-xs px-4">
                © 2024 Gym Core. Potenciado por arquitectura de alto rendimiento.
            </footer>
        </div>
    );
};
