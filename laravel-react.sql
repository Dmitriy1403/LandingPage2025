-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 30 2025 г., 15:04
-- Версия сервера: 8.3.0
-- Версия PHP: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `laravel-react`
--

-- --------------------------------------------------------

--
-- Структура таблицы `about_section`
--

DROP TABLE IF EXISTS `about_section`;
CREATE TABLE IF NOT EXISTS `about_section` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `features` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `image_left` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `about_section`
--

INSERT INTO `about_section` (`id`, `title`, `description`, `features`, `image_left`, `created_at`, `updated_at`) VALUES
(1, 'About Us', 'When I first got into the online advertising business, I was looking for the magical\r\n                            combination that would put my website into the top search engine rankings, catapult me to\r\n                            the forefront of the minds or individuals looking to buy my product, and generally make me\r\n                            rich beyond my wildest dreams! After succeeding in the business for this long, I’m able to\r\n                            look back on my old self with this kind of thinking and shake my head.                            the forefront of the minds or individuals looking to buy my product, and generally make me\r\n                            rich beyond my wildest dreams!', '[\"Write On Your Business\",\"Advertising Outdoors\",\"Effective Advertising Pointers\",\"Kook 2 Directory Add Url Free\"]', 'img/microsoft-edge-5bM6nLQ9Qv0-unsplash.jpg', NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `cache`
--

DROP TABLE IF EXISTS `cache`;
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_name_unique` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `category_post`
--

DROP TABLE IF EXISTS `category_post`;
CREATE TABLE IF NOT EXISTS `category_post` (
  `category_id` bigint UNSIGNED NOT NULL,
  `post_id` bigint UNSIGNED NOT NULL,
  PRIMARY KEY (`category_id`,`post_id`),
  KEY `category_post_post_id_foreign` (`post_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `post_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_approved` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `comments_post_id_user_id_unique` (`post_id`,`user_id`),
  KEY `comments_user_id_foreign` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `user_id`, `content`, `is_approved`, `created_at`, `updated_at`) VALUES
(5, 24, 54, '<p><strong>Super!!!!</strong></p>', 1, '2025-04-30 12:02:17', '2025-04-30 12:03:14');

-- --------------------------------------------------------

--
-- Структура таблицы `eventdate`
--

DROP TABLE IF EXISTS `eventdate`;
CREATE TABLE IF NOT EXISTS `eventdate` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `hero_section`
--

DROP TABLE IF EXISTS `hero_section`;
CREATE TABLE IF NOT EXISTS `hero_section` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `event_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `background_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `right_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `hero_section`
--

INSERT INTO `hero_section` (`id`, `event_date`, `title`, `background_image`, `right_image`, `created_at`, `updated_at`) VALUES
(1, '5 to 9 may 2019, mardavall hotell', 'Change Your Mind To Become Sucess', 'img/claudio-schwarz-_wDZkpybAfY-unsplash.jpg', 'img/hero_right2-removebg-preview.png', NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `jobs`
--

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_02_12_074624_create_events_table', 1),
(5, '2025_02_12_074828_create_about_table', 1),
(6, '2025_02_12_140729_create_register_table', 1),
(7, '2025_02_13_074626_create_event_days', 1),
(8, '2025_02_13_074949_create_event_schedule_table', 1),
(9, '2025_02_14_094515_add_image_to__schedule', 1),
(10, '2025_02_16_085841_create_speakers_table', 1),
(11, '2025_02_16_085955_create_schedule_speakers_table', 1),
(12, '2025_02_17_073430_create_tickets_table', 1),
(13, '2025_02_17_091756_add_ticket_id_to_registration_table', 1),
(14, '2025_04_03_073132_add_column_to_schedule', 1),
(15, '2025_04_12_071400_change_column_description', 1),
(16, '2025_04_15_100253_add_column_enum', 1),
(17, '2025_04_15_151328_create_posts_table', 1),
(18, '2025_04_15_152050_create_posts_images_table', 1),
(19, '2025_04_15_153103_create_categories_table', 1),
(20, '2025_04_15_153146_create_category_post_table', 1),
(21, '2025_04_15_153250_create_comments_table', 1),
(22, '2025_04_15_154628_create_post_images_table', 1),
(23, '2025_04_18_075433_add_background_image_to_posts', 1),
(24, '2025_04_20_063657_add_unique_id_to_comments', 1),
(25, '2025_04_26_115443_create_post_user_likes', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('vhamill@example.com', '$2y$04$WYEu4yMzCpGvcH7lEOt2IesdO/YRwe/6c99/m8H2cwt3BXAEhyXPa', '2025-04-29 12:54:14'),
('bkuhn@example.org', '$2y$04$Dlnhio8oS713.CFE.MjyHeMWX4cGJOwmACoPV7is4Tp3ipa.hQq7W', '2025-04-29 12:54:14');

-- --------------------------------------------------------

--
-- Структура таблицы `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `background_image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT '0',
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_user_id_foreign` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `title`, `description`, `background_image`, `is_published`, `published_at`, `created_at`, `updated_at`) VALUES
(23, 53, 'What Is a Press Conference? Definition and Why They\'re Held', '<p><strong>What Is a Press Conference?&nbsp;</strong></p><p>A press conference is an event organized to officially distribute information and answer questions from the media. Press conferences are also announced in response to specific public relations issues. Corporate press conferences are generally led by the company\'s executive management, press liaison, or communications officer.&nbsp;</p><p>&nbsp;</p><p>Given limited resources, particularly during a time of quarterly or annual earnings, it may be difficult to attract major media attention unless a company has a truly unique or newsworthy announcement to share. Press conferences are held by corporations and other businesses, politicians, and other government officials.</p>', 'img/posts/68122636759b7_1744453426_sincerely-media-dGxOgeXAXm8-unsplash.jpg', 1, '2025-04-30 13:30:00', '2025-04-30 10:31:34', '2025-04-30 10:33:53'),
(24, 53, 'Breaking Barriers: powering small business growth in the European Union', '<p><strong>The transformative power of digital commerce in the European Union</strong></p><p>&nbsp;</p><p>isn\'t just about numbers -- it\'s about businesses seizing real opportunities. During my recent trip to the EU, I was struck by the success stories of EU small- and medium-sized enterprises (SMEs) benefiting from the EU Single Market. Take Sweden’s Steamery, which grew from €180,000 in revenue to €1.3 million, a remarkable 622% increase, by expanding to seven countries. And Belgian company Garzini, which doubled its business yearly since 2020, with online sales growing from 30% to 70% of its revenue through international expansion. These success stories highlight what\'s possible when the EU Single Market works well.</p>', 'img/posts/68122863d7b3c_charles-forerunner-3fPXt37X6UQ-unsplash.jpg', 1, '2025-04-30 13:40:00', '2025-04-30 10:40:51', '2025-04-30 10:41:19'),
(25, 53, 'US Economy Contracts for First Time Since 2022 on Imports Surge', 'What is Lorem Ipsum?\r\n\r\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', 'img/posts/681229aa73ac5_1744453054_teemu-paananen-bzdhc5b3Bxs-unsplash.jpg', 1, '2025-04-30 13:45:00', '2025-04-30 10:46:18', '2025-04-30 10:46:18'),
(26, 53, 'What is money?', 'Early currency was usually commodity money – made of something valuable, such as gold. Later on, money consisted of banknotes that could be exchanged against gold or silver. Modern economies, like the euro area, use fiat money, which isn’t tied to a commodity at all.', 'img/posts/681229f56199f_chuttersnap-Q_KdjKxntH8-unsplash.jpg', 1, '2025-04-29 13:46:00', '2025-04-30 10:47:33', '2025-04-30 10:47:33');

-- --------------------------------------------------------

--
-- Структура таблицы `posts_images`
--

DROP TABLE IF EXISTS `posts_images`;
CREATE TABLE IF NOT EXISTS `posts_images` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `post_id` bigint UNSIGNED NOT NULL,
  `image_path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_images_post_id_foreign` (`post_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `post_images`
--

DROP TABLE IF EXISTS `post_images`;
CREATE TABLE IF NOT EXISTS `post_images` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `post_id` bigint UNSIGNED NOT NULL,
  `image_path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_images_post_id_foreign` (`post_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `post_images`
--

INSERT INTO `post_images` (`id`, `post_id`, `image_path`, `created_at`, `updated_at`) VALUES
(1, 23, 'img/posts/1746019894_sumup-GB8MT-L0IHc-unsplash.jpg', '2025-04-30 10:31:34', '2025-04-30 10:31:34'),
(2, 25, 'img/posts/1746020778_1745151090_latest-2.jpg', '2025-04-30 10:46:18', '2025-04-30 10:46:18'),
(3, 26, 'img/posts/1746020853_6752ba681ad17_business-background.png', '2025-04-30 10:47:33', '2025-04-30 10:47:33');

-- --------------------------------------------------------

--
-- Структура таблицы `post_user_likes`
--

DROP TABLE IF EXISTS `post_user_likes`;
CREATE TABLE IF NOT EXISTS `post_user_likes` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `post_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `post_user_likes_user_id_post_id_unique` (`user_id`,`post_id`),
  KEY `post_user_likes_post_id_foreign` (`post_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `registration`
--

DROP TABLE IF EXISTS `registration`;
CREATE TABLE IF NOT EXISTS `registration` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `ticket_id` bigint UNSIGNED DEFAULT NULL,
  `groupName` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `participantsNumber` int DEFAULT NULL,
  `contactPerson` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `comments` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `registration_email_index` (`email`),
  KEY `registration_ticket_id_foreign` (`ticket_id`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `registration`
--

INSERT INTO `registration` (`id`, `ticket_id`, `groupName`, `participantsNumber`, `contactPerson`, `email`, `phone`, `comments`, `created_at`, `updated_at`) VALUES
(1, 2, 'Pfannerstill PLC', 7, 'Carrie Spinka', 'ruecker.tito@example.net', '+1-629-809-9016', 'Veniam fugit soluta quos sed architecto eius.', '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(2, 3, 'Russel-Reichert', 9, 'Nova Schneider', 'mgulgowski@example.com', '+1.531.219.3671', 'At quisquam perferendis aut dolores nostrum.', '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(3, 2, 'Batz-Kunze', 10, 'Ms. Assunta Strosin', 'anabelle11@example.org', '(678) 847-7138', 'Dignissimos voluptas velit neque qui repudiandae voluptatem eum.', '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(4, 1, 'Kuhlman, Cronin and Orn', 6, 'Justus Lowe IV', 'johnathon.becker@example.org', '+1.689.507.2542', NULL, '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(5, 3, 'Emmerich and Sons', 4, 'Ms. Haven Jakubowski', 'rhiannon.hyatt@example.net', '+1-754-660-6213', 'Perspiciatis et vitae labore enim doloremque optio.', '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(6, 3, 'Moore-Schmitt', 9, 'Rhiannon Mohr', 'vrice@example.net', '+1-540-630-1664', 'Non et et in alias voluptas quo.', '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(7, 1, 'Graham and Sons', 1, 'Durward Stamm', 'luettgen.yasmeen@example.org', '702-395-6722', NULL, '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(8, 2, 'Sauer Group', 8, 'Mayra Pfeffer', 'nmcglynn@example.net', '+14439024827', NULL, '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(9, 3, 'Schuster, Pfannerstill and Roberts', 5, 'Derek Crist', 'rcormier@example.com', '+1 (708) 700-6370', NULL, '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(10, 3, 'Aufderhar, Olson and Koss', 9, 'Drake Terry', 'qkerluke@example.net', '(678) 587-4386', 'Aut facilis eius quia modi eos et ut.', '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(11, 1, 'Swift-Reilly', 10, 'Gia Purdy', 'wcole@example.org', '+1 (218) 338-6134', NULL, '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(12, 3, 'Bashirian-Beer', 1, 'Johnson Cummerata', 'geo.heidenreich@example.org', '704.382.6859', NULL, '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(13, 1, 'Marvin-Wisoky', 9, 'Beulah Marks', 'green.nella@example.com', '+19418795611', 'Rem aliquid velit dolore voluptas nemo aut corrupti.', '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(14, 2, 'D\'Amore and Sons', 10, 'Theodore Batz', 'watsica.mohammed@example.net', '1-225-559-0100', 'Aut consequatur cum velit et error sint dolor.', '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(15, 1, 'Gaylord, Doyle and Boehm', 3, 'Prof. Kelli Heathcote MD', 'hstamm@example.com', '781.745.3204', NULL, '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(16, 2, 'Waelchi LLC', 7, 'Miss Daisha Haley MD', 'thurman51@example.com', '773.542.4049', NULL, '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(17, 2, 'Ullrich Group', 10, 'Prof. Nicholaus Nikolaus IV', 'kschaden@example.com', '669.481.2131', NULL, '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(18, 1, 'Casper PLC', 7, 'Emory Borer', 'anabelle.breitenberg@example.org', '(843) 800-9884', NULL, '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(19, 2, 'Metz, DuBuque and Walker', 9, 'Miss Cynthia Reynolds MD', 'greenfelder.fannie@example.net', '606.688.2724', NULL, '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(20, 3, 'Kuhn-Pfannerstill', 7, 'Minerva Hagenes', 'dominique.purdy@example.net', '1-620-279-0736', 'Impedit vel itaque at nostrum earum.', '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(21, 3, 'Gottlieb, Schuppe and Bergnaum', 8, 'Rudolph Reichel I', 'keenan09@example.org', '+1.478.472.3298', NULL, '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(22, 1, 'Rogahn-Hodkiewicz', 10, 'Jon Morissette', 'tessie46@example.com', '(318) 597-4128', 'Nesciunt cum veritatis ut dolores maiores.', '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(23, 2, 'Hamill-Kutch', 4, 'Natalie Turcotte', 'louvenia.altenwerth@example.com', '1-530-223-3280', NULL, '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(24, 2, 'Kuhn, Mosciski and Fay', 8, 'Marietta Rolfson', 'gaston.herman@example.net', '463-728-2188', NULL, '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(25, 3, 'Greenholt, Sanford and Carroll', 3, 'Kelly Greenfelder', 'ikris@example.net', '+1.952.700.1655', NULL, '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(26, 2, 'Yundt, Murray and Batz', 8, 'Lupe Pouros', 'koss.rodrigo@example.com', '434.666.1033', NULL, '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(27, 2, 'Hills-Bosco', 1, 'Rhea Cassin', 'nblanda@example.com', '+1-239-204-8651', 'Asperiores ut sunt quisquam autem molestias voluptatem est.', '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(28, 2, 'Ledner and Sons', 9, 'Dr. Dewayne Keeling', 'murphy.alanis@example.org', '+1 (231) 655-1383', 'Omnis nostrum soluta molestiae labore.', '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(29, 3, 'Kulas-Barrows', 1, 'Victoria Crooks DDS', 'lambert44@example.com', '+1-573-896-3435', NULL, '2025-04-29 14:05:18', '2025-04-29 14:05:18'),
(30, 1, 'Bauch Group', 3, 'Mr. Jeromy Lebsack', 'dora.schmidt@example.org', '+19408011192', 'Dicta recusandae sed temporibus ut tempore ratione quis.', '2025-04-29 14:05:18', '2025-04-29 14:05:18');

-- --------------------------------------------------------

--
-- Структура таблицы `schedule`
--

DROP TABLE IF EXISTS `schedule`;
CREATE TABLE IF NOT EXISTS `schedule` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `event_day_id` bigint UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `location` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `description` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `schedule_event_day_id_foreign` (`event_day_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `schedule_speakers`
--

DROP TABLE IF EXISTS `schedule_speakers`;
CREATE TABLE IF NOT EXISTS `schedule_speakers` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `schedule_id` bigint UNSIGNED NOT NULL,
  `speaker_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `schedule_speakers_schedule_id_foreign` (`schedule_id`),
  KEY `schedule_speakers_speaker_id_foreign` (`speaker_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `speakers`
--

DROP TABLE IF EXISTS `speakers`;
CREATE TABLE IF NOT EXISTS `speakers` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `linkedin` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `speakers_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `speakers`
--

INSERT INTO `speakers` (`id`, `name`, `title`, `email`, `facebook`, `instagram`, `twitter`, `linkedin`, `image`, `created_at`, `updated_at`) VALUES
(1, 'John Smith', 'Speaker', 'vahe1@1.com', 'https://facebook.com/#', 'https://instagram.com/#', 'https://twitter.com/#', 'https://linkedin.com/#', '1746019446_ChatGPT Image 14 апр. 2025 г., 19_51_15.jpg', '2025-04-30 10:24:06', '2025-04-30 10:24:06'),
(2, 'Bob Marley', 'Speaker', 'vahe2@1.com', 'https://facebook.com/#', 'https://instagram.com/#', 'https://twitter.com/#', 'https://linkedin.com/#', '1746019502_1744647553_speakers9.png', '2025-04-30 10:25:02', '2025-04-30 10:25:02'),
(3, 'Leya Winzer', 'Speaker', 'leya@1.com', 'https://facebook.com/#', 'https://instagram.com/#', 'https://twitter.com/#', 'https://linkedin.com/#', '1746019591_1745930760_member-5.jpg', '2025-04-30 10:26:31', '2025-04-30 10:26:31'),
(4, 'Gary Oldman', 'Speaker', 'garry@1.com', 'https://facebook.com/#', 'https://instagram.com/#', 'https://twitter.com/#', 'https://linkedin.com/#', '1746019646_speaker-8.jpg', '2025-04-30 10:27:26', '2025-04-30 10:27:26'),
(5, 'Monica Rock', 'Speaker', 'mor@top.com', 'https://facebook.com/#', 'https://instagram.com/#', 'https://twitter.com/#', 'https://linkedin.com/#', '1746019685_1745930466_speaker-4.jpg', '2025-04-30 10:28:05', '2025-04-30 10:28:05'),
(6, 'Abby Marlow', 'Speaker', 'abb@1.com', 'https://facebook.com/#', 'https://instagram.com/#', 'https://twitter.com/#', 'https://linkedin.com/#', '1746019729_speaker-2.jpg', '2025-04-30 10:28:49', '2025-04-30 10:28:49');

-- --------------------------------------------------------

--
-- Структура таблицы `ticket_pricing`
--

DROP TABLE IF EXISTS `ticket_pricing`;
CREATE TABLE IF NOT EXISTS `ticket_pricing` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `features` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `ticket_pricing`
--

INSERT INTO `ticket_pricing` (`id`, `title`, `price`, `features`, `created_at`, `updated_at`) VALUES
(1, 'Basic', 25.00, '[\"Access to general sessions\",\"Standard seating\",\"Pay coffee break\",\"Basic lunch\"]', '2025-04-29 14:04:28', '2025-04-29 14:04:28'),
(2, 'Standard', 50.00, '[\"Access to general sessions\",\"Standard seating\",\"Free coffee break\",\"Standart lunch\"]', '2025-04-29 14:04:53', '2025-04-29 14:04:53'),
(3, 'VIP', 100.00, '[\"Access to general sessions\",\"Standard seating\",\"Free coffee break\",\"Vip Lunch\"]', '2025-04-29 14:04:57', '2025-04-29 14:04:57');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','user') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Mr. Sidney Davis Jr.', 'bfranecki@example.org', 'user', '2025-04-29 12:54:13', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'S16oHvyNiR', '2025-04-29 12:54:13', '2025-04-29 12:54:13'),
(2, 'Thurman Lehner', 'amosciski@example.com', 'user', '2025-04-29 12:54:13', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'QyEI4zYHPa', '2025-04-29 12:54:13', '2025-04-29 12:54:13'),
(3, 'Mr. Malcolm Botsford', 'witting.thora@example.net', 'user', '2025-04-29 12:54:13', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'h2ul5P4hITfLmuK8V2t6QhrxkctFAUByxcttVpueFHW4fQYSf3y8sO1O73f0', '2025-04-29 12:54:13', '2025-04-29 12:54:13'),
(4, 'Mireille Lindgren', 'lcremin@example.org', 'user', NULL, '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'FZnhxYd7z9', '2025-04-29 12:54:13', '2025-04-29 12:54:13'),
(5, 'Brannon Collins', 'josiane87@example.com', 'user', '2025-04-29 12:54:13', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'g7KzjQbKeb', '2025-04-29 12:54:13', '2025-04-29 12:54:13'),
(6, 'Ada Nikolaus', 'kailee88@example.com', 'user', NULL, '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'MytRhmOEKX', '2025-04-29 12:54:13', '2025-04-29 12:54:13'),
(7, 'Desmond Hickle', 'gaetano27@example.com', 'user', '2025-04-29 12:54:13', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'qyvgp5QP9g', '2025-04-29 12:54:13', '2025-04-29 12:54:13'),
(8, 'Alex Medhurst', 'bernardo.littel@example.com', 'user', '2025-04-29 12:54:13', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'nj4GDgTRz0', '2025-04-29 12:54:13', '2025-04-29 12:54:13'),
(9, 'Clare Halvorson DDS', 'ethan.ferry@example.org', 'user', '2025-04-29 12:54:13', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'EW2bqVUEuf', '2025-04-29 12:54:13', '2025-04-29 12:54:13'),
(10, 'Payton Borer', 'vhamill@example.com', 'user', '2025-04-29 12:54:14', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'rHsZuF32JH', '2025-04-29 12:54:14', '2025-04-29 12:54:14'),
(11, 'Zander Schaden MD', 'bkuhn@example.org', 'user', '2025-04-29 12:54:14', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'v6FUCSQUyY', '2025-04-29 12:54:14', '2025-04-29 12:54:14'),
(12, 'Nicholaus Kessler', 'ashleigh.kertzmann@example.org', 'user', '2025-04-29 12:54:14', '$2y$04$xTC84Gobi5SkmAd4/z90aOdLtZ10wIraORYBUfsqtEaxfT9evT6/K', 'mvvR4l5KbnR4UaRUbOZwCshSNLULoJUHxzE5FdfL0pArMXUZ3S7GUbPrBjCR', '2025-04-29 12:54:14', '2025-04-29 12:54:14'),
(13, 'Scot Bogisich', 'nedra79@example.com', 'user', '2025-04-29 12:54:14', '$2y$04$ENaJg/WzkhbSEKQYS249nOSAaa5G2.9SjHQ2URwJ9j.CHW9WsM3du', 'jN72ObEBls', '2025-04-29 12:54:14', '2025-04-29 12:54:14'),
(14, 'Winifred Vandervort', 'bmurphy@example.org', 'user', '2025-04-29 12:54:14', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'Z2dXoiRRyp', '2025-04-29 12:54:14', '2025-04-29 12:54:14'),
(15, 'Test User', 'test@example.com', 'user', NULL, '$2y$04$0CQv4JinI9gx5JTbjRDifOiBtc9sUiV5/jvmDfcr.AYDgIIZUWevi', NULL, '2025-04-29 12:54:14', '2025-04-29 12:54:14'),
(16, 'Prof. Henry Botsford', 'edgardo.lemke@example.net', 'user', '2025-04-29 12:54:14', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'a9svNziK3T', '2025-04-29 12:54:14', '2025-04-29 12:54:14'),
(17, 'Dulce Johns', 'moore.albina@example.org', 'user', '2025-04-29 12:54:14', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'ChFSZPm3tW', '2025-04-29 12:54:14', '2025-04-29 12:54:14'),
(18, 'Damian Robel Sr.', 'lewis98@example.net', 'user', '2025-04-29 12:54:14', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'm1vNWHpFkM', '2025-04-29 12:54:14', '2025-04-29 12:54:14'),
(19, 'Christine Simonis', 'marjorie.harvey@example.com', 'user', '2025-04-29 12:54:14', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'LeUgurwPwq', '2025-04-29 12:54:14', '2025-04-29 12:54:14'),
(20, 'Natalie Schamberger', 'cade51@example.com', 'user', '2025-04-29 12:54:14', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'SkWYxxkkbW', '2025-04-29 12:54:14', '2025-04-29 12:54:14'),
(21, 'Ms. Wanda Hand DDS', 'carroll.cedrick@example.org', 'user', '2025-04-29 12:54:16', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', '0xaUFP8lws', '2025-04-29 12:54:16', '2025-04-29 12:54:16'),
(22, 'Prof. Randal Treutel IV', 'voconnell@example.org', 'user', '2025-04-29 12:54:16', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'UyCPCQ1RzL', '2025-04-29 12:54:16', '2025-04-29 12:54:16'),
(23, 'Prof. Raymundo Nolan PhD', 'maria.parker@example.com', 'user', '2025-04-29 12:54:16', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'L616piPlB6', '2025-04-29 12:54:16', '2025-04-29 12:54:16'),
(24, 'Kenna Carter', 'sarai.rice@example.com', 'user', '2025-04-29 12:54:16', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'EsqbLYah1f', '2025-04-29 12:54:16', '2025-04-29 12:54:16'),
(25, 'Dr. Mary Bosco', 'brigitte.ward@example.org', 'user', '2025-04-29 12:54:16', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'u2wFWhdoTs', '2025-04-29 12:54:16', '2025-04-29 12:54:16'),
(26, 'Webster Maggio', 'bo.leffler@example.com', 'user', '2025-04-29 12:54:16', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'zH1PVKj6K6', '2025-04-29 12:54:16', '2025-04-29 12:54:16'),
(27, 'Salvador Smitham', 'djohns@example.com', 'user', '2025-04-29 12:54:16', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'o21PaUXPar', '2025-04-29 12:54:16', '2025-04-29 12:54:16'),
(28, 'Caleb Farrell', 'eliza.krajcik@example.net', 'user', '2025-04-29 12:54:16', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', '8btAE3OF1L', '2025-04-29 12:54:16', '2025-04-29 12:54:16'),
(29, 'Jessy Walker', 'nrath@example.org', 'user', '2025-04-29 12:54:16', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', '3S297pmPuy', '2025-04-29 12:54:16', '2025-04-29 12:54:16'),
(30, 'Newton Schaefer', 'white.leif@example.net', 'user', '2025-04-29 12:54:16', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'xkkcgrbNoJ', '2025-04-29 12:54:16', '2025-04-29 12:54:16'),
(31, 'Cristal O\'Connell', 'marisa66@example.net', 'user', '2025-04-29 12:54:16', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'QyPH7jEVNI', '2025-04-29 12:54:16', '2025-04-29 12:54:16'),
(32, 'Tommie Johns Jr.', 'mertz.demetris@example.net', 'user', '2025-04-29 12:54:16', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'XUCuPRumdT', '2025-04-29 12:54:16', '2025-04-29 12:54:16'),
(33, 'Mr. Dee Watsica', 'gfranecki@example.net', 'user', '2025-04-29 12:54:16', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'SOQYnYefeo', '2025-04-29 12:54:16', '2025-04-29 12:54:16'),
(34, 'Dr. Roberto Breitenberg', 'reina48@example.com', 'user', '2025-04-29 12:54:16', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'KAmdP5jcG7', '2025-04-29 12:54:16', '2025-04-29 12:54:16'),
(35, 'Amanda Harber', 'tabitha98@example.org', 'user', '2025-04-29 12:54:16', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'VOFta3OtGS', '2025-04-29 12:54:16', '2025-04-29 12:54:16'),
(36, 'Franco Casper', 'powlowski.junius@example.net', 'user', '2025-04-29 12:54:16', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'FgJFhpU0x1', '2025-04-29 12:54:16', '2025-04-29 12:54:16'),
(37, 'Prof. Laney Brown PhD', 'qrobel@example.net', 'user', '2025-04-29 12:54:16', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'TdUVtE4NQE', '2025-04-29 12:54:16', '2025-04-29 12:54:16'),
(38, 'Jerry Spinka', 'harley.bradtke@example.net', 'user', '2025-04-29 12:54:16', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'ObYhzVzpkZ', '2025-04-29 12:54:16', '2025-04-29 12:54:16'),
(39, 'Augustine Klocko', 'pink.hoppe@example.net', 'user', '2025-04-29 12:54:16', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', '6WIo94gBbF', '2025-04-29 12:54:16', '2025-04-29 12:54:16'),
(40, 'Johan Corkery I', 'treutel.oleta@example.net', 'user', '2025-04-29 12:54:16', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'hqqX4O8Zb6', '2025-04-29 12:54:16', '2025-04-29 12:54:16'),
(41, 'Stevie Veum', 'gottlieb.holly@example.org', 'user', '2025-04-29 12:54:16', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'gx6oCDFX7n', '2025-04-29 12:54:16', '2025-04-29 12:54:16'),
(42, 'Dr. Anita Braun', 'streich.martina@example.org', 'user', '2025-04-29 12:54:16', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'T83fh1sqJS', '2025-04-29 12:54:16', '2025-04-29 12:54:16'),
(43, 'Joan Altenwerth', 'deanna.hamill@example.com', 'user', '2025-04-29 12:54:16', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'HburaZYzHR', '2025-04-29 12:54:16', '2025-04-29 12:54:16'),
(44, 'Muriel King', 'wilkinson.marlen@example.com', 'user', '2025-04-29 12:54:17', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'iHQltNL9HP', '2025-04-29 12:54:17', '2025-04-29 12:54:17'),
(45, 'Stephanie Predovic', 'dock40@example.net', 'user', '2025-04-29 12:54:17', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'EYAwZH3Oky', '2025-04-29 12:54:17', '2025-04-29 12:54:17'),
(46, 'Miss Phyllis Hackett DVM', 'pberge@example.org', 'user', '2025-04-29 12:54:17', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'ng1zUOe5AB', '2025-04-29 12:54:17', '2025-04-29 12:54:17'),
(47, 'Dr. Isom Koch', 'funk.aryanna@example.org', 'user', '2025-04-29 12:54:17', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', '3YplP2U3YX', '2025-04-29 12:54:17', '2025-04-29 12:54:17'),
(48, 'Dr. Edward Morar PhD', 'ffranecki@example.org', 'user', '2025-04-29 12:54:17', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'wDe1VWn1qg', '2025-04-29 12:54:17', '2025-04-29 12:54:17'),
(49, 'Mckayla Kessler', 'iryan@example.net', 'user', '2025-04-29 12:54:17', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'ck4EMoQH3m', '2025-04-29 12:54:17', '2025-04-29 12:54:17'),
(50, 'Mrs. Sister Beahan DVM', 'sandrine.romaguera@example.net', 'user', '2025-04-29 12:54:17', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'xAd9RxvGyR', '2025-04-29 12:54:17', '2025-04-29 12:54:17'),
(51, 'Prof. Rita Green DVM', 'udoyle@example.com', 'user', '2025-04-29 12:54:17', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'lkGmlyLhiA', '2025-04-29 12:54:17', '2025-04-29 12:54:17'),
(52, 'Prof. Ryley Smitham', 'breitenberg.gino@example.com', 'user', '2025-04-29 12:54:17', '$2y$04$pUKKdO6zoPKXDK7sCPwWq.B0Vzr57DWgXYItse0AHVSSXBmrEn.Qe', 'kHXb9yWdUr', '2025-04-29 12:54:17', '2025-04-29 12:54:17'),
(53, 'Administrator', 'admin@example.com', 'admin', NULL, '$2y$12$bKXaDUF5BYEd2vaX.SjVnefUKCyKK75iF6NuTBFA/Z.vz6A7F9MeG', NULL, '2025-04-30 10:21:52', '2025-04-30 10:21:52'),
(54, 'test1', 'test1@gmail.com', 'user', NULL, '$2y$12$JOJWPKylY6tXZC4mkIZcZ.u5kmpNUldL3.DgYLB/hRsRhbCQoY9BO', NULL, '2025-04-30 11:39:37', '2025-04-30 11:39:37');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
