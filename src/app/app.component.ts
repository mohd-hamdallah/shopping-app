import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dir: string;

  constructor(translateService: TranslateService) {
    translateService.onLangChange.subscribe((langChangeEvent: LangChangeEvent) => {
      this.dir = (langChangeEvent.lang === 'ar') ? 'rtl' : 'ltr';
    });
  }
}
