import { Component } from '@angular/core';
import { Empresa } from 'src/model/empresa/empresa.model';
import { EmpresaService } from 'src/service/empresa/empresa.service';
import jwt_decode from 'jwt-decode';
import { ref } from '@angular/fire/storage';

@Component({
  selector: 'app-editar-perfil-empresa',
  templateUrl: './editar-perfil-empresa.component.html',
  styleUrls: ['./editar-perfil-empresa.component.css']
})
export class EditarPerfilEmpresaComponent {
  horarioFinal = [];
  datosEmpresa;
  nombre: string;
  cifEmpresa: string;
  telefono: string;
  ubicacion: string;
  descripcion: string;
  password: string;
  cif_empresa:string;
  constructor(private empresa:EmpresaService){}
  ngOnInit(){
    this.getDatos();
    console.log(this.datosEmpresa);
    
  }
  getDatos(){
    const token = localStorage.getItem('token');
    const decodedToken: Empresa = jwt_decode(token);
    this.cif_empresa = decodedToken["data"].cif_Empresa;
    this.empresa.obtenerEmpresaCif(this.cif_empresa).subscribe({
      next : data => {
        this.datosEmpresa=data[0];
        this.nombre=data[0].nombre;
        this.descripcion=data[0].descripcion;
        this.cifEmpresa=this.cif_empresa;
        this.ubicacion=data[0].ubicacion;
        this.telefono=data[0].tlf_contacto;
        let horario = this.datosEmpresa.horario;
        let horarioArray = horario.split(",");
        for (let i = 0; i < horarioArray.length; i++) {
          let info = horarioArray[i].split(" ");
          let infoFInal = info[1].split("-");
          this.horarioFinal.push(infoFInal);
        }
        
      }
    })
  }
  horarioToString(horario) {
    if (!horario || horario === '-') {
      return "Cerrado";
    } else {
      return horario;
    }
  }
  updateData(){
    let horario:string;
    horario=`Lun ${this.horarioToString(`${this.horarioFinal[0][0]}-${this.horarioFinal[0][1]}`)}, Mar ${this.horarioToString(`${this.horarioFinal[1][0]}-${this.horarioFinal[1][1]}`)}, Mie ${this.horarioToString(`${this.horarioFinal[2][0]}-${this.horarioFinal[2][1]}`)}, Jue ${this.horarioToString(`${this.horarioFinal[3][0]}-${this.horarioFinal[3][1]}`)}, Vie ${this.horarioToString(`${this.horarioFinal[4][0]}-${this.horarioFinal[4][1]}`)}, Sab ${this.horarioToString(`${this.horarioFinal[5][0]}-${this.horarioFinal[5][1]}`)}, Dom ${this.horarioToString(`${this.horarioFinal[6][0]}-${this.horarioFinal[6][1]}`)}`;
    if (this.password==null) {
      this.password=this.datosEmpresa.password;
    }
    this.empresa.actualizarEmpresa(this.cifEmpresa,this.nombre,this.telefono,this.password,horario,this.ubicacion,this.descripcion).subscribe({
      next:data => {
        
      }
    })

  }
}


