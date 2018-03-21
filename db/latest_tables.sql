CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author_lastname` varchar(110) COLLATE utf8_unicode_ci DEFAULT NULL,
  `author_firstname` varchar(110) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cover_thumbnail` varchar(110) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'bookcover.jpg',
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
