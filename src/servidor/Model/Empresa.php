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
    $sql = "SELECT * FROM Empresa WHERE cif_Empresa='?'";
    $sql = $conectar->prepare($sql);
    $sql->bindValue(1,$cif);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

  public function insert_empresa($cif, $nombre, $tlf_contacto, $password, $horario, $ubicacion, $descripcion) {
    $conectar = parent::connection();
    parent::set_name();
    $sql = "INSERT INTO Empresa(cif_Empresa, nombre, tlf_contacto, password, horario, ubicacion, descripcion) VALUES ('?', '?', ?, '?', '?', '?', '?')";
    $sql = $conectar->prepare($sql);
    $sql->bindValue(1,$cif);
    $sql->bindValue(2,$nombre);
    $sql->bindValue(3,$tlf_contacto);
    $sql->bindValue(4,$password);
    $sql->bindValue(5,$horario);
    $sql->bindValue(6,$ubicacion);
    $sql->bindValue(7,$descripcion);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

  public function update_empresa($cif, $nombre, $tlf_contacto, $password, $horario, $ubicacion, $descripcion) {
    $conectar = parent::connection();
    parent::set_name();
    $sql = "UPDATE Empresa SET nombre='?', tlf_contacto=?, password='?', horario='?', ubicacion='?', descripcion='?' WHERE cif_Empresa='?'";
    $sql = $conectar->prepare($sql);
    $sql->bindValue(1,$nombre);
    $sql->bindValue(2,$tlf_contacto);
    $sql->bindValue(3,$password);
    $sql->bindValue(4,$horario);
    $sql->bindValue(5,$ubicacion);
    $sql->bindValue(6,$descripcion);
    $sql->bindValue(7,$cif);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

  public function delete_empresa($cif) {
    $conectar = parent::connection();
    parent::set_name();
    $sql = "DELETE FROM Empresa WHERE cif_Empresa='?'";
    $sql = $conectar->prepare($sql);
    $sql->bindValue(1,$cif);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }
}
?>
