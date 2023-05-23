import { Component } from '@angular/core';
import { ref, uploadBytes } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Storage } from '@angular/fire/storage';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import { Empresa } from 'src/model/empresa/empresa.model';

@Component({
  selector: 'app-header-empresa',
  templateUrl: './header-empresa.component.html',
  styleUrls: ['./header-empresa.component.css']
})
export class HeaderEmpresaComponent {
  constructor(private router: Router,private storage : Storage){}
/**
 * La función elimina el token del almacenamiento local y navega a la página de inicio.
 */
  logOut(){
    localStorage.removeItem("token");
    this.router.navigate(['']);
  }
/**
 * Esta función carga un archivo de imagen en el almacenamiento de Firebase y muestra un mensaje de
 * éxito o un mensaje de error usando Swal.
 * @param {any}  - El parámetro  es un objeto de evento que se pasa a la función cuando se
 * carga una imagen. Contiene información sobre el evento, como el elemento de destino y el archivo
 * cargado.
 */
  uploadImage($event : any){
    const file = $event.target.files[0];
    const token = localStorage.getItem('token');
    const decodedToken: Empresa = jwt_decode(token);
    const imgRef = ref(this.storage, `imagenesEmpresas/${decodedToken["data"].cif_Empresa}/${file.name}`);

    uploadBytes(imgRef,file)
    .then(response => {
      Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se ha añadido correctamente',
      showConfirmButton: false,
      timer: 1500
    })
    setTimeout(() => {
      location.reload();
    }, 1500);
    })
    .catch(error => Swal.fire({
      icon: 'error',
      title: 'No se ha podido subir la imagen',
    }))
  }
}
