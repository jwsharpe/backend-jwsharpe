CREATE TABLE users(
    id INT PRIMARY KEY,
    uname VARCHAR(255), 
    visits INT,
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP,
);

