-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.1.72-community - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for store
CREATE DATABASE IF NOT EXISTS `store` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `store`;

-- Dumping structure for table store.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table store.categories: ~5 rows (approximately)
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` (`id`, `name`) VALUES
	(1, 'Elektronik'),
	(2, 'Fashion Pria'),
	(3, 'Fashion Wanita'),
	(4, 'Handphone & Tablet'),
	(5, 'Olahraga');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;

-- Dumping structure for table store.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `price` int(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table store.products: ~5 rows (approximately)
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` (`id`, `category_id`, `name`, `slug`, `price`) VALUES
	(1, 1, 'Logitech H111 Headset Stereo Single Jack 3.5mm', 'logitech-h111-headset-stereo-single-jack-3-5mm', 80000),
	(2, 1, 'Philips Rice Cooker - Inner Pot 2L Bakuhanseki - HD3110/33', 'philips-rice-cooker-inner-pot-2l-bakuhanseki-hd3110-33', 249000),
	(3, 4, 'Iphone 12 64Gb/128Gb/256Gb Garansi Resmi IBOX/TAM - Hitam, 64Gb', 'iphone-12-64gb-128gb-256gb-garansi-resmi-ibox-tam-hitam-64gb', 11340000),
	(4, 5, 'Papan alat bantu Push Up Rack Board Fitness Workout Gym', 'papan-alat-bantu-push-up-rack-board-fitness-workout-gym', 90000),
	(5, 2, 'Jim Joker - Sandal Slide Kulit Pria Bold 2S Hitam - Hitam', 'jim-joker-sandal-slide-kulit-pria-bold-2s-hitam-hitam', 305000);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;

-- Dumping structure for table store.product_assets
CREATE TABLE IF NOT EXISTS `product_assets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_assets_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Dumping data for table store.product_assets: ~8 rows (approximately)
/*!40000 ALTER TABLE `product_assets` DISABLE KEYS */;
INSERT INTO `product_assets` (`id`, `product_id`, `image`) VALUES
	(1, 1, 'logitech-h111.png'),
	(2, 1, 'logitech-h111-headset-stereo-single-jack-3-5mm.png'),
	(3, 2, 'philips-rice-cooker-inner-pot-2l-bakuhanseki-hd3110-33.png'),
	(4, 2, 'philips.png'),
	(5, 2, 'philips-rice-cooker.png'),
	(6, 3, 'iphone-12-64gb-128gb-256gb.png'),
	(7, 4, 'papan-alat-bantu-push-up.png'),
	(8, 5, 'jim-joker-sandal-slide-kulit-pria-bold-2s-hitam-hitam.png');
/*!40000 ALTER TABLE `product_assets` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
