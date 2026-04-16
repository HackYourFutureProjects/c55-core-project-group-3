import promptSync from 'prompt-sync';
import chalk from 'chalk';
const prompt = promptSync();
import { getFirstFdcId, getNutrition } from '../intergrations/external-api.js';
import { addMeal as addMealRepository } from '../repositories/meal-repository.js';

export async function addMeal(userId) {
  const foodName = prompt('Enter food name: ');
  let foodAmount;
  while (true) {
    const amount = prompt('Enter food amount: ').trim();
    foodAmount = parseFloat(amount);
    if (Number.isFinite(foodAmount)) break;
    console.log(chalk.red('Invalid amount please enter a number.'));
  }
  console.log('Choose unit:');
  console.log('1. g');
  console.log('2. ml');
  const choose = prompt('> ').trim();
  let unit = 'g';
  if (choose === '1' || choose === 'g') {
    unit = 'g';
  }
  if (choose === '2' || choose === 'ml') {
    unit = 'ml';
  }
  if (Number.isNaN(foodAmount)) {
    console.log(chalk.red('Invalid amount'));
    return;
  }
  const amountWithUnit = `${foodAmount} ${unit}`;

  const meal = {
    name: foodName,
    amount: foodAmount,
    unit,
    display: amountWithUnit,
    nutrition: await calculateNutrition(foodName, foodAmount),
    createdAt: new Date().toISOString(),
  };
  addMealRepository(
    userId,
    meal.createdAt,
    meal.name,
    meal.amount,
    meal.nutrition.kcal,
    meal.nutrition.protein,
    meal.nutrition.fat,
    meal.nutrition.carbs,
    meal.nutrition.water,
    meal.nutrition.caffeine,
    meal.nutrition.alcohol
  );
  console.log(chalk.green(`ADDED: ${foodName} ${amountWithUnit}`));

  return meal;
}
async function calculateNutrition(foodName, foodAmount) {
  const nutrition = await getNutrition(await getFirstFdcId(foodName));
  const multiplier = foodAmount / 100;
  const kcal = nutrition.kcal * multiplier;
  const protein = nutrition.protein * multiplier;
  const fat = nutrition.fat * multiplier;
  const carbs = nutrition.carbs * multiplier;
  const water = nutrition.water * multiplier;
  const caffeine = nutrition.caffeine * multiplier;
  const alcohol = nutrition.alcohol * multiplier;
  return {
    kcal: kcal,
    protein: protein,
    fat: fat,
    carbs: carbs,
    water: water,
    caffeine: caffeine,
    alcohol: alcohol,
  };
}
export async function deleteMeal() {}

export async function listofMeal() {}
