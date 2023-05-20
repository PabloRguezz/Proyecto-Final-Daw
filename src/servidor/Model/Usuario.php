<?php
class Usuario extends Conexion{
  public function get_usuario(){
    $conectar=parent::connection();
    parent::set_name();
    $sql = "SELECT * FROM Usuario";
    $sql=$conectar->prepare($sql);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

  public function get_usuario_id($email){
    $conectar=parent::connection();
    parent::set_name();
    $sql = "SELECT * FROM Usuario WHERE email=?";
    $sql=$conectar->prepare($sql);
    $sql->bindValue(1,$email);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }
  public function insert_usuario($email,$password,$nombre){
    $conectar=parent::connection();
    parent::set_name();
    $nombre_decodificado = urldecode($nombre);
    $nombre = $nombre_decodificado;
    $email_decodificado = urldecode($email);
    $email = $email_decodificado;
    $sql = "SELECT * FROM Usuario WHERE email=?";
    $sql=$conectar->prepare($sql);
    $sql->bindValue(1,$email);
    $sql->execute();
    $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
    if ($resultado) {
        return array("error" => "El email ya está en uso");
    }
    $password_hasheada = password_hash($password, PASSWORD_DEFAULT);
    $sql = "INSERT INTO Usuario(id_usuario,email,password,nombre) VALUES (NULL,?,?,?)";
    $sql=$conectar->prepare($sql);
    $sql->bindValue(1,$email);
    $sql->bindValue(2,$password_hasheada);
    $sql->bindValue(3,$nombre);
    $sql->execute();
    return array("success" => "El usuario se ha insertado correctamente");
}


  public function update_usuario($id,$email,$password,$nombre){
    $conectar=parent::connection();
    parent::set_name();
    if(password_get_info($password)!==0){
      $password_hasheada = $password;
    } else {
      $password_hasheada = password_hash($password, PASSWORD_DEFAULT);
    }
    $sql = "UPDATE Usuario set email='?' , password=?, nombre='?' WHERE id_usuario=?";
    $sql=$conectar->prepare($sql);
    $sql->bindValue(1,$email);
    $sql->bindValue(2,$password_hasheada);
    $sql->bindValue(3,$nombre);
    $sql->bindValue(4,$id);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

  public function delete_usuario($id){
    $conectar=parent::connection();
    parent::set_name();
    $sql = "DELETE FROM Usuario WHERE id_usuario=?";
    $sql=$conectar->prepare($sql);
    $sql->bindValue(1,$id);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }
}
?>
