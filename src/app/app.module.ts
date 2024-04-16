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
import { ReclamationComponent } from './reclamation/reclamation.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './admin/user-list/user-list.component';
import { AdministrationComponent } from './admin/administration/administration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SettingComponent } from './setting/setting.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
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
    UserListComponent, 
    AdministrationComponent, 
    ResetPasswordComponent, 
    SettingComponent, 
    ForgetPasswordComponent, 
    StatisticsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule


  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
