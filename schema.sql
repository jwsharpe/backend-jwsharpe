CREATE TABLE users(
    id INT PRIMARY KEY,
    username VARCHAR(255), 
    visits INT,
    created_on TIMESTAMP NOT NULL,
    updated_on TIMESTAMP
);

