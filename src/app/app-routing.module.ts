import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LowerCasePipe, UpperCasePipe, TitleCasePipe } from '@angular/common';
import { AlertService } from './_alert/alert.service';


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
    AlertService
  ]
})
export class AppRoutingModule { }
