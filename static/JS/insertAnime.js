const form = document.getElementById('anime-form');
const message = document.getElementById('message');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

 var animeData = {
    name : document.getElementById('name').value,
  description : document.getElementById('description').value,
  ageRestriction : parseInt( document.getElementById('age_restriction').value),
  releaseDate : document.getElementById('releasedate').value,
  released : document.getElementById('released').checked ? 1 : 0 // Convert checkbox checked state to 1 or 0
  }
  console.log("\n-----------------------------------");
  fetch('/api/add_anime', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(animeData)
})
    .then(response => {
        if (response.ok) {
            //print("\n response: ",response);
            location.reload();
        } else {
            throw new Error('Failed to post anime');
        }
    })
    .catch(error => {
        console.error('Error posting anime:', error);
    });
});
