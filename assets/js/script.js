// Function to handle form submission
function submitRSVP() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var responseValue = document.getElementById('response').value;

    // Perform AJAX request to check if RSVP already exists
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'check_rsvp.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.exists) {
                // Display modal if RSVP already exists
                showModal();
            } else {
                // If RSVP doesn't exist, proceed with insertion
                insertRSVP(name, email, responseValue);
            }
        }
    };
    xhr.send(JSON.stringify({ name: name, email: email }));
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
function insertRSVP(name, email, response) {
    // Perform AJAX request to insert RSVP into the database
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'insert_rsvp.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        // Handle response after inserting RSVP
        if (xhr.status == 200) {
            // Optionally, display a success message or redirect to a thank you page
            if (response === "Yes") {
                showSuccessModalYes();
            } else if (response === "No") {
                showSuccessModalNo();
            }
        }
    };
    xhr.send(JSON.stringify({ name: name, email: email, response: response }));
}

// Function to display success modal for "Yes" response
function showSuccessModalYes() {
    // Implement logic to display success modal for "Yes" response
}

// Function to display success modal for "No" response
function showSuccessModalNo() {
    // Implement logic to display success modal for "No" response
}