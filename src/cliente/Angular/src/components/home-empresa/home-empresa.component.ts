import { Component } from '@angular/core';
import { ServiciosService } from 'src/service/servicios/servicios.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import { Empresa } from 'src/model/empresa/empresa.model';
import { getDownloadURL, listAll, ref, uploadBytes } from '@angular/fire/storage';
import { Storage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { EmpresaHasServiciosService } from 'src/service/empresa_has_servicios/empresa-has-servicios.service';
import { error } from 'jquery';

@Component({
  selector: 'app-home-empresa',
  templateUrl: './home-empresa.component.html',
  styleUrls: ['./home-empresa.component.css']
})
export class HomeEmpresaComponent {

  constructor(private servicio: ServiciosService, private storage : Storage, private router : Router,private servicioEmpresaHasServicio : EmpresaHasServiciosService){}
  precio: number; 
  descripcion: string; 
  nombre: string;  
  images;
  ngOnInit(){
    this.getImages();
  }
  agregarServicio(){
    this.servicio.agregarServicio(this.precio,this.nombre,this.descripcion).subscribe(
      (data) => {
        if (data.id_servicio && data.id_servicio.length > 0) {
          const token = localStorage.getItem('token');
          const decodedToken: Empresa = jwt_decode(token);
          const id_servicio = data.id_servicio;
          this.servicioEmpresaHasServicio.agregarEmpresaServicio(decodedToken["data"].cif_Empresa,id_servicio).subscribe(
            (service) => {
              console.log(service);
            }, 
            (error) => {

            }
          )
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se ha añadido correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No se ha podido registrar el servicio',
          })
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha habido un error registrando el usuario',
        })
      }
    )
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

  getImages(){
    const token = localStorage.getItem('token');
    const decodedToken: Empresa = jwt_decode(token);
    const imagesRef = ref(this.storage,`imagenesEmpresas/${decodedToken["data"].cif_Empresa}`);

    listAll(imagesRef)
    .then(async response => {
      this.images=[];
      for(let item of response.items){
        const url = await getDownloadURL(item);
        this.images.push(url);
      }
    })

    .catch(
      error => console.log(error)
    )
  }
}
