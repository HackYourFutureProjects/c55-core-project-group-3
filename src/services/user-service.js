import promptSync from 'prompt-sync';
import chalk from 'chalk';
import {
  addUser,
  getUserByNameAndEmail,
  getUserByEmail,
} from '../repositories/user-repository.js';
import { addGoal, getUserGoals } from '../repositories/goal-repository.js';

const PFC_CALORIES = { protein: 4, carbs: 4, fat: 9 };

const prompt = promptSync();

export async function setGoals(userId) {
  const schema = [
    { key: 'protein', label: 'Protein' },
    { key: 'carbs', label: 'Carbs' },
    { key: 'fat', label: 'Fat' },
    { key: 'alcohol', label: 'Alcohol' },
    { key: 'caffeine', label: 'Caffeine' },
    { key: 'water', label: 'Water' },
  ];

  const goals = {};

  for (const field of schema) {
    let isValid = false;
    let value = null;

    while (!isValid) {
      const input = prompt(`Enter desired ${field.label}: `).trim();

      if (input === '') {
        value = null;
        isValid = true;
      } else {
        value = parseFloat(input);

        if (Number.isFinite(value)) {
          isValid = true;
        } else {
          console.log(
            chalk.red(
              `  >> Invalid input. ${field.label} must be a number. Please try again.`
            )
          );
        }
      }
    }
    goals[field.key] = value;
  }

  goals.calories =
    (goals.protein || 0) * PFC_CALORIES.protein +
    (goals.carbs || 0) * PFC_CALORIES.carbs +
    (goals.fat || 0) * PFC_CALORIES.fat;

  console.log(`\n${chalk.blue('--- Goal Summary ---')}`);
  console.log(`Total Calories: ${chalk.green(goals.calories.toFixed(2))}`);

  addGoal(
    userId,
    goals.calories,
    goals.protein,
    goals.fat,
    goals.carbs,
    goals.water,
    goals.caffeine,
    goals.alcohol
  );

  return goals;
}

export async function getGoals(userId) {
  const goals = await getUserGoals(userId);

  if (!goals) {
    console.log(
      chalk.yellow('\nNo goals found for this user. Use "set goals" first!')
    );
    return null;
  }

  console.log(`\n${chalk.blue('--- Your Current Goals ---')}`);

  const calories = goals.calories || 0;
  console.log(`Calories: ${chalk.green(calories.toFixed(2))}`);

  console.log(`Protein: ${chalk.green(goals.protein ?? 'Not set')}`);
  console.log(`Carbs: ${chalk.green(goals.carbs ?? 'Not set')}`);
  console.log(`Fat: ${chalk.green(goals.fat ?? 'Not set')}`);
  console.log(`Water: ${chalk.green(goals.water ?? 'Not set')}`);
  console.log(`Caffeine: ${chalk.green(goals.caffeine ?? 'Not set')}`);
  console.log(`Alcohol: ${chalk.green(goals.alcohol ?? 'Not set')}`);

  return goals;
}

export async function createProfile(name, email) {
  console.log('Enter Your Name:');
  name = String(prompt()).trim();
  console.log('Enter Your E-MAIL:');
  email = String(prompt()).trim();

  const errors = [];

  if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
    errors.push('Name must be text (letters and spaces only)');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push('Invalid email format');
  }

  if (getUserByEmail(email)) {
    errors.push('Email already exists');
  }

  if (errors.length > 0) {
    throw new Error(chalk.red(errors.join(', ')));
  }

  console.log(chalk.yellow('\nSet your daily goals:'));
  const user = addUser(name, email);
  const goals = await setGoals(user.id);

  const newUser = { name, email, goals };

  console.log(chalk.green('Profile created successfully!'));

  return newUser;
}

export function login(name, email) {
  console.log('Enter Your Name:');
  name = String(prompt()).trim();
  console.log('Enter Your e-mail:');
  email = String(prompt()).trim();
  if (!name || !email) {
    throw new Error(chalk.red('Must provide name and e-mail'));
  }
  const user = getUserByNameAndEmail(name, email);
  if (!user) {
    throw new Error(chalk.red('User not found'));
  }
  return user;
}
