-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: all_task
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendance_master`
--

DROP TABLE IF EXISTS `attendance_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stu_id` int DEFAULT NULL,
  `_date` date DEFAULT NULL,
  `ispresent` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `stu_id` (`stu_id`),
  CONSTRAINT `attendance_master_ibfk_1` FOREIGN KEY (`stu_id`) REFERENCES `student_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18204 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `city_name` varchar(255) NOT NULL,
  `state_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=604 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education` (
  `id` int NOT NULL AUTO_INCREMENT,
  `e_id` int DEFAULT NULL,
  `education_type` int DEFAULT NULL,
  `Cource_name` varchar(30) DEFAULT NULL,
  `Name_of_board_University` varchar(30) DEFAULT NULL,
  `Passing_year` year DEFAULT NULL,
  `percentage` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `e_id` (`e_id`),
  KEY `education_type` (`education_type`),
  CONSTRAINT `education_ibfk_1` FOREIGN KEY (`e_id`) REFERENCES `employee_details` (`Employee_id`),
  CONSTRAINT `education_ibfk_2` FOREIGN KEY (`education_type`) REFERENCES `option_master` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `education_master`
--

DROP TABLE IF EXISTS `education_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `emp_id` int DEFAULT NULL,
  `cource` varchar(30) DEFAULT NULL,
  `board` varchar(30) DEFAULT NULL,
  `passing_year` year DEFAULT NULL,
  `percentage` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `education_master_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee_details` (`Employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `employee_details`
--

DROP TABLE IF EXISTS `employee_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_details` (
  `Employee_id` int NOT NULL AUTO_INCREMENT,
  `First_name` varchar(30) DEFAULT NULL,
  `Last_name` varchar(30) DEFAULT NULL,
  `Designation` varchar(30) DEFAULT NULL,
  `Email` varchar(30) DEFAULT NULL,
  `Phone_number` bigint DEFAULT NULL,
  `Address_1` varchar(255) DEFAULT NULL,
  `Address_2` varchar(255) DEFAULT NULL,
  `City` varchar(30) DEFAULT NULL,
  `State` varchar(30) DEFAULT NULL,
  `Zip_code` varchar(30) DEFAULT NULL,
  `Gender` int DEFAULT NULL,
  `Date_of_Birth` date DEFAULT NULL,
  `Relationship` int DEFAULT NULL,
  PRIMARY KEY (`Employee_id`),
  KEY `Gender` (`Gender`),
  KEY `Relationship` (`Relationship`),
  CONSTRAINT `employee_details_ibfk_1` FOREIGN KEY (`Gender`) REFERENCES `option_master` (`id`),
  CONSTRAINT `employee_details_ibfk_2` FOREIGN KEY (`Relationship`) REFERENCES `option_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=188 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `exam_result`
--

DROP TABLE IF EXISTS `exam_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_result` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stu_id` int DEFAULT NULL,
  `sub_id` int DEFAULT NULL,
  `e_type` int DEFAULT NULL,
  `theory_total_marks` int DEFAULT NULL,
  `obtain_theory_marks` int DEFAULT NULL,
  `practical_total_marks` int DEFAULT NULL,
  `practical_obtain_marks` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `stu_id` (`stu_id`),
  KEY `sub_id` (`sub_id`),
  KEY `e_type` (`e_type`),
  CONSTRAINT `exam_result_ibfk_1` FOREIGN KEY (`stu_id`) REFERENCES `student_master` (`id`),
  CONSTRAINT `exam_result_ibfk_2` FOREIGN KEY (`sub_id`) REFERENCES `subject_master` (`sub_id`),
  CONSTRAINT `exam_result_ibfk_3` FOREIGN KEY (`e_type`) REFERENCES `exam_type` (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3601 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `exam_type`
--

DROP TABLE IF EXISTS `exam_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_type` (
  `e_id` int NOT NULL AUTO_INCREMENT,
  `exam_type` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `languages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `e_id` int DEFAULT NULL,
  `languages` int DEFAULT NULL,
  `r` tinyint(1) DEFAULT NULL,
  `w` tinyint(1) DEFAULT NULL,
  `s` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `e_id` (`e_id`),
  KEY `languages` (`languages`),
  CONSTRAINT `languages_ibfk_1` FOREIGN KEY (`e_id`) REFERENCES `employee_details` (`Employee_id`),
  CONSTRAINT `languages_ibfk_2` FOREIGN KEY (`languages`) REFERENCES `option_master` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `option_master`
--

DROP TABLE IF EXISTS `option_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `option_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `select_id` int DEFAULT NULL,
  `option_key` varchar(30) DEFAULT NULL,
  `option_value` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `select_id` (`select_id`),
  CONSTRAINT `option_master_ibfk_1` FOREIGN KEY (`select_id`) REFERENCES `select_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `preferances`
--

DROP TABLE IF EXISTS `preferances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preferances` (
  `id` int NOT NULL AUTO_INCREMENT,
  `e_id` int DEFAULT NULL,
  `prefered_location` varchar(30) DEFAULT NULL,
  `notice_period` varchar(30) DEFAULT NULL,
  `Expected_CTC` bigint DEFAULT NULL,
  `Current_CTC` bigint DEFAULT NULL,
  `Department` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `e_id` (`e_id`),
  CONSTRAINT `preferances_ibfk_1` FOREIGN KEY (`e_id`) REFERENCES `employee_details` (`Employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `referance_contact`
--

DROP TABLE IF EXISTS `referance_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `referance_contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `e_id` int DEFAULT NULL,
  `ref_name` varchar(30) DEFAULT NULL,
  `ref_number` bigint DEFAULT NULL,
  `ref_relation` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `e_id` (`e_id`),
  CONSTRAINT `referance_contact_ibfk_1` FOREIGN KEY (`e_id`) REFERENCES `employee_details` (`Employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `select_master`
--

DROP TABLE IF EXISTS `select_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `select_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `select_name` varchar(30) DEFAULT NULL,
  `select_key` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `select_key` (`select_key`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `state` (
  `id` int NOT NULL AUTO_INCREMENT,
  `state_name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `student_master`
--

DROP TABLE IF EXISTS `student_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `pincode` varchar(20) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49576 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `subject_master`
--

DROP TABLE IF EXISTS `subject_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject_master` (
  `sub_id` int NOT NULL AUTO_INCREMENT,
  `sub_name` varchar(30) NOT NULL,
  PRIMARY KEY (`sub_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `technology`
--

DROP TABLE IF EXISTS `technology`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `technology` (
  `id` int NOT NULL AUTO_INCREMENT,
  `e_id` int DEFAULT NULL,
  `tech_id` int DEFAULT NULL,
  `tech_level` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `e_id` (`e_id`),
  KEY `tech_id` (`tech_id`),
  KEY `tech_level` (`tech_level`),
  CONSTRAINT `technology_ibfk_1` FOREIGN KEY (`e_id`) REFERENCES `employee_details` (`Employee_id`),
  CONSTRAINT `technology_ibfk_2` FOREIGN KEY (`tech_id`) REFERENCES `option_master` (`id`),
  CONSTRAINT `technology_ibfk_3` FOREIGN KEY (`tech_level`) REFERENCES `option_master` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Firstname` varchar(30) NOT NULL,
  `Lastname` varchar(30) NOT NULL,
  `Contact` bigint NOT NULL,
  `Email_id` varchar(255) NOT NULL,
  `_password` varchar(255) DEFAULT NULL,
  `salt` varchar(4) DEFAULT NULL,
  `access_key` varchar(12) DEFAULT NULL,
  `created_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Contact` (`Contact`),
  UNIQUE KEY `Email_id` (`Email_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `work_experience`
--

DROP TABLE IF EXISTS `work_experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_experience` (
  `id` int NOT NULL AUTO_INCREMENT,
  `e_id` int DEFAULT NULL,
  `company_name` varchar(200) DEFAULT NULL,
  `designation` varchar(200) DEFAULT NULL,
  `from_date` date DEFAULT NULL,
  `to_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `e_id` (`e_id`),
  CONSTRAINT `work_experience_ibfk_1` FOREIGN KEY (`e_id`) REFERENCES `employee_details` (`Employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-01 17:10:55
