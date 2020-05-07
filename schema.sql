CREATE TABLE users(
    id INT PRIMARY KEY,
    username VARCHAR(255), 
    visits INT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);

