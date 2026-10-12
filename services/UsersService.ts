import { APIRequestContext } from '@playwright/test';

export class UsersService {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getUser(userId: number) {
        return await this.request.get(`https://reqres.in/api/users/${userId}`);
    }

    async createUser(userData: { name: string; job: string }) {
        return await this.request.post('https://reqres.in/api/users', { data: userData });
    }

    async updateUser(userId: number, userData: { name: string; job: string }) {
        return await this.request.put(`https://reqres.in/api/users/${userId}`, { data: userData });
    }

    async deleteUser(userId: number) {
        return await this.request.delete(`https://reqres.in/api/users/${userId}`);
    }
}