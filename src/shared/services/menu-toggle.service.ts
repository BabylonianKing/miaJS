import { Injectable } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';

@Injectable({
  providedIn: 'root'
})
export class MenuToggleService {

  hideSideNav: boolean = false;
  hideConvoInfos: boolean = false;
  showBookmarksActions: boolean=false;

  activeItem: number;

  // BUG & SUGGESTION FORM POPUP
  showBugPopup: boolean = false;
  showSuggestionPopup: boolean = false;
  
  constructor(
    public analytics: AngularFireAnalytics
  ) { }

  toggleSideNav(): void {
    this.hideSideNav = !this.hideSideNav;
    this.analytics.logEvent("toggled_sidebar");
  }

  toggleConvoInfos() {
    this.hideConvoInfos = !this.hideConvoInfos;
  }

  toggleBookmarksActions() {
    this.showBookmarksActions = !this.showBookmarksActions;
  }

}
