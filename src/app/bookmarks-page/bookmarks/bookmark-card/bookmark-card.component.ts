import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bookmark-card',
  templateUrl: './bookmark-card.component.html',
  styleUrls: ['./bookmark-card.component.scss']
})
export class BookmarkCardComponent implements OnInit {

  @Input() logo: string;
  @Input() jobTitle: string;
  @Input() organization: string;
  @Input() timestamp: string;
  @Input() lastMessage: string;
  @Input() imageURL: string;
  @Input() jobId: string;
  @Input() location: string;
  @Input() lowSalary: string;
  @Input() highSalary: string;
  @Input() jobDescription: string;
  @Input() responsabilities: string;
  @Input() jobType: string;
  @Input() requirements: string;
  @Input() applicationURL: string;

  constructor() { }

  ngOnInit(): void {
  }

  apply() {
    window.open(this.applicationURL, "_blank")
  }

  learnMore() {
    console.log(this.jobDescription)
  }

}
