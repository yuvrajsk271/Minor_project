CREATE DATABASE image_db;

USE image_db;

CREATE TABLE images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_name VARCHAR(255) NOT NULL,
    image_path VARCHAR(255) NOT NULL
);

-- Insert some test data
INSERT INTO images (image_name, image_path) VALUES ('example.jpg', '/path/to/example.jpg');
