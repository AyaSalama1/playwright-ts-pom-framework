import { test, expect } from '@playwright/test';
import { AuthService } from '../../services/AuthService';
import testData from '../../data/testData.json';
test.describe('API Testing - Authentication', () => {
    let authService: AuthService;

    test.beforeEach(async ({ request }) => {
        authService = new AuthService(request);
    });

    test('Should successfully login and receive a token', async () => {
        const response = await authService.login(testData.loginCredentials);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        const token = responseBody.token;
        console.log(`Received Auth Token: ${token}`);
        expect(token).toBeDefined();

    });
});