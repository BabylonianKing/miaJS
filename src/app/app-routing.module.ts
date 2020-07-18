import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConvoDashboardComponent } from './convo-dashboard/convo-dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { PostJobPageComponent } from './post-job-page/post-job-page.component';
import { BookmarksPageComponent } from './bookmarks-page/bookmarks-page.component';
import { MatildaDashboardComponent } from './matilda-dashboard/matilda-dashboard.component';
import { AuthenticationGuard } from 'src/shared/guard/authentication.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { OnboardingPageComponent } from './onboarding-page/onboarding-page.component';


const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'dashboard', component: ConvoDashboardComponent, canActivate: [AuthenticationGuard] },
  { path: 'chat', component: MatildaDashboardComponent },  
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthenticationGuard] },
  { path: 'post-job', component: PostJobPageComponent, canActivate: [AuthenticationGuard] },
  { path: 'bookmarks', component: BookmarksPageComponent, canActivate: [AuthenticationGuard] },
  { path: 'onboarding', component: OnboardingPageComponent, canActivate: [AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
