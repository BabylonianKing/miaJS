import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let ConvoCardComponent = class ConvoCardComponent {
    constructor() {
        this.isUnread = false;
    }
    ngOnInit() {
    }
};
__decorate([
    Input()
], ConvoCardComponent.prototype, "logo", void 0);
__decorate([
    Input()
], ConvoCardComponent.prototype, "jobTitle", void 0);
__decorate([
    Input()
], ConvoCardComponent.prototype, "organization", void 0);
__decorate([
    Input()
], ConvoCardComponent.prototype, "timestamp", void 0);
__decorate([
    Input()
], ConvoCardComponent.prototype, "lastMessage", void 0);
__decorate([
    Input()
], ConvoCardComponent.prototype, "imageURL", void 0);
__decorate([
    Input()
], ConvoCardComponent.prototype, "jobId", void 0);
__decorate([
    Input()
], ConvoCardComponent.prototype, "isUnread", void 0);
ConvoCardComponent = __decorate([
    Component({
        selector: 'convo-card',
        templateUrl: './convo-card.component.html',
        styleUrls: ['./convo-card.component.scss']
    })
], ConvoCardComponent);
export { ConvoCardComponent };
//# sourceMappingURL=convo-card.component.js.map