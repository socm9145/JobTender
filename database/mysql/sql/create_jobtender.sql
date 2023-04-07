CREATE DATABASE IF NOT EXISTS jobtender ;
use jobtender;

CREATE TABLE IF NOT EXISTS `Users` (
	`user_id`	int	NOT NULL auto_increment PRIMARY KEY,
	`name`	varchar(15)	NOT NULL,
	`email`	varchar(40)	NOT NULL,
	`age`	tinyint(1)	NULL,
	`gender`	varchar(10)	NULL,
	`provider`	varchar(10)	NOT NULL,
	`created_date`	timestamp	NOT NULL
);

CREATE TABLE IF NOT EXISTS `Companies` (
	`company_id`	int	NOT NULL auto_increment PRIMARY KEY,
	`name`	varchar(30)	NOT NULL,
	`type`	varchar(30)	NOT NULL,
	`scale`	varchar(15)	NOT NULL,
	`employees_number`	int	NOT NULL,
	`address`	varchar(100)	NOT NULL,
	`year_founded`	int	NOT NULL
);

CREATE TABLE IF NOT EXISTS `Company_Ratings` (
	`company_rating_id`	int	NOT NULL auto_increment PRIMARY KEY,
	`company_id`	int	NOT NULL,
	`average_rating`	varchar(5)	NOT NULL,
	`growth_rating`	varchar(5)	NOT NULL,
	`balance_rating`	varchar(5)	NOT NULL,
	`salary_welfare_rating`	varchar(5)	NOT NULL,
	`culture_rating`	varchar(5)	NOT NULL,
	`management_rating`	varchar(5)	NOT NULL
);

CREATE TABLE IF NOT EXISTS `Ideal_Talents` (
	`ideal_talent_id`	int	NOT NULL auto_increment PRIMARY KEY,
	`company_id`	int	NOT NULL,
	`talent`	varchar(20)	NOT NULL
);

CREATE TABLE IF NOT EXISTS `Article_Keywords` (
	`article_keywords_id`	int	NOT NULL auto_increment PRIMARY KEY,
	`company_id`	int	NOT NULL,
	`keyword`	varchar(15)	NOT NULL,
	`count`	int	NOT NULL,
	`created_date`	timestamp	NOT NULL
);

CREATE TABLE IF NOT EXISTS `Keywords` (
	`keyword_id`	int	NOT NULL auto_increment PRIMARY KEY,
	`keyword`	varchar(15)	NOT NULL
);

CREATE TABLE IF NOT EXISTS `Wishlists` (
	`wish_list_id`	int	NOT NULL auto_increment PRIMARY KEY,
	`user_id`	int	NOT NULL,
	`company_id`	int	NOT NULL
);

CREATE TABLE IF NOT EXISTS `Options` (
	`option_id`	int	NOT NULL auto_increment PRIMARY KEY,
	`talent_weight`	varchar(10)	NOT NULL
);

CREATE TABLE IF NOT EXISTS `Results` (
	`result_id`	int	NOT NULL auto_increment PRIMARY KEY,
	`user_id`	int	NOT NULL,
	`created_date`	timestamp	NOT NULL
);

CREATE TABLE IF NOT EXISTS `Inputs` (
	`user_keyword_id`	int	NOT NULL auto_increment PRIMARY KEY,
	`result_id`	int	NOT NULL,
	`keyword`	varchar(15)	NOT NULL
);

CREATE TABLE IF NOT EXISTS `Company_Scores` (
	`company_result_id`	int	NOT NULL auto_increment PRIMARY KEY,
	`result_id`	int	NOT NULL,
	`company_id`	int	NOT NULL,
	`score`	varchar(30)	NOT NULL
);

ALTER TABLE `Company_Ratings` ADD CONSTRAINT `FK_Companies_TO_Company_Ratings_1` FOREIGN KEY (
	`company_id`
)
REFERENCES `Companies` (
	`company_id`
);

ALTER TABLE `Ideal_Talents` ADD CONSTRAINT `FK_Companies_TO_Ideal_Talents_1` FOREIGN KEY (
	`company_id`
)
REFERENCES `Companies` (
	`company_id`
);

ALTER TABLE `Article_Keywords` ADD CONSTRAINT `FK_Companies_TO_Article_Keywords_1` FOREIGN KEY (
	`company_id`
)
REFERENCES `Companies` (
	`company_id`
);

ALTER TABLE `Wishlists` ADD CONSTRAINT `FK_Users_TO_Wishlists_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `Users` (
	`user_id`
);

ALTER TABLE `Wishlists` ADD CONSTRAINT `FK_Companies_TO_Wishlists_1` FOREIGN KEY (
	`company_id`
)
REFERENCES `Companies` (
	`company_id`
);

ALTER TABLE `Results` ADD CONSTRAINT `FK_Users_TO_Results_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `Users` (
	`user_id`
);

ALTER TABLE `Inputs` ADD CONSTRAINT `FK_Results_TO_Inputs_1` FOREIGN KEY (
	`result_id`
)
REFERENCES `Results` (
	`result_id`
);

ALTER TABLE `Company_Scores` ADD CONSTRAINT `FK_Results_TO_Company_Scores_1` FOREIGN KEY (
	`result_id`
)
REFERENCES `Results` (
	`result_id`
);

ALTER TABLE `Company_Scores` ADD CONSTRAINT `FK_Companies_TO_Company_Scores_1` FOREIGN KEY (
	`company_id`
)
REFERENCES `Companies` (
	`company_id`
);

