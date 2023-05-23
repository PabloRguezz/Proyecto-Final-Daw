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
import { ReservasService } from 'src/service/reservas/reservas.service';
import Swal from 'sweetalert2';
import { CalificacionesService } from 'src/service/calificaciones/calificaciones.service';


@Component({
  selector: 'app-view-empresa-usuario',
  templateUrl: './view-empresa-usuario.component.html',
  styleUrls: ['./view-empresa-usuario.component.css']
})
export class ViewEmpresaUsuarioComponent {
  y = 3;
  selectedDay: any;
  horarioSeleccionado: number = -1;
  calificacion;
  calificacionMedia:any[];
  calificacionMediaFinal:number[];
  descripcion;
  cifEmpresa:string;
  id_servicio:number;
  nombreServicio:string;
  id_usuario:number;
  hora_reserva:string;
  servicios: Servicio[] = [];
  noEmpresa;
  fechaSeleccionada = false;
  horaSeleccionada = false;
  horarioArray;
  datosEmpresa : Empresa;
  images: string[] = [];
  fechas_reservas = [];
  monthSelect: any[];
  dateSelect: any;
  dateValue: any;
  isLoading: boolean = true;
  showSpinner: boolean = true;
  date;
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
  dayName;
  cerrado;
  horarioFinal = [];
  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];
  hasComentario: number;
  constructor(private servicio: ServiciosService,private calificaciones : CalificacionesService , private storage : Storage ,private route: ActivatedRoute,private servicioEmpresa: EmpresaHasServiciosService, private empresa : EmpresaService, private reservas : ReservasService){}
  ngOnInit(){
    setTimeout(() => {
      this.showSpinner = false;
    }, 2000);
    this.isLoading = true;
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
    this.selectedDay = day;
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    const objectDate = moment(parse)
    this.dateValue = objectDate;
    moment.locale('es');
    const date = moment(this.dateValue.format('YYYY-MM-DD'));
    this.date = date['_i'];
    this.dayName= date.format('dddd');
    switch (this.dayName) {
      case "lunes":
        this.horarioArray=this.getHorarioArray(this.horarioFinal[1].dia);
        break;
      case "martes":
        this.horarioArray=this.getHorarioArray(this.horarioFinal[3].dia);
        break;
      case "miércoles":
        this.horarioArray=this.getHorarioArray(this.horarioFinal[5].dia);
        break;
      case "jueves":
        this.horarioArray=this.getHorarioArray(this.horarioFinal[7].dia);
        break;
      case "viernes":
        this.horarioArray=this.getHorarioArray(this.horarioFinal[9].dia);
        break;
      case "sábado":
        this.horarioArray=this.getHorarioArray(this.horarioFinal[11].dia);
        break;
      case "domingo":
        this.horarioArray=this.getHorarioArray(this.horarioFinal[13].dia);
        break;
    }
    if (this.horarioArray.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Estamos cerrados o estamos completos, lo siento. Pruebe a seleccionar otro día',
      })
    } else {
      for (let i = 0; i < this.fechas_reservas.length; i++) {
        const reserva = this.fechas_reservas[i];
        const reservaFechaHora = moment(`${reserva.dia_reserva} ${reserva.hora_reserva}`, 'YYYY-MM-DD HH:mm:ss');
        if (moment(reserva.dia_reserva).isSame(this.date, 'day')){
          for (let j = 0; j < this.horarioArray.length; j++) {
            const horario = moment(`${reserva.dia_reserva} ${this.horarioArray[j]}`, 'YYYY-MM-DD HH:mm');
            
            if (reservaFechaHora.isSame(horario)) {
              this.horarioArray.splice(j, 1);
              break;
            }
          }
        }
        
      }
    }
    this.fechaSeleccionada=true;
  }
  getHorarioArray(horario: string): string[] {
    const [inicio, fin] = horario.split('-');
    const horarioArray = [];
    const inicioMoment = moment(inicio, 'HH:mm');
    const finMoment = moment(fin, 'HH:mm').subtract(1, 'minutes').subtract(30, 'seconds');
    while (inicioMoment.isBefore(finMoment)) {
      horarioArray.push(inicioMoment.format('HH:mm'));
      inicioMoment.add(30, 'minutes');
    }
  
    return horarioArray;
  }
  
  getServicios() {
    this.cifEmpresa = this.route.snapshot.paramMap.get('cif_empresa');
    this.servicioEmpresa.obtenerEmpresaServicioCif(this.cifEmpresa).subscribe(
      (response) => {
        if (response.length > 0) {
          for (let index = 0; index < response.length; index++) {
            this.servicio.obtenerServicioId(response[index].id_servicio).subscribe(
              (servicio) => {
                this.servicios.push(servicio[0]);
                this.calificacionMediaFinal = [];
                for (let index = 0; index < this.servicios.length; index++) {
                  this.calificaciones.obtenerCalificacionServicio(this.servicios[index].id_servicio).subscribe({
                    next: data => {
                      this.calificacionMedia = data;
                      const calificacionesServicio = this.calificacionMedia.filter(calificacion => calificacion.id_servicio === this.servicios[index].id_servicio);
                      if (calificacionesServicio.length === 0) {
                        this.calificacionMediaFinal[index] = 0;
                      } else {
                        const totalCalificaciones = calificacionesServicio.length;
                        const sumaCalificaciones = calificacionesServicio.reduce((acumulador, calificacion) => acumulador + calificacion.nota, 0);
                        const mediaCalificaciones = sumaCalificaciones / totalCalificaciones;
                        this.calificacionMediaFinal[index+1] = Math.round(mediaCalificaciones);
                      }
                    }
                  });
                }
              }

            )
          }
        } 
      },
      (error) => {
      }
    )
    this.isLoading = false;
  }
  
  elegirHora(hora :string, index:number){
    this.horaSeleccionada = true;
    this.hora_reserva=hora;
    if (this.horarioSeleccionado === index) {
      this.horarioSeleccionado = -1;
    } else {
      this.horarioSeleccionado = index;
    }
    
    
  }
  reservar(){
    this.reservas.agregarReserva(this.hora_reserva,this.nombreServicio,this.id_servicio,this.id_usuario,this.date).subscribe(
      (response) => {
        if (this.fechaSeleccionada && this.horaSeleccionada) {
          if (response && response.length > 0) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se ha hecho su reserva correctamente',
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ha habido un error haciendo su reserva',
            })
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Le falta seleccionar el dia o la hora de reserva',
          })
        }

      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha habido un error haciendo su reserva',
        })
      }
    )
  }
  obtenerDatosService(id:number,nombre:string){
    this.id_servicio=id;
    this.nombreServicio=nombre;
    this.reservas.obtenerReservasServicio(id).subscribe(
      (response) => {
        if (response.length > 0) {
          for (let index = 0; index < response.length; index++) {
            this.fechas_reservas.push(response[index]);
          }
        }
      }
    )
  }
  getImages(){
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    this.id_usuario = decodedToken['data'].id;
    const imagesRef = ref(this.storage,`imagenesEmpresas/${ this.route.snapshot.paramMap.get('cif_empresa')}`);

    listAll(imagesRef)
    .then(async response => {
      this.images=[];
      for(let item of response.items){
        const url = await getDownloadURL(item);
        this.images.push(url);
      }
    })
  }
  getDatos(){
    this.empresa.obtenerEmpresaCif(this.route.snapshot.paramMap.get('cif_empresa')).subscribe(
      (response) => {
        this.datosEmpresa=response[0];
        let horario = this.datosEmpresa.horario;
        let horarioArray = horario.split(/[(, )(,)( )]+/);
        for (let i = 0; i < horarioArray.length; i++) {
          let info = horarioArray[i].split(" ");
          let dia = info[0];
          let hora = info[1] === "Cerrado" ? "Cerrado" : info[1] + " - " + info[2];
          this.horarioFinal.push({ dia, hora });
        }
      }
    )
  }
  getCalificaciones(id): void {
    this.id_servicio=id;
    this.calificaciones.obtenerCalificacionServicio(this.id_servicio).subscribe(
      data => {
        this.calificacion = data;
      },
      error => {
      }
    );
  }

  agregarCalificacion() {
    const formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    this.id_usuario = decodedToken['data'].id;
    this.hasComentario = 0;
    this.calificaciones.obtenerCalificaciones().subscribe({
      next:data=>{
        for (let index = 0; index < data.length; index++) {
          if (data[index].id_usuario==this.id_usuario && data[index].id_servicio==this.id_servicio) {
            this.hasComentario=1;
          }

        }
        if (this.hasComentario==0) {
          this.calificaciones.agregarCalificacion(this.y,this.descripcion,this.id_servicio,this.id_usuario,formattedDate).subscribe(
            data => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se ha agregado su comentario correctamente',
                showConfirmButton: false,
                timer: 1500
              })
              this.getCalificaciones(this.id_servicio);
            },
            error => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha habido un error creando su su comentario',
              });
            }
          );
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ya ha añadido un comentario',
          });
        }
      }
    });

  }
}





