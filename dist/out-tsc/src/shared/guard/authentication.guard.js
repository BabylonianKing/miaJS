import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let AuthenticationGuard = class AuthenticationGuard {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canActivate(next, state) {
        if (this.authService.isLoggedIn !== true) {
            this.router.navigate(['login']);
        }
        return true;
    }
};
AuthenticationGuard = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthenticationGuard);
export { AuthenticationGuard };
//# sourceMappingURL=authentication.guard.js.map