<?php
include 'config.php';
class Conexion {
    protected $dbh;
    protected function connection(){
        try {
            $conn = $this->dbh = new PDO("mysql:local="+DB_HOST+";dbname="+DB_NAME+", "+DB_USER+", "+DB_PASSWORD+"");
            return $conn;
        } catch (Exception $e) {
            print "Connection failed: " .$e->getMessage()."<br>";
            die();
        }
    }

    protected function set_name(){
        return $this->dbh->query("SET NAMES 'utf8'");
    }
}
?>