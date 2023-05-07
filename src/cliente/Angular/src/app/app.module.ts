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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeUsuarioComponent,
    HeaderLoginComponent,
    CalendarioComponent,
    DatosEmpresaComponent,
    HomeEmpresaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


