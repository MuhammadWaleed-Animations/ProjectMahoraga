create procedure ratings
@aid int 
as
begin
select sum(ra.[Rating])/count(*) as Rate
from [dbo].[rating] as ra
where ra.[aniid] = @aid
end
go
