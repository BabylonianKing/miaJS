import { AfterViewInit, Component, ViewChild, ViewChildren, ElementRef, QueryList, HostListener, OnInit, RendererStyleFlags2, Output, EventEmitter } from '@angular/core';
import { MenuToggleService } from 'src/shared/services/menu-toggle.service';
import { CrudService } from 'src/shared/services/crud.service';
import { HttpClient } from '@angular/common/http';
import { OnboardingService } from 'src/shared/services/onboarding.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';


@Component({
  selector: 'onboarding-chat',
  templateUrl: './onboarding-chat.component.html',
  styleUrls: ['./onboarding-chat.component.scss']
})
export class OnboardingChatComponent implements AfterViewInit {

  // AUTOSCROLL
  @ViewChild('scrollframe', {static: false}) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;


  @Output() loadingProfile = new EventEmitter<boolean>();

  private scrollContainer: any;
  private isNearBottom = true;

  userId: string;
  userRefData;
  user;


  richCard: boolean;
  messages = [];
  loading = false;

  uid: string;
  displayName: string;
  email: string;
  dialogflowURL = 'https://us-central1-mia-test-sgwxam.cloudfunctions.net/dialogflowGateway';
  chips = ["what", "the", "John", "Fish"];
  showChips: boolean = false;

  //We need this in case the person skips the chat onto the next tab
  sessionId = Math.random().toString(36).substr(2, 9);

  //Not sure if I want to keep dragged over
  draggedOver: boolean = false
  showUpload: boolean = false
  task;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  fileName: string;
  downloadURL: Observable<string>;


  constructor(
    public sideNavService: MenuToggleService,
    public crudService: CrudService,
    private http: HttpClient,
    public onboardingService: OnboardingService,
    public db: AngularFirestore,
    public afStorage: AngularFireStorage) {}

  ngAfterViewInit() {
    console.log(this.sessionId)


    this.userId = JSON.parse(localStorage.getItem('user')).uid;

    this.userRefData = this.db.doc(`users/${this.userId}`).valueChanges()

    this.userRefData.subscribe(data => {
      this.user = data
      this.messages = this.onboardingService.addTempBotMessage(this.messages, `Hello there, ${this.user.firstName || this.user.displayName || "friend"}. It's nice meeting you!`)
      this.messages = this.onboardingService.addTempBotMessage(this.messages, "My name is Matilda, and I’m here to help you find work opportunities that match you best! Before we get started, how about we get to know each other? Just say \"Let's create my profile\" to start. ")
      this.chips = ["Let's create my profile!"]
      this.showChips = true
      this.userRefData.unsubscribe()
    });




    // AUTOSCROLL
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());

  }

  // AUTOSCROLL
  private onItemElementsChanged(): void {
    if (this.isNearBottom) {
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  private isUserNearBottom(): boolean {
    const threshold = 150;
    const position = this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight;
    const height = this.scrollContainer.scrollHeight;
    return position > height - threshold;
  }

  scrolled(event: any): void {
    this.isNearBottom = this.isUserNearBottom();
  }

    // TRANSITION

    flowDone: boolean = false;

    animateTransition() {
      this.flowDone = true;
    }

    playAudio() {
      let audio = new Audio();
      audio.src = "/assets/sound.mp3";
      audio.load();
      audio.play();
    }

    // Toggled with the click of a button
    nextFlow() {
      this.sessionId = Math.random().toString(36).substr(2, 9);
      this.flowDone = false;
      this.messages = []
      this.onboardingService.onboardingStep += 1;

      if (this.onboardingService.onboardingStep == 1) {
        this.messages = this.onboardingService.addTempBotMessage(this.messages, "Great, now I will need your contact information. What is your phone number?")


      } else if (this.onboardingService.onboardingStep == 2) {
        this.messages = this.onboardingService.addTempBotMessage(this.messages, "Would you like to add your education history? You can simply add your degrees and diplomas. You will be able to add more details (dates, institutions, etc.) on your profile page.")


      } else if (this.onboardingService.onboardingStep == 3) {
        this.messages = this.onboardingService.addTempBotMessage(this.messages, "What values are dear to you?")

      } else if (this.onboardingService.onboardingStep == 4) {
        this.messages = this.onboardingService.addTempBotMessage(this.messages, "What are your notification preferences?")
        this.chips = ["Daily", "Weekly", "Monthly"]
        this.showChips = true


      } else if (this.onboardingService.onboardingStep == 5) {
        this.loadingProfile.emit(true)
      }
    }


    addChipMessage(chipText) {
      this.showChips = false
      this.handleUserMessage({message: chipText})

      if (chipText == "Yes please!") {
        this.showUpload = true
      }
    }

    sendImageToMatilda() {
      this.downloadURL.subscribe(url => this.handleUserMessage({message: url}))
      this.showUpload = false

    }

    untoggleUpload() {
      this.showUpload = false
    }




  // Get event from ChatFormComponent
  handleUserMessage(event) {
    this.loading = true;
    this.uid = JSON.parse(localStorage.getItem('user')).uid;

    const text = event.message;
    this.messages = this.onboardingService.addTempUserMessage(this.messages, text);

    // Make the request
    return this.http.post < any > (
        this.dialogflowURL, {
          sessionId: this.sessionId,
          queryInput: {
            text: {
              text,
              languageCode: 'en-US'
            }
          }
        }
      )
      .subscribe(res => {
        console.log(res)
        if (res.fulfillmentText != "") {
          this.messages = this.onboardingService.addTempBotMessage(this.messages, res.fulfillmentText);
        }

        if (res.fulfillmentText == "What are your notification preferences?") {
          this.chips = ["Daily", "Weekly", "Monthly"]
          this.showChips = true

        } else if (res.fulfillmentText == "What gender do you identify as?") {
          this.chips = ["Male", "Female", "Other", "Prefer Not to Say"]
          this.showChips = true

        } else if (res.fulfillmentText == "What are your notification preferences?") {
          this.chips = ["Daily", "Weekly", "Monthly"]
          this.showChips = true

        } else if (res.fulfillmentText == "How often should we send you those emails?") {
          this.chips = ["Daily", "Weekly", "Monthly"]
          this.showChips = true

        } else if (res.fulfillmentText == "Would you like to upload a profile picture?") {
          this.chips = ["Yes please!", "No, thanks"]
          this.showChips = true

        } else if (res.fulfillmentText == "I'll send you recommendations based on jobs you've searched and bookmarked. Would you like to get those?") {
          this.chips = ["Yes", "No"]
          this.showChips = true

        } else if (res.fulfillmentText.endsWith("Can you confirm this is correct?")) {
          this.chips = ["Yes, this is correct!", "No, I would like to make some changes."]
          this.showChips = true
        }









        else {
          this.showChips = false
        }
        if (this.onboardingService.checkOnboardingStep(res)) {
          this.onboardingService.uploadData(res)
          this.animateTransition();
          this.playAudio();
          this.loading = false;

        } else {
          this.loading = false;

        }
      });
  }



  // Drag and drop files
  allowDrop(event) {
    console.log("drop allowed")

    event.preventDefault();
    event.stopPropagation();
    this.draggedOver = true
  }

  removeDrop(event) {
    console.log("drop removed")
    event.preventDefault();
    event.stopPropagation();
    this.draggedOver = false
  }


  upload(event) {
    console.log("upload")

    this.uid = JSON.parse(localStorage.getItem('user')).uid;

    event.preventDefault();
    event.stopPropagation();
    var data = event.target.files[0];
    this.fileName = data.name
    let reference = this.afStorage.ref(`/profileImages/${this.uid}`);
    this.task = reference.put(data)
    console.log(this.task.percentageChanges())

    //Upload State implementation not working well, https://medium.com/codingthesmartway-com-blog/firebase-cloud-storage-with-angular-394566fd529
    this.uploadState = this.task.snapshotChanges()


    this.uploadProgress = this.task.percentageChanges()
    this.task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = reference.getDownloadURL() )
   )
  .subscribe()

  }


  drop(event) {
    console.log("drop")

    this.uid = JSON.parse(localStorage.getItem('user')).uid;

    event.preventDefault();
    event.stopPropagation();
    var data = event.dataTransfer.files[0];
    this.fileName = data.name
    let reference = this.afStorage.ref(`/profileImages/${this.uid}`);
    this.task = reference.put(data)
    console.log(this.task.percentageChanges())

    //Upload State implementation not working well, https://medium.com/codingthesmartway-com-blog/firebase-cloud-storage-with-angular-394566fd529
    this.uploadState = this.task.snapshotChanges()


    this.uploadProgress = this.task.percentageChanges()
    this.task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = reference.getDownloadURL() )
   )
  .subscribe()
}







}
