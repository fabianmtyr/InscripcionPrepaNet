// Modulos
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { Ng2TableModule } from 'ng2-table/ng2-table';
//import{PaginationModule} from 'ngx-bootstrap/pagination'


//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { RegistroAdminsComponent } from './dashboard/registro-admins/registro-admins.component';
import { RegistroComponent } from './dashboard/registro/registro.component';
import { DescargaInteresadosComponent } from './dashboard/descarga-interesados/descarga-interesados.component';
import { ViewTutorsComponent } from './dashboard/view-tutors/view-tutors.component';
import { EditTutorComponent} from './dashboard/view-tutors/edit-tutor/edit-tutor.component';
import { RegistroTutorComponent, SuccessComponent } from './dashboard/registro-tutor/registro-tutor.component';
import { DesplegarTutoresComponent } from './dashboard/desplegar-tutores/desplegar-tutores.component';

// Servicios
import { UserService } from './services/user.service';
import { RegistroService } from './services/registro.service';
import { TutorService } from './services/tutor.service';
import { PlazaService } from './services/plaza.service';
import { ExcelServiceService } from './services/excel-service.service';


//Guardias
import { AuthguardGuard, LoginGuard } from './guards/authguard.guard';

// Directivos
import { EqualValidator } from './dashboard/registro-admins/passwordMatch.directive';

import { FijarPlazasComponent } from './dashboard/fijar-plazas/fijar-plazas.component';
import { TablegitComponent } from './dashboard/view-tutors/tablegit/tablegit.component';
import { EditarTutoresComponent, WarningComponent } from './dashboard/desplegar-tutores/editar-tutores/editar-tutores.component';

// Pipes
import { FiltroMaterias } from './dashboard/registro-tutor/filtroMaterias.pipe';




// Rutas
const appRoutes:Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    component: LoginComponent
  },
    {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthguardGuard],
    component: DashboardComponent
  },
  {
    path: 'dashboard/registro-admins',
    canActivate: [AuthguardGuard],
    component: RegistroAdminsComponent
  },
  {
    path: 'dashboard/descarga-interesados',
    canActivate: [AuthguardGuard],
    component: DescargaInteresadosComponent
  },
  {

    path: 'dashboard/fijar-plazas',
    canActivate: [AuthguardGuard],
    component: FijarPlazasComponent
  },
  {
    path: 'dashboard/tutors',
    component:ViewTutorsComponent
  },
  {
    path: 'dashboard/registro-tutor',
    canActivate: [AuthguardGuard],
    component: RegistroTutorComponent
  },
  {
    path: 'dashboard/lista-tutores',
    canActivate: [AuthguardGuard],
    component: DesplegarTutoresComponent
  }

  
  
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    HomeComponent,
    RegistroAdminsComponent,
    EqualValidator,
    DescargaInteresadosComponent,
    ViewTutorsComponent,
    FijarPlazasComponent,
    EditTutorComponent,
    TablegitComponent,
    RegistroTutorComponent,
    SuccessComponent,
    WarningComponent,
    DesplegarTutoresComponent,
    EditarTutoresComponent,
    FiltroMaterias,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ConfirmationPopoverModule.forRoot({
      hideCancelButton: true,
      confirmText: 'Confirmar'
    }),
    Ng2TableModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule
    //PaginationModule.forRoot()
  ],
  providers: [RegistroService,UserService, AuthguardGuard, LoginGuard, ExcelServiceService, TutorService, PlazaService],
  bootstrap: [AppComponent],
  entryComponents: [EditTutorComponent, EditarTutoresComponent, SuccessComponent, WarningComponent]

})
export class AppModule { }
