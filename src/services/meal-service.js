import promptSync from 'prompt-sync';
import chalk from 'chalk';
const prompt = promptSync();

// add delete list
// meal service
// DB
/*export async function getMeals(){
    
}*/

/*export async function saveMeals(){
    
}*/
export async function addMeal() {
  const foodName = prompt('Enter food name: ');
  let foodAmount;
  while (true) {
  const amount = prompt('Enter food amount: ').trim();
  foodAmount = parseFloat(amount);
  if (Number.isFinite(foodAmount)) break;
  console.log(chalk.red('Invalid amount please enter a number.'));
  }
  console.log('Choose unit:');
  console.log('1. g');
  console.log('2. ml'); // check the units
  const choose = prompt('> ').trim();
  let unit = 'g';
  if (choose === '1' || choose === 'g') {
    unit = 'g';
  }
  if (choose === '2' || choose === 'ml') {
    unit = 'ml';
  }
  if (Number.isNaN(foodAmount)) {
    console.log(chalk.red('Invalid amount'));
    return;
  }
  const amountWithUnit = `${foodAmount} ${unit}`;
  console.log(chalk.green(`ADDED: ${foodName} ${amountWithUnit}`));

  const meal = {
    name: foodName,
    amount: foodAmount,
    unit,
    display: amountWithUnit,
    createdAt: new Date().toISOString(),
  };
  return meal;
}

export async function deleteMeal() {

}

export async function listofMeal() {}
