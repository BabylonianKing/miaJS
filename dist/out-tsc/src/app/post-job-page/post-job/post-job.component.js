import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PostJobComponent = class PostJobComponent {
    constructor(firebaseService, afStorage) {
        this.firebaseService = firebaseService;
        this.afStorage = afStorage;
        this.tab = 0;
    }
    ngOnInit() {
        this.showTab(this.tab);
    }
    showTab(n) {
        // This function will display the specified tab of the form ...
        let x = document.getElementsByClassName("tab");
        x[n].style.display = "block";
    }
    sendOrgForm(form) {
        this.firebaseService.registerOrg(form.value).then(data => {
            if (this.event) {
                let orgId = JSON.parse(localStorage.getItem('orgId'));
                this.afStorage.upload(`/orgImages/${orgId}`, this.event.target.files[0]);
                let ref = this.afStorage.ref(orgId);
                // the put method creates an AngularFireUploadTask
                // and kicks off the upload
                // ref.put(this.event.target.files[0]).percentageChanges().toPromise().then(data => window.location.reload());
            }
        });
        let x = document.getElementsByClassName("tab");
        x[this.tab].style.display = "none";
        this.tab++;
        this.showTab(this.tab);
        //If there is an image uploaded, upload that image to the Firestore storage
    }
    sendJobForm(form) {
        this.firebaseService.postJob(form.value);
        let x = document.getElementsByClassName("tab");
        x[this.tab].style.display = "none";
        this.tab++;
        this.showTab(this.tab);
    }
    uploadImage(event) {
        this.event = event;
    }
};
PostJobComponent = __decorate([
    Component({
        selector: 'post-job',
        templateUrl: './post-job.component.html',
        styleUrls: ['./post-job.component.scss']
    })
], PostJobComponent);
export { PostJobComponent };
//# sourceMappingURL=post-job.component.js.map