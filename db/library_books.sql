-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 25, 2016 at 07:07 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `children_library`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE IF NOT EXISTS `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author_lastname` varchar(110) COLLATE utf8_unicode_ci DEFAULT NULL,
  `author_firstname` varchar(110) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cover_thumbnail` varchar(110) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'bookcover.jpg',
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=126 ;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `author_lastname`, `author_firstname`, `title`, `cover_thumbnail`, `modified_date`, `created_date`, `is_deleted`) VALUES
(1, 'Leigh', 'Susannah', 'The Haunted Tower', 'the_haunted_tower.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(2, 'St Michael', '', 'Aircraft', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(3, 'Ladybird', '', 'How it Works - Television', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(4, 'Meadows', 'Daisy', 'Ella the Rose Fairy', 'ella_the_rose_fairy.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(5, 'Meadows', 'Daisy', 'Heather the Violet Fairy', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(6, 'Meadows', 'Daisy', 'Polly the Party Fun Fairy', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(7, 'Meadows', 'Daisy', 'Emily the Emerald Fairy', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(8, 'Meadows', 'Daisy', 'Lucy the Diamond Fairy', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(9, 'Meadows', 'Daisy', 'Storm the Lightning Fairy', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(10, 'Wilson', 'Jacqueline', 'Cliffhanger', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(11, 'Dixon', 'N & M', 'The Puffin Quiz Book', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(12, 'Norwak / Gibson', '', 'Something to Collect', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(13, 'Gribbin / Dewar ', '', 'What''s the Big Idea - Time and the Universe', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(14, 'Ganeri / McIntyre', '', 'What''s the Big Idea - Animal Rights', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(15, 'Barber / Dewar', '', 'What''s the Big Idea - The Environment', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(16, 'Brookes / Dewar', '', 'What''s the Big Idea - Genetics', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(17, 'Deary', 'Terry', 'The Ruthless Romans', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(18, 'Coleman', 'Michael', 'Kickin'' Quiz Book', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(19, 'Deary', 'Terry', 'The Vicious Vikings', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(20, 'Dunphy', 'Eamon', 'Only a Game', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(21, 'Garner', 'Alan', 'The Owl Service', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(22, 'Garfield', 'Leon', 'Devil-in-the-Fog', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(23, 'Glover', 'Sandra', 'My Spooky Sister', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(24, 'Griffiths', 'John', 'Behind the Goal', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(25, 'Jansson', 'Tove', 'The Exploits of Moominpappa', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(26, 'Fisk', 'Nicholas', 'Antigrav', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(27, 'Gallagher', 'Diana', 'Sabrina the Teenage Witch - Bridal Bedlam', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(28, 'Meadows', 'Daisy', 'Holly the Christmas Fairy', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(29, 'Proysen', 'Alf', 'Mrs Pepperpot to the Rescue', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(30, 'Proysen', 'Alf', 'Little Old Mrs Pepperpot', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(31, 'Meadows', 'Daisy', 'Ruby the Red Fairy', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(32, 'Rowling', 'J K', 'Harry Potter and the Philosopher''s Stone', 'harry-potter-p-stone.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(33, 'Price', 'Willard', 'Amazon Adventure', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(34, 'Peyton', 'K M', 'Flambards in Summer', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(35, 'Peirce', 'Lincoln', 'Big Nate the Boy with the Biggest Head in the World', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(36, 'Pearce', 'Phillippa', 'The Elm Street Lot', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(37, 'Paulsen', 'Gary', 'How Angel Peterson Got His Name', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(38, 'Morpurgo', 'Michael', 'The Wreck of the Zanzibar', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(39, 'Morpurgo', 'Michael', 'Why the Wales Came', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(40, 'Meadows', 'Daisy', 'Paige the Pantomime Fairy', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(41, 'Rushton', 'Rosie', 'What a Week to Break Free', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(42, 'Rushton', 'Rosie', 'What a Week to Play it Cool', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(43, 'Rushton', 'Rosie', 'What a Week to Make a Stand', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(44, 'Rushton', 'Rosie', 'What a Week to Fall in Love', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(45, 'Rushton', 'Rosie', 'What a Week to Make it Big', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(46, 'Simon', 'Francesca', 'Helping Hercules', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(47, 'Daniell', 'D Scott', 'Polly and Oliver Besieged', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(48, 'Somper', 'Justin', 'Vampirates', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(49, 'Knox', 'Ronald', 'Autobiography of a Saint', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(50, 'Zephaniah', 'Benjamin', 'Talking Turkeys', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(51, 'Shipton', 'Paul', 'Petey', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(52, 'Creech', 'Sharon', 'Heartbeat', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(53, 'Dalton ', 'Annie', 'Fighting Fit', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(54, 'Pullman', 'Philip', 'Clockwork or All Wound Up', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(55, 'Doder', 'Joshua', 'GRK and the Pelotti Gang', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(56, 'Dowswell', 'Paul', 'Everest Adventures', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(57, 'Dunmore', 'Helen', 'Zillah and Me', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(58, 'Jones', 'Jeremy', 'Toward the Goal - The Kaka Story', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(59, 'Johnson', 'Pete', 'Rescuing Dad', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(60, 'Ibbotson', 'Eva', 'The Great Ghost Rescue', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(61, 'Dahl', 'Roald', 'The Magic Finger', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(62, 'Limb', 'Sue', 'Yeah, Whatever ..', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(63, 'Blyton', 'Enid', 'The Sea of Adventure', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(64, 'Blyton', 'Enid', 'The Castle of Adventure', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(65, 'Wolverton', 'Dave', 'Revenge of the Scorpion King', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(66, 'Twain', 'Mark', 'The Adventures of Huckleberry Finn', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(67, 'Temperley', 'Alan', 'The Magician of Samarkand', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(68, 'Storr', 'Catherine', 'Thursday', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(69, 'Stevenson', 'R L', 'Treasure Island', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(70, 'Anaconda', 'Angela', 'Teacher Trouble', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(71, 'Lewis', 'C S', 'The Last Battle', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(72, 'Lewis', 'C S', 'Prince Caspian', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(73, 'Lewis', 'C S', 'Prince Caspian', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(74, 'Kinney', 'Jeff', 'Diary of a Wimpy Kid - The Ugly Truth', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(75, 'Kinney', 'Jeff', 'Diary of a Wimpy Kid', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(76, 'Kinney', 'Jeff', 'Diary of a Wimpy Kid - Rodrick Rules', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(77, 'Keller', 'Alex', 'Haywired', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(78, 'Juster', 'Norton', 'The Phantom Tollbooth', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(79, 'Juster', 'Norton', 'The Phantom Tollbooth', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(80, 'Avery', 'Gillian', 'The Elephant War', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(81, 'Blume', 'Judy', 'Just As Long As We''re Together', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(82, 'Blume', 'Judy', 'Deenie', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(83, 'Boston', 'Lucy M', 'The Children of Green Knowle', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(84, 'Cabot', 'Meg', 'The Princess Diaries - Give Me Five', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(85, 'Cassidy', 'Cathy', 'Sundae Girl', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(86, 'Cassidy', 'Cathy', 'Driftwood', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(87, 'Wrede', 'Patricia', 'Dealing with Dragons', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(88, 'Cole', 'Steve', 'The Seas of Doom', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(89, 'Cole', 'Steve', 'Contest Carnage', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(90, 'Cattell', 'Bob', 'Glory Gardens - The Big Test', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(91, 'Cattell', 'Bob', 'Glory Gardens - Bound for Glory', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(92, 'Cassidy', 'Cathy', 'Indigo Blue', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(93, 'Stanton', 'Andy', 'Mr Gum and the Biscuit Billionaire', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(94, 'Wilson', 'Jacqueline', 'Bad Girls', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(95, 'Vestly', 'Anne-Cath', 'Hallo Aurora', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(96, 'Wilson', 'Jacqueline', 'Biscuit Barrell - Cliffhanger and Buried Alive', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(97, 'Wilson', 'Jacqueline', 'The Lottie Project', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(98, 'Lang', 'Andrew', 'Tales of Troy and Greece', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(99, 'Le Guin', 'Ursula', 'A Wizard of Earthsea', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(100, 'Laird', 'Elizabeth', 'The Garbage King', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(101, 'Colfer', 'Eoin', 'Artemis Fowl', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(102, 'Cooper', 'Susan', 'Silver on the Tree', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(103, 'Goudge', 'Elizabeth', 'The Dean''s Witch', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(104, 'Cowell', 'Cressida', 'How to Cheat a Dragon''s Curse', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(105, 'Griffiths', 'Andy', 'Mascot Madness', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(106, 'Gleitzman/Jennings', '', 'Deadly', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(107, 'Lockhart', 'R B', 'Reilly Ace of Spies', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(108, 'Limb', 'Sue', 'Girls to Total Goddesses', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(109, 'Limb', 'Sue', 'Girl, 15, Charming but Insane', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(110, 'Jones', 'Terry', 'The Knight and The Squire', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(111, 'Jennings', 'Paul', 'The Nest', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(112, 'Hugard', 'Jean', 'Modern Magic Manual', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(113, 'Woolfe', 'Angela', 'Avril Crump and the Slumber Code', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(114, 'Umansky', 'Kaye', 'Clover Twig & The Incredible Flying Cottage', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(115, 'Toft', 'D I', 'Wolven', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(116, 'Jennings', 'Paul', 'Tongue Tied', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(117, 'Irwin', 'J D', 'Edwin Spencer - Mission Improbable', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(118, 'Hughes', 'Thomas', 'Tom Brown''s Schooldays', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(119, 'Dickens', 'Charles', 'Oliver Twist', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(120, 'Disney', '', 'High School Musical', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(121, 'Jansson', 'Tove', 'Moominsummer Madness', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(122, 'Thurbar', 'James', 'The 13 Clocks and the Wonderful O', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(123, 'Horowitz', 'Anthony', 'The Falcon''s Malteser', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(124, 'Ibbotson', 'Eva', 'Journey to the River Sea', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0),
(125, 'Millman', 'Dan', 'The Journeys of Socrates', 'no_book_cover.jpg', '2016-07-26 00:00:00', '2016-07-26 00:00:00', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
