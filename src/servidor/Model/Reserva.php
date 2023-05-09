<?php
class Reserva extends Conexion {
public function get_reserva_all() {
    $conectar = parent::connection();
    parent::set_name();
    $sql = "SELECT * FROM Reserva ";
    $stmt = $conectar->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
public function get_reserva($id_reserva) {
  $conectar = parent::connection();
  parent::set_name();

  $sql = "SELECT * FROM Reserva WHERE id_Reserva = ?";
  $stmt = $conectar->prepare($sql);
  $stmt->bindValue(1, $id_reserva, PDO::PARAM_INT);
  $stmt->execute();
  return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

public function get_reservas_by_usuario($id_usuario) {
  $conectar = parent::connection();
  parent::set_name();

  $sql = "SELECT * FROM Reserva WHERE id_usuario = ?";
  $stmt = $conectar->prepare($sql);
  $stmt->bindValue(1, $id_usuario, PDO::PARAM_INT);
  $stmt->execute();
  return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

public function get_reservas_by_servicio($id_servicio) {
  $conectar = parent::connection();
  parent::set_name();
  $sql = "SELECT * FROM Reserva WHERE id_servicio = ?";
  $stmt = $conectar->prepare($sql);
  $stmt->bindValue(1, $id_servicio, PDO::PARAM_INT);
  $stmt->execute();
  return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

public function insert_reserva($hora_reserva, $nombre_servicio, $id_servicio, $id_usuario, $dia_reserva) {
  $conectar = parent::connection();
  parent::set_name();
  $sql = "INSERT INTO Reserva(hora_reserva, nombre_servicio, id_servicio, id_usuario, dia_reserva) VALUES (?, ?, ?, ?, ?)";
  $stmt = $conectar->prepare($sql);
  $stmt->bindValue(1, $hora_reserva);
  $stmt->bindValue(2, $nombre_servicio, PDO::PARAM_STR);
  $stmt->bindValue(3, $id_servicio, PDO::PARAM_INT);
  $stmt->bindValue(4, $id_usuario, PDO::PARAM_INT);
  $stmt->bindValue(5, $dia_reserva);
  $stmt->execute();
  return $stmt->rowCount();
}

public function update_reserva($id_reserva, $hora_reserva, $nombre_servicio, $id_servicio, $id_usuario, $dia_reserva) {
  $conectar = parent::connection();
  parent::set_name();
  $sql = "UPDATE Reserva SET hora_reserva=?, nombre_servicio='?', id_servicio=?, id_usuario=?, dia_reserva=? WHERE id_Reserva=?";
  $stmt = $conectar->prepare($sql);
  $stmt->bindValue(1, $hora_reserva);
  $stmt->bindValue(2, $nombre_servicio, PDO::PARAM_STR);
  $stmt->bindValue(3, $id_servicio, PDO::PARAM_INT);
  $stmt->bindValue(4, $id_usuario, PDO::PARAM_INT);
  $stmt->bindValue(5, $id_reserva, PDO::PARAM_INT);
  $stmt->bindValue(6, $dia_reserva);
  $stmt->execute();
  return $stmt->rowCount();
}

public function delete_reserva($id_reserva) {
  $conectar = parent::connection();
  parent::set_name();
  $sql = "DELETE FROM Reserva WHERE id_Reserva=?";
  $stmt = $conectar->prepare($sql);
  $stmt->bindValue(1, $id_reserva, PDO::PARAM_INT);
  $stmt->execute();
  return $stmt->rowCount();
}

}

?>