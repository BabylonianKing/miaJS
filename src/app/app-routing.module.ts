import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ConvoDashboardComponent } from './convo-dashboard/convo-dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { PostJobPageComponent } from './post-job-page/post-job-page.component';
import { AboutComponent } from './about/about.component';
import { BookmarksPageComponent } from './bookmarks-page/bookmarks-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'about', component: AboutComponent},
  { path: 'chat', component: ConvoDashboardComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'signup', component: SignupPageComponent},
  { path: 'profile', component: ProfilePageComponent},
  { path: 'post-job', component: PostJobPageComponent},
  { path: 'bookmarks', component: BookmarksPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
