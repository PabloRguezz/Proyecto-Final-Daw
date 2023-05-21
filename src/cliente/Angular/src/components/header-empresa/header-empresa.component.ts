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
  logOut(){
    localStorage.removeItem("token");
    this.router.navigate(['']);
  }
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
