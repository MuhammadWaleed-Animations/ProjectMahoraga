create view mostWateched
as
select top 10 a.[name],a.[Descript],a.[releasedate],count(*) as viewss
from [dbo].[Anime] as a join [dbo].[watch] as w on a.[AID] = w.[aniid]
group by a.[AID],a.[name],a.[Descript],a.[releasedate]
order by count(*) desc

--drop view mostWateched