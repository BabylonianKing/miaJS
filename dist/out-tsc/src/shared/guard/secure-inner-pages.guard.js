import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let SecureInnerPagesGuard = class SecureInnerPagesGuard {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canActivate(next, state) {
        if (this.authService.isLoggedIn) {
            window.alert("You are not allowed to access this URL!");
            this.router.navigate(['profile']);
        }
        return true;
    }
};
SecureInnerPagesGuard = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SecureInnerPagesGuard);
export { SecureInnerPagesGuard };
//# sourceMappingURL=secure-inner-pages.guard.js.map