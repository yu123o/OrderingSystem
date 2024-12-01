import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { AccountInfo } from 'src/app/Cors/Models/Login/AccountInfo';
import { Login } from 'src/app/Cors/Models/Login/Login';
import { GenericServiceService } from 'src/app/Cors/Service/generic-service.service';
import { API } from 'src/app/Cors/enums/API/api';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [ MessageService]
})
export class LoginPageComponent {
  login: Login = new Login()
  formGroup: FormGroup = new FormGroup({})

  constructor(public translate: TranslateService,
    public service: GenericServiceService, public router: Router, private messageService: MessageService) {
    this.translate.setDefaultLang("ar");
  }
  ngOnInit() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.initFormGroup()
  }
  ar() {
    this.translate.addLangs(['ar', 'klingon']);
    this.translate.setDefaultLang('ar');
    this.translate.use('ar');
  }
  en() {
    this.translate.addLangs(['en', 'klingon']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
  initFormGroup() {
    this.formGroup = new FormGroup({
      LoginName: new FormControl(this.login.LoginName, [Validators.required]),
      Password: new FormControl(this.login.Password, [Validators.required])
    })
  }
  async Login() {

    let data = await this.service.LoginService(this.login, API.LogIn).subscribe((data: AccountInfo) => {
      if (data.JWT != null && data.JWT != '' && data.JWT != undefined) {
        localStorage.setItem("JWT", data.JWT)
        localStorage.setItem("AccountName", data.Account.Name)
        localStorage.setItem("AccountID", data.Account.EntityID?.toString())
        this.router.navigateByUrl("/Systems/HomePage")

      }
      else this.messageService.add({ severity: 'error', detail: this.translate.instant("Messages.LoginFailed") })
    })


  }
}
