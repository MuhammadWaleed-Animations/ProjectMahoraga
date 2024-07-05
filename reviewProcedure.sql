create procedure review
@aid int
as
begin
	select r.[uname],r.[review], r.[reviewDate]
	from  [dbo].[reviews] as r 
	where r.[aniid] = @aid
end
go

--drop procedure review

