import { AfterViewInit, Component, ViewChild, ViewChildren, ElementRef, QueryList, HostListener, OnInit } from '@angular/core';
import { MenuToggleService } from 'src/shared/services/menu-toggle.service';
import { CrudService } from 'src/shared/services/crud.service';
import { HttpClient } from '@angular/common/http';
import { OnboardingService } from 'src/shared/services/onboarding.service';

@Component({
  selector: 'onboarding-chat',
  templateUrl: './onboarding-chat.component.html',
  styleUrls: ['./onboarding-chat.component.scss']
})
export class OnboardingChatComponent implements AfterViewInit {

  // AUTOSCROLL 
  @ViewChild('scrollframe', {static: false}) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;

  private scrollContainer: any;
  private isNearBottom = true;

  richCard: boolean;
  messages = [];
  loading = false;

  uid: string;
  displayName: string;
  email: string;
  dialogflowURL = 'https://us-central1-mia-test-sgwxam.cloudfunctions.net/dialogflowGateway';

  constructor(
    public sideNavService: MenuToggleService,
    public crudService: CrudService,
    private http: HttpClient,
    public onboarding: OnboardingService
  ) {}

  ngAfterViewInit() {

    this.addTempBotMessage("Hello there, Lucas. It's nice meeting you!")
    this.addTempBotMessage("My name is Matilda, and I’m here to help you find work opportunities that match you best! Before we get started, how about we get to know each other? Just say \"Let's create my profile\" to start. ")

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

  addTempUserMessage(text) {
    this.messages.push({
      text,
      sender: 'Human',
      reply: true,
      date: new Date()
    });
  }

  addTempBotMessage(text) {
    this.messages.push({
      text,
      sender: 'Bot',
      date: new Date(),
      richCard: false
    });
  }
  ensureNotNull(variable) {
    while (variable == null) {
      setTimeout(function () {}, 500);
    }

    return variable
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

  nextFlow() {
    this.flowDone = false;
    this.messages = []
    this.onboarding.onboardingStep += 1;
  }


  // Get event from ChatFormComponent
  handleUserMessage(event) {
    this.loading = true;
    this.uid = JSON.parse(localStorage.getItem('user')).uid;

    const text = event.message;
    this.addTempUserMessage(text);

    // Make the request
    return this.http.post < any > (
        this.dialogflowURL, {
          sessionId: this.uid,
          queryInput: {
            text: {
              text,
              languageCode: 'en-US'
            }
          }
        }
      )
      .subscribe(res => {
        this.addTempBotMessage(res.fulfillmentText);
        this.loading = false;
      });
  }
}