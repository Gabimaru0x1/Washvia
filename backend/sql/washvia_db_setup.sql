CREATE DATABASE IF NOT EXISTS washvia_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'washvia_app'@'localhost'
    IDENTIFIED BY 'getit';

GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, REFERENCES
    ON washvia_db.*
    TO 'washvia_app'@'localhost';