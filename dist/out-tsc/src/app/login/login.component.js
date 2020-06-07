import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LoginComponent = class LoginComponent {
    constructor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    ngOnInit() { }
    signIn() {
        this.authenticationService.SignIn(this.email, this.password).then(error => {
            console.log(error);
            this.errorMessage = error;
        });
        this.email = '';
        this.password = '';
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map