create trigger badgeDecider
on watch
after insert
as
begin
declare @no int
select @no = count(*)
from inserted join [dbo].[watch] as w on inserted.uname = w.uname

declare @name varchar(20)
select @name = uname
from inserted


if @no >= 50 
	begin
	update [dbo].[users]
	set badges = 4
	where username = @name
	end
else if @no >= 25
	begin
	update [dbo].[users]
	set badges = 3
	where username = @name
	end
else if @no >= 15
	begin
	update [dbo].[users]
	set badges = 2
	where username = @name
	end
else if @no >= 10
	begin
	update [dbo].[users]
	set badges = 1
	where username = @name
	end
end
go
--drop trigger badgeDecider
