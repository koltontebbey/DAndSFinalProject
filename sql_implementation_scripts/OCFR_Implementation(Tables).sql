-- TEAM 23
-- Email Regex Source : https://stackoverflow.com/questions/43906631/check-constraint-for-emails-in-an-oracle-database

-- 1. State table
CREATE TABLE States(
  state_abbr char(2) NOT NULL,
  state_name varchar(15) NOT NULL,
  constraint state_pk primary key (state_abbr)
)

-- 2. Agency table
CREATE TABLE Agency(
  agency_id varchar(7) NOT NULL,
  agency_name varchar(30) NOT NULL,
  street_address varchar(30) NOT NULL,
  city varchar(25) NOT NULL,
  state_abbr char(2) NOT NULL,
  zip varchar(10) NOT NULL,
  email varchar(35) NOT NULL,
  phone_num varchar(10) NOT NULL,
  constraint agency_pk primary key (agency_id),
  constraint state_fk foreign key (state_abbr) references States(state_abbr),
  constraint chk_num_valid check (phone_num LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
  constraint email_valid check (email LIKE '%@%.%' AND email NOT LIKE '@%' AND email NOT LIKE '%@%@%')
)

-- 3. Certification table
CREATE TABLE Certification(
  cert_id varchar(7) NOT NULL,
  cert_name varchar(30) NOT NULL,
  cert_agency_id varchar(7) NOT NULL,
  -- default_exp, default expiry of certification in months
  default_exp int NOT NULL,
  constraint cert_pk primary key (cert_id),
  constraint agency_fk foreign key (cert_agency_id) references Agency(agency_id)
)

-- 4. User table
-- PW to be hashed in SHA256
CREATE TABLE Users(
  user_identifier varchar(7) NOT NULL,
  email varchar(30) NOT NULL,
  password char(64) NOT NULL,
  constraint user_pk primary key (user_identifier),
  constraint email_valid2 check (email LIKE '%@%.%' AND email NOT LIKE '@%' AND email NOT LIKE '%@%@%')
)

-- 5. Position table
--- assumption: position = rank
CREATE TABLE Position(
  position_id varchar(7) NOT NULL,
  position_name varchar(30) NOT NULL,
  position_description varchar(200),
  constraint position_pk primary key (position_id)
)

-- 6. Person table
CREATE TABLE Person(
  person_id varchar(7) NOT NULL,
  first_name varchar(25) NOT NULL,
  last_name varchar(25) NOT NULL,
  radio_number varchar(10) NOT NULL,
  position_id varchar(7) NOT NULL,
  is_active bit NOT NULL,
  street_address varchar(30) NOT NULL,
  city varchar(25) NOT NULL,
  state_abbr char(2) NOT NULL,
  zip varchar(10) NOT NULL,
  contact_email varchar(35) NOT NULL,
  constraint person_pk primary key (person_id),
  constraint state_fk2 foreign key (state_abbr) references States(state_abbr),
  constraint position_fk foreign key (position_id) references Position(position_id),
  constraint email_valid3 check (contact_email LIKE '%@%.%' AND contact_email NOT LIKE '@%' AND contact_email NOT LIKE '%@%@%')
)

-- 7. Phone table
CREATE TABLE Phone(
  person_id varchar(7) NOT NULL,
  phone_num varchar(10) NOT NULL,
  phone_type varchar(20) NOT NULL,
  constraint person_fk foreign key (person_id) references Person(person_id),
  constraint chk_phone_type check (phone_type in ('Office', 'Mobile', 'Home')),
  constraint chk_num_valid2 check (phone_num like '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')
)

-- 8. Certification association table
CREATE TABLE Cert_assoc(
  person_id varchar(7) NOT NULL,
  cert_id varchar(7) NOT NULL,
  date_obtained date NOT NULL,
  constraint cert_assoc_pk primary key (person_id, cert_id),
  constraint person_fk2 foreign key (person_id) references Person(person_id),
  constraint cert_fk foreign key (cert_id) references Certification(cert_id)
)


-- 9. Station Table
CREATE TABLE Station(
  station_id int NOT NULL,
  station_name varchar(30) NOT NULL,
  street_address varchar(30) NOT NULL,
  city varchar(25) NOT NULL,
  state_abbr char(2) NOT NULL,
  zip varchar(10) NOT NULL,
  station_contact_num varchar(10) NOT NULL,
  constraint station_pk primary key (station_id),
  constraint state_fk3 foreign key (state_abbr) references States(state_abbr),
  constraint chk_num_valid3 check (station_contact_num like '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')
)

-- 10. Station association
CREATE TABLE Station_assoc(
  person_id varchar(7) NOT NULL,
  station_id int NOT NULL,
  constraint station_assoc_pk primary key (person_id, station_id),
  constraint person_fk3 foreign key (person_id) references Person(person_id),
  constraint station_fk foreign key (station_id) references Station(station_id)
)
