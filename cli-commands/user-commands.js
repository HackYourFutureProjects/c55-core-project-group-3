import chalk from 'chalk';

export async function input(question) {
  //needs to be implemented
  return await ask(question);
}
export async function userCommands() {
  while (true) {
    console.log(chalk.blue('Welcome to FoodTracker'));
    console.log(chalk.blue('Your simple daily food tracker'));
    console.log('1. Create Profile');
    console.log('2. Login');
    console.log('3. Exit');
    const choose = await input('Please choose an option: ');
    if (choose === 1) {
      await createProfile(); //needs to be implemented
    } else if (choose === 2) {
      await login(); //needs to be implemented
    } else if (choose === 3) {
      console.log('Exit Food Tracker');
    } else {
      console.log(chalk.red('Invalid input'));
    }
  }
}

userCommands();
