/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS user(
    email VARCHAR(40) NOT NULL PRIMARY KEY,
    password VARCHAR(80) NOT NULL,
    type TINYINT NOT NULL
);

CREATE TABLE IF NOT EXISTS expenses(
id VARCHAR(80) NOT NULL PRIMARY KEY,
   name VARCHAR(40) NOT NULL,
   amount FLOAT NOT NULL,
   date DATETIME NOT NULL,
   approve TINYINT NOT NULL, 
   email VARCHAR(40) NOT NULL,  
   FOREIGN KEY (email) REFERENCES user(email)
);