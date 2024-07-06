document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get username and password from form
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    // Create JSON object with username and password
    var data = {
      "username": username,
      "password": password
    };
    
    // Send POST request to login API
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        // Parse the JSON response to access the token property
        return response.json();
      } else {
        // Login failed, display error message
        return response.json().then(data => {
          document.querySelector('.error-message').textContent = data.message;
          throw new Error(data.message); // Throw an error to be caught by the next catch block
        });
      }
    })
    .then(data => {
      // Access the token property from the parsed JSON response
      var token = data.token;
      
      // Store the token in localStorage
      localStorage.setItem('jwtToken', token);
      
      // Retrieve the token from localStorage and log it
      var obj = localStorage.getItem('jwtToken');
      console.log("\n obj:  ", obj);
      // Send POST request to decode token
      fetch('/api/decode_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: obj }) // Send the token to decode
      })
      .then(response => response.json())
      .then(decodedData => {
        // Access the decoded data from the Python file
        console.log("Decoded data:", decodedData);
        //alert("--------stop---------");
        // Redirect to home page or do other operations with the decoded data
        window.location.href = '/home.html';
      })
      .catch(error => {
        console.error('Error decoding token:', error);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });    
  });
});



// document.addEventListener('DOMContentLoaded', function() {
//   document.getElementById('login-form').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent form submission
    
//     // Get username and password from form
//     var username = document.getElementById('username').value;
//     var password = document.getElementById('password').value;
    
//     // Create JSON object with username and password
//     var data = {
//       "username": username,
//       "password": password
//     };
    
//     fetch('/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     })
//     .then(response => {
//       if (response.ok) {
//         // Parse the JSON response to access the token property
//         return response.json();
//       } else {
//         // Login failed, display error message
//         return response.json().then(data => {
//           document.querySelector('.error-message').textContent = data.message;
//           throw new Error(data.message); // Throw an error to be caught by the next catch block
//         });
//       }
//     })
//     .then(data => {
//       // Access the token property from the parsed JSON response
//       var token = data.token;
      
//       // Store the token in localStorage
//       localStorage.setItem('jwtToken', token);
      
//       // Retrieve the token from localStorage and log it
//       var obj = localStorage.getItem('jwtToken');
//       console.log("\n obj:  ", obj);
    
//       // Redirect to home page
//       window.location.href = '/home.html';
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });    
//   });
// });



// // const loginForm = document.getElementById('login-form');
// // const errorMessage = document.querySelector('.error-message');
// // const signupForm = document.getElementById('signup-form');




// // loginForm.addEventListener('submit', (event) => {
// //   event.preventDefault();

// //   // Simulate form validation (replace with your actual validation logic)
// //   const username = loginForm.username.value;
// //   const password = loginForm.password.value;

// //   if (username === 'admin' && password === 'password') {
// //     // Login successful (replace with your redirection logic)
// //     alert('Login successful!');
// //   } else {
// //     errorMessage.textContent = 'Invalid username or password';
// //   }
  
// // });

// // // signupForm.addEventListener('submit1', (event) => {
// //   // event.preventDefault(); // Prevent default form submission behavior

// //   // // Here, you'll add code to process the form data (username, email, password)
// //   // // This could involve sending the data to a server-side script for validation and account creation.
// //     // errorMessage.textContent = 'Invalid username or password';
// //   // alert('Sign Up Successful! (placeholder)'); // Temporary placeholder for successful submission
// // // });
