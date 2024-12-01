import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  constructor(public translate: TranslateService) {
    this.translate.use('ar');
    this.SetLanguage()
  }
  SetLanguage() {
    let lang = localStorage.getItem('lang') == 'ar' ? 'ar' : 'en'
    this.translate.addLangs(['ar-AR' , 'en-US']);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }
  @HostListener('window:beforeunload', ['$event'])
  onLoad() {
    let lang = this.translate.currentLang
    this.translate.addLangs(['ar-AR' , 'en-US']);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    localStorage.setItem('lang', lang)
  }
}
