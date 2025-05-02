import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class AlertService {

  private subject = new Subject<any>();

  constructor() {}

  showCopy() {
    this._showMessage();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  private _showMessage() {
    this.subject.pipe(debounceTime(1000)).subscribe(() => this.subject.next());
    this.subject.next({ text: true });
  }
}
