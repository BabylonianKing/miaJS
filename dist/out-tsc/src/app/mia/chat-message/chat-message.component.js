import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let ChatMessageComponent = class ChatMessageComponent {
    constructor() { }
    ngOnInit() {
    }
};
__decorate([
    Input()
], ChatMessageComponent.prototype, "message", void 0);
__decorate([
    Input()
], ChatMessageComponent.prototype, "timestamp", void 0);
__decorate([
    Input()
], ChatMessageComponent.prototype, "reply", void 0);
ChatMessageComponent = __decorate([
    Component({
        selector: 'chat-message',
        templateUrl: './chat-message.component.html',
        styleUrls: ['./chat-message.component.scss']
    })
], ChatMessageComponent);
export { ChatMessageComponent };
//# sourceMappingURL=chat-message.component.js.map