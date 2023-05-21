<?php
require_once '../vendor/autoload.php';
require_once '../config/config.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Jwt_Token {
    private static $secret_key = SECRET_KEY; 
    private static $expiration_time = 36000;

/**
 * Esta función de PHP genera un token JWT con una carga útil que contiene datos específicos y tiempo
 * de vencimiento.
 * 
 * @param data El parámetro de datos son los datos de carga útil que se codificarán en el token JWT.
 * Puede ser cualquier dato que deba transmitirse de forma segura entre el servidor y el cliente. Estos
 * datos se pueden utilizar para identificar al usuario, almacenar información de la sesión o cualquier
 * otra información relevante.
 * 
 * @return un token web JSON (JWT) codificado con la carga útil, la clave secreta y el algoritmo
 * proporcionados. La carga útil incluye el emisor, la audiencia, la fecha de emisión, la hora de
 * vencimiento y los datos.
 */
    public static function generate_token($data){
        $payload = array(
            "iss" => "https://api.alu6852.arkania.es", 
            "aud" => "https://bookme.alu6852.arkania.es",
            "iat" => time(),
            "exp" => time() + self::$expiration_time,
            "data" => $data
        );

        return JWT::encode($payload, self::$secret_key, 'HS256');
    }

/**
 * Esta función verifica un token JWT usando una clave secreta y devuelve los datos decodificados o
 * falsos si el token no es válido.
 * 
 * @param token El token que se va a verificar. Se espera que sea una cadena codificada JSON Web Token
 * (JWT).
 * 
 * @return Si el token se decodifica con éxito, se devuelven los datos contenidos en el token. Si la
 * decodificación falla, se devuelve falso.
 */
    public static function verify_token($token){
        try {
            $decoded = JWT::decode($token,new Key(self::$secret_key, 'HS256'));
            return $decoded->data;
        } catch (Exception $e) {
            return false;
        }
    }
}
