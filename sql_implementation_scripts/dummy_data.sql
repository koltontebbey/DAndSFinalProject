--Agency Table Data
INSERT INTO dbo.agency (agency_id,agency_name,street_address,city,state_abbr,zip,email,phone_num)
VALUES ('5','Agency 5','244 Teleport Rd.','Salem','OR','66590','agency5@gmail.com','9990112222');

--Certification Table Data
INSERT INTO dbo.certification (cert_id,cert_name,cert_agency_id,default_exp)
VALUES ('4','Firefighter 2','4',2);

--Users Table Data
INSERT INTO dbo.users (user_identifier,email,password)
VALUES ('4','user4@gmail.com','notMyPassord');

--Position Table Data
INSERT INTO dbo.position (position_id,position_name,position_description)
VALUES ('4','Basic','Lowest Level Firefighter');

--Person Table Data
INSERT INTO dbo.person (person_id,first_name,last_name,radio_number,position_id,is_active,start_date,street_address,city,state_abbr,zip,contact_email)
VALUES ('3','Terry','McLaurin','0003','4',1,'2017-03-09','231 Wannamaker St.','Seattle','WA','45877','Tmclaurin@gmail.com');

--Phone Table Data
INSERT INTO dbo.phone (person_id,phone_num,phone_type)
VALUES ('3','1112223333','Home');

--Cert-Assoc Table Data
INSERT INTO dbo.cert_assoc (person_id,cert_id,date_obtained)
VALUES ('3','2','2014-10-22');

--Station Table Data
INSERT INTO dbo.station (station_id,station_name,street_address,city,state_abbr,zip,station_contact_num)
VALUES ('3','Fire Station 3','111 Cornstalk Way','Indianapolis','IN','74490','9983205500');

--Station_assoc Table Data
INSERT INTO dbo.station_assoc (person_id,station_id)
VALUES ('3','3');
