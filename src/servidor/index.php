<?php

// Cargar archivo de configuración de la base de datos
require_once('config.php');


function getConnection() {
  $conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

  if ($conn->connect_error) {
    die('Error de conexión: ' . $conn->connect_error);
  }

  return $conn;
}
// Usuario routes
$router->map('GET', '/usuarios', function() {
  $controller = new UsuarioController(getConnection());
  $controller->handle();
});

$router->map('GET', '/usuarios/[i:id]', function($id) {
  $controller = new UsuarioController(getConnection());
  $controller->handle($id);
});

$router->map('POST', '/usuarios', function() {
  $controller = new UsuarioController(getConnection());
  $controller->handle();
});

$router->map('PUT', '/usuarios/[i:id]', function($id) {
  $controller = new UsuarioController(getConnection());
  $controller->handle($id);
});

$router->map('DELETE', '/usuarios/[i:id]', function($id) {
  $controller = new UsuarioController(getConnection());
  $controller->handle($id);
});

// Empresa routes
$router->map('GET', '/empresas', function() {
  $controller = new EmpresaController(getConnection());
  $controller->handle();
});

$router->map('GET', '/empresas/[i:id]', function($id) {
  $controller = new EmpresaController(getConnection());
  $controller->handle($id);
});

$router->map('POST', '/empresas', function() {
  $controller = new EmpresaController(getConnection());
  $controller->handle();
});

$router->map('PUT', '/empresas/[i:id]', function($id) {
  $controller = new EmpresaController(getConnection());
  $controller->handle($id);
});

$router->map('DELETE', '/empresas/[i:id]', function($id) {
  $controller = new EmpresaController(getConnection());
  $controller->handle($id);
});

?>
