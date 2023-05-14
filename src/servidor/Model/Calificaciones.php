<?php 
class Calificaciones extends Conexion {
    public function get_calificaciones() {
      $conectar = parent::connection();
      parent::set_name();
  
      $sql = "SELECT * FROM Calificaciones";
      $sql = $conectar->prepare($sql);
      $sql->execute();
      return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
    }
  
    public function get_calificacion_id($id) {
      $conectar = parent::connection();
      parent::set_name();
      $sql = "SELECT * FROM Calificaciones WHERE id_Calificacion=?";
      $sql = $conectar->prepare($sql);
      $sql->bindValue(1,$id);
      $sql->execute();
      return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
    }
    public function get_calificacion_servicio($id) {
      $conectar = parent::connection();
      parent::set_name();
      $sql = "SELECT * FROM Calificaciones WHERE id_servicio=? ORDER BY fecha_subida DESC";
      $sql = $conectar->prepare($sql);
      $sql->bindValue(1,$id);
      $sql->execute();
      return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function insert_calificacion($nota, $descripcion, $id_servicio, $id_usuario, $fecha_subida) {
      $conectar = parent::connection();
      parent::set_name();
      $sql = "INSERT INTO Calificaciones(nota, descripcion, id_servicio, id_usuario, fecha_subida) VALUES (?, ?, ?, ?,?)";
      $sql = $conectar->prepare($sql);
      $sql->bindValue(1,$nota);
      $sql->bindValue(2,$descripcion);
      $sql->bindValue(3,$id_servicio);
      $sql->bindValue(4,$id_usuario);
      $sql->bindValue(5,$fecha_subida);
      $sql->execute();
      return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
    }
  
    public function update_calificacion($id, $nota, $descripcion, $id_servicio, $id_usuario, $fecha_subida) {
      $conectar = parent::connection();
      parent::set_name();
      $sql = "UPDATE Calificaciones SET nota=?, descripcion='?', id_servicio=?, id_usuario=?, fecha_subida=?' WHERE id_Calificacion=?";
      $sql = $conectar->prepare($sql);
      $sql->bindValue(1,$nota);
      $sql->bindValue(2,$descripcion);
      $sql->bindValue(3,$id_servicio);
      $sql->bindValue(4,$id_usuario);
      $sql->bindValue(5,$id);
      $sql->bindValue(6,$fecha_subida);
      $sql->execute();
      return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
    }
  
    public function delete_calificacion($id) {
      $conectar = parent::connection();
      parent::set_name();
      $sql = "DELETE FROM Calificaciones WHERE id_Calificacion=?";
      $sql = $conectar->prepare($sql);
      $sql->bindValue(1,$id);
      $sql->execute();
      return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
    }
  }
?>  