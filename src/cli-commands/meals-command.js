import { addMeal, deleteMeal, listofMeal } from '../services/meal-service.js';
import chalk from 'chalk';

export async function mealsCli(subcommand, args, currentUser) {
  if (!subcommand) {
    console.log(chalk.yellow('Meals commands is: ADD|LIST|DELETE'));
    return;
  }

  switch (subcommand) {
    case 'ADD':
      await addMeal(currentUser.id);
      break;
    case 'LIST':
      await listofMeal(currentUser.id);
      break;
    case 'DELETE':
      await deleteMeal(currentUser.id);
      break;
    default:
      console.log(chalk.red('Invalid Meal action. Try ADD, LIST, or DELETE.'));
  }
}
