import { describe, test, expect, vi } from 'vitest';

const mockRun = vi.fn().mockReturnValue({ lastInsertRowid: 1 });
const mockGet = vi.fn();
const mockPrepare = vi.fn().mockReturnValue({
  run: mockRun,
  get: mockGet,
});


vi.mock('better-sqlite3', () => {
  return {
    default: class {
      prepare() {
        return mockPrepare();
      }
    },
  };
});

import { addUser, getUserByNameAndEmail } from '../src/repositories/user-repository.js';

describe('addUser', () => {
  test('returns a new user with id, name and email', () => {
    mockRun.mockReturnValue({ lastInsertRowid: 42 });

    const result = addUser('Hannah', 'hannah@email.com');

    expect(result).toEqual({
      id: 42,
      name: 'Hannah',
      email: 'hannah@email.com',
    });
  });
});

describe('getUserByNameAndEmail', () => {
  test('returns user when found', () => {
    mockGet.mockReturnValue({
      id: 1,
      name: 'Hannah',
      email: 'hannah@email.com',
    });

    const result = getUserByNameAndEmail('Hannah', 'hannah@email.com');

    expect(result).toEqual({
      id: 1,
      name: 'Hannah',
      email: 'hannah@email.com',
    });
  });

  test('returns undefined when user not found', () => {
    mockGet.mockReturnValue(undefined);

    const result = getUserByNameAndEmail('nobody', 'nobody@email.com');

    expect(result).toBe(undefined);
  });
});