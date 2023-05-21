<?php
class Empresa_has_Servicios extends Conexion {
/**
 * Esta función de PHP recupera todos los registros de la tabla "Empresa_has_Servicios".
 * 
 * @return una matriz de matrices asociativas, donde cada matriz asociativa representa una fila de la
 * tabla "Empresa_has_Servicios" en la base de datos.
 */
  public function get_empresa_servicio() {
      $conectar = parent::connection();
      parent::set_name();
      $sql = "SELECT * FROM Empresa_has_Servicios";
      $sql = $conectar->prepare($sql);
      $sql->execute();
      return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }
/**
 * Esta función de PHP recupera todos los servicios asociados con una empresa en función de su número
 * de CIF.
 * 
 * @param cif El parámetro "cif" es una variable que representa el CIF (código de identificación
 * fiscal) de una empresa. Se utiliza en la consulta SQL para recuperar todas las filas de la tabla
 * "Empresa_has_Servicios" donde la columna "cif_Empresa" coincide con el valor de "
 * 
 * @return un arreglo de arreglos asociativos con los datos de la tabla "Empresa_has_Servicios" donde
 * la columna "cif_Empresa" coincide con el parámetro de entrada "cif".
 */
  public function get_empresa_servicio_cif($cif) {
      $conectar = parent::connection();
      parent::set_name();
      $sql = "SELECT * FROM Empresa_has_Servicios WHERE cif_Empresa=?";
      $sql = $conectar->prepare($sql);
      $sql->bindValue(1,$cif);
      $sql->execute();
      return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }
/**
 * Esta función de PHP recupera todas las empresas que ofrecen un servicio específico en función del ID
 * del servicio.
 * 
 * @param id_servicio El parámetro "id_servicio" es el ID del servicio del que queremos recuperar la
 * información de la empresa que presta ese servicio.
 * 
 * @return una matriz de matrices asociativas, donde cada matriz asociativa representa una fila de la
 * tabla "Empresa_has_Servicios" en la base de datos que coincide con el "id_servicio" dado.
 */
  public function get_empresa_servicio_service($id_servicio) {
      $conectar = parent::connection();
      parent::set_name();
      $sql = "SELECT * FROM Empresa_has_Servicios WHERE id_servicio=?";
      $sql = $conectar->prepare($sql);
      $sql->bindValue(1,$id_servicio);
      $sql->execute();
      return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }
/**
 * Esta función de PHP inserta una nueva fila en la tabla "Empresa_has_Servicios" con los valores dados
 * de "cif_Empresa" y "id_servicio".
 * 
 * @param cif El CIF (Certificado de Identificación Fiscal) es un número de identificación fiscal
 * utilizado en España para empresas y otras personas jurídicas. Consta de nueve dígitos y una letra.
 * @param id_servicio Este parámetro es un número entero que representa el ID de un servicio que se
 * está insertando en la tabla "Empresa_has_Servicios".
 * 
 * @return el resultado de la ejecución de la consulta SQL, que es un arreglo de arreglos asociativos
 * con los datos de las filas insertadas. Sin embargo, dado que se trata de una consulta INSERT, la
 * matriz devuelta estará vacía.
 */
  public function insert_empresa_servicio($cif, $id_servicio) {
    $conectar = parent::connection();
    parent::set_name();
    $sql = "INSERT INTO Empresa_has_Servicios(cif_Empresa, id_servicio) VALUES (?, ?)";
    $sql = $conectar->prepare($sql);
    $sql->bindValue(1,$cif);
    $sql->bindValue(2,intval($id_servicio));
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

/**
 * Esta función de PHP elimina una fila de una tabla de base de datos llamada "Empresa_has_Servicios"
 * basada en los valores de "cif_Empresa" e "id_servicio".
 * 
 * @param cif El CIF (Certificado de Identificación Fiscal) es un número de identificación fiscal
 * utilizado en España para empresas y otras personas jurídicas. Es similar a un número de IVA o un
 * número de identificación fiscal en otros países.
 * @param id_servicio El id del servicio que se debe eliminar de la tabla "Empresa_has_Servicios".
 * 
 * @return el resultado de la ejecución de la consulta SQL, que es un arreglo de arreglos asociativos
 * con los datos de las filas eliminadas de la tabla "Empresa_has_Servicios". Sin embargo, dado que la
 * consulta es una declaración DELETE, la matriz devuelta estará vacía, ya que no contiene ningún dato.
 */
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
