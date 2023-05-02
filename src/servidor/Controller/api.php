<?php
header('Access-Control-Allow-Origin: *');

require_once("../config/conexion.php");
require_once("../Model/Usuario.php");
require_once("../Model/Empresa.php");
require_once("../Model/Servicios.php");
require_once("../Model/Calificaciones.php");
require_once("../Model/Empresa_has_Servicios.php");
require_once("../Model/Reserva.php");

$usuario = new Usuario();
$empresa = new Empresa();
$servicios = new Servicios();
$calificaciones = new Calificaciones();
$empresa_has_servicios= new Empresa_has_Servicios();
$reservas = new Reserva();

if (isset($_GET["user"])) {
    switch ($_GET["user"]) {
        case 'GetAll':
            $datos = $usuario->get_usuario();
            echo json_encode($datos);
            break;
        case 'GetEmail':
            $datos=$usuario->get_usuario_id($_GET["email"]);
            echo json_encode($datos);
            break;
        case "insert":
            $datos=$usuario->insert_usuario($_GET["email"],$_GET["password"],$_GET["nombre"]);
            echo json_encode("El usuario se ha insertado correctamente");
            break;
        case "update":
            $datos=$usuario->update_usuario($_GET["id"],$_GET["email"],$_GET["password"],$_GET["nombre"]);
            echo json_encode("El usuario se ha actualizado correctamente");
            break;
        case "delete":
            $datos=$usuario->delete_usuario($_GET["id"]);
            echo json_encode("El usuario se ha eliminado correctamente");
            break;
        case "login":
            $email = $_GET["email"];
            $password = $_GET["password"];
            $user = $usuario->get_usuario_id($email);
            if (!$user) {
                http_response_code(401);
                echo json_encode(array("message" => "Credenciales incorrectas"));
                break;
            }
            if (password_verify($password, $user["password"])) {
                $token = Jwt_Token::generate_token(array("id" => $user["id"], "email" => $email));
                echo json_encode(array("token" => $token));
            } else {
                http_response_code(401);
                echo json_encode(array("message" => "Credenciales incorrectas"));
            }
            break;  
    }      
}
if(isset($_GET["empresa"])){
    switch ($_GET["empresa"]) {
        case 'GetAll':
            $datos = $empresa -> get_empresa();
            echo json_encode($datos);
            break;
        case 'GetCif':
            $datos=$empresa->get_empresa_cif($_GET["cif_Empresa"]);
            echo json_encode($datos);
            break;
        case "insert":
            $datos=$empresa->insert_empresa($_GET["cif_Empresa"],$_GET["nombre"],$_GET["tlf_contacto"],$_GET["password"],$_GET["horario"],$_GET["ubicacion"],$_GET["descripcion"]);
            echo json_encode("La empresa se ha insertado correctamente");
            break;
        case "update":
            $datos=$empresa->update_empresa($_GET["cif_Empresa"],$_GET["nombre"],$_GET["tlf_contacto"],$_GET["password"],$_GET["horario"],$_GET["ubicacion"],$_GET["descripcion"]);
            echo json_encode("La empresa se ha actualizado correctamente");
            break;
        case "delete":
            $datos=$empresa->delete_empresa($_GET["cif_Empresa"]);
            echo json_encode("La empresa se ha eliminado correctamente");
            break;
        case "login":
            $cif = $_GET["cif_Empresa"];
            $password = $_GET["password"];
            $company = $empresa->get_empresa_cif($cif);
            if (!$company) {
                http_response_code(401);
                echo json_encode(array("message" => "Credenciales incorrectas"));
                break;
            }
            if (password_verify($password, $company["password"])) {
                $token = Jwt_Token::generate_token(array("cif_Empresa" => $company["cif_Empresa"], "ubicacion" => $company["ubicacion"]));
                echo json_encode(array("token" => $token));
            } else {
                http_response_code(401);
                echo json_encode(array("message" => "Credenciales incorrectas"));
            }
            break; 
    }
}

if(isset($_GET["servicios"])){
    switch ($_GET["servicios"]) {
        case 'GetAll':
            $datos = $servicios->get_servicios();
            echo json_encode($datos);
            break;
        case 'GetId':
            $datos=$servicios->get_servicio_id($_GET["id_Servicio"]);
            echo json_encode($datos);
            break;
        case "insert":
            $datos=$servicios->insert_servicio($_GET["precio"],$_GET["nombre"],$_GET["descripcion"]);
            echo json_encode("El servicio se ha insertado correctamente");
            break;
        case "update":
            $datos=$servicios->update_servicio($_GET["id_Servicio"],$_GET["nombre"],$_GET["precio"],$_GET["descripcion"]);
            echo json_encode("El servicio se ha actualizado correctamente");
            break;
        case "delete":
            $datos=$servicios->delete_servicio($_GET["id_Servicio"]);
            echo json_encode("El servicio se ha eliminado correctamente");
            break;
    }
}

if(isset($_GET["calificaciones"])){
    switch ($_GET["calificaciones"]) {
        case 'GetAll':
            $datos = $calificaciones->get_calificaciones();
            echo json_encode($datos);
            break;
        case 'GetId':
            $datos=$calificaciones->get_calificacion_id($_GET["id_Calificacion"]);
            echo json_encode($datos);
            break;
        case "insert":
            $datos=$calificaciones->insert_calificacion($_GET["nota"],$_GET["descripcion"],$_GET["id_servicio"],$_GET["id_usuario"]);
            echo json_encode("La calificación se ha insertado correctamente");
            break;
        case "update":
            $datos=$calificaciones->update_calificacion($_GET["id_Calificacion"],$_GET["nota"],$_GET["descripcion"],$_GET["id_servicio"],$_GET["id_usuario"]);
            echo json_encode("La calificación se ha actualizado correctamente");
            break;
        case "delete":
            $datos=$calificaciones->delete_calificacion($_GET["id_Calificacion"]);
            echo json_encode("La calificación se ha eliminado correctamente");
            break;
    }
}
if (isset($_GET["empresa_has_servicios"])) {
    switch ($_GET["empresa_has_servicios"]) {
        case 'get_all':
            $datos = $empresa_has_servicios->get_empresa_servicio();
            echo json_encode($datos);
            break;
        case 'get_by_cif':
            if (isset($_GET["cif_Empresa"])) {
                $datos = $empresa_has_servicios->get_empresa_servicio_cif($_GET["cif_Empresa"]);
                echo json_encode($datos);
            } else {
                http_response_code(400);
                exit(json_encode(array("message" => "Falta el parámetro 'cif_Empresa'")));
            }
            break;
        case 'get_by_id_servicio':
            if (isset($_GET["id_servicio"])) {
                $empresa_has_servicios = new Empresa_has_Servicios();
                $datos = $empresa_has_servicios->get_empresa_servicio_service($_GET["id_servicio"]);
                echo json_encode($datos);
            } else {
                http_response_code(400);
                exit(json_encode(array("message" => "Falta el parámetro 'id_servicio'")));
            }
            break;
        case 'insert':
            if (isset($_GET["cif_Empresa"]) && isset($_GET["id_servicio"])) {
                $empresa_has_servicios = new Empresa_has_Servicios();
                $empresa_has_servicios->insert_empresa_servicio($_GET["cif_Empresa"], $_GET["id_servicio"]);
                echo json_encode("La relación empresa-servicio se ha insertado correctamente");
            } else {
                http_response_code(400);
                exit(json_encode(array("message" => "Faltan parámetros")));
            }
            break;
        case 'delete':
            if (isset($_GET["cif_Empresa"]) && isset($_GET["id_servicio"])) {
                $empresa_has_servicios = new Empresa_has_Servicios();
                $empresa_has_servicios->delete_empresa_servicio($_GET["cif_Empresa"], $_GET["id_servicio"]);
                echo json_encode("La relación empresa-servicio se ha eliminado correctamente.");
            } else {
                echo json_encode(array("message" => "No se proporcionaron los parámetros necesarios."));
            }
            break;
    }
}
if(isset($_GET["reservas"])){
    switch ($_GET["reservas"]) {
        case 'GetAll':
            $datos = $reservas->get_reserva_all();
            echo json_encode($datos);
            break;
        case 'GetId':

            $datos=$reservas->get_reserva($_GET["id_Reserva"]);
            echo json_encode($datos);
            break;
        case 'GetUsuario':
            $datos=$reservas->get_reservas_by_usuario($_GET["id_usuario"]);
            echo json_encode($datos);
            break;
        case "insert":

            $datos=$reservas->insert_reserva($_GET["hora_reserva"],$_GET["nombre_servicio"],$_GET["id_servicio"],$_GET["id_usuario"]);
            echo json_encode("La reserva se ha insertado correctamente");
            break;
        case "update":

            $datos=$reservas->update_reserva($_GET["id_reserva"],$_GET["hora_reserva"],$_GET["nombre_servicio"],$_GET["id_servicio"],$_GET["id_usuario"]);
            echo json_encode("La reserva se ha actualizado correctamente");
            break;
        case "delete":

            $datos=$reservas->delete_reserva($_GET["id_reserva"]);
            echo json_encode("La reserva se ha eliminado correctamente");
            break;
    }
}


?>