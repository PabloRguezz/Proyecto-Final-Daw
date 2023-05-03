<?php
require_once '../vendor/autoload.php';
require_once '../config/config.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Jwt_Token {
    private static $secret_key = SECRET_KEY; 
    private static $expiration_time = 36000;

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

    public static function verify_token($token){
        try {
            $decoded = JWT::decode($token,new Key(self::$secret_key, 'HS256'));
            return $decoded->data;
        } catch (Exception $e) {
            return false;
        }
    }
}
