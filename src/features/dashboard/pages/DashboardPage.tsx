import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, getHighestPriorityRole } from '../../auth/services/auth.service';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const user = authService.getStoredUser();
  const roleLabel = getHighestPriorityRole(user?.roles);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };
  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* SideNavBar */}
      <aside className="h-screen w-72 fixed left-0 top-0 z-50 bg-surface-container-lowest flex flex-col py-8 border-r border-outline-variant/30 font-headline text-sm font-medium">
        <div className="px-8 mb-12 flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-surface-container-lowest" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            </div>
            <div>
              <h2 className="text-lg font-black text-on-surface leading-tight">Gym Core</h2>
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Elite Performance</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 font-body">
          <a className="relative flex items-center gap-3 px-6 py-4 text-on-secondary-container before:absolute before:left-0 before:w-1 before:h-6 before:bg-secondary before:rounded-r-full bg-secondary-container/30 scale-[0.99] transition-all" href="#dashboard">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-bold">Dashboard</span>
          </a>
          <a className="flex items-center gap-3 px-6 py-4 text-on-surface-variant hover:bg-surface-container-low transition-all" href="#clients">
            <span className="material-symbols-outlined">group</span>
            <span>Clientes</span>
          </a>
          <a className="flex items-center gap-3 px-6 py-4 text-on-surface-variant hover:bg-surface-container-low transition-all" href="#memberships">
            <span className="material-symbols-outlined">card_membership</span>
            <span>Membresías</span>
          </a>
          <a className="flex items-center gap-3 px-6 py-4 text-on-surface-variant hover:bg-surface-container-low transition-all" href="#access">
            <span className="material-symbols-outlined">door_open</span>
            <span>Accesos</span>
          </a>
        </nav>

        <div className="mt-auto px-6 space-y-1 font-body">
          <a className="flex items-center gap-3 px-6 py-4 text-on-surface-variant hover:bg-surface-container-low transition-all" href="#support">
            <span className="material-symbols-outlined">help</span>
            <span>Soporte</span>
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-6 py-4 text-error hover:bg-error-container/30 transition-all rounded-xl"
          >
            <span className="material-symbols-outlined">logout</span>
            <span>Salir</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-72 min-h-screen">
        {/* TopAppBar */}
        <header className="fixed top-0 left-72 right-0 h-20 px-8 z-40 bg-background/80 backdrop-blur-xl flex justify-between items-center border-b border-outline-variant/10 font-headline font-semibold tracking-tight">
          <div className="flex items-center bg-surface-container px-4 py-2 rounded-full w-96 border border-outline-variant/30">
            <span className="material-symbols-outlined text-outline mr-3">search</span>
            <input className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm w-full placeholder:text-outline font-body" placeholder="Buscar socios, pagos..." type="text" />
          </div>
          <div className="flex items-center gap-6">
            <button className="text-outline hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="text-outline hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-outline-variant/30">
              <div className="text-right">
                <p className="text-sm font-bold text-on-surface">{user?.nick || user?.email || 'Propietario Gym'}</p>
                <p className="text-[10px] text-on-surface-variant uppercase font-body">{roleLabel}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold font-body">
                {(user?.nick || user?.email) ? (user?.nick || user?.email)!.substring(0, 2).toUpperCase() : 'PR'}
              </div>
            </div>
          </div>
        </header>

        {/* Canvas */}
        <div className="pt-28 px-12 pb-12 font-body">
          {/* Welcome Header */}
          <section className="mb-10">
            <h1 className="text-4xl font-extrabold text-primary font-headline tracking-tight mb-2">¡Hola de nuevo, Propietario!</h1>
            <p className="text-on-surface-variant font-medium">Aquí tienes el resumen arquitectónico de tu centro hoy.</p>
          </section>

          {/* Metrics Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Metric 1 */}
            <div className="bg-surface-container-lowest p-8 rounded-(--radius-lg) border border-outline-variant/30 group hover:-translate-y-1 transition-all duration-300 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-(--radius) bg-primary-fixed/50 text-on-primary-fixed">
                  <span className="material-symbols-outlined">group</span>
                </div>
                <span className="text-secondary text-xs font-bold bg-secondary-container/30 px-2 py-1 rounded-full">+12%</span>
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-1">Usuarios Activos</p>
              <p className="text-4xl font-black font-headline">1,284</p>
            </div>
            {/* Metric 2 */}
            <div className="bg-surface-container-lowest p-8 rounded-(--radius-lg) border border-outline-variant/30 group hover:-translate-y-1 transition-all duration-300 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-(--radius) bg-secondary-container/50 text-on-secondary-container">
                  <span className="material-symbols-outlined">login</span>
                </div>
                <span className="text-secondary text-xs font-bold bg-secondary-container/30 px-2 py-1 rounded-full">Hoy</span>
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-1">Accesos Hoy</p>
              <p className="text-4xl font-black font-headline">342</p>
            </div>
            {/* Metric 3 */}
            <div className="bg-surface-container-lowest p-8 rounded-(--radius-lg) border border-outline-variant/30 group hover:-translate-y-1 transition-all duration-300 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-(--radius) bg-tertiary-fixed/50 text-on-tertiary-fixed">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <span className="text-on-surface-variant text-xs font-bold bg-surface-container-highest px-2 py-1 rounded-full">Mes</span>
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-1">Ingresos Mensuales</p>
              <p className="text-4xl font-black font-headline">€42,150</p>
            </div>
            {/* Metric 4 */}
            <div className="bg-surface-container-lowest p-8 rounded-(--radius-lg) border border-outline-variant/30 group hover:-translate-y-1 transition-all duration-300 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-(--radius) bg-error-container text-on-error-container">
                  <span className="material-symbols-outlined">warning</span>
                </div>
                <span className="text-error text-xs font-bold px-2 py-1 rounded-full">Alerta</span>
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-1">Próximos a Vencer</p>
              <p className="text-4xl font-black font-headline">18</p>
            </div>
          </section>

          {/* Main Layout Grid (Asymmetric) */}
          <div className="grid grid-cols-12 gap-8">
            {/* Weekly Attendance Chart Simulation */}
            <div className="col-span-12 lg:col-span-8">
              <div className="bg-surface-container-lowest rounded-(--radius-lg) p-10 border border-outline-variant/30 h-full shadow-sm">
                <div className="flex justify-between items-end mb-12">
                  <div>
                    <h3 className="text-2xl font-extrabold mb-1 font-headline">Asistencia Semanal</h3>
                    <p className="text-on-surface-variant text-sm font-medium">Volumen de entradas por día de la semana</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-full text-xs font-bold bg-primary text-on-primary">7 DÍAS</button>
                    <button className="px-4 py-2 rounded-full text-xs font-bold text-on-surface-variant hover:bg-surface-container transition-colors">30 DÍAS</button>
                  </div>
                </div>
                {/* Simulated Bar Chart */}
                <div className="flex items-end justify-between h-64 px-4 w-full">
                  <div className="flex flex-col items-center gap-4 w-12 group">
                    <div className="w-full bg-surface-variant rounded-full h-[60%] group-hover:bg-primary-fixed-dim transition-all duration-500"></div>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">Lun</span>
                  </div>
                  <div className="flex flex-col items-center gap-4 w-12 group">
                    <div className="w-full bg-surface-variant rounded-full h-[75%] group-hover:bg-primary-fixed-dim transition-all duration-500"></div>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">Mar</span>
                  </div>
                  <div className="flex flex-col items-center gap-4 w-12 group">
                    <div className="w-full bg-surface-variant rounded-full h-[85%] group-hover:bg-primary-fixed-dim transition-all duration-500"></div>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">Mie</span>
                  </div>
                  <div className="flex flex-col items-center gap-4 w-12 group relative">
                    <div className="absolute -top-10 bg-primary-container text-on-primary-container text-[10px] px-2 py-1 rounded font-bold">HOY</div>
                    <div className="w-full bg-primary-container rounded-full h-[95%] shadow-lg"></div>
                    <span className="text-[10px] font-bold text-primary uppercase">Jue</span>
                  </div>
                  <div className="flex flex-col items-center gap-4 w-12 group">
                    <div className="w-full bg-surface-variant rounded-full h-[80%] group-hover:bg-primary-fixed-dim transition-all duration-500"></div>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">Vie</span>
                  </div>
                  <div className="flex flex-col items-center gap-4 w-12 group">
                    <div className="w-full bg-surface-variant rounded-full h-[55%] group-hover:bg-primary-fixed-dim transition-all duration-500"></div>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">Sab</span>
                  </div>
                  <div className="flex flex-col items-center gap-4 w-12 group">
                    <div className="w-full bg-surface-variant rounded-full h-[30%] group-hover:bg-primary-fixed-dim transition-all duration-500"></div>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">Dom</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Last Check-ins Panel */}
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-surface-container-lowest rounded-(--radius-lg) p-10 border border-outline-variant/30 h-full shadow-sm">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-2xl font-extrabold tracking-tight font-headline">Últimos Check-ins</h3>
                  <span className="material-symbols-outlined text-outline">history</span>
                </div>
                <div className="space-y-8">
                  {/* Check-in 1 */}
                  <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant">EL</div>
                      <div>
                        <p className="font-bold text-sm">Elena Martínez</p>
                        <p className="text-[11px] text-on-surface-variant font-medium">Membresía Premium</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-outline">12:45 PM</span>
                  </div>
                  {/* Check-in 2 */}
                  <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant">CV</div>
                      <div>
                        <p className="font-bold text-sm">Carlos Varela</p>
                        <p className="text-[11px] text-on-surface-variant font-medium">Acceso Total</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-outline">12:38 PM</span>
                  </div>
                  {/* Check-in 3 */}
                  <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant">SB</div>
                      <div>
                        <p className="font-bold text-sm">Sara Bosch</p>
                        <p className="text-[11px] text-on-surface-variant font-medium">Funcional</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-outline">12:15 PM</span>
                  </div>
                </div>
                <button className="w-full mt-12 py-4 rounded-full border border-outline-variant hover:bg-surface-container transition-colors text-sm font-bold tracking-tight text-on-surface">
                  VER TODO EL HISTORIAL
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button (FAB) */}
      <button className="fixed bottom-10 right-10 w-16 h-16 bg-primary-container text-on-primary-container rounded-(--radius-lg) shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-50">
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </div>
  );
};
