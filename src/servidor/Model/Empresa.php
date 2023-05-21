<?php
class Empresa extends Conexion {
/**
 * Esta función de PHP recupera todos los datos de la tabla "Empresa" en una base de datos.
 * 
 * @return una matriz de matrices asociativas, donde cada matriz asociativa representa una fila de la
 * tabla "Empresa" en la base de datos.
 */
  public function get_empresa() {
    $conectar = parent::connection();
    parent::set_name();
    $sql = "SELECT * FROM Empresa";
    $sql = $conectar->prepare($sql);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

/**
 * Esta función de PHP recupera información sobre una empresa en función de su número CIF de una base
 * de datos.
 * 
 * @param cif El parámetro "cif" es una variable que representa el CIF (código de identificación
 * fiscal) de una empresa. Se utiliza como parámetro en la función "get_empresa_cif" para recuperar
 * información sobre una empresa de una tabla de base de datos denominada "Empresa" en función de su
 * CIF.
 * 
 * @return un arreglo de arreglos asociativos con los datos de la tabla Empresa donde cif_Empresa
 * coincide con el parámetro de entrada .
 */
  public function get_empresa_cif($cif) {
    $conectar = parent::connection();
    parent::set_name();
    $sql = "SELECT * FROM Empresa WHERE cif_Empresa=?";
    $sql = $conectar->prepare($sql);
    $sql->bindValue(1,$cif);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

/**
 * Esta función inserta una nueva empresa en una base de datos si el CIF y el nombre de la empresa aún
 * no están en uso.
 * 
 * @param cif El CIF (código de identificación fiscal) de la empresa que se inserta.
 * @param nombre El nombre de la empresa que se inserta en la base de datos.
 * @param tlf_contacto Este parámetro representa el número de teléfono de la persona de contacto de la
 * empresa.
 * @param password El parámetro de contraseña es una cadena que representa la contraseña de la empresa
 * que se está insertando en la base de datos. Se codificará mediante la función password_hash antes de
 * almacenarse en la base de datos por razones de seguridad.
 * @param horario Es un parámetro que representa las horas de trabajo de la empresa.
 * @param ubicacion El parámetro "ubicacion" en la función "insertar_empresa" se refiere a la ubicación
 * o dirección de la empresa que se está insertando en la base de datos.
 * @param descripcion Este parámetro es una cadena que representa la descripción de la empresa. Es uno
 * de los valores que se insertarán en la tabla Empresa de la base de datos.
 * 
 * @return Si el CIF o el nombre de la empresa ya está en uso, se devuelve una matriz con un mensaje de
 * error. De lo contrario, la función inserta la información de la empresa en la base de datos y
 * devuelve el resultado de la consulta SQL como una matriz asociativa.
 */
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

/**
 * Esta función actualiza la información de una empresa en una base de datos.
 * 
 * @param cif El CIF (Código de Identificación Fiscal) es un número de identificación fiscal utilizado
 * en España para empresas y otras organizaciones. Consta de nueve caracteres, siendo el primero una
 * letra y el último un dígito de control.
 * @param nombre El nombre de la empresa (codificado con rawurlencode)
 * @param tlf_contacto número de teléfono de la persona de contacto de la empresa
 * @param password La contraseña a actualizar para la Empresa (compañía) en la base de datos. Se
 * codifica utilizando el algoritmo PASSWORD_DEFAULT antes de almacenarse en la base de datos.
 * @param horario Es un parámetro de cadena que representa las horas de trabajo de la empresa.
 * @param ubicacion El parámetro "ubicacion" es una variable de cadena que representa la ubicación de
 * una empresa. Se utiliza como parámetro en la función "update_empresa" para actualizar la ubicación
 * de una empresa en la base de datos.
 * @param descripcion El parámetro "descripcion" es una variable de cadena que contiene una descripción
 * de la empresa. Se utiliza en la consulta SQL para actualizar el campo "descripcion" en la tabla
 * "Empresa".
 * 
 * @return un arreglo con el resultado de la consulta SQL ejecutada para actualizar la tabla Empresa en
 * la base de datos. Si hay un error, devolverá una matriz con una clave de "error" y un mensaje.
 */
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

/**
 * Esta función de PHP elimina una fila de una tabla de base de datos llamada "Empresa" según el valor
 * de la columna "cif_Empresa".
 * 
 * @param cif El CIF (código de identificación fiscal) de la Empresa que se desea eliminar de la base
 * de datos.
 * 
 * @return el resultado de la ejecución de la consulta SQL, que es un arreglo de arreglos asociativos
 * con los datos de las filas eliminadas de la tabla "Empresa". Sin embargo, dado que la consulta es
 * una declaración DELETE, la matriz devuelta estará vacía, ya que no recupera ningún dato.
 */

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
