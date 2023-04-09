<?php
class Usuario {
  private $id_usuario;
  private $email;
  private $password;
  private $nombre;

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
