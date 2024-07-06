function insertUser(udata) {
  // User data to be inserted (example data)
  var userData = {
      "username": "a",
      "name": "tst",
      "bdate": "1990-01-01",
      "joiningDate": "2024-04-30",
      "gender": 1,
      "email": "john@example.com",
      "passkey": "password123",
      "badges": 0
  };
  userData.username = udata.username;
  userData.name = udata.name;
  userData.bdate = udata.bdate;
  userData.joiningDate =  "2001-9-11";
  userData.gender = parseInt(udata.gender);
  userData.email = udata.email;
  userData.passkey = udata.passkey;

  console.log("------------___________________________--------------");
  console.log(userData);
  // Make an AJAX request to the Flask server to insert the user data
  $.ajax({
      url: '/api/usersPOST',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(userData),
      success: function(response) {
          console.log('Success:', response); // Log the response to the console
          // Optionally, perform any actions after successfully inserting the user
          window.location.href = "index.html";
      },
      error: function(xhr, status, error) {
          console.error('Error:', error); // Log the error to the console
          // Optionally, handle the error response
          alert("Wrong Info Entered or User Already Exists (username and passward must be unique)");
      }
  });
}





document.addEventListener('DOMContentLoaded', function() {
  // Get the signup form element
  const signupForm = document.getElementById("signup-form");

  // Add event listener for form submission
  signupForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission behavior

      // Get input values from the form
      const username = document.getElementById('username').value;
      const name = document.getElementById('name').value;
      const bdate = document.getElementById('bdate').value;
      const gender = document.querySelector('input[name="gender"]:checked').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      // perform form validation here (e.g., check for missing fields, validate email format, etc.)
       // Perform form validation
    if (!username || !name || !bdate || !gender || !email || !password || !confirmPassword) {
        alert("All fields are required."); // Display error message for missing fields
        return;
    }
  
    if (password !== confirmPassword) {
        alert("Passwords do not match."); // Display error message for mismatched passwords
        return;
    }

      // Create an object to hold the user data
      const userData = {
          username: username,
          name: name,
          bdate: bdate,
          gender: gender,
          email: email,
          passkey: password,
          confirmPassword: confirmPassword
      };

      // Example: Log the user data to the console
      console.log(userData);

      // Call insertUser function with user data
      insertUser(userData);
  });
});









// // Call the insertUser function to insert a new user
// //insertUser();

// // Get the signup form element
// const signupForm = document.getElementById("signup-form");

// // Add event listener for form submission
// signupForm.addEventListener('submit', (event) => {
//   event.preventDefault(); // Prevent default form submission behavior

//   // Get input values from the form
//   const username = document.getElementById('username').value;
//   const name = document.getElementById('name').value;
//   const bdate = document.getElementById('bdate').value;
//   const gender = document.querySelector('input[name="gender"]:checked').value;
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
//   const confirmPassword = document.getElementById('confirm-password').value;

//   // Optionally, perform form validation here (e.g., check for missing fields, validate email format, etc.)
//   // ...

//   // Create an object to hold the user data
//   const userData = {
//     username: username,
//     name: name,
//     bdate: bdate,
//     gender: gender,
//     email: email,
//     password: password,
//     confirmPassword: confirmPassword
//   };

//   // Example: Log the user data to the console
//   console.log(userData);



//   insertUser(userData);
//   // Add code to send the user data to the server via AJAX (POST request)
//   // This would typically involve making an AJAX request to your Flask server to handle the signup process

//   // Placeholder for successful submission (replace with server-side processing)
//   alert('Sign Up Successful! (placeholder)');

//   // Redirect to another page upon successful completion (replace with desired URL)
//   window.location.href = "home.html";
// });

