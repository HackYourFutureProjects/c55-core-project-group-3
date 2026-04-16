import { generateReport } from '../intergrations/ai.js';
import { getTodaysMealsByUserId } from '../repositories/meal-repository.js';
import { getUserGoals } from '../repositories/goal-repository.js';

import chalk from 'chalk';

export async function reportCli(subcommand, args, currentUser) {
  if (subcommand === 'SHOW') {
    await dailyReports(currentUser.id);
  } else if (!subcommand === 'SHOW') {
    console.log(chalk.red('Invalid Report Command. Try: REPORT SHOW'));
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
