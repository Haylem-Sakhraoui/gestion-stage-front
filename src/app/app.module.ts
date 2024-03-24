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



import { ReclamationService } from './services/reclamation.service';
import { CommonModule } from '@angular/common';
import { ReclamationComponent } from './reclamationmanagement/reclamationAdmin/reclamation.component';
import { ReclamationFormComponent } from './reclamationmanagement/reclamation-form/reclamation-form.component';
import { RetrieveClaimComponent } from './reclamationmanagement/retrieve-claim/retrieve-claim.component';




import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './admin/user-list/user-list.component';
import { AdministrationComponent } from './admin/administration/administration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SettingComponent } from './services/setting/setting.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';




import { OffreComponent } from './offre/offre.component';
import { UploadOffreComponent } from './upload-offre/upload-offre.component';
import { CvstageComponent } from './cvstage/cvstage.component';




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
    ReclamationComponent,  OffreComponent,

    AproposComponent,
    InscriptionComponent,
    ConnecterComponent,
    ConventionComponent,
    DemandeComponent,
    DepotComponent,
    JournalComponent,
    AffectationComponent,
    ReclamationComponent, UserListComponent, AdministrationComponent, ResetPasswordComponent, SettingComponent, ForgetPasswordComponent,

    OffreComponent,
  ReclamationComponent,
  ReclamationFormComponent,
  RetrieveClaimComponent,
  UploadOffreComponent,
  CvstageComponent,
  
   
    



  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
   
    CommonModule,
    ReactiveFormsModule
],
  providers: [],
  bootstrap: [AppComponent],
  


  
 
})
export class AppModule {}
