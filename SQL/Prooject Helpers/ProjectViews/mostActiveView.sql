create view mostActive
as
select top 10 u.[username],u.[name],u.[badges]
from [dbo].[users] as u join [dbo].[discussion] as d on u.[username] = d.[uname]
group by u.[username],u.[name],u.[badges]
order by count(*) desc

