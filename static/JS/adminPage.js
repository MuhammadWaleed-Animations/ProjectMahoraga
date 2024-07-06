var token = localStorage.getItem('jwtToken');
var username = "";
var admin = false;
console.log("\n   token: ", token);
// Check if token exists
if (token) {
    // Send POST request to decode token
    fetch('/api/decode_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: token }) // Send the token to decode
    })
        .then(response => response.json())
        .then(decodedData => {
            console.log("Decoded data:", decodedData);
            username = decodedData.username;
            admin = decodedData.admin;
            if(admin == true)
                {
                    console.log("Admin hu ma");
                    document.getElementById("button1").addEventListener("click", function() {
                        console.log("button 1 pressed");
                        window.location.href = "usersTable.html";
                    });
                    document.getElementById("button2").addEventListener("click", function() {
                        console.log("button 2 pressed");
                        window.location.href = "animeTable.html";
                    });
                    document.getElementById("button3").addEventListener("click", function() {
                        console.log("button 3 pressed");
                        window.location.href = "usersDelTable.html";
                    });
                    document.getElementById("button4").addEventListener("click", function() {
                        console.log("button 4 pressed");
                        window.location.href = "animeDelTable.html";
                    });
                    document.getElementById("button5").addEventListener("click", function() {
                        console.log("button 5 pressed");
                        window.location.href = "insertAnime.html";
                    });

                }
            else
            {
                alert("this page is only for admins");
            }
        })
        .catch(error => {
            console.error('Error decoding token:', error);
        });
} else {
    console.error('JWT token not found in local storage');
    // Display error message or redirect to login page if needed
}


