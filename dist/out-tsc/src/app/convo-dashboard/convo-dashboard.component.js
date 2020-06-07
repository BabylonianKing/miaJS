import { __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { MiaComponent } from '../mia/mia.component';
import { ConvoInfoComponent } from '../convo-info/convo-info.component';
let ConvoDashboardComponent = class ConvoDashboardComponent {
    constructor(sideNavService) {
        this.sideNavService = sideNavService;
        this.isUnread = false;
    }
    ngOnInit() {
    }
    updateCurrentTexter(event) {
        localStorage.setItem('currentTexter', JSON.stringify(event));
        //   this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        //     this.router.navigate(['/chat']);
        // }); 
        this.child.changeConversation();
        this.child2.changeConversation();
    }
};
__decorate([
    Input()
], ConvoDashboardComponent.prototype, "isUnread", void 0);
__decorate([
    ViewChild(MiaComponent)
], ConvoDashboardComponent.prototype, "child", void 0);
__decorate([
    ViewChild(ConvoInfoComponent)
], ConvoDashboardComponent.prototype, "child2", void 0);
ConvoDashboardComponent = __decorate([
    Component({
        selector: 'convo-dashboard',
        templateUrl: './convo-dashboard.component.html',
        styleUrls: ['./convo-dashboard.component.scss']
    })
], ConvoDashboardComponent);
export { ConvoDashboardComponent };
//# sourceMappingURL=convo-dashboard.component.js.map