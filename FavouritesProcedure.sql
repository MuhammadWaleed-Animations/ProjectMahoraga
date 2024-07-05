create procedure favourites
@uname varchar(20)
as
begin
	select a.[name],a.[Descript]
	from [dbo].[favourite] as f join  [dbo].[Anime] as a on  f.[aniid] = a.[AID]
	where f.[uname] = @uname
end
go
--drop procedure favourites