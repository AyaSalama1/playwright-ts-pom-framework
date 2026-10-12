import { APIRequestContext } from '@playwright/test';

export class AuthService {
    private request: APIRequestContext;
    constructor(request: APIRequestContext) {
        this.request = request;
    }
    async login(credentials: { email: string; password: string }) {
        const response = await this.request.post('https://reqres.in/api/login', {
            data: credentials
        });
        return response;
    }
}