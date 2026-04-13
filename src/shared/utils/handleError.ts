export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

export const createApiError = (status: number, message: string): ApiError => {
    return new ApiError(status, message);
};

export const logError = (error: unknown, context: string): void => {
    console.error(`[${context}] Error:`, error);
};
