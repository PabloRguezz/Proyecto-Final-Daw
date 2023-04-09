import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  constructor(private http: HttpClient) {}
  formularioRegistro = {
    nombre: '',
    email: '',
    password: ''
  };
  onSubmit(data :any) {
    const url = 'http://api.bookme.alu6852.arkania.es/usuarios';
    this.http.post(url, data).subscribe(
      (res: any) => {
        console.log(res);
        // Redireccionar al usuario a la página de inicio de sesión o mostrar un mensaje de éxito.
      },
      (err: any) => {
        console.error(err);
        // Mostrar un mensaje de error.
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
