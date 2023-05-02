<?php
require_once '../vendor/autoload.php';
require_once '../config/config.php';

use Firebase\JWT\JWT;

class Jwt_Token {
    private static $secret_key = SECRET_KEY; 
    private static $expiration_time = 36000;

    public static function generate_token($data){
        $payload = array(
            "iss" => "https://api.alu6852.arkania.es", 
            "aud" => "http://localhost:4200",
            "iat" => time(),
            "exp" => time() + self::$expiration_time,
            "data" => $data
        );

        return JWT::encode($payload, self::$secret_key, 'HS256');
    }

    public static function verify_token($token){
        try {
            $decoded = JWT::decode($token, self::$secret_key, array('HS256'));
            return $decoded->data;
        } catch (Exception $e) {
            return false;
        }
    }
}