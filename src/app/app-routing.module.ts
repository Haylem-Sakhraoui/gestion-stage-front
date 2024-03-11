import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component';
import { AproposComponent } from './apropos/apropos.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnecterComponent } from './connecter/connecter.component';

import { ConventionComponent } from './convention/convention.component';
import { DemandeComponent } from './demande/demande.component';
import { DepotComponent } from './depot/depot.component';
import { JournalComponent } from './journal/journal.component';
import { AffectationComponent } from './affectation/affectation.component';
import { ReclamationComponent } from './reclamationmanagement/reclamationAdmin/reclamation.component';
import { ReclamationFormComponent } from './reclamationmanagement/reclamation-form/reclamation-form.component';
import { RetrieveClaimComponent } from './reclamationmanagement/retrieve-claim/retrieve-claim.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { authGuard } from './services/auth/auth.guard.service';
import { AdministrationComponent } from './admin/administration/administration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SettingComponent } from './services/setting/setting.component';


const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent, canActivate: [authGuard] },
  { path: 'apropos', component: AproposComponent },
  { path: 'inscription', component: InscriptionComponent, canActivate: [authGuard] },
  { path: 'login', component: ConnecterComponent },
  { path: 'convention', component: ConventionComponent },
  { path: 'demande', component: DemandeComponent },
  { path: 'depot', component: DepotComponent },
  { path: 'journal', component: JournalComponent },
  { path: 'affectation', component: AffectationComponent },
  
  { path: 'reclamation', component: ReclamationComponent },
  {path: 'reclamation-form', component: ReclamationFormComponent},
  
  {path: 'retrieveClaim/:id', component: RetrieveClaimComponent}

  { path: 'userlist', component: UserListComponent, canActivate: [authGuard] },
  { path: 'reclamation', component: ReclamationComponent },
  { path: 'administration', component: AdministrationComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'setting', component: SettingComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }