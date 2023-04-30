<?php

require_once("../config/conexion.php");
require_once("../Model/Usuario.php");

$usuario = new Usuario();

switch ($_GET["user"]) {
    case 'GetAll':
        $datos=$usuario->get_usuario();
        echo json_encode($datos);
        break;

}