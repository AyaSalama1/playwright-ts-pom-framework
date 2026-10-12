import { test, expect, request } from '@playwright/test';
import { UsersService } from '../../services/UsersService';

test.describe('API Testing - Users Feature', () => {

    test('GET - should fetch user details successfully', async ({ request }) => {
        const response = await request.get('https://reqres.in/api/users/1');
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.data).toHaveProperty('id', 1);
        expect(responseBody.data).toHaveProperty('email');
        console.log(`Fetched User Email: ${responseBody.data.email}`);
    });

    test('POST - should create a new user successfully', async ({ request }) => {
        const newUser = {
            name: 'Aya Salama',
            job: 'QA Automation Engineer'
        };
        const response = await request.post('https://reqres.in/api/users', {
            data: newUser
        });
        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('name', 'Aya Salama');
        expect(responseBody).toHaveProperty('job', 'QA Automation Engineer');
        expect(responseBody).toHaveProperty('id');
        console.log(`Created User ID: ${responseBody.id} at ${responseBody.createdAt}`);
    });
    test('GET with Query Parameters - should filter users by page', async ({ request }) => {
        const response = await request.get('https://reqres.in/api/users', {
            params: {
                page: 2,
                per_page: 5
            }
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('page', 2);
        expect(Array.isArray(responseBody.data)).toBeTruthy();
        console.log(`Total users on page 2: ${responseBody.data.length}`);
    });
    test('PUT - should update user details successfully', async ({ request }) => {
        const updatedData = {
            name: 'Aya Salama',
            job: 'Senior QA Automation Engineer'
        };
        const response = await request.put('https://reqres.in/api/users/2', {
            data: updatedData
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('job', 'Senior QA Automation Engineer');
        expect(responseBody).toHaveProperty('updatedAt');
        console.log(`Updated At: ${responseBody.updatedAt}`);
    });
    test('DELETE - should delete user successfully', async ({ request }) => {
        const response = await request.delete('https://reqres.in/api/users/2');
        expect(response.status()).toBe(204);
        console.log('User deleted successfully with status code:', response.status());
    });

    test('Get - Should fetch user 3 details successfully', async ({ request }) => {
        const response = await request.get('https://reqres.in/api/users/3');
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.data).toHaveProperty('id', 3);
        expect(responseBody.data).toHaveProperty('first_name', 'Emma');
        console.log(`Fetched User email: ${responseBody.data.email}`);
    });

    test('Post - Should create new user successfully', async ({ request }) => {
        const newUserData = {
            name: 'Aya Salama',
            job: 'QA Automation Lead'

        };
        const response = await request.post('https://reqres.in/api/users', { data: newUserData });
        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('name', newUserData.name);
        expect(responseBody).toHaveProperty('job', newUserData.job);
        expect(responseBody).toHaveProperty('id');
        console.log(`Created User ID: ${responseBody.id} at ${responseBody.createdAt}`);

    });
});
test.describe('API Testing - Users Feature with service pattern', () => {
    let usersService: UsersService;
    test.beforeEach(async ({ request }) => {
        usersService = new UsersService(request);
    });
    test('Get - Should fetch user details successfully', async () => {
        const response = await usersService.getUser(3); 
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.data).toHaveProperty('id', 3);
        expect(responseBody.data).toHaveProperty('first_name', 'Emma');
        console.log(`Fetched User email: ${responseBody.data.email}`);
    });

    test('Post - Should create new user successfully', async () => {
        const newUserData = {
            name: 'Aya Salama',
            job: 'QA Automation Engineer'

        };
        const response = await usersService.createUser(newUserData);
        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('name', newUserData.name);
        expect(responseBody).toHaveProperty('job', newUserData.job);
        expect(responseBody).toHaveProperty('id');
        console.log(`Created User ID: ${responseBody.id} at ${responseBody.createdAt}`);

    });

    test('PUT - should update user details successfully', async () => {
        const updatedData = {
            name: 'Aya Salama',
            job: 'QA Automation Lead'
        };

        const response = await usersService.updateUser(3, updatedData);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('job', updatedData.job);
        expect(responseBody).toHaveProperty('updatedAt');
        console.log(`Updated At: ${responseBody.updatedAt}`);
    });
    test('DELETE - should delete user successfully', async () => {
        const response = await usersService.deleteUser(3);
        expect(response.status()).toBe(204);
        console.log('User deleted successfully with status code:', response.status());
    });
});