import { __decorate } from "tslib";
import { Component } from '@angular/core';
let SignupComponent = class SignupComponent {
    constructor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    ngOnInit() { }
    signUp() {
        this.authenticationService.SignUp(this.email, this.password).then(error => {
            console.log(error);
            this.errorMessage = error;
        });
        this.email = '';
        this.password = '';
    }
};
SignupComponent = __decorate([
    Component({
        selector: 'signup',
        templateUrl: './signup.component.html',
        styleUrls: ['./signup.component.scss']
    })
], SignupComponent);
export { SignupComponent };
//# sourceMappingURL=signup.component.js.map