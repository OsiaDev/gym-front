import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, getHighestPriorityRole } from '../../auth/services/auth.service';
import { clientsService, Cliente } from '../services/clients.service';

export const ClientPage: React.FC = () => {
  const navigate = useNavigate();
  const user = authService.getStoredUser();
  const roleLabel = getHighestPriorityRole(user?.roles);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState<'idle' | 'found' | 'not_found'>('idle');
  const [foundClient, setFoundClient] = useState<Cliente | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleSearch = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim() || !user?.empresaId) {
      if (!user?.empresaId) console.error('No empresaId found for user');
      return;
    }

    setIsLoading(true);
    try {
      const client = await clientsService.buscarPorDocumento(searchQuery, user.empresaId);
      setFoundClient(client);
      setSearchStatus('found');
    } catch (error) {
      console.error('Error searching client:', error);
      setFoundClient(null);
      setSearchStatus('not_found');
    } finally {
      setIsLoading(false);
    }
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
          <a onClick={() => navigate('/dashboard')} className="flex items-center gap-3 px-6 py-4 text-on-surface-variant hover:bg-surface-container-low transition-all cursor-pointer">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-bold">Dashboard</span>
          </a>
          <a onClick={() => navigate('/clients')} className="relative flex items-center gap-3 px-6 py-4 text-on-secondary-container before:absolute before:left-0 before:w-1 before:h-6 before:bg-secondary before:rounded-r-full bg-secondary-container/30 scale-[0.99] transition-all cursor-pointer">
            <span className="material-symbols-outlined">group</span>
            <span className="font-bold">Clientes</span>
          </a>
          <a className="flex items-center gap-3 px-6 py-4 text-on-surface-variant hover:bg-surface-container-low transition-all cursor-pointer">
            <span className="material-symbols-outlined">card_membership</span>
            <span>Membresías</span>
          </a>
          <a className="flex items-center gap-3 px-6 py-4 text-on-surface-variant hover:bg-surface-container-low transition-all cursor-pointer">
            <span className="material-symbols-outlined">door_open</span>
            <span>Accesos</span>
          </a>
        </nav>

        <div className="mt-auto px-6 space-y-1 font-body">
          <a className="flex items-center gap-3 px-6 py-4 text-on-surface-variant hover:bg-surface-container-low transition-all cursor-pointer">
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
      <main className="ml-72 min-h-screen pt-20">
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

        <div className="max-w-6xl mx-auto px-12 py-12">
          {/* Header Section */}
          <header className="mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">Gestión de Clientes</h1>
            <p className="text-lg text-on-surface-variant font-body">Busca prospectos para asignar o vender nuevas membresías</p>
          </header>

          {/* Search Area (Bento Grid Style) */}
          <div className="grid grid-cols-12 gap-8 items-start">
            {/* Search Input Card */}
            <div className="col-span-12 lg:col-span-12 bg-surface-container-low p-8 rounded-xl shadow-sm border border-transparent">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-end gap-4">
                <div className="flex-1 w-full space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Búsqueda por Documento</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-on-primary-container transition-colors">search</span>
                    <input 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-none rounded-xl focus:ring-2 focus:ring-on-primary-container/20 placeholder:text-outline transition-all text-lg font-medium" 
                      placeholder="Ingresa el Número de Documento (Ej. 123)" 
                      type="text" 
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-primary text-on-primary px-10 py-4 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                >
                  <span className={`material-symbols-outlined ${isLoading ? 'animate-spin' : ''}`}>
                    {isLoading ? 'progress_activity' : 'search'}
                  </span>
                  {isLoading ? 'Buscando...' : 'Buscar'}
                </button>
              </form>
            </div>

            {/* STATE 1: FOUND (Left side focus) */}
            {searchStatus === 'found' && (
              <div className="col-span-12 lg:col-span-12">
                <div className="bg-surface-container-low p-8 rounded-xl border-l-8 border-secondary-fixed shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <span className="material-symbols-outlined text-9xl">person_search</span>
                  </div>
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex gap-6">
                      <div className="w-20 h-20 rounded-xl overflow-hidden shadow-inner">
                        <img alt="Alex Cliente profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL7c00JVz-nlhB-wcrNPEIKLptedwiI_tlVybDXrUXBFmy9BAv5Q_CgNW1ALcXH-c3o-2BMjvQ2EDWY20jKeEAlOBUnnIZV6JYEiq6PUaNxZ7lkMOOdvwhkQn06pFpDgtEX2azMNTjNYYWj36E75RYKr70wgyViYo7zsaJplZYuPhfZqPk5lE2GaPXvqzk9LHv-i6I2VfS2jE2dXAP3LG6ABggKHQ5mCpzfTuhZpBTLa1VhGrIlxxJHmOkc9hBta4h3XoEKYL3GYiY" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-extrabold text-slate-900 leading-none mb-2">
                          {foundClient?.nombresCliente} {foundClient?.apellidosCliente}
                        </h3>
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-surface-variant text-on-surface-variant uppercase tracking-wider">
                          {foundClient?.estadoCliente ? 'Activo' : 'Inactivo'} / Prospecto
                        </span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-white/50 rounded-full transition-colors">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-12 mb-10">
                    <div>
                      <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">Celular</p>
                      <p className="text-slate-900 font-semibold text-lg">{foundClient?.celularCliente || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">Email</p>
                      <p className="text-slate-900 font-semibold text-lg">{foundClient?.emailCliente || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">Documento</p>
                      <p className="text-slate-900 font-semibold text-lg">DNI {foundClient?.documentoCliente}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">Registro</p>
                      <p className="text-slate-900 font-semibold text-lg">
                        {foundClient?.createdAt ? new Date(foundClient.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="flex md:w-1/2 ml-auto">
                      <button className="w-full bg-primary text-white py-5 rounded-xl font-extrabold flex items-center justify-center gap-3 hover:scale-[1.01] transition-transform shadow-xl shadow-primary-container/10">
                          <span className="material-symbols-outlined">shopping_cart</span>
                          Vender Membresía
                      </button>
                  </div>
                </div>
              </div>
            )}

            {/* STATE 2: NOT FOUND */}
            {searchStatus === 'not_found' && (
              <div className="col-span-12 lg:col-span-12 flex flex-col h-full space-y-8">
                <div className="flex-1 bg-surface-container-low border border-dashed border-outline-variant p-10 rounded-xl flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-surface-container-highest rounded-full flex items-center justify-center text-outline">
                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 0" }}>person_off</span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-slate-900">No encontramos a este cliente</h4>
                    <p className="text-sm text-on-surface-variant max-w-62.5 mx-auto">No existe ningún registro con el documento ingresado en nuestra base de datos.</p>
                  </div>
                  {/* Keep the button as a dummy action for now */}
                  <button className="bg-secondary text-white px-8 py-3 rounded-xl font-bold hover:brightness-110 transition-all shadow-md active:scale-95 pointer-events-none">
                    Completa el formulario de abajo
                  </button>
                </div>
                
                {/* STATE 3: FORM */}
                <div className="bg-surface-container-low p-10 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <h2 className="text-2xl font-extrabold text-slate-900">Formulario de Registro</h2>
                      <p className="text-on-surface-variant text-sm">Completa la información básica para dar de alta al prospecto.</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant">person_add</span>
                    </div>
                  </div>
                  
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-outline ml-1">Nombre</label>
                      <input className="w-full p-4 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-on-primary-container/20 transition-all" placeholder="Ej. Juan" type="text" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-outline ml-1">Apellidos</label>
                      <input className="w-full p-4 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-on-primary-container/20 transition-all" placeholder="Ej. Pérez" type="text" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-outline ml-1">Tipo de Documento</label>
                      <select className="w-full p-4 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-on-primary-container/20 transition-all appearance-none">
                        <option>DNI - Documento Nacional de Identidad</option>
                        <option>CE - Carnet de Extranjería</option>
                        <option>Pasaporte</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-outline ml-1">Documento</label>
                      <input defaultValue={searchQuery} className="w-full p-4 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-on-primary-container/20 transition-all" placeholder="Ej. 76543210" type="text" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-outline ml-1">Email</label>
                      <input className="w-full p-4 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-on-primary-container/20 transition-all" placeholder="juan.perez@example.com" type="email" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-outline ml-1">Teléfono</label>
                      <input className="w-full p-4 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-on-primary-container/20 transition-all" placeholder="+51 900 000 000" type="tel" />
                    </div>

                    <div className="md:col-span-2 flex items-center justify-end gap-4 pt-6">
                      <button onClick={() => setSearchStatus('idle')} className="px-8 py-3 rounded-xl font-bold text-outline hover:text-slate-900 transition-colors" type="button">
                        Cancelar
                      </button>
                      <button className="bg-primary text-white px-12 py-4 rounded-xl font-extrabold shadow-lg hover:scale-[1.02] transition-transform active:scale-95" type="button" onClick={() => { alert('Cliente guardado!'); setSearchStatus('found'); }}>
                        Guardar Cliente
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* Contextual Metric Footer */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-surface-container-lowest rounded-xl border-t-4 border-primary shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-outline mb-2">Total Prospectos Hoy</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-headline font-extrabold text-slate-900 tracking-tighter">24</span>
                <span className="text-secondary font-bold text-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  +12%
                </span>
              </div>
            </div>
            <div className="p-8 bg-surface-container-lowest rounded-xl border-t-4 border-secondary-fixed-dim shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-outline mb-2">Conversión Ventas</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-headline font-extrabold text-slate-900 tracking-tighter">18%</span>
                <span className="text-outline font-bold text-sm">Promedio Semanal</span>
              </div>
            </div>
            <div className="p-8 bg-surface-container-lowest rounded-xl border-t-4 border-on-primary-container shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-outline mb-2">Consultas Documento</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-headline font-extrabold text-slate-900 tracking-tighter">142</span>
                <span className="text-outline font-bold text-sm">Últimas 24h</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
