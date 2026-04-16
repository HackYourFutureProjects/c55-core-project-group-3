import { describe, expect, test, vi } from 'vitest';
import { mealsCli } from '../src/cli-commands/meals-command.js';
import * as mealService from '../src/services/meal-service.js';

vi.mock('../src/services/meal-service.js');

test('ADD', async () => {
    await mealsCli('ADD', ['Pasta', '500']);
    expect(mealService.addMeal).toHaveBeenCalledWith('Pasta', '500');
});

test('LIST', async () => {
    await mealsCli('LIST', []);
    expect(mealService.listofMeal).toHaveBeenCalled();
}); 

test('DELETE', async () => {
    await mealsCli('DELETE', ['1']);
    expect(mealService.deleteMeal).toHaveBeenCalledWith('1');
});

test('Invalid Command', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    await mealsCli('INVALID', []);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid Meal action'));
});