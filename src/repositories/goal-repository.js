import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const databaseFile = join(__dirname, '../databases/food_tracker.db');

const db = new Database(databaseFile);

function goalNumber(value) {
  if (value === null || value === undefined) return 0;
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

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
  const row = db.prepare('SELECT * FROM goals WHERE user_id = ?').get(userId);
  if (!row) {
    return {
      user_id: userId,
      kcal: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
      water: 0,
      caffeine: 0,
      alcohol: 0,
    };
  }
  return {
    ...row,
    kcal: goalNumber(row.kcal),
    protein: goalNumber(row.protein),
    fat: goalNumber(row.fat),
    carbs: goalNumber(row.carbs),
    water: goalNumber(row.water),
    caffeine: goalNumber(row.caffeine),
    alcohol: goalNumber(row.alcohol),
  };
}
