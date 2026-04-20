import promptSync from 'prompt-sync';
import chalk from 'chalk';
const prompt = promptSync();
import { getFirstFdcId, getNutrition } from '../intergrations/external-api.js';
import { addMeal as addMealRepository, getTodaysMealsByUserId, deleteMealByMealId } from '../repositories/meal-repository.js';

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

export async function deleteMeal(userId) {
  await listofMeal(userId);

  console.log();

  const idInput = prompt('Choose Meal ID to delete: ').trim();
  const mealId = Number(idInput);

  if (!Number.isInteger(mealId)) {
    console.log(chalk.red('Invalid Meal ID'));
    return;
  }

  const confirm = prompt('Are you sure? (y/n): ').toLowerCase();
  if (confirm !== 'y') {
    console.log(chalk.yellow('Deletion cancelled'));
    return;
  }

  const result = deleteMealByMealId(mealId);

  if (result.changes === 0) {
    console.log(chalk.yellow(`Meal with ID ${mealId} not found`));
  } else {
    console.log(chalk.green(`Meal ${mealId} deleted`));
  }
}

export async function listofMeal(userId) {
  
  const daylyListOfMeal = getTodaysMealsByUserId(userId)
    console.log(
    'Meal ID'.padEnd(10) + ' | ' +
    'Product'.padEnd(18) + ' | ' +
    'Kcal'.padEnd(5) + ' | ' +
    'Prot'.padEnd(5) + ' | ' +
    'Fat'.padEnd(5) + ' | ' +
    'Carbs'.padEnd(8) + ' | ' +
    'Water'.padEnd(5) + ' | ' +
    'Caffeine'.padEnd(8) + ' | ' +
    'Alcohol'
  );

  console.log('-'.repeat(95));

  daylyListOfMeal.forEach(meal => {
    console.log(
      String(meal.id).padEnd(10) + ' | ' +
      `${meal.name} ${meal.quantity}g`.padEnd(18) + ' | ' +
      Math.round(meal.calories).toString().padEnd(5) + ' | ' +
      `${meal.protein}g`.padEnd(5) + ' | ' +
      `${meal.fat}g`.padEnd(5) + ' | ' +
      `${meal.carbs}g`.padEnd(8) + ' | ' +
      `${meal.water}ml`.padEnd(5) + ' | ' +
      `${meal.caffeine}mg`.padEnd(8) + ' | ' +
      `${meal.alcohol}g`
    );
  });

return daylyListOfMeal
}

// export async function listofTotals() {}
