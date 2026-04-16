-- USERS

-- name: createUser(saveUser)
INSERT INTO users (email, name, age, weight, height)
VALUES (?, ?, ?, ?, ?);

-- name: getUserById
SELECT * FROM users
WHERE id = ?;

-- name: updateUser
UPDATE users
SET
    email = ?,
    name = ?,
    age = ?,
    weight = ?,
    height = ?
WHERE id = ?;

-- GOALS

-- name: createGoal(saveGoal)
INSERT INTO goals (user_id, kcal, protein, fat, carbs, water, caffeine, alcohol)
VALUES (?, ?, ?, ?, ?, ?, ?, ?);

-- name: getUserGoals
SELECT * FROM goals
WHERE user_id = ?;

-- name: updateGoal
UPDATE goals
SET
    kcal = ?,
    protein = ?,
    fat = ?,
    carbs = ?,
    water = ?,
    caffeine = ?,
    alcohol = ?
WHERE user_id = ?;

-- MEALS

-- name: createMeal
INSERT INTO meals (
    user_id,
    created_at,
    name,
    quantity,
    calories,
    protein,
    fat,
    carbs,
    water,
    caffeine,
    alcohol
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- name: getMealById
SELECT *
FROM meals
WHERE id = ?;

-- name: updateMeal
UPDATE meals
SET
    name = ?,
    quantity = ?,
    calories = ?,
    protein = ?,
    fat = ?,
    carbs = ?,
    water = ?,
    caffeine = ?,
    alcohol = ?
WHERE id = ?;

-- name: deleteMeal
DELETE FROM meals
WHERE id = ?;

-- name: getAllMeals
SELECT *
FROM meals
WHERE user_id = ?
ORDER BY created_at DESC;

-- name: getMealsByDate
SELECT *
FROM meals
WHERE user_id = ?
AND DATE(created_at) = ?;

-- ANALYTICS

-- name: getDailyTotals
SELECT
SELECT
    COALESCE(SUM(calories), 0) AS total_kcal,
    COALESCE(SUM(protein), 0) AS total_protein,
    COALESCE(SUM(fat), 0) AS total_fat,
    COALESCE(SUM(carbs), 0) AS total_carbs,
    COALESCE(SUM(water), 0) AS total_water,
    COALESCE(SUM(caffeine), 0) AS total_caffeine,
    COALESCE(SUM(alcohol), 0) AS total_alcohol
FROM meals
WHERE user_id = ?
AND DATE(created_at) = ?;

-- name: getDailyComparison
SELECT
    g.kcal AS goal_kcal,
    SUM(m.calories) AS actual_kcal,
    SUM(m.calories) - g.kcal AS diff_kcal,

    g.protein,
    SUM(m.protein) AS actual_protein,
    SUM(m.protein) - g.protein AS diff_protein,

    g.fat,
    SUM(m.fat) AS actual_fat,
    SUM(m.fat) - g.fat AS diff_fat,

    g.carbs,
    SUM(m.carbs) AS actual_carbs,
    SUM(m.carbs) - g.carbs AS diff_carbs

FROM goals g
JOIN meals m ON g.user_id = m.user_id

WHERE g.user_id = ?
AND DATE(m.created_at) = ?

GROUP BY g.kcal, g.protein, g.fat, g.carbs;