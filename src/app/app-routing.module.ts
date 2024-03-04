import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component';
import { AproposComponent } from './apropos/apropos.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnecterComponent } from './connecter/connecter.component';

import { ConventionComponent } from './convention/convention.component';
import { DemandeComponent } from './demande/demande.component';
import { DepotComponent } from './inscription/depot/depot.component';
import { JournalComponent } from './journal/journal.component';
import { AffectationComponent } from './affectation/affectation.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { ListoffreComponent } from './listoffre/listoffre.component';


const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'apropos', component: AproposComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'login', component: ConnecterComponent },
  { path: 'convention', component: ConventionComponent },
  { path: 'demande', component: DemandeComponent },
  { path: 'depot', component: DepotComponent },
  { path: 'journal', component: JournalComponent },
  { path: 'affectation', component: AffectationComponent },
  { path: 'stages', component: ListoffreComponent },
  { path: 'reclamation', component: ReclamationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }