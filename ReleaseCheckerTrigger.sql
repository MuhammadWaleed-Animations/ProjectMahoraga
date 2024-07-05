-- agar watch ma add kr rha ho to check krlay kah realease ha bhi ya nhi
create trigger releaseChecker
on [dbo].[watch]
after insert
as
begin
declare @del int
select del = i.aniid
from inserted as i


if exists (select *
from inserted as i join [dbo].[Anime] as a on i.aniid = a.aid
where a.[released] = 0)
begin 
	delete from watch
	where aniid = @del
	print 'Not released yet'
end

end
go