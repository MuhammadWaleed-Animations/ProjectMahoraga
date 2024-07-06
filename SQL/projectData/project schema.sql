use ProjectMahoraga
Create table users
(
	username varchar(20) primary key,
	name varchar(20) not null,
	bdate date,
	joiningDate date not null,
	gender int check(gender = 0 or gender = 1) not null, 
	email varchar(30) not null unique,
	passkey varchar(50) not null,
	badges int default 0
)


create table Anime(
	AID int primary key,
	name varchar(100) not null,
	Descript varchar(400),
	age_restriction int,
	releasedate date not null,
	released bit  -- 1 = released
) 
create table [Admin]
(
 admin_uName varchar(20) FOREIGN KEY references users(username) ON DELETE CASCADE ON UPDATE CASCADE,
 PRIMARY KEY(admin_uName)
);

create table watch(
	uname varchar(20) foreign key references users(username) on delete cascade on update cascade,
	aniid int foreign key references anime(aid) on delete cascade on update cascade,
	viewDate date not null,
	primary key (uname,aniid)
)

create table  rating
(
	uname varchar(20) foreign key references users(username) on delete cascade on update cascade,
	aniid int foreign key references anime(aid) on delete cascade on update cascade,
	Rating int not null,
	primary key (uname,aniid)
)

create table  favourite
(
	uname varchar(20) foreign key references users(username) on delete cascade on update cascade,
	aniid int foreign key references anime(aid) on delete cascade on update cascade,
	primary key (uname,aniid)
)

create table reviews(
	uname varchar(20) foreign key references users(username) on delete cascade on update cascade,
	aniid int foreign key references anime(aid) on delete cascade on update cascade,
	review varchar(255) not null ,
	reviewDate date not null,
	primary key (uname,aniid)
)

create table  genre
(
	aniid int foreign key references anime(aid) on delete cascade on update cascade,
	genre varchar(20),
	primary key (aniID,genre)
)



create table  discussion
(
	commentid int primary key,
	aniId int foreign key references anime(aid) on delete cascade on update cascade,
	uname varchar(20) foreign key references users(username) on delete set null on update cascade,
	comment varchar(255) not null,
	replytime datetime not null
)



select* from [Admin]
select * from genre
select * from rating
select * from users
select * from Anime
select * from watch
select * from favourite
select * from reviews
select * from discussion












