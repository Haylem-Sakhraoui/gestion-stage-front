import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AproposComponent } from './apropos/apropos.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnecterComponent } from './connecter/connecter.component';
import { ConventionComponent } from './convention/convention.component';
import { DemandeComponent } from './demande/demande.component';
import { DepotComponent } from './depot/depot.component';
import { JournalComponent } from './journal/journal.component';
import { AffectationComponent } from './affectation/affectation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ReclamationService } from './services/reclamation.service';
import { ReclamationComponent } from './reclamationmanagement/reclamationAdmin/reclamation.component';
import { ReclamationFormComponent } from './reclamationmanagement/reclamation-form/reclamation-form.component';
import { RetrieveClaimComponent } from './reclamationmanagement/retrieve-claim/retrieve-claim.component';


import { HttpClient } from '@angular/common/http';

import { UserListComponent } from './admin/user-list/user-list.component';
import { AdministrationComponent } from './admin/administration/administration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SettingComponent } from './setting/setting.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

import { ReclamationStudentFormComponent } from './reclamationmanagement/reclamation-student-form/reclamation-student-form.component';
import { ChatComponent } from './chat/chat.component';
import { FilterpipePipe } from './services/filterpipe/filterpipe.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { StatisticsComponent } from './statistics/statistics.component';
import { NgChartsModule } from 'ng2-charts';






@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    AproposComponent,
    InscriptionComponent,
    ConnecterComponent,
    ConventionComponent,
    DemandeComponent,
    DepotComponent,
    JournalComponent,
    AffectationComponent,

    ReclamationComponent,
    ReclamationFormComponent,
    RetrieveClaimComponent,
    UserListComponent,
    AdministrationComponent,
    ResetPasswordComponent,
    SettingComponent,
    ForgetPasswordComponent,
    ReclamationStudentFormComponent,
    ChatComponent,
    FilterpipePipe,
    HeaderComponent,
    FooterComponent,

    ReclamationComponent, 
    UserListComponent, 
    AdministrationComponent, 
    ResetPasswordComponent, 
    SettingComponent, 
    ForgetPasswordComponent, 
    StatisticsComponent,

    ReclamationComponent, UserListComponent, AdministrationComponent, ResetPasswordComponent, SettingComponent, ForgetPasswordComponent,


  ReclamationComponent,
  ReclamationFormComponent,
  RetrieveClaimComponent,
  
    // Remove ReclamationComponent from declarations

    ReclamationComponent, UserListComponent, AdministrationComponent, ResetPasswordComponent, SettingComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,

    NgbModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,

    NgChartsModule
    
  ],
  providers: [ReclamationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
