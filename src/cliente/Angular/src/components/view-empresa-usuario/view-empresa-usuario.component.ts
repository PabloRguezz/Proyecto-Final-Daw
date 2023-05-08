import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/model/empresa/empresa.model';
import { ServiciosService } from 'src/service/servicios/servicios.service';
import { EmpresaHasServiciosService } from 'src/service/empresa_has_servicios/empresa-has-servicios.service';
import { Servicio } from 'src/model/servicio/servicio.model';
import { EmpresaService } from 'src/service/empresa/empresa.service';
import Swiper from 'swiper';
import jwt_decode from 'jwt-decode';
import { getDownloadURL, listAll, ref } from '@angular/fire/storage';
import { Storage } from '@angular/fire/storage';

@Component({
  selector: 'app-view-empresa-usuario',
  templateUrl: './view-empresa-usuario.component.html',
  styleUrls: ['./view-empresa-usuario.component.css']
})
export class ViewEmpresaUsuarioComponent {
  cifEmpresa:string;
  servicios: Servicio[] = [];
  noServicios;
  noEmpresa;
  datosEmpresa : Empresa;
  images;
  constructor(private servicio: ServiciosService, private storage : Storage ,private route: ActivatedRoute,private servicioEmpresa: EmpresaHasServiciosService, private empresa : EmpresaService){}
  ngOnInit(){
    this.getServicios();
    this.getDatos();
    this.getImages();

  }
  getServicios(){

    this.cifEmpresa = this.route.snapshot.paramMap.get('cif_empresa');

    this.servicioEmpresa.obtenerEmpresaServicioCif(this.cifEmpresa).subscribe(
      (response) => {
        console.log();
        if (response.length > 0) {
          for (let index = 0; index < response.length; index++) {
            this.servicio.obtenerServicioId(response[index].id_servicio).subscribe(
              (servicio) => {
                this.servicios.push(servicio[0]);
              },
              (error) => {
  
              }
            )
          }
        } 
        
      },
      (error) => {
      }
    )
  }
  getImages(){
    const token = localStorage.getItem('token');
    const decodedToken: Empresa = jwt_decode(token);
    const imagesRef = ref(this.storage,`imagenesEmpresas/${ this.route.snapshot.paramMap.get('cif_empresa')}`);

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
  getDatos(){
    this.empresa.obtenerEmpresaCif(this.route.snapshot.paramMap.get('cif_empresa')).subscribe(
      (response) => {
        this.datosEmpresa=response[0];
      }
    )
  }
}
