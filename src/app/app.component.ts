import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { AlertService } from './services/alert/alert.service';
import { GoogleAnalyticsService } from './services/ga/google-analytics.service';
import { environment } from '../environments/environment';
import { VERSION } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {

  showClear: string;

  @ViewChild('textAreaInput', {static: true}) textAreaInput: ElementRef;
  @ViewChild('textAreaOutput', {static: true}) textAreaOutput: ElementRef;

  constructor(
    private titleCase: TitleCasePipe,
    private alertService: AlertService,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {}

  ngOnInit() {
    this.textAreaInput.nativeElement.focus();
    this.sendEventToAnalytics('ExtensionLaunched');
    this.showConsoleLog();
  }

  // ============================================
  // ========== GENERAL CASES ===================
  // ============================================

  convertToLowerCase() {
    const textInput = this.getTextInput();
    if (textInput === '') { return; }

    this.sendEventToAnalytics('convertToLowerCase');

    const result = textInput.toLowerCase();

    this.putTextOutput(result);
  }

  convertToUpperCase() {
    const textInput = this.getTextInput();
    if (textInput === '') { return; }

    this.sendEventToAnalytics('convertToUpperCase');

    const result = textInput.toUpperCase();

    this.putTextOutput(result);
  }

  convertToSentenceCase() {
    const textInput = this.getTextInput();
    if (textInput === '') { return; }

    this.sendEventToAnalytics('convertToSentenceCase');

    const text = textInput.toLowerCase();

    let result = '';
    let letter: string;
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

    result = result.replace(/ i /, ' I ');
    this.putTextOutput(result);
  }

  convertToTitleCase() {
    const textInput = this.getTextInput();
    if (textInput === '') { return; }

    this.sendEventToAnalytics('convertToTitleCase');

    const result = this.titleCase.transform(textInput);

    this.putTextOutput(result);
  }

  // ============================================
  // ========== PROGRAMMING CASES ===============
  // ============================================

  convertToSnakeCase() {
    const textInput = this.getTextInputForProgramming();
    if (textInput === '') { return; }

    this.sendEventToAnalytics('convertToSnakeCase');

    const result = textInput.toLowerCase().replaceAll(' ', '_');

    this.putTextOutput(result);
  }

  convertToScreamingSnake() {
    const textInput = this.getTextInputForProgramming();
    if (textInput === '') { return; }

    this.sendEventToAnalytics('convertToScreamingSnake');

    const result = textInput.toUpperCase().replaceAll(' ', '_');

    this.putTextOutput(result);
  }

  convertToCamelCase() {
    const textInput = this.getTextInputForProgramming();
    if (textInput === '') { return; }

    this.sendEventToAnalytics('convertToCamelCase');

    const text = this.titleCase.transform(textInput).replaceAll(' ', '');
    const result = text.charAt(0).toLowerCase() + String(text).slice(1);

    this.putTextOutput(result);
  }

  convertToPascalCase() {
    const textInput = this.getTextInputForProgramming();
    if (textInput === '') { return; }

    this.sendEventToAnalytics('convertToPascalCase');

    const result: any = this.titleCase.transform(textInput).replaceAll(' ', '');

    this.putTextOutput(result);
  }

  convertToKebabCase() {
    const textInput = this.getTextInputForProgramming();
    if (textInput === '') { return; }

    this.sendEventToAnalytics('convertToKebabCase');

    const result = textInput.toLowerCase().replaceAll(' ', '-');

    this.putTextOutput(result);
  }

  convertToTrainCase() {
    const textInput = this.getTextInputForProgramming();
    if (textInput === '') { return; }

    this.sendEventToAnalytics('convertToTrainCase');

    const result = this.titleCase.transform(textInput).replaceAll(' ', '-');

    this.putTextOutput(result);
  }

  // ============================================
  // ========== HELPERS  ========================
  // ============================================

  getTextInput() {
    return this.textAreaInput.nativeElement.value.trim();
  }

  getTextInputForProgramming() {
    // https://medium.com/@therkverma/check-special-characters-in-a-string-with-regular-expression-javascript-regex-7498674e6c28
    return this.textAreaInput.nativeElement.value
      .replace(/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?"№ʼ'\\]/g, ' ')
      .replace(/\s\s+/g, ' ')
      .trim();
  }

  putTextOutput(text: string) {
    this.textAreaOutput.nativeElement.value = text;
    this.copyClipboard(text);
  }

  copyClipboard(text: string) {
    if (text) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.alertService.showCopy();
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

  showConsoleLog() {
    const envMode    = environment.mode;
    const extVersion = environment.extension_version;
    const angVersion = VERSION.full;
    console.log('Mode: ' + envMode + ' | Extension version: ' + extVersion + '| Angular version: ' + angVersion);
  }

  async sendEventToAnalytics(event: string) {
    if (environment.production) {
      this.googleAnalyticsService.fireEvent(event);
    }
  }
}
