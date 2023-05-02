<?php
class Servicios extends Conexion {
  public function get_servicios() {
    $conectar = parent::connection();
    parent::set_name();

    $sql = "SELECT * FROM Servicios";
    $sql = $conectar->prepare($sql);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

  public function get_servicio_id($id_servicio) {
    $conectar = parent::connection();
    parent::set_name();
    $sql = "SELECT * FROM Servicios WHERE id_servicio=?";
    $sql = $conectar->prepare($sql);
    $sql->bindValue(1,$id_servicio);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

  public function insert_servicio($precio, $nombre, $descripcion) {
    $conectar = parent::connection();
    parent::set_name();
    $sql = "INSERT INTO Servicios(precio, nombre, descripcion) VALUES (?, ?, ?)";
    $sql = $conectar->prepare($sql);
    $sql->bindValue(1,$precio);
    $sql->bindValue(2,$nombre);
    $sql->bindValue(3,$descripcion);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

  public function update_servicio($id_servicio, $precio, $nombre, $descripcion) {
    $conectar = parent::connection();
    parent::set_name();
    $sql = "UPDATE Servicios SET precio=?, nombre=?, descripcion=? WHERE id_servicio=?";
    $sql = $conectar->prepare($sql);
    $sql->bindValue(1,$precio);
    $sql->bindValue(2,$nombre);
    $sql->bindValue(3,$descripcion);
    $sql->bindValue(4,$id_servicio);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

  public function delete_servicio($id_servicio) {
    $conectar = parent::connection();
    parent::set_name();
    $sql = "DELETE FROM Servicios WHERE id_servicio=?";
    $sql = $conectar->prepare($sql);
    $sql->bindValue(1,$id_servicio);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }
}
?>
