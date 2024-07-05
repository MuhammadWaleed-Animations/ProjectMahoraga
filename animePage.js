function getAnimeByIdOG(aid) {
    // Make a GET request to the Flask API endpoint
    fetch(`/api/anime/${aid}`)
        .then(response => {
            // Check if the response is successful (status code 200)
            if (response.ok) {
                // Parse the JSON response body
                return response.json();
            } else {
                // If response is not successful, throw an error with status text
                throw new Error(`Failed to fetch anime: ${response.statusText}`);
            }
        })
        .then(anime => {
            // Handle the anime data retrieved from the API
            console.log('Anime:', anime);

            // // Get the container element to display anime information
            const container = document.getElementById('anime-info-container');

            // // Create elements to display the anime information

            // const div1 = document.createElement('div');

            // const imgElement = document.createElement('img');
            // imgElement.src = "/static/images/" + anime.img; // Set image source
            // imgElement.alt = anime.name; // Set image alt text
            // div1.appendChild(imgElement); // Append image to container
            // container.appendChild(div1);



            // const div2 = document.createElement('div');
            // const nameElement = document.createElement('h2');
            // nameElement.textContent = anime.name; // Set anime name
            // div2.appendChild(nameElement); // Append name to container
            // container.appendChild(div2);




            // const div3 = document.createElement('div');
            // const releaseDateElement = document.createElement('p');
            // releaseDateElement.textContent = `Release Date: ${anime.release_date}`; // Set release date
            // div3.appendChild(releaseDateElement); // Append release date to container
            // container.appendChild(div3);


            // const div4 = document.createElement('div');
            // const descriptionElement = document.createElement('p');
            // descriptionElement.textContent = `Synopsis: ${anime.description}`; // Set description
            // div4.appendChild(descriptionElement); // Append description to container
            // container.appendChild(div4);

            const div5 = document.createElement('div');
            const genreElement = document.createElement('p');
            genreElement.textContent = `Genres: ${anime.genres.join(', ')}`; // Set genres
            div5.appendChild(genreElement); // Append genres to container
            container.appendChild(div5);
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Error:', error);
            // You can perform error handling here
        });
}

function animeRating(aid) {
    // Make a GET request to the Flask API endpoint
    fetch(`/api/rating/${aid}`)
        .then(response => {
            // Check if the response is successful (status code 200)
            if (response.ok) {
                // Parse the JSON response body
                return response.json();
            } else {
                // If response is not successful, throw an error with status text
                throw new Error(`Failed to fetch anime: ${response.statusText}`);
            }
        })
        .then(rating => {
            // Handle the anime data retrieved from the API
            console.log('Rating:', rating);
            document.getElementById("rate").innerHTML = rating;
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Error:', error);
            // You can perform error handling here
        });
}

// // Retrieve URL parameter from the current URL
// const params = new URLSearchParams(window.location.search);
// const data = params.get('key');
// console.log('Value of data parameter:', data);
// getAnimeById(data);

document.addEventListener('DOMContentLoaded', function () {

    const params = new URLSearchParams(window.location.search);
    const data = params.get('key');
    console.log('Value of data parameter:', data);
    getAnimeById(data);
    animeRating(data);

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
            })
            .catch(error => {
                console.error('Error decoding token:', error);
            });
    } else {
        console.error('JWT token not found in local storage');
        // Display error message or redirect to login page if needed
    }

    // Add event listener to the post comment button
    document.getElementById('post-comment-btn').addEventListener('click', function () {
        const commentInput = document.getElementById('comment-input').value;
        if (commentInput.trim() !== '') {
            const commentData = {
                username: username, // Get username from decoded token
                aniid: data, // Use the aniid from the URL params
                review: commentInput
            };
            //console.log("\nHereeeeeeeeeeeeeeeeeeeeeeeeee\n")
            console.log(commentData);
            postReview(commentData);
        } else {
            // Handle empty comment input
            alert('Please enter a comment before posting.');
        }
    });

    const stars = document.querySelectorAll('.star');
    const submitBtn = document.getElementById('submit-rating-btn');

    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.getAttribute('data-rating'));

            // Remove active class from all stars
            stars.forEach(s => s.classList.remove('active'));

            // Add active class to the clicked star and stars before it
            for (let i = 0; i < selectedRating; i++) {
                stars[i].classList.add('active');
            }
        });
    });

    submitBtn.addEventListener('click', () => {
        // Handle submission of the selectedRating
        // You can send the selectedRating to the backend for processing
        console.log('Selected Rating:', selectedRating);
        const ratingData = {
            username: username, // Get username from decoded token
            aniid: data, // Use the aniid from the URL params
            ratings: selectedRating
        };
        // Make an AJAX request to the Flask server to insert the user data
        $.ajax({
            url: '/api/ratingPOST',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(ratingData),
            success: function (response) {
                console.log('Success:', response); // Log the response to the console
                // Optionally, perform any actions after successfully inserting the user
            },
            error: function (xhr, status, error) {
                console.error('Error:', error); // Log the error to the console
                // Optionally, handle the error response
                alert("You have already reviewed the Anime / or you have not watched it yet");
            }
        });


        // Reset selectedRating to 0 after submission
        selectedRating = 0;
    });


    // Add event listeners to the buttons
    document.getElementById("button1").addEventListener("click", function() {
                // Handle submission of the selectedRating
        // You can send the selectedRating to the backend for processing
        console.log('Watched button clicked');
        const watchedData = {
            username: username, // Get username from decoded token
            aniid: data, // Use the aniid from the URL params
        };
        // Make an AJAX request to the Flask server to insert the user data
        $.ajax({
            url: '/api/watchedPOST',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(watchedData),
            success: function (response) {
                console.log('Success:', response); // Log the response to the console
                // Optionally, perform any actions after successfully inserting the user
            },
            error: function (xhr, status, error) {
                console.error('Error:', error); // Log the error to the console
                // Optionally, handle the error response
                alert("You have already watched the Anime");
            }
        });
    });
    
    document.getElementById("button2").addEventListener("click", function() {
                // Handle submission of the selectedRating
        // You can send the selectedRating to the backend for processing
        console.log('favourite button clicked');
        const favouriteData = {
            username: username, // Get username from decoded token
            aniid: data, // Use the aniid from the URL params
        };
        // Make an AJAX request to the Flask server to insert the user data
        $.ajax({
            url: '/api/favouritePOST',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(favouriteData),
            success: function (response) {
                console.log('Success:', response); // Log the response to the console
                // Optionally, perform any actions after successfully inserting the user
            },
            error: function (xhr, status, error) {
                console.error('Error:', error); // Log the error to the console
                // Optionally, handle the error response
                alert("You have already added the Anime to favourite");
            }
        });
    });
  
});

document.getElementById("button1").addEventListener("click", function() {
    window.location.href = "discussions.html";
});


function postReview(reviewData) {
    fetch('/api/add_review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    })
        .then(response => {
            if (response.ok) {
                // Reload the page to display the new review
                location.reload();
            } else {
                throw new Error('Failed to post review');
            }
        })
        .catch(error => {
            console.error('Error posting review:', error);
        });
}

function getAnimeById(aid) {
    fetch(`/api/animeR/${aid}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Failed to fetch anime: ${response.statusText}`);
            }
        })
        .then(anime => {
            console.log('Anime:', anime);
            const container = document.getElementById('anime-info-container');
            container.innerHTML = ''; // Clear container

            const imgDiv = document.createElement('div');
            const imgElement = document.createElement('img');
            imgElement.src = "/static/images/" + anime.img;
            imgDiv.appendChild(imgElement);
            container.appendChild(imgDiv);

            const nameDiv = document.createElement('div');
            const nameElement = document.createElement('h2');
            nameElement.textContent = anime.name;
            nameDiv.appendChild(nameElement);
            container.appendChild(nameDiv);

            const releaseDateDiv = document.createElement('div');
            const releaseDateElement = document.createElement('p');
            releaseDateElement.textContent = `Release Date: ${anime.release_date}`;
            releaseDateDiv.appendChild(releaseDateElement);
            container.appendChild(releaseDateDiv);

            const descriptionDiv = document.createElement('div');
            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = `Synopsis: ${anime.description}`;
            descriptionDiv.appendChild(descriptionElement);
            container.appendChild(descriptionDiv);

            getAnimeByIdOG(aid);
            //const div5 = document.createElement('div');
            //const genreElement = document.createElement('p');
            //console.log("\n Anime: ",anime);
            //genreElement.textContent = `Genres: ${anime.genres.join(', ')}`; // Set genres
            // div5.appendChild(genreElement); // Append genres to container
            // container.appendChild(div5);

            const reviewList = document.getElementById('discussion-list');
            reviewList.innerHTML = ''; // Clear review list

            anime.reviews.forEach(review => {
                const reviewDiv = document.createElement('div');
                reviewDiv.classList.add('review');
                reviewDiv.innerHTML = `
                    <p class="username">${review.username}</p>
                    <p class="review-text">${review.review}</p>
                    <p class="review-date">${review.reviewDate}</p>
                `;
                reviewList.appendChild(reviewDiv);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// function postComment(commentData) {
//     fetch('/api/add_comment', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(commentData)
//     })
//     .then(response => {
//         if (response.ok) {
//             // Reload the page to display the new comment
//             location.reload();
//         } else {
//             throw new Error('Failed to post comment');
//         }
//     })
//     .catch(error => {
//         console.error('Error posting comment:', error);
//     });
// }

// function getAnimeById(aid) {
//     fetch(`/api/animeD/${aid}`)
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error(`Failed to fetch anime: ${response.statusText}`);
//             }
//         })
//         .then(anime => {
//             console.log('Anime:', anime);
//             const container = document.getElementById('anime-info-container');
//             container.innerHTML = ''; // Clear container

//             const imgDiv = document.createElement('div');
//             const imgElement = document.createElement('img');
//             imgElement.src = "/static/images/" + anime.img;
//             imgDiv.appendChild(imgElement);
//             container.appendChild(imgDiv);

//             const nameDiv = document.createElement('div');
//             const nameElement = document.createElement('h2');
//             nameElement.textContent = anime.name;
//             nameDiv.appendChild(nameElement);
//             container.appendChild(nameDiv);

//             const releaseDateDiv = document.createElement('div');
//             const releaseDateElement = document.createElement('p');
//             releaseDateElement.textContent = `Release Date: ${anime.release_date}`;
//             releaseDateDiv.appendChild(releaseDateElement);
//             container.appendChild(releaseDateDiv);

//             const descriptionDiv = document.createElement('div');
//             const descriptionElement = document.createElement('p');
//             descriptionElement.textContent = `Synopsis: ${anime.description}`;
//             descriptionDiv.appendChild(descriptionElement);
//             container.appendChild(descriptionDiv);

//             const discussionList = document.getElementById('discussion-list');
//             discussionList.innerHTML = ''; // Clear discussion list

//             anime.discussions.forEach(discussion => {
//                 const commentDiv = document.createElement('div');
//                 commentDiv.classList.add('comment');
//                 commentDiv.innerHTML = `
//                     <p class="username">${discussion.username}</p>
//                     <p class="comment-text">${discussion.comment}</p>
//                     <p class="time">${discussion.reply_time}</p>
//                 `;
//                 discussionList.appendChild(commentDiv);
//             });
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// }






