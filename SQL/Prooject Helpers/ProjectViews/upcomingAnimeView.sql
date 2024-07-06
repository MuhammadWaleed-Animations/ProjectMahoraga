create view upcomingAnime
as
select top 10 a.[name],a.[Descript],a.[releasedate]
from [dbo].[Anime] as a
where a.[released] = 0
order by a.[releasedate] asc