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
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locations` (
  `Id` int(11) NOT NULL,
  `Name` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `Code` char(10) CHARACTER SET utf8mb4 NOT NULL,
  `Restricted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `AK_Locations_Name` (`Name`),
  KEY `IX_Locations_Name` (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (5,'Edmonton','edm',0),(8,'Burnaby','bur',0),(11,'AE Corporate Office - Edmonton','ceo',0),(16,'AE Corporate Office - Burnaby','grb',0),(19,'Saskatoon','sas',0),(20,'Calgary','cgy',0),(21,'Kelowna','kel',0),(22,'Lethbridge','let',0),(23,'Regina','reg',0),(44,'AE Corporate Office - Edmonton - Finance','fin',0),(45,'AE Corporate Office - Edmonton - Accounting','acc',0),(46,'AE Corporate Office - Burnaby - Accounting','acc-b',0),(47,'AE Corporate Office - Edmonton - Personnel','kkk',0),(49,'AE Corporate Office - Edmonton - Technology Services','cts',0),(50,'St. Catharines','stc',0),(51,'Toronto','tor',0),(66,'AE Corporate Office - Vice President of Water','vpw',0),(70,'AE Corporate Office - Engineering Production Manager','epm',0),(73,'Red Deer','rdr',0),(75,'Summit - Vernon','sev',0),(76,'Summit - Burnaby','seb',0),(77,'Summit - Calgary','ses',0),(79,'Victoria','vic',0),(81,'Kitchener','kit',0),(82,'Winnipeg','wpg',0),(84,'Prince Albert','pal',1),(97,'Fort McMurray','frt',1);
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
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
