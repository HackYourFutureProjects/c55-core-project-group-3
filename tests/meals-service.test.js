import { describe, expect, test, vi } from 'vitest';
import { calculateNutrition } from '../src/services/meal-service';

// mock the API calls so no real internet calls are made
vi.mock('../src/intergrations/external-api.js', () => ({
  getFirstFdcId: vi.fn().mockResolvedValue(12345),
  getNutrition: vi.fn().mockResolvedValue({
    kcal: 100,
    protein: 10,
    fat: 5,
    carbs: 20,
    water: 60,
    caffeine: 0,
    alcohol: 0,
  }),
}));

describe('calculateNutrition', () => {
  test('calculates nutrition values correctly for 200g', async () => {
    const result = await calculateNutrition('Potatoes', 200);

    // 200g is 2x the per-100g values we set in the mock above
    expect(result.kcal).toBe(200);
    expect(result.protein).toBe(20);
    expect(result.fat).toBe(10);
    expect(result.carbs).toBe(40);
    expect(result.water).toBe(120);
    expect(result.caffeine).toBe(0);
    expect(result.alcohol).toBe(0);
  });
});