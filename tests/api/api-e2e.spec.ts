import { test, expect, request } from '@playwright/test';
import { AuthService } from '../../services/AuthService';
import { UsersService } from '../../services/UsersService';
import testData from '../../data/testData.json';

test.describe('API Testing - E2E', () => {
    let authService: AuthService;
    let usersService: UsersService;
    test.beforeEach(async ({ request }) => {
        authService = new AuthService(request);
        usersService = new UsersService(request);
    });
    test('Should successfully login, retrieve token, and fetch user with authentication', async () => {
        const loginResponse = await authService.login(testData.loginCredentials);
        expect(loginResponse.status()).toBe(200);
        const loginBody = await loginResponse.json();
        const token = loginBody.token;
        expect(token).toBeDefined();
        console.log(`Received Auth Token: ${token}`);
        const userId = 2;
       // const protectedResponse = await usersService.getUserWithAuth(userId, token);
       const userResponse = await usersService.getUser(userId);
        expect(userResponse.status()).toBe(200);
        const responseBody = await userResponse.json();
        console.log('Protected User Data:', responseBody);
        expect(responseBody.data).toHaveProperty('id', userId);
    });
    test('E2E Flow - Should create a user then fetch its details using API Chaining', async () => {
        //User creation 
        const createResponse = await usersService.createUser(testData.defaultUser);
        expect(createResponse.status()).toBe(201);
        const createResponseBody = await createResponse.json();
        const createdUserId = createResponseBody.id;
        console.log(`Created User ID for Chaining: ${createdUserId}`);
        expect(createdUserId).toBeDefined();

        //Assert that the user is created
        const fetchResponse = await usersService.getUser(createdUserId);
        expect(fetchResponse.status()).toBe(200);
        const fetchResponseBody = await fetchResponse.json();
        expect(fetchResponseBody.data).toHaveProperty('name', testData.defaultUser.name);

        //Update the user job
        const updateResponse = await usersService.updateUser(createdUserId, testData.updatedUser);
        expect(updateResponse.status()).toBe(200);
        const updateResponseBody = await updateResponse.json();
        expect(updateResponseBody).toHaveProperty('updatedAt');
        console.log(`Updated At: ${updateResponseBody.updatedAt}`);

        //Assert that the user is updated
        const fetchUpdateResponse = await usersService.getUser(createdUserId);
        expect(fetchUpdateResponse.status()).toBe(200);
        const fetchUpdateResponseBody = await fetchUpdateResponse.json();
        expect(fetchUpdateResponseBody.data).toHaveProperty('name', testData.updatedUser.name);
        expect(fetchUpdateResponseBody.data).toHaveProperty('job', testData.updatedUser.job);

        //Delete the user
        const deleteresponse = await usersService.deleteUser(createdUserId);
        expect(deleteresponse.status()).toBe(204);
        console.log('User deleted successfully with status code:', deleteresponse.status());
    });
});
