<?php
header('Access-Control-Allow-Origin: *');

require_once("../config/conexion.php");
require_once("../Model/Usuario.php");
require_once("../Model/Empresa.php");

$usuario = new Usuario();
$empresa = new Empresa();

switch ($_GET["user"]) {
    case 'GetAll':
        $headers = apache_request_headers();
        $token = $headers['Authorization'] ?? null;
        if (!$token || !Jwt_Token::verify_token($token)) {
            http_response_code(401);
            exit(json_encode(array("message" => "Acceso denegado")));
        }
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
switch ($_GET["empresa"]) {
    case 'GetAll':
        $datos=$empresa->get_empresa();
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
}
?>