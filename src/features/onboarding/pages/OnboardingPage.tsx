import React, { useState } from 'react';
import { onboardingService, OnboardingRequest } from '../services/onboarding.service';

interface OnboardingPageProps {
  onComplete: () => void;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [razonSocial, setRazonSocial] = useState('');
  const [nit, setNit] = useState('');
  const [emailEmpresa, setEmailEmpresa] = useState('');
  const [nombreSede, setNombreSede] = useState('');
  const [direccionSede, setDireccionSede] = useState('');
  const [telefonoSede, setTelefonoSede] = useState('');

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload: OnboardingRequest = {
        razonSocial,
        nit,
        emailEmpresa,
        nombreSede,
        direccionSede,
        telefonoSede
      };
      await onboardingService.setupWorkspace(payload);
      onComplete(); // App.tsx will handle the logout and redirect
    } catch (err: any) {
      setError(err.message || 'Error occurred while saving workspace details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-container-low min-h-screen flex flex-col text-on-surface selection:bg-primary-fixed">
      {/* Top Navigation Anchor */}
      <header className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-xl flex justify-between items-center px-8 py-4 max-w-full shadow-sm shadow-outline-variant/10 border-b border-outline-variant/20">
        <div className="text-xl font-bold tracking-tight text-slate-900 font-headline">
            Gym Core
        </div>
        <div className="flex items-center gap-4 text-slate-500">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>help</span>
            <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-highest">
                <img alt="User profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt6yNhmdC1GTDR1-JBlZl5CWPwMxxJf4hIqNnnrx32hUvSiC7wqBDuFivqnW4qwzilzqyB7jcn87S-OrehCEEKDCmvJoHtrWxKJ_iMXBzBraX1zA-crOGMay7-L77a7tDsi_Jn00vuKQa3GYbD8w4UqGoaoTYXUNpB8mARBOvPde6fSKS7mUBZkbW6BLB7RAXVedZ1tdJhQn2QIKukOhxkShxfotMp_GicQdmEdMEO63Wgvc2mdDacAs-BDyHG9cC_fFFK9ISXSFHX" />
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-28 pb-12 w-full">
        {error && (
            <div className="mb-4 bg-error/10 border border-error/20 text-error px-6 py-4 rounded-xl max-w-2xl w-full">
                <strong>Atención: </strong>{error}
            </div>
        )}

        {step === 1 ? (
          <>
            {/* Header Outside Card (Step 1 specifics) */}
            <header className="mb-12 text-center w-full max-w-2xl px-6">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                   <span className="material-symbols-outlined text-on-primary">bolt</span>
                </div>
                <span className="font-headline font-black text-xl tracking-tighter uppercase">Gym Core</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-headline font-extrabold tracking-tight text-on-surface">
                 Bienvenido, configuremos tu espacio de trabajo.
              </h1>
            </header>

            {/* Stepper Inside / Card (Bento/Card) */}
            <section className="w-full max-w-2xl bg-surface-container-lowest shadow-2xl rounded-xl overflow-hidden flex flex-col border border-outline-variant/10 relative z-10">
              <div className="px-10 pt-10 pb-6 bg-surface-container-low/50">
                <nav className="flex items-center justify-between gap-4 relative">
                  {/* Step 1 (Active) */}
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="h-1.5 w-full bg-primary rounded-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary-container opacity-20"></div>
                    </div>
                    <div className="flex items-center gap-2 text-primary">
                      <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>business</span>
                      <span className="text-sm font-label font-semibold tracking-wide">Datos de la Empresa</span>
                    </div>
                  </div>
                  {/* Step 2 (Inactive) */}
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="h-1.5 w-full bg-surface-container-highest rounded-full"></div>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-lg">location_on</span>
                      <span className="text-sm font-label font-medium tracking-wide">Sede Principal</span>
                    </div>
                  </div>
                </nav>
              </div>

              {/* Form Content */}
              <div className="px-10 py-10 flex-grow">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-2xl font-headline font-bold mb-2">Cuéntanos sobre tu empresa</h2>
                    <p className="text-on-surface-variant text-base mb-10 leading-relaxed font-body">
                        Esta información se usará para la facturación y la configuración global.
                    </p>
                    <form className="space-y-8" id="company-form" onSubmit={handleNextStep}>
                        {/* Field 1 */}
                        <div className="group">
                            <label className="block text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-3 group-focus-within:text-on-primary-container transition-colors">
                                Razón Social / Nombre Comercial
                            </label>
                            <div className="relative">
                                <input required className="w-full px-5 py-4 bg-surface-container-low border-none rounded-xl text-lg font-body focus:ring-4 focus:ring-primary-fixed focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-on-surface" placeholder="Ej: Gym Fitness S.A.S" type="text" value={razonSocial} onChange={e => setRazonSocial(e.target.value)} />
                            </div>
                        </div>
                        {/* Field 2 */}
                        <div className="group">
                            <label className="block text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-3 group-focus-within:text-on-primary-container transition-colors">
                                NIT / Documento de Identidad
                            </label>
                            <div className="relative">
                                <input required className="w-full px-5 py-4 bg-surface-container-low border-none rounded-xl text-lg font-body focus:ring-4 focus:ring-primary-fixed focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-on-surface" placeholder="Ingresa el número de documento" type="text" value={nit} onChange={e => setNit(e.target.value)} />
                            </div>
                        </div>
                        {/* Field 3 */}
                        <div className="group">
                            <label className="block text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-3 group-focus-within:text-on-primary-container transition-colors">
                                Correo Electrónico de Contacto
                            </label>
                            <div className="relative">
                                <input required className="w-full px-5 py-4 bg-surface-container-low border-none rounded-xl text-lg font-body focus:ring-4 focus:ring-primary-fixed focus:bg-surface-container-lowest transition-all placeholder:text-outline-variant text-on-surface" placeholder="contacto@empresa.com" type="email" value={emailEmpresa} onChange={e => setEmailEmpresa(e.target.value)} />
                            </div>
                        </div>
                        {/* Hidden button for form submission via Enter key */}
                        <button type="submit" className="hidden"></button>
                    </form>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="px-10 py-8 bg-surface-container-low/30 flex justify-between items-center">
                  <div className="hidden md:flex items-center text-on-surface-variant gap-2 text-xs font-label uppercase tracking-tighter">
                      <span className="material-symbols-outlined text-sm">lock</span>
                      Conexión segura y cifrada
                  </div>
                  <button 
                     type="button"
                     onClick={handleNextStep}
                     disabled={!razonSocial || !nit || !emailEmpresa}
                     className="ml-auto flex items-center gap-3 bg-primary text-on-primary px-8 py-4 rounded-xl font-label font-bold tracking-tight hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/10 cursor-pointer disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed">
                      Siguiente Paso
                      <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Stepper Visual (Step 2 specifics) */}
            <div className="w-full max-w-2xl mb-12">
                <div className="flex items-center justify-between w-full max-w-md mx-auto">
                    <div className="flex flex-col items-center gap-2 group">
                        <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-md shadow-secondary/20">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 700" }}>check</span>
                        </div>
                        <span className="text-sm font-medium text-on-surface-variant">Datos de la Empresa</span>
                    </div>
                    <div className="flex-1 h-1 mx-4 bg-primary rounded-full"></div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center ring-4 ring-primary-fixed">
                            <span className="font-bold text-sm">2</span>
                        </div>
                        <span className="text-sm font-bold text-primary">Sede Principal</span>
                    </div>
                </div>
            </div>

            {/* Content for Step 2 */}
            <section className="w-full max-w-2xl bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-sm shadow-slate-200/50 relative z-10">
               {/* Header Section */}
                <div className="mb-10 text-left">
                    <h1 className="text-4xl font-extrabold tracking-tight text-primary mb-4 leading-tight font-headline">
                        Configura tu sede principal
                    </h1>
                    <p className="text-on-surface-variant text-lg leading-relaxed max-w-xl font-body">
                        Esta será la primera sucursal de tu gimnasio. Podrás agregar más sedes luego desde el panel de administración.
                    </p>
                </div>
                {/* Form Body */}
                <form className="space-y-8" onSubmit={handleComplete}>
                    <div className="grid grid-cols-1 gap-6">
                        {/* Input 1 */}
                        <div className="group">
                           <label className="block text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2 px-1 font-label">
                                Nombre de la Sede
                           </label>
                           <input required className="w-full h-14 px-6 rounded-xl border-0 bg-surface-container-low text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary-fixed focus:bg-surface-container-lowest transition-all duration-200 font-body" placeholder="Ej: Sede Central / Sede Norte" type="text" value={nombreSede} onChange={e => setNombreSede(e.target.value)} />
                        </div>
                        {/* Input 2 */}
                        <div className="group">
                           <label className="block text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2 px-1 font-label">
                                Dirección Completa
                           </label>
                           <div className="relative">
                               <input required className="w-full h-14 pl-12 pr-6 rounded-xl border-0 bg-surface-container-low text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary-fixed focus:bg-surface-container-lowest transition-all duration-200 font-body" placeholder="Ej: Av. Principal 123" type="text" value={direccionSede} onChange={e => setDireccionSede(e.target.value)} />
                               <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">location_on</span>
                           </div>
                        </div>
                        {/* Input 3 */}
                        <div className="group">
                            <label className="block text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2 px-1 font-label">
                                Teléfono de la Sede
                            </label>
                            <div className="relative">
                                <input required className="w-full h-14 pl-12 pr-6 rounded-xl border-0 bg-surface-container-low text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary-fixed focus:bg-surface-container-lowest transition-all duration-200 font-body" placeholder="Ej: +1 234 567 890" type="tel" value={telefonoSede} onChange={e => setTelefonoSede(e.target.value)} />
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">call</span>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Asset */}
                    <div className="w-full h-48 rounded-xl overflow-hidden mt-8 relative group">
                       <img alt="Gym interior" className="w-full h-full object-cover grayscale opacity-20 group-hover:opacity-30 transition-opacity duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH68GK84Fowi69LxlN5bMZlToqqtOsOFoKXL01QS6eHhxE6RcTU3Fr0pZFHC5fxpGt2rgDeSFyPdFAjKMe7ty5ovcj6nEK6IjKzSOjUovZKwGkH3DKZklSsdCsrZG2lM5_xqWjFLrrAxESG8NLo1Tv4XRaxcpzUFAgb3a4vvzcW_su2M2KUzVv4SHykHIFW8VkzX2efTxemn6l8npDNDdZ6zsCc4JI1x0UQLQ3kKGv4uF1Dt_5R27xqGAldFPsQy54Y6OG-exA95Wr" />
                       <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
                       <div className="absolute bottom-4 left-4 flex items-center gap-2">
                          <span className="material-symbols-outlined text-secondary">info</span>
                          <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest font-label">Información de Localización Requerida</span>
                       </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <button 
                           type="button"
                           onClick={() => setStep(1)}
                           disabled={loading}
                           className="order-2 sm:order-1 px-8 py-3 text-on-surface-variant font-semibold hover:text-primary transition-colors flex items-center gap-2 font-label cursor-pointer disabled:opacity-50">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Volver
                        </button>
                        <button 
                           type="submit"
                           disabled={loading || !nombreSede || !direccionSede || !telefonoSede}
                           className="order-1 sm:order-2 w-full sm:w-auto px-10 py-4 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-label cursor-pointer disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed">
                            {loading ? 'Procesando...' : 'Completar Registro'}
                            {!loading && <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>}
                        </button>
                    </div>
                </form>
            </section>
            {/* Contextual Help */}
            <p className="mt-8 text-on-surface-variant text-sm font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">lock</span>
                Tus datos están protegidos bajo protocolos de seguridad industrial.
            </p>
          </>
        )}
      </main>

      {/* Visual Polish: Background Gradients */}
      <div className="fixed top-0 left-0 -z-10 w-full h-full pointer-events-none opacity-40">
         <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-secondary-fixed-dim/20 blur-[120px]"></div>
         <div className="absolute bottom-[-10%] left-[-5%] w-[35vw] h-[35vw] rounded-full bg-primary-fixed-dim/20 blur-[100px]"></div>
      </div>

      <footer className="w-full py-8 mt-auto flex flex-col md:flex-row justify-center items-center gap-6 px-8 relative z-10 bg-transparent">
        <p className="font-label text-xs uppercase tracking-widest text-outline-variant dark:text-slate-600">
            © 2024 Gym Core. Todos los derechos reservados.
        </p>
        <div className="flex gap-6">
            <a className="font-label text-xs uppercase tracking-widest text-outline-variant dark:text-slate-600 hover:text-secondary transition-colors opacity-80 hover:opacity-100" href="#">Privacidad</a>
            <a className="font-label text-xs uppercase tracking-widest text-outline-variant dark:text-slate-600 hover:text-secondary transition-colors opacity-80 hover:opacity-100" href="#">Términos</a>
            <a className="font-label text-xs uppercase tracking-widest text-outline-variant dark:text-slate-600 hover:text-secondary transition-colors opacity-80 hover:opacity-100" href="#">Soporte</a>
        </div>
      </footer>
    </div>
  );
};
