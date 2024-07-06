function goToPage2(element) {
    console.log(element);

    // Set URL parameter with poster image URL and navigate to Page 2
    const key = element;
    window.location.href = `animePage.html?key=${key}`;
}

function goToPage2g(element) {
    console.log("\nGenre: ",element);
        //alert(element);
    
    // Set URL parameter with poster image URL and navigate to Page 2
    const key = element;
    window.location.href = `genre.html?genre=${key}`;
    }

var username = null;
var admin = null;
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve JWT token from local storage
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
                //alert("--------stop---------");
                // Access the decoded data and display it on the page
            //     var userInfoElement = document.getElementById('userInfo');
            //     userInfoElement.innerHTML = `
            //     <p>Username: ${decodedData.username}</p>
            //     <p>Admin Status: ${decodedData.admin}</p>
            // `;
                username = decodedData.username;
                admin = decodedData.admin;

                // Fetch watched anime data after decoding token
                fetch(`/api/watched_anime/${username}`, {
                        method: 'GET'
                    })
                    .then(response => response.json())
                    .then(data => {
                        // Render anime data in the table
                        const animeTable = document.getElementById('anime-table');
                        const tbody = animeTable.querySelector('tbody');
                        console.log("\n------data: ",data);
                        data.forEach(anime => {
                            const row = document.createElement('tr');
                                // Add event listener to the row
                                row.addEventListener('click', function() {
                                // Call goToPage2 function with anime AID as argument
                                goToPage2(anime.AID);
                            });

                            row.innerHTML = `
                            <td><img src="/static/images/${anime.img}" width="80" height="90"></td>
                            <td>${anime.name}</td>
                            <td>${anime.description}</td>
                            <td>${anime.release_date}</td>
                            <td>${anime.age_restriction}</td>
                            `;
                            tbody.appendChild(row);
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching watched anime data:', error);
                    });
            })
            .catch(error => {
                console.error('Error decoding token:', error);
            });
    } else {
        console.error('JWT token not found in local storage');
        // Display error message or redirect to login page if needed
    }

    // Get the search input element
    const searchInput = document.querySelector('.search-container input[type="text"]');

    // Get the search button element
    const searchButton = document.querySelector('.search-container button');

    searchButton.addEventListener('click', function () {
        const searchTerm = searchInput.value;
        searchInput.value = "";
        console.log('Search term:', searchTerm);
    
        // Fetch anime data by name (animeS API)
        fetch(`/api/animeS/${searchTerm}`)
        .then(response => response.json())
        .then(anime => {
            console.log("\n Anime: ",anime);
            if (anime.error != 'Not Found') {
            // Anime found, navigate to page 2 using AID
            console.log('Anime:', anime);
            goToPage2(anime.AID);
            return; // Exit the chain if anime is found
            }
    
            // Exception occurred fetching animeS, try animeGenre API
            console.log('Error fetching anime using animeS API, trying animeGenre API');
            return fetch(`/api/animeGenre/${searchTerm}`)
            .then(response => response.json())
            .then(genre_anime => {
                if (genre_anime) {
                // Anime found using animeGenre API, navigate using genre
                console.log('Anime Genre:', genre_anime[0].genre);
                goToPage2g(genre_anime[0].genre);
                } else {
                // No anime found using either API, do nothing and display message
                console.log('No anime found using either API');
                alert('No anime found matching your search term.');
                }
            })
            .catch(error => {
                console.error('Error fetching anime using animeGenre API:', error);
                alert('An error occurred while searching for anime.');
            });
        })
        .catch(error => {
            console.error('Error fetching anime using animeS API:', error);
            // Handle the error here (e.g., display an error message)
        });
    });


    // Get all button elements
    const buttons = document.querySelectorAll('nav ul li a');

    // Add event listener for each button
    buttons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            const buttonText = event.target.textContent;
            console.log('Button clicked:', buttonText);
            // You can perform actions here based on the button clicked
        });
    });
});
