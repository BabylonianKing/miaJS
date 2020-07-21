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
  @Input() jobId: string;
  @Input() location: string;
  @Input() baseSalary: string;
  @Input() salaryType: string;
  @Input() description: string;
  @Input() employmentType: string;
  @Input() requirements: string;
  @Input() url: string;

  constructor() { }

  ngOnInit(): void {
    this.baseSalary = this.formatBaseSalary(this.baseSalary, this.salaryType)


  }

  formatBaseSalary(baseSalary, salaryType) {
    console.log(baseSalary)

    try {
      return baseSalary.numberValue.toFixed(2).toString() + "$ " + salaryType
    } catch {
      return baseSalary.stringValue
    }

  }

  apply() {
    window.open(this.url, "_blank")
  }

  learnMore() {
    console.log(this.description)
  }

}
