import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AppComponent } from './app.component';
import { ListePangolinsComponent } from './liste-pangolins/liste-pangolins.component';
import { ProfilComponent } from './profil/profil.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: '', component: ConnexionComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'list-pangolin', component: ListePangolinsComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'logout', component: LogoutComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
