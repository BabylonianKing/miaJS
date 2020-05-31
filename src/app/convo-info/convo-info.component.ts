import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MenuToggleService } from 'src/shared/services/menu-toggle.service'; 



@Component({
  selector: 'convo-info',
  templateUrl: './convo-info.component.html',
  styleUrls: ['./convo-info.component.scss']
})
export class ConvoInfoComponent implements OnInit {

  jobTitle;
  currentTexterId;
  organization;
  location;
  companyImageURL: string;
  orgId;


  constructor(
    public afStorage: AngularFireStorage,
    public sideNavService: MenuToggleService) {}

  ngOnInit(): void {

    this.currentTexterId = JSON.parse(localStorage.getItem('currentTexter')).jobId
    this.jobTitle = JSON.parse(localStorage.getItem('currentTexter')).jobTitle
    this.organization = JSON.parse(localStorage.getItem('currentTexter')).organization
    this.location = JSON.parse(localStorage.getItem('currentTexter')).location
    this.orgId = JSON.parse(localStorage.getItem('orgId'))

    this.updateCompanyImage()



  }

  updateCompanyImage() {
    this.afStorage.ref(`/orgImages/${this.orgId}`).getDownloadURL().toPromise().then(data => this.companyImageURL = data)

    if (!this.companyImageURL) {
      this.companyImageURL = "https://uploads-ssl.webflow.com/5ea1997894e4390e5fbe12b2/5ea3164c953e8a56201c055c_icons8-target-50.png"
    }

    // getDownloadURL().toPromise().then(data => this.companyImageURL = data)


  }

  //Redundant code, would be better if you made a global function that can be called anywhere

  changeConversation() {
    this.currentTexterId = JSON.parse(localStorage.getItem('currentTexter')).jobId
    this.jobTitle = JSON.parse(localStorage.getItem('currentTexter')).jobTitle
    this.organization = JSON.parse(localStorage.getItem('currentTexter')).organization
    this.location = JSON.parse(localStorage.getItem('currentTexter')).location
    this.orgId = JSON.parse(localStorage.getItem('currentTexter')).orgId

    this.updateCompanyImage()

  }


}
