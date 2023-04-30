<?php
class Usuario extends Conexion{
  public function get_usuario(){
    $conectar=parent::connection();
    parent::set_name();
  
    $sql = "SELECT * FROM usuario";
    $sql=$conectar->prepare($sql);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

  public function get_usuario_id($email){
    $conectar=parent::connection();
    parent::set_name();
    $sql = "SELECT * FROM usuario WHERE email=?";
    $sql=$conectar->prepare($sql);
    $sql->bindValue(1,$email);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

  public function insert_usuario($email,$password,$nombre){
    $conectar=parent::connection();
    parent::set_name();
    $sql = "INSERT INTO usuario(id_usuario,email,password,nombre) VALUES (NULL,?,?,?)";
    $sql=$conectar->prepare($sql);
    $sql->bindValue(1,$email);
    $sql->bindValue(2,$password);
    $sql->bindValue(3,$nombre);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

  public function update_usuario($id,$email,$password,$nombre){
    $conectar=parent::connection();
    parent::set_name();
    $sql = "UPDATE usuario set email=? , pasword=?, nombre=? WHERE id_usuario=?";
    $sql=$conectar->prepare($sql);
    $sql->bindValue(1,$email);
    $sql->bindValue(2,$password);
    $sql->bindValue(3,$nombre);
    $sql->bindValue(4,$id);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

  public function delete_usuario($id){
    $conectar=parent::connection();
    parent::set_name();
    $sql = "DELETE FROM usuario WHERE id_usuario=?";
    $sql=$conectar->prepare($sql);
    $sql->bindValue(1,$id);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }
}
?>