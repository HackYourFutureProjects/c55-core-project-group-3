import { generateReport } from '../intergrations/ai.js';
import {
  getTodaysMealsByUserId,
  getDailyTotals,
} from '../repositories/meal-repository.js';
import { getUserGoals } from '../repositories/goal-repository.js';
import { listofMeal } from '../services/meal-service.js';

import chalk from 'chalk';

export async function reportCli(subcommand, _, currentUser) {
  switch (subcommand) {
    case 'SHOW':
      await dailyReports(currentUser.id);
      break;
    case 'CURRENT':
      await currentReport(currentUser.id);
      break;
    default:
      console.log(
        chalk.red('Invalid Report Command. Try: REPORT SHOW or REPORT CURRENT')
      );
  }
}

export async function fetchDate() {
  const date = new Date();
  const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' });
  const day = date.getDate();
  const month = date.toLocaleDateString('en-GB', { month: 'long' });
  const year = date.getFullYear();

  const formatted = `${weekday} ${day} ${month} ${year}`;

  console.log('Date:', formatted);
}

export async function dailyReports(userId) {
  console.log('=====================================');
  console.log('       🍎 DAILY NUTRITION REPORT');
  console.log('=====================================');
  fetchDate();

  console.log('📊 MACROS vs GOALS');
  console.log('-------------------------------------');
  const meals = getTodaysMealsByUserId(userId);
  const goals = getUserGoals(userId);
  const report = await generateReport(goals, meals);
  console.log(report);
}

export async function currentReport(userId) {
  listofMeal(userId);
  const {
    total_kcal,
    total_protein,
    total_fat,
    total_carbs,
    total_water,
    total_caffeine,
    total_alcohol,
  } = getDailyTotals(userId)[0];
  
  console.log('-'.repeat(95));

  console.log(
    "Totals".padEnd(10) + ' | ' +
      ` `.padEnd(18) + ' | ' +
      total_kcal.toString().padEnd(5) + ' | ' +
      `${total_protein}g`.padEnd(5) + ' | ' +
      `${total_fat}g`.padEnd(5) + ' | ' +
      `${total_carbs}g`.padEnd(8) + ' | ' +
      `${total_water}ml`.padEnd(5) + ' | ' +
      `${total_caffeine}mg`.padEnd(8) + ' | ' +
      `${total_alcohol}g`
    );
}
