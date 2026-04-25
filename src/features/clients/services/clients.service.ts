import { apiService } from '@shared/services/api.service';

export interface Cliente {
    uuidCliente: string;
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
     * El endpoint en el backend es GET /api/v1/gym/clientes/{documento}
     */
    async buscarPorDocumento(documento: string, empresaId: string): Promise<Cliente> {
        return await apiService.get<Cliente>(`/v1/gym/clientes/${documento}`, {
            params: { empresaId }
        });
    }

    /**
     * Registra un nuevo cliente globalmente y lo asocia a la empresa.
     * El endpoint en el backend es POST /api/v1/gym/clientes
     */
    async registrarCliente(cliente: Partial<Cliente>, empresaId: string): Promise<Cliente> {
        return await apiService.post<Cliente>('/v1/gym/clientes', cliente, {
            params: { empresaId }
        });
    }
}

export const clientsService = new ClientsService();
