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
