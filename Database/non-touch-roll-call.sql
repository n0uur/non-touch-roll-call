/*
 Navicat Premium Data Transfer
 
 Date: 13/12/2019 04:12:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for classroom_data
-- ----------------------------
DROP TABLE IF EXISTS `classroom_data`;
CREATE TABLE `classroom_data`  (
  `RowID` int(11) NOT NULL AUTO_INCREMENT,
  `Class_ID` int(4) NOT NULL,
  `Class_Subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Class_Instructor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Class_Password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Class_Type` int(255) NOT NULL DEFAULT 0,
  `Class_Minimum` int(255) NOT NULL DEFAULT 0,
  `Class_IsLimit` int(255) NOT NULL DEFAULT 0,
  `Class_Limit` int(255) DEFAULT NULL,
  `Class_Begin_Time` datetime(0) DEFAULT NULL,
  `Class_End_Time` datetime(0) DEFAULT NULL,
  `Class_Status` int(255) NOT NULL DEFAULT 0,
  `CreatedTime` datetime(0) DEFAULT current_timestamp(),
  PRIMARY KEY (`RowID`, `Class_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 69 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for classroom_std
-- ----------------------------
DROP TABLE IF EXISTS `classroom_std`;
CREATE TABLE `classroom_std`  (
  `RowID` int(11) NOT NULL AUTO_INCREMENT,
  `Class_ID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `STD_CardID` int(11) NOT NULL,
  `STD_ID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `STD_Status` int(255) DEFAULT 1,
  `Attend_Status` int(11) DEFAULT 1,
  `Attend_Time` datetime(0) NOT NULL DEFAULT current_timestamp(),
  `Leave_Time` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`RowID`, `Class_ID`, `STD_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 71 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for student_data
-- ----------------------------
DROP TABLE IF EXISTS `student_data`;
CREATE TABLE `student_data`  (
  `RowID` int(11) NOT NULL AUTO_INCREMENT,
  `STD_ID` int(50) NOT NULL,
  `STD_CardID` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `STD_Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `STD_Lastname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `STD_Nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `STD_IMG_URL` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `STD_RegistedDate` datetime(0) NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`RowID`, `STD_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
