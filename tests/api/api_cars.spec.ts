import { test, expect, request } from '@playwright/test';
import createUser from '../../utils/users/createUser';
import generateRandomEmail from '../../utils/generateRandomEmail';
import generateHeaderWithCookies from '../../utils/api-cookies/generateHeaderWithCookie';

let apiContext;
let headers;


const testUser = {
  name: 'Olena',
  lastName: 'Bob',
  email: generateRandomEmail(),
  password: 'Strong123!',
};

test.beforeAll(async ({ baseURL }) => {
 
  await createUser(
    testUser.name,
    testUser.lastName,
    testUser.email,
    testUser.password
  );

  
  headers = await generateHeaderWithCookies(testUser.email, testUser.password);

 
  apiContext = await request.newContext({
    baseURL: baseURL || 'https://qauto.forstudy.space',
    extraHTTPHeaders: {
      ...headers,
      'Content-Type': 'application/json',
    },
  });
});

test.afterAll(async () => {
  await apiContext.dispose(); 
});

test('POST /api/cars - should successfully create a car with valid data', async () => {
  const response = await apiContext.post('/api/cars', {
    data: {
      carBrandId: 1,
      carModelId: 1,
      mileage: 90786,
    },
  });

  expect(response.status()).toBe(200); 
  const responseBody = await response.json();
  expect(responseBody.message).toBe('Car succeessfully created	'); 
});

test('POST /api/cars - should return error for invalid mileage', async () => {
  const response = await apiContext.post('/api/cars', {
    data: {
      carBrandId: 1,
      carModelId: 1,
      mileage: -1, 
    },
  });

  expect(response.status()).toBe(400); 
  const responseBody = await response.json();
  expect(responseBody.message).toContain('Mileage has to be from 0 to 999999'); 
});

test('POST /api/cars - should return error when carModelId  is invalid', async () => {
  const response = await apiContext.post('/api/cars', {
    data: {
      carBrandId: 1,
      carModelId: 5678899,
      mileage: 122,
      
    },
  });

  expect(response.status()).toBe(404); 
  const responseBody = await response.json();
  expect(responseBody.message).toContain('Model not found'); 
});

