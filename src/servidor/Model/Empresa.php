<?php
class Empresa extends Conexion {
  public function get_empresa() {
    $conectar = parent::connection();
    parent::set_name();
    $sql = "SELECT * FROM Empresa";
    $sql = $conectar->prepare($sql);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

  public function get_empresa_cif($cif) {
    $conectar = parent::connection();
    parent::set_name();
    $sql = "SELECT * FROM Empresa WHERE cif_Empresa=?";
    $sql = $conectar->prepare($sql);
    $sql->bindValue(1,$cif);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

  public function insert_empresa($cif, $nombre, $tlf_contacto, $password, $horario, $ubicacion, $descripcion) {
    $conectar = parent::connection();
    parent::set_name();
    $nombre_decodificado = rawurldecode($nombre);
    $sql = "SELECT * FROM Empresa WHERE cif_Empresa=? OR nombre=?";
    $sql=$conectar->prepare($sql);
    $sql->bindValue(1,$cif);
    $sql->bindValue(2,$nombre_decodificado);
    $sql->execute();
    $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
    if ($resultado) {
        return array("error" => "El cif de la empresa o el nombre ya está en uso");
    }
    $password_hasheada = password_hash($password, PASSWORD_DEFAULT);
    $sql = "INSERT INTO Empresa(cif_Empresa, nombre, tlf_contacto, password, horario, ubicacion, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $sql = $conectar->prepare($sql);
    $sql->bindValue(1,$cif);
    $sql->bindValue(2,$nombre_decodificado);
    $sql->bindValue(3,$tlf_contacto);
    $sql->bindValue(4,$password_hasheada);
    $sql->bindValue(5,$horario);
    $sql->bindValue(6,$ubicacion);
    $sql->bindValue(7,$descripcion);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

 public function update_empresa($cif, $nombre, $tlf_contacto, $password, $horario, $ubicacion, $descripcion) {
    $conectar = parent::connection();
    parent::set_name();
    $nombre_decodificado = rawurldecode($nombre);
    $sql = "SELECT * FROM Empresa WHERE nombre=$nombre_decodificado";
    $sql=$conectar->prepare($sql);
    $sql->bindValue(1,$nombre);
    $sql->execute();
    $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
    if ($resultado) {
        return array("error" => "El nombre de la empresa ya está en uso");
    }
    $horario_decodificado = rawurldecode($horario);
    $ubicacion_decodificado = rawurldecode($ubicacion);
    $descripcion_decodificado = rawurldecode($descripcion);
    if (password_needs_rehash($password, PASSWORD_DEFAULT)) {
      $password_hasheada = password_hash($password, PASSWORD_DEFAULT);
  } else {
      $password_hasheada = $password;
  }
  
    $sql = "UPDATE Empresa SET nombre=?, tlf_contacto=?, password=?, horario=?, ubicacion=?, descripcion=? WHERE cif_Empresa=?";
    $sql = $conectar->prepare($sql);
    $sql->bindValue(1, $nombre_decodificado);
    $sql->bindValue(2, $tlf_contacto);
    $sql->bindValue(3, $password_hasheada);
    $sql->bindValue(4, $horario_decodificado);
    $sql->bindValue(5, $ubicacion_decodificado);
    $sql->bindValue(6, $descripcion_decodificado);
    $sql->bindValue(7, $cif);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
}


  public function delete_empresa($cif) {
    $conectar = parent::connection();
    parent::set_name();
    $sql = "DELETE FROM Empresa WHERE cif_Empresa=?";
    $sql = $conectar->prepare($sql);
    $sql->bindValue(1,$cif);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }
}
?>
