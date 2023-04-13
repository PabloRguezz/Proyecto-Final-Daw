<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once '../Model/Conexion.php';
$conn = Conexion::connection();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  // Check for GET request with a specific id_Usuario
  if (isset($_GET['id_Usuario'])) {
    $id_Usuario = $_GET['id_Usuario'];
    $sql = "SELECT * FROM Usuario WHERE id_Usuario = '$id_Usuario'";
  } else {
    $sql = "SELECT * FROM Usuario";
  }

  // Check for GET request with a specific email and password to verify login credentials
  if (isset($_GET['email']) && isset($_GET['password'])) {
    $email = $_GET['email'];
    $password = $_GET['password'];
    $sql = "SELECT * FROM Usuario WHERE email = '$email' AND password = '$password'";
  }
  
  // Run query
  $result = mysqli_query($conn, $sql);

  if (mysqli_num_rows($result) > 0) {
    //mysqli_fetch_all gives us the data in 2D array format.
    // It's second parameter decide whether its assoc array or indexed. Or maybe both
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);

    echo json_encode($data);
  } else {
    echo json_encode(['msg' => 'No Data!', 'status' => false]);
  }
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Check for POST request with 'insert' parameter to add a new user
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "INSERT INTO Usuario (nombre, email, password) 
            VALUES ('$nombre', '$email', '$password')";

    $result = mysqli_query($conn, $sql);

    if ($result) {
      echo json_encode(['msg' => 'User created successfully!', 'status' => true]);
    } else {
      echo json_encode(['msg' => 'Error creating user!', 'status' => false]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
  // Check for PUT request with 'update' parameter to update an existing user
  parse_str(file_get_contents("php://input"),$put_vars);
  $id_Usuario = $put_vars['id_Usuario'];
  $nombre = $put_vars['nombre'];
  $email = $put_vars['email'];
  $password = $put_vars['password'];

  $sql = "UPDATE Usuario 
          SET nombre='$nombre', email='$email', password='$password'
          WHERE id_Usuario = '$id_Usuario'";

  $result = mysqli_query($conn, $sql);

  if ($result) {
      echo json_encode(['msg' => 'User updated successfully!', 'status' => true]);
  } else {
      echo json_encode(['msg' => 'Error updating user!', 'status' => false]);
  }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
  // Check for DELETE request with 'delete' parameter to delete an existing user
  parse_str(file_get_contents("php://input"),$delete_vars);
  $id_Usuario = $delete_vars['id_Usuario'];

  $sql = "DELETE FROM Usuario WHERE id_Usuario = '$id_Usuario'";

  $result = mysqli_query($conn, $sql);

  if ($result) {
    echo json_encode(['msg' => 'User deleted successfully!', 'status' => true]);
  } else {
    echo json_encode(['msg' => 'Error deleting user!', 'status' => false]);
  }
}
