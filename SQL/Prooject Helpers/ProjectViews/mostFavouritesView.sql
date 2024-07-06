create view mostFavourites
as
select top 10 a.[name]
from [dbo].[favourite] as f join [dbo].[Anime] as a on a.[AID] = f.[aniid]
group by a.[name]
order by count(*) desc