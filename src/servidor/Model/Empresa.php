<?php
class Empresa {
    private $id_empresa;
    private $nombre;
    private $direccion;
    private $telefono;
    private $email;
  
    public function __construct($id_empresa, $nombre, $direccion, $telefono, $email) {
      $this->id_empresa = $id_empresa;
      $this->nombre = $nombre;
      $this->direccion = $direccion;
      $this->telefono = $telefono;
      $this->email = $email;
    }
  
    public function getIdEmpresa() {
      return $this->id_empresa;
    }
  
    public function getNombre() {
      return $this->nombre;
    }
  
    public function setNombre($nombre) {
      $this->nombre = $nombre;
    }
  
    public function getDireccion() {
      return $this->direccion;
    }
  
    public function setDireccion($direccion) {
      $this->direccion = $direccion;
    }
  
    public function getTelefono() {
      return $this->telefono;
    }
  
    public function setTelefono($telefono) {
      $this->telefono = $telefono;
    }
  
    public function getEmail() {
      return $this->email;
    }
  
    public function setEmail($email) {
      $this->email = $email;
    }
  
    public function toArray() {
      return [
        'id_empresa' => $this->id_empresa,
        'nombre' => $this->nombre,
        'direccion' => $this->direccion,
        'telefono' => $this->telefono,
        'email' => $this->email
      ];
    }
  }
  