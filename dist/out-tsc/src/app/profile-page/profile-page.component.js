import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ProfilePageComponent = class ProfilePageComponent {
    constructor(afAuth, firebaseService, sideNavService) {
        this.afAuth = afAuth;
        this.firebaseService = firebaseService;
        this.sideNavService = sideNavService;
    }
    // Timeout?
    ngOnInit() {
        setTimeout(() => {
            const user = JSON.parse(localStorage.getItem('user'));
            this.firebaseService.getUserInfos(user.uid)
                .subscribe(result => {
                console.log(result);
                this.userInfos = result;
            });
        }, 1000);
    }
};
ProfilePageComponent = __decorate([
    Component({
        selector: 'profile-page',
        templateUrl: './profile-page.component.html',
        styleUrls: ['./profile-page.component.scss']
    })
], ProfilePageComponent);
export { ProfilePageComponent };
//# sourceMappingURL=profile-page.component.js.map