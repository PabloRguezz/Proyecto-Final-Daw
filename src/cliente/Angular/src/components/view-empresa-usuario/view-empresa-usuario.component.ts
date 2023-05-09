import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/model/empresa/empresa.model';
import { ServiciosService } from 'src/service/servicios/servicios.service';
import { EmpresaHasServiciosService } from 'src/service/empresa_has_servicios/empresa-has-servicios.service';
import { Servicio } from 'src/model/servicio/servicio.model';
import { EmpresaService } from 'src/service/empresa/empresa.service';
import jwt_decode from 'jwt-decode';
import { getDownloadURL, listAll, ref } from '@angular/fire/storage';
import { Storage } from '@angular/fire/storage';
import * as moment from 'moment';


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
  monthSelect: any[];
  dateSelect: any;
  dateValue: any;
  today = new Date();
  currentMonth = this.today.getMonth() + 1;
  currentYear = this.today.getFullYear();
  week: any = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ];
  horarioFinal = [];
  constructor(private servicio: ServiciosService, private storage : Storage ,private route: ActivatedRoute,private servicioEmpresa: EmpresaHasServiciosService, private empresa : EmpresaService){}
  ngOnInit(){
    this.getServicios();
    this.getDatos();
    this.getImages();
    this.getDaysFromDate(this.currentMonth, this.currentYear);
  }

  getDaysFromDate(month, year) {

    const startDate = moment.utc(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday()
      };
    });

    this.monthSelect = arrayDays;
  }

  changeMonth(flag) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

  clickDay(day) {
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    const objectDate = moment(parse)
    this.dateValue = objectDate;


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
