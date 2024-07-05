create trigger reviewAuthenticity
on [dbo].[reviews]
after insert
as
begin
declare @id int
select @id = i.[aniid]
from inserted as i

declare @uid varchar(20)
select @uid = i.[uname]
from inserted as i

if not exists(select *
from inserted as i join [dbo].[watch]  as w on  i.[aniid] = w.[aniid] and i.[uname] = w.[uname])
begin
	delete from [dbo].[reviews]
	where [aniid] = @id and [uname] = @uid
	print 'Cant review before watching the show'
end


end
go

--drop trigger reviewAuthenticity