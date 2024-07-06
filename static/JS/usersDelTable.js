function del(username)
{
    console.log("\n --------------",username);
    fetch(`/api/del_user/${username}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        // Render anime data in the table

        console.log("\n------msg: ",data);
        window.location.reload();

    })
    .catch(error => {
        console.error('Error fetching watched anime data:', error);
    });
}
// Use jQuery(function() { }) shorthand instead of $(document).ready()
jQuery(function() {
    $.ajax({
        url: '/api/users', // Updated URL to relative path
        type: 'GET',
        success: function(response) {
            console.log('Success:', response); // Log the response to the console
            
            // Create the table headers
            var tableHeaders = '<tr><th>Username</th><th>Name</th><th>Birthdate</th><th>Joining Date</th><th>Gender</th><th>Email</th><th>Passkey</th><th>Badges</th></tr>';
            $('#users-table').append(tableHeaders);

            // Loop through the users and add them to the table
            response.forEach(function(user) {
                // Create a table row for each user
                var para = user.username;
                //console.log("\n----para:",para);
                var tableRow = $('<tr onclick="del('+"\'"+para+"\'"+')"></tr>');                
                // Add data cells for each user property
                tableRow.append('<td>' + user.username + '</td>');
                tableRow.append('<td>' + user.name + '</td>');
                tableRow.append('<td>' + user.bdate + '</td>');
                tableRow.append('<td>' + user.joiningDate + '</td>');
                tableRow.append('<td>' + (user.gender === 1 ? 'Male' : 'Female') + '</td>');
                tableRow.append('<td>' + user.email + '</td>');
                tableRow.append('<td>' + user.passkey + '</td>');
                tableRow.append('<td>' + user.badges + '</td>');
                
                // Append the table row to the users table
                $('#users-table').append(tableRow);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
});


