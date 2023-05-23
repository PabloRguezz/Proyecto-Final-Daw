<?php
class Usuario extends Conexion{
/**
 * Esta función de PHP recupera todos los usuarios de una tabla de base de datos llamada "Usuario".
 * 
 * @return una matriz de matrices asociativas, donde cada matriz asociativa representa una fila de la
 * tabla "Usuario" en la base de datos.
 */
  public function get_usuario(){
    $conectar=parent::connection();
    parent::set_name();
    $sql = "SELECT * FROM Usuario";
    $sql=$conectar->prepare($sql);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

/**
 * Esta función de PHP recupera la ID de usuario de la base de datos en función de su dirección de
 * correo electrónico.
 * 
 * @param email El correo electrónico del usuario cuyo ID se está recuperando de la tabla "Usuario".
 * 
 * @return una matriz de matrices asociativas que contienen la información del usuario con la dirección
 * de correo electrónico especificada.
 */
  public function get_usuario_id($email){
    $conectar=parent::connection();
    parent::set_name();
    $sql = "SELECT * FROM Usuario WHERE email=?";
    $sql=$conectar->prepare($sql);
    $sql->bindValue(1,$email);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }
/**
 * Esta función inserta un nuevo usuario en una base de datos, verifica si el correo electrónico ya
 * está en uso y codifica la contraseña antes de la inserción.
 * 
 * @param email El correo electrónico del usuario que se insertará en la base de datos.
 * @param password La contraseña que el usuario desea establecer para su cuenta.
 * @param nombre El nombre del usuario que se inserta en la base de datos.
 * 
 * @return una matriz con un mensaje de "error" si el correo electrónico ya está en uso, o un mensaje
 * de "éxito" si el usuario se insertó correctamente.
 */
  public function insert_usuario($email,$password,$nombre){
    $conectar=parent::connection();
    parent::set_name();
    $sql = "SELECT * FROM Usuario WHERE email=?";
    $sql=$conectar->prepare($sql);
    $sql->bindValue(1,$email);
    $sql->execute();
    $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
    if ($resultado) {
        return array("error" => "El email ya está en uso");
    }
    $password_hasheada = password_hash($password, PASSWORD_DEFAULT);
    $sql = "INSERT INTO Usuario(id_usuario,email,password,nombre) VALUES (NULL,?,?,?)";
    $sql=$conectar->prepare($sql);
    $sql->bindValue(1,$email);
    $sql->bindValue(2,$password_hasheada);
    $sql->bindValue(3,$nombre);
    $sql->execute();
    return array("success" => "El usuario se ha insertado correctamente");
}

/**
 * Esta función actualiza el correo electrónico, la contraseña y el nombre de un usuario en una base de
 * datos, al mismo tiempo que verifica la unicidad del correo electrónico y actualiza la contraseña si
 * es necesario.
 * 
 * @param id El ID del usuario que se va a actualizar.
 * @param email El nuevo correo electrónico para actualizar para el usuario.
 * @param password La contraseña que se actualizará para el usuario.
 * @param nombre El nombre del usuario que se está actualizando.
 * 
 * @return Si el correo electrónico ya está en uso, se devuelve una matriz con un mensaje de error. De
 * lo contrario, la función actualiza el correo electrónico, la contraseña y el nombre del usuario en
 * la base de datos y devuelve el resultado de la consulta de actualización como una matriz.
 */

  public function update_usuario($id,$email,$password,$nombre){
    $conectar=parent::connection();
    parent::set_name(); 
    $email_decodificado = rawurldecode($email);
    $sql = "SELECT * FROM Usuario WHERE email=?";
    $sql=$conectar->prepare($sql);
    $sql->bindValue(1,$email_decodificado);
    $sql->execute();
    $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
    if ($resultado) {
        return array("error" => "El email ya está en uso");
    }   
    $nombre_decodificado = rawurldecode($nombre);
    if (password_needs_rehash($password, PASSWORD_DEFAULT)) {
      $password_hasheada = password_hash($password, PASSWORD_DEFAULT);
  } else {
      $password_hasheada = $password;
  }
  
    $sql = "UPDATE Usuario set email=? , password=?, nombre=? WHERE id_usuario=?";
    $sql=$conectar->prepare($sql);
    $sql->bindValue(1,$email_decodificado);
    $sql->bindValue(2,$password_hasheada);
    $sql->bindValue(3,$nombre_decodificado);
    $sql->bindValue(4,$id);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }

/**
 * Esta función de PHP elimina a un usuario de una base de datos en función de su ID.
 * 
 * @param id El parámetro "id" es el identificador único del usuario que debe eliminarse de la tabla
 * "Usuario" en la base de datos.
 * 
 * @return el resultado de la ejecución de la consulta SQL, que es una matriz de matrices asociativas
 * con los datos de los usuarios eliminados. Sin embargo, dado que la consulta es una declaración
 * DELETE, no debería haber datos para devolver, por lo que la función probablemente debería devolver
 * un valor booleano que indique si la eliminación se realizó correctamente o no.
 */
  public function delete_usuario($id){
    $conectar=parent::connection();
    parent::set_name();
    $sql = "DELETE FROM Usuario WHERE id_usuario=?";
    $sql=$conectar->prepare($sql);
    $sql->bindValue(1,$id);
    $sql->execute();
    return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
  }
}
?>
