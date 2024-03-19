<?php
// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $response = $_POST["response"];
    $party_size = $_POST["party_size"];

    // Validate form data (you can add more validation here)
    if (empty($name) || empty($email) || empty($response)) {
        echo "Please fill in all required fields.";
        exit;
    }

    // Connect to your MySQL database
    $conn = new mysqli("localhost", "username", "password", "WeddingDB");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare SQL statement to insert RSVP into database
    $stmt = $conn->prepare("INSERT INTO rsvps (name, email, response, party_size) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sssi", $name, $email, $response, $party_size);

    // Execute SQL statement
    if ($stmt->execute()) {
        // Close statement and connection
        $stmt->close();
        $conn->close();

        // Send email notification to admin
        $to = "seanfmacdonald@icloud.com","alisonlapham@live.com";
        $subject = "New Wedding RSVP Submitted!";
        $message = "A new RSVP for your wedding has been submitted:\n\nName: $name\nEmail: $email\nResponse: $response\nParty Size: $party_size";
        $headers = "seanfmacdonald@icloud.com", "alisonlapham@live.com";

        // Send email
        mail($to, $subject, $message, $headers);

        // Display success message
        echo "RSVP submitted successfully. Thank you!";
    } else {
        echo "Error: " . $stmt->error;
    }
} else {
    // If form is not submitted, redirect to RSVP page
    header("Location: rsvp.html");
    exit;
}
?>
