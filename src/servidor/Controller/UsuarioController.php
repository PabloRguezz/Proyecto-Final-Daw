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
  if (isset($_POST['insert'])) {
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $telefono = $_POST['telefono'];
    $direccion = $_POST['direccion'];

    $sql = "INSERT INTO Usuario (nombre, apellido, email, password, telefono, direccion) 
            VALUES ('$nombre', '$apellido', '$email', '$password', '$telefono', '$direccion')";

    $result = mysqli_query($conn, $sql);

    if ($result) {
      echo json_encode(['msg' => 'User created successfully!', 'status' => true]);
    } else {
      echo json_encode(['msg' => 'Error creating user!', 'status' => false]);
    }
  }

  // Check for PUT request with 'update' parameter to update an existing user
  if (isset($_PUT['update'])) {
    $id_Usuario = $_PUT['id_Usuario'];
    $nombre = $_PUT['nombre'];
    $apellido = $_PUT['apellido'];
    $email = $_PUT['email'];
    $password = $_PUT['password'];
    $telefono = $_PUT['telefono'];
    $direccion = $_PUT['direccion'];

    $sql = "UPDATE Usuario 
            SET nombre='$nombre', apellido='$apellido', email='$email', password='$password', 
                telefono='$telefono', direccion='$direccion' 
            WHERE id_Usuario = '$id_Usuario'";

    $result = mysqli_query($conn, $sql);

    if ($result) {
        echo json_encode(['msg' => 'User updated successfully!', 'status' => true]);
    } else {
        echo json_encode(['msg' => 'Error updating user!', 'status' => false]);
    }
  }

// Check for DELETE request with 'delete' parameter to delete an existing user
if (isset($_DELETE['delete'])) {
  $id_Usuario = $_DELETE['id_Usuario'];

  $sql = "DELETE FROM Usuario WHERE id_Usuario = '$id_Usuario'";

  $result = mysqli_query($conn, $sql);

  if ($result) {
    echo json_encode(['msg' => 'User deleted successfully!', 'status' => true]);
  } else {
    echo json_encode(['msg' => 'Error deleting user!', 'status' => false]);
  }
}
} 

mysqli_close($conn);
?>