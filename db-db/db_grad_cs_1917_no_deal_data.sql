-- MySQL dump 10.13  Distrib 5.7.18, for Linux (x86_64)
--
-- Host: localhost    Database: db_grad_cs_1917
-- ------------------------------------------------------
-- Server version	5.7.18

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
-- Table structure for table `anonymous_users`
--

CREATE DATABASE db_grad_cs_1917_no_deal_data;

USE db_grad_cs_1917_no_deal_data;

DROP TABLE IF EXISTS `anonymous_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `anonymous_users` (
  `anonymous_user_id` char(40) NOT NULL,
  `anonymous_user_pwd` char(20) DEFAULT NULL,
  PRIMARY KEY (`anonymous_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anonymous_users`
--

LOCK TABLES `anonymous_users` WRITE;
/*!40000 ALTER TABLE `anonymous_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `anonymous_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `counterparty`
--

DROP TABLE IF EXISTS `counterparty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `counterparty` (
  `counterparty_id` int(11) NOT NULL,
  `counterparty_name` char(30) NOT NULL,
  `counterparty_status` char(1) DEFAULT NULL,
  `counterparty_date_registered` datetime DEFAULT NULL,
  PRIMARY KEY (`counterparty_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `deal`
--

DROP TABLE IF EXISTS `deal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deal` (
  `deal_id` int(11) NOT NULL auto_increment,
  `deal_time` varchar(30) NOT NULL,
  `deal_counterparty_id` int(11) DEFAULT NULL,
  `deal_instrument_id` int(11) DEFAULT NULL,
  `deal_type` char(1) DEFAULT NULL,
  `deal_amount` decimal(12,2) DEFAULT NULL,
  `deal_quantity` int(11) NOT NULL,
  PRIMARY KEY (`deal_id`),
  KEY `deal_counterparty_id` (`deal_counterparty_id`),
  KEY `deal_instrument_id` (`deal_instrument_id`),
  CONSTRAINT `deal_ibfk_1` FOREIGN KEY (`deal_counterparty_id`) REFERENCES `counterparty` (`counterparty_id`),
  CONSTRAINT `deal_ibfk_2` FOREIGN KEY (`deal_instrument_id`) REFERENCES `instrument` (`instrument_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `instrument`
--

DROP TABLE IF EXISTS `instrument`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `instrument` (
  `instrument_id` int(11) NOT NULL,
  `instrument_name` varchar(35) NOT NULL,
  PRIMARY KEY (`instrument_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `login_trail`
--

DROP TABLE IF EXISTS `login_trail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login_trail` (
  `login_id` int(11) NOT NULL,
  `logged_in_user_id` char(40) NOT NULL,
  `logged_in_auser_id` char(40) NOT NULL,
  `login_date_and_time` datetime NOT NULL,
  PRIMARY KEY (`login_id`),
  KEY `logged_in_user_id` (`logged_in_user_id`),
  KEY `logged_in_auser_id` (`logged_in_auser_id`),
  CONSTRAINT `login_trail_ibfk_1` FOREIGN KEY (`logged_in_user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `login_trail_ibfk_2` FOREIGN KEY (`logged_in_auser_id`) REFERENCES `anonymous_users` (`anonymous_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_trail`
--

LOCK TABLES `login_trail` WRITE;
/*!40000 ALTER TABLE `login_trail` DISABLE KEYS */;
/*!40000 ALTER TABLE `login_trail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` char(40) NOT NULL,
  `user_pwd` char(20) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('alison','gradprog2016@07'),('debs','gradprog2016@02'),('estelle','gradprog2016@05'),('john','gradprog2016@03'),('pauline','gradprog2016@04'),('samuel','gradprog2016@06'),('selvyn','gradprog2016');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-07-29 16:31:09

LOCK TABLES `counterparty` WRITE;
/*!40000 ALTER TABLE `counterparty` DISABLE KEYS */;
INSERT INTO `counterparty` VALUES (701,'Lewis','A','2017-07-28 17:06:30'),(702,'Selvyn','A','2017-07-28 17:06:30'),(703,'Richard','A','2017-07-28 17:06:30'),(704,'Lina','A','2017-07-28 17:06:30'),(705,'John','A','2017-07-28 17:06:30'),(706,'Nidia','A','2017-07-28 17:06:30');
/*!40000 ALTER TABLE `counterparty` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `instrument` WRITE;
/*!40000 ALTER TABLE `instrument` DISABLE KEYS */;
INSERT INTO `instrument` VALUES (1001,'Astronomica'),(1002,'Borealis'),(1003,'Celestial'),(1004,'Deuteronic'),(1005,'Eclipse'),(1006,'Floral'),(1007,'Galactia'),(1008,'Heliosphere'),(1009,'Interstella'),(1010,'Jupiter'),(1011,'Koronis'),(1012,'Lunatic');
/*!40000 ALTER TABLE `instrument` ENABLE KEYS */;
UNLOCK TABLES;
