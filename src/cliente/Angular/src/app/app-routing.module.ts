import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/components/login/login.component';
import { RegistroComponent } from 'src/components/registro/registro.component';
import { HomeUsuarioComponent } from 'src/components/home-usuario/home-usuario.component';
import { HomeEmpresaComponent } from 'src/components/home-empresa/home-empresa.component';
import { DatosEmpresaComponent } from 'src/components/datos-empresa/datos-empresa.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'usuario', component: HomeUsuarioComponent },
  { path: 'empresa', component: HomeEmpresaComponent },
  { path: 'empresa/datos', component: DatosEmpresaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


