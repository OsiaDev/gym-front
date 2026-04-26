import { apiService } from '@shared/services/api.service';

export enum TipoDocumento {
    CC = 'CC',
    CE = 'CE',
    PASAPORTE = 'PASAPORTE',
    NIT = 'NIT'
}

export interface Cliente {
    uuidCliente: string;
    tipoDocumento: TipoDocumento;
    documentoCliente: string;
    nombresCliente: string;
    apellidosCliente: string;
    celularCliente: string;
    emailCliente: string;
    estadoCliente: boolean;
    createdAt: string;
}

class ClientsService {
    /**
     * Busca un cliente por documento y empresaId.
     * El endpoint en el backend es GET /api/v1/clientes/{documento}
     */
    async buscarPorDocumento(documento: string): Promise<Cliente> {
        return await apiService.get<Cliente>(`/v1/clientes/buscar-documento/${documento}`);
    }

    /**
     * Registra un nuevo cliente globalmente y lo asocia a la empresa.
     * El endpoint en el backend es POST /api/v1/clientes
     */
    async registrarCliente(cliente: Partial<Cliente>): Promise<Cliente> {
        return await apiService.post<Cliente>('/v1/clientes/crear', cliente);
    }

    /**
     * Obtiene los tipos de documento disponibles.
     * El endpoint en el backend es GET /api/v1/clientes/tipos-documento
     */
    async getTiposDocumento(): Promise<TipoDocumento[]> {
        return await apiService.get<TipoDocumento[]>('/v1/clientes/tipos-documento');
    }
}

export const clientsService = new ClientsService();
