create view mostRecent
as
select top 10 a.[name],a.[Descript],a.[releasedate]
from [dbo].[Anime] as a
where a.[released] = 1
order by a.[releasedate] desc