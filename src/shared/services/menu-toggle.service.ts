import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuToggleService {

  hideSideNav: boolean = false;
  hideConvoInfos: boolean = false;
  showBookmarksActions: boolean=false;

  // BUG & SUGGESTION FORM POPUP
  showBugPopup: boolean = false;
  showSuggestionPopup: boolean = false;
  
  constructor() { }

  toggleSideNav(): void {
    this.hideSideNav = !this.hideSideNav;
  }

  toggleConvoInfos() {
    this.hideConvoInfos = !this.hideConvoInfos;
  }

  toggleBookmarksActions() {
    this.showBookmarksActions = !this.showBookmarksActions;
  }

}
