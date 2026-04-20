import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const databaseFile = join(__dirname, '../databases/food_tracker.db');

const db = new Database(databaseFile);

export function addUser(name, email) {
  const user = db
    .prepare('INSERT INTO users (name, email) VALUES (?, ?)')
    .run(name, email);

  return { id: user.lastInsertRowid, name, email };
}

export function getUserByNameAndEmail(name, email) {
  const user = db
    .prepare('SELECT * FROM users WHERE name = ? AND email = ?')
    .get(name, email);
  return user;
}

export function getUserByEmail(email) {
  const user = db
    .prepare('SELECT * FROM users WHERE email = ?')
    .get(email);
  return user;
}
