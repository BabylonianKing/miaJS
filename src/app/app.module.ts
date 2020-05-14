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
<<<<<<< HEAD
import { ConvosComponent } from './convos/convos.component';
import { ConvoCardComponent } from './convos/convo-card/convo-card.component';
=======
>>>>>>> 6bec45a2799aa6a9e4fc6b45f90c3a1f1d9c5648
import { LoginComponent } from './login/login.component';

/* Firebase services */
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from '../environments/environment';
<<<<<<< HEAD
import { AngularFirestoreModule } from '@angular/fire/firestore'

/* Auth service */
import { AuthenticationService } from '../shared/services/authentication.service';

/* DB CRUD service */
import { FirebaseService } from '../shared/services/firebase.service';
=======

/* Auth service */
import { AuthenticationService } from '../shared/services/authentication.service';
>>>>>>> 6bec45a2799aa6a9e4fc6b45f90c3a1f1d9c5648

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ConvoDashboardComponent,
    MiaComponent,
    ChatMessageComponent,
    ChatFormComponent,
<<<<<<< HEAD
    ConvosComponent,
    ConvoCardComponent,
    LoginComponent
=======
    LoginComponent,
>>>>>>> 6bec45a2799aa6a9e4fc6b45f90c3a1f1d9c5648
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireAuthModule,
<<<<<<< HEAD
    AngularFirestoreModule,
=======
>>>>>>> 6bec45a2799aa6a9e4fc6b45f90c3a1f1d9c5648
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})

export class AppModule { }

