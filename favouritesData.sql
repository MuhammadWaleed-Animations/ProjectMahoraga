use ProjectMahoraga

-- Insert data into favorites table

INSERT INTO favourite (uname, aniid)
SELECT DISTINCT TOP 20 w.uname, w.aniid
FROM watch w
JOIN (
    SELECT TOP 20 uname, aniid
    FROM watch
    ORDER BY NEWID()  -- Randomly select watched records
) AS rand_watch ON w.uname = rand_watch.uname AND w.aniid = rand_watch.aniid;

select * from favourite
