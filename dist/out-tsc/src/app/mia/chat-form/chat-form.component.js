import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Chat } from 'src/shared/models/chat.model';
let ChatFormComponent = class ChatFormComponent {
    constructor() {
        this.message = new Chat("");
        this.send = new EventEmitter();
    }
    ngOnInit() {
    }
    // Triggered on form submit
    sendForm(form) {
        // Sends event to MiaComponent
        this.send.emit(form.value);
        // Resets form placeholder
        form.reset();
    }
};
__decorate([
    Input()
], ChatFormComponent.prototype, "message", void 0);
__decorate([
    Output()
], ChatFormComponent.prototype, "send", void 0);
ChatFormComponent = __decorate([
    Component({
        selector: 'chat-form',
        templateUrl: './chat-form.component.html',
        styleUrls: ['./chat-form.component.scss']
    })
], ChatFormComponent);
export { ChatFormComponent };
//# sourceMappingURL=chat-form.component.js.map