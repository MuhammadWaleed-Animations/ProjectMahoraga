use ProjectMahoraga

-- Insert data into users table
INSERT INTO users (username, name, bdate, joiningDate, gender, email, passkey)
VALUES 
('_Waleed_', 'Muhammad Waleed', '2003-11-15', '2017-01-01', 1, 'waleed@example.com', 'meow'),
('_Arooba_', 'Arooba Iqbal', '2003-11-15', '2017-01-01', 1, 'arooba@example.com', 'hehe'),
('_Armeen_', 'Armeen Fatima', '2003-11-15', '2017-01-01', 1, 'armeen@example.com', 'scorpio'),

('naruto', 'Naruto Uzumaki', '1997-10-10', '2020-01-01', 1, 'naruto@example.com', 'rasengan123'),
('sasuke', 'Sasuke Uchiha', '1997-07-23', '2020-01-02', 1, 'sasuke@example.com', 'sharingan456'),
('goku', 'Son Goku', '1976-04-16', '2020-01-03', 1, 'goku@example.com', 'kamehameha789'),
('luffy', 'Monkey D. Luffy', '1997-05-05', '2020-01-04', 1, 'luffy@example.com', 'gumgum123'),
('vegeta', 'Vegeta', '1974-12-23', '2020-01-05', 1, 'vegeta@example.com', 'finalflash456'),
('ichigo', 'Ichigo Kurosaki', '1995-07-15', '2020-01-06', 1, 'ichigo@example.com', 'bankai789'),
('eren', 'Eren Yeager', '2000-03-30', '2020-01-07', 1, 'eren@example.com', 'attacktitan123'),
('sakura', 'Sakura Haruno', '1997-03-28', '2020-01-08', 0, 'sakura@example.com', 'cherryblossom456'),
('levi', 'Levi Ackerman', '1985-12-25', '2020-01-09', 1, 'levi@example.com', 'cleanfreak789'),
('hinata', 'Hinata Hyuga', '1995-12-27', '2020-01-10', 0, 'hinata@example.com', 'byakugan123'),
('gaara', 'Gaara', '1995-01-19', '2020-01-11', 1, 'gaara@example.com', 'sandburial456'),
('gohan', 'Son Gohan', '1989-05-18', '2020-01-12', 1, 'gohan@example.com', 'kamehameha789'),
('narancia', 'Narancia Ghirga', '1983-11-12', '2020-01-13', 1, 'narancia@example.com', 'aerosmith123'),
('sanji', 'Sanji Vinsmoke', '1997-03-02', '2020-01-14', 1, 'sanji@example.com', 'blackleg456'),
('yusuke', 'Yusuke Urameshi', '1977-10-10', '2020-01-15', 1, 'yusuke@example.com', 'spiritgun789'),
('yugi', 'Yugi Mutou', '1993-06-04', '2020-01-16', 1, 'yugi@example.com', 'darkmagician123'),
('shikamaru', 'Shikamaru Nara', '1995-09-22', '2020-01-17', 1, 'shikamaru@example.com', 'shadowpossession456'),
('itachi', 'Itachi Uchiha', '1988-06-09', '2020-01-18', 1, 'itachi@example.com', 'tsukuyomi789'),
('hinata2', 'Hinata Hyuga', '1995-12-27', '2020-01-19', 0, 'hinata2@example.com', 'byakugan123'),
('erza', 'Erza Scarlet', '1991-07-07', '2020-01-20', 0, 'erza@example.com', 'heavenlyarmour456'),
('killua', 'Killua Zoldyck', '1999-07-07', '2020-01-21', 1, 'killua@example.com', 'lightningpalm789'),
('saitama', 'Saitama', '1986-11-28', '2020-01-22', 1, 'saitama@example.com', 'onepunch123'),
('light', 'Light Yagami', '1989-02-28', '2020-01-23', 1, 'light@example.com', 'deathnote456'),
('edward', 'Edward Elric', '1995-10-11', '2020-01-24', 1, 'edward@example.com', 'alchemy789'),
('hinata3', 'Hinata Hyuga', '1995-12-27', '2020-01-25', 0, 'hinata3@example.com', 'byakugan123'),
('gintoki', 'Gintoki Sakata', '1974-10-10', '2020-01-26', 1, 'gintoki@example.com', 'woodenboken456'),
('nami', 'Nami', '1996-07-03', '2020-01-27', 0, 'nami@example.com', 'navigation789'),
('levi2', 'Levi Ackerman', '1985-12-25', '2020-01-28', 1, 'levi2@example.com', 'cleanfreak789'),
('hinata4', 'Hinata Hyuga', '1995-12-27', '2020-01-29', 0, 'hinata4@example.com', 'byakugan123'),
('sakura2', 'Sakura Haruno', '1997-03-28', '2020-01-30', 0, 'sakura2@example.com', 'cherryblossom456');

select * from users