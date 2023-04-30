<?php
class Usuario extends Conexion{
  private $id_usuario;
  private $email;
  private $password;
  private $nombre;
  public function get_usuario(){
    $conectar=parent::connection();
    parent::set_name();
  
    $sql = "SELECT * FROM usuario WHERE id_usuario=2";
    $sql=$conectar->prepare($sql);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }
}
  /*
  public function __construct($id_usuario, $email, $password, $nombre) {
    $this->id_usuario = $id_usuario;
    $this->email = $email;
    $this->password = $password;
    $this->nombre = $nombre;
  }

  public function getIdUsuario() {
    return $this->id_usuario;
  }

  public function getEmail() {
    return $this->email;
  }

  public function getPassword() {
    return $this->password;
  }

  public function getNombre() {
    return $this->nombre;
  }

  public function setEmail($email) {
    $this->email = $email;
  }

  public function setPassword($password) {
    $this->password = $password;
  }

  public function setNombre($nombre) {
    $this->nombre = $nombre;
  }
}
/*
