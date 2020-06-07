import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let MenuToggleService = class MenuToggleService {
    constructor() {
        this.hideSideNav = false;
        this.hideConvoInfos = false;
    }
    toggleSideNav() {
        this.hideSideNav = !this.hideSideNav;
    }
    toggleConvoInfos() {
        this.hideConvoInfos = !this.hideConvoInfos;
    }
};
MenuToggleService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], MenuToggleService);
export { MenuToggleService };
//# sourceMappingURL=menu-toggle.service.js.map