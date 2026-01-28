CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username TEXT,
	password TEXT
);

CREATE TABLE books (
	id SERIAL PRIMARY KEY,
	title TEXT NOT NULL,
	author TEXT,
	author_key VARCHAR(45),
	ol_id VARCHAR(45)
);

CREATE TABLE notes (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id) NOT NULL,
	book_id INTEGER REFERENCES books(id) NOT NULL,
	notes TEXT NOT NULL,
	date_read DATE,
	created_at TIMESTAMP DEFAULT Now()
);