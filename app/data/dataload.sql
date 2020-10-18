-- Team 23
-- change the path as needed

USE OCFR;

DECLARE { @LOCAL_VARIABLE VARCHAR(500) [ = 'C:\\Users\\Teng Siang\\Documents\\GitHub\\DAndSFinalProject\\app\\data\\sample_data\\' ] }


-- States
LOAD DATA LOCAL INFILE 'C:\\Users\\Teng Siang\\Documents\\GitHub\\DAndSFinalProject\\app\\data\\sample_data\\states.csv'
INTO TABLE States
FIELDS TERMINATED BY ','
IGNORE 1 LINES;


-- Agency
LOAD DATA LOCAL INFILE 'C:\\Users\\Teng Siang\\Documents\\GitHub\\DAndSFinalProject\\app\\data\\sample_data\\agency.csv'
INTO TABLE Agency
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(agency_name, street_address, city, state_abbr, zip, email, phone_num)
SET agency_id = NULL
;

-- Certification
LOAD DATA LOCAL INFILE 'C:\\Users\\Teng Siang\\Documents\\GitHub\\DAndSFinalProject\\app\\data\\sample_data\\certification.csv'
INTO TABLE Certification
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(cert_name, cert_agency_id, default_exp)
SET cert_id = NULL
;

-- Users
LOAD DATA LOCAL INFILE 'C:\\Users\\Teng Siang\\Documents\\GitHub\\DAndSFinalProject\\app\\data\\sample_data\\users.csv'
INTO TABLE Users
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(email, password)
;

-- Ranks
LOAD DATA LOCAL INFILE 'C:\\Users\\Teng Siang\\Documents\\GitHub\\DAndSFinalProject\\app\\data\\sample_data\\ranks.csv'
INTO TABLE Ranks
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(rank_name, rank_description)
SET rank_id = NULL
;


-- Persons
LOAD DATA LOCAL INFILE 'C:\\Users\\Teng Siang\\Documents\\GitHub\\DAndSFinalProject\\app\\data\\sample_data\\persons.csv'
INTO TABLE Person
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(first_name, last_name, radio_number, rank_id, is_active, start_date, street_address, city, state_abbr, zip, contact_email, home_phone, work_phone, mobile_phone)
SET person_id = NULL
;


-- Cert_assoc
-- Will have duplicates that will be exluded by composite key
LOAD DATA LOCAL INFILE 'C:\\Users\\Teng Siang\\Documents\\GitHub\\DAndSFinalProject\\app\\data\\sample_data\\cert_assoc.csv'
INTO TABLE Cert_assoc
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(person_id, cert_id, date_obtained)
;


-- Station
LOAD DATA LOCAL INFILE 'C:\\Users\\Teng Siang\\Documents\\GitHub\\DAndSFinalProject\\app\\data\\sample_data\\station.csv'
INTO TABLE Station
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(station_name, street_address, city, state_abbr, zip, station_contact_num)
SET station_id = NULL 
;

-- Station assoc
LOAD DATA LOCAL INFILE 'C:\\Users\\Teng Siang\\Documents\\GitHub\\DAndSFinalProject\\app\\data\\sample_data\\station_assoc.csv'
INTO TABLE Station_assoc
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(person_id, station_id)
;