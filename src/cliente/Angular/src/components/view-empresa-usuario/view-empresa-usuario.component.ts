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
  calificacion = [];
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

  /**
   * Esta función genera una matriz de objetos que representan los días de un mes y año determinados,
   * incluidos sus nombres e índice dentro de la semana.
   * @param month - El parámetro de mes es un número que representa el mes para el que se calculan los
   * días. Debe ser un número entre 1 y 12, donde 1 representa enero y 12 representa diciembre.
   * @param year - El año para el que se calculan los días.
   */
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

/**
 * La función cambia el mes que se muestra en un calendario en función de un valor de bandera dado.
 * @param flag - El parámetro flag es un número que determina si se debe pasar al mes anterior o al mes
 * siguiente. Si la bandera es menor que 0, significa que queremos pasar al mes anterior. Si flag es
 * mayor o igual a 0, significa que queremos pasar al siguiente mes
 */
  changeMonth(flag) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

  /**
   * La función selecciona un día y comprueba si está disponible para reservar, y si no, elimina las
   * franjas horarias no disponibles de las franjas horarias disponibles.
   * @param day - El parámetro "día" es un objeto que representa un día en un calendario. Contiene una
   * propiedad de "valor" que es un número que representa el día del mes.
   */
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
/**
 * Esta función toma una cadena que representa un rango de tiempo y devuelve una matriz de intervalos
 * de tiempo en intervalos de 30 minutos dentro de ese rango.
 * @param {string} horario - Una cadena que representa un rango de tiempo en el formato "HH:mm-HH:mm",
 * donde la primera vez es la hora de inicio y la segunda es la hora de finalización.
 * @returns una matriz de cadenas que representa un rango de intervalos de tiempo entre una hora de
 * inicio y una hora de finalización, con intervalos de 30 minutos.
 */
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
  
 /**
  * Esta función recupera los servicios y sus calificaciones promedio para una empresa determinada.
  */
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
  
/**
 * La función "elegirHora" establece el tiempo seleccionado y alterna el índice seleccionado.
 * @param {string} hora - una cadena que representa una hora seleccionada para una reserva.
 * @param {number} index - El parámetro de índice es un número que representa la posición de un
 * elemento en una matriz o lista. En esta función específica, se utiliza para realizar un seguimiento
 * de la franja horaria seleccionada en una lista de franjas horarias disponibles.
 */
  elegirHora(hora :string, index:number){
    this.horaSeleccionada = true;
    this.hora_reserva=hora;
    if (this.horarioSeleccionado === index) {
      this.horarioSeleccionado = -1;
    } else {
      this.horarioSeleccionado = index;
    }
    
    
  }
  /**
   * Esta función realiza una reserva para un servicio y muestra un mensaje de éxito o error según el
   * resultado.
   */
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
  /**
   * Esta función establece el ID y el nombre de un servicio y recupera sus reservas.
   * @param {number} id - Número que representa el ID de un servicio.
   * @param {string} nombre - El parámetro "nombre" es una variable de cadena que representa el nombre
   * de un servicio. Se utiliza como parámetro de entrada para la función "obtenerDatosService".
   */
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
/**
 * Esta función recupera imágenes de una ubicación de almacenamiento de Firebase y agrega sus URL a una
 * matriz.
 */
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
  /**
   * Esta función recupera datos de una API y formatea la información del horario comercial en una
   * matriz.
   */
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
/**
 * Esta función recupera las calificaciones de un ID de servicio dado.
 * @param id - El parámetro "id" es una variable que representa el ID de un servicio del que queremos
 * obtener las valoraciones correspondientes.
 */
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

/**
 * Esta función agrega una nueva calificación y comentario a un servicio, pero primero verifica si el
 * usuario ya ha agregado un comentario.
 */
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





