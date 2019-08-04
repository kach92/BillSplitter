CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    password TEXT,
    image TEXT,
    mobile TEXT

);

CREATE TABLE IF NOT EXISTS bills (
    id SERIAL PRIMARY KEY,
    amount FLOAT(8),
    category TEXT,
    description TEXT,
    paid_by_user_id INT,
    group_id INT,
    created_at TIMESTAMP DEFAULT now(),
    FOREIGN KEY(group_id) REFERENCES groups (id),
    FOREIGN KEY(paid_by_user_id) REFERENCES users (id)

);

CREATE TABLE IF NOT EXISTS users_bills(
    id SERIAL PRIMARY KEY,
    user_id INT,
    bill_id INT,
    split_amount FLOAT(8),
    paid BOOLEAN DEFAULT false,
    FOREIGN KEY(user_id) REFERENCES users (id),
    FOREIGN KEY(bill_id) REFERENCES bills (id) ON DELETE CASCADE


);

CREATE TABLE IF NOT EXISTS groups(
    id SERIAL PRIMARY KEY,
    name TEXT,
    image TEXT
);

CREATE TABLE IF NOT EXISTS users_groups(
    id SERIAL PRIMARY KEY,
    user_id INT,
    group_id INT,
    FOREIGN KEY(user_id) REFERENCES users (id),
    FOREIGN KEY(group_id) REFERENCES groups (id)
);

CREATE TABLE IF NOT EXISTS net_table(
    id SERIAL PRIMARY KEY,
    user_id INT,
    net FLOAT(8),
    pay_to_id INT,
    group_id INT,
    bill_id INT,
    paid BOOLEAN DEFAULT false,
    FOREIGN KEY(user_id) REFERENCES users (id),
    FOREIGN KEY(group_id) REFERENCES groups (id),
    FOREIGN KEY(pay_to_id) REFERENCES users (id),
    FOREIGN KEY(bill_id) REFERENCES bills (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS activity(
    id SERIAL PRIMARY KEY,
    user_id INT,
    user_name TEXT,
    other_user_id INT,
    other_user_name TEXT,
    activity TEXT,
    category TEXT,
    bill_id INT,
    group_id INT,
    amount FLOAT(8),
    created_at TIMESTAMP DEFAULT now()
);