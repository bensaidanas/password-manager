import { Component } from '@angular/core';
import { PasswordManagerService } from '../services/password-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isError: boolean = false;
  constructor(private passwordService: PasswordManagerService, private router: Router) {}

  onSubmit(values: any) {
    console.log(values.email, values.password)
    this.passwordService.login(values.email, values.password)
    .then(() => {
      this.router.navigate(['/site-list'])
    })
    .catch(err => {
      this.isError = true;
    })
  }
}
