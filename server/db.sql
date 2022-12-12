-- Docker can make the db
-- CREATE DATABASE todo_list_db;

--\c into todo_list_db

CREATE TABLE todo_item (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

ALTER TABLE todo_item
    ADD COLUMN important BOOLEAN DEFAULT FALSE;

ALTER TABLE todo_item
    ADD COLUMN more_info VARCHAR(255);

ALTER TABLE todo_item
    ADD COLUMN tags VARCHAR(255);

ALTER TABLE todo_item
    ALTER tags DROP DEFAULT,
    ALTER tags TYPE TEXT[] USING ARRAY[tags],
    ALTER tags SET DEFAULT '{}';

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL
);

-- psql -d "dbname='todo_list_db' user='postgres' password='postgres' host='localhost'" -f db.sql
