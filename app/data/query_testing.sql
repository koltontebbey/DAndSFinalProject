# list-members
SELECT first_name, last_name, gender, is_active, radio_number, station_name, Ranks.rank_id, Ranks.rank_name, contact_email, Person.street_address, Person.city, Person.state_abbr
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
WHERE Certification.cert_agency_id = Agency.agency_id AND Certification.cert_id = 2

# cert detail view part 2
SELECT person_id, first_name, last_name, date_obtained, exp_date, CASE WHEN delta < 0 THEN 'Expired' ELSE 'Valid' END AS 'Status'
FROM(
SELECT person_id, first_name, last_name, date_obtained, exp_date, DATEDIFF(exp_date, CURDATE()) AS delta
FROM(
		(
SELECT person_id, first_name, last_name, date_obtained, CASE WHEN exp_date_ovr IS NULL THEN exp_date_calc ELSE exp_date_ovr END AS exp_date
FROM(
			(
SELECT person_id, first_name, last_name, date_obtained, exp_date_ovr, STR_TO_DATE(CONCAT(exp_yr,'-', LPAD(MONTH(date_obtained), 2,'00'),'-', LPAD(DAY(date_obtained), 2,'00')), '%Y-%m-%d') AS exp_date_calc
FROM(
				(
SELECT Person.person_id,first_name, Last_name, date_obtained, exp_date AS exp_date_ovr, YEAR(Cert_assoc.date_obtained) + Certification.default_exp AS exp_yr
FROM Person, Cert_assoc, Certification
WHERE Person.person_id = Cert_assoc.person_id AND Certification.cert_id = Cert_assoc.cert_id AND Certification.cert_id = 2) AS temp
			)) AS temp2
		)) AS temp3
	)


) AS temp4
ORDER BY person_id
	


# member helper
SELECT Person.person_id, Person.first_name, Person.last_name
FROM Person

# member detail view part 1
SELECT Person.first_name, Person.last_name, Person.gender, Ranks.rank_name, Person.is_active, start_date, street_address, city, state_abbr, zip, contact_email, home_phone, work_phone, mobile_phone
FROM  Person, Ranks
WHERE Person.rank_id = Ranks.rank_id AND Person.person_id = 50

# member certs
SELECT cert_name, date_obtained, exp_date , CASE WHEN delta < 0 THEN 'Expired' ELSE 'Valid' END AS 'Status'
FROM(
	SELECT cert_name, date_obtained, exp_date, DATEDIFF(exp_date, CURDATE()) AS delta
	FROM(
		(
	SELECT cert_name, date_obtained, CASE WHEN exp_date_ovr IS NULL THEN exp_date_calc ELSE exp_date_ovr END AS exp_date
	FROM(
			(
	SELECT cert_name, date_obtained, STR_TO_DATE(CONCAT(exp_yr,'-', LPAD(MONTH(date_obtained), 2,'00'),'-', LPAD(DAY(date_obtained), 2,'00')), '%Y-%m-%d') AS exp_date_calc, exp_date_ovr
	FROM(
				(
	SELECT Certification.cert_name, date_obtained, YEAR(Cert_assoc.date_obtained) + Certification.default_exp AS exp_yr, exp_date AS exp_date_ovr
	FROM Person, Cert_assoc, Certification
	WHERE Person.person_id = Cert_assoc.person_id AND Certification.cert_id = Cert_assoc.cert_id AND Person.person_id = 50) AS temp
			)) AS temp2
		)) AS temp3
	) 
) AS temp4
ORDER BY cert_name


# Req report 1 DATEDIFF(exp_date, CURDATE()) AS delta
SELECT Person.first_name, Person.last_name, Person.is_active, Certification.cert_name, assoc.exp_date, DATEDIFF(assoc.exp_date, CURDATE()) AS delta
FROM(	
	(
SELECT person_id, cert_id, CASE WHEN exp_date_ovr IS NULL THEN exp_date_calc ELSE exp_date_ovr END AS exp_date
FROM(
		(
SELECT person_id, cert_id, exp_date AS exp_date_ovr, STR_TO_DATE(CONCAT(exp_yr,'-', LPAD(MONTH(date_obtained), 2,'00'),'-', LPAD(DAY(date_obtained), 2,'00')), '%Y-%m-%d') AS exp_date_calc
FROM(
			(
SELECT person_id, Certification.cert_id, Cert_assoc.date_obtained, Cert_assoc.exp_date, YEAR(Cert_assoc.date_obtained) + Certification.default_exp AS exp_yr
FROM Cert_assoc, Certification
WHERE Certification.cert_id = Cert_assoc.cert_id) AS temp
		)) AS temp2
	)
	
	
	) AS assoc, Person, Certification
)
WHERE assoc.person_id = Person.person_id AND Certification.cert_id = assoc.cert_id
HAVING delta < 0




# Req report 2
SELECT Station.station_name, Person.radio_number, Person.first_name, Person.last_name, Ranks.rank_name, Person.contact_email 
FROM Person, Station, Station_assoc, Ranks
WHERE Person.person_id = Station_assoc.person_id AND Station_assoc.station_id = Station.station_id AND Person.rank_id = Ranks.rank_id
ORDER BY station_name, radio_number

# Search mbr
# concat the wildcards
SELECT * 
FROM (
SELECT person_id, CONCAT(first_name, ' ', last_name) AS full_name 
FROM Person
) AS temp
WHERE full_name LIKE '%%'

# Search cert
SELECT cert_id, cert_name 
FROM Certification
WHERE cert_name LIKE '%%'




