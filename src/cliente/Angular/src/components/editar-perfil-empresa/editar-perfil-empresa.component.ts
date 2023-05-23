import { Component } from '@angular/core';
import { Empresa } from 'src/model/empresa/empresa.model';
import { EmpresaService } from 'src/service/empresa/empresa.service';
import jwt_decode from 'jwt-decode';
import { ref, listAll, deleteObject, uploadBytes } from '@firebase/storage';
import Swal from 'sweetalert2';
import { Storage, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-editar-perfil-empresa',
  templateUrl: './editar-perfil-empresa.component.html',
  styleUrls: ['./editar-perfil-empresa.component.css']
})
export class EditarPerfilEmpresaComponent {
  horarioFinal = [];
  datosEmpresa;
  nombre: string;
  telefono: string;
  ubicacion: string;
  descripcion: string;
  password: string;
  cif_empresa:string;
  images:string[]=[];
  constructor(private empresa:EmpresaService,private storage : Storage){}
  ngOnInit(){
    this.getDatos();
    this.getImages();
  }
  /**
   * Esta función carga un archivo de imagen en una carpeta específica en el almacenamiento de Firebase
   * después de eliminar todos los archivos existentes en esa carpeta.
   * @param {any}  - El parámetro  es un objeto de evento que se pasa a la función cuando
   * se activa un evento (como la carga de un archivo). Contiene información sobre el evento, como el
   * elemento de destino y cualquier dato asociado con el evento. En este caso, se utiliza para
   * recuperar el archivo que fue
   */
  uploadImage($event: any) {
    const file = $event.target.files[0];
    const token = localStorage.getItem('token');
    const decodedToken: Empresa = jwt_decode(token);
    const folderPath = `perfil/${decodedToken["data"].cif_Empresa}`;
    const folderRef = ref(this.storage, folderPath);
    listAll(folderRef)
      .then(listResult => {
        const fileRefs = listResult.items.map(item => item.fullPath);
        const deletePromises = fileRefs.map(fileRef => deleteObject(ref(this.storage, fileRef)));
        return Promise.all(deletePromises);
      })
      .then(() => {
        const imgRef = ref(this.storage, `${folderPath}/${file.name}`);
        uploadBytes(imgRef, file)
          .then(response => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se ha añadido correctamente',
              showConfirmButton: false,
              timer: 1500
            });
            setTimeout(() => {
              location.reload();
            }, 1500);
          })
          .catch(error => Swal.fire({
            icon: 'error',
            title: 'No se ha podido subir la imagen',
          }));
      })
      .catch(error => Swal.fire({
        icon: 'error',
        title: 'No se ha podido eliminar la carpeta',
      }));
  }
  
  
  /**
   * Esta función recupera imágenes de una ubicación de almacenamiento de Firebase en función del token
   * decodificado de un usuario.
   */
  getImages(){
    const token = localStorage.getItem('token');
    const decodedToken: Empresa = jwt_decode(token);
    const imagesRef = ref(this.storage,`perfil/${decodedToken["data"].cif_Empresa}`);

    listAll(imagesRef)
    .then(async response => {
      this.images=[];
      for(let item of response.items){
        const url = await getDownloadURL(item);
        this.images.push(url);
      }
    })

    .catch(
      error => console.log(error)
    )
  }
  /**
   * Esta función recupera datos de un token decodificado y una llamada API, y analiza los datos
   * recuperados para extraer información específica.
   */
  getDatos(){
    const token = localStorage.getItem('token');
    const decodedToken: Empresa = jwt_decode(token);
    this.cif_empresa = decodedToken["data"].cif_Empresa;
    this.empresa.obtenerEmpresaCif(this.cif_empresa).subscribe({
      next : data => {
        this.datosEmpresa=data[0];
        this.nombre=data[0].nombre;
        this.descripcion=data[0].descripcion;
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
/**
 * La función convierte una cadena de rango de tiempo dada en un formato legible o devuelve "Cerrado"
 * (cerrado) si la entrada no es válida.
 * @param horario - El parámetro "horario" es una cadena que representa el horario de apertura y cierre
 * de un negocio o establecimiento. Se espera que tenga el formato "HH:mm-HH:mm", donde la primera hora
 * representa la hora de apertura y la segunda representa la hora de cierre.
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
 * Esta función actualiza los datos de una empresa en una base de datos.
 */
  updateData(){
    let horario:string;
    horario=`Lun ${this.horarioToString(`${this.horarioFinal[0][0]}-${this.horarioFinal[0][1]}`)},Mar ${this.horarioToString(`${this.horarioFinal[1][0]}-${this.horarioFinal[1][1]}`)},Mie ${this.horarioToString(`${this.horarioFinal[2][0]}-${this.horarioFinal[2][1]}`)},Jue ${this.horarioToString(`${this.horarioFinal[3][0]}-${this.horarioFinal[3][1]}`)},Vie ${this.horarioToString(`${this.horarioFinal[4][0]}-${this.horarioFinal[4][1]}`)},Sab ${this.horarioToString(`${this.horarioFinal[5][0]}-${this.horarioFinal[5][1]}`)},Dom ${this.horarioToString(`${this.horarioFinal[6][0]}-${this.horarioFinal[6][1]}`)}`;
    let pass;
    if (this.password==null) {
      pass=this.datosEmpresa.password;
    } else {
      pass = this.password;
    }
    this.empresa.actualizarEmpresa(this.cif_empresa,this.nombre,this.telefono,pass,horario,this.ubicacion,this.descripcion).subscribe({
      next:data => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se han actualizado los datos correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        localStorage.setItem('token',data.token)
      },
      error:error=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error actualizando los datos',
        }) 
      }
    })

  }
/**
 * La función "obtenerNombre" devuelve el primer carácter de una cadena dada.
 * @param {string} nombre - Una cadena que representa un nombre.
 * @returns El primer carácter de la cadena pasó como argumento 'nombre'.
 */
  obtenerNombre(nombre:string){
    return nombre[0];
  }
  
}


