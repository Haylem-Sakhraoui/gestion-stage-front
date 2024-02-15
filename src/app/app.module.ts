import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AccueilComponent } from './accueil/accueil.component';
import { AproposComponent } from './apropos/apropos.component';

import { InscriptionComponent } from './inscription/inscription.component';
import { ConnecterComponent } from './connecter/connecter.component';

import { ConventionComponent } from './convention/convention.component';
import { DemandeComponent } from './demande/demande.component';
import { DepotComponent } from './depot/depot.component';
import { JournalComponent } from './journal/journal.component';
import { AffectationComponent } from './affectation/affectation.component';
import { ReclamationComponent } from './reclamation/reclamation.component';




@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    AproposComponent, 
     InscriptionComponent, ConnecterComponent, ConventionComponent, DemandeComponent, DepotComponent, JournalComponent, AffectationComponent, ReclamationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   
       
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
