import { test, expect } from '@playwright/test';
import fs from 'fs';

test('Create Learning Instance API', async ({ request }) => {
  const payload = JSON.parse(
    fs.readFileSync('test-data/learningInstancePayload.json', 'utf8')
  );

  payload.name = `test-${Date.now()}`;

  const response = await request.post(
    'https://community.cloud.automationanywhere.digital/cognitive/v3/learninginstances',
    {
      headers: {
        'Content-Type': 'application/json',
        'x-authorization': process.env.AA_TOKEN!,
      },
      data: payload,
    }
  );

  console.log('Status:', response.status());

  const body = await response.json();
  console.log(body);

  expect(response.status()).toBe(200);
  expect(body.id).toBeTruthy();
  expect(body.name).toBe(payload.name);
  expect(body.status).toBe('PRIVATE');
});