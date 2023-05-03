<?php
class Empresa_has_Servicios extends Conexion {
  public function get_empresa_servicio() {
      $conectar = parent::connection();
      parent::set_name();
      $sql = "SELECT * FROM Empresa_has_Servicios";
      $sql = $conectar->prepare($sql);
      $sql->execute();
      return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }
  public function get_empresa_servicio_cif($cif) {
      $conectar = parent::connection();
      parent::set_name();
      $sql = "SELECT * FROM Empresa_has_Servicios WHERE cif_Empresa=?";
      $sql = $conectar->prepare($sql);
      $sql->bindValue(1,$cif);
      $sql->execute();
      return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }
  public function get_empresa_servicio_service($id_servicio) {
      $conectar = parent::connection();
      parent::set_name();
      $sql = "SELECT * FROM Empresa_has_Servicios WHERE id_servicio=?";
      $sql = $conectar->prepare($sql);
      $sql->bindValue(1,$id_servicio);
      $sql->execute();
      return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }
  public function insert_empresa_servicio($cif, $id_servicio) {
    $conectar = parent::connection();
    parent::set_name();
    $sql = "INSERT INTO Empresa_has_Servicios(cif_Empresa, id_servicio) VALUES (?, ?)";
    $sql = $conectar->prepare($sql);
    $sql->bindValue(1,$cif);
    $sql->bindValue(2,$id_servicio);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

  public function delete_empresa_servicio($cif, $id_servicio) {
    $conectar = parent::connection();
    parent::set_name();
    $sql = "DELETE FROM Empresa_has_Servicios WHERE cif_Empresa=? AND id_servicio=?";
    $sql = $conectar->prepare($sql);
    $sql->bindValue(1,$cif);
    $sql->bindValue(2,$id_servicio);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }
}
?>
