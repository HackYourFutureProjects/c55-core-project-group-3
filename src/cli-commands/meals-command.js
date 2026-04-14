/*// Meals command
// ADD , DELETE , MEAL LISt

import { addMeal, deleteMeal, listofMeal } from '../services/meal-service.js';
import promptSync from 'prompt-sync';
import chalk from 'chalk';
const prompt = promptSync();

export async function mealsCommand(subcommand, args) {
  // If caller provided a subcommand, handle it once and return
  if (subcommand) {
    const sub = String(subcommand).toUpperCase();
    const callArgs = args || [];
    if (sub === 'ADD') return await addMeal(...callArgs);
    if (sub === 'LIST') return await listofMeal(...callArgs);
    if (sub === 'DELETE') return await deleteMeal(...callArgs);
    throw new Error(chalk.red('Invalid Subcommand'));
  }

  while (true) {
    try {
      const userInput = prompt();
      if (userInput === '3') break;

      const command = parseCommand(userInput);
      // prefer explicit subcommand, fall back to first token (so "ADD" works)
      const sub = String(
        command.subcommand || command.command || ''
      ).toUpperCase();
      const callArgs = command.args || [];

      if (sub === 'ADD') {
        await addMeal(...callArgs);
      } else if (sub === 'LIST') {
        await listofMeal(...callArgs);
      } else if (sub === 'DELETE') {
        await deleteMeal(...callArgs);
      } else {
        throw new Error(chalk.red('Invalid Subcommand'));
      }
    } catch (err) {
      console.log(err.message || err);
    }
  }
}
mealsCommand();*//*
import { addMeal, deleteMeal, listofMeal } from '../services/meal-service.js';
import promptSync from 'prompt-sync';
import chalk from 'chalk';


export async function mealsCli(params) {
    const prompt = promptSync();
// 2. Interactive Mode
  console.log('MEAL, or type "EXIT" to quit.');

  while (true) {
    try {
      const userInput = prompt(chalk.yellow('command-cli> '));

      if (!userInput) continue;
      if (userInput.toUpperCase() === 'EXIT' || userInput === '3') break;

      const { subcommand: rawSub, args: callArgs } = parseCommand(userInput);
      const sub = rawSub.toUpperCase();

      if (sub === 'ADD') {
        await addMeal(...callArgs);
      } else if (sub === 'LIST') {
        await listofMeal(...callArgs);
      } else if (sub === 'DELETE') {
        await deleteMeal(...callArgs);
      } else {
        console.log(chalk.red('Invalid Subcommand. Try ADD, LIST, or DELETE.'));
      }
    } catch (err) {
      console.log(chalk.red(err.message || err));
    }
  }
}


// Ensure the command is only called once if running this file directly
// mealsCommand();*/
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
