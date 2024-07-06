create view highlyRated
as
select top 10 a.[AID],a.[name],sum(r.[Rating])/count(*) as Rate
from [dbo].[Anime] as a join [dbo].[rating] as r on a.[AID] = r.[aniid]
group by a.[AID],a.[name]
order by sum(r.[Rating])/count(*) desc
go