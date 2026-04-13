import { apiService } from '../../../shared/services/api.service';

export interface OnboardingRequest {
    razonSocial: string;
    nit: string;
    emailEmpresa: string;
    nombreSede: string;
    direccionSede: string;
    telefonoSede: string;
}

class OnboardingService {
    async setupWorkspace(data: OnboardingRequest): Promise<void> {
        // Will throw ApiError if status != 2xx
        await apiService.post('/v1/gym/onboarding', data);
    }
}

export const onboardingService = new OnboardingService();
