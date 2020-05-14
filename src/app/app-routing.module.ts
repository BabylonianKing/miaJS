import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ConvoDashboardComponent } from './convo-dashboard/convo-dashboard.component';
<<<<<<< HEAD
import { LoginComponent } from './login/login.component';
=======
import { MiaComponent } from './mia/mia.component';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';


>>>>>>> 6bec45a2799aa6a9e4fc6b45f90c3a1f1d9c5648


const routes: Routes = [
  { path: '', component: MainPageComponent},
<<<<<<< HEAD
  { path: 'chat', component: ConvoDashboardComponent},
  { path: 'login', component: LoginComponent}
=======
  { path: 'convo-dashboard', component: ConvoDashboardComponent},
  { path: 'mia', component: MiaComponent},
  { path: 'login', component: LoginComponent},
>>>>>>> 6bec45a2799aa6a9e4fc6b45f90c3a1f1d9c5648
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
