import promptSync from 'prompt-sync';
import chalk from 'chalk';
import { userCommands } from './cli-commands/user-commands.js';
import { mealsCli } from './cli-commands/meals-command.js';
import { reportCli } from './cli-commands/reports-command.js';

const prompt = promptSync();

export function parseCommand(userInput) {
  const cleaned = String(userInput || '')
    .trim()
    .replace(/\s+/g, ' ');
  const [command = '', subcommand = '', ...args] = cleaned.split(' ');
  return {
    command: command.toUpperCase(),
    subcommand: subcommand.toUpperCase(),
    args,
  };
}

async function startApp() {
  try {
    const currentUser = await userCommands();

    console.log(
      chalk.yellow.bold(`\nWhat do you want to do today, ${currentUser.name}?`)
    );

    while (true) {
      console.log(chalk.blue('\n=============================='));
      const userInput = prompt(
        chalk.cyan(`${currentUser.name}  @foodtracker> `)
      );

      if (
        userInput === '3' ||
        (userInput && userInput.toUpperCase() === 'EXIT')
      ) {
        console.log(chalk.magenta('Logging out... Goodbye!'));
        break;
      }

      if (!userInput) continue;

      const { command, subcommand, args } = parseCommand(userInput);

      if (command === 'MEAL') {
        await mealsCli(subcommand, args, currentUser);
      } else if (command === 'REPORT') {
        await reportCli(subcommand, args, currentUser);
      } else {
        console.log(
          chalk.red('Unknown command. Please use MEAL, REPORT, or 3 to exit.')
        );
      }
    }
  } catch (error) {
    console.log(chalk.red(`Application Error: ${error.message}`));
  }
}

startApp();
