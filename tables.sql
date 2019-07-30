CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    password TEXT

);

CREATE TABLE IF NOT EXISTS bills (
    id SERIAL PRIMARY KEY,
    amount FLOAT(8),
    category TEXT,
    description TEXT,
    group_id INT,
    created_at TIMESTAMP DEFAULT now(),
    FOREIGN KEY(group_id) REFERENCES groups (id)

);

CREATE TABLE IF NOT EXISTS users_bills(
    id SERIAL PRIMARY KEY,
    user_id INT,
    bill_id INT,
    split_amount FLOAT(8),
    FOREIGN KEY(user_id) REFERENCES users (id),
    FOREIGN KEY(bill_id) REFERENCES bills (id)

);

CREATE TABLE IF NOT EXISTS groups(
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS users_groups(
    id SERIAL PRIMARY KEY,
    user_id INT,
    group_id INT,
    FOREIGN KEY(user_id) REFERENCES users (id),
    FOREIGN KEY(group_id) REFERENCES groups (id)
);