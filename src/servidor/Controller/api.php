<?php

require_once("../config/conexion.php");
require_once("../Model/Usuario.php");
require_once("../Model/Empresa.php");

$usuario = new Usuario();
$empresa = new Empresa();
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
switch ($_GET["empresa"]) {
    case 'GetAll':
        $datos=$empresa->get_empresa();
        echo json_encode($datos);
        break;
    case 'GetCif':
        $datos=$empresa->get_empresa_cif($body["cif"]);
        echo json_encode($datos);
        break;
    case "insert":
        $datos=$empresa->insert_empresa($body["cif"],$body["nombre"],$body["tlf_contacto"],$body["password"],$body["horario"],$body["ubicacion"],$body["descripcion"]);
        echo json_encode("La empresa se ha insertado correctamente");
        break;
    case "update":
        $datos=$empresa->update_empresa($body["cif"],$body["nombre"],$body["tlf_contacto"],$body["password"],$body["horario"],$body["ubicacion"],$body["descripcion"]);
        echo json_encode("La empresa se ha actualizado correctamente");
        break;
    case "delete":
        $datos=$empresa->delete_empresa($body["cif"]);
        echo json_encode("La empresa se ha eliminado correctamente");
        break;
}
?>