import { createProfile, login } from '../services/user-service.js';
import chalk from 'chalk';
import promptSync from 'prompt-sync';

const prompt = promptSync();

export async function userCommands() {
  while (true) {
    try {
      console.log(chalk.blue('\n=============================='));
      console.log(chalk.blue('    Welcome to FoodTracker'));
      console.log(chalk.blue('=============================='));
      console.log('1. Create Profile');
      console.log('2. Login');
      console.log('3. Exit');

      const userInput = prompt(chalk.yellow('Select an option: '));

      if (userInput === '3') {
        console.log(chalk.magenta('Goodbye! Stay healthy.'));
        process.exit(0);
      }

      if (userInput === '1') {
        await createProfile();
      } else if (userInput === '2') {
        const user = login();

        if (user) {
          console.log(
            chalk.green(`\nSuccess! Welcome back, ${user.name || 'User'}.`)
          );
          return user;
        } else {
          console.log(chalk.red('Login failed. Please try again.'));
        }
      } else {
        console.log(chalk.red('Invalid choice. Please enter 1, 2, or 3.'));
      }
    } catch (error) {
      console.log(chalk.red(`User Error: ${error.message}`));
    }
  }
}
