DROP DATABASE IF EXISTS tutor_db;
CREATE DATABASE tutor_db;

USE tutor_db;

CREATE TABLE students (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    class_code VARCHAR(100) NOT NULL,
    grad_date VARCHAR(50) NOT NULL,
    time_zone VARCHAR(10) NOT NULL,
    slack VARCHAR(30),
    status VARCHAR(10)
);