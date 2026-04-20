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
      "SELECT * FROM meals WHERE user_id = ? AND DATE(created_at) = DATE('now','utc')"
    )
    .all(userId);
  return meals;
}

export function deleteMealByMealId(mealId) {
  const result = db.prepare('DELETE FROM meals WHERE id = ?').run(mealId);
  return result;
}

export function getDailyTotals(userId) {
  const meals = db
    .prepare(
      `SELECT
  ROUND(COALESCE(SUM(calories), 0), 1) AS total_kcal,
  ROUND(COALESCE(SUM(protein), 0), 1) AS total_protein,
  ROUND(COALESCE(SUM(fat), 0), 1) AS total_fat,
  ROUND(COALESCE(SUM(carbs), 0), 1) AS total_carbs,
  ROUND(COALESCE(SUM(water), 0), 1) AS total_water,
  ROUND(COALESCE(SUM(caffeine), 0), 1) AS total_caffeine,
  ROUND(COALESCE(SUM(alcohol), 0), 1) AS total_alcohol
    FROM meals
    WHERE user_id = ?
    AND DATE(created_at) = DATE('now','utc')`
    )
    .all(userId);
  return meals;
}
