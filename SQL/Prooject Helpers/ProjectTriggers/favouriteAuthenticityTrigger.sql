create trigger favouriteAuthenticity
on [dbo].[favourite]
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
from inserted as i join [dbo].[watch]  as w on  i.[aniid] = w.[aniid] and @uid = w.[uname])
begin
	delete from [dbo].[favourite]
	where [aniid] = @id and [uname] = @uid
	print 'Cant add to favourite before watching the show'
end


end
go

--drop trigger favouriteAuthenticity

