import { addMeal, deleteMeal, listofMeal } from '../services/meal-service.js';
import { getGoals } from '../services/user-service.js';
import { getUserGoals } from '../repositories/goal-repository.js';
import chalk from 'chalk';

export async function mealsCli(subcommand, args, currentUser) {
  if (!subcommand) {
    console.log(chalk.yellow('Meals commands is: ADD|LIST|DELETE|GOALS'));
    return;
  }

  switch (subcommand) {
    case 'ADD':
      await addMeal(currentUser.id);
      break;
    case 'LIST':
      await listofMeal(currentUser.id);
      break;
    case 'GOALS':
      await getGoals(currentUser.id);
      break;
    case 'DELETE':
      await deleteMeal(currentUser.id);
      break;
    default:
      console.log(chalk.red('Invalid Meal action. Try ADD, LIST, or DELETE.'));
  }
}
