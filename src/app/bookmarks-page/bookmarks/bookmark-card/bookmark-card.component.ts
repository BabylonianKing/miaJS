import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bookmark-card',
  templateUrl: './bookmark-card.component.html',
  styleUrls: ['./bookmark-card.component.scss']
})
export class BookmarkCardComponent implements OnInit {

  @Input() logo: string;
  @Input() title: string;
  @Input() company: string;
  @Input() timestamp: string;
  @Input() lastMessage: string;
  @Input() imageURL: string;
  @Input() jobId: string;
  @Input() location: string;
  @Input() salary: string;
  @Input() description: string;
  @Input() responsabilities: string;
  @Input() employmentType: string;
  @Input() requirements: string;
  @Input() applicationURL: string;

  constructor() { }

  ngOnInit(): void {
  }

  apply() {
    window.open(this.applicationURL, "_blank")
  }

  learnMore() {
    console.log(this.description)
  }

}
