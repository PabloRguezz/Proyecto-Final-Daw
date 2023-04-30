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
        $datos=$usuario->get_usuario_id($_POST["email"]);
        echo json_encode($datos);
        break;
    case "insert":
        $datos=$usuario->insert_usuario($_POST["email"],$_POST["password"],$_POST["nombre"]);
        echo json_encode("El usuario se ha insertado correctamente");
        break;
    case "update":
        $datos=$usuario->update_usuario($_POST["id"],$_POST["email"],$_POST["password"],$_POST["nombre"]);
        echo json_encode("El usuario se ha actualizado correctamente");
        break;
    case "delete":
        $datos=$usuario->delete_usuario($_POST["id"]);
        echo json_encode("El usuario se ha eliminado correctamente");
        break;
}
switch ($_GET["empresa"]) {
    case 'GetAll':
        $datos=$empresa->get_empresa();
        echo json_encode($datos);
        break;
    case 'GetCif':
        $datos=$empresa->get_empresa_cif($_POST["cif_Empresa"]);
        echo json_encode($datos);
        break;
    case "insert":
        $datos=$empresa->insert_empresa($_POST["cif_Empresa"],$_POST["nombre"],$_POST["tlf_contacto"],$_POST["password"],$_POST["horario"],$_POST["ubicacion"],$_POST["descripcion"]);
        echo json_encode("La empresa se ha insertado correctamente");
        break;
    case "update":
        $datos=$empresa->update_empresa($_POST["cif_Empresa"],$_POST["nombre"],$_POST["tlf_contacto"],$_POST["password"],$_POST["horario"],$_POST["ubicacion"],$_POST["descripcion"]);
        echo json_encode("La empresa se ha actualizado correctamente");
        break;
    case "delete":
        $datos=$empresa->delete_empresa($_POST["cif_Empresa"]);
        echo json_encode("La empresa se ha eliminado correctamente");
        break;
}
?>