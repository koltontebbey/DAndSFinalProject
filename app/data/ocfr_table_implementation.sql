-- TEAM 23
-- Email Regex Source : https://stackoverflow.com/questions/43906631/check-constraint-for-emails-in-an-oracle-database
-- MySQL syntax

CREATE DATABASE OCFR;

USE OCFR;

-- 1. State table
CREATE TABLE States(
  state_abbr char(2) NOT NULL PRIMARY KEY,
  state_name varchar(15) NOT NULL
);

-- 2. Agency table
CREATE TABLE Agency(
  agency_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  agency_name varchar(30) NOT NULL,
  street_address varchar(30) NOT NULL,
  city varchar(25) NOT NULL,
  state_abbr char(2) NOT NULL,
  zip varchar(10) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phone_num varchar(10) NOT NULL,
  foreign key (state_abbr) references States(state_abbr),
  constraint chk_num_valid check (phone_num regexp '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
  constraint email_valid check (email LIKE '%@%.%' AND email NOT LIKE '@%' AND email NOT LIKE '%@%@%')
);


-- 3. Certification table
CREATE TABLE Certification(
  cert_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  cert_name VARCHAR(100) NOT NULL,
  cert_agency_id int NOT NULL,
  -- default_exp, default expiry of certification in months
  default_exp int NOT NULL,
  foreign key (cert_agency_id) references Agency(agency_id)
);

-- 4. User table
-- PW to be hashed in SHA256
CREATE TABLE Users(
  user_identifier int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(50) NOT NULL,
  password char(64) NOT NULL,
  constraint email_valid2 check (email LIKE '%@%.%' AND email NOT LIKE '@%' AND email NOT LIKE '%@%@%')
);

-- 5. rank table
-- assumption: position = rank
CREATE TABLE Ranks(
  rank_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  rank_name varchar(30) NOT NULL,
  rank_description varchar(200)
);


-- 6. Person table
CREATE TABLE Person(
  person_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  first_name varchar(25) NOT NULL,
  last_name varchar(25) NOT NULL,
  radio_number int NOT NULL,
  rank_id int NOT NULL,
  is_active boolean NOT NULL,
  start_date date NOT NULL,
  street_address varchar(30) NOT NULL,
  city varchar(25) NOT NULL,
  state_abbr char(2) NOT NULL,
  zip varchar(10) NOT NULL,
  contact_email VARCHAR(50) NOT NULL,
  home_phone varchar(10) NOT NULL,
  work_phone varchar(10) NOT NULL,
  mobile_phone varchar(10) NOT NULL,
  foreign key (state_abbr) references States(state_abbr),
  foreign key (rank_id) references Ranks(rank_id),
  constraint email_valid3 check (contact_email LIKE '%@%.%' AND contact_email NOT LIKE '@%' AND contact_email NOT LIKE '%@%@%'),
  constraint chk_num_valid1 check (home_phone regexp '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
  constraint chk_num_valid2 check (work_phone regexp '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
  constraint chk_num_valid3 check (mobile_phone regexp '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')
);


-- 7. Certification association table
CREATE TABLE Cert_assoc(
  person_id int NOT NULL,
  cert_id int NOT NULL,
  date_obtained date NOT NULL,
  exp_date date,
  primary key (person_id, cert_id),
  foreign key (person_id) references Person(person_id),
  foreign key (cert_id) references Certification(cert_id)
);


-- 8. Station Table
CREATE TABLE Station(
  station_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  station_name varchar(30) NOT NULL,
  street_address varchar(30) NOT NULL,
  city varchar(25) NOT NULL,
  state_abbr char(2) NOT NULL,
  zip varchar(10) NOT NULL,
  station_contact_num varchar(10) NOT NULL,
  foreign key (state_abbr) references States(state_abbr),
  constraint chk_num_valid4 check (station_contact_num regexp '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')
);

-- 9. Station association
CREATE TABLE Station_assoc(
  person_id int NOT NULL,
  station_id int NOT NULL,
  primary key (person_id, station_id),
  foreign key (person_id) references Person(person_id),
  foreign key (station_id) references Station(station_id)
);
