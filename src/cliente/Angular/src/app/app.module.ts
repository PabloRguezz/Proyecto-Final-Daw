import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../components/login/login.component';
import { RegistroComponent } from '../components/registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeUsuarioComponent } from 'src/components/home-usuario/home-usuario.component';
import { HeaderLoginComponent } from 'src/components/header-login/header-login.component';
import { CalendarioComponent } from 'src/components/calendario/calendario.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DatosEmpresaComponent } from 'src/components/datos-empresa/datos-empresa.component';
import { HomeEmpresaComponent } from 'src/components/home-empresa/home-empresa.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { SwiperModule } from 'swiper/angular'
import { CommonModule } from '@angular/common';
import { EmpresaServiciosComponent } from 'src/components/empresa-servicios/empresa-servicios.component';
import { HeaderEmpresaComponent } from 'src/components/header-empresa/header-empresa.component';
import { ViewEmpresaUsuarioComponent } from 'src/components/view-empresa-usuario/view-empresa-usuario.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HeaderUsuarioComponent } from 'src/components/header-usuario/header-usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RatingModule } from 'ngx-bootstrap/rating';
import { EditarPerfilUsuarioComponent } from 'src/components/editar-perfil-usuario/editar-perfil-usuario.component';
import { AvatarModule } from 'primeng/avatar';
import { EditarPerfilEmpresaComponent } from 'src/components/editar-perfil-empresa/editar-perfil-empresa.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeUsuarioComponent,
    HeaderLoginComponent,
    CalendarioComponent,
    DatosEmpresaComponent,
    HomeEmpresaComponent,
    EmpresaServiciosComponent,
    HeaderEmpresaComponent,
    ViewEmpresaUsuarioComponent, 
    HeaderUsuarioComponent,
    ViewEmpresaUsuarioComponent,
    EditarPerfilUsuarioComponent,
    EditarPerfilEmpresaComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    HttpClientModule,
    CarouselModule,
    FullCalendarModule,
    AvatarModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    TooltipModule,
    RatingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


