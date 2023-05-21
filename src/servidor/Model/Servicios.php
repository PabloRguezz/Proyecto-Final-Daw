<?php
class Servicios extends Conexion {
/**
 * Esta función de PHP recupera todos los registros de la tabla "Servicios" en una base de datos y los
 * devuelve como una matriz asociativa.
 * 
 * @return una matriz de matrices asociativas, donde cada matriz asociativa representa una fila de la
 * tabla "Servicios" en la base de datos.
 */
  public function get_servicios() {
    $conectar = parent::connection();
    parent::set_name();

    $sql = "SELECT * FROM Servicios";
    $sql = $conectar->prepare($sql);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

/**
 * Esta función de PHP recupera la información de un servicio de una base de datos en función de su ID.
 * 
 * @param id_servicio El parámetro `id_servicio` es un valor entero que representa el identificador
 * único de un servicio en una tabla de base de datos llamada `Servicios`. La función `get_servicio_id`
 * recupera toda la información relacionada con un servicio específico usando su valor `id_servicio`
 * como filtro en un SQL
 * 
 * @return una matriz de matrices asociativas que contienen la información del servicio con el
 * id_servicio dado.
 */
  public function get_servicio_id($id_servicio) {
    $conectar = parent::connection();
    parent::set_name();
    $sql = "SELECT * FROM Servicios WHERE id_servicio=?";
    $sql = $conectar->prepare($sql);
    $sql->bindValue(1,$id_servicio);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

/**
 * Esta función inserta un nuevo servicio en una tabla de base de datos llamada "Servicios" con un
 * precio, nombre y descripción dados.
 * 
 * @param precio El precio del servicio que se está insertando, como un número entero.
 * @param nombre El nombre del servicio que se inserta en la base de datos.
 * @param descripcion Este parámetro es una cadena que representa la descripción de un servicio.
 * 
 * @return el ID del servicio recién insertado si la inserción fue exitosa y nulo si no fue exitosa.
 */
  public function insert_servicio($precio, $nombre, $descripcion) {
    $conectar = parent::connection();
    parent::set_name();
    $sql = "INSERT INTO Servicios(precio, nombre, descripcion) VALUES (?, ?, ?)";
    $sql = $conectar->prepare($sql);
    $sql->bindValue(1,intval($precio));
    $sql->bindValue(2,$nombre);
    $sql->bindValue(3,$descripcion);
    if ($sql->execute()) {
        $id_servicio = $conectar->lastInsertId();
        return $id_servicio;
    } else {
        return null;
    }
  }
/**
 * Esta función actualiza un servicio en una base de datos con un nuevo precio, nombre y descripción.
 * 
 * @param id_servicio El ID del servicio que necesita ser actualizado.
 * @param precio El precio actualizado del servicio.
 * @param nombre El nombre del servicio que se está actualizando. Se decodifica usando la función
 * rawurldecode() antes de usarse en la consulta SQL.
 * @param descripcion El parámetro "descripcion" es una variable de cadena que representa la
 * descripción de un servicio. Se utiliza en la función "update_servicio" para actualizar la
 * descripción de un servicio en la base de datos. El valor de este parámetro se decodifica usando la
 * función "rawurldecode" antes de usarse en el SQL
 * 
 * @return el resultado de la consulta SQL, que es una matriz de filas que coinciden con el registro
 * actualizado en la tabla "Servicios". Sin embargo, dado que la consulta es una declaración de
 * ACTUALIZACIÓN, es probable que la matriz devuelta esté vacía o contenga solo metadatos sobre la
 * operación de actualización.
 */
  public function update_servicio($id_servicio, $precio, $nombre, $descripcion) {
    $conectar = parent::connection();
    parent::set_name();
    $nombre_decodificado = rawurldecode($nombre);
    $descripcion_decodificado = rawurldecode($descripcion);
    $sql = "UPDATE Servicios SET precio=?, nombre=?, descripcion=? WHERE id_servicio=?";
    $sql = $conectar->prepare($sql);
    $sql->bindValue(1,$precio);
    $sql->bindValue(2,$nombre_decodificado);
    $sql->bindValue(3,$descripcion_decodificado);
    $sql->bindValue(4,$id_servicio);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

/**
 * Esta función de PHP elimina un registro de la tabla "Servicios" en función del "id_servicio"
 * proporcionado.
 * 
 * @param id_servicio El parámetro "id_servicio" es el identificador único del servicio que debe
 * eliminarse de la tabla "Servicios" en la base de datos.
 * 
 * @return el resultado de la ejecución de la consulta SQL, que es un arreglo de arreglos asociativos
 * con los datos de los servicios eliminados. Sin embargo, dado que la consulta es una declaración
 * DELETE, los datos devueltos estarán vacíos (no hay filas para buscar). Por lo tanto, la función debe
 * modificarse para devolver un valor booleano que indique si la eliminación se realizó correctamente o
 * no.
 */
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
