import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioServiceService } from 'src/app/service/usuario-service.service';
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
    
    if (!nombre) {
      alert('El campo "nombre" es obligatorio');
      return null;
    }
    
    this.usuarioService.registrarUsuario(nombre, email, password).subscribe(response => {
      console.log(response);
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
