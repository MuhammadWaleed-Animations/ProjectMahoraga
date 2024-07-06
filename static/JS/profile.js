document.addEventListener('DOMContentLoaded', function() {



    // Function to fetch user information
    function fetchUserInfo(username) {
        // Send GET request to fetch user information
        fetch(`/api/user_info?username=${username}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch user information');
                }
            })
            .then(user => {
                // Update profile information on the page
                document.getElementById('username').textContent = user.username;
                document.getElementById('name').textContent = user.name;
                document.getElementById('bdate').textContent = user.bdate;
                document.getElementById('joiningDate').textContent = user.joiningDate;
                document.getElementById('gender').textContent = user.gender;
                document.getElementById('email').textContent = user.email;
                var s = '/static/images/badge'+String(user.badges)+'.jpg';
                console.log(s);
                document.getElementById('image').src = s; // Assuming badges is a number
            
                // // Display badge images
                // const badgesContainer = document.querySelector('.badges');
                // badgesContainer.innerHTML = ''; // Clear previous badges
                // for (let i = 0; i < user.badges; i++) {
                //     const badgeImg = document.createElement('img');
                //     badgeImg.src = '/static/images/badge'+String(user.badges)+'.jpg'; // Replace 'path_to_badge_image' with the actual image URL
                //     badgeImg.alt = 'Badge';
                //     badgeImg.classList.add('badge-img');
                //     badgesContainer.appendChild(badgeImg);
                // }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Get username from localStorage

    var token = localStorage.getItem('jwtToken');
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
                fetchUserInfo(username);
            })
            .catch(error => {
                console.error('Error decoding token:', error);
            });
    } else {
        console.error('JWT token not found in local storage');
        // Display error message or redirect to login page if needed
    }

});

