import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  constructor(private http: HttpClient,private router: Router) {}
  nombre: string;
  email: string;
  password: string;
  registrarCliente() {
    const nuevoCliente = {
      nombre: this.nombre,
      email: this.email,
      password: this.password
    };

    this.http.post('https://api.nombre.alu6852.arkania.es', nuevoCliente)
      .toPromise()
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
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
