-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: recordr
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `labelcolours`
--

DROP TABLE IF EXISTS `labelcolours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labelcolours` (
  `Key` varchar(10) CHARACTER SET utf8mb4 NOT NULL,
  `Colour` char(6) CHARACTER SET utf8mb4 NOT NULL,
  PRIMARY KEY (`Key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labelcolours`
--

LOCK TABLES `labelcolours` WRITE;
/*!40000 ALTER TABLE `labelcolours` DISABLE KEYS */;
INSERT INTO `labelcolours` VALUES ('0','f49999'),('1','c1003f'),('2','fbb114'),('3','d15900'),('4','84b200'),('5','004d38'),('6','25a5c8'),('7','631e93'),('8','d3b2ff'),('9','723a26'),('A','f49999'),('B','c1003f'),('C','fbb114'),('D','d15900'),('E','ffeb00'),('F','84b200'),('G','004d38'),('H','25a5c8'),('I','631e93'),('J','d3b2ff'),('K','723a26'),('L','e6cf92'),('M','f49999'),('N','c1003f'),('O','fbb114'),('P','d15900'),('Q','ffeb00'),('R','84b200'),('S','004d38'),('T','25a5c8'),('U','631e93'),('V','d3b2ff'),('W','723a26'),('X','e6cf92'),('Y','ffffff'),('Z','ffffff');
/*!40000 ALTER TABLE `labelcolours` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-05  7:49:22
