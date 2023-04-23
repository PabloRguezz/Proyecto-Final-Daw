import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioServiceService } from 'src/service/usuario/usuario-service.service';
import Swal from 'sweetalert2';
import { EmpresaService } from 'src/service/empresa/empresa.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  constructor(private http: HttpClient,private router: Router,private usuarioService: UsuarioServiceService, private empresaService : EmpresaService) {}
  formularioRegistro = {
    nombre: '',
    email: '',
    password: ''
  };
  registrarCliente() {
    const { nombre, email, password } = this.formularioRegistro;
    this.usuarioService.registrarUsuario(nombre, email, password).subscribe(
      (response) => {
      if (response['status']) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response['msg'],
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: response['msg'],
        })
      }

    },
    (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha habido un error registrando el usuario',
      })
    });
  }

  horarioToString(horario) {
    if (!horario || horario === " - ") {
      return "Cerrado";
    } else {
      return horario;
    }
  }
  
  registrarEmpresa() {
      const nombreEmpresaInput = document.getElementById('nombreEmpresa') as HTMLInputElement;
      const cifInput = document.getElementById('cif') as HTMLInputElement;
      const telefonoInput = document.getElementById('telefono') as HTMLInputElement;
      const lunesInicioInput = document.getElementById('lunesInicio') as HTMLInputElement;
      const lunesFinInput = document.getElementById('lunesFin') as HTMLInputElement;
      const martesInicioInput = document.getElementById('martesInicio') as HTMLInputElement;
      const martesFinInput = document.getElementById('martesFin') as HTMLInputElement;
      const miercolesInicioInput = document.getElementById('miercolesInicio') as HTMLInputElement;
      const miercolesFinInput = document.getElementById('miercolesFin') as HTMLInputElement;
      const juevesInicioInput = document.getElementById('juevesInicio') as HTMLInputElement;
      const juevesFinInput = document.getElementById('juevesFin') as HTMLInputElement;
      const viernesInicioInput = document.getElementById('viernesInicio') as HTMLInputElement;
      const viernesFinInput = document.getElementById('viernesFin') as HTMLInputElement;
      const sabadoInicioInput = document.getElementById('sabadoInicio') as HTMLInputElement;
      const sabadoFinInput = document.getElementById('sabadoFin') as HTMLInputElement;
      const domingoInicioInput = document.getElementById('domingoInicio') as HTMLInputElement;
      const domingoFinInput = document.getElementById('domingoFin') as HTMLInputElement;
      const ubicacionInput = document.getElementById('ubicacion') as HTMLInputElement;
      const descripcionInput = document.getElementById('descripcion') as HTMLInputElement;
      const passwordInput = document.getElementById('password') as HTMLInputElement;
    
      const nombreEmpresa = nombreEmpresaInput.value;
      const cif = cifInput.value;
      const telefono = telefonoInput.value;
      const lunesInicio = lunesInicioInput.value;
      const lunesFin = lunesFinInput.value;
      const martesInicio = martesInicioInput.value;
      const martesFin = martesFinInput.value;
      const miercolesInicio = miercolesInicioInput.value;
      const miercolesFin = miercolesFinInput.value;
      const juevesInicio = juevesInicioInput.value;
      const juevesFin = juevesFinInput.value;
      const viernesInicio = viernesInicioInput.value;
      const viernesFin = viernesFinInput.value;
      const sabadoInicio = sabadoInicioInput.value;
      const sabadoFin = sabadoFinInput.value;
      const domingoInicio = domingoInicioInput.value;
      const domingoFin = domingoFinInput.value;
      const ubicacion = ubicacionInput.value;
      const descripcion = descripcionInput.value;
      const password = passwordInput.value;
    
      const empresa = {
        nombre: nombreEmpresa,
        cif_Empresa: cif,
        tlf_contacto: telefono,
        horario: `Lun ${this.horarioToString(`${lunesInicio} - ${lunesFin}`)}, Mar ${this.horarioToString(`${martesInicio} - ${martesFin}`)}, Mie ${this.horarioToString(`${miercolesInicio} - ${miercolesFin}`)}, Jue ${this.horarioToString(`${juevesInicio} - ${juevesFin}`)}, Vie ${this.horarioToString(`${viernesInicio} - ${viernesFin}`)}, Sab ${this.horarioToString(`${sabadoInicio} - ${sabadoFin}`)}, Dom ${this.horarioToString(`${domingoInicio} - ${domingoFin}`)}`,
        ubicacion: ubicacion,
        descripcion: descripcion,
        password: password,
      };
      console.log(empresa);
      this.empresaService.registrarEmpresa(empresa).subscribe(
  
        (datos) => {
          if (datos['status']) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: datos['msg'],
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: datos['msg'],
            })
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha habido un error registrando la empresa',
          })
        }
      );
    }
    
  ngOnInit(){
    let signup = document.querySelector(".signup");
    let login = document.querySelector(".login");
    let slider = document.querySelector(".slider");
    let formSection = document.querySelector(".form-section");

    signup?.addEventListener("click", () => {
      slider?.classList.add("moveslider");
      formSection?.classList.add("form-section-move");
    });

    login?.addEventListener("click", () => {
      slider?.classList.remove("moveslider");
      formSection?.classList.remove("form-section-move");
    });

  }
}
