DROP DATABASE IF EXISTS makeups_dev;

CREATE DATABASE makeups_dev;

\c makeups_dev;

CREATE TABLE makeups (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT,
    link TEXT,
    category TEXT,
    cost NUMERIC
);