import promptSync from 'prompt-sync';
import chalk from 'chalk';
import {
  addUser,
  getUserByNameAndEmail,
} from '../repositories/user-repository.js';
import { addGoal } from '../repositories/goal-repository.js';

const prompt = promptSync();

export async function setGoals(userId) {
  const calories = parseFloat(prompt('Enter desired Calories: '));
  const protein = parseFloat(prompt('Enter desired Protein: '));
  const carbs = parseFloat(prompt('Enter desired Carbs: '));
  const fat = parseFloat(prompt('Enter desired Fat: '));
  const alcohol = parseFloat(prompt('Enter desired Alcohol: '));
  const caffeine = parseFloat(prompt('Enter desired Caffeine: '));
  const water = parseFloat(prompt('Enter desired Water: '));

  const goals = {
    calories,
    protein,
    carbs,
    fat,
    alcohol,
    water,
    caffeine,
  };
  addGoal(userId, calories, protein, fat, carbs, water, caffeine, alcohol);
  return goals;
}

export async function createProfile(name, email) {
  console.log('Enter Your Name:');
  name = String(prompt()).trim();
  console.log('Enter Your E-MAIL:');
  email = String(prompt()).trim();
  if (!name || !email) {
    throw new Error(chalk.red('ERROR: Must provide name and e-mail'));
  }
  console.log(chalk.yellow('\nSet your daily goals:'));
  const user = addUser(name, email);
  const goals = await setGoals(user.id);

  const newUser = { name, email, goals };

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
  const user = getUserByNameAndEmail(name, email);
  if (!user) {
    throw new Error(chalk.red('ERROR: User not found'));
  }
  return user;
}
