import { NgModule } from '@angular/core';
import {NgxPrintModule} from 'ngx-print';


import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CondidatComponent } from './condidate/condidat/condidat.component';
import { LoginComponent } from './login/login.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { ListeEmpComponent } from './admin/liste-emp/liste-emp.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { DetailsComponent } from './admin/details/details.component';
import { ListeCondidateComponent } from './admin/liste-condidate/liste-condidate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AjoutEmployeComponent } from './admin/ajout-employe/ajout-employe.component';
import { DashboardEmpComponent } from './employe/dashboard-emp/dashboard-emp.component';
import { ListeCongeComponent } from './admin/liste-conge/liste-conge.component';
import { MeetingComponent } from './admin/meeting/meeting.component';
import { AnnonceComponent } from './admin/annonce/annonce.component';
import { AnnonceEmpComponent } from './employe/annonce-emp/annonce-emp.component';
import { SidebarEmpComponent } from './employe/sidebar-emp/sidebar-emp.component';
import { DemandeCongeComponent } from './employe/demande-conge/demande-conge.component';
import { MeetingEmpComponent } from './employe/meeting-emp/meeting-emp.component';
import { UpdateInfoComponent } from './admin/update-info/update-info.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ReponseCongeComponent } from './admin/reponse-conge/reponse-conge.component';
import { UpdatePwdComponent } from './admin/update-pwd/update-pwd.component';
import { ProfileComponent } from './employe/profile/profile.component';
import { UpdateInfoEmpComponent } from './employe/update-info-emp/update-info-emp.component';
import { UpdatePwdEmpComponent } from './employe/update-pwd-emp/update-pwd-emp.component';
import {DatePipe} from '@angular/common';
import { InformationComponent } from './admin/information/information.component';
import { InformationEmpComponent } from './employe/information-emp/information-emp.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { ProfilCondidatComponent } from './admin/profil-condidat/profil-condidat.component';
import { ReponseComponent } from './condidate/reponse/reponse.component';
import { ConcourComponent } from './admin/concour/concour.component';
import { ListeConcourEmpComponent } from './condidate/liste-concour-emp/liste-concour-emp.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CondidatComponent,
    LoginComponent,
    DashboardAdminComponent,
    ListeEmpComponent,
    SidebarComponent,
    DetailsComponent,
    ListeCondidateComponent,
    AjoutEmployeComponent,
    DashboardEmpComponent,
    ListeCongeComponent,
    MeetingComponent,
    AnnonceComponent,
    AnnonceEmpComponent,
    SidebarEmpComponent,
    DemandeCongeComponent,
    MeetingEmpComponent,
    UpdateInfoComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    ReponseCongeComponent,
    UpdatePwdComponent,
    ProfileComponent,
    UpdateInfoEmpComponent,
    UpdatePwdEmpComponent,
    InformationComponent,
    InformationEmpComponent,
    ProfilCondidatComponent,
    ReponseComponent,
    ConcourComponent,
    ListeConcourEmpComponent,
   
   
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPrintModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000, // seconds
      closeButton: true,
      // progressBar: true,
    }),
   
   
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
