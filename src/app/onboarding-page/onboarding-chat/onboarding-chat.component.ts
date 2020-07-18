import { AfterViewInit, Component, ViewChild, ViewChildren, ElementRef, QueryList, HostListener, OnInit } from '@angular/core';
import { MenuToggleService } from 'src/shared/services/menu-toggle.service';
import { CrudService } from 'src/shared/services/crud.service';

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

  constructor(
    public sideNavService: MenuToggleService,
    public crudService: CrudService
  ) {}

  ngAfterViewInit() {
    // AUTOSCROLL
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());


    this.crudService.messageInit().valueChanges().subscribe(data => {
      this.messages = data
    })
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


  addLearnMoreMessage(text) {
    this.crudService.addLearnMoreMessage(text);
  }

  addUserMessage(text) {
    this.crudService.addUserMessage(text)    
  }

  addBotMessage(response) {
    this.richCard = this.crudService.addBotMessage(response)
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

  playAudio(){
    let audio = new Audio();
    audio.src = "/assets/sound.mp3";
    audio.load();
    audio.play();
  }


  // Get event from ChatFormComponent
  handleUserMessage(event) {
    this.loading = true
    this.crudService.handleUserMessage(event).subscribe(res => {
      this.addBotMessage(res);
      this.loading = false;
    });;

  }

}
