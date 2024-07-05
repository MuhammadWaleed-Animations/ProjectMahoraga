create procedure watched 
@uname varchar(20)
as
begin
	select a.[name],a.[Descript]
	from [dbo].[watch] as w  join  [dbo].[Anime] as a on  w.[aniid] = a.[AID]
	where w.[uname] = @uname
end
go
--drop procedure watched