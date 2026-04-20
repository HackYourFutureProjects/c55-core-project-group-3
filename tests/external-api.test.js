import { describe, test, expect, vi } from 'vitest';

// set fake API key BEFORE the module loads
vi.stubEnv('FDC_API_KEY', 'test-api-key');

import { getFirstFdcId } from '../src/intergrations/external-api.js';

describe('getFirstFdcId', () => {
  test('returns fdcId from first result', async () => {
    global.fetch = async () => ({
      ok: true,
      json: async () => ({ foods: [{ fdcId: 12345 }] }),
    });

    const result = await getFirstFdcId('apple');
    expect(result).toBe(12345);
  });

  test('returns null when no foods found', async () => {
    global.fetch = async () => ({
      ok: true,
      json: async () => ({ foods: [] }),
    });

    const result = await getFirstFdcId('nothing');
    expect(result).toBe(null);
  });

  test('throws when API returns 401', async () => {
    global.fetch = async () => ({
      ok: false,
      status: 401,
    });

    try {
      await getFirstFdcId('apple');
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe('FDC API error: 401');
    }
  });
});