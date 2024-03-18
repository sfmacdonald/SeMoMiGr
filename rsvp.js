<?php
// Database connection
$host = "localhost"; // Change this to your database host
$username = "username"; // Change this to your database username
$password = "password"; // Change this to your database password
$dbname = "WeddingDB"; // Change this to your database name

$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$response = $_POST['response'];
$party_size = isset($_POST['party_size']) ? $_POST['party_size'] : NULL;

// Insert RSVP into database
$sql = "INSERT INTO attendees (name, email, party_size, other_details) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssis", $name, $email, $party_size, $response);
$stmt->execute();
$stmt->close();

$conn->close();

// Redirect back to RSVP form
header("Location: index.php");
exit();
?>
