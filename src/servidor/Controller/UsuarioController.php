<?php
class UsuarioController {
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
    if (isset($_GET['id'])) {
      $stmt = $this->conn->prepare("SELECT * FROM Usuario WHERE id_usuario = ?");
      $stmt->bind_param("i", $_GET['id']);
    } else {
      $stmt = $this->conn->prepare("SELECT * FROM Usuario");
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $usuarios = [];
    while ($row = $result->fetch_assoc()) {
      $usuarios[] = $row;
    }

    echo json_encode($usuarios);
  }

  private function handlePost() {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data || !isset($data['email']) || !isset($data['password']) || !isset($data['nombre'])) {
      http_response_code(400);
      echo "Petición incorrecta";
      return;
    }

    $stmt = $this->conn->prepare("INSERT INTO Usuario (email, password, nombre) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $data['email'], $data['password'], $data['nombre']);

    if (!$stmt->execute()) {
      http_response_code(500);
      echo "Error al crear usuario";
      return;
    }

    $usuarioId = $stmt->insert_id;
    $usuario = ['id_usuario' => $usuarioId, 'email' => $data['email'], 'nombre' => $data['nombre']];
    echo json_encode($usuario);
  }
  private function handlePut() {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['id'])) {
      http_response_code(400);
      echo "El campo 'id' es obligatorio";
      return;
    }

    $stmt = $this->conn->prepare("UPDATE Usuario SET email = ?, password = ?, nombre = ? WHERE id_usuario = ?");
    $stmt->bind_param("sssi", $data['email'], $data['password'], $data['nombre'], $data['id']);
    $stmt->execute();

    if ($stmt->affected_rows == 0) {
      http_response_code(404);
      echo "El usuario con id " . $data['id'] . " no existe";
    } else {
      http_response_code(204);
    }
  }

  private function handleDelete() {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['id'])) {
      http_response_code(400);
      echo "El campo 'id' es obligatorio";
      return;
    }

    $stmt = $this->conn->prepare("DELETE FROM Usuario WHERE id_usuario = ?");
    $stmt->bind_param("i", $data['id']);
    $stmt->execute();

    if ($stmt->affected_rows == 0) {
      http_response_code(404);
      echo "El usuario con id " . $data['id'] . " no existe";
    } else {
      http_response_code(204);
    }
  }

}
