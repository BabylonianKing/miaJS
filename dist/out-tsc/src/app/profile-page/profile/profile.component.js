import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let ProfileComponent = class ProfileComponent {
    constructor(firebaseService, afAuth, ngZone, router, afStorage) {
        this.firebaseService = firebaseService;
        this.afAuth = afAuth;
        this.ngZone = ngZone;
        this.router = router;
        this.afStorage = afStorage;
        this.valueHidden = false;
        this.inputHidden = true;
    }
    ngOnInit() {
        let userId = JSON.parse(localStorage.getItem('user')).uid;
        this.afStorage.ref(`/coverImages/${userId}`).getDownloadURL().toPromise().then(data => this.coverDownloadURL = data);
        this.afStorage.ref(`/profileImages/${userId}`).getDownloadURL().toPromise().then(data => {
            this.profileDownloadURL = data;
            if (!this.profileDownloadURL) {
                this.profileDownloadURL = this.afAuth.userData.photoURL;
            }
        });
        //I did not change photoURL in the database
    }
    // UpdateEmail(email) {
    //   console.log('changing email')
    //   this.firebaseService.updateEmail(email);
    // }
    UpdateUser(value) {
        console.log(value);
        const u = this.afAuth.userData;
        const uid = u.uid;
        this.firebaseService.updateUser(uid, value)
            .then(res => {
            this.router.navigate(['/profile']);
        });
    }
    uploadBanner(event) {
        let userId = JSON.parse(localStorage.getItem('user')).uid;
        this.afStorage.upload(`/coverImages/${userId}`, event.target.files[0]);
        let ref = this.afStorage.ref(userId);
        // the put method creates an AngularFireUploadTask
        // and kicks off the upload
        ref.put(event.target.files[0]).percentageChanges().toPromise().then(data => window.location.reload());
    }
    uploadProfile(event) {
        let userId = JSON.parse(localStorage.getItem('user')).uid;
        this.afStorage.upload(`/profileImages/${userId}`, event.target.files[0]);
        let ref = this.afStorage.ref(userId);
        // the put method creates an AngularFireUploadTask
        // and kicks off the upload
        ref.put(event.target.files[0]).percentageChanges().toPromise().then(data => window.location.reload());
    }
    EditInput() {
        this.valueHidden = true;
        this.inputHidden = false;
    }
    ConfirmInput() {
        this.valueHidden = false;
        this.inputHidden = true;
    }
    formatNumber(tel) {
        if (!tel) {
            return '';
        }
        var value = tel.toString().trim().replace(/^\+/, '');
        if (value.match(/[^0-9]/)) {
            return "Please enter a valid phone number";
        }
        var country, city, number;
        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;
            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;
            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;
            default:
                return tel;
        }
        if (country == 1) {
            country = "";
        }
        number = number.slice(0, 3) + '-' + number.slice(3);
        return (country + " (" + city + ") " + number).trim();
    }
};
__decorate([
    Input()
], ProfileComponent.prototype, "status", void 0);
__decorate([
    Input()
], ProfileComponent.prototype, "phone", void 0);
__decorate([
    Input()
], ProfileComponent.prototype, "location", void 0);
__decorate([
    Input()
], ProfileComponent.prototype, "language", void 0);
ProfileComponent = __decorate([
    Component({
        selector: 'profile',
        templateUrl: './profile.component.html',
        styleUrls: ['./profile.component.scss']
    })
], ProfileComponent);
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map