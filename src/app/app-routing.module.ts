import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ConvoDashboardComponent } from './convo-dashboard/convo-dashboard.component';
import { MiaComponent } from './mia/mia.component';


const routes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'convo-dashboard', component: ConvoDashboardComponent},
  { path: 'mia', component: MiaComponent}
  //{ path: '/signin', component: MainPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
