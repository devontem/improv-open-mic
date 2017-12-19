DROP DATABASE `improvApp`;

CREATE DATABASE `improvApp`;

use improvApp;

CREATE TABLE IF NOT EXISTS `open_mics` (
  `id` INT AUTO_INCREMENT,
  `venue_id` INT DEFAULT NULL,
  `day_of_week` INT DEFAULT NULL,
  `venue` VARCHAR(30) DEFAULT NULL,
  `venue` VARCHAR(30) DEFAULT NULL,
  `start_time` VARCHAR(40) DEFAULT NULL,
  `end_time` VARCHAR(40) DEFAULT NULL,
  `city` VARCHAR(30) DEFAULT NULL,
  `country` VARCHAR(30) DEFAULT NULL,
  `active` INT DEFAULT 0,

  PRIMARY KEY (`id`),
  FOREIGN KEY (`venue_id`) REFERENCES venues(id)
);

CREATE TABLE IF NOT EXISTS `venues` (
  `id` INT AUTO_INCREMENT,
  `name` VARCHAR(30),
  `city` VARCHAR(30),
  `country` VARCHAR(30),

  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT,
  `email` VARCHAR(40),
  `password` VARCHAR(30),
  `photo` VARCHAR(255),
  `city` VARCHAR(40),
  `join_date` VARCHAR(40),

  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `forum_posts` (
  `id` INT AUTO_INCREMENT,
  `author_id` INT,
  `title` VARCHAR(100) DEFAULT NULL,
  `body` TEXT,
  `date` VARCHAR(40),

  PRIMARY KEY (`id`),
  FOREIGN KEY (`author_id`) REFERENCES users(`id`)
);

CREATE TABLE IF NOT EXISTS `forum_replies` (
  `id` INT AUTO_INCREMENT,
  `parent_post_id` INT,
  `author_id` INT,
  `body` TEXT,
  `date` VARCHAR(30),

  PRIMARY KEY (`id`),
  FOREIGN KEY (`parent_post_id`) REFERENCES forum_posts(id),
  FOREIGN KEY (`author_id`) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS `reviews` (
  `id` INT AUTO_INCREMENT,
  `author_id` INT,
  `open_mic_id` INT,
  `title` VARCHAR(40),
  `photo` VARCHAR(50),
  `body` TEXT,
  `date`, VARCHAR(40),

  PRIMARY KEY (`id`),
  FOREIGN KEY (`author_id`) REFERENCES users(id),
  FOREIGN KEY (`open_mic_id`) REFERENCES open_mics(id)
);

CREATE TABLE IF NOT EXISTS `review_comments` (
  `id` INT AUTO_INCREMENT,
  `author_id` INT,
  `review_id` INT,
  `title` VARCHAR(40),
  `body` TEXT,
  `date`, VARCHAR(40),

  PRIMARY KEY (`id`),
  FOREIGN KEY (`author_id`) REFERENCES users(id),
  FOREIGN KEY (`review_id`) REFERENCES reviews(id)
);

CREATE TABLE IF NOT EXISTS `friends` (
  `id` INT AUTO_INCREMENT,
  `user_id` INT,
  `friend_id` INT,

  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES users(id),
  FOREIGN KEY (`friend_id`) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS `memberships` (
  `id` INT AUTO_INCREMENT,
  `user_id` INT,
  `open_mic_id` INT,

  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES users(id),
  FOREIGN KEY (`open_mic_id`) REFERENCES open_mics(id)
);

-- CREATE TABLE IF NOT EXISTS `forum_likes` (
--   `id` INT AUTO_INCREMENT,
--   `image` VARCHAR(255) DEFAULT NULL,
--   `title` VARCHAR(30) DEFAULT NULL,
--   `venue` VARCHAR(30) DEFAULT NULL,
--   `start_time` VARCHAR(20) DEFAULT NULL,
--   `end_time` VARCHAR(20) DEFAULT NULL,
--   `day_of_week` VARCHAR(20) DEFAULT NULL,
--   `city` VARCHAR(30) DEFAULT NULL,
--   `country` VARCHAR(30) DEFAULT NULL,
--   `rating` INT DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- );

-- CREATE TABLE IF NOT EXISTS `review_likes` (
--   `id` INT AUTO_INCREMENT,
--   `image` VARCHAR(255) DEFAULT NULL,
--   `title` VARCHAR(30) DEFAULT NULL,
--   `venue` VARCHAR(30) DEFAULT NULL,
--   `start_time` VARCHAR(20) DEFAULT NULL,
--   `end_time` VARCHAR(20) DEFAULT NULL,
--   `day_of_week` VARCHAR(20) DEFAULT NULL,
--   `city` VARCHAR(30) DEFAULT NULL,
--   `country` VARCHAR(30) DEFAULT NULL,
--   `rating` INT DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- );

CREATE TABLE IF NOT EXISTS `tags` (
  `id` INT AUTO_INCREMENT,
  `title` VARCHAR(40),

  PRIMARY KEY (`id`)
);
CREATE TABLE IF NOT EXISTS `open_mic_tag_maps` (
  `id` INT AUTO_INCREMENT,
  `open_mic_id` INT,
  `tag_id` INT,

  PRIMARY KEY (`id`),
  FOREIGN KEY (`open_mic_id`) REFERENCES open_mics(id),
  FOREIGN KEY (`tag_id`) REFERENCES tags(id)
);
