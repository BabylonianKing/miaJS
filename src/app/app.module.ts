import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './main-page/main-page.component';
import { ConvoDashboardComponent } from './convo-dashboard/convo-dashboard.component';
import { MiaComponent } from './mia/mia.component';
import { ChatMessageComponent } from './mia/chat-message/chat-message.component';
import { ChatFormComponent } from './mia/chat-form/chat-form.component';
import { ConvosComponent } from './convos/convos.component';
import { ConvoCardComponent } from './convos/convo-card/convo-card.component';
import { LoginComponent } from './login/login.component';

/* Firebase services */
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore'

/* Auth service */
import { AuthenticationService } from '../shared/services/authentication.service';

/* DB CRUD service */
import { FirebaseService } from '../shared/services/firebase.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ConvoInfoComponent } from './convo-info/convo-info.component';

// Cookier service
import { CookieService } from 'ngx-cookie-service';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { SignupComponent } from './signup/signup.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileComponent } from './profile-page/profile/profile.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ConvoDashboardComponent,
    MiaComponent,
    ChatMessageComponent,
    ChatFormComponent,
    ConvosComponent,
    ConvoCardComponent,
    LoginComponent,
    SidebarComponent,
    ConvoInfoComponent,
    LoginPageComponent,
    SignupPageComponent,
    SignupComponent,
    ProfilePageComponent,
    ProfileComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [AuthenticationService, FirebaseService, CookieService],
  bootstrap: [AppComponent]
})

export class AppModule { }

