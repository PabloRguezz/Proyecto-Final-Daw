import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  apiUrl = 'https://api.alu6852.arkania.es/api.php?empresa';

  constructor(private http: HttpClient) { }

/**
 * Esta función devuelve un observable que recupera todas las empresas con un token de autorización en
 * los encabezados.
 * @returns Un Observable que realiza una solicitud HTTP GET al extremo de la API especificado por
 * `this.apiUrl` con el parámetro de consulta `=GetAll` e incluye un encabezado de autorización con un
 * token de portador recuperado del almacenamiento local. La respuesta de la API se devuelve como
 * resultado del Observable.
 */
  obtenerEmpresas(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetAll`, { headers });
  }

/**
 * Esta función devuelve un observable que recupera el CIF (número de identificación fiscal) de una
 * empresa mediante un extremo de la API y un token de autorización.
 * @param {string} cif_Empresa - una cadena que representa el CIF (código de identificación fiscal) de
 * una empresa. Esta función se utiliza para realizar una solicitud HTTP GET a un extremo de la API
 * para recuperar información sobre una empresa en función de su CIF. La función devuelve un Observable
 * al que se puede suscribir para recibir la respuesta de la API. El
 * @returns Un Observable que realiza una solicitud HTTP GET al extremo de la API con el CIF (número de
 * identificación fiscal) especificado de una empresa e incluye un encabezado de Autorización con un
 * token de portador recuperado del almacenamiento local.
 */
  obtenerEmpresaCif(cif_Empresa: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=GetCif&cif_Empresa=${cif_Empresa}`, { headers });
  }
/**
 * Esta función agrega una nueva empresa a la base de datos con la información proporcionada.
 * @param {string} cif_Empresa - una cadena que representa el CIF (código de identificación fiscal) de
 * la empresa que se agrega
 * @param {string} nombre - El nombre de la compañía.
 * @param {string} tlf_contacto - Este parámetro representa el número de teléfono de la persona de
 * contacto de la empresa.
 * @param {string} password - El parámetro de contraseña es una cadena que representa la contraseña de
 * la cuenta de la empresa. Se utiliza con fines de autenticación cuando la empresa inicia sesión en su
 * cuenta.
 * @param {string} horario - El parámetro "horario" es una cadena que representa las horas de trabajo
 * de la empresa. Podría incluir información como los horarios de apertura y cierre, los días de la
 * semana en que la empresa está abierta y cualquier horario o cierre especial.
 * @param {string} ubicacion - El parámetro "ubicacion" se refiere a la ubicación o dirección de la
 * empresa que se agrega al sistema.
 * @param {string} descripcion - Este parámetro se refiere a una descripción de la empresa que se
 * agrega. Podría incluir información sobre los productos o servicios de la empresa, su historia, su
 * declaración de misión o cualquier otro detalle relevante que ayudaría a los clientes potenciales a
 * comprender de qué se trata la empresa.
 * @returns Se devuelve un objeto Observable.
 */

/**
 * Esta función agrega una nueva empresa a la base de datos con los parámetros dados.
 * @param {string} cif_Empresa - una cadena que representa el CIF (código de identificación fiscal) de
 * la empresa que se agrega
 * @param {string} nombre - El nombre de la compañía.
 * @param {string} tlf_contacto - Este parámetro representa el número de teléfono de la persona de
 * contacto de la empresa.
 * @param {string} password - El parámetro de contraseña es una cadena que representa la contraseña de
 * la cuenta de la empresa. Se utiliza con fines de autenticación cuando la empresa inicia sesión en su
 * cuenta.
 * @param {string} horario - El parámetro "horario" es una cadena que representa las horas de trabajo
 * de la empresa. Podría incluir información como los horarios de apertura y cierre de la empresa, los
 * días de la semana en que opera y cualquier horario especial o cierre.
 * @param {string} ubicacion - El parámetro "ubicacion" se refiere a la ubicación o dirección de la
 * empresa que se agrega. Es un parámetro de tipo cadena.
 * @param {string} descripcion - Este parámetro se refiere a una descripción de la empresa que se
 * agrega. Podría incluir información sobre los productos o servicios de la empresa, su historia, su
 * declaración de misión o cualquier otro detalle relevante que ayudaría a los clientes potenciales a
 * comprender de qué se trata la empresa.
 * @returns Un Observable que envía una solicitud HTTP GET a la URL de la API especificada con los
 * parámetros proporcionados para insertar una nueva empresa en la base de datos.
 */
  agregarEmpresa(cif_Empresa: string, nombre: string, tlf_contacto: string, password: string, horario: string, ubicacion: string, descripcion: string): Observable<any> {
    return this.http.get(`${this.apiUrl}=insert&cif_Empresa=${cif_Empresa}&nombre=${nombre}&tlf_contacto=${tlf_contacto}&password=${password}&horario=${horario}&ubicacion=${ubicacion}&descripcion=${descripcion}`);
  }

/**
 * Esta función actualiza la información de una empresa en una base de datos mediante una solicitud
 * HTTP con encabezados de autorización.
 * @param {string} cif_Empresa - una cadena que representa el CIF (código de identificación fiscal) de
 * una empresa
 * @param {string} nombre - El nombre actualizado de la empresa.
 * @param {string} tlf_contacto - Este parámetro representa el número de teléfono de la persona de
 * contacto de la empresa.
 * @param {string} password - El parámetro de contraseña es una cadena que representa la nueva
 * contraseña para la cuenta de la empresa.
 * @param {string} horario - El parámetro "horario" es una cadena que representa las horas de trabajo
 * de la empresa. Podría incluir información como los horarios de apertura y cierre, los días de la
 * semana en que la empresa está abierta y cualquier horario o cierre especial.
 * @param {string} ubicacion - El parámetro "ubicacion" en la función "actualizarEmpresa" se refiere a
 * la ubicación de la empresa. Es un parámetro de tipo string que representa la dirección física o
 * coordenadas geográficas de la empresa.
 * @param {string} descripcion - Este parámetro representa la descripción de la empresa que necesita
 * ser actualizada. Es un parámetro de tipo cadena.
 * @returns Se devuelve un Observable de tipo `cualquiera`.
 */
  actualizarEmpresa(cif_Empresa: string, nombre: string, tlf_contacto: string, password: string, horario: string, ubicacion: string, descripcion: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=update&cif_Empresa=${cif_Empresa}&nombre=${nombre}&tlf_contacto=${tlf_contacto}&password=${password}&horario=${horario}&ubicacion=${ubicacion}&descripcion=${descripcion}`, { headers });
  }

/**
 * Esta función envía una solicitud GET para eliminar una empresa con un identificador CIF específico,
 * utilizando un token de autorización en los encabezados.
 * @param {string} cif_Empresa - una cadena que representa el CIF (código de identificación fiscal) de
 * una empresa que debe eliminarse de la base de datos. La función devuelve un Observable que envía una
 * solicitud HTTP GET al extremo de la API con el CIF especificado como parámetro, junto con un token
 * de autorización en los encabezados.
 * @returns Un Observable que envía una solicitud HTTP GET al extremo de la API con el CIF (código de
 * identificación fiscal) especificado de la empresa que se eliminará, junto con un token de
 * autorización en los encabezados. Se espera que el extremo de la API maneje la eliminación de la
 * empresa y devuelva una respuesta.
 */
  eliminarEmpresa(cif_Empresa: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`${this.apiUrl}=delete&cif_Empresa=${cif_Empresa}`, { headers });
  }

/**
 * Esta función envía una solicitud GET a la API con credenciales de inicio de sesión y devuelve un
 * Observable.
 * @param {string} cif_Empresa - Es un parámetro de cadena que representa el CIF (código de
 * identificación fiscal) de una empresa.
 * @param {string} password - El parámetro de contraseña es una cadena que representa la contraseña del
 * usuario que intenta iniciar sesión.
 * @returns Un Observable que realiza una solicitud HTTP GET al extremo de la API para iniciar sesión
 * con el CIF y la contraseña proporcionados.
 */
  login(cif_Empresa: string, password: string): Observable<any> {
    return this.http.get(`${this.apiUrl}=login&cif_Empresa=${cif_Empresa}&password=${password}`);
  }

}