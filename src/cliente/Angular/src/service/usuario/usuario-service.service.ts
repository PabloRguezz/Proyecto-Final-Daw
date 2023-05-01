import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

<<<<<<< HEAD
  private apiUrl = 'https://api.alu6852.arkania.es/api.php?user';
=======
  private apiUrl = 'https://api.alu6852.arkania.es?user';
>>>>>>> e8f30f1750e3f34fb5676482439e2ddc182e6cf5

  constructor(private http: HttpClient) { }


  /**
   * This function retrieves users from an API using HTTP GET request.
   * @returns The `getUsuarios()` method is returning an HTTP GET request to the API URL. The exact
   * response will depend on the implementation of the API and the data it returns.
   */
  getUsuarios() {
    return this.http.get(`${this.apiUrl}=GetAll`);
  }
  
  /**
   * This function sends a GET request to the API endpoint for user login with the provided email and
   * password parameters.
   * @param {string} email - A string representing the email address of the user trying to log in.
   * @param {string} password - The password parameter is a string that represents the user's password.
   * It is used in the function to query the API and check if the email and password combination is valid
   * for a user account.
   * @returns an HTTP GET request to the API endpoint for "usuarios" with the specified email and
   * password parameters.
   */
  iniciarSesion(email: string, password : string) {
    return this.http.get(`${this.apiUrl}=GetEmail&email=${email}`);
  }

  /**
   * This function registers a user by sending their name, email, and password to an API endpoint using
   * HTTP POST method.
   * @param {string} nombre - A string representing the name of the user being registered.
   * @param {string} email - The email parameter is a string that represents the email address of the
   * user that is being registered.
   * @param {string} password - The password parameter is a string that represents the user's password.
   * It is used as part of the data that is sent in the HTTP POST request to the API endpoint.
   * @returns The `registrarUsuario` function is returning an HTTP POST request to the API endpoint
   * specified in `this.apiUrl`, with a request body containing the `nombre`, `email`, and `password`
   * parameters passed to the function. The response from the API is not specified in this code snippet,
   * so it is unclear what is being returned to the caller of this function.
   */
  registrarUsuario(nombre: string, email: string, password: string) {
    const body = { nombre, email, password };
    return this.http.get(`${this.apiUrl}=insert&email=${email}&password=${password}`);
  }


  /**
   * This function updates a user's information by sending a PUT request to an API endpoint with the
   * user's ID, name, email, and password.
   * @param {number} id - The ID of the user that needs to be updated.
   * @param {string} nombre - A string representing the updated name of the user.
   * @param {string} email - The email parameter is a string that represents the updated email address
   * for the user.
   * @param {string} password - The `password` parameter is a string that represents the new password
   * that the user wants to set for their account. This parameter is used in the `actualizarUsuario`
   * method to update the user's information in the backend server.
   * @returns The `actualizarUsuario` function is returning an Observable from the Angular `HttpClient`'s
   * `put` method.
   */
  actualizarUsuario(id: number, nombre: string, email: string, password: string) {
    const body = { nombre, email, password };
    return this.http.get(`${this.apiUrl}=update&nombre=${nombre}&email=${email}&password=${password}&id=${id}`);
  }

  /**
   * This function sends a DELETE request to the API endpoint with the specified user ID to delete the
   * user.
   * @param {number} id - The parameter "id" is a number that represents the ID of the user that needs to
   * be deleted.
   * @returns The `eliminarUsuario` function is returning an HTTP DELETE request to the API endpoint with
   * the specified `id` parameter as a query parameter. The response from the API is not being returned
   * in this function.
   */
  eliminarUsuario(id: number) {
<<<<<<< HEAD
    return this.http.delete(`${this.apiUrl}=delete&id=${id}`);
=======
    return this.http.get(`${this.apiUrl}=delete&id=${id}`);
>>>>>>> e8f30f1750e3f34fb5676482439e2ddc182e6cf5
  }
}
