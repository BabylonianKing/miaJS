import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConvoDashboardComponent } from './convo-dashboard/convo-dashboard.component';
import { MiaComponent } from './mia/mia.component';
import { ChatMessageComponent } from './mia/chat-message/chat-message.component';
import { ChatFormComponent } from './mia/chat-form/chat-form.component';
import { ConvosComponent } from './convo-dashboard/convos/convos.component';
import { ConvoCardComponent } from './convo-dashboard/convos/convo-card/convo-card.component';
import { LoginComponent } from './login-page/login/login.component';

/* Firebase services */
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore'

/* Auth service */
import { UserService } from '../shared/services/user.service';

/* DB CRUD service */
import { CrudService } from '../shared/services/crud.service';
import { ConvoInfoComponent } from './convo-dashboard/convo-info/convo-info.component';

import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { SignupComponent } from './signup-page/signup/signup.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileComponent } from './profile-page/profile/profile.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PostJobPageComponent } from './post-job-page/post-job-page.component';
import { PostJobComponent } from './post-job-page/post-job/post-job.component';
import { BookmarksPageComponent } from './bookmarks-page/bookmarks-page.component';
import { BookmarksComponent } from './bookmarks-page/bookmarks/bookmarks.component';
import { BookmarkCardComponent } from './bookmarks-page/bookmarks/bookmark-card/bookmark-card.component';
import { MatildaDashboardComponent } from './matilda-dashboard/matilda-dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { OnboardingPageComponent } from './onboarding-page/onboarding-page.component';
import { OnboardingChatComponent } from './onboarding-page/onboarding-chat/onboarding-chat.component';
import { OnboardingProgressComponent } from './onboarding-page/onboarding-progress/onboarding-progress.component';
import { JobCardComponent } from './mia/chat-message/job-card/job-card.component';


@NgModule({
  declarations: [
    AppComponent,
    ConvoDashboardComponent,
    MiaComponent,
    ChatMessageComponent,
    ChatFormComponent,
    ConvosComponent,
    ConvoCardComponent,
    LoginComponent,
    ConvoInfoComponent,
    LoginPageComponent,
    SignupPageComponent,
    SignupComponent,
    ProfilePageComponent,
    ProfileComponent,
    ToolbarComponent,
    PostJobPageComponent,
    PostJobComponent,
    BookmarksPageComponent,
    BookmarksComponent,
    BookmarkCardComponent,
    MatildaDashboardComponent,
    HomepageComponent,
    OnboardingPageComponent,
    OnboardingChatComponent,
    OnboardingProgressComponent,
  JobCardComponent  ],
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
  providers: [UserService, CrudService],
  bootstrap: [AppComponent]
})

export class AppModule { }
