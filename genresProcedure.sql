create procedure genres
@gname varchar(20)
as
begin
	select a.[name],a.[Descript]
	from  [dbo].[genre] as g join [dbo].[Anime] as a on g.[aniid] = a.[AID]
	where g.[genre] = @gname
end
go