document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('key');
    console.log('Value of data parameter:', data);
    getAnimeById(data);

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
    document.getElementById('post-comment-btn').addEventListener('click', function() {
        const commentInput = document.getElementById('comment-input').value;
        if (commentInput.trim() !== '') {
            const commentData = {
                username: username, // Get username from decoded token
                aniid: data, // Use the aniid from the URL params
                comment: commentInput
            };
            postComment(commentData);
        } else {
            // Handle empty comment input
            alert('Please enter a comment before posting.');
        }
    });


    document.getElementById("button1").addEventListener("click", function() {
        window.location.href = "discussions.html";
    });
});

function postComment(commentData) {
    fetch('/api/add_comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentData)
    })
    .then(response => {
        if (response.ok) {
            // Reload the page to display the new comment
            location.reload();
        } else {
            throw new Error('Failed to post comment');
        }
    })
    .catch(error => {
        console.error('Error posting comment:', error);
    });
}

function getAnimeById(aid) {
    fetch(`/api/animeD/${aid}`)
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

            const discussionList = document.getElementById('discussion-list');
            discussionList.innerHTML = ''; // Clear discussion list

            anime.discussions.forEach(discussion => {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');
                commentDiv.innerHTML = `
                    <p class="username">${discussion.username}</p>
                    <p class="comment-text">${discussion.comment}</p>
                    <p class="time">${discussion.reply_time}</p>
                `;
                discussionList.appendChild(commentDiv);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}























// document.addEventListener('DOMContentLoaded', function() {
//     const params = new URLSearchParams(window.location.search);
//     const data = params.get('key');
//     console.log('Value of data parameter:', data);
//     getAnimeById(data);

//     var token = localStorage.getItem('jwtToken');
//     console.log("\n   token: ", token);
//     // Check if token exists
//     if (token) {
//         // Send POST request to decode token
//         fetch('/api/decode_token', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ token: token }) // Send the token to decode
//             })
//             .then(response => response.json())
//             .then(decodedData => {
//                 console.log("Decoded data:", decodedData);
//                 //alert("--------stop---------");
//                 // Access the decoded data and display it on the page
//             //     var userInfoElement = document.getElementById('userInfo');
//             //     userInfoElement.innerHTML = `
//             //     <p>Username: ${decodedData.username}</p>
//             //     <p>Admin Status: ${decodedData.admin}</p>
//             // `;
//                 username = decodedData.username;
//                 admin = decodedData.admin;

//                 // Inserting comment in table based on username and key i.e data

//             })
//             .catch(error => {
//                 console.error('Error decoding token:', error);
//             });
//     } else {
//         console.error('JWT token not found in local storage');
//         // Display error message or redirect to login page if needed
//     }









// });

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
