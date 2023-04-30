<?php

require_once("../config/conexion.php");
require_once("../Model/Usuario.php");

$usuario = new Usuario();
$body = json_decode(file_get_contents("php://input"),true);

switch ($_GET["user"]) {
    case 'GetAll':
        $datos=$usuario->get_usuario();
        echo json_encode($datos);
        break;
    case 'GetEmail':
        $datos=$usuario->get_usuario_id($body["email"]);
        echo json_encode($datos);
        break;
    case "insert":
        $datos=$usuario->insert_usuario($body["email"],$body["password"],$body["nombre"]);
        echo json_encode("El usuario se ha insertado correctamente");
        break;
    case "update":
        $datos=$usuario->update_usuario($body["id"],$body["email"],$body["password"],$body["nombre"]);
        echo json_encode("El usuario se ha actualizado correctamente");
        break;
    case "delete":
        $datos=$usuario->delete_usuario($body["id"]);
        echo json_encode("El usuario se ha eliminado correctamente");
        break;
}
?>