import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuToggleService {

  hideSideNav: boolean = false;
  hideConvoInfos: boolean = false;

  // BUG & SUGGESTION FORM POPUP
  showBugPopup: boolean = false;
  showSuggestionPopup: boolean = false;
  
  constructor() { }

  toggleSideNav(): void {
    this.hideSideNav = !this.hideSideNav;
  }

  toggleConvoInfos() {
    this.hideConvoInfos = !this.hideConvoInfos;
    console.log("Hello")
  }
}
