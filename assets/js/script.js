// Function to handle form submission
function submitRSVP() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var responseValue = document.getElementById('response').value;
    var partySize = document.getElementById('party_size').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/submit_rsvp', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.exists) {
                showModal();
            } else {
                insertRSVP(name, email, responseValue, partySize);
            }
        }
    };
    xhr.send(JSON.stringify({ name: name, email: email, response: responseValue, party_size: partySize }));
}

// Function to display modal
function showModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block"; // Display the modal
}

// Function to close modal
function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none"; // Hide the modal
    window.location.href = "index.html"; // Redirect to index.html
}

// Close the modal when the user clicks anywhere outside of it
window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
        closeModalAndRedirect();
    }
}

// Function to insert new RSVP into the database
function insertRSVP(name, email, response, partySize) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/submit_rsvp', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status == 200) {
            if (response === "Yes") {
                showSuccessModalYes();
            } else if (response === "No") {
                showSuccessModalNo();
            }
        }
    };
    xhr.send(JSON.stringify({ name: name, email: email, response: response, party_size: partySize }));
}

// Function to display success modal for "Yes" response
function showSuccessModalYes() {
    // Implement logic to display success modal for "Yes" response
}

// Function to display success modal for "No" response
function showSuccessModalNo() {
    // Implement logic to display success modal for "No" response
}