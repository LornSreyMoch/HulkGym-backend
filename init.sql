-- Create a new database
CREATE DATABASE tele_bot;

-- Connect to the new database
\c tele_bot;

-- Enable the pgcrypto extension for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create a new user with a password
CREATE USER admin1 WITH ENCRYPTED PASSWORD 'admin1111';

-- Grant privileges to the user
GRANT ALL PRIVILEGES ON DATABASE pkmis_db TO admin1;

-- Create the users table with a hashed password
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample users with hashed passwords
INSERT INTO users (name, email, password) VALUES 
('kimer', 'kimer@gmail', crypt('pass123', gen_salt('bf',10))),