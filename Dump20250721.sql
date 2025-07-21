CREATE DATABASE  IF NOT EXISTS `pltt_news` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pltt_news`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: pltt_news
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `activity_logs`
--

DROP TABLE IF EXISTS `activity_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_type` varchar(50) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user` varchar(100) DEFAULT NULL,
  `target` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_logs`
--

LOCK TABLES `activity_logs` WRITE;
/*!40000 ALTER TABLE `activity_logs` DISABLE KEYS */;
INSERT INTO `activity_logs` VALUES (1,'article_add','Giải pháp năng lượng xanh','admin01',NULL,'2025-06-25 01:30:00'),(2,'article_edit','Ứng dụng năng lượng mặt trời','staff01',NULL,'2025-06-25 02:10:00'),(3,'article_delete','Tác hại của rác thải điện tử','admin01',NULL,'2025-06-25 02:55:00'),(4,'admin_add',NULL,'admin01','staff02','2025-06-25 03:15:00'),(5,'contact_add',NULL,'Nguyễn Văn A',NULL,'2025-06-25 03:25:00'),(6,'article_add','Bài viết đầu tiên','admin',NULL,'2025-06-25 09:40:08'),(7,'article_edit','Giải pháp năng lượng sạch','staff01',NULL,'2025-06-25 09:40:08'),(8,'contact_add',NULL,'Khách hàng A',NULL,'2025-06-25 09:40:08'),(9,'article_add','Tiêu đề bài viết test','admin',NULL,'2025-06-25 09:55:10'),(10,'article_add','Giới thiệu sản phẩm mới','admin','bài viết','2025-06-25 09:56:39'),(11,'article_edit','Thông báo tuyển dụng','staff01','bài viết','2025-06-25 09:56:39'),(12,'article_delete','Tin cũ không còn dùng','admin','bài viết','2025-06-25 09:56:39'),(13,'article_delete','2','4',NULL,'2025-06-26 01:35:08'),(14,'article_delete','1','3',NULL,'2025-06-26 01:35:10'),(15,'article_delete','test','tung',NULL,'2025-06-26 01:35:13'),(16,'article_delete','a','a',NULL,'2025-06-26 01:35:15'),(17,'article_edit','Đây chính là khoảng khắc đỉnh nóc kịch trần','Tùng chứ ai',NULL,'2025-06-26 01:57:52'),(18,'article_add','test','2',NULL,'2025-06-26 01:58:03'),(19,'article_add','Bài viết Test chức năng lấy log','Tùng',NULL,'2025-06-26 02:01:34'),(20,'article_add','1','3',NULL,'2025-06-26 02:14:23'),(21,'article_delete','1','3',NULL,'2025-06-26 02:14:27'),(22,'article_delete','Bài viết Test chức năng lấy log','Tùng',NULL,'2025-06-26 02:14:30'),(23,'article_delete','test','2',NULL,'2025-06-26 02:14:32'),(24,'article_add','tung','tung',NULL,'2025-06-26 02:14:58'),(25,'article_delete','tung','tung',NULL,'2025-06-26 02:19:49'),(26,'article_add','1','tung',NULL,'2025-06-26 02:20:27'),(27,'article_delete','1','tung',NULL,'2025-06-26 02:21:29'),(28,'article_add','1','3',NULL,'2025-06-26 02:21:37'),(29,'article_add','Test Log','Tùng',NULL,'2025-06-26 02:28:37'),(30,'article_add','tét','tung',NULL,'2025-06-26 02:38:05'),(31,'article_add','1','3',NULL,'2025-06-26 04:08:26'),(32,'article_add','Test vaif','TUNG DEP TRAI',NULL,'2025-06-26 07:45:38'),(33,'article_add','Tối ưu hóa chuyển đổi và thu hút khách hàng tiềm năng với landing page ấn tượng','TÙNG',NULL,'2025-06-26 09:46:48'),(34,'article_add','1','3',NULL,'2025-06-26 10:05:13'),(35,'article_add','Dịch Vụ Thiết Kế Landing Page Cho Spa Thẩm Mỹ Viện','Tùng ',NULL,'2025-06-28 09:58:18'),(36,'article_add','Dịch Vụ Thiết Kế Landing Page Trọn Gói Chỉ Với 1 Triệu Đồng','Tiên Xì Tin',NULL,'2025-06-28 10:33:42'),(37,'article_add','Dịch vụ thiết kế Landing Page Bất Động Sản','Hùng bị Khùng',NULL,'2025-06-28 11:27:27'),(38,'article_edit','Dịch vụ thiết kế Landing Page Bất Động Sản','Hùng bị Khùng',NULL,'2025-06-28 11:27:40'),(39,'article_edit','Dịch vụ thiết kế Landing Page Bất Động Sản','Hùng bị Khùng',NULL,'2025-06-28 11:27:49'),(40,'article_add','Tiêu đề','TÙng',NULL,'2025-06-28 13:37:04'),(41,'article_add','Tiêu đề','Tùng ',NULL,'2025-06-28 13:43:46'),(42,'article_add','1','3',NULL,'2025-06-28 13:44:06'),(43,'article_add','1','3',NULL,'2025-06-28 13:46:28'),(44,'article_add','1','3',NULL,'2025-06-28 13:48:56'),(45,'article_add','Tối ưu hóa chuyển đổi và thu hút khách hàng tiềm năng với landing page ấn tượng','Tùng',NULL,'2025-06-28 13:54:44'),(46,'article_edit','Dịch vụ thiết kế Landing Page Bất Động Sản','Hùng bị Khùng',NULL,'2025-06-28 13:55:22'),(47,'article_add','1','3',NULL,'2025-06-28 13:55:33'),(48,'article_edit','Dịch vụ thiết kế Landing Page Bất Động Sản','Hùng bị Khùng',NULL,'2025-06-28 13:56:16'),(49,'article_add','Đây là bài viết mẫu để Test các chức năng Web','Tùng',NULL,'2025-06-28 14:04:20'),(50,'article_add','','',NULL,'2025-06-28 14:04:44'),(51,'article_add','1','3',NULL,'2025-06-28 14:13:20'),(52,'article_add','Các bước để thiết kế một landing page đẹp và hiệu quả','Tùng',NULL,'2025-06-28 14:16:34'),(53,'article_edit','Tối ưu hóa chuyển đổi và thu hút khách hàng tiềm năng với landing page ấn tượng','Tùng',NULL,'2025-06-28 14:17:24'),(54,'article_add','','',NULL,'2025-06-28 19:51:49'),(55,'article_edit','Tối ưu hóa chuyển đổi và thu hút khách hàng tiềm năng với landing page ấn tượng','Tùng Lăn tăn',NULL,'2025-06-29 10:21:28'),(56,'article_edit','Dịch Vụ Thiết Kế Landing Page Cho Spa Thẩm Mỹ Viện','Tuấn Bí Ngòi',NULL,'2025-06-29 10:21:44'),(57,'article_add','1','3',NULL,'2025-07-17 08:15:34'),(58,'article_add','','',NULL,'2025-07-20 14:38:18'),(59,'article_edit','1','',NULL,'2025-07-20 14:38:29');
/*!40000 ALTER TABLE `activity_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','staff') DEFAULT 'staff',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'admin','123456','admin','2025-06-25 09:02:36'),(2,'staff01','123456','staff','2025-06-25 09:02:36');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` longtext,
  `description` text,
  `image_url` text,
  `author` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `additional_images` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (7,'Dịch Vụ Thiết Kế Landing Page Cho Spa Thẩm Mỹ Viện','Spa thẩm mỹ viện là một trong những công ty khám phá địa hình tốt nhất, với mục tiêu là cung cấp dịch vụ cao cấp đến khách hàng. Các dịch vụ thiết kế landing page cho spa thẩm mỹ viện là một phần quan trọng của việc cung cấp những dịch vụ tốt nhất đến khách hàng. Những dịch vụ thiết kế landing page có thể giúp spa thẩm mỹ viện nâng cao hiệu quả marketing của họ, từ việc tăng tỷ lệ chuyển đổi đến việc đưa những thông báo data đăng ký mới liên tục về di động.\n\nViệc cung cấp những dịch vụ thiết kế landing page phù hợp với spa thẩm mỹ viện đòi hỏi các nhà thiết kế phải có kỹ năng và kinh nghiệm chuyên nghiệp trong việc tối ưu hóa các chiến dịch quảng cáo và các nội dung hiệu quả trên các nền tảng như Ladi page.\nĐể cung cấp những dịch vụ thiết kế landing page tốt nhất, spa thẩm mỹ viện cần phải tìm kiếm các nhà thiết kế có kinh nghiệm và giá rẻ nhất, để có thể đáp ứng nhu cầu của khách hàng. Những dịch vụ này cũng có thể được cung cấp qua các dịch vụ web để giúp spa thẩm mỹ viện hiểu rõ hơn về nhu cầu của khách hàng và cũng giúp spa thẩm mỹ viện tối ưu hóa các chiến dịch marketing của họ\n\nĐể có 1 landing page cho spa thật đẹp và chuyên nghiệp nhằm mang lại tỷ lệ chuyển đổi cao khi chạy quảng cáo thì cần có rất nhiều yếu tố và cần đạt các tiêu chuẩn nhất định, Và những điều này thì cần phải người có kinh nghiệm chuyên môn và kiến thức thực chiến thì sẽ làm tốt nhất\n\nNếu bạn đang cần tìm 1 đơn vị để thiết kế landing page giới thiệu spa thẩm mỹ viện cho bạn vậy thì hãy nhanh tay liên hệ ngay với CCO MEDIA nhé, với đội ngũ nhân sự kỹ thuật đông và trình độ chuyên môn cao sẽ giúp thiết kế cho bạn 1 trang landing page ưng ý nhất','Spa thẩm mỹ viện là một trong những công ty khám phá địa hình tốt nhất, với mục tiêu là cung cấp dịch vụ cao cấp đến khách hàng.','https://dichvulandingpage.com/wp-content/uploads/2023/02/Dich-Vu-Thiet-Ke-Landing-Page-Cho-Spa-Tham-My-Vien.png','Tuấn Bí Ngòi','2025-06-28 16:58:18','[]'),(8,'Dịch Vụ Thiết Kế Landing Page Trọn Gói Chỉ Với 1 Triệu Đồng','Hãy để chúng tôi mang đến sự trọn vẹn cho doanh nghiệp của bạn với dịch vụ thiết kế landing page trọn gói chỉ với 1 triệu đồng. Đây là giải pháp tối ưu nhất để bạn có được một trang web chuyên nghiệp, duy trì tốc độ cao và hiệu suất xử lý tốt.\n\nChúng tôi cung cấp dịch vụ thiết kế trang web trọn gói chỉ với 1 triệu đồng bao gồm:\n\n– Thiết kế trang web tương tác với các thành phần cố định như logo, menu, các nút chức năng trang web và các trang con.\n– Hỗ trợ tích hợp các công cụ đào tạo, bán hàng và quản lý khách hàng.\n– Chức năng SEO để giúp trang web của bạn tốt hơn xuất hiện trên các công cụ tìm kiếm\n– Hỗ trợ tích hợp công cụ quản lý nội dung và hệ thống lưu trữ.\n\nQua đó, bạn sẽ được hỗ trợ hoàn toàn trong việc thiết kế trang web của mình từ đội ngũ chuyên gia của chúng tôi. Trang web của bạn sẽ được thiết kế để phù hợp với yêu cầu của bạn và với mức giá hợp lý.\n\nHãy liên hệ với chúng tôi ngay hôm nay để biết thêm thông tin về dịch vụ thiết kế trang web trọn gói chỉ với 1 triệu đồng của chúng tôi!','Đây là giải pháp tối ưu nhất để bạn có được một trang web chuyên nghiệp, duy trì tốc độ cao và hiệu suất xử lý tốt.','https://dichvulandingpage.com/wp-content/uploads/2023/02/Dich-Vu-Thiet-Ke-Landing-Page-Tron-Goi-Chi-Voi-1-Trieu-Dong.png','Tiên Xì Tin','2025-06-28 17:33:42','[]'),(9,'Dịch vụ thiết kế Landing Page Bất Động Sản','<div><div>Nếu bạn đang cần một dịch vụ thiết kế Landing Page Bất Động Sản tại HCM, chúng tôi là sự lựa chọn số 1. Chúng tôi cung cấp một dịch vụ chuyên nghiệp và chất lượng cao, cùng với giá cả cạnh tranh.\n\nChúng tôi cung cấp các dịch vụ thiết kế với nền tảng Ladi Page. Điều này giúp quá trình tạo ra một trang web đẹp, bền và dễ dàng truy cập hơn bao giờ hết. Trang web của bạn sẽ đảm bảo hoạt động tốt trên cả các thiết bị di động và máy tính để bàn.\n\nBên cạnh đó, chúng tôi cũng cung cấp các dịch vụ thiết kế tuyệt vời cho các doanh nghiệp để tạo nên sự khác biệt. Chúng tôi có đội ngũ các chuyên gia để tạo ra các trang web đẹp mắt, hiệu quả và dễ dàng truy cập.\n\nVới những ưu điểm trên, chúng tôi luôn sẵn sàng đáp ứng nhu cầu của khách hàng. Chúng tôi đảm bảo rằng trang web của bạn sẽ được thiết kế bởi các chuyên gia với độ dài 500 từ trở lên.</div></div>\n            <div style=\"text-align:center; margin: 10px 0;\">\n              <img src=\"https://dichvulandingpage.com/wp-content/uploads/2024/03/Dich-vu-thiet-ke-Landing-Page-chuyen-nghiep-Tang-ty-le-chuyen-doi.jpg\" alt=\"\" style=\"max-width:100%; height:auto;\" />\n              <p style=\"font-style: italic; font-size: 14px; color: #666;\">123</p>\n            </div><br><br><div>Nếu bạn đang cần một dịch vụ thiết kế Landing Page Bất Động Sản tại HCM, chúng tôi là sự lựa chọn số 1. Chúng tôi cung cấp một dịch vụ chuyên nghiệp và chất lượng cao, cùng với giá cả cạnh tranh. Chúng tôi cung cấp các dịch vụ thiết kế với nền tảng Ladi Page. Điều này giúp quá trình tạo ra một trang web đẹp, bền và dễ dàng truy cập hơn bao giờ hết. Trang web của bạn sẽ đảm bảo hoạt động tốt trên cả các thiết bị di động và máy tính để bàn. Bên cạnh đó, chúng tôi cũng cung cấp các dịch vụ thiết kế tuyệt vời cho các doanh nghiệp để tạo nên sự khác biệt. Chúng tôi có đội ngũ các chuyên gia để tạo ra các trang web đẹp mắt, hiệu quả và dễ dàng truy cập. Với những ưu điểm trên, chúng tôi luôn sẵn sàng đáp ứng nhu cầu của khách hàng. Chúng tôi đảm bảo rằng trang web của bạn sẽ được thiết kế bởi các chuyên gia với độ dài 500 từ trở lên.</div>\n            <div style=\"text-align:center; margin: 10px 0;\">\n              <img src=\"https://dichvulandingpage.com/wp-content/uploads/2024/03/Dich-vu-thiet-ke-Landing-Page-chuyen-nghiep-Tang-ty-le-chuyen-doi.jpg\" alt=\"\" style=\"max-width:100%; height:auto;\" />\n              <p style=\"font-style: italic; font-size: 14px; color: #666;\">123</p>\n            </div><br><br><div>31 321</div>','Chúng tôi cung cấp một dịch vụ chuyên nghiệp và chất lượng cao, cùng với giá cả cạnh tranh.','https://dichvulandingpage.com/wp-content/uploads/2023/02/Dich-vu-thiet-ke-Landing-Page-Bat-Dong-San.png','Hùng bị Khùng','2025-06-28 18:27:27','[]'),(15,'Tối ưu hóa chuyển đổi và thu hút khách hàng tiềm năng với landing page ấn tượng','<div></div>\n            <div style=\"text-align:center; margin: 10px 0;\">\n              \n              <p style=\"font-style: italic; font-size: 14px; color: #666;\">Dịch vụ thiết kế Landing Page chuyên nghiệp Tăng tỷ lệ chuyển đổi</p></div><div><p style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 18px; margin-bottom: 1em; outline: 0px; padding: 0px; vertical-align: baseline; font-family: Rubik, sans-serif;\">CCO MEDIA cung cấp dịch vụ thiết kế landing page trọn gói, bao gồm:</p><p style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 18px; margin-bottom: 1em; outline: 0px; padding: 0px; vertical-align: baseline; font-family: Rubik, sans-serif;\"><span style=\"box-sizing: inherit; font-weight: 700;\">Tư vấn chiến lược:</span>&nbsp;Đội ngũ chuyên gia của chúng tôi sẽ phân tích nhu cầu và mục tiêu của doanh nghiệp bạn để đưa ra chiến lược thiết kế landing page phù hợp nhất.<br style=\"box-sizing: inherit;\"><span style=\"box-sizing: inherit; font-weight: 700;\">Thiết kế giao diện:</span>&nbsp;Landing page được thiết kế với giao diện đẹp mắt, thu hút và phù hợp với nhận diện thương hiệu của doanh nghiệp bạn.<br style=\"box-sizing: inherit;\"><span style=\"box-sizing: inherit; font-weight: 700;\">Nội dung tối ưu:</span>&nbsp;Nội dung landing page được tối ưu hóa cho công cụ tìm kiếm (SEO) và tập trung vào việc thu hút khách hàng tiềm năng và thúc đẩy hành động.<br style=\"box-sizing: inherit;\"><span style=\"box-sizing: inherit; font-weight: 700;\">Kỹ thuật lập trình:</span>&nbsp;Landing page được lập trình theo tiêu chuẩn web hiện đại, đảm bảo tốc độ tải trang nhanh chóng và khả năng tương thích với mọi thiết bị.<br style=\"box-sizing: inherit;\"><span style=\"box-sizing: inherit; font-weight: 700;\">Phân tích và tối ưu hóa:</span>&nbsp;Chúng tôi theo dõi hiệu quả của landing page và cung cấp báo cáo chi tiết để bạn có thể điều chỉnh chiến lược và tối ưu hóa tỷ lệ chuyển đổi.</p><h4 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.33333rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.2em; font-family: Poppins, sans-serif;\">Quy trình thiết kế landing page chuyên nghiệp</h4><p style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 18px; margin-bottom: 1em; outline: 0px; padding: 0px; vertical-align: baseline; font-family: Rubik, sans-serif;\">Quy trình&nbsp;<a href=\"https://dichvulandingpage.com/\" style=\"box-sizing: inherit; background-color: transparent; text-decoration: none; color: rgb(3, 0, 0); transition: 0.2s linear;\">thiết kế landing page</a>&nbsp;tại&nbsp;<span style=\"box-sizing: inherit; font-weight: 700;\">CCO MEDIA</span>&nbsp;được thực hiện theo các bước sau:<br style=\"box-sizing: inherit;\"><span style=\"box-sizing: inherit; font-weight: 700;\">Thu thập thông tin:</span>&nbsp;Chúng tôi thu thập thông tin về doanh nghiệp, sản phẩm/dịch vụ, mục tiêu marketing và đối tượng khách hàng mục tiêu của bạn.<br style=\"box-sizing: inherit;\"><span style=\"box-sizing: inherit; font-weight: 700;\">Phân tích:</span>&nbsp;Phân tích nhu cầu và mục tiêu của doanh nghiệp để đưa ra chiến lược thiết kế landing page phù hợp.<br style=\"box-sizing: inherit;\"><span style=\"box-sizing: inherit; font-weight: 700;\">Lên ý tưởng:</span>&nbsp;Đội ngũ sáng tạo của chúng tôi sẽ lên ý tưởng thiết kế landing page dựa trên thông tin thu thập được và chiến lược đã đề ra.<br style=\"box-sizing: inherit;\"><span style=\"box-sizing: inherit; font-weight: 700;\">Thiết kế:</span>&nbsp;Thiết kế landing page theo ý tưởng đã được duyệt, đảm bảo tính thẩm mỹ, thu hút và phù hợp với mục tiêu đề ra.<br style=\"box-sizing: inherit;\"><span style=\"box-sizing: inherit; font-weight: 700;\">Lập trình:</span>&nbsp;Lập trình landing page theo tiêu chuẩn web hiện đại, đảm bảo tốc độ tải trang nhanh chóng và khả năng tương thích với mọi thiết bị.<br style=\"box-sizing: inherit;\"><span style=\"box-sizing: inherit; font-weight: 700;\">Kiểm tra và tối ưu hóa:</span>&nbsp;Kiểm tra landing page kỹ lưỡng để đảm bảo không có lỗi và tối ưu hóa hiệu quả chuyển đổi.<br style=\"box-sizing: inherit;\">Bàn giao và hướng dẫn: Bàn giao landing page cho khách hàng và hướng dẫn cách sử dụng, quản lý và theo dõi hiệu quả.</p><p style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 18px; margin-bottom: 1em; outline: 0px; padding: 0px; vertical-align: baseline; font-family: Rubik, sans-serif;\"><span style=\"box-sizing: inherit; font-weight: 700;\">CCO MEDIA</span>&nbsp;cam kết cung cấp dịch vụ thiết kế landing page chuyên nghiệp, uy tín và chất lượng cao, giúp bạn đạt được mục tiêu marketing và gia tăng doanh số.<br style=\"box-sizing: inherit;\">Liên hệ ngay với chúng tôi để được tư vấn miễn phí về dịch vụ thiết kế landing page chuyên nghiệp tại TP.HCM</p></div>\n            <div style=\"text-align:center; margin: 10px 0;\">\n              \n              <p style=\"font-style: italic; font-size: 14px; color: #666;\">Đội ngũ chuyên ngiệp</p>\n            </div>\n            <div style=\"text-align:center;\">\n              <img src=\"https://dichvulandingpage.com/wp-content/uploads/2024/05/Dich-vu-thiet-ke-landing-page-chuyen-nghiep-tai-TP-HCM.jpg\" alt=\"\" style=\"max-width:100%; height:auto;\" />\n              <p style=\"font-style: italic; font-size: 14px; color: #666;\">Tăng tỷ lệ chuyển đổi: Landing page tập trung vào một mục tiêu cụ thể, giúp bạn thu hút khách hàng tiềm năng và khuyến khích họ thực hiện hành động mong muốn, chẳng hạn như đăng ký nhận bản tin, mua sản phẩm hoặc tải xuống tài liệu.Thu thập thông tin khách hàng: Landing page cung cấp nền tảng để thu thập thông tin liên hệ của khách hàng tiềm năng, giúp bạn xây dựng danh sách khách hàng tiềm năng và nuôi dưỡng mối quan hệ với họ.Quảng bá thương hiệu: Landing page là cơ hội tuyệt vời để giới thiệu thương hiệu, sản phẩm và dịch vụ của bạn đến khách hàng tiềm năng một cách ấn tượng và thu hút.Tối ưu hóa chiến dịch marketing: Landing page giúp bạn theo dõi hiệu quả của các chiến dịch marketing và điều chỉnh chiến lược phù hợp để đạt được mục tiêu đề ra.</p>\n            </div><div style=\"text-align:center;\">\n              \n              \n            </div>\n            <div style=\"text-align:center;\">\n              <img src=\"https://dichvulandingpage.com/wp-content/uploads/2024/03/Dich-vu-thiet-ke-Landing-Page-chuyen-nghiep-Tang-ty-le-chuyen-doi.jpg\" alt=\"\" style=\"max-width:100%; height:auto;\" />\n              <p style=\"font-style: italic; font-size: 14px; color: #666;\">Landing page đóng vai trò quan trọng trong chiến lược marketing online, mang lại nhiều lợi ích thiết thực cho doanh nghiệp:</p>\n            </div>','Trong thời đại công nghệ số bùng nổ, việc sở hữu một landing page chuyên nghiệp là điều cần thiết cho bất kỳ doanh nghiệp nào muốn khẳng định thương hiệu và gia tăng doanh số. Hiểu được nhu cầu đó, CCO MEDIA cung cấp dịch vụ thiết kế landing page trọn gói tại TP.HCM, giúp bạn tạo dựng trang đích hiệu quả, thu hút khách hàng tiềm năng và tối ưu hóa tỷ lệ chuyển đổi.','https://dichvulandingpage.com/wp-content/uploads/2024/05/Dich-vu-thiet-ke-landing-page-chuyen-nghiep-tai-TP-HCM.jpg','Tùng Lăn tăn','2025-06-28 20:54:44','[]'),(20,'Các bước để thiết kế một landing page đẹp và hiệu quả','<h3 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.77778rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.3em; font-family: Poppins, sans-serif;\">Bước 1: Xác định mục đích của landing page</h3><h3 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.77778rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.3em; font-family: Poppins, sans-serif;\"><p style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 18px; font-weight: 400; margin-bottom: 1em; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 0); font-family: Rubik, sans-serif;\">Việc xác định mục đích của landing page là bước đầu tiên và quan trọng nhất trong việc thiết kế. Nó giúp cho bạn biết rõ mục tiêu của landing page, từ đó xác định được yếu tố nào cần tập trung để thu hút khách hàng, tăng doanh số.</p></h3><h3 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.77778rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.3em; font-family: Poppins, sans-serif;\">Bước 2: Tập trung vào phong cách thiết kế</h3><h3 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.77778rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.3em; font-family: Poppins, sans-serif;\"><p style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 18px; font-weight: 400; margin-bottom: 1em; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 0); font-family: Rubik, sans-serif;\">Phong cách thiết kế là một yếu tố quan trọng giúp landing page của bạn trở nên đẹp và thu hút khách hàng. Trong phong cách thiết kế, bạn cần chú ý đến các yếu tố như màu sắc, hình ảnh, video và giao diện thân thiện với người dùng.</p></h3><h4 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.33333rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.2em; font-family: Poppins, sans-serif;\">2.1 Chọn màu sắc phù hợp</h4><h3 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.77778rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.3em; font-family: Poppins, sans-serif;\"><p style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 18px; font-weight: 400; margin-bottom: 1em; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 0); font-family: Rubik, sans-serif;\">Màu sắc là một yếu tố quan trọng trong thiết kế landing page. Chọn màu sắc phù hợp giúp landing page trở nên hấp dẫn và dễ nhìn. Bạn nên chọn màu sắc phù hợp với sản phẩm hoặc dịch vụ của mình.</p></h3><h4 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.33333rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.2em; font-family: Poppins, sans-serif;\">2.2 Lựa chọn hình ảnh và video phù hợp</h4><h3 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.77778rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.3em; font-family: Poppins, sans-serif;\"><p style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 18px; font-weight: 400; margin-bottom: 1em; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 0); font-family: Rubik, sans-serif;\">Hình ảnh và video là yếu tố quan trọng giúp landing page trở nên hấp dẫn và thu hút khách hàng. Bạn nên chọn hình ảnh và video phù hợp với sản phẩm hoặc dịch vụ của mình. Đồng thời, cần đảm bảo chất lượng của hình ảnh và video để giữ được sự chuyên nghiệp và tạo sự tin tưởng với khách hàng.</p></h3><h4 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.33333rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.2em; font-family: Poppins, sans-serif;\">2.3 Đảm bảo giao diện thân thiện với người dùng</h4><h3 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.77778rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.3em; font-family: Poppins, sans-serif;\"><p style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 18px; font-weight: 400; margin-bottom: 1em; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 0); font-family: Rubik, sans-serif;\">Giao diện thân thiện với người dùng là yếu tố quan trọng giúp khách hàng dễ dàng tìm kiếm và đặt hàng sản phẩm hoặc dịch vụ của bạn. Để đảm bảo giao diện thân thiện với người dùng, bạn nên chú ý đến các yếu tố như độ phân giải, tốc độ tải trang, bố cục và kiểu chữ. Ngoài ra, bạn cũng cần đảm bảo rằng giao diện của trang web phải tương thích với các thiết bị khác nhau như máy tính, điện thoại di động hay máy tính bảng.</p></h3><h3 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.77778rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.3em; font-family: Poppins, sans-serif;\">Bước 3: Sử dụng copywriting hiệu quả</h3><h3 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.77778rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.3em; font-family: Poppins, sans-serif;\"><p style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 18px; font-weight: 400; margin-bottom: 1em; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 0); font-family: Rubik, sans-serif;\">Copywriting là yếu tố quan trọng giúp thu hút khách hàng và chuyển đổi họ thành khách hàng tiềm năng hoặc khách hàng thực sự. Trong copywriting, bạn cần chú ý đến các yếu tố như tiêu đề, mô tả và các “call-to-action” phù hợp.</p></h3><h4 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.33333rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.2em; font-family: Poppins, sans-serif;\">3.1 Tạo tiêu đề hấp dẫn và chính xác</h4><h3 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.77778rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.3em; font-family: Poppins, sans-serif;\"><p style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 18px; font-weight: 400; margin-bottom: 1em; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 0); font-family: Rubik, sans-serif;\">Tiêu đề là yếu tố quan trọng giúp thu hút khách hàng và giữ chú ý của họ. Bạn nên tạo ra tiêu đề hấp dẫn và chính xác, giúp khách hàng hiểu được sản phẩm hoặc dịch vụ của bạn.</p></h3><h4 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.33333rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.2em; font-family: Poppins, sans-serif;\">3.2 Viết mô tả ngắn gọn và súc tích</h4><h3 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.77778rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.3em; font-family: Poppins, sans-serif;\"><p style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 18px; font-weight: 400; margin-bottom: 1em; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 0); font-family: Rubik, sans-serif;\">Mô tả là yếu tố giúp khách hàng hiểu rõ hơn về sản phẩm hoặc dịch vụ của bạn. Bạn nên viết mô tả ngắn gọn và súc tích, giúp khách hàng hiểu được các tính năng và lợi ích của sản phẩm hoặc dịch vụ.</p></h3><h4 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.33333rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.2em; font-family: Poppins, sans-serif;\">3.3 Đặt các “call-to-action” phù hợp</h4><h3 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.77778rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.3em; font-family: Poppins, sans-serif;\"><p style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 18px; font-weight: 400; margin-bottom: 1em; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(0, 0, 0); font-family: Rubik, sans-serif;\">“Call-to-action” là yếu tố quan trọng giúp chuyển đổi khách hàng thành khách hàng tiềm năng hoặc khách hàng thực sự. Bạn nên đặt các “call-to-action” phù hợp và hấp dẫn, giúp khách hàng hiểu được hành động cần thực hiện để đặt hàng sản phẩm hoặc dịch vụ.</p></h3>\n            <div style=\"text-align:center;\">\n              <img src=\"https://dichvulandingpage.com/wp-content/uploads/2023/05/Nhung-loi-ich-cua-viec-thiet-ke-landing-page-cho-doanh-nghiep-cua-ban.png\" alt=\"\" style=\"max-width:100%; height:auto;\" />\n              <p style=\"font-style: italic; font-size: 14px; color: #666;\">thiet-ke-landing-page-cho-doanh-nghiep-cua-ban</p>\n            </div><h3 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.77778rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.3em; font-family: Poppins, sans-serif;\">Bước 4: Tối ưu hóa cho các thiết bị di động</h3><p style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 18px; margin-bottom: 1em; outline: 0px; padding: 0px; vertical-align: baseline; font-family: Rubik, sans-serif;\">Việc tối ưu hóa cho các thiết bị di động là yếu tố quan trọng giúp khách hàng dễ dàng truy cập và đặt hàng sản phẩm hoặc dịch vụ của bạn trên các thiết bị di động. Bạn nên đảm bảo rằng trang web của bạn có giao diện thân thiện với các thiết bị di động, có thể tải nhanh và dễ dàng sử dụng. Để tối ưu hóa trang web cho các thiết bị di động, bạn nên:</p><h4 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.33333rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.2em; font-family: Poppins, sans-serif;\">4.1 Thiết kế giao diện thân thiện với thiết bị di động</h4><p style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 18px; margin-bottom: 1em; outline: 0px; padding: 0px; vertical-align: baseline; font-family: Rubik, sans-serif;\">Thiết kế giao diện thân thiện với thiết bị di động giúp khách hàng dễ dàng truy cập và sử dụng trang web của bạn trên các thiết bị di động. Bạn nên tối ưu hóa bố cục, font chữ, kích thước hình ảnh và độ phân giải để phù hợp với các thiết bị di động.</p><h4 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.33333rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.2em; font-family: Poppins, sans-serif;\">4.2 Tối ưu hóa tốc độ tải trang</h4><p style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 18px; margin-bottom: 1em; outline: 0px; padding: 0px; vertical-align: baseline; font-family: Rubik, sans-serif;\">Tốc độ tải trang là yếu tố quan trọng giúp khách hàng dễ dàng truy cập và sử dụng trang web của bạn trên các thiết bị di động. Bạn nên tối ưu hóa tốc độ tải trang bằng cách giảm thiểu các tài nguyên trang web, tối ưu hóa hình ảnh và sử dụng các công cụ tối ưu hóa trang web.</p><h4 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.33333rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.2em; font-family: Poppins, sans-serif;\">4.3 Đảm bảo tính tương thích trên các thiết bị di động khác nhau</h4><p style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 18px; margin-bottom: 1em; outline: 0px; padding: 0px; vertical-align: baseline; font-family: Rubik, sans-serif;\">Đảm bảo tính tương thích trên các thiết bị di động khác nhau giúp khách hàng dễ dàng truy cập và sử dụng trang web của bạn trên các thiết bị di động khác nhau như điện thoại di động hay máy tính bảng. Bạn nên kiểm tra trang web của mình trên các thiết bị di động khác nhau để đảm bảo tính tương thích và sửa lỗi nếu có.</p><h3 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.77778rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.3em; font-family: Poppins, sans-serif;\">Bước 5: Đánh giá và cải tiến trang web</h3><p style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 18px; margin-bottom: 1em; outline: 0px; padding: 0px; vertical-align: baseline; font-family: Rubik, sans-serif;\">Sau khi hoàn thành các bước thiết kế và triển khai trang web, bạn nên đánh giá hiệu quả của trang web và thực hiện các cải tiến cần thiết. Điều này giúp bạn tối ưu hóa trang web để đạt được hiệu quả tốt nhất và đáp ứng được nhu cầu của khách hàng. Bạn có thể đánh giá trang web của mình bằng các phương pháp như:</p><h4 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.33333rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.2em; font-family: Poppins, sans-serif;\">5.1 Theo dõi dữ liệu về lưu lượng truy cập và tương tác của khách hàng</h4><p style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 18px; margin-bottom: 1em; outline: 0px; padding: 0px; vertical-align: baseline; font-family: Rubik, sans-serif;\">Theo dõi dữ liệu về lưu lượng truy cập và tương tác của khách hàng giúp bạn đánh giá được mức độ phổ biến của trang web và hiệu quả của chiến dịch tiếp thị của bạn. Bạn có thể sử dụng các công cụ như Google Analytics để theo dõi các chỉ số như lưu lượng truy cập, tỷ lệ thoát trang, thời gian trung bình trên trang và số lượt chuyển đổi.</p><h4 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.33333rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.2em; font-family: Poppins, sans-serif;\">5.2 Thu thập phản hồi từ khách hàng</h4><p style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 18px; margin-bottom: 1em; outline: 0px; padding: 0px; vertical-align: baseline; font-family: Rubik, sans-serif;\">Thu thập phản hồi từ khách hàng giúp bạn hiểu được những gì khách hàng đang tìm kiếm và những vấn đề họ gặp phải khi sử dụng trang web của bạn. Bạn có thể sử dụng các công cụ như khảo sát trực tuyến hoặc đánh giá khách hàng để thu thập phản hồi từ khách hàng.</p><h4 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.33333rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.2em; font-family: Poppins, sans-serif;\">5.3 Kiểm tra trang web trên các trình duyệt và thiết bị khác nhau</h4><p style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 18px; margin-bottom: 1em; outline: 0px; padding: 0px; vertical-align: baseline; font-family: Rubik, sans-serif;\">Kiểm tra trang web trên các trình duyệt và thiết bị khác nhau giúp bạn đảm bảo tính tương thích và hiệu quả của trang web trên nhiều nền tảng khác nhau. Bạn có thể sử dụng các công cụ như BrowserStack để kiểm tra trang web của mình trên nhiều trình duyệt và thiết bị khác nhau.</p><h4 class=\"wp-block-heading\" style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 1.33333rem; font-weight: 600; margin-bottom: 20px; outline: 0px; padding: 0px; vertical-align: baseline; clear: both; color: rgb(3, 0, 0); line-height: 1.2em; font-family: Poppins, sans-serif;\">5.4 Thực hiện các cải tiến cần thiết</h4><p style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 18px; margin-bottom: 1em; outline: 0px; padding: 0px; vertical-align: baseline; font-family: Rubik, sans-serif;\">Dựa trên kết quả đánh giá và phản hồi từ khách hàng, bạn nên thực hiện các cải tiến cần thiết để tối ưu hóa trang web và đáp ứng được nhu cầu của khách hàng. Các cải tiến có thể bao gồm tối ưu hóa nội dung, tối ưu hóa giao diện, tăng tốc độ tải trang và cải thiện tính tương thích trên các thiết bị khác nhau.</p><p style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 18px; margin-bottom: 1em; outline: 0px; padding: 0px; vertical-align: baseline; font-family: Rubik, sans-serif;\">Tóm lại, thiết kế một landing page đẹp và hiệu quả đòi hỏi sự kết hợp giữa nội dung hấp dẫn, giao diện hấp dẫn và tính tương thích trên các thiết bị khác nhau. Bằng cách tuân thủ các bước được đề cập ở trên và đánh giá hiệu quả của trang web, bạn có thể tối ưu hóa trang web của mình để đạt được kết quả tốt nhất và đáp ứng được nhu cầu của khách hàng.</p><p style=\"box-sizing: inherit; border-style: initial; border-color: initial; border-image: initial; font-size: 18px; margin-bottom: 1em; outline: 0px; padding: 0px; vertical-align: baseline; font-family: Rubik, sans-serif;\">Nếu quý khách hàng đang quan tâm và có nhu cầu thiết kế 1 trang LANDING PAGE , xin vui lòng liên hệ với chúng tôi qua các thông tin sau đây:</p><span style=\"font-family: Rubik, sans-serif; font-size: 18px;\">CÔNG TY TRUYỀN THÔNG CCO –&nbsp;</span><a href=\"https://ccomedia.vn/\" style=\"box-sizing: inherit; text-decoration: none; color: rgb(3, 0, 0); transition: 0.2s linear; font-family: Rubik, sans-serif; font-size: 18px;\">CCO MEDIA</a><br style=\"box-sizing: inherit; font-family: Rubik, sans-serif; font-size: 18px;\"><span style=\"font-family: Rubik, sans-serif; font-size: 18px;\">Website:&nbsp;</span><a href=\"https://dichvulandingpage.com/\" style=\"box-sizing: inherit; text-decoration: none; color: rgb(3, 0, 0); transition: 0.2s linear; font-family: Rubik, sans-serif; font-size: 18px;\">https://dichvulandingpage.com</a><br style=\"box-sizing: inherit; font-family: Rubik, sans-serif; font-size: 18px;\"><span style=\"font-family: Rubik, sans-serif; font-size: 18px;\">Điện thoại:&nbsp;</span><span style=\"box-sizing: inherit; font-weight: 700; font-family: Rubik, sans-serif; font-size: 18px;\">0902 813 410</span><br style=\"box-sizing: inherit; font-family: Rubik, sans-serif; font-size: 18px;\"><span style=\"font-family: Rubik, sans-serif; font-size: 18px;\">Email:&nbsp;</span><span style=\"box-sizing: inherit; font-weight: 700; font-family: Rubik, sans-serif; font-size: 18px;\">dichvuweblandingpage@gmail.com</span><br style=\"box-sizing: inherit; font-family: Rubik, sans-serif; font-size: 18px;\"><span style=\"font-family: Rubik, sans-serif; font-size: 18px;\">Chúng tôi cam kết sẽ tư vấn và hỗ trợ quý khách hàng một cách tận tình, chuyên nghiệp và nhanh chóng nhất để đem lại sự hài lòng cao nhất cho quý khách hàng. Xin chân thành cảm ơn và hy vọng sẽ có cơ hội được hợp tác với quý khách hàng!</span>','Landing page là một trang web được thiết kế để thu hút khách hàng và chuyển đổi họ thành khách hàng tiềm năng hoặc khách hàng thực sự. Thiết kế một landing page đẹp và hiệu quả là một yếu tố quan trọng để thu hút khách hàng và tăng doanh số bán hàng. Dưới đây là các bước cơ bản để thiết kế một landing page đẹp và hiệu quả.','https://dichvulandingpage.com/wp-content/uploads/2023/05/Cac-buoc-de-thiet-ke-mot-landing-page-dep-va-hieu-qua.png','Tùng','2025-06-28 21:16:34','[]');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backgrounds`
--

DROP TABLE IF EXISTS `backgrounds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backgrounds` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(500) NOT NULL,
  `active` tinyint(1) DEFAULT '0',
  `display_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_backgrounds_active_order` (`active`,`display_order`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backgrounds`
--

LOCK TABLES `backgrounds` WRITE;
/*!40000 ALTER TABLE `backgrounds` DISABLE KEYS */;
INSERT INTO `backgrounds` VALUES (1,'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop',1,1,'2025-07-18 09:28:34','2025-07-18 10:07:19'),(2,'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop',1,2,'2025-07-18 09:28:34','2025-07-18 09:28:34'),(3,'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop',1,3,'2025-07-18 09:28:34','2025-07-18 09:28:34'),(4,'https://th.bing.com/th/id/R.6d5c5d2ee3ce341fe37c9b603f954d6b?rik=KB2FIdtv0cC1SA&pid=ImgRaw&r=0',1,4,'2025-07-18 10:06:58','2025-07-20 15:46:51');
/*!40000 ALTER TABLE `backgrounds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `image_url` text,
  `active` tinyint(1) DEFAULT '0',
  `overlay_text` text,
  `overlay_color` varchar(10) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` VALUES (5,'Tùng Tank ','tu dong xanh noi huong lua','https://th.bing.com/th/id/R.d54cb890dfb31958172b3c0f877298a5?rik=ADa5UCd6kP%2fL%2fA&pid=ImgRaw&r=0',0,NULL,NULL,NULL),(25,'Landing Test','Đăng ký ngay để nhận ưu đãi!','https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1HyD8x.img?w=768&h=576&m=6',0,'? CHỈ HÔM NAY ?','#FF0000',NULL),(33,'ĐẠI TIỆC SIÊU SALE CỰC SỐC','Giảm giá 80% landingpage thứ 2 trở lên trong hóa đơn','https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/11/a8/0a/11a80a9b-2452-19c7-9fbc-ff3204eb78d0/artwork.jpg/1200x1200bf-60.jpg',0,NULL,NULL,NULL),(36,'ĐẠI TIỆC SIÊU SALE CỰC SỐC','Giảm giá 80% landingpage thứ 2 trở lên trong hóa đơn','https://wallpaperaccess.com/full/3368333.jpg',0,'?SỐ LƯỢNG CÓ HẠN?','#FF0000','2025-07-04 04:13:46'),(38,'ĐẠI TIỆC SIÊU SALE CỰC SỐC','Giảm giá 80% landingpage thứ 2 trở lên trong hóa đơn','https://wallpaperaccess.com/full/3368333.jpg',1,'LANDING PAGE TRỌN GÓI','#FF0000',NULL);
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `address` text,
  `landing_code` varchar(50) DEFAULT NULL,
  `message` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,'Nguyễn Văn A','0909123456','a@example.com','Kinh doanh','Hà Nội','LP01','Tôi cần landing page giới thiệu sản phẩm điện tử.','2025-06-25 07:54:32'),(2,'Trần Thị B','0911222333','b@example.com','Bất động sản','TP.HCM','LP02','Tôi muốn trang bán đất nền, cần đẹp và chuyên nghiệp.','2025-06-25 07:54:32'),(3,'Lê Văn C','0933444555','c@example.com','Dịch vụ','Đà Nẵng','LP01','Landing page cần có form đăng ký và bảng giá dịch vụ.','2025-06-25 07:54:32'),(4,'Phạm Thị D','0977666555','d@example.com','Marketing','Cần Thơ','LP03','Tôi muốn trang giới thiệu công ty và dịch vụ SEO.','2025-06-25 07:54:32'),(5,'Hoàng Văn E','0988111222','e@example.com','Thiết kế','Huế','LP02','Cần giao diện hiện đại, hiển thị danh mục sản phẩm rõ ràng.','2025-06-25 07:54:32'),(6,'Nguyễn Văn A','0909123456','a@example.com','Kinh doanh','Hà Nội','LP01','Tôi cần landing page giới thiệu sản phẩm điện tử.','2025-06-25 08:09:05'),(7,'Trần Thị B','0911222333','b@example.com','Bất động sản','TP.HCM','LP02','Tôi muốn trang bán đất nền, cần đẹp và chuyên nghiệp.','2025-06-25 08:09:05'),(8,'Lê Văn C','0933444555','c@example.com','Dịch vụ','Đà Nẵng','LP01','Landing page cần có form đăng ký và bảng giá dịch vụ.','2025-06-25 08:09:05'),(9,'Phạm Thị D','0977666555','d@example.com','Marketing','Cần Thơ','LP03','Tôi muốn trang giới thiệu công ty và dịch vụ SEO.','2025-06-25 08:09:05'),(10,'Hoàng Văn E','0988111222','e@example.com','Thiết kế','Huế','LP02','Cần giao diện hiện đại, hiển thị danh mục sản phẩm rõ ràng.','2025-06-25 08:09:05'),(11,'1','2','phamlethanhtung203@gmail.com','4','5','6','7','2025-06-26 09:25:12'),(12,'Phạm Lê Thanh Tùng','0123456789','Tung@gmail.com','Sinh Viên','Sao hỏa','01','Tôi cần một page mang phong cách hiện đại hóa với tông màu sáng chủ đạo, thêm một vài chức năng bắt mắt vào, nếu được thì tôi muốn được trực tiêp liên hệ với nhân viên ','2025-06-28 13:19:32'),(13,'Tiến','0989785642','Tien@gmail.com','Sinh Vien','123 đường 123','KH001','Cần một Ladingpage phù hợp với việc showoff các tài nguyên hoặc dự án của một sinh viên mới ra trường, nhấn mạnh và tính kĩ thuật và chức năng của dự án, gọn gàng, khoa học và sáng tạo là điểm cộng lớn','2025-07-10 07:49:16'),(14,'Nam','01578854613','Nam@gmail.com','Sinh Viên','123 13','KH011','Good job\n','2025-07-11 02:43:20');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interface_categories`
--

DROP TABLE IF EXISTS `interface_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interface_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interface_categories`
--

LOCK TABLES `interface_categories` WRITE;
/*!40000 ALTER TABLE `interface_categories` DISABLE KEYS */;
INSERT INTO `interface_categories` VALUES (4,'Công Nghệ'),(5,'Food and Beverage'),(6,'Sắc Đẹp'),(7,'Bất Động Sản'),(8,'Gia Dụng'),(9,'Thời Trang'),(10,'Xu Hướng');
/*!40000 ALTER TABLE `interface_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interfaces`
--

DROP TABLE IF EXISTS `interfaces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interfaces` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(50) NOT NULL,
  `url` varchar(255) NOT NULL,
  `category_id` int DEFAULT NULL,
  `preview_image_url` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `interfaces_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `interface_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interfaces`
--

LOCK TABLES `interfaces` WRITE;
/*!40000 ALTER TABLE `interfaces` DISABLE KEYS */;
INSERT INTO `interfaces` VALUES (11,'   	 VINHOMES OCEAN PARK GIA LÂM','1','   	 https://bds.dichvulandingpage.com/bds20',7,'https://static.ladipage.net/5c6e1cb0cfbdda501d525112/xe-sang-1-20200414162621.jpg'),(12,'Movenpick Resorts Phú Quốc','2','https://bds.dichvulandingpage.com/bds31',7,'https://static.ladipage.net/5c6e1cb0cfbdda501d525112/pho-i-ca-nh-bie-t-thu-gem-sky-world-1024x768-20200519091522-1-20200527051044.jpg'),(13,'THẨM MỸ VIỆN KANGNAM','3','https://spa.dichvulandingpage.com/spa01',6,'https://static.ladipage.net/5c6e1cb0cfbdda501d525112/pic-bacsi-20200618071629.png'),(14,'PHẤN NỤ HOÀNG CUNG','4','https://spa.dichvulandingpage.com/spa09',6,'https://static.ladipage.net/5c6e1cb0cfbdda501d525112/cropped-icon-192x192-20200616231724.png'),(15,'Vườn trà Cami\'s','5','https://sanpham.dichvulandingpage.com/sanpham01',5,'https://static.ladipage.net/5c751505b129c8245562ce5a/67282199_2662096520476466_3110521006318419968_o-1565067570.jpg'),(16,'adidas','6','https://www.adidas.com.vn/vi',9,'https://brand.assets.adidas.com/video/upload/f_auto,q_auto/if_w_gt_1920,w_1920/FW_25_Low_Profile_Onsite_SEA_Masthead_SEA_DT_2880x1280_1_0d96f00db9.jpg'),(17,'Rolex ','7','https://www.rolex.com/vi',9,'https://media.rolex.com/rolexcom/homepage/homepage-new-watches-2025-share'),(18,'Tin Tức','8','https://vneconomy.vn/',10,'https://media.vneconomy.vn/640x360/images/upload/2021/08/03/logoshare.png');
/*!40000 ALTER TABLE `interfaces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','staff','user') DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `profile_image` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','$2b$10$ccbofXCBeE4engXNbZrcO.tVB0mH4uFm3MhCV66Z8BN.Kzcq6k2AW','admin','2025-06-28 18:09:36','phamlethanhtung200@gmail.com','Thanh Tùng 1','https://avatars.githubusercontent.com/u/71756571?v=4'),(2,'staff1','$2b$10$o9ONMuM/gHLl/n3QQYWKcuEQxtT4M52mjsGsAOcJip1C0ekPP5PVe','staff','2025-06-28 18:09:36','phamlethanhtung200@gmail.com','Phạm Lê 2','https://avatars.githubusercontent.com/u/71756571?v=4'),(16,'AdminV2','$2b$10$ccbofXCBeE4engXNbZrcO.tVB0mH4uFm3MhCV66Z8BN.Kzcq6k2AW','admin','2025-07-18 03:04:36','phamlethanhtung200@gmail.com','Thanh Tùng 3','https://avatars.githubusercontent.com/u/71756571?v=4'),(19,'2','$2b$10$ccbofXCBeE4engXNbZrcO.tVB0mH4uFm3MhCV66Z8BN.Kzcq6k2AW','staff','2025-07-18 04:01:55','phamlethanhtung203@gmail.com','Tùng 1','');
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

-- Dump completed on 2025-07-21 19:57:48
