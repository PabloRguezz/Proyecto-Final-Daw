<?php
class Reserva extends Conexion {
/**
 * Esta función PHP recupera todos los registros de la tabla Reserva en una base de datos.
 * 
 * @return una matriz de matrices asociativas, donde cada matriz asociativa representa una fila de la
 * tabla "Reserva" en la base de datos.
 */
public function get_reserva_all() {
    $conectar = parent::connection();
    parent::set_name();
    $sql = "SELECT * FROM Reserva ";
    $stmt = $conectar->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
/**
 * Esta función de PHP recupera una reserva de una base de datos en función de su ID.
 * 
 * @param id_reserva El parámetro "id_reserva" es un valor entero que representa el identificador único
 * de una reserva en una tabla de base de datos denominada "Reserva". Esta función recupera toda la
 * información relacionada con una reserva específica en función de su ID.
 * 
 * @return una matriz de matrices asociativas, donde cada matriz asociativa representa una fila de la
 * tabla "Reserva" en la base de datos que coincide con el "id_reserva" dado.
 */
public function get_reserva($id_reserva) {
  $conectar = parent::connection();
  parent::set_name();

  $sql = "SELECT * FROM Reserva WHERE id_Reserva = ?";
  $stmt = $conectar->prepare($sql);
  $stmt->bindValue(1, $id_reserva, PDO::PARAM_INT);
  $stmt->execute();
  return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

/**
 * Esta función de PHP recupera todas las reservas realizadas por un usuario específico.
 * 
 * @param id_usuario El parámetro "id_usuario" es un valor entero que representa el ID de un usuario
 * para el que queremos recuperar reservas.
 * 
 * @return Esta función devuelve una matriz de matrices asociativas, donde cada matriz asociativa
 * representa una fila de la tabla "Reserva" en la base de datos que tiene un valor de "id_usuario"
 * igual al parámetro  proporcionado.
 */
public function get_reservas_by_usuario($id_usuario) {
  $conectar = parent::connection();
  parent::set_name();

  $sql = "SELECT * FROM Reserva WHERE id_usuario = ?";
  $stmt = $conectar->prepare($sql);
  $stmt->bindValue(1, $id_usuario, PDO::PARAM_INT);
  $stmt->execute();
  return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

/**
 * Esta función de PHP recupera todas las reservas asociadas con un ID de servicio determinado de una
 * base de datos.
 * 
 * @param id_servicio Este parámetro es un valor entero que representa el ID de un servicio. La función
 * recupera todas las reservas asociadas con este ID de servicio de la tabla de la base de datos
 * denominada "Reserva".
 * 
 * @return una matriz de matrices asociativas, donde cada matriz asociativa representa una fila de la
 * tabla "Reserva" en la base de datos que tiene un valor "id_servicio" que coincide con el parámetro
 * de entrada "".
 */
public function get_reservas_by_servicio($id_servicio) {
  $conectar = parent::connection();
  parent::set_name();
  $sql = "SELECT * FROM Reserva WHERE id_servicio = ?";
  $stmt = $conectar->prepare($sql);
  $stmt->bindValue(1, $id_servicio, PDO::PARAM_INT);
  $stmt->execute();
  return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

/**
 * Esta función inserta una nueva reserva en una tabla de base de datos con valores específicos.
 * 
 * @param hora_reserva El tiempo de la reserva.
 * @param nombre_servicio El nombre del servicio que se reserva.
 * @param id_servicio El ID del servicio que se está reservando.
 * @param id_usuario El DNI del usuario que realiza la reserva.
 * @param dia_reserva La fecha de la reserva.
 * 
 * @return El número de filas afectadas por la instrucción SQL INSERT.
 */
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

/**
 * Esta función actualiza una reserva en una base de datos con nueva información.
 * 
 * @param id_reserva El ID de la reserva a actualizar.
 * @param hora_reserva La hora actualizada de la reserva.
 * @param nombre_servicio El nombre del servicio que se reserva.
 * @param id_servicio El ID del servicio que se está reservando.
 * @param id_usuario El DNI del usuario que realizó la reserva.
 * @param dia_reserva La fecha de la reserva.
 * 
 * @return el número de filas afectadas por la consulta de actualización.
 */
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

/**
 * Esta función de PHP elimina una reserva de una base de datos en función de su ID.
 * 
 * @param id_reserva El parámetro id_reserva es un valor entero que representa el identificador único
 * de una reserva que debe eliminarse de la tabla Reserva en una base de datos.
 * 
 * @return El número de filas afectadas por la operación de eliminación.
 */
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