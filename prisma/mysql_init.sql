-- MySQL / MariaDB initialization script for cPanel hosting.
-- If you are using Prisma migrations, you usually do NOT need this file.
-- Use it when you want to create tables manually via phpMyAdmin / cPanel.

SET NAMES utf8mb4;
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS `Category` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Category_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `Sermon` (
  `id` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `speaker` VARCHAR(255) NULL,
  `date` DATETIME(3) NOT NULL,
  `durationMinutes` INT NULL,
  `thumbnailUrl` VARCHAR(2048) NULL,
  `videoUrl` VARCHAR(2048) NULL,
  `categoryId` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Sermon_slug_key` (`slug`),
  KEY `Sermon_categoryId_date_idx` (`categoryId`, `date`),
  CONSTRAINT `Sermon_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `Message` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(40) NULL,
  `subject` VARCHAR(255) NULL,
  `message` TEXT NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `Donation` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NULL,
  `phone` VARCHAR(40) NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `currency` VARCHAR(3) NOT NULL DEFAULT 'KES',
  `note` VARCHAR(500) NULL,
  `method` VARCHAR(60) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `Event` (
  `id` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `location` VARCHAR(255) NULL,
  `posterUrl` VARCHAR(2048) NULL,
  `startAt` DATETIME(3) NOT NULL,
  `endAt` DATETIME(3) NULL,
  `isPublished` BOOLEAN NOT NULL DEFAULT TRUE,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Event_slug_key` (`slug`),
  KEY `Event_isPublished_startAt_idx` (`isPublished`, `startAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `Pastor` (
  `id` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `roleTitle` VARCHAR(255) NULL,
  `bio` TEXT NULL,
  `photoUrl` VARCHAR(2048) NULL,
  `sortOrder` INT NOT NULL DEFAULT 0,
  `isPublished` BOOLEAN NOT NULL DEFAULT TRUE,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Pastor_slug_key` (`slug`),
  KEY `Pastor_isPublished_sortOrder_name_idx` (`isPublished`, `sortOrder`, `name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `SiteSettings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `siteName` VARCHAR(255) NOT NULL DEFAULT 'Deliverance Church Utawala',
  `shortName` VARCHAR(64) NOT NULL DEFAULT 'DC Utawala',
  `tagline` VARCHAR(255) NOT NULL DEFAULT 'The Church of Choice',
  `location` VARCHAR(255) NOT NULL DEFAULT 'Utawala, Nairobi, Kenya',
  `addressLine1` VARCHAR(255) NULL,
  `addressLine2` VARCHAR(255) NULL,
  `phoneDisplay` VARCHAR(64) NULL,
  `phoneTel` VARCHAR(64) NULL,
  `email` VARCHAR(255) NULL,
  `youtubeUrl` VARCHAR(2048) NULL,
  `facebookUrl` VARCHAR(2048) NULL,
  `instagramUrl` VARCHAR(2048) NULL,
  `liveEmbedUrl` VARCHAR(2048) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
