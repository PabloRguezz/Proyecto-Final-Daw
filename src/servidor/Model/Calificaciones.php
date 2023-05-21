<?php 
class Calificaciones extends Conexion {
/**
 * Esta función de PHP recupera todos los registros de la tabla "Calificaciones" en una base de datos.
 * 
 * @return una matriz de matrices asociativas, donde cada matriz asociativa representa una fila de la
 * tabla "Calificaciones" en la base de datos.
 */
    public function get_calificaciones() {
      $conectar = parent::connection();
      parent::set_name();
  
      $sql = "SELECT * FROM Calificaciones";
      $sql = $conectar->prepare($sql);
      $sql->execute();
      return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
    }
  
/**
 * Esta función de PHP recupera una fila de la tabla "Calificaciones" en una base de datos basada en la
 * identificación proporcionada.
 * 
 * @param id El parámetro "id" es un número entero que representa el ID de un registro específico de la
 * tabla "Calificaciones" que queremos recuperar.
 * 
 * @return un arreglo de arreglos asociativos que contienen los datos de la tabla Calificaciones para
 * la fila con el id_Calificacion especificado.
 */
    public function get_calificacion_id($id) {
      $conectar = parent::connection();
      parent::set_name();
      $sql = "SELECT * FROM Calificaciones WHERE id_Calificacion=?";
      $sql = $conectar->prepare($sql);
      $sql->bindValue(1,$id);
      $sql->execute();
      return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
    }
/**
 * Esta función de PHP recupera todas las calificaciones para un ID de servicio determinado de una
 * tabla de base de datos y las devuelve en orden descendente por fecha de carga.
 * 
 * @param id El parámetro "id" es un número entero que representa el ID de un servicio del que queremos
 * recuperar las valoraciones correspondientes.
 * 
 * @return una matriz de matrices asociativas, donde cada matriz asociativa representa una fila de la
 * tabla "Calificaciones" en la base de datos que coincide con el parámetro "id_servicio" dado. Las
 * filas están ordenadas por la columna "fecha_subida" en orden descendente.
 */
    public function get_calificacion_servicio($id) {
      $conectar = parent::connection();
      parent::set_name();
      $sql = "SELECT * FROM Calificaciones WHERE id_servicio=? ORDER BY fecha_subida DESC";
      $sql = $conectar->prepare($sql);
      $sql->bindValue(1,$id);
      $sql->execute();
      return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
    }
    
/**
 * Esta función inserta una nueva fila en la tabla "Calificaciones" con los valores proporcionados.
 * 
 * @param nota La calificación numérica dada por el usuario para un servicio en particular.
 * @param descripcion Este parámetro es una cadena que representa la descripción o el comentario de una
 * calificación o reseña. Por lo general, se usa para proporcionar comentarios adicionales o detalles
 * sobre la calificación otorgada por un usuario.
 * @param id_servicio Este parámetro es el ID del servicio para el que se inserta la calificación.
 * @param id_usuario El ID del usuario que envía la calificación.
 * @param fecha_subida Este parámetro representa la fecha en que se cargó/envió la calificación.
 * 
 * @return el resultado de la ejecución de la consulta SQL, que es un arreglo de arreglos asociativos
 * con los datos de la(s) fila(s) insertada(s) en la tabla de Calificaciones. Sin embargo, dado que la
 * consulta es una instrucción INSERT, la matriz devuelta estará vacía.
 */
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
  
/**
 * Esta función actualiza un registro en la tabla "Calificaciones" con los parámetros dados.
 * 
 * @param id El ID de la calificación (rating) que necesita ser actualizado.
 * @param nota El nuevo valor del campo "nota" en la tabla "Calificaciones".
 * @param descripcion Una cadena que describe la calificación otorgada a un servicio por un usuario.
 * @param id_servicio El ID del servicio para el que se actualiza la clasificación.
 * @param id_usuario El ID del usuario que envió la calificación.
 * @param fecha_subida La fecha en que se cargó/envió la calificación.
 * 
 * @return el resultado de la ejecución de la consulta SQL, que es un arreglo de las filas actualizadas
 * en la tabla de Calificaciones. Sin embargo, el código tiene un error en la instrucción SQL, ya que
 * hay una comilla simple adicional después del parámetro para fecha_subida.
 */
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
  
/**
 * Esta función de PHP elimina un registro de la tabla "Calificaciones" en función del ID
 * proporcionado.
 * 
 * @param id El parámetro "id" es el identificador de la Calificacion (rating) que necesita ser borrado
 * de la tabla de la base de datos "Calificaciones".
 * 
 * @return el resultado de la ejecución de la consulta SQL, que es un valor booleano que indica si la
 * eliminación fue exitosa o no. Sin embargo, el código también intenta obtener todas las filas del
 * conjunto de resultados, lo que no es necesario y puede causar errores. Sería mejor simplemente
 * devolver el valor booleano.
 */
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