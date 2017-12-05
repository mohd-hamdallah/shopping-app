import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  html_alert;
  url;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.html_alert = this.sanitizer.bypassSecurityTrustHtml(
      '<script type="text/javascript">alert("Inside Fragment 1");</script>'
    );
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
      // 'http://www.integratingstuff.com/'
      'javascript:alert("hacked");'
    );
  }

}
