
function goToPage2(element) {
    console.log("\nelement: ",element)

    
    // Set URL parameter with poster image URL and navigate to Page 2
    const key = element;
    //alert("stop!");
    window.location.href = `animePage.html?key=${key}`;
  }

function goToPage2g(element) {
console.log("\nGenre: ",element);
    //alert(element);

// Set URL parameter with poster image URL and navigate to Page 2
const key = element;
window.location.href = `genre.html?genre=${key}`;
}

document.addEventListener('DOMContentLoaded', function()
{
    // Get the search input element
    const searchInput = document.querySelector('.search-container input[type="text"]');
    
    // Get the search button element
    const searchButton = document.querySelector('.search-container button');
    
    // Add event listener for search button click
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

    // // Get the search input element
    // const searchInput = document.querySelector('.search-container input[type="text"]');
    
    // // Get the search button element
    // const searchButton = document.querySelector('.search-container button');

    // // Add event listener for search button click
    // searchButton.addEventListener('click', function() {
    //     let flag = 1;
    //     const searchTerm = searchInput.value;
    //     searchInput.value = "";
    //     console.log('Search term:', searchTerm);
    //     if(flag == 1)
    //     {
    //         console.log("\nflag1",flag);
    //         flag = 0;
    //         fetch(`/api/animeS/${searchTerm}`)
    //         .then(response => {
    //             // Check if the response is successful (status code 200)
    //             console.log("\n res: ",response);
    //             if (response.ok) {
    //                 // Parse the JSON response body
    //                 return response.json();
    //             } else {
    //                 // If response is not successful, throw an error with status text
    //                 console.log("hiiiiiiiiiiiiiii");
    //                 flag = 1;
    //                 throw new Error(`Failed to fetch anime: ${response.statusText}`);


    //             }
    //         })
    //         .then(anime => {
    //             // Handle the anime data retrieved from the API
    //             console.log('Anime:', anime);
    //             if(anime)
    //                 {
    //                     flag == 1;
    //                     goToPage2(anime.AID);
    //                 }

    //         });
    //     }

    //     if(flag == 1)
    //     {
    //         // console.log("\nflag2",flag);
    //         // flag = 0;

    //         // console.log("idhar a gya");
    //         // //flag = 0;
    //         // fetch(`/api/animeGenre/${searchTerm}`)
    //         // .then(response => {
    //         //     // Check if the response is successful (status code 200)
    //         //     if (response.ok) {
    //         //         // Parse the JSON response body
    //         //         return response.json();
    //         //     } else {
    //         //         // If response is not successful, throw an error with status text
    //         //         flag = 1;
    //         //         throw new Error(`Failed to fetch genre: ${response.statusText}`);
    //         //     }
    //         // })
    //         // .then(anime => {
    //         //     // Handle the anime data retrieved from the API
    //         //     console.log('Anime Genre:',anime[0].genre);
    //         //     if(anime)
    //         //         {
    //         //             goToPage2g(anime[0].genre);
    //         //         }
    //         // });

    //     }
        
    // //     // You can perform actions here based on the search term entered
    // });

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
                var tableRow = $('<tr onclick="goToPage2('+String(anime.AID)+')"></tr>');
                
                // Add data cells for each anime property
                tableRow.append('<td>' + '<div><img src="/static/images/'+anime.img+'" width="120" height="70"></div>' + '</td>');
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


