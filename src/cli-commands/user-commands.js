/*import { createProfile, login } from '../services/user-service.js';
import chalk from 'chalk';
import promptSync from 'prompt-sync';
//node src/cli-commands/user-commands.js
const prompt = promptSync();
export async function userCommands() {
  while (true) {
    try {
      console.log(chalk.blue('Welcome to FoodTracker'));
      console.log(chalk.blue('Your simple daily food tracker'));
      console.log('1. Create Profile');
      console.log('2. Login');
      console.log('3. Exit');
      const userInput = prompt();
      if (userInput === '3') {
        console.log('GoodBye Food Tracker'); //adjust
        break;
      } if (userInput === '1') {
        await createProfile(); //needs to be implemented
      } else if (userInput === '2') {
        await login(); //needs to be implemented
      } else {
        throw new Error(chalk.red('Invalid command'));
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

userCommands();
*/

import { createProfile, login } from '../services/user-service.js';
import chalk from 'chalk';
import promptSync from 'prompt-sync';

const prompt = promptSync();

/**
 * Handles the Authentication phase.
 * Returns the user object once logged in so the main loop can start.
 */
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
        process.exit(0); // Closes the entire terminal application
      }

      if (userInput === '1') {
        // After creating a profile, the loop continues to let them login
        await createProfile();
      } 
      else if (userInput === '2') {
        const user = await login(); 
        
        if (user) {
          console.log(chalk.green(`\nSuccess! Welcome back, ${user.name || 'User'}.`));
          // We RETURN the user object. This breaks the while loop 
          // and sends control back to index.js
          return user; 
        } else {
          console.log(chalk.red('Login failed. Please try again.'));
        }
      } 
      else {
        console.log(chalk.red('Invalid choice. Please enter 1, 2, or 3.'));
      }
    } catch (error) {
      console.log(chalk.red(`User Error: ${error.message}`));
    }
  }
}