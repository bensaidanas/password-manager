import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../services/password-manager.service';
import { Observable } from 'rxjs';
import { AES, enc } from 'crypto-js';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.scss']
})
export class PasswordListComponent {

  siteId!: string;
  siteName!: string;
  siteUrl!: string;
  siteImgUrl!: string;

  passwordList!: Array<any>;

  email!: string;
  username!: string;
  password!: string;
  passowrdId!: string;

  formState = "Add New"

  constructor(private route: ActivatedRoute, private passowrdService: PasswordManagerService) {
    this.route.queryParams.subscribe((val: any) => {
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteUrl = val.siteUrl;
      this.siteImgUrl = val.siteImgUrl;
    })

    this.loadPasswords();
  }

  onSubmit(values: any) {
    const encryptedPassword = this.encryptPassword(values.password);
    values.password = encryptedPassword;
    if (this.formState === "Add New") {
      this.passowrdService.addPassword(values, this.siteId)
      .then(() => {
        console.log("Password Save Successfully")
      })
      .catch((err) => {
        console.log(err)
      })
    } else if (this.formState === "Edit") {
      this.passowrdService.updatePassword(this.siteId, this.passowrdId, values)
      .then(() => {
        console.log("Data Updated")
        this.resetForm();
      })
      .catch((err) => {
        console.log(err)
      })
    }
    
  }

  loadPasswords() {
    this.passowrdService.loadPasswords(this.siteId).subscribe((res) => {
      this.passwordList = res;
    })
  }

  editPassword(email: string, username: string, password: string, passwordId: string) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.passowrdId = passwordId

    this.formState = "Edit"
  }

  resetForm() {
    this.email = '';
    this.username = '';
    this.password = '';
    this.passowrdId = '';
    this.formState = "Add New";
  }

  encryptPassword(password: string) {
    const secretKey = 'p4YL+gt/OPO3L2PJYuIt6TUEHw+qP6NX0FfM15xdJJCkBibEweHahdS9XbwL3DmI';
    const encryptedPassword = AES.encrypt(password, secretKey).toString();
    return encryptedPassword;
  }

  decrypt(password: string) {
    const secretKey = 'p4YL+gt/OPO3L2PJYuIt6TUEHw+qP6NX0FfM15xdJJCkBibEweHahdS9XbwL3DmI';
    const decPassword = AES.decrypt(password, secretKey).toString(enc.Utf8)
    return decPassword;
  }

  onDecrypt(password: string, index: number) {
    const decryptedPassword = this.decrypt(password);
    this.passwordList[index].password = decryptedPassword;
  }
}
