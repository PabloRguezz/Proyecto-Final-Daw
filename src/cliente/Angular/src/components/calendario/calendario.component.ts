import { Component, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import { Empresa } from 'src/model/empresa/empresa.model';
import { EmpresaService } from 'src/service/empresa/empresa.service';
import { ReservasService } from 'src/service/reservas/reservas.service';
import { ServiciosService } from 'src/service/servicios/servicios.service';
import jwt_decode from 'jwt-decode';
import { EmpresaHasServiciosService } from 'src/service/empresa_has_servicios/empresa-has-servicios.service';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {
  constructor(private reserva: ReservasService, private empresa: EmpresaHasServiciosService, private servicio : ServiciosService){}
  eventos = [{}];
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: [],
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false,
      hour12: false
    }
  };

  @ViewChild('fullcalendar', { static: true })
  calendarComponent!: FullCalendarComponent;

  ngOnInit() {
    this.obtenerDatos();
  }

  obtenerDatos(){
    const token = localStorage.getItem('token');
    const decodedToken: Empresa = jwt_decode(token);
    this.empresa.obtenerEmpresaServicioCif(decodedToken["data"].cif_Empresa).subscribe(
      (response) => {
        for (let index = 0; index < response.length; index++) {
          this.servicio.obtenerServicioId(response[index].id_servicio).subscribe(
            (servicio) => {
              this.reserva.obtenerReservasServicio(servicio[0].id_servicio).subscribe(
                (reservas) => {
                  if (reservas.length!=0) {
                    for (let j = 0; j < reservas.length; j++) {
                      const fechaInicio = reservas[j].dia_reserva;
                      const horaInicio = reservas[j].hora_reserva;
                      const fechaHoraInicio = new Date(`${fechaInicio}T${horaInicio}`);
                      const fechaHoraFin = new Date(fechaHoraInicio);
                      fechaHoraFin.setMinutes(fechaHoraFin.getMinutes() + 30);
                      this.eventos.push({
                          title: servicio[0].nombre,
                          start: fechaHoraInicio ,
                          end : fechaHoraFin
                      });
                  }
                  
                    
                }
                this.calendarOptions.events = this.eventos;
                this.calendarComponent.getApi().render();
              }
              )

            },
            (error) => {

            }
          )
        }
      },
      (error) => {
      }
    )
  }
}
