import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const databaseFile = join(__dirname, '../databases/food_tracker.db');

const db = new Database(databaseFile);

export function addGoal(
  userId,
  kCal,
  protein,
  fat,
  carbs,
  water,
  caffeine,
  alcohol
) {
  const goals = db
    .prepare(
      'INSERT INTO goals (user_id, kcal, protein, fat, carbs, water, caffeine, alcohol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    )
    .run(userId, kCal, protein, fat, carbs, water, caffeine, alcohol);
  return goals;
}

export function getUserGoals(userId) {
  const goals = db.prepare('SELECT * FROM goals WHERE user_id = ?').get(userId);
  return goals;
}
