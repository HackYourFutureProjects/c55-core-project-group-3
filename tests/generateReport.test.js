import { describe, test, expect, vi } from 'vitest';

vi.mock('openai', () => {
  return {
    default: class {
      chat = {
        completions: {
          create: vi.fn().mockResolvedValue({
            choices: [{ message: { content: 'You did great today!' } }],
          }),
        },
      };
    },
  };
});

import { generateReport } from '../src/intergrations/ai.js';

const fakeGoals = {
  kcal: 2000,
  protein: 50,
  fat: 70,
  carbs: 250,
  water: 2000,
  caffeine: 200,
  alcohol: 0,
};

const fakeMeals = [
  {
    name: 'apple',
    quantity: '200g',
    calories: 100,
    protein: 1,
    fat: 0,
    carbs: 25,
    water: 50,
    caffeine: 0,
    alcohol: 0,
  },
];

describe('generateReport', () => {
  
  test('returns a string', async () => {
    const result = await generateReport(fakeGoals, fakeMeals);
    expect(typeof result).toBe('string');
  });

  
  test('is called with goals and meals', async () => {
    const result = await generateReport(fakeGoals, fakeMeals);
    expect(result).toBe('You did great today!');
  });

});