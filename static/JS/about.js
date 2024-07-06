// // Function to handle form submission
// function submitForm(event) {
//     event.preventDefault(); // Prevent default form submission behavior

//     // Get form data
//     const formData = new FormData(document.getElementById('contact-form'));
    
//     // Convert form data to JSON
//     const data = {};
//     formData.forEach((value, key) => {
//         data[key] = value;
//     });

//     // Replace this with your actual API endpoint
//     const apiUrl = 'http://your-api-endpoint.com/contact';

//     // Send POST request to API endpoint
//     fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Failed to submit form');
//         }
//         // Handle success response
//         alert('Message sent successfully!');
//         document.getElementById('contact-form').reset(); // Clear form fields
//     })
//     .catch(error => {
//         console.error('Error submitting form:', error.message);
//         alert('Failed to send message. Please try again later.');
//     });
// }

// // Add event listener to form submission
// document.getElementById('contact-form').addEventListener('submit', submitForm);