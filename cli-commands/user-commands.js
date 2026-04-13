/*
 Welkom -->
 Choose one option : 1,2,3
 we need the functions in the backend
 also we need to check input function
*/
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
async function setGoals(){
  /* 
Choose your goal:
OLD ONE
1. Weight Loss
2. Maintenance
3. Muscle Gain
*/
  console.log("Set your goal:");
  //We are not sure here
  console.log("");
}
export async function createProfile() {
  /*
Enter your name:
Enter your email:
Enter your age:
Enter your height:
Enter your weight:
  */
    console.log("Enter Your Name:")
    console.log("Enter Your E-MAIL:")
    console.log("Enter Your AGE:")
    console.log("Enter Your HIEGHT:")
    console.log("Enter Your WEIGHT:")
    //console.log("Choose your goal:")
    if (!name || !email) {
    throw new Error(
      chalk.red('ERROR: Must provide name and e-mail')
    );
  }

  
}
// its just an try or example.
export async function login(){
  // name
  console.log("Enter Your Name:")
  //const name= input();
  // email
  // const email = input();
  console.log("Enter Your e-mail:")
  if (!name || !email) {
    throw new Error(
      chalk.red('ERROR: Must provide name and e-mail')
    );
  }
  // Now we need to go the meals-command
  console.log("What would you like to do");
  console.log("ADD MEALS");
  console.log("DELETE MEALS");
  console.log("LIST of Meals");
}

