create trigger ratingAuthenticity
on [dbo].[rating]
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
	delete from [dbo].[rating]
	where [aniid] = @id and [uname] = @uid
	print 'Cant rate before watching the show'
end


end
go

--drop trigger ratingAuthenticity
