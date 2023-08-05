CREATE DATABASE mile_file;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
);

CREATE TABLE runs (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    distance FLOAT NOT NULL,
    duration INT NOT NULL,
    avg_hr INT,
    description VARCHAR(255),
    intensity VARCHAR(255),
    date DATE DEFAULT CURRENT_DATE,
    type VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE lifts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    sets_back INT NOT NULL,
    sets_chest INT NOT NULL,
    sets_legs INT NOT NULL,
    sets_shoulder INT NOT NULL,
    sets_tricep INT NOT NULL,
    sets_bicep INT NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE nutrition (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    calories INT NOT NULL,
    food_score INT NOT NULL,
    description VARCHAR(255),
    date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


