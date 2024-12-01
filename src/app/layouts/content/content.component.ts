import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmEventType, ConfirmationService, MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ContentComponent {
  hide: boolean = true
  constructor(public translate: TranslateService, public router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService) {
    translate.setDefaultLang('ar')
  }

  ngOnInit() {

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
  LogOut() {
    
    this.confirmationService.confirm({
      message: this.translate.instant('Messages.ConfirmMessage'),
      header: this.translate.instant('Messages.Confirmation'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.instant('Messages.Yes'),
      rejectLabel: this.translate.instant('Messages.No'),
      rejectVisible: false,
      accept: () => {
        this.router.navigateByUrl("")
        localStorage.removeItem("AccountID")
        localStorage.removeItem("JWT")
        localStorage.removeItem("AccountName")
        // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: (type: any) => {

      }
    });

  }
}
