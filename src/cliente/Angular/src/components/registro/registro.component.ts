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
    password: '',
  };
  /**
   * Esta función registra un nuevo usuario enviando su nombre, correo electrónico y contraseña a un
   * servidor y mostrando un mensaje de éxito o error basado en la respuesta.
   */
  registrarCliente() {
    const { nombre, email, password } = this.formularioRegistro;
    this.usuarioService.agregarUsuario(email, password, nombre).subscribe(
      (response :any) => {
      if (response && response.length > 0) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se ha registrado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No se ha podido registrar el usuario, quizas ya estés registrado',
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

/**
 * La función convierte una cadena de rango de tiempo dada en un formato legible o devuelve "Cerrado"
 * (cerrado) si la entrada no es válida.
 * @param horario - Una cadena que representa las horas de apertura y cierre de una empresa, separadas
 * por un guión. Por ejemplo, "9:00-17:00".
 * @returns La función `horarioToString` devuelve una cadena que representa el horario de apertura de
 * un negocio. Si la entrada `horario` está vacía o indefinida, o si las horas de apertura y cierre son
 * cadenas vacías, la función devuelve la cadena "Cerrado" (que significa "Cerrado" en español). De lo
 * contrario, la función devuelve la entrada `horario` tal cual.
 */
  horarioToString(horario) {
    let resultado=horario.split('-')
    if (!horario || resultado[0] == '' && resultado[1] == '') {
      return "Cerrado";
    } else if(resultado[1] == 'undefined'){
      return "Cerrado"
    } else if(resultado[0] == ''){
      return "Cerrado"
    } else {
      return horario;
    }
  }
  
  /**
   * Esta función registra una nueva empresa recopilando valores de entrada de un formulario y
   * enviándolos a un servidor mediante una solicitud HTTP.
   */
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
        horario : `Lun ${this.horarioToString(`${lunesInicio}-${lunesFin}`)},Mar ${this.horarioToString(`${martesInicio}-${martesFin}`)},Mie ${this.horarioToString(`${miercolesInicio}-${miercolesFin}`)},Jue ${this.horarioToString(`${juevesInicio}-${juevesFin}`)},Vie ${this.horarioToString(`${viernesInicio}-${viernesFin}`)},Sab ${this.horarioToString(`${sabadoInicio}-${sabadoFin}`)},Dom ${this.horarioToString(`${domingoInicio}-${domingoFin}`)}`,
        ubicacion: ubicacion,
        descripcion: descripcion,
        password: password,
      };
      this.empresaService.agregarEmpresa(empresa.cif_Empresa,empresa.nombre,empresa.tlf_contacto,empresa.password,empresa.horario,empresa.ubicacion,empresa.descripcion).subscribe(
        (datos :any) => {
          if (datos && datos.length > 0) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Empresa registrada correctamente',
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Ha habido un error registrando la empresa',
            })
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha habido un problema registrando la empresa',
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
