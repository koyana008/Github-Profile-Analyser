CREATE DATABASE github_analyzer;
USE github_analyzer;
CREATE TABLE github_profiles(
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(255) UNIQUE,
name VARCHAR(255),
bio TEXT,
followers INT,
following INT,
public_repos INT,
public_gists INT,
account_age_days INT,
total_stars INT,
profile_score INT,
profile_url VARCHAR(500),
avatar_url VARCHAR(500),
analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);