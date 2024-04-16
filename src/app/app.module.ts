import { NgModule } from '@angular/core';

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
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GrilleComponent } from './grille/grille.component';




@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    AproposComponent, 
     InscriptionComponent, ConnecterComponent, ConventionComponent, DemandeComponent, DepotComponent, JournalComponent, AffectationComponent, ReclamationComponent, GrilleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule // Déplacer HttpClientModule vers la section 'imports'

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
