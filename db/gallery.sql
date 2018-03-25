CREATE TABLE `library_db`.`gallery` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `filename` VARCHAR(200) NULL,
  `fileUrl` VARCHAR(300) NULL,
  `remarks` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));