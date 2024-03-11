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
// Remove ReclamationComponent from the import and declarations
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReclamationService } from './services/reclamation.service';
import { CommonModule } from '@angular/common';
import { ReclamationComponent } from './reclamationmanagement/reclamationAdmin/reclamation.component';
import { ReclamationFormComponent } from './reclamationmanagement/reclamation-form/reclamation-form.component';
import { RetrieveClaimComponent } from './reclamationmanagement/retrieve-claim/retrieve-claim.component';


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
  
    // Remove ReclamationComponent from declarations
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    ReactiveFormsModule,
    
  ],
  providers: [ReclamationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
