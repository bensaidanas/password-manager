import { Component } from '@angular/core';
import { PasswordManagerService } from '../services/password-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss']
})
export class SiteListComponent {
  allSite!: Observable<Array<any>>;
  siteName!: string;
  siteUrl!: string;
  siteImgUrl!: string;
  siteId!: string;

  formStat: string = "Add New";
  successMessage!: string;
  isSuccess: boolean = false;

  constructor(private passwordService: PasswordManagerService) {
    this.loadSites()
  }

  showAlert(message: string) {
    this.isSuccess = true;
    this.successMessage = message;
  }

  onSubmit(values: object) {
    if (this.formStat == "Add New") {
      this.passwordService.addSite(values)
      .then(() => {
        this.showAlert("Data Saved Successfully")
      })
      .catch(err => {
        console.log(err);
      })
    } else if (this.formStat === "Edit") {
      this.passwordService.updateSite(this.siteId, values)
      .then(() => {
        this.showAlert("Data Edited Successfully")
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  editSite(siteName: string, siteUrl: string, siteImgUrl: string, id: string) {
    this.siteName= siteName;
    this.siteUrl = siteUrl;
    this.siteImgUrl = siteImgUrl;
    this.siteId = id;

    this.formStat = "Edit"
  }

  loadSites() {
    this.allSite = this.passwordService.loadSites()
  }

  deleteSite(id: string) {
    this.passwordService.deleteSite(id)
    .then(() => {
      this.showAlert("Data Deleted Successfully")
    })
    .catch((err) => {
      console.log(err);
    })
  }

}
