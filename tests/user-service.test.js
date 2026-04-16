import { test, expect, describe, vi } from 'vitest';
import { createProfile } from '../src/services/user-service.js';

// Mock meal-service if it's imported somewhere and causing issues
vi.mock('../src/services/meal-service.js');

describe('User Service - Create Profile', () => {
  test('created profile has correct structure', async () => {
    const user = await createProfile('John Doe', 'john.doe@example.com');

    expect(user).toHaveProperty('name', 'John Doe');
    expect(user).toHaveProperty('email', 'john.doe@example.com');
    expect(user).toHaveProperty('goals');
    expect(user).toHaveProperty('createdAt');
  });
});
