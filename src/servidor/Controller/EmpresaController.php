<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once '../Model/Conexion.php';
$conn = Conexion::connection();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  // Check for GET request with a specific cif_Empresa
  if (isset($_GET['cif_Empresa'])) {
    $cif_Empresa = $_GET['cif_Empresa'];
    $sql = "SELECT * FROM Empresa WHERE cif_Empresa = '$cif_Empresa'";
  } else {
    $sql = "SELECT * FROM Empresa";
  }

  // Check for GET request with a specific cif_Empresa and password to verify login credentials
  if (isset($_GET['cif_Empresa']) && isset($_GET['password'])) {
    $cif_Empresa = $_GET['cif_Empresa'];
    $password = $_GET['password'];
    $sql = "SELECT * FROM Empresa WHERE cif_Empresa = '$cif_Empresa' AND password = '$password'";
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
  if (!isset($json_obj->cif_Empresa) || !isset($json_obj->nombre) || !isset($json_obj->tlf_contacto) || !isset($json_obj->password) || !isset($json_obj->horario) || !isset($json_obj->ubicacion) || !isset($json_obj->descripcion)) {
    echo json_encode(['msg' => 'Missing fields!', 'status' => false]);
    exit;
  }

  // Extract data from JSON object
  $cif_Empresa = $json_obj->cif_Empresa;
  $nombre = $json_obj->nombre;
  $tlf_contacto = $json_obj->tlf_contacto;
  $password = $json_obj->password;
  $horario = $json_obj->horario;
  $ubicacion = $json_obj->ubicacion;
  $descripcion = $json_obj->descripcion;

  // Check if the CIF already exists in the database
  $checkCifSql = "SELECT * FROM Empresa WHERE cif_Empresa = '$cif_Empresa'";
  $checkCifResult = mysqli_query($conn, $checkCifSql);

  if (mysqli_num_rows($checkCifResult) > 0) {
    echo json_encode(['msg' => 'El CIF ya existe', 'status' => false]);
  } else {
    $insertSql = "INSERT INTO Empresa (cif_Empresa, nombre, tlf_contacto, password, horario, ubicacion, descripcion) VALUES ('$cif_Empresa', '$nombre', '$tlf_contacto', '$password', '$horario', '$ubicacion', '$descripcion')";
    $insertResult = mysqli_query($conn, $insertSql);

    if ($insertResult) {
      echo json_encode(['msg' => 'Company created successfully!', 'status' => true]);
    } else {
      echo json_encode(['msg' => 'Error creating company!', 'status' => false]);
    }
  }
}

// Check for PUT request with 'update' parameter to update an existing company
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
  $cif_Empresa = $_PUT['cif_Empresa'];
  $nombre = $_PUT['nombre'];
  $tlf_contacto = $_PUT['tlf_contacto'];
  $password = $_PUT['password'];
  $horario = $_PUT['horario'];
  $ubicacion = $_PUT['ubicacion'];
  $descripcion = $_PUT['descripcion'];

  $sql = "UPDATE Empresa 
          SET nombre='$nombre', tlf_contacto='$tlf_contacto', password='$password', 
              horario='$horario', ubicacion='$ubicacion', descripcion='$descripcion' 
          WHERE cif_Empresa = '$cif_Empresa'";

  $result = mysqli_query($conn, $sql);

  if ($result) {
      echo json_encode(['msg' => 'Company updated successfully!', 'status' => true]);
  } else {
      echo json_encode(['msg' => 'Error updating company!', 'status' => false]);
  }
}

// Check for DELETE request with 'delete' parameter to delete an existing company
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
  $cif_Empresa = $_DELETE['cif_Empresa'];

  $sql = "DELETE FROM Empresa WHERE cif_Empresa = '$cif_Empresa'";

  $result = mysqli_query($conn, $sql);

  if ($result) {
      echo json_encode(['msg' => 'Company deleted successfully!', 'status' => true]);
  } else {
      echo json_encode(['msg' => 'Error deleting company!', 'status' => false]);
  }
}
mysqli_close($conn);

?>