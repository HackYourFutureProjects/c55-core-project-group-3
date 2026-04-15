CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT,
    name TEXT,
    age INT,
    weight FLOAT,
    height FLOAT
);

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    kcal INT,
    protein FLOAT,
    fat FLOAT,
    carbs FLOAT,
    water FLOAT,
    caffeine FLOAT,
    alcohol FLOAT,

    CONSTRAINT fk_goals_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE meals (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    source TEXT,
    name TEXT,
    quantity FLOAT,
    calories FLOAT,
    protein FLOAT,
    fat FLOAT,
    carbs FLOAT,
    water FLOAT,
    caffeine FLOAT,
    alcohol FLOAT,

    CONSTRAINT fk_meals_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


CREATE INDEX idx_meals_user ON meals(user_id);
CREATE INDEX idx_meals_created_at ON meals(created_at);
CREATE INDEX idx_goals_user ON goals(user_id);