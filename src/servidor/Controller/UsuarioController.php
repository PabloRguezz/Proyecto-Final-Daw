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
  // Get JSON object from request body
  $json_str = file_get_contents('php://input');
  $json_obj = json_decode($json_str);

  // Check if all required fields are present in JSON object
  if (!isset($json_obj->nombre) || !isset($json_obj->email) || !isset($json_obj->password)) {
    echo json_encode(['msg' => 'Missing fields!', 'status' => false]);
    exit;
  }

  // Extract data from JSON object
  $nombre = $json_obj->nombre;
  $email = $json_obj->email;
  $password = $json_obj->password;

  // Check if the email already exists in the database
  $checkEmailSql = "SELECT * FROM Usuario WHERE email = '$email'";
  $checkEmailResult = mysqli_query($conn, $checkEmailSql);

  if (mysqli_num_rows($checkEmailResult) > 0) {
    echo json_encode(['msg' => 'El email ya existe', 'status' => false]);
  } else {
    $insertSql = "INSERT INTO Usuario (nombre, email, password) VALUES ('$nombre', '$email', '$password')";
    $insertResult = mysqli_query($conn, $insertSql);
    if ($insertResult) {
      echo json_encode(['msg' => 'Usuario creado correctamente', 'status' => true]);
    } else {
      echo json_encode(['msg' => 'Error creando el usuario', 'status' => false]);
    }
  }
}


if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
  // Check for PUT request with 'update' parameter to update an existing user
  $id_Usuario = $_GET['id_Usuario'];
  $nombre = $_GET['nombre'];
  $email = $_GET['email'];
  $password = $_GET['password'];

  $sql = "UPDATE Usuario SET nombre='$nombre', email='$email', password='$password' WHERE id_Usuario = '$id_Usuario'";

  $result = mysqli_query($conn, $sql);

  if ($result) {
      echo json_encode(['msg' => 'User updated successfully!', 'status' => true]);
  } else {
      echo json_encode(['msg' => 'Error updating user!', 'status' => false]);
  }
} 
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
  // Check for DELETE request with 'delete' parameter to delete an existing use
    $id_Usuario = intval($_GET['id_Usuario']);
    $sql_check = "SELECT * FROM Usuario WHERE id_Usuario = '$id_Usuario'";
    $result_check = mysqli_query($conn, $sql_check);
    if (mysqli_num_rows($result_check) > 0) {
        $sql = "DELETE FROM Usuario WHERE id_Usuario = '$id_Usuario'";
        $result = mysqli_query($conn, $sql);
        if ($result) {
          echo json_encode(['msg' => 'User deleted successfully!', 'status' => true]);
        } else {
          echo json_encode(['msg' => 'Error deleting user!', 'status' => false]);
        }
    } else {
        echo json_encode(['msg' => 'User with specified ID does not exist!', 'status' => false]);
    }
}

