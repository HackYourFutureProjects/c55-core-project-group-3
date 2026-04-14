//user service
// Get User And Save User
import promptSync from 'prompt-sync';
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { mealsCli } from '../cli-commands/meals-command.js';
import { reportCli } from '../cli-commands/reports-command.js';

const prompt = promptSync();

export async function setGoals() {
  const calories = parseFloat(prompt('Enter desired Calories: '));
  const protein = parseFloat(prompt('Enter desired Protein: '));
  const carbs = parseFloat(prompt('Enter desired Carbs: '));
  const fat = parseFloat(prompt('Enter desired Fat: '));
  const alcohol = parseFloat(prompt('Enter desired Alcohol: '));
  const water = parseFloat(prompt('Enter desired Water: '));

  const goals = {
    calories,
    protein,
    carbs,
    fat,
    alcohol,
    water,
  };
  /*if{
        throw new Error(chalk.red('Invalid Amount'));
      }
  //save data in DB*/
  return goals;
}

/*export async function getUsers(){
    SELECT
}*/

/*export async function saveUsers(){
    ADD
}*/

export async function createProfile(name, email) {
  console.log('Enter Your Name:');
  name = String(prompt()).trim();
  console.log('Enter Your E-MAIL:');
  email = String(prompt()).trim();
  if (!name || !email) {
    throw new Error(chalk.red('ERROR: Must provide name and e-mail'));
  }
  console.log(chalk.yellow('\nSet your daily goals:'));
  const goals = await setGoals();

  const newUser = { name, email, goals };
  
  // TODO: await saveUserToDB(newUser);
  console.log(chalk.green('Profile created successfully!'));
  
  return newUser;
}

export async function login(name, email) {
  console.log('Enter Your Name:');
  name = String(prompt()).trim();
  console.log('Enter Your e-mail:');
  email = String(prompt()).trim();
  if (!name || !email) {
    throw new Error(chalk.red('ERROR: Must provide name and e-mail'));
  }
  const mockUser = { name, email, goals: {} }; 
  return mockUser;
  // We need also to check if the name and email is not correct
  // We need to fetch from db here
  /*getUsers(); 
const found = users.find(user => user.name === name && user.email === email);
if (!found) {
  throw new Error(chalk.red('ERROR: Your name or e-mail is not correct'));
}*/
}
