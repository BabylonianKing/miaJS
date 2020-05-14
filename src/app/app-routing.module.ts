import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ConvoDashboardComponent } from './convo-dashboard/convo-dashboard.component';
import { MiaComponent } from './mia/mia.component';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';




const routes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'convo-dashboard', component: ConvoDashboardComponent},
  { path: 'mia', component: MiaComponent},
  { path: 'login', component: LoginComponent}
  //{ path: '/signin', component: MainPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFirestoreModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
