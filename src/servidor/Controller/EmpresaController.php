<?php

class EmpresaController {

  private $conn;

  public function __construct($conn) {
    $this->conn = $conn;
  }

  public function handle() {
    switch ($_SERVER['REQUEST_METHOD']) {
      case 'GET':
        $this->handleGet();
        break;

      case 'POST':
        $this->handlePost();
        break;

      case 'PUT':
        $this->handlePut();
        break;

      case 'DELETE':
        $this->handleDelete();
        break;

      default:
        http_response_code(405);
        echo "Método no permitido";
    }
  }

  private function handleGet() {
    if (isset($_GET['cif'])) {
      $stmt = $this->conn->prepare("SELECT * FROM Empresa WHERE cif_Empresa = ?");
      $stmt->bind_param("s", $_GET['cif']);
    } else {
      $stmt = $this->conn->prepare("SELECT * FROM Empresa");
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $empresas = [];
    while ($row = $result->fetch_assoc()) {
      $empresas[] = $row;
    }

    echo json_encode($empresas);
  }

  private function handlePost() {
    $input = json_decode(file_get_contents('php://input'), true);
    $cif_Empresa = $input['cif_Empresa'];
    $nombre = $input['nombre'];
    $tlf_contacto = $input['tlf_contacto'];
    $password = $input['password'];
    $horario = $input['horario'];
    $ubicacion = $input['ubicacion'];
    $descripcion = $input['descripcion'];

    $stmt = $this->conn->prepare('INSERT INTO Empresa (cif_Empresa, nombre, tlf_contacto, password, horario, ubicacion, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)');
    $stmt->bind_param('sssssss', $cif_Empresa, $nombre, $tlf_contacto, $password, $horario, $ubicacion, $descripcion);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
      http_response_code(201);
      echo "Empresa creada";
    } else {
      http_response_code(500);
      echo "Error al crear empresa";
    }
  }

  private function handlePut() {
    if (isset($_GET['cif']) && $_SERVER['REQUEST_METHOD'] === 'PUT') {
      $cif_Empresa = $_GET['cif'];

      $input = json_decode(file_get_contents('php://input'), true);
      $nombre = $input['nombre'];
      $tlf_contacto = $input['tlf_contacto'];
      $password = $input['password'];
      $horario = $input['horario'];
      $ubicacion = $input['ubicacion'];
      $descripcion = $input['descripcion'];

      $stmt = $this->conn->prepare('UPDATE Empresa SET nombre = ?, tlf_contacto = ?, password = ?, horario = ?, ubicacion = ?, descripcion = ? WHERE cif_Empresa = ?');
      $stmt->bind_param('sssssss', $nombre, $tlf_contacto, $password, $horario, $ubicacion, $descripcion, $cif_Empresa);
      $stmt->execute();

      if ($stmt->affected_rows > 0) {
        http_response_code(200);
        echo "Empresa actualizada";
        } else {
        http_response_code(404);
        echo "Empresa no encontrada";
        }
    } else {
        http_response_code(400);
        echo "Petición mal formada";
    }
    }
    private function handleDelete() {
        if (isset($_GET['cif'])) {
        $cif_Empresa = $_GET['cif'];
        $stmt = $this->conn->prepare('DELETE FROM Empresa WHERE cif_Empresa = ?');
        $stmt->bind_param('s', $cif_Empresa);
        $stmt->execute();
      
        if ($stmt->affected_rows > 0) {
          http_response_code(200);
          echo "Empresa eliminada";
        } else {
          http_response_code(404);
          echo "Empresa no encontrada";
        }
      } else {
        http_response_code(400);
        echo "Petición mal formada";
      }      
    }
}