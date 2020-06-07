import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ToolbarComponent = class ToolbarComponent {
    constructor(afAuth, sideNavService) {
        this.afAuth = afAuth;
        this.sideNavService = sideNavService;
    }
    ngOnInit() {
    }
    signOut() {
        this.afAuth.SignOut();
    }
};
ToolbarComponent = __decorate([
    Component({
        selector: 'toolbar',
        templateUrl: './toolbar.component.html',
        styleUrls: ['./toolbar.component.scss']
    })
], ToolbarComponent);
export { ToolbarComponent };
//# sourceMappingURL=toolbar.component.js.map