-- Run this in phpMyAdmin if you already imported mysql_init.sql earlier
-- and need to add new columns without dropping tables.

ALTER TABLE `Event`
  ADD COLUMN `posterUrl` VARCHAR(2048) NULL AFTER `location`;

