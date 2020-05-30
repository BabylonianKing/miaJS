import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'convo-card',
  templateUrl: './convo-card.component.html',
  styleUrls: ['./convo-card.component.scss']
})
export class ConvoCardComponent implements OnInit {

  @Input() logo: string;
  @Input() jobTitle: string;
  @Input() organization: string;
  @Input() timestamp: string;
  @Input() lastMessage: string;
  @Input() imageURL: string;
  @Input() jobId: string;
  @Input() isUnread: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


}

