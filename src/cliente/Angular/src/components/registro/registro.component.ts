import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioServiceService } from 'src/app/service/usuario-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  constructor(private http: HttpClient,private router: Router,private usuarioService: UsuarioServiceService) {}
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
          position: 'top-end',
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
