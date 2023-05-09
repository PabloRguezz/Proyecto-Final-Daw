import { Component } from '@angular/core';
import { getDownloadURL, listAll, ref } from '@angular/fire/storage';
import { Empresa } from 'src/model/empresa/empresa.model';
import jwt_decode from 'jwt-decode';
import { Servicio } from 'src/model/servicio/servicio.model';
import { ServiciosService } from 'src/service/servicios/servicios.service';
import { ActivatedRoute } from '@angular/router';
import { EmpresaHasServiciosService } from 'src/service/empresa_has_servicios/empresa-has-servicios.service';
import { EmpresaService } from 'src/service/empresa/empresa.service';
import { Storage } from '@angular/fire/storage';

@Component({
  selector: 'app-datos-empresa',
  templateUrl: './datos-empresa.component.html',
  styleUrls: ['./datos-empresa.component.css']
})
export class DatosEmpresaComponent {
  servicios: Servicio[] = [];
  noServicios;
  noEmpresa;
  datosEmpresa : Empresa;
  images;
  horarioFinal = [];
  constructor(private servicio: ServiciosService, private storage : Storage ,private route: ActivatedRoute,private servicioEmpresa: EmpresaHasServiciosService, private empresa : EmpresaService){}
  ngOnInit(){
    this.getServicios();
    this.getDatos();
    this.getImages();
  }

  getServicios(){

    const token = localStorage.getItem('token');
    const decodedToken: Empresa = jwt_decode(token);

    this.servicioEmpresa.obtenerEmpresaServicioCif(decodedToken["data"].cif_Empresa).subscribe(
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
  getDatos(){
    const token = localStorage.getItem('token');
    const decodedToken: Empresa = jwt_decode(token);
    this.empresa.obtenerEmpresaCif(decodedToken["data"].cif_Empresa).subscribe(
      (response) => {
        this.datosEmpresa=response[0];
        let horario = this.datosEmpresa.horario;
        let horarioArray = horario.split(", ");
        console.log( horarioArray)
        for (let i = 0; i < horarioArray.length; i++) {
          let info = horarioArray[i].split(" ");
          let dia = info[0];
          let hora = info[1] === "Cerrado" ? "Cerrado" : info[1] + " - " + info[2];
          this.horarioFinal.push({ dia, hora });
        }

      }
    )
  }
}
