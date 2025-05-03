import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LowerCasePipe, UpperCasePipe, TitleCasePipe } from '@angular/common';
import { AlertService } from './services/alert/alert.service';
import { GoogleAnalyticsService } from './services/ga/google-analytics.service';


const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {})
  ],
  exports: [
    RouterModule
  ],
  providers: [
    LowerCasePipe,
    UpperCasePipe,
    TitleCasePipe,
    AlertService,
    GoogleAnalyticsService
  ]
})
export class AppRoutingModule { }
