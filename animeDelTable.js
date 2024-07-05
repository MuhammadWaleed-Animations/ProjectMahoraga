// anime-list.js

function del(aid)
{
    console.log("\n --------------",aid);
    fetch(`/api/del_anime/${aid}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        // Render anime data in the table

        console.log("\n------msg: ",data);
        //window.location.reload();

    })
    .catch(error => {
        console.error('Error fetching watched anime data:', error);
    });
}


// Use jQuery(function() { }) shorthand instead of $(document).ready()
jQuery(function() {
    $.ajax({
        url: '/api/anime', // Updated URL to relative path
        type: 'GET',
        success: function(response) {
            console.log('Success:', response); // Log the response to the console
            
            // Create the table headers
            var tableHeaders = '<tr><th>Poster</th><th>Name</th><th>Description</th><th>Age Restriction</th><th>Release Date</th></tr>';
            $('#anime-table').append(tableHeaders);

            // Loop through the anime and add them to the table
            response.forEach(function(anime) {
                // Create a table row for each anime
                var tableRow = $('<tr onclick="del('+"\'"+anime.AID+"\'"+')"></tr>');    
                
                // Add data cells for each anime property
                tableRow.append('<td>' + '<div><img src="/static/images/'+anime.img+'" width="70" height="70"></div>' + '</td>');
                tableRow.append('<td>' + anime.name + '</td>');
                tableRow.append('<td>' + anime.description + '</td>');
                tableRow.append('<td>' + anime.age_restriction + '</td>');
                tableRow.append('<td>' + anime.release_date + '</td>');
                // Append the table row to the anime table
                $('#anime-table').append(tableRow);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
});
