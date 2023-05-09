<?php
header('Access-Control-Allow-Origin: *');

require_once("../config/conexion.php");
require_once("../Model/Usuario.php");
require_once("../Model/Empresa.php");
require_once("../Model/Servicios.php");
require_once("../Model/Calificaciones.php");
require_once("../Model/Empresa_has_Servicios.php");
require_once("../Model/Reserva.php");
require_once("../Model/Jwt_Token.php");

$usuario = new Usuario();
$empresa = new Empresa();
$servicios = new Servicios();
$calificaciones = new Calificaciones();
$empresa_has_servicios= new Empresa_has_Servicios();
$reservas = new Reserva();

if (isset($_GET["user"])) {
    switch ($_GET["user"]) {
        case 'GetAll':
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	    $token = str_replace(array('Bearer ', '"'), '', $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            $datos = $usuario->get_usuario();
            echo json_encode($datos);
            break;
        case 'GetEmail':
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	        $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            $datos=$usuario->get_usuario_id($_GET["email"]);
            echo json_encode($datos);
            break;
        case "insert":
            $datos=$usuario->insert_usuario($_GET["email"],$_GET["password"],$_GET["nombre"]);
            echo json_encode("El usuario se ha insertado correctamente");
            break;
        case "update":
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
            $token = str_replace("Bearer ", "", $token);
	    if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            $datos=$usuario->update_usuario($_GET["id"],$_GET["email"],$_GET["password"],$_GET["nombre"]);
            echo json_encode("El usuario se ha actualizado correctamente");
            break;
        case "delete":
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	        $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
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
            if (password_verify($password, $user[0]["password"])) {
                $token = Jwt_Token::generate_token(array("id" => $user[0]["id_usuario"], "email" => $email));
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
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	        $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            $datos = $empresa -> get_empresa();
            echo json_encode($datos);
            break;
        case 'GetCif':
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	    $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            $datos=$empresa->get_empresa_cif($_GET["cif_Empresa"]);
            echo json_encode($datos);
            break;
        case "insert":
            $datos=$empresa->insert_empresa($_GET["cif_Empresa"],$_GET["nombre"],$_GET["tlf_contacto"],$_GET["password"],$_GET["horario"],$_GET["ubicacion"],$_GET["descripcion"]);
            echo json_encode("La empresa se ha insertado correctamente");
            break;
        case "update":
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	    $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            $datos=$empresa->update_empresa($_GET["cif_Empresa"],$_GET["nombre"],$_GET["tlf_contacto"],$_GET["password"],$_GET["horario"],$_GET["ubicacion"],$_GET["descripcion"]);
            echo json_encode("La empresa se ha actualizado correctamente");
            break;
        case "delete":
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	    $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
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
            if (password_verify($password, $company[0]["password"])) {
                $token = Jwt_Token::generate_token(array("cif_Empresa" => $company[0]["cif_Empresa"], "ubicacion" => $company[0]["ubicacion"]));
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
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	    $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            $datos = $servicios->get_servicios();
            echo json_encode($datos);
            break;
        case 'GetId':
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	        $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            $datos=$servicios->get_servicio_id($_GET["id_Servicio"]);
            echo json_encode($datos);
            break;
        case "insert":
            $datos = $servicios->insert_servicio($_GET["precio"], $_GET["nombre"], $_GET["descripcion"]);
            if ($datos!=null) {
                echo json_encode(array("message" => "El servicio se ha insertado correctamente", "id_servicio" => $datos));
            } else {
                echo json_encode(array("message" => "Ha habido un error insertando el servicio"));
            }
            break;
        case "update":
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	    $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            $datos=$servicios->update_servicio($_GET["id_Servicio"],$_GET["nombre"],$_GET["precio"],$_GET["descripcion"]);
            echo json_encode("El servicio se ha actualizado correctamente");
            break;
        case "delete":
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	    $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            $datos=$servicios->delete_servicio($_GET["id_Servicio"]);
            echo json_encode("El servicio se ha eliminado correctamente");
            break;
    }
}

if(isset($_GET["calificaciones"])){
    switch ($_GET["calificaciones"]) {
        case 'GetAll':
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	    $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            $datos = $calificaciones->get_calificaciones();
            echo json_encode($datos);
            break;
        case 'GetId':
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	    $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            $datos=$calificaciones->get_calificacion_id($_GET["id_Calificacion"]);
            echo json_encode($datos);
            break;
        case "insert":
            $datos=$calificaciones->insert_calificacion($_GET["nota"],$_GET["descripcion"],$_GET["id_servicio"],$_GET["id_usuario"]);
            echo json_encode("La calificación se ha insertado correctamente");
            break;
        case "update":
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	    $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            $datos=$calificaciones->update_calificacion($_GET["id_Calificacion"],$_GET["nota"],$_GET["descripcion"],$_GET["id_servicio"],$_GET["id_usuario"]);
            echo json_encode("La calificación se ha actualizado correctamente");
            break;
        case "delete":
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	    $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            $datos=$calificaciones->delete_calificacion($_GET["id_Calificacion"]);
            echo json_encode("La calificación se ha eliminado correctamente");
            break;
    }
}
if (isset($_GET["empresa_has_servicios"])) {
    switch ($_GET["empresa_has_servicios"]) {
        case 'get_all':
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	        $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            $datos = $empresa_has_servicios->get_empresa_servicio();
            echo json_encode($datos);
            break;
        case 'get_by_cif':
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	        $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            if (isset($_GET["cif_Empresa"])) {
                $datos = $empresa_has_servicios->get_empresa_servicio_cif($_GET["cif_Empresa"]);
                echo json_encode($datos);
            } else {
                http_response_code(400);
                exit(json_encode(array("message" => "Falta el parámetro 'cif_Empresa'")));
            }
            break;
        case 'get_by_id_servicio':
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	    $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            if (isset($_GET["id_servicio"])) {
                $datos = $empresa_has_servicios->get_empresa_servicio_service($_GET["id_servicio"]);
                echo json_encode($datos);
            } else {
                http_response_code(400);
                exit(json_encode(array("message" => "Falta el parámetro 'id_servicio'")));
            }
            break;
        case 'insert':
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	        $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            if (isset($_GET["cif_Empresa"]) && isset($_GET["id_servicio"])) {
                $empresa_has_servicios->insert_empresa_servicio($_GET["cif_Empresa"], $_GET["id_servicio"]);
                echo json_encode("La relación empresa-servicio se ha insertado correctamente");
            } else {
                http_response_code(400);
                exit(json_encode(array("message" => "Faltan parámetros")));
            }
            break;
        case 'delete':
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	    $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            if (isset($_GET["cif_Empresa"]) && isset($_GET["id_servicio"])) {
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
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	    $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            $datos = $reservas->get_reserva_all();
            echo json_encode($datos);
            break;
        case 'GetId':
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	    $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            $datos=$reservas->get_reserva($_GET["id_Reserva"]);
            echo json_encode($datos);
            break;
        case 'GetUsuario':
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	    $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            $datos=$reservas->get_reservas_by_usuario($_GET["id_usuario"]);
            echo json_encode($datos);
            break;
        case 'GetServicio':
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
            $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            $datos=$reservas->get_reservas_by_servicio($_GET["id_servicio"]);
            echo json_encode($datos);
            break;
        case "insert":
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	    $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            $datos=$reservas->insert_reserva($_GET["hora_reserva"],$_GET["nombre_servicio"],$_GET["id_servicio"],$_GET["id_usuario"],$_GET["dia_reserva"]);
            echo json_encode("La reserva se ha insertado correctamente");
            break;
        case "update":
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	    $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            $datos=$reservas->update_reserva($_GET["id_reserva"],$_GET["hora_reserva"],$_GET["nombre_servicio"],$_GET["id_servicio"],$_GET["id_usuario"],$_GET["dia_reserva"]);
            echo json_encode("La reserva se ha actualizado correctamente");
            break;
        case "delete":
            $headers = apache_request_headers();
            $token = $headers['Authorization'] ?? null;
	    $token = str_replace("Bearer ", "", $token);
            if (!$token || !Jwt_Token::verify_token($token)) {
                http_response_code(401);
                exit(json_encode(array("message" => "Acceso denegado")));
            }
            $datos=$reservas->delete_reserva($_GET["id_reserva"]);
            echo json_encode("La reserva se ha eliminado correctamente");
            break;
    }
}


?>



