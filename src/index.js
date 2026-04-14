import promptSync from 'prompt-sync';
import chalk from 'chalk';
import { userCommands } from './cli-commands/user-commands.js';
import { mealsCli } from './cli-commands/meals-command.js';
import { reportCli } from './cli-commands/reports-command.js';

const prompt = promptSync();

export function parseCommand(userInput) {
  if (!userInput) return { command: '', subcommand: '', args: [] };
  
  const cleanedInput = userInput.trim().replace(/\s+/g, ' ');
  const [command, subcommand, ...args] = cleanedInput.split(' ');
  
  return {
    command: command ? command.toUpperCase() : '',
    subcommand: subcommand ? subcommand.toUpperCase() : '',
    args: args
  };
}

/**
 * Main Application Entry Point
 */
async function startApp() {
  try {
    // --- PHASE 1: AUTHENTICATION ---
    // This calls your userCommands loop. 
    // It will stay there until a user logs in (returns user) or exits (process.exit).
    const currentUser = await userCommands();

    console.log(chalk.green.bold(`\nWelcome to your dashboard, ${currentUser.name}!`));
    console.log(`- ${chalk.yellow('3')} to Logout/Exit\n`);

    // --- PHASE 2: MAIN ACTION LOOP ---
    // Now that we are logged in, we run the primary command loop.
    while (true) {
      const userInput = prompt(chalk.cyan(`${currentUser.name}@foodtracker> `));

      // Handle Exit
      if (userInput === '3' || (userInput && userInput.toUpperCase() === 'EXIT')) {
        console.log(chalk.magenta('Logging out... Goodbye!'));
        break;
      }

      if (!userInput) continue;

      const { command, subcommand, args } = parseCommand(userInput);

      // Route to the correct module
      if (command === 'MEAL') {
        await mealsCli(subcommand, args);
      } 
      else if (command === 'REPORT') {
        await reportCli(subcommand, args);
      } 
      else {
        console.log(chalk.red('Unknown command. Please use MEAL, REPORT, or 3 to exit.'));
      }
    }
  } catch (error) {
    console.log(chalk.red(`Critical Application Error: ${error.message}`));
  }
}

// Start the program
startApp();