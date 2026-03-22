CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username TEXT NOT NULL UNIQUE,
	email TEXT NOT NULL UNIQUE,
	password_hash TEXT NOT NULL
);

CREATE TABLE books (
	id SERIAL PRIMARY KEY,
	title TEXT NOT NULL,
	book_cover TEXT,
	ol_id TEXT NOT NULL UNIQUE,
	author_name TEXT,
	author_key TEXT
);

CREATE TABLE notes (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	book_id INTEGER NOT NULL REFERENCES books(id),
	content TEXT NOT NULL,
	date_read DATE,
	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
	UNIQUE (user_id, book_id),
    CHECK (date_read IS NULL OR date_read <= CURRENT_DATE)
);