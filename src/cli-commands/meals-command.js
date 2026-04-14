// Meals command
// ADD , DELETE , MEAL LISt
import { addMeal, deleteMeal, listofMeal } from '../services/meal-service.js';
import chalk from 'chalk';

export async function mealsCli(subcommand, args) {
    if (!subcommand) {
        console.log(chalk.yellow('Usage: MEAL [ADD|LIST|DELETE]'));
        return;
    }

    switch (subcommand) {
        case 'ADD':
            await addMeal(...args);
            break;
        case 'LIST':
            await listofMeal(...args);
            break;
        case 'DELETE':
            await deleteMeal(...args);
            break;
        default:
            console.log(chalk.red('Invalid Meal action. Try ADD, LIST, or DELETE.'));
    }
}
