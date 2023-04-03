<?php
$host = "localhost";
$dbname = "bookme";
$username = "usuario";
$password = "contraseña";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
    exit;
}

// Obtener todas las empresas
$app->get('/empresas', function ($request, $response, $args) use ($pdo) {
    $stmt = $pdo->query("SELECT * FROM Empresa");
    $empresas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $response->withJson($empresas);
});

// Obtener una empresa por su cif
$app->get('/empresas/{cif}', function ($request, $response, $args) use ($pdo) {
    $stmt = $pdo->prepare("SELECT * FROM Empresa WHERE cif_Empresa = :cif");
    $stmt->bindValue(':cif', $args['cif']);
    $stmt->execute();
    $empresa = $stmt->fetch(PDO::FETCH_ASSOC);
    return $response->withJson($empresa);
});

// Crear una empresa
$app->post('/empresas', function ($request, $response, $args) use ($pdo) {
    $data = $request->getParsedBody();
    $stmt = $pdo->prepare("INSERT INTO Empresa (cif_Empresa, nombre, tlf_contacto, password, horario, ubicacion, descripcion) VALUES (:cif, :nombre, :tlf, :password, :horario, :ubicacion, :descripcion)");
    $stmt->bindValue(':cif', $data['cif']);
    $stmt->bindValue(':nombre', $data['nombre']);
    $stmt->bindValue(':tlf', $data['tlf_contacto']);
    $stmt->bindValue(':password', $data['password']);
    $stmt->bindValue(':horario', $data['horario']);
    $stmt->bindValue(':ubicacion', $data['ubicacion']);
    $stmt->bindValue(':descripcion', $data['descripcion']);
    $stmt->execute();
    return $response->withStatus(201);
});

// Actualizar una empresa
$app->put('/empresas/{cif}', function ($request, $response, $args) use ($pdo) {
    $data = $request->getParsedBody();
    $stmt = $pdo->prepare("UPDATE Empresa SET nombre = :nombre, tlf_contacto = :tlf, password = :password, horario = :horario, ubicacion = :ubicacion, descripcion = :descripcion WHERE cif_Empresa = :cif");
    $stmt->bindValue(':cif', $args['cif']);
    $stmt->bindValue(':nombre', $data['nombre']);
    $stmt->bindValue(':tlf', $data['tlf_contacto']);
    $stmt->bindValue(':password', $data['password']);
    $stmt->bindValue(':horario', $data['horario']);
    $stmt->bindValue(':ubicacion', $data['ubicacion']);
    $stmt->bindValue(':descripcion', $data['descripcion']);
    $stmt->execute();
    return $response->withStatus(204);
});

// Eliminar una empresa
$app->delete('/empresas/{cif}', function ($request, $response,$args) use ($pdo) {
    $stmt = $pdo->prepare("DELETE FROM Empresa WHERE cif_Empresa = :cif");
    $stmt->bindValue(':cif', $args['cif']);
    $stmt->execute();
    return $response->withStatus(204);
    });
// Obtener todos los usuarios
$app->get('/usuarios', function ($request, $response, $args) use ($pdo) {
    $stmt = $pdo->query("SELECT * FROM Usuario");
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $response->withJson($usuarios);
});

// Obtener un usuario por su id
$app->get('/usuarios/{id}', function ($request, $response, $args) use ($pdo) {
    $stmt = $pdo->prepare("SELECT * FROM Usuario WHERE id_usuario = :id");
    $stmt->bindValue(':id', $args['id']);
    $stmt->execute();
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
    return $response->withJson($usuario);
});

// Crear un usuario
$app->post('/usuarios', function ($request, $response, $args) use ($pdo) {
    $data = $request->getParsedBody();
    $stmt = $pdo->prepare("INSERT INTO Usuario (email, password, nombre) VALUES (:email, :password, :nombre)");
    $stmt->bindValue(':email', $data['email']);
    $stmt->bindValue(':password', $data['password']);
    $stmt->bindValue(':nombre', $data['nombre']);
    $stmt->execute();
    return $response->withStatus(201);
});

// Actualizar un usuario
$app->put('/usuarios/{id}', function ($request, $response, $args) use ($pdo) {
    $data = $request->getParsedBody();
    $stmt = $pdo->prepare("UPDATE Usuario SET email = :email, password = :password, nombre = :nombre WHERE id_usuario = :id");
    $stmt->bindValue(':id', $args['id']);
    $stmt->bindValue(':email', $data['email']);
    $stmt->bindValue(':password', $data['password']);
    $stmt->bindValue(':nombre', $data['nombre']);
    $stmt->execute();
    return $response->withStatus(204);
});

// Eliminar un usuario
$app->delete('/usuarios/{id}', function ($request, $response, $args) use ($pdo) {
    $stmt = $pdo->prepare("DELETE FROM Usuario WHERE id_usuario = :id");
    $stmt->bindValue(':id', $args['id']);
    $stmt->execute();
    return $response->withStatus(204);
});
?>

