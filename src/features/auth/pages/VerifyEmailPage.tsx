import React from 'react';

interface VerifyEmailPageProps {
    onNavigateToLogin?: () => void;
    email?: string;
}

export const VerifyEmailPage: React.FC<VerifyEmailPageProps> = ({ 
    onNavigateToLogin,
    email = "tu correo electrónico" 
}) => {
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
                <div className="bg-surface-container-lowest rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] p-8 sm:p-10 border border-outline-variant/10 text-center">
                    <div className="mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-container/20 mb-6 border border-primary/10">
                            <span className="material-symbols-outlined text-primary text-4xl">mark_email_read</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-on-background mb-4">
                            Verifica tu correo
                        </h1>
                        <p className="text-on-surface-variant font-medium text-sm sm:text-base leading-relaxed">
                            Hemos enviado un enlace de verificación a <br/>
                            <span className="font-bold text-on-background text-base">{email}</span>. <br/><br/>
                            Por favor, revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta y comenzar a gestionar tu gimnasio.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <button className="w-full py-4 bg-surface-container flex items-center justify-center gap-2 text-on-surface font-bold rounded-xl hover:bg-surface-container-high active:scale-[0.98] transition-all border border-outline-variant/20" type="button">
                            <span className="material-symbols-outlined text-[20px]">mark_email_unread</span>
                            Abrir aplicación de correo
                        </button>
                        
                        <button className="w-full py-4 bg-transparent text-primary font-bold rounded-xl hover:bg-primary/5 active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="button">
                            <span className="material-symbols-outlined text-[20px]">refresh</span>
                            Reenviar correo
                        </button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-outline-variant/10 flex justify-center">
                        <p className="text-sm text-on-surface-variant">
                            ¿Ya verificaste tu cuenta? <a className="text-on-primary-container font-bold hover:underline cursor-pointer" onClick={(e) => { e.preventDefault(); onNavigateToLogin?.(); }}>Inicia sesión</a>
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
