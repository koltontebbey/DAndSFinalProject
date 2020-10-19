# list-members
SELECT first_name, last_name, is_active, radio_number, station_name, Ranks.rank_id, Ranks.rank_name, contact_email, Person.street_address, Person.city, Person.state_abbr
From Person, Ranks, Station_assoc, Station
WHERE Person.rank_id = Ranks.rank_id AND Person.person_id = Station_assoc.person_id AND Station_assoc.station_id = Station.station_id;

# list_certs
SELECT cert_name, Agency.agency_name, default_exp 
FROM Certification, Agency
WHERE Certification.cert_agency_id = Agency.agency_id

# cert helper
SELECT cert_id, cert_name
FROM Certification

# cert detail view part 1
SELECT cert_name, default_exp, Agency.agency_name, Agency.street_address, Agency.city, Agency.state_abbr, Agency.zip, Agency.email, Agency.phone_num
FROM Certification, Agency
WHERE Certification.cert_agency_id = Agency.agency_id AND Certification.cert_id = 1

# cert detail view part 2
SELECT person_id, first_name, last_name, date_obtained, exp_date,
CASE 
	WHEN delta < 0 THEN 'Expired'
	ELSE 'Valid'
END AS 'Expired?'
FROM(
	(SELECT person_id, first_name, last_name, date_obtained, exp_date, DATEDIFF(exp_date, CURDATE()) AS delta
	FROM(
		(SELECT person_id, first_name, last_name, date_obtained, STR_TO_DATE(CONCAT(exp_yr,'-',LPAD(MONTH(date_obtained), 2 ,'00'),'-',LPAD(DAY(date_obtained), 2 ,'00')), '%Y-%m-%d') AS exp_date
		FROM(
			(SELECT Person.person_id,first_name, Last_name, date_obtained, YEAR(Cert_assoc.date_obtained) + Certification.default_exp AS exp_yr
			FROM Person, Cert_assoc, Certification
			WHERE Person.person_id = Cert_assoc.person_id AND Certification.cert_id = Cert_assoc.cert_id AND Certification.cert_id = 1) AS temp
		)) AS temp2
	)) AS temp3
)


# member helper
SELECT Person.person_id, Person.first_name, Person.last_name
FROM Person

# member detail view part 1
SELECT Person.first_name, Person.last_name, Ranks.rank_name, Person.is_active, start_date, street_address, city, state_abbr, zip, contact_email, home_phone, work_phone, mobile_phone
FROM  Person, Ranks
WHERE Person.rank_id = Ranks.rank_id AND Person.person_id = 1

#
SELECT cert_name, date_obtained, exp_date,
CASE 
	WHEN delta < 0 THEN 'Expired'
	ELSE 'Valid'
END AS 'Expired?'
FROM(
	(SELECT cert_name, date_obtained, exp_date, DATEDIFF(exp_date, CURDATE()) AS delta
	FROM(
		(SELECT cert_name, date_obtained, STR_TO_DATE(CONCAT(exp_yr,'-',LPAD(MONTH(date_obtained), 2 ,'00'),'-',LPAD(DAY(date_obtained), 2 ,'00')), '%Y-%m-%d') AS exp_date
		FROM(
			(SELECT Certification.cert_name, date_obtained, YEAR(Cert_assoc.date_obtained) + Certification.default_exp AS exp_yr
			FROM Person, Cert_assoc, Certification
			WHERE Person.person_id = Cert_assoc.person_id AND Certification.cert_id = Cert_assoc.cert_id AND Person.person_id = 50) AS temp
		)) AS temp2
	)) AS temp3
)

# Req report 1
SELECT Person.first_name, Person.last_name, Person.is_active, Certification.cert_name, assoc.exp_date
FROM(	
	(SELECT person_id, cert_id, exp_date,DATEDIFF(exp_date, CURDATE()) AS delta
	FROM(
		(SELECT person_id, cert_id, STR_TO_DATE(CONCAT(exp_yr,'-',LPAD(MONTH(date_obtained), 2 ,'00'),'-',LPAD(DAY(date_obtained), 2 ,'00')), '%Y-%m-%d') AS exp_date
		FROM(
			(SELECT person_id, Certification.cert_id, Cert_assoc.date_obtained,YEAR(Cert_assoc.date_obtained) + Certification.default_exp AS exp_yr
			FROM Cert_assoc, Certification
			WHERE Certification.cert_id = Cert_assoc.cert_id) AS temp
		)) AS temp2
	)
	HAVING delta < 0) AS assoc, Person, Certification
)
WHERE assoc.person_id = Person.person_id AND Certification.cert_id = assoc.cert_id
ORDER BY exp_date

# Req report 2
SELECT Station.station_name, Person.radio_number, Person.first_name, Person.last_name, Person.contact_email
FROM Person, Station, Station_assoc
WHERE Person.person_id = Station_assoc.person_id AND Station_assoc.station_id = Station.station_id
ORDER BY station_name, radio_number
