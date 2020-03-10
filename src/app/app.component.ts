import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LowerCasePipe, UpperCasePipe, TitleCasePipe } from '@angular/common';
import { environment } from '../environments/environment';
import { AlertService } from './_alert/alert.service';

declare var chrome;
declare var _gaq;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showClear: string;

  @ViewChild('textAreaInput', {static: true}) textAreaInput: ElementRef;
  @ViewChild('textAreaOutput', {static: true}) textAreaOutput: ElementRef;

  constructor(
    private lowerCase: LowerCasePipe,
    private UpperCase: UpperCasePipe,
    private TitleCase: TitleCasePipe,
    private alertSvc: AlertService,
  ) {
  }

  ngOnInit() {
    chrome.tabs.executeScript({code: 'window.getSelection().toString();'}, selectedText => {
      if (selectedText[0]) {
        // (document.getElementById('text-input') as HTMLInputElement).value = selectedText[0];
        this.textAreaInput.nativeElement.value = selectedText[0].trim().replace(/\s\s+/g, ' ');
        this.textAreaInput.nativeElement.focus();
      }
      // this.textAreaInput.nativeElement.focus();
      // document.execCommand('paste');
      // this.textAreaInput.nativeElement.value = this.textAreaInput.nativeElement.value.trim().replace(/\s\s+/g, ' ');
    });

    if (environment.production) {
      console.log('production');
    } else {
      console.log('development');
    }
  }

  toCopy() {
    // console.log('aa');
    // chrome.tabs.executeScript( { code: 'window.getSelection().toString();'}, selectedText => {
    //   (document.getElementById('text-input') as HTMLInputElement).value = selectedText[0];
    // });
  }

  convertToUpperCase() {
    const textInput = this.getTextInput();
    if (textInput === '') { return; }

    this.sendEventToAnalytics('convertToUpperCase');

    const textTransform = textInput.toUpperCase();

    this.putTextOutput(textTransform);
  }

  convertToLowerCase() {
    const textInput = this.getTextInput();
    if (textInput === '') { return; }

    this.sendEventToAnalytics('convertToLowerCase');

    const textTransform = textInput.toLowerCase();

    this.putTextOutput(textTransform);
  }

  convertToTitleCase() {
    const textInput = this.getTextInput();
    if (textInput === '') { return; }

    this.sendEventToAnalytics('convertToTitleCase');

    const textTransform = this.TitleCase.transform(textInput);

    this.putTextOutput(textTransform);
  }

  convertToSentenceCase() {
    const textInput = this.getTextInput();
    if (textInput === '') { return; }

    this.sendEventToAnalytics('convertToSentenceCase');

    const text = textInput.toLowerCase();

    let result = '';
    let letter;
    let cap = true;
    let i: any;
    for (i in text) {
      letter = text.charAt(i);
      if (letter === '.' || letter === '!' || letter === '?' || letter === '\n') {
        cap = true;
      } else if (letter !== ' ' && cap === true) {
        letter = letter.toUpperCase();
        cap = false;
      }
      result += letter;
    }
    this.putTextOutput(result);
  }

  convertToSnakeCase() {
    const textInput = this.getTextInputForProgramming();
    if (textInput === '') { return; }

    this.sendEventToAnalytics('convertToSnakeCase');

    const text = textInput.toLowerCase();

    let result = '';
    let letter;
    let i: any;
    for (i in text) {
      letter = text.charAt(i);
      if (letter === ' ') { letter = '_'; }
      result += letter;
    }
    this.putTextOutput(result);
  }

  convertToCamelCase() {
    const textInput = this.getTextInputForProgramming();
    if (textInput === '') { return; }

    this.sendEventToAnalytics('convertToCamelCase');

    const result = textInput.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());

    this.putTextOutput(result);
  }

  convertToPascalCase() {
    const textInput = this.getTextInputForProgramming();
    if (textInput === '') { return; }

    this.sendEventToAnalytics('convertToPascalCase');

    const text: any = this.TitleCase.transform(textInput);

    let result = '';
    let letter;
    let i: any;
    for (i in text) {
      letter = text.charAt(i);
      if (letter === ' ') {
        letter = '';
      }
      result += letter;
    }
    this.putTextOutput(result);
  }

  convertToScreamingSnake() {
    const textInput = this.getTextInputForProgramming();
    if (textInput === '') { return; }

    this.sendEventToAnalytics('convertToScreamingSnake');

    const text = textInput.toUpperCase();

    let result = '';
    let letter;
    let i: any;
    for (i in text) {
      letter = text.charAt(i);
      if (letter === ' ') { letter = '_'; }
      result += letter;
    }
    this.putTextOutput(result);
  }

  convertToTrainCase() {
    const textInput = this.getTextInputForProgramming();
    if (textInput === '') { return; }

    this.sendEventToAnalytics('convertToTrainCase');

    const text: any = this.TitleCase.transform(textInput);

    let result = '';
    let letter;
    let i: any;
    for (i in text) {
      letter = text.charAt(i);
      if (letter === ' ') { letter = '-'; }
      result += letter;
    }
    this.putTextOutput(result);
  }

  convertToKebabCase() {
    const textInput = this.getTextInputForProgramming();
    if (textInput === '') { return; }

    this.sendEventToAnalytics('convertToKebabCase');

    const text = textInput.toLowerCase();

    let result = '';
    let letter;
    let i: any;
    for (i in text) {
      letter = text.charAt(i);
      if (letter === ' ') { letter = '-'; }
      result += letter;
    }
    this.putTextOutput(result);
  }

  getTextInput() {
    return this.textAreaInput.nativeElement.value.trim();
  }

  getTextInputForProgramming() {
    return this.textAreaInput.nativeElement.value
      .trim()
      .replace(/[^a-zA-Zа-я 1-9\p{L} ]/g, '')
      .trim()
      .replace(/\s\s+/g, ' ');
  }

  putTextOutput(text) {
    this.textAreaOutput.nativeElement.value = text;
    this.copyClipboard(text);
  }

  sendEventToAnalytics(event) {
    if (environment.production) {
      try {
        _gaq.push(['_trackEvent', event, 'clicked']);
      } catch (error) {
        console.log('can\'t send ga');
      }
    }
  }

  copyClipboard(text) {
    if (text) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.alertSvc.showCopy();
      this.textAreaOutput.nativeElement.focus();
      this.textAreaOutput.nativeElement.select();
    }

  }

  clear() {
    this.sendEventToAnalytics('clear');

    this.textAreaInput.nativeElement.value = '';
    this.showClear = '';
    this.textAreaInput.nativeElement.focus();
    this.textAreaOutput.nativeElement.value = '';
  }

  inputChange(text: string) {
    this.showClear = text;
  }

}


