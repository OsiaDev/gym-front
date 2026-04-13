import { apiService } from '@shared/services/api.service';

export interface User {
    id: string;
    roles: string[];
    email: string;
    empresaId?: string | null;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
}

class AuthService {
    private tokenKey = 'auth_token';
    private userKey = 'auth_user';

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    getStoredUser(): User | null {
        const userStr = localStorage.getItem(this.userKey);
        if (!userStr) return null;
        try {
            return JSON.parse(userStr) as User;
        } catch {
            return null;
        }
    }

    setStoredUser(user: User): void {
        localStorage.setItem(this.userKey, JSON.stringify(user));
    }

    async login(request: LoginRequest): Promise<LoginResponse> {
        const response = await apiService.post<LoginResponse>('/v1/auth/login', request);
        this.setToken(response.accessToken);
        
        // Simular descifrado o usar un jwt-decode real si es necesario:
        let empresaId = null;
        let id = 'temp-id';
        let roles = ['ADMIN'];
        
        try {
            const payloadBase64 = response.accessToken.split('.')[1];
            // Base64URL decode
            const decodedJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
            const payload = JSON.parse(decodedJson);
            
            if (payload.empresa_id && payload.empresa_id.trim() !== '') {
                empresaId = payload.empresa_id;
            }
            if (payload.sub) {
                id = payload.sub;
            }
            if (payload.roles) {
                roles = Array.isArray(payload.roles) 
                    ? payload.roles 
                    : (typeof payload.roles === 'string' 
                        ? payload.roles.split(',').map((r: string) => r.trim()) 
                        : [String(payload.roles)]);
            }
        } catch (error) {
            console.error("Error decoding JWT:", error);
        }

        const user: User = {
            id,
            roles,
            email: request.email,
            empresaId
        };
        
        this.setStoredUser(user);
        
        return response;
    }

    async logout(): Promise<void> {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
        // Opcional: Llamada a la API para invalidar el token si es necesario
    }
}

export const authService = new AuthService();
