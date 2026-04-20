import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const databaseFile = join(__dirname, '../databases/food_tracker.db');

const db = new Database(databaseFile);

export function addMeal(
  userId,
  createdAt,
  name,
  quantity,
  calories,
  protein,
  fat,
  carbs,
  water,
  caffeine,
  alcohol
) {
  const meal = db
    .prepare(
      'INSERT INTO meals (user_id, created_at, name, quantity, calories, protein, fat, carbs, water, caffeine, alcohol) VALUES ( ?, ?, ?, ?, ROUND(?, 1), ROUND(?, 1), ROUND(?, 1), ROUND(?, 1), ROUND(?, 1), ROUND(?, 1), ROUND(?, 1));'
    )
    .run(
      userId,
      createdAt,
      name,
      quantity,
      calories,
      protein,
      fat,
      carbs,
      water,
      caffeine,
      alcohol
    );
  return meal;
}

export function getTodaysMealsByUserId(userId) {
  const meals = db
    .prepare(
      "SELECT * FROM meals WHERE user_id = ? AND DATE(created_at) = DATE('now')"
    )
    .all(userId);
  return meals;
}
