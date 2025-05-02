import { Component, OnInit } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    standalone: false
})
export class AlertComponent implements OnInit {

  showCopy: boolean;

  constructor(
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => {
      if (message) {
        this.showCopy = true;
      } else {
        this.showCopy = false;
      }
    });
  }

  removeAlert() {
    this.showCopy = false;
  }

}
