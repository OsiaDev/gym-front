import { apiService } from '@shared/services/api.service';

export interface RegisterRequest {
    nombres: string;
    apellidos: string;
    nickUsuario: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const authApi = {
    register: async (data: RegisterRequest): Promise<string> => {
        return apiService.post<string>('/v1/auth/register', data);
    },
    checkEmail: async (email: string): Promise<boolean> => {
        return apiService.get<boolean>(`/v1/auth/check-email?email=${encodeURIComponent(email)}`);
    },
    checkNick: async (nick: string): Promise<boolean> => {
        return apiService.get<boolean>(`/v1/auth/check-nick?nick=${encodeURIComponent(nick)}`);
    }
};
